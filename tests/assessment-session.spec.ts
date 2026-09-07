import { expect, test } from '@playwright/test'
import { getAllQuestions, getQuestions } from '../lib/content'
import { createStudySession, getExamForms, getPracticeConcepts } from '../lib/exam'

const forms = getExamForms(getAllQuestions())

for (const form of forms) {
  test(`${form.label} starts, resumes, scores, and clears without study history`, async ({
    page,
  }) => {
    test.skip(!form.available, 'Requires the complete reviewed held-out form')
    await page.goto('/practice/')
    await page.getByRole('tab', { name: 'Mock exam', exact: true }).click()
    await page.getByRole('combobox', { name: 'Examination form' }).selectOption(form.id)
    await page.getByRole('button', { name: 'Start timed exam', exact: true }).click()
    await expect(page.locator('.session-question-meta')).toContainText('Question 1 of 150')
    const session = await page.evaluate(
      () => JSON.parse(localStorage.getItem('ca-re:study:v1')!).session
    )
    const bank = getAllQuestions().filter((question) => question.pool === form.id)
    expect([...session.questionIds].sort()).toEqual(bank.map((question) => question.id).sort())
    const first = bank.find((question) => question.id === session.questionIds[0])!
    const position = session.optionOrders[first.id].indexOf(first.answer)
    await page.locator('.question-option input').nth(position).check()
    await expect(page.getByRole('button', { name: 'Check answer', exact: true })).toHaveCount(0)
    await expect(page.locator('.answer-status')).toHaveCount(0)
    await page.reload()
    await expect(page.locator('.question-option input').nth(position)).toBeChecked()
    const restored = await page.evaluate(
      () => JSON.parse(localStorage.getItem('ca-re:study:v1')!).session
    )
    expect(restored.startedAt).toBe(session.startedAt)
    expect(restored.questionIds).toEqual(session.questionIds)
    expect(restored.optionOrders).toEqual(session.optionOrders)
    await page.getByRole('button', { name: 'Finish', exact: true }).click()
    await expect(page.getByRole('dialog')).toContainText('149 questions are unanswered')
    await page.getByRole('button', { name: 'Finish and score', exact: true }).click()
    await expect(page.locator('.exam-results')).toBeVisible()
    await expect(page.locator('.page-description')).toContainText('1 of 150')
    await page.reload()
    await expect(page.locator('.page-description')).toContainText('1 of 150')
    await page.getByRole('button', { name: 'New session', exact: true }).click()
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))).toEqual({
      session: null,
    })
  })
}

if (process.env.CONTENT_RELEASE_CHECK === '1') {
  test('release includes both complete source-checked held-out examination forms', () => {
    expect(forms.map((form) => ({ id: form.id, available: form.available }))).toEqual([
      { id: 'exam-a', available: true },
      { id: 'exam-b', available: true },
    ])
  })
}

test('mock examination availability reflects only complete reviewed forms', async ({ page }) => {
  await page.goto('/practice/')
  await page.getByRole('tab', { name: 'Mock exam', exact: true }).click()
  const start = page.getByRole('button', { name: 'Start timed exam', exact: true })
  if (!forms.some((form) => form.available)) {
    await expect(start).toBeDisabled()
    await expect(page.getByText('Form A and Form B are not yet available.')).toBeVisible()
    await expect(page.getByRole('combobox', { name: 'Examination form' })).toHaveCount(0)
    expect(await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))).toBeNull()
  } else {
    await expect(start).toBeEnabled()
    const select = page.getByRole('combobox', { name: 'Examination form' })
    for (const form of forms) {
      const option = select.locator(`option[value="${form.id}"]`)
      if (form.available) await expect(option).toBeEnabled()
      else await expect(option).toBeDisabled()
    }
  }
})

