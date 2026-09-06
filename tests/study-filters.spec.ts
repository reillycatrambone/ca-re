import { test, expect, type Page } from '@playwright/test'
import { getQuestions } from '../lib/content'

async function expectViewportFit(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
}

for (const width of [1440, 320]) {
  test(`flashcards flip, navigate, shuffle, and filter topics without tracking at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 740 })
    await page.goto('/flashcards/')
    await expect(page.getByRole('radiogroup', { name: 'Flashcard filter' })).toHaveCount(0)
    await expect(page.getByRole('button', { name: /Mark known|Review again/ })).toHaveCount(0)
    await expect(page.locator('.flashcard')).toBeVisible()

    const term = await page.locator('.flashcard-face').innerText()
    await page.getByRole('button', { name: 'Show answer', exact: true }).click()
    await expect(page.locator('.flashcard-face')).toHaveClass(/is-back/)
    await expectViewportFit(page)

    await page.getByRole('button', { name: 'Next flashcard', exact: true }).click()
    await expect(page.locator('.flashcard-face')).not.toHaveClass(/is-back/)
    await expect(page.locator('.flashcard-face')).not.toHaveText(term)
    await page.getByRole('button', { name: 'Previous flashcard', exact: true }).click()
    await expect(page.locator('.flashcard-face')).toHaveText(term)
    await page.getByRole('combobox', { name: 'Topic', exact: true }).selectOption('agency')
    await expect(page.locator('.flashcard-meta')).toContainText('Agency & duties')
    await page.getByRole('button', { name: 'Shuffle flashcards', exact: true }).click()
    await expect(page.locator('.flashcard-meta')).toContainText('Agency & duties')
    await expect(page.locator('.flashcard-meta')).toContainText('1 /')
    await expect(page.locator('.flashcard-face')).not.toHaveClass(/is-back/)

    await page.reload()
    await expect(page.getByRole('combobox', { name: 'Topic', exact: true })).toHaveValue('all')
    await expect(page.locator('.flashcard-face')).toHaveText(term)
    expect(await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))).toBeNull()
    await expectViewportFit(page)
  })

  test(`answer-review filters retain scores and show the requested questions at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 740 })
    await page.goto('/practice/')
    await page.getByRole('button', { name: 'Start practice', exact: true }).click()
    const session = await page.evaluate(
      () => JSON.parse(localStorage.getItem('ca-re:study:v1')!).session
    )
    const first = getQuestions().find((question) => question.id === session.questionIds[0])!
    await page.locator('.question-option').nth(first.answer).click()
    await page.getByRole('button', { name: 'Finish', exact: true }).click()
    await page.getByRole('button', { name: 'Finish and score', exact: true }).click()
    await expect(page.locator('.exam-results')).toBeVisible()
    await expect(page.locator('.page-description')).toContainText('1 of 10')
    await expect(page.locator('a[href^="/progress"]')).toHaveCount(0)
    await expect(page.getByRole('progressbar')).toHaveCount(0)

    const filters = page.getByRole('radiogroup', { name: 'Answer review filter' })
    const missed = filters.getByRole('radio', { name: 'Missed', exact: true })
    const all = filters.getByRole('radio', { name: 'All', exact: true })
    const stored = await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))
    await expect(filters.getByRole('radio')).toHaveCount(2)
    await expect(filters.locator('[aria-controls]')).toHaveCount(0)
    await expect(missed).toHaveAttribute('aria-checked', 'true')
    await expect(page.locator('.review-question')).toHaveCount(9)
    await expect(page.locator(`#prompt-${first.id}`)).toHaveCount(0)
    await all.click()
    await expect(all).toHaveAttribute('aria-checked', 'true')
    await expect(page.locator('.review-question')).toHaveCount(10)
    await expect(page.locator(`#prompt-${first.id}`)).toBeVisible()
    await expect(page.locator('.option-explanation')).toHaveCount(40)
    await all.click()
    await expect(all).toHaveAttribute('aria-checked', 'true')
    await expectViewportFit(page)

    await all.press('ArrowLeft')
    await expect(missed).toBeFocused()
    await missed.press('Space')
    await expect(missed).toHaveAttribute('aria-checked', 'true')
    await expect(page.locator('.review-question')).toHaveCount(9)
    expect(await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))).toBe(stored)
    await page.reload()
    await expect(page.locator('.page-description')).toContainText('1 of 10')
    expect(Object.keys(JSON.parse(stored!))).toEqual(['session'])
    await page.getByRole('button', { name: 'New session', exact: true }).click()
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))).toEqual({
      session: null,
    })
    await expectViewportFit(page)
  })
}

test('legacy tracking without a session is removed without creating a profile', async ({
  page,
}) => {
  await page.goto('/')
  await page.evaluate(() =>
    localStorage.setItem(
      'ca-re:study:v1',
      JSON.stringify({
        completed: ['ownership-property-rights'],
        bookmarks: ['ownership-property-rights'],
        knownTerms: ['fixture'],
        attempts: [{ id: 'old-result', score: 10, total: 10 }],
        session: null,
      })
    )
  )
  await page.reload()
  await expect(
    page.getByRole('heading', { name: 'California real estate', exact: true })
  ).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!)))
    .toEqual({ session: null })
  await expect(page.locator('a[href^="/progress"]')).toHaveCount(0)
  await expect(page.locator('.continue-reading, .bookmark-row, .nav-count')).toHaveCount(0)
  await page.goto('/progress/')
  await expect(page.getByRole('heading', { name: 'Page not found', exact: true })).toBeVisible()
})
