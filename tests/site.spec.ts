import { test, expect } from '@playwright/test'
import { getAllQuestions } from '../lib/content'
import { getExamForms } from '../lib/exam'

const availableForm = getExamForms(getAllQuestions()).find((form) => form.available)

test('desktop and mobile textbook remain readable with rendered assets', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'California real estate', exact: true })
  ).toBeVisible()
  await expect(page.locator('.unit-section')).toHaveCount(7)
  await page.setViewportSize({ width: 1200, height: 750 })
  await page.screenshot({ path: 'test-results/overview-preview.jpeg', type: 'jpeg', quality: 85 })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.screenshot({ path: 'test-results/desktop-overview.png' })
  await page.goto('/docs/ownership-property-rights/')
  await expect(page.locator('.property-figure img')).toBeVisible()
  expect(
    await page
      .locator('.property-figure img')
      .evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
  ).toBe(true)
  await page.screenshot({ path: 'test-results/desktop-chapter.png' })
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.getByRole('dialog').getByRole('link', { name: 'Flashcards', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Flashcards', exact: true })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.goto('/docs/ownership-encumbrances/')
    await expect(page.locator('.easement-mobile')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: `test-results/mobile-chapter-${width}.png` })
  }
  expect(errors).toEqual([])
})

test('chapters have no tracking controls while quiz explanations and theme still work', async ({
  page,
}) => {
  await page.goto('/docs/ownership-property-rights/')
  await expect(page.getByRole('button', { name: /Mark complete|Completed|bookmark/i })).toHaveCount(
    0
  )
  await expect(page.locator('a[href^="/progress"]')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Print lesson', exact: true })).toHaveCount(1)
  await page.locator('.chapter-quiz input[type=radio]').first().check({ force: true })
  await page.getByRole('button', { name: 'Check answer', exact: true }).click()
  await expect(page.locator('.option-explanation')).toHaveCount(4)
  await page.getByRole('button', { name: 'Toggle color theme' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.reload()
  await expect(page.locator('html')).toHaveClass(/dark/)
  expect(await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))).toBeNull()
})

test('search supports keyboard selection and punctuation', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Search textbook', exact: true }).click()
  const search = page.getByRole('combobox', { name: 'Search textbook' })
  await search.fill('[(*')
  await expect(page.getByText('No results for')).toBeVisible()
  await search.fill('easement appurtenant')
  await expect(page.getByRole('option').first()).toBeVisible()
  await search.press('Enter')
  await expect(page).toHaveURL(/ownership-encumbrances/)
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await page.getByRole('button', { name: 'Search textbook', exact: true }).click()
  await search.fill('property')
  await expect(page.getByRole('option')).toHaveCount(12)
  for (let i = 0; i < 11; i++) await search.press('ArrowDown')
  const selected = await page.locator('#search-11').boundingBox()
  const container = await page.locator('.search-results').boundingBox()
  expect(selected!.y + selected!.height).toBeLessThanOrEqual(container!.y + container!.height + 1)
})

