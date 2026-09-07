import { expect, test } from '@playwright/test'
import { getLessons } from '../lib/content'
import { getHeadings } from '../lib/headings'
import { learningFigures } from '../lib/learning-figures'

const supplemental = learningFigures.filter((figure) => figure.id.startsWith('supplement-'))

test('every chapter retains its original figures and every expansion has a valid anchor', () => {
  const lessons = getLessons()
  const baseline = learningFigures.filter((figure) => !figure.id.startsWith('exp-'))
  expect(baseline).toHaveLength(66)
  expect(supplemental).toHaveLength(33)
  expect(new Set(learningFigures.map((figure) => figure.id)).size).toBe(learningFigures.length)
  for (const lesson of lessons) {
    const figures = learningFigures.filter((figure) => figure.lessonSlug === lesson.slug)
    expect(baseline.filter((figure) => figure.lessonSlug === lesson.slug), lesson.slug).toHaveLength(2)
    expect(
      figures.filter((figure) => figure.id.startsWith('supplement-')),
      lesson.slug
    ).toHaveLength(1)
    expect(new Set(figures.map((figure) => figure.afterSection)).size, lesson.slug).toBeGreaterThanOrEqual(2)
    const sections = getHeadings(lesson.body).filter((heading) => [2, 3].includes(heading.depth))
    for (const figure of figures)
      expect(
        sections.some((section) => section.id === figure.afterSection),
        figure.id
      ).toBe(true)
  }
})

test('all supplemental visuals fit desktop and mobile with accessible relationship labels', async ({
  page,
}) => {
  test.setTimeout(180000)
  expect(supplemental).toHaveLength(33)
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const width of [1440, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const figure of supplemental) {
      await page.goto(`/docs/${figure.lessonSlug}/#${figure.id}`)
      const visual = page.locator(`figure#${figure.id}`)
      await expect(visual).toHaveAccessibleName(figure.title)
      await expect(visual).toBeInViewport()
      await expect(visual.locator('figcaption')).toContainText(figure.caption)
      expect(
        await visual.evaluate(
          (element) =>
            element.closest<HTMLElement>('[data-reading-section]')?.dataset.readingSection
        ),
        figure.id
      ).toBe(figure.afterSection)
      const overflow = await visual.evaluate((element) => {
        const boxes = [
          element,
          ...element.querySelectorAll('dt, dd, li, p, .learning-figure-heading'),
        ]
        return boxes
          .filter((box) => box.clientWidth > 0 && box.scrollWidth > box.clientWidth + 1)
          .map((box) => box.className || box.tagName)
      })
      expect(overflow, `${figure.id}, ${width}px`).toEqual([])
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        figure.id
      ).toBe(true)
      if (figure.kind !== 'relationship') continue

      await expect(visual.locator('.relationship-center')).toContainText(figure.center.label)
      await expect(visual.locator('.relationship-center')).toContainText(figure.center.detail)
      await expect(visual.locator('.relationship-details > div')).toHaveCount(figure.nodes.length)
      for (const [index, node] of figure.nodes.entries()) {
        const entry = visual.locator('.relationship-details > div').nth(index)
        await expect(entry.locator('dt')).toContainText(node.label)
        await expect(entry.locator('dt')).toContainText(node.connection)
        await expect(entry.locator('dd')).toHaveText(node.detail)
        await expect(entry).toBeVisible()
      }
      const map = visual.locator('.relationship-map')
      await expect(map).toHaveAttribute('aria-hidden', 'true')
      if (width === 320) {
        await expect(map).toBeHidden()
        const branches = await visual
          .locator('.relationship-details > div')
          .evaluateAll((elements) =>
            elements.map((element) => ({
              left: element.getBoundingClientRect().left,
              top: element.getBoundingClientRect().top,
              bottom: element.getBoundingClientRect().bottom,
              border: getComputedStyle(element).borderLeftWidth,
              connector: getComputedStyle(element, '::before').borderTopWidth,
            }))
          )
        for (const [index, branch] of branches.entries()) {
          expect(branch.border).toBe('1px')
          expect(branch.connector).toBe('1px')
          if (index > 0) {
            expect(branch.left).toBe(branches[0].left)
            expect(branch.top).toBeGreaterThanOrEqual(branches[index - 1].bottom - 1)
          }
        }
      } else {
        await expect(map).toBeVisible()
        await expect(map.locator('.relationship-node')).toHaveCount(figure.nodes.length)
        const problems = await map.evaluate((element) => {
          const bounds = element.getBoundingClientRect()
          const labels = [...element.querySelectorAll('text')].map((label) => ({
            text: label.textContent,
            bounds: label.getBoundingClientRect(),
          }))
          const problems: string[] = []
          for (const [index, label] of labels.entries()) {
            const box = label.bounds
            if (
              !box.width ||
              !box.height ||
              box.left < bounds.left ||
              box.right > bounds.right ||
              box.top < bounds.top ||
              box.bottom > bounds.bottom
            )
              problems.push(`Clipped label: ${label.text}`)
            for (const other of labels.slice(index + 1)) {
              const overlapX =
                Math.min(box.right, other.bounds.right) - Math.max(box.left, other.bounds.left)
              const overlapY =
                Math.min(box.bottom, other.bounds.bottom) - Math.max(box.top, other.bounds.top)
              if (overlapX > 1 && overlapY > 1)
                problems.push(`Overlapping labels: ${label.text} / ${other.text}`)
            }
          }
          return problems
        })
        expect(problems, figure.id).toEqual([])
      }
    }
  }
  expect(errors).toEqual([])
})

