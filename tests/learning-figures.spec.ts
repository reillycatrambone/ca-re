import { test, expect } from '@playwright/test'
import { learningFigures } from '../lib/learning-figures'

test('all chapters render their anchored teaching figure without mobile overflow', async ({
  page,
}) => {
  test.setTimeout(180000)
  await page.setViewportSize({ width: 320, height: 844 })
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const figure of learningFigures) {
    await page.goto(`/docs/${figure.lessonSlug}/#${figure.id}`)
    const visual = page.locator(`figure#${figure.id}`)
    await expect(visual).toBeVisible()
    await expect(visual).toHaveAccessibleName(figure.title)
    await expect(visual.locator('figcaption')).toContainText(figure.caption)
    const precedingSection = await visual.evaluate((element) => {
      return element.closest<HTMLElement>('[data-reading-section]')?.dataset.readingSection
    })
    expect(precedingSection).toBe(figure.afterSection)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(await visual.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(
      true
    )
    await expect(visual.getByRole('link', { name: 'Chapter sources' })).toHaveAttribute(
      'href',
      '#sources'
    )
  }
  expect(errors).toEqual([])
})

test('diagram families remain readable on desktop, mobile, dark mode, and print', async ({
  page,
}) => {
  const samples = [
    'fixture-evidence',
    'deed-delivery-recording',
    'special-transfer-authority',
    'seller-proceeds-bridge',
    'parcel-area-allocation',
    'cap-rate-sensitivity',
  ]
  for (const width of [1440, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const id of samples) {
      const figure = learningFigures.find((figure) => figure.id === id)!
      await page.goto(`/docs/${figure.lessonSlug}/#${id}`)
      const visual = page.locator(`figure#${id}`)
      await visual.scrollIntoViewIfNeeded()
      await expect(visual).toBeVisible()
      await visual.screenshot({ path: `test-results/figure-${id}-${width}.png` })
      const overflow = await visual
        .locator('dt, dd, li, .figure-result, .learning-figure-heading')
        .evaluateAll((elements) =>
          elements
            .filter((element) => element.scrollWidth > element.clientWidth + 1)
            .map((element) => element.textContent)
        )
      expect(overflow).toEqual([])
    }
  }
  await page.getByRole('button', { name: 'Toggle color theme' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page
    .locator('#cap-rate-sensitivity')
    .screenshot({ path: 'test-results/figure-cap-rate-dark.png' })
  await page.getByRole('button', { name: 'Toggle color theme' }).click()
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.cap-rate-input')).toBeHidden()
  await expect(page.locator('.cap-rate-output')).toContainText('$800,000')
})

test('cap-rate interaction updates value, supports keyboard input, and preserves chart proportions', async ({
  page,
}) => {
  await page.goto('/docs/valuation-income-analysis/#cap-rate-sensitivity')
  const slider = page.getByRole('slider', { name: 'Capitalization rate' })
  await slider.focus()
  await slider.press('Home')
  await expect(slider).toHaveAttribute('aria-valuetext', '4.00 percent')
  await expect(page.locator('.cap-rate-output')).toContainText('$1,200,000')
  await slider.press('End')
  await expect(page.locator('.cap-rate-output')).toContainText('$480,000')
  await slider.press('ArrowLeft')
  await expect(slider).toHaveAttribute('aria-valuetext', '9.75 percent')
  const widths = await page
    .locator('.cap-rate-bar')
    .evaluateAll((bars) => bars.map((bar) => bar.getBoundingClientRect().width))
  expect(widths[0]).toBeGreaterThan(0)
  expect(widths[1] / widths[0]).toBeCloseTo(2 / 3, 2)
  expect(widths[2] / widths[0]).toBeCloseTo(0.5, 2)
})

test('figure-specific search opens its in-text anchor', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Search textbook', exact: true }).click()
  await page.getByRole('combobox', { name: 'Search textbook' }).fill('fixture evidence')
  const result = page
    .getByRole('option')
    .filter({ hasText: 'Fixture analysis: weigh the evidence' })
  await expect(result).toBeVisible()
  await result.click()
  await expect(page).toHaveURL(/ownership-property-rights\/#fixture-evidence$/)
  await expect(page.locator('#fixture-evidence')).toBeVisible()
})

test('legacy study records retain the active session and remove all retired tracking', async ({
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
        session: {
          id: 'first-edition-session',
          mode: 'practice',
          questionIds: ['financing-001', 'financing-002'],
          answers: { 'financing-001': 0 },
          checked: [],
          flags: ['financing-001'],
          current: 0,
          startedAt: Date.now() - 60000,
          expiresAt: null,
          finishedAt: null,
        },
      })
    )
  )
  await page.goto('/practice/')
  await expect(page.locator('.session-question-meta')).toContainText('Question 1 of 2')
  await expect(page.locator('.question-option input').first()).toBeChecked()
  await expect(page.locator('.question-option').first()).toContainText('80%.')
  const migrated = await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))
  expect(Object.keys(migrated)).toEqual(['session'])
  expect(migrated.session.questionIds).toEqual(['financing-001', 'financing-002'])
  expect(migrated.session.flags).toEqual(['financing-001'])
  await page.getByRole('button', { name: 'Next', exact: true }).click()
  await page.reload()
  await expect(page.locator('.session-question-meta')).toContainText('Question 2 of 2')
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))
  expect(saved.session.answers).toEqual({ 'financing-001': 0 })
  expect(saved.session.startedAt).toBe(migrated.session.startedAt)
  expect(Object.keys(saved)).toEqual(['session'])
})
