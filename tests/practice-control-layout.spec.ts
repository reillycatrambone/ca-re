import { expect, test, type Page } from '@playwright/test'

async function expectControlsFit(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    page.viewportSize()!.width
  )
  for (const control of await page.locator('.study-toolbar .field, .study-toolbar select').all()) {
    const box = await control.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width)
  }
}

for (const width of [320, 1440]) {
  test(`practice controls display the longest concept label without clipping at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 740 })
    await page.goto('/practice/')
    const concept = page.getByRole('combobox', { name: 'Concept', exact: true })
    await expect(concept).toBeVisible()
    await expectControlsFit(page)
    const wrapper = page.locator('.wrapping-select')
    const initialHeight = (await wrapper.boundingBox())!.height
    const longest = await concept.evaluate(async (select: HTMLSelectElement) => {
      await document.fonts.ready
      const context = document.createElement('canvas').getContext('2d')!
      const style = getComputedStyle(select)
      context.font = `${style.fontSize} ${style.fontFamily}`
      return [...select.options]
        .map((option) => ({
          value: option.value,
          label: option.text,
          width: context.measureText(option.text).width,
        }))
        .sort((a, b) => b.width - a.width)[0]
    })
    await concept.selectOption(longest.value)
    await concept.focus()
    await expect(concept).toBeFocused()
    await expect(concept).toHaveAccessibleName('Concept')
    const label = wrapper.locator('.wrapping-select-value')
    await expect(label).toHaveText(longest.label)
    expect((await wrapper.boundingBox())!.height).toBe(initialHeight)
    await expect(label).toHaveAttribute('aria-hidden', 'true')
    await expect(wrapper).toHaveCSS('outline-style', 'solid')
    expect(
      await label.evaluate((element) => {
        const bounds = element.getBoundingClientRect()
        const range = document.createRange()
        range.selectNodeContents(element)
        const lines = [...range.getClientRects()]
        return (
          lines.length > 0 &&
          lines.every(
            (line) =>
              line.left >= bounds.left - 1 &&
              line.right <= bounds.right + 1 &&
              line.top >= bounds.top - 1 &&
              line.bottom <= bounds.bottom + 1
          )
        )
      })
    ).toBe(true)
    await expectControlsFit(page)
    if (width === 320)
      await page.locator('.study-toolbar').screenshot({
        path: testInfo.outputPath('longest-concept-label.png'),
      })
    await page.getByRole('button', { name: 'Start practice', exact: true }).click()
    await expect(page.locator('.active-session')).toBeVisible()
    await page.getByRole('button', { name: 'Finish', exact: true }).click()
    await page.getByRole('button', { name: 'Finish and score', exact: true }).click()
    await expect(page.getByRole('radiogroup', { name: 'Answer review filter' })).toBeVisible()
    await expectControlsFit(page)
    await page.getByRole('button', { name: 'New session', exact: true }).click()
    await expect(label).toHaveText(longest.label)
    await expectControlsFit(page)
  })
}
