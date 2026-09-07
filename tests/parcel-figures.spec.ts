import { expect, test } from '@playwright/test'
import { learningFigures } from '../lib/learning-figures'

for (const mode of ['desktop', 'mobile', 'dark', 'print'] as const) {
  test(`parcel maps preserve geometry, nonoverlapping keys, and text in ${mode}`, async ({
    page,
  }, testInfo) => {
    const figures = learningFigures.filter((figure) => figure.kind === 'parcel')
    expect(
      figures.length,
      'The parcel format must be used by real chapter visuals.'
    ).toBeGreaterThan(0)
    await page.setViewportSize({ width: mode === 'mobile' ? 320 : 1440, height: 1000 })
    await page.addInitScript(
      (theme) => localStorage.setItem('theme', theme),
      mode === 'dark' ? 'dark' : 'light'
    )
    await page.emulateMedia({ media: mode === 'print' ? 'print' : 'screen' })
    for (const slug of new Set(figures.map((figure) => figure.lessonSlug))) {
      await page.goto(`/docs/${slug}/`)
      if (mode === 'dark') await expect(page.locator('html')).toHaveClass(/dark/)
      for (const figure of figures.filter((entry) => entry.lessonSlug === slug)) {
        const visual = page.locator(`#${figure.id}`)
        await expect(visual.getByRole('img')).toHaveAccessibleName(`${figure.title}: parcel plan`)
        await expect(visual.locator('.parcel-legend > div')).toHaveCount(
          figure.areas.length + (figure.lines?.length ?? 0)
        )
        const geometry = await visual.locator('svg').evaluate((svg) => {
          const bounds = svg.getBoundingClientRect()
          const labels = [...svg.querySelectorAll('text')].map((text) =>
            text.getBoundingClientRect()
          )
          return {
            width: bounds.width,
            height: bounds.height,
            clipped: labels.some(
              (label) =>
                label.left < bounds.left ||
                label.right > bounds.right ||
                label.top < bounds.top ||
                label.bottom > bounds.bottom
            ),
            overlapping: labels.some((label, index) =>
              labels
                .slice(index + 1)
                .some(
                  (other) =>
                    label.left < other.right &&
                    label.right > other.left &&
                    label.top < other.bottom &&
                    label.bottom > other.top
                )
            ),
            fills: [...svg.querySelectorAll('rect')].map((rect) => getComputedStyle(rect).fill),
          }
        })
        expect(geometry.width).toBeGreaterThan(200)
        expect(geometry.height).toBeGreaterThan(80)
        expect(geometry.clipped, figure.id).toBe(false)
        expect(geometry.overlapping, figure.id).toBe(false)
        expect(geometry.fills.length).toBe(figure.areas.length)
        expect(
          await visual.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)
        ).toBe(true)
        await visual.screenshot({ path: testInfo.outputPath(`${figure.id}.png`) })
      }
    }
  })
}
