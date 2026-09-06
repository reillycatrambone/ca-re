import { test, expect, type Page } from '@playwright/test'
import { getLessons } from '../lib/content'

async function duplicateDividers(page: Page) {
  return page.locator('main').evaluate((main) => {
    const selectors = [
      '.concept-figure',
      '.learning-figure',
      '.reading-section',
      '.guide-overview',
      '.case-lab',
      '.guide-connections > a',
      '.chapter-quiz',
      '.lesson-sources',
      '.page-footer',
      '.math-calculator',
      '.figure-calculation dl > div',
      '.figure-result',
      '.coverage-unit',
      '.study-toolbar',
      '.depth-review details',
      '.depth-review article',
      '.unit-section',
      '.review-question',
      '.source-row',
      '.calculation-inputs',
      '.calculation-step',
      '.lab-panel',
      '.lab-takeaway',
      '.reference-table tr:last-child td',
      '.lesson-prose tr:last-child td',
    ].join(', ')
    const lines: { y: number; left: number; right: number; owner: string }[] = []
    for (const element of main.querySelectorAll<HTMLElement>(selectors)) {
      const rect = element.getBoundingClientRect()
      if (!rect.width || !rect.height) continue
      const style = getComputedStyle(element)
      const owner = `${element.tagName}.${element.className || element.id}`
      if (parseFloat(style.borderTopWidth) > 0 && style.borderTopStyle !== 'none')
        lines.push({ y: rect.top, left: rect.left, right: rect.right, owner: `${owner}:top` })
      if (parseFloat(style.borderBottomWidth) > 0 && style.borderBottomStyle !== 'none')
        lines.push({ y: rect.bottom, left: rect.left, right: rect.right, owner: `${owner}:bottom` })
    }
    const content: DOMRect[] = []
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
      if (!walker.currentNode.textContent?.trim()) continue
      if (walker.currentNode.parentElement?.closest('script, style')) continue
      const range = document.createRange()
      range.selectNodeContents(walker.currentNode)
      content.push(
        ...Array.from(range.getClientRects()).filter((rect) => rect.width && rect.height)
      )
    }
    for (const element of main.querySelectorAll('svg, img, input, button')) {
      const rect = element.getBoundingClientRect()
      if (rect.width && rect.height) content.push(rect)
    }
    lines.sort((a, b) => a.y - b.y)
    const duplicates: string[] = []
    for (let index = 0; index < lines.length; index++) {
      const first = lines[index]
      for (const second of lines.slice(index + 1)) {
        if (second.y - first.y > 100) break
        const left = Math.max(first.left, second.left)
        const right = Math.min(first.right, second.right)
        if (right - left < Math.min(first.right - first.left, second.right - second.left) * 0.8)
          continue
        // Table cells meeting along a row are one continuous divider, not parallel rules.
        if (Math.abs(second.y - first.y) < 2 && first.owner === second.owner) continue
        const hasContent = content.some(
          (rect) =>
            rect.bottom > first.y + 2 &&
            rect.top < second.y - 2 &&
            rect.right > left &&
            rect.left < right
        )
        if (!hasContent)
          duplicates.push(
            `${first.owner} -> ${second.owner} (${Math.round(second.y - first.y)}px gap)`
          )
      }
    }
    return duplicates
  })
}

test('chapters and reference views never stack empty horizontal dividers', async ({ page }) => {
  test.setTimeout(180000)
  for (const width of [1440, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const lesson of getLessons()) {
      await page.goto(`/docs/${lesson.slug}/`)
      expect(await duplicateDividers(page), `${lesson.slug}, ${width}px`).toEqual([])
    }
    for (const route of ['/', '/practice/', '/flashcards/', '/glossary/', '/math/', '/sources/']) {
      await page.goto(route)
      if (route === '/sources/') {
        for (const summary of await page
          .locator('.coverage-unit > summary, .depth-review details > summary')
          .all())
          await summary.click()
      }
      expect(await duplicateDividers(page), `${route}, ${width}px`).toEqual([])
    }
  }
})
