import { expect, test, type Locator, type Page } from '@playwright/test'
import { getQuestions } from '../lib/content'

async function expectReadingPosition(page: Page, prompt: Locator) {
  await expect(prompt).toBeFocused()
  const bounds = await prompt.boundingBox()
  const header = await page.locator('.app-header').boundingBox()
  expect(bounds).not.toBeNull()
  expect(header).not.toBeNull()
  expect(bounds!.y).toBeGreaterThanOrEqual(header!.y + header!.height)
  expect(bounds!.y).toBeLessThan(page.viewportSize()!.height - 80)
}

for (const width of [320, 1440]) {
  test(`practice navigation reveals and focuses the new prompt at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 740 })
    await page.goto('/practice/')
    await page.getByRole('button', { name: 'Start practice', exact: true }).click()
    const prompt = page.locator('.active-session .question-prompt')
    const first = await prompt.innerText()
    await expectReadingPosition(page, prompt)

    const next = page.getByRole('button', { name: 'Next', exact: true })
    await next.focus()
    await next.press('Enter')
    await expect(prompt).not.toHaveText(first)
    await expectReadingPosition(page, prompt)

    const answer = page.locator('.question-option input').first()
    await answer.focus()
    await answer.press('Space')
    await expect(answer).toBeChecked()
    await expect(answer).toBeFocused()
    const flag = page.getByRole('button', { name: 'Flag for review', exact: true })
    await flag.focus()
    await flag.press('Space')
    await expect(flag).toHaveAttribute('aria-pressed', 'true')
    await expect(flag).toBeFocused()

    const previous = page.getByRole('button', { name: 'Previous', exact: true })
    await previous.focus()
    await previous.press('Enter')
    await expect(prompt).toHaveText(first)
    await expectReadingPosition(page, prompt)

    const navigator = page.getByRole('button', { name: 'Question navigator', exact: true })
    await navigator.click()
    const fifth = page.getByRole('button', { name: 'Question 5, unanswered', exact: true })
    await fifth.focus()
    await fifth.press('Enter')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(page.locator('.session-question-meta')).toContainText('Question 5 of 10')
    await expectReadingPosition(page, prompt)

    await navigator.click()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(navigator).toBeFocused()
  })

  test(`chapter navigation focuses questions without jumping on initial load at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 740 })
    await page.goto('/docs/ownership-property-rights/')
    const quiz = page.locator('.chapter-quiz')
    await expect(quiz).toHaveAttribute('aria-busy', 'false')
    expect(await page.evaluate(() => scrollY)).toBe(0)
    const prompt = quiz.locator('.question-prompt')
    const questions = getQuestions().filter(
      (question) => question.lessonSlug === 'ownership-property-rights'
    )
    for (const [index, question] of questions.entries()) {
      await expect(prompt).toHaveText(question.prompt)
      await quiz.locator('input[type="radio"]').first().check()
      await quiz.getByRole('button', { name: 'Check answer', exact: true }).click()
      if (index === questions.length - 1) {
        await quiz.getByRole('button', { name: 'See result', exact: true }).click()
      } else {
        const next = quiz.getByRole('button', { name: 'Next question', exact: true })
        await next.focus()
        await next.press('Enter')
        await expectReadingPosition(page, prompt)
      }
    }
    const retry = quiz.getByRole('button', { name: 'Try again', exact: true })
    await retry.focus()
    await retry.press('Enter')
    await expect(prompt).toHaveText(questions[0].prompt)
    await expectReadingPosition(page, prompt)
    expect(await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))).toBeNull()
  })
}
