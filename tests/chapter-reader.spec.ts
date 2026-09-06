import { test, expect } from '@playwright/test'
import { getLessons } from '../lib/content'
import { getHeadings } from '../lib/headings'
import { getStudyGuides } from '../lib/study-guides/content'

const guides = getStudyGuides()
const lessons = getLessons()
const sample = (kind: string) => guides.find((guide) => guide.lab.kind === kind)!

test('focused reading, nested anchors, same-hash links, and full-mode preference', async ({
  page,
}) => {
  const lesson = lessons.find((lesson) =>
    getHeadings(lesson.body).some((heading) => heading.depth === 3)
  )!
  const headings = getHeadings(lesson.body)
  const sections = headings.filter((heading) => heading.depth === 2)
  await page.goto(`/docs/${lesson.slug}/`)
  await expect(page.locator('.reading-section-content:visible')).toHaveCount(1)
  await expect(page.locator('.reading-detail-content:visible')).toHaveCount(0)
  await page.locator('.next-reading-section:visible').click()
  await expect(page.locator(`[data-reading-section="${sections[1].id}"]`)).toHaveAttribute(
    'data-expanded',
    'true'
  )
  await expect(page.locator('.reading-section-content:visible')).toHaveCount(1)
  const nested = headings.find((heading) => heading.depth === 3)!
  await page.goto(`/docs/${lesson.slug}/#${nested.id}`)
  await expect(
    page.locator(`[data-reading-detail="${nested.id}"] .reading-detail-content`)
  ).toBeVisible()
  const toggle = page.locator(`[id="${nested.id}"] button`)
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  const sectionLink = page.locator(`.lesson-toc a[href="#${sections[1].id}"]`)
  await sectionLink.click()
  const sectionToggle = page.locator(`[id="${sections[1].id}"] button`)
  await sectionToggle.click()
  await expect(sectionToggle).toHaveAttribute('aria-expanded', 'false')
  await sectionLink.click()
  await expect(sectionToggle).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('radio', { name: 'Full chapter', exact: true }).click()
  await expect(page.locator('.reading-section-content:visible')).toHaveCount(sections.length)
  await expect(page.locator('.reading-detail-content[hidden]')).toHaveCount(0)
  await page.reload()
  await expect(page.locator('.chapter-reader')).toHaveAttribute('data-reading-mode', 'full')
  await page.goto(`/docs/${lessons.find((item) => item.slug !== lesson.slug)!.slug}/`)
  await expect(page.locator('.chapter-reader')).toHaveAttribute('data-reading-mode', 'full')
  await page.getByRole('radio', { name: 'Focused', exact: true }).click()
  await expect(page.locator('.reading-section-content:visible')).toHaveCount(1)
})

test('all 33 guides render complete section summaries, labs, pitfalls and unique anchors', async ({
  page,
}) => {
  test.setTimeout(180000)
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const width of [1440, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const guide of guides) {
      await page.goto(`/docs/${guide.lessonSlug}/#case-lab`)
      await expect(page.locator('.case-lab')).toBeVisible()
      await expect(page.locator('.section-takeaway')).toHaveCount(guide.sections.length)
      await expect(page.locator('.guide-overview dt')).toHaveCount(3)
      await expect(page.locator('#exam-pitfalls .reading-detail')).toHaveCount(3)
      const duplicateIds = await page.locator('[id]').evaluateAll((elements) => {
        const ids = elements.map((element) => element.id)
        return ids.filter((id, index) => ids.indexOf(id) !== index)
      })
      expect(duplicateIds, guide.lessonSlug).toEqual([])
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        guide.lessonSlug
      ).toBe(true)
      const overflow = await page
        .locator('.case-lab button, .case-lab p, .case-lab dd, .section-takeaway')
        .evaluateAll((elements) =>
          elements
            .filter(
              (element) => element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 1
            )
            .map((element) => element.textContent)
        )
      expect(overflow, guide.lessonSlug).toEqual([])
    }
  }
  expect(errors).toEqual([])
})

test('contrast and sequence cases support keyboard selection and direct deep links', async ({
  page,
}) => {
  for (const kind of ['contrast', 'sequence'] as const) {
    const guide = sample(kind)
    const prefix = kind === 'contrast' ? 'case-variation' : 'transaction-stage'
    await page.goto(`/docs/${guide.lessonSlug}/#${prefix}-2`)
    await expect(page.locator(`#${prefix}-2`)).toBeVisible()
    const tabs = page.locator('.case-lab [role="tab"]')
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
    await tabs.first().click()
    await expect(page.locator(`#${prefix}-2`)).toBeHidden()
    await tabs.first().press(kind === 'contrast' ? 'ArrowRight' : 'ArrowDown')
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator(`#${prefix}-2`)).toBeVisible()
  }
})

