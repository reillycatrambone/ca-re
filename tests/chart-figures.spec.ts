import { expect, test } from '@playwright/test'
import { learningFigures } from '../lib/learning-figures'

for (const mode of ['desktop', 'mobile', 'dark', 'print'] as const) {
  test(`teaching charts show nonblank graphs and accessible values in ${mode}`, async ({
    page,
  }, testInfo) => {
    const charts = learningFigures.filter((figure) => figure.kind === 'chart')
    expect(charts.length, 'Chart format must be used in actual chapters.').toBeGreaterThan(0)
    await page.setViewportSize({ width: mode === 'mobile' ? 320 : 1440, height: 1000 })
    await page.addInitScript(
      (theme) => localStorage.setItem('theme', theme),
      mode === 'dark' ? 'dark' : 'light'
    )
    await page.emulateMedia({ media: mode === 'print' ? 'print' : 'screen' })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    for (const slug of new Set(charts.map((figure) => figure.lessonSlug))) {
      await page.goto(`/docs/${slug}/`)
      if (mode === 'dark') await expect(page.locator('html')).toHaveClass(/dark/)
      for (const chart of charts.filter((figure) => figure.lessonSlug === slug)) {
        const visual = page.locator(`#${chart.id}`)
        const plot = visual.getByRole('img')
        await expect(plot).toHaveAccessibleName(
          `${chart.title}: ${chart.yAxis.label} by ${chart.xAxis.label}`
        )
        await expect(plot.locator('polyline')).toHaveCount(chart.series.length)
        const geometry = await plot.evaluate((svg) => {
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
            paths: [...svg.querySelectorAll('polyline')].map((line) => ({
              length: line.getTotalLength(),
              stroke: getComputedStyle(line).stroke,
            })),
          }
        })
        expect(geometry.width).toBeGreaterThan(200)
        expect(geometry.height).toBeGreaterThan(100)
        expect(geometry.clipped, chart.id).toBe(false)
        expect(geometry.overlapping, chart.id).toBe(false)
        for (const path of geometry.paths) {
          expect(path.length).toBeGreaterThan(10)
          expect(path.stroke).not.toBe('none')
        }
        const summary = visual.locator('summary')
        if (mode !== 'print') {
          await expect(visual.locator('table')).not.toBeVisible()
          await summary.focus()
          await page.keyboard.press('Enter')
        }
        await expect(visual.locator('table')).toBeVisible()
        await expect(visual.locator('tbody tr')).toHaveCount(
          chart.series.reduce((sum, series) => sum + series.points.length, 0)
        )
        expect(
          await visual.evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
          chart.id
        ).toBe(true)
        const figureHeight = await visual.evaluate(
          (element) => element.getBoundingClientRect().height
        )
        await page.setViewportSize({
          width: mode === 'mobile' ? 320 : 1440,
          height: Math.ceil(figureHeight) + 200,
        })
        await visual.evaluate((element) => {
          element.scrollIntoView({ block: 'start' })
          window.scrollBy(0, -100)
        })
        await visual.screenshot({ path: testInfo.outputPath(`${chart.id}.png`) })
        await page.setViewportSize({ width: mode === 'mobile' ? 320 : 1440, height: 1000 })
      }
    }
    expect(errors).toEqual([])
  })
}
