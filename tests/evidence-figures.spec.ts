import { expect, test } from '@playwright/test'
import { learningFigures } from '../lib/learning-figures'
import { legacyVisuals } from '../lib/learning-figures/inventory'

const specimens = learningFigures.filter((figure) =>
  ['document', 'ledger', 'timeline'].includes(figure.kind)
)

for (const mode of ['desktop', 'mobile', 'dark', 'print'] as const) {
  test(`evidence specimens render readable fields and balances in ${mode}`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(180000)
    await page.setViewportSize({ width: mode === 'mobile' ? 320 : 1440, height: 1000 })
    await page.addInitScript(
      (theme) => localStorage.setItem('theme', theme),
      mode === 'dark' ? 'dark' : 'light'
    )
    await page.emulateMedia({
      colorScheme: mode === 'dark' ? 'dark' : 'light',
      media: mode === 'print' ? 'print' : 'screen',
    })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    for (const slug of new Set(specimens.map((figure) => figure.lessonSlug))) {
      await page.goto(`/docs/${slug}/`)
      if (mode === 'dark') await expect(page.locator('html')).toHaveClass(/dark/)
      for (const figure of specimens.filter((entry) => entry.lessonSlug === slug)) {
        const visual = page.locator(`figure#${figure.id}`)
        await expect(visual).toHaveAccessibleName(figure.title)
        await expect(visual).toBeVisible()
        const overflow = await visual
          .locator('p, th, td, strong, .specimen-field, .timeline-when')
          .evaluateAll((elements) =>
            elements
              .filter((element) => element.scrollWidth > element.clientWidth + 1)
              .map((element) => element.textContent)
          )
        expect(overflow, figure.id).toEqual([])
        expect(
          await visual.evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
          figure.id
        ).toBe(true)
        if (figure.kind === 'document') {
          await expect(
            visual.getByText('Fictional educational excerpt / Not for execution', { exact: true })
          ).toBeVisible()
          await expect(visual.locator('.specimen-fields > li')).toHaveCount(figure.fields.length)
        }
        if (figure.kind === 'ledger')
          await expect(visual.locator('tbody tr')).toHaveCount(figure.entries.length)
        if (figure.kind === 'timeline')
          await expect(visual.locator('.evidence-timeline li')).toHaveCount(figure.events.length)
        await visual.screenshot({ path: testInfo.outputPath(`${figure.id}.png`) })
      }
      if (mode !== 'print')
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true
        )
    }
    expect(errors).toEqual([])
  })
}

test('legacy visuals in the inventory correspond to nine actual named chapter artifacts', async ({
  page,
}) => {
  for (const visual of legacyVisuals) {
    await page.goto(`/docs/${visual.lessonSlug}/`)
    const artifact = page.locator(`figure#${visual.id}`)
    await expect(artifact).toHaveCount(1)
    await expect(artifact).toBeVisible()
    expect(
      (await artifact.getAttribute('aria-label')) ||
        (await artifact.getAttribute('aria-labelledby'))
    ).toBeTruthy()
  }
})