test('decision labs explain every choice and reset without recording a practice score', async ({
  page,
}) => {
  const guide = sample('decision')
  await page.goto(`/docs/${guide.lessonSlug}/#case-lab`)
  const lab = page.locator('.case-lab')
  const initialStudy = await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))
  await expect(lab.getByRole('button', { name: 'Check reasoning' })).toBeDisabled()
  const choices = lab.getByRole('radio')
  for (let index = 0; index < (await choices.count()); index++) {
    await choices.nth(index).check()
    await lab.getByRole('button', { name: 'Check reasoning' }).click()
    await expect(page.locator(`#decision-reason-${index + 1}`)).toBeVisible()
    await expect(lab.locator('[role="status"]')).toHaveCount(1)
    await lab.getByRole('button', { name: 'Reset decision' }).click()
    await expect(lab.locator('.decision-feedback:visible')).toHaveCount(0)
  }
  await page.goto(`/docs/${guide.lessonSlug}/#decision-reason-2`)
  await expect(page.locator('#decision-reason-2')).toBeVisible()
  await expect(choices.nth(1)).toBeChecked()
  expect(await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))).toBe(initialStudy)
})

test('worked calculations advance, reverse, use keyboard and reveal a linked step', async ({
  page,
}) => {
  const guide = sample('calculation')
  await page.goto(`/docs/${guide.lessonSlug}/#case-lab`)
  const lab = page.locator('.case-lab')
  await expect(lab.getByRole('button', { name: 'Previous calculation step' })).toBeDisabled()
  await lab.getByRole('button', { name: 'Next step', exact: true }).click()
  await expect(page.locator('#calculation-step-2')).toBeVisible()
  await lab.getByRole('button', { name: 'Previous calculation step' }).click()
  await expect(page.locator('#calculation-step-1')).toBeVisible()
  const tabs = lab.getByRole('tab')
  await tabs.first().focus()
  await tabs.first().press('End')
  await expect(tabs.last()).toBeFocused()
  await expect(tabs.last()).toHaveAttribute('aria-selected', 'true')
  await expect(lab.getByRole('button', { name: 'Next step', exact: true })).toBeDisabled()
  await page.goto(`/docs/${guide.lessonSlug}/#calculation-step-2`)
  await expect(page.locator('#calculation-step-2')).toBeVisible()
})

test('new case and pitfall search results reveal their exact explanations', async ({ page }) => {
  const guide = sample('calculation')
  if (guide.lab.kind !== 'calculation') throw new Error('Missing calculation fixture')
  const title = `${guide.lab.title}: ${guide.lab.steps[1].label}`
  await page.goto('/')
  await page.getByRole('button', { name: 'Search textbook', exact: true }).click()
  await page.getByRole('combobox', { name: 'Search textbook' }).fill(title)
  await page.getByRole('option').filter({ hasText: title }).click()
  await expect(page).toHaveURL(new RegExp(`${guide.lessonSlug}/#calculation-step-2$`))
  await expect(page.locator('#calculation-step-2')).toBeVisible()
  for (let repeat = 0; repeat < 2; repeat++) {
    await page.locator('.case-lab [role="tab"]').first().click()
    await expect(page.locator('#calculation-step-2')).toBeHidden()
    await page.getByRole('button', { name: 'Search textbook', exact: true }).click()
    await page.getByRole('combobox', { name: 'Search textbook' }).fill(title)
    await page.getByRole('combobox', { name: 'Search textbook' }).press('Enter')
    await expect(page.locator('#calculation-step-2')).toBeVisible()
  }
  await page.getByRole('button', { name: 'Search textbook', exact: true }).click()
  await page.getByRole('combobox', { name: 'Search textbook' }).fill(guide.pitfalls[1].trap)
  await page.getByRole('option').filter({ hasText: guide.pitfalls[1].trap }).click()
  await expect(page.locator('#pitfall-2-detail')).toBeVisible()
  await page.locator('#pitfall-2 button').click()
  await page.getByRole('button', { name: 'Search textbook', exact: true }).click()
  await page.getByRole('combobox', { name: 'Search textbook' }).fill(guide.pitfalls[1].trap)
  await page.getByRole('option').filter({ hasText: guide.pitfalls[1].trap }).click()
  await expect(page.locator('#pitfall-2-detail')).toBeVisible()
})

