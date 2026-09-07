import { expect, test } from '@playwright/test'
import { getLessons } from '../lib/content'
import { learningFigures } from '../lib/learning-figures'

const modes = [
  { name: 'desktop-light', width: 1440, dark: false, print: false },
  { name: 'desktop-dark', width: 1440, dark: true, print: false },
  { name: 'mobile-light', width: 320, dark: false, print: false },
  { name: 'mobile-dark', width: 320, dark: true, print: false },
  { name: 'print', width: 1440, dark: false, print: true },
] as const

for (const mode of modes) {
  test(`complete edition preserves chapter and figure geometry in ${mode.name}`, async ({
    page,
  }, info) => {
    test.setTimeout(240000)
    await page.setViewportSize({ width: mode.width, height: 1000 })
    await page.addInitScript(
      (theme) => localStorage.setItem('theme', theme),
      mode.dark ? 'dark' : 'light'
    )
    await page.emulateMedia({
      media: mode.print ? 'print' : 'screen',
      colorScheme: mode.dark ? 'dark' : 'light',
    })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    for (const lesson of getLessons()) {
      await page.goto(`/docs/${lesson.slug}/`)
      await expect(page.locator('h1')).toHaveText(lesson.title)
      if (mode.dark) await expect(page.locator('html')).toHaveClass(/dark/)
      const specs = learningFigures.filter((figure) => figure.lessonSlug === lesson.slug)
      const geometry = await page.locator('.learning-figure').evaluateAll((figures) =>
        figures.map((figure) => {
          const rect = figure.getBoundingClientRect()
          const label = figure.getAttribute('aria-labelledby')
          return {
            id: figure.id,
            title: label
              ? document.getElementById(label)?.textContent
              : figure.getAttribute('aria-label'),
            visible: rect.width > 0 && rect.height > 0,
            overflow: figure.scrollWidth > figure.clientWidth + 1,
            clipped: [...figure.querySelectorAll('p, th, td, dt, dd, li, figcaption')]
              .filter(
                (element) =>
                  element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 1
              )
              .map((element) => element.textContent),
          }
        })
      )
      for (const spec of specs) {
        const result = geometry.find((figure) => figure.id === spec.id)
        expect(result, spec.id).toBeDefined()
        expect(result?.visible, spec.id).toBe(true)
        expect(result?.title?.trim(), spec.id).toBe(spec.title)
        expect(result?.overflow, spec.id).toBe(false)
        expect(result?.clipped, spec.id).toEqual([])
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        lesson.slug
      ).toBe(true)
      const sample = specs[(mode.dark ? 1 : mode.print ? 2 : 0) % specs.length]
      await page
        .locator(`#${sample.id}`)
        .screenshot({ path: info.outputPath(`${lesson.slug}.png`) })
    }
    expect(errors).toEqual([])
  })
}
