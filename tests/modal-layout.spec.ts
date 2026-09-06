import { test, expect, type Locator, type Page } from '@playwright/test'

async function expectWithinViewport(locator: Locator, page: Page, inset = 0) {
  await expect(locator).toBeVisible()
  await expect
    .poll(async () => {
      const rect = await locator.boundingBox()
      const viewport = page.viewportSize()!
      return Boolean(
        rect &&
          rect.x >= inset - 1 &&
          rect.y >= inset - 1 &&
          rect.x + rect.width <= viewport.width - inset + 1 &&
          rect.y + rect.height <= viewport.height - inset + 1
      )
    })
    .toBe(true)
}

test('header controls never overlap or leave the viewport between responsive breakpoints', async ({
  page,
}) => {
  await page.goto('/')
  for (let width = 320; width <= 1440; width += 10) {
    await page.setViewportSize({ width, height: 850 })
    const issues = await page.locator('.app-header').evaluate((header) => {
      const nodes = [...header.querySelectorAll('a, button')]
        .map((element) => ({
          label: element.getAttribute('aria-label') || element.textContent?.trim(),
          rect: element.getBoundingClientRect(),
        }))
        .filter(({ rect }) => rect.width && rect.height)
      return nodes.flatMap((node, index) => [
        ...(node.rect.left < 0 || node.rect.right > innerWidth
          ? [`Outside viewport: ${node.label}`]
          : []),
        ...nodes
          .slice(index + 1)
          .filter(
            (other) =>
              node.rect.left < other.rect.right &&
              node.rect.right > other.rect.left &&
              node.rect.top < other.rect.bottom &&
              node.rect.bottom > other.rect.top
          )
          .map((other) => `Overlap: ${node.label} / ${other.label}`),
      ])
    })
    expect(issues, `${width}px`).toEqual([])
  }
})

for (const viewport of [
  { width: 320, height: 568 },
  { width: 568, height: 220 },
  { width: 740, height: 320 },
]) {
  test(`search stays contained and restores keyboard focus at ${viewport.width}x${viewport.height}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(viewport)
    await page.goto('/')
    const trigger = page.getByRole('button', { name: 'Search textbook', exact: true })
    const dialog = page.getByRole('dialog', { name: 'Search textbook' })
    await trigger.click()
    await expectWithinViewport(dialog, page, 16)
    await expectWithinViewport(dialog.getByRole('button', { name: 'Close search' }), page)
    await page.getByRole('combobox').fill('agency')
    await expect(page.getByRole('option')).toHaveCount(12)
    for (let index = 0; index < 11; index++) await page.getByRole('combobox').press('ArrowDown')
    const selected = await page.locator('#search-11').boundingBox()
    const results = await page.locator('.search-results').boundingBox()
    expect(selected!.y + selected!.height).toBeLessThanOrEqual(results!.y + results!.height + 1)
    await expectWithinViewport(dialog, page, 16)
    await page.screenshot({ path: testInfo.outputPath('search.png') })
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
    await page.keyboard.press('Control+k')
    await expect(dialog).toBeVisible()
    await dialog.getByRole('button', { name: 'Close search' }).click()
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })
}

test('landscape question navigator fits, reaches question 150 and restores focus', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 740, height: 320 })
  await page.goto('/practice/')
  await page.getByRole('tab', { name: 'Mock exam' }).click()
  await page.getByRole('button', { name: 'Start timed exam' }).click()
  const trigger = page.getByRole('button', { name: 'Question navigator', exact: true })
  const dialog = page.getByRole('dialog', { name: 'Questions', exact: true })
  await trigger.click()
  await expectWithinViewport(dialog, page, 16)
  await expectWithinViewport(dialog.getByRole('button', { name: 'Close navigator' }), page)
  await expect(page.locator('.question-map button')).toHaveCount(150)
  const lastQuestion = dialog.getByRole('button', { name: 'Question 150, unanswered', exact: true })
  await lastQuestion.scrollIntoViewIfNeeded()
  await expectWithinViewport(lastQuestion, page)
  await page.screenshot({ path: testInfo.outputPath('navigator.png') })
  await lastQuestion.click()
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
  await expect(page.locator('.session-question-meta')).toContainText('Question 150 of 150')
  await trigger.click()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
  const saved = await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))
  const finish = page.getByRole('button', { name: 'Finish', exact: true })
  await finish.click()
  const confirm = page.getByRole('dialog', { name: 'Finish this session?' })
  await expectWithinViewport(confirm, page, 16)
  await confirm.getByRole('button', { name: 'Keep working' }).click()
  await expect(confirm).toBeHidden()
  await expect(finish).toBeFocused()
  expect(await page.evaluate(() => localStorage.getItem('ca-re:study:v1'))).toBe(saved)
})