test('same-chapter search opens a nested explanation and repeats the current anchor', async ({
  page,
}) => {
  const lesson = lessons.find((lesson) =>
    getHeadings(lesson.body).some((heading) => heading.depth === 3)
  )!
  const heading = getHeadings(lesson.body).find((heading) => heading.depth === 3)!
  await page.goto(`/docs/${lesson.slug}/`)
  const explanation = page.locator(`[id="${heading.id}-detail"]`)
  for (let repeat = 0; repeat < 2; repeat++) {
    await expect(explanation).toBeHidden()
    await page.getByRole('button', { name: 'Search textbook', exact: true }).click()
    await page.getByRole('combobox', { name: 'Search textbook' }).fill(heading.text)
    await page
      .getByRole('option')
      .filter({ has: page.locator('strong', { hasText: heading.text }) })
      .click()
    await expect(explanation).toBeVisible()
    await page.locator(`[id="${heading.id}"] button`).click()
  }
})

test('all lab families have complete full-reference, print, and no-JavaScript views', async ({
  page,
  browser,
}) => {
  for (const kind of ['contrast', 'sequence', 'decision', 'calculation']) {
    const guide = sample(kind)
    await page.goto(`/docs/${guide.lessonSlug}/#case-lab`)
    const expectedPanels =
      guide.lab.kind === 'contrast'
        ? guide.lab.cases.length
        : guide.lab.kind === 'decision'
          ? guide.lab.choices.length
          : guide.lab.steps.length
    await expect(
      page.locator(
        '.case-lab .lab-panel, .case-lab .decision-feedback, .case-lab .calculation-step'
      )
    ).toHaveCount(expectedPanels)
    await page.getByRole('radio', { name: 'Full chapter', exact: true }).click()
    await expect(page.locator('.reading-section-content[hidden]')).toHaveCount(0)
    expect(
      await page
        .locator('.case-lab .lab-panel, .case-lab .decision-feedback, .case-lab .calculation-step')
        .evaluateAll((elements) =>
          elements.every((element) => element.getBoundingClientRect().height > 0)
        )
    ).toBe(true)
    await page.getByRole('radio', { name: 'Focused', exact: true }).click()
    await page.emulateMedia({ media: 'print' })
    expect(
      await page
        .locator(
          '.reading-section-content, .reading-detail-content, .case-lab .lab-panel, .case-lab .decision-feedback, .case-lab .calculation-step'
        )
        .evaluateAll((elements) =>
          elements.every((element) => element.getBoundingClientRect().height > 0)
        )
    ).toBe(true)
    await page.emulateMedia({ media: 'screen' })
  }
  const context = await browser.newContext({ javaScriptEnabled: false })
  const noScript = await context.newPage()
  for (const kind of ['contrast', 'sequence', 'decision', 'calculation']) {
    const guide = sample(kind)
    await noScript.goto(new URL(`/docs/${guide.lessonSlug}/`, page.url()).href)
    await expect(noScript.locator('.reading-section-content')).toHaveCount(guide.sections.length)
    const expectedPanels =
      guide.lab.kind === 'contrast'
        ? guide.lab.cases.length
        : guide.lab.kind === 'decision'
          ? guide.lab.choices.length
          : guide.lab.steps.length
    await expect(
      noScript.locator(
        '.case-lab .lab-panel, .case-lab .decision-feedback, .case-lab .calculation-step'
      )
    ).toHaveCount(expectedPanels)
    expect(
      await noScript
        .locator(
          '.reading-section-content, .reading-detail-content, .case-lab .lab-panel, .case-lab .decision-feedback, .case-lab .calculation-step'
        )
        .evaluateAll((elements) =>
          elements.every((element) => element.getBoundingClientRect().height > 0)
        )
    ).toBe(true)
  }
  await context.close()
})

test('chapter and case layouts remain legible across desktop and mobile', async ({ page }) => {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const kind of ['contrast', 'sequence', 'decision', 'calculation']) {
      const guide = sample(kind)
      await page.goto(`/docs/${guide.lessonSlug}/#case-lab`)
      await page.locator('.case-lab').screenshot({ path: `test-results/lab-${kind}-${width}.png` })
    }
    await page.goto('/docs/ownership-property-rights/')
    await page.screenshot({ path: `test-results/reader-${width}.png` })
  }
  await page.goto('/sources/')
  await expect(page.locator('.depth-review details')).toHaveCount(7)
  await page.locator('.depth-review summary').first().click()
  await expect(page.locator('.depth-review article:visible')).toHaveCount(6)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