test('timed exam resumes, supports flagging and grades after expiry', async ({ page }) => {
  test.skip(!availableForm, 'Requires a complete, source-checked authored examination form')
  await page.goto('/practice/')
  await page.getByRole('tab', { name: 'Mock exam' }).click()
  await page.getByRole('button', { name: 'Start timed exam' }).click()
  await expect(page.locator('.session-question-meta')).toContainText('Question 1 of 150')
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem('ca-re:study:v1')!).session
  )
  expect(new Set(saved.questionIds).size).toBe(150)
  const first = getAllQuestions().find((q) => q.id === saved.questionIds[0])!
  await page
    .locator('.question-option')
    .nth(saved.optionOrders[first.id].indexOf(first.answer))
    .click()
  await page.getByRole('button', { name: 'Flag for review' }).click()
  await page.getByRole('button', { name: 'Next', exact: true }).click()
  await page.reload()
  await expect(page.locator('.session-question-meta')).toContainText('Question 2 of 150')
  const restored = await page.evaluate(
    () => JSON.parse(localStorage.getItem('ca-re:study:v1')!).session
  )
  expect(restored.expiresAt).toBe(saved.expiresAt)
  expect(restored.answers[first.id]).toBe(first.answer)
  expect(restored.flags).toContain(first.id)
  await page.getByRole('button', { name: 'Question navigator' }).click()
  await expect(
    page.getByRole('button', { name: 'Question 1, answered, flagged', exact: true })
  ).toBeVisible()
  await page.getByRole('button', { name: 'Question 1, answered, flagged', exact: true }).click()
  await page.evaluate(() => {
    const data = JSON.parse(localStorage.getItem('ca-re:study:v1')!)
    data.session.expiresAt = Date.now() - 1
    localStorage.setItem('ca-re:study:v1', JSON.stringify(data))
  })
  await page.reload()
  await expect(page.locator('.exam-results')).toBeVisible()
  await expect(page.locator('.page-description')).toContainText('1 of 150')
  const result = await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))
  expect(Object.keys(result)).toEqual(['session'])
  expect(result.session.finishedAt).not.toBeNull()
  await page.reload()
  await expect(page.locator('.page-description')).toContainText('1 of 150')
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))).toEqual(
    result
  )
})

test('flashcards, glossary filtering, and calculator work without tracking', async ({ page }) => {
  await page.goto('/flashcards/')
  await expect(page.locator('.flashcard')).toBeVisible()
  await page.getByRole('button', { name: 'Show answer', exact: true }).click()
  await expect(page.locator('.flashcard-face')).toHaveClass(/is-back/)
  const definition = await page.locator('.flashcard-face').innerText()
  await expect(page.locator('.flashcard-face')).toHaveAccessibleName(
    new RegExp(definition.slice(0, 15).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  )
  await page.getByRole('button', { name: 'Next flashcard', exact: true }).click()
  await expect(page.locator('.flashcard-face')).not.toHaveClass(/is-back/)
  await expect(page.getByRole('button', { name: /Mark known|Review again/ })).toHaveCount(0)
  await page.goto('/glossary/')
  await page.getByRole('searchbox', { name: 'Filter glossary' }).fill('fiduciary')
  await expect(page.locator('.glossary-entry').first()).toBeVisible()
  await page.goto('/math/')
  await expect(page.locator('.calculator-result')).toContainText('$2,398.20')
  await page.getByLabel('Principal ($)').fill('12000')
  await page.getByLabel('Annual interest rate (%)').fill('0')
  await page.getByLabel('Term (years)').fill('1')
  await expect(page.locator('.calculator-result')).toContainText('$1,000.00')
  expect(await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))).toBeNull()
})

test('expired exams reject an answer even before the timer callback runs', async ({ page }) => {
  test.skip(!availableForm, 'Requires a complete, source-checked authored examination form')
  await page.clock.install()
  await page.goto('/practice/')
  await page.getByRole('tab', { name: 'Mock exam' }).click()
  await page.getByRole('button', { name: 'Start timed exam' }).click()
  const session = await page.evaluate(
    () => JSON.parse(localStorage.getItem('ca-re:study:v1')!).session
  )
  await page.clock.setSystemTime(new Date(session.expiresAt + 100))
  await page.locator('.question-option').first().click()
  await expect(page.locator('.exam-results')).toBeVisible()
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))
  expect(stored.session.answers).toEqual({})
  expect(Object.keys(stored)).toEqual(['session'])
  await expect(page.locator('.page-description')).toContainText('0 of 150')
})

test('all study and reference views fit a narrow mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 })
  for (const route of ['practice', 'flashcards', 'glossary', 'math', 'sources']) {
    await page.goto(`/${route}/`)
    await expect(page.locator('main h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    if (route === 'sources')
      await expect(page.locator('.source-row').first().locator('span').first()).toBeVisible()
  }
})