test('display order, canonical answers and review survive save and resume', async ({ page }) => {
  await page.goto('/practice/')
  await page.getByRole('button', { name: 'Start practice', exact: true }).click()
  const session = await page.evaluate(
    () => JSON.parse(localStorage.getItem('ca-re:study:v1')!).session
  )
  const question = getQuestions().find((entry) => entry.id === session.questionIds[0])!
  const displayed = session.optionOrders[question.id].map(
    (index: number) => question.options[index].text
  )
  await expect(page.locator('.option-text')).toHaveText(displayed)
  const position = session.optionOrders[question.id].indexOf(question.answer)
  await page.locator('.question-option input').nth(position).check()
  await page.getByRole('button', { name: 'Flag for review' }).click()
  await page.reload()
  await expect(page.locator('.option-text')).toHaveText(displayed)
  await expect(page.locator('.question-option input').nth(position)).toBeChecked()
  const restored = await page.evaluate(
    () => JSON.parse(localStorage.getItem('ca-re:study:v1')!).session
  )
  expect(restored.optionOrders).toEqual(session.optionOrders)
  expect(restored.questionRevisions).toEqual(session.questionRevisions)
  expect(restored.answers[question.id]).toBe(question.answer)
  expect(restored.flags).toEqual([question.id])
  await page.getByRole('button', { name: 'Check answer', exact: true }).click()
  await expect(page.locator('.answer-status')).toContainText(
    `The correct answer is ${String.fromCharCode(65 + position)}.`
  )
  await page.getByRole('button', { name: 'Finish', exact: true }).click()
  await page.getByRole('button', { name: 'Finish and score', exact: true }).click()
  await page.getByRole('radio', { name: 'All', exact: true }).click()
  const review = page
    .locator('.review-question')
    .filter({ has: page.locator(`#prompt-${question.id}`) })
  await expect(review.locator('.question-option input').nth(position)).toBeChecked()
  await expect(review.locator('.answer-status')).toContainText(
    `The correct answer is ${String.fromCharCode(65 + position)}.`
  )
  await expect(page.locator('.page-description')).toContainText('1 of 10')
})

test('changed authored revisions block old answers from being resumed or graded', async ({
  page,
}) => {
  const questions = getQuestions().slice(0, 10)
  const session = createStudySession({ questions, mode: 'practice' })
  session.questionRevisions[questions[0].id] += 1
  session.answers[questions[0].id] = questions[0].answer
  await page.goto('/practice/')
  await page.evaluate(
    (value) => localStorage.setItem('ca-re:study:v1', JSON.stringify({ session: value })),
    session
  )
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Question set updated' })).toBeVisible()
  await expect(page.locator('.question-card, .exam-results')).toHaveCount(0)
  await page.getByRole('button', { name: 'New session', exact: true }).click()
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))).toEqual({
    session: null,
  })
})

test('chapter quizzes shuffle display choices and reset between chapters without tracking', async ({
  page,
}) => {
  const questions = getQuestions().filter(
    (question) => question.lessonSlug === 'ownership-property-rights'
  )
  await page.goto('/docs/ownership-property-rights/')
  const quiz = page.locator('.chapter-quiz')
  await expect(quiz).toHaveAttribute('aria-busy', 'false')
  const first = questions[0]
  const order = await quiz
    .locator('input[type="radio"]')
    .evaluateAll((inputs) => inputs.map((input) => Number((input as HTMLInputElement).value)))
  expect([...order].sort()).toEqual([0, 1, 2, 3])
  await quiz.locator(`input[value="${first.answer}"]`).check()
  await quiz.getByRole('button', { name: 'Check answer', exact: true }).click()
  await expect(quiz.locator('.answer-status')).toContainText(
    `The correct answer is ${String.fromCharCode(65 + order.indexOf(first.answer))}.`
  )
  await quiz.getByRole('button', { name: 'Next question', exact: true }).click()
  await expect(quiz.locator('.question-prompt')).toHaveText(questions[1].prompt)
  await page.locator('.chapter-pagination').getByRole('link').last().click()
  await expect(page).toHaveURL(/ownership-estates-title/)
  await expect(quiz).toHaveAttribute('aria-busy', 'false')
  await expect(quiz.locator('.question-prompt')).toHaveText(
    getQuestions().find((question) => question.lessonSlug === 'ownership-estates-title')!.prompt
  )
  await expect(quiz.locator('input:checked')).toHaveCount(0)
  expect(await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))).toBeNull()
})

test('practice concept filters only expose registered populated practice concepts', async ({
  page,
}) => {
  const available = getPracticeConcepts(getQuestions(), 'all')
  await page.goto('/practice/')
  const select = page.getByRole('combobox', { name: 'Concept', exact: true })
  if (!available.length) {
    await expect(select).toHaveCount(0)
    return
  }
  await expect(select.locator('option')).toHaveText([
    'All concepts',
    ...available.map((concept) => concept.label),
  ])
  await select.selectOption(available[0].id)
  await page.getByRole('button', { name: 'Start practice', exact: true }).click()
  const session = await page.evaluate(
    () => JSON.parse(localStorage.getItem('ca-re:study:v1')!).session
  )
  const questions = getQuestions().filter((question) => session.questionIds.includes(question.id))
  expect(questions.length).toBeGreaterThan(0)
  expect(
    questions.every(
      (question) => question.pool === 'practice' && question.conceptIds.includes(available[0].id)
    )
  ).toBe(true)
})