test('new visual families remain readable in both themes and searchable at their exact anchors', async ({
  page,
}, testInfo) => {
  test.setTimeout(180000)
  const threeNodes = supplemental.find(
    (figure) => figure.kind === 'relationship' && figure.nodes.length === 3
  )
  const fourNodes = supplemental.find(
    (figure) => figure.kind === 'relationship' && figure.nodes.length === 4
  )
  expect(threeNodes).toBeDefined()
  expect(fourNodes).toBeDefined()
  const otherFamilies = [
    ...new Set(
      supplemental.filter((figure) => figure.kind !== 'relationship').map((figure) => figure.kind)
    ),
  ]
  const samples = [
    threeNodes!,
    fourNodes!,
    ...otherFamilies.map((kind) => supplemental.find((figure) => figure.kind === kind)!),
  ]
  await page.goto('/')
  for (const theme of ['light', 'dark']) {
    await page.evaluate((value) => localStorage.setItem('theme', value), theme)
    for (const width of [1440, 320]) {
      await page.setViewportSize({ width, height: 1000 })
      for (const figure of samples) {
        await page.goto(`/docs/${figure.lessonSlug}/#${figure.id}`)
        await expect(page.locator('html')).toHaveClass(new RegExp(theme))
        const visual = page.locator(`figure#${figure.id}`)
        await expect(visual).toBeVisible()
        await visual.screenshot({ path: testInfo.outputPath(`${figure.id}-${theme}-${width}.png`) })
      }
    }
  }
  await page.goto('/')
  for (const figure of [threeNodes!, fourNodes!]) {
    await page.getByRole('button', { name: 'Search textbook', exact: true }).click()
    await page.getByRole('combobox', { name: 'Search textbook' }).fill(figure.title)
    const result = page
      .getByRole('option')
      .filter({ has: page.locator('strong').and(page.getByText(figure.title, { exact: true })) })
    await result.click()
    await expect(page).toHaveURL(new RegExp(`${figure.lessonSlug}/#${figure.id}$`))
    await expect(page.locator(`#${figure.id}`)).toBeFocused()
    await expect(page.locator(`#${figure.id}`)).toBeInViewport()
  }
})
