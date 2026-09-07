import { expect, test, type Locator } from '@playwright/test'
import { getLessons } from '../lib/content'
import { learningFigures } from '../lib/learning-figures'
import { getStudyGuides } from '../lib/study-guides/content'
import { seedLongPractice } from './helpers/study-session'

const lessons = getLessons()
const publicViews = ['/', '/practice/', '/flashcards/', '/glossary/', '/math/', '/sources/']
const routes = [...publicViews, ...lessons.map((lesson) => `/docs/${lesson.slug}/`)]

async function expectBorder(locator: Locator, edge: 'Top' | 'Bottom', width: number) {
  await expect(locator.first()).toBeAttached()
  expect(await locator.count()).toBeGreaterThan(0)
  const borders = await locator.evaluateAll(
    (elements, side) => elements.map((element) => getComputedStyle(element)[`border${side}Width`]),
    edge
  )
  expect(borders).toEqual(borders.map(() => `${width}px`))
}

async function expectScrollbarsHidden(locator: Locator) {
  await expect(locator.first()).toBeAttached()
  const styles = await locator.evaluateAll((elements) =>
    elements.map((element) => ({
      scrollbarWidth: getComputedStyle(element).scrollbarWidth,
      webkitDisplay: getComputedStyle(element, '::-webkit-scrollbar').display,
    }))
  )
  expect(styles).toEqual(styles.map(() => ({ scrollbarWidth: 'none', webkitDisplay: 'none' })))
}

for (const width of [1440, 1024, 390, 320]) {
  test(`all public pages keep responsive navigation and a centered content layout at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(180000)
    await page.setViewportSize({ width, height: 1000 })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    for (const route of routes) {
      await page.goto(route)
      await expect(page.locator('main h1')).toBeVisible()
      const desktop = width > 1000
      const menu = page.getByRole('button', { name: 'Open navigation', exact: true })
      if (desktop) {
        await expect(page.locator('.desktop-sidebar')).toBeVisible()
        await expect(menu).toBeHidden()
      } else {
        await expect(page.locator('.desktop-sidebar')).toBeHidden()
        await expect(menu).toBeVisible()
      }
      const layout = await page.evaluate(() => {
        const content = document.querySelector('.page-primary, .standard-page')!
        const bounds = content.getBoundingClientRect()
        const sidebar = document.querySelector('.desktop-sidebar')!.getBoundingClientRect()
        const grid = document.querySelector('.page-grid')?.getBoundingClientRect()
        const aside = document.querySelector('.page-aside')?.getBoundingClientRect()
        return {
          visibleRightSidebars: [...document.querySelectorAll('.page-aside')].filter(
            (element) => element.getBoundingClientRect().width > 0
          ).length,
          center: grid ? grid.left + grid.width / 2 : bounds.left + bounds.width / 2,
          readingAreaCenter: sidebar.right + (innerWidth - sidebar.right) / 2,
          sidebarWidth: sidebar.width,
          clearOfSidebar: bounds.left >= sidebar.right,
          rightSidebarWidth: aside?.width ?? 0,
          rightSidebarGap: aside?.width ? aside.left - bounds.right : 0,
          width: bounds.width,
          chapter: Boolean(document.querySelector('.page-grid')),
          overflow: document.documentElement.scrollWidth > innerWidth,
        }
      })
      const hasRightSidebar = width >= 1280 && layout.chapter
      expect(layout.visibleRightSidebars, route).toBe(hasRightSidebar ? 1 : 0)
      expect(layout.rightSidebarWidth, route).toBe(hasRightSidebar ? 200 : 0)
      expect(layout.rightSidebarGap, route).toBe(hasRightSidebar ? 48 : 0)
      expect(layout.sidebarWidth, route).toBe(desktop ? 260 : 0)
      expect(layout.clearOfSidebar, route).toBe(true)
      expect(Math.abs(layout.center - layout.readingAreaCenter), route).toBeLessThanOrEqual(1)
      expect(layout.width, route).toBeLessThanOrEqual(layout.chapter ? 780 : 940)
      expect(layout.width, route).toBeGreaterThan(250)
      expect(layout.overflow, route).toBe(false)
    }
    expect(errors).toEqual([])
  })
}

test('mobile navigation drawer retains chapter access, dismissal, and focus restoration', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/docs/ownership-legal-descriptions/')
  const trigger = page.getByRole('button', { name: 'Open navigation', exact: true })
  await trigger.click()
  const drawer = page.getByRole('dialog', { name: 'California Real Estate' })
  await expect(drawer).toBeVisible()
  await expect(drawer.getByRole('navigation', { name: 'Textbook navigation' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(drawer).toBeHidden()
  await expect(trigger).toBeFocused()
  await trigger.click()
  const destination = lessons.find((lesson) => lesson.slug === 'ownership-property-rights')!
  await drawer.getByRole('link', { name: destination.title, exact: true }).click()
  await expect(page).toHaveURL(/\/docs\/ownership-property-rights\/$/)
  await expect(drawer).toBeHidden()
  await expect(page.getByRole('heading', { name: destination.title, exact: true })).toBeVisible()
  await expect(page.locator('.desktop-sidebar')).toBeHidden()
})

test('desktop navigation stays pinned and scrolls all chapters without moving the document', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 700 })
  await page.goto('/docs/ownership-legal-descriptions/')
  const sidebar = page.locator('.desktop-sidebar')
  const initialBounds = await sidebar.boundingBox()
  expect(initialBounds).toMatchObject({ x: 0, y: 72, width: 260, height: 628 })
  await page.evaluate(() => window.scrollTo(0, 600))
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0)
  expect(await sidebar.boundingBox()).toEqual(initialBounds)

  await page.evaluate(() => window.scrollTo(0, 0))
  await sidebar.locator('.unit-navigation').evaluateAll((units) => {
    for (const unit of units) unit.setAttribute('open', '')
  })
  await expect(sidebar.locator('.lesson-link')).toHaveCount(lessons.length)
  await expect(sidebar.locator('.lesson-link[aria-current="page"]')).toHaveText(
    lessons.find((lesson) => lesson.slug === 'ownership-legal-descriptions')!.title
  )
  await sidebar.hover()
  await page.mouse.wheel(0, 400)
  await expect.poll(() => sidebar.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
  expect(await page.evaluate(() => scrollY)).toBe(0)
  const destination = lessons.at(-1)!
  const lastChapter = sidebar.getByRole('link', { name: destination.title, exact: true })
  await lastChapter.scrollIntoViewIfNeeded()
  await expect(lastChapter).toBeInViewport()
  const sidebarScroll = await sidebar.evaluate((element) => ({
    scrollTop: element.scrollTop,
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
    documentScroll: scrollY,
  }))
  expect(sidebarScroll.scrollHeight).toBeGreaterThan(sidebarScroll.clientHeight)
  expect(sidebarScroll.scrollTop).toBeGreaterThan(0)
  expect(sidebarScroll.documentScroll).toBe(0)
  expect(await sidebar.boundingBox()).toEqual(initialBounds)
  await lastChapter.click()
  await expect(page).toHaveURL(new RegExp(`/docs/${destination.slug}/$`))
  await expect(page.locator('main h1')).toHaveText(destination.title)
  await expect(sidebar.locator('.lesson-link[aria-current="page"]')).toHaveText(destination.title)
})

test('navigation switches at both breakpoints and leaves no sidebar offset when printed', async ({
  page,
}) => {
  await page.goto('/docs/ownership-legal-descriptions/')
  for (const width of [1000, 1001, 1279, 1280, 1279, 1000, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    const sidebar = page.locator('.desktop-sidebar')
    const menu = page.getByRole('button', { name: 'Open navigation', exact: true })
    if (width > 1000) {
      await expect(sidebar).toBeVisible()
      await expect(menu).toBeHidden()
    } else {
      await expect(sidebar).toBeHidden()
      await expect(menu).toBeVisible()
    }
    if (width >= 1280) {
      await expect(page.locator('.page-aside')).toBeVisible()
    } else {
      await expect(page.locator('.page-aside')).toBeHidden()
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.desktop-sidebar')).toBeHidden()
  await expect(page.locator('.page-aside')).toBeHidden()
  const printBounds = await page.locator('.main-content').boundingBox()
  expect(printBounds!.x + printBounds!.width / 2).toBe(720)
  expect(printBounds!.width).toBeLessThanOrEqual(1440)
  const printGrid = await page.locator('.page-grid').evaluate((element) => ({
    display: getComputedStyle(element).display,
    contentWidth: element.querySelector('.page-primary')!.getBoundingClientRect().width,
    width: element.getBoundingClientRect().width,
  }))
  expect(printGrid.display).toBe('block')
  expect(printGrid.contentWidth).toBe(printGrid.width)
})

test('overview right navigation exposes examination details and working study links', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  const aside = page.locator('.overview-aside')
  await expect(aside).toBeVisible()
  await expect(aside.locator('.exam-facts')).toContainText('Questions150')
  await expect(aside.locator('.exam-facts')).toContainText('Time allowed3 hours')
  await expect(aside.locator('.exam-facts')).toContainText('Passing score70%')
  await expect(aside.getByRole('link', { name: 'DRE exam details' })).toHaveAttribute(
    'href',
    'https://www.dre.ca.gov/Examinees/TakingExam.html'
  )
  for (const [name, path] of [
    ['Practice examination', '/practice/'],
    ['Glossary', '/glossary/'],
    ['Real estate math', '/math/'],
    ['Editorial notes', '/sources/'],
  ]) {
    await aside.getByRole('link', { name, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${path}$`))
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.locator('.page-aside')).toHaveCount(0)
    await page.goto('/')
  }
})

test('right navigation scrolls independently in short viewports and stays pinned to the document', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 400 })
  await page.goto('/')
  const aside = page.locator('.overview-aside')
  await expect(aside).toBeVisible()
  await expectScrollbarsHidden(aside)
  const dimensions = await aside.evaluate((element) => ({
    height: element.clientHeight,
    scrollHeight: element.scrollHeight,
    bottom: element.getBoundingClientRect().bottom,
  }))
  expect(dimensions.height).toBeLessThanOrEqual(272)
  expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.height)
  expect(dimensions.bottom).toBeLessThanOrEqual(400)
  await aside.hover()
  await page.mouse.wheel(0, 200)
  await expect.poll(() => aside.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
  expect(await page.evaluate(() => scrollY)).toBe(0)
  const editorial = aside.getByRole('link', { name: 'Editorial notes' })
  await editorial.scrollIntoViewIfNeeded()
  await expect(editorial).toBeInViewport()
  await page.evaluate(() => window.scrollTo(0, 600))
  await expect
    .poll(() => aside.evaluate((element) => element.getBoundingClientRect().top))
    .toBe(104)
  await page.evaluate(() => window.scrollTo(0, 900))
  await expect
    .poll(() => aside.evaluate((element) => element.getBoundingClientRect().top))
    .toBe(104)
})

test('chapter right navigation reaches section anchors without hiding chapter content', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 500 })
  await page.goto('/docs/ownership-legal-descriptions/')
  const toc = page.getByRole('navigation', { name: 'On this page' })
  await expect(toc).toBeVisible()
  const section = toc.getByRole('link').nth(1)
  const href = await section.getAttribute('href')
  expect(href).toMatch(/^#.+/)
  await section.click()
  await expect(page).toHaveURL(new RegExp(`${href}$`))
  await expect(page.locator(href!)).toBeInViewport()
  await expect(section).toHaveAttribute('aria-current', 'location')
  await expect(page.locator('.reading-section-content[hidden]')).toHaveCount(0)
  const sources = toc.getByRole('link', { name: 'Sources', exact: true })
  await sources.scrollIntoViewIfNeeded()
  await sources.click()
  await expect(page).toHaveURL(/#sources$/)
  await expect(page.locator('#sources')).toBeInViewport()
  await expect(page.locator('.page-aside')).toBeVisible()
})

test('scrollbars stay visually hidden in the document, navigation, search, drawer, and question map', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 700 })
  await page.goto('/docs/ownership-legal-descriptions/')
  await expectScrollbarsHidden(
    page.locator('html, body, .desktop-sidebar, .page-aside, .main-content')
  )
  await page.getByRole('button', { name: 'Search textbook', exact: true }).click()
  await page.getByRole('combobox', { name: 'Search textbook' }).fill('agency')
  await expect(page.getByRole('option')).toHaveCount(12)
  await expectScrollbarsHidden(page.locator('.search-results'))
  await page.keyboard.press('Escape')

  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click()
  const drawer = page.getByRole('dialog', { name: 'California Real Estate' })
  await expect(drawer).toBeVisible()
  await expectScrollbarsHidden(drawer)
  await page.keyboard.press('Escape')

  await seedLongPractice(page)
  await page.getByRole('button', { name: 'Question navigator', exact: true }).click()
  await expect(page.locator('.question-map button')).toHaveCount(150)
  await expectScrollbarsHidden(page.locator('.question-map'))
  const lastQuestion = page.getByRole('button', { name: 'Question 150, unanswered', exact: true })
  await lastQuestion.scrollIntoViewIfNeeded()
  await expect(lastQuestion).toBeInViewport()
  expect(
    await page.locator('.question-map').evaluate((element) => element.scrollTop)
  ).toBeGreaterThan(0)
})

test('chapter dividers have one owner at illustration, lab, quiz, and source boundaries', async ({
  page,
}) => {
  await page.goto('/docs/ownership-legal-descriptions/')
  await expectBorder(page.locator('.concept-figure'), 'Top', 0)
  await expectBorder(page.locator('.concept-figure'), 'Bottom', 1)
  await expectBorder(page.locator('.learning-figure'), 'Bottom', 0)
  await expectBorder(page.locator('.case-lab'), 'Top', 0)
  await expectBorder(page.locator('.chapter-quiz'), 'Bottom', 0)
  await expectBorder(page.locator('.guide-connections > a:last-child'), 'Bottom', 0)
  await expectBorder(page.locator('.lesson-sources'), 'Top', 1)
  await expectBorder(page.locator('.page-footer'), 'Top', 0)

  const calculationFigure = learningFigures.find((figure) => figure.kind === 'calculation')!
  await page.goto(`/docs/${calculationFigure.lessonSlug}/#${calculationFigure.id}`)
  await expect(page.locator(`#${calculationFigure.id}`)).toBeVisible()
  await expectBorder(page.locator('.figure-calculation dl > div:last-child'), 'Bottom', 0)
  await expectBorder(page.locator('.figure-result'), 'Top', 2)

  const calculationGuide = getStudyGuides().find((guide) => guide.lab.kind === 'calculation')!
  await page.goto(`/docs/${calculationGuide.lessonSlug}/#case-lab`)
  await expectBorder(page.locator('.calculation-inputs'), 'Top', 1)
  await expectBorder(page.locator('.calculation-inputs'), 'Bottom', 0)
  await expectBorder(page.locator('.learning-figure'), 'Bottom', 0)
  await expectBorder(page.locator('.case-lab'), 'Top', 0)
  await expectBorder(page.locator('.calculation-inputs'), 'Bottom', 0)
})

test('expanded source tables and reference tools do not add closing double dividers', async ({
  page,
}) => {
  await page.goto('/sources/')
  for (const disclosure of await page.locator('.coverage-unit, .depth-review details').all()) {
    await disclosure.locator('summary').click()
  }
  await expect(page.locator('.coverage-unit[open]')).toHaveCount(7)
  await expect(page.locator('.depth-review details[open]')).toHaveCount(7)
  await expectBorder(page.locator('.reference-table tbody tr:last-child > td'), 'Bottom', 0)
  await expectBorder(page.locator('.page-footer'), 'Top', 0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.goto('/math/')
  await expectBorder(page.locator('.reference-table tbody tr:last-child > td'), 'Bottom', 0)
  await expectBorder(page.locator('.math-calculator'), 'Top', 1)
  await page.goto('/practice/')
  await expectBorder(page.locator('.study-toolbar'), 'Bottom', 0)
})

for (const width of [1440, 390]) {
  for (const theme of ['light', 'dark']) {
    test(`township figure stays readable with responsive navigation in ${theme} at ${width}px`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.addInitScript((value) => localStorage.setItem('theme', value), theme)
      await page.goto('/docs/ownership-legal-descriptions/')
      await expect(page.locator('html')).toHaveClass(new RegExp(theme))
      const figure = page.locator('.concept-figure')
      await expect(figure).toContainText('The township grid')
      await expectBorder(figure, 'Top', 0)
      await figure.scrollIntoViewIfNeeded()
      await page.screenshot({ path: testInfo.outputPath(`township-${theme}-${width}.png`) })
      await figure.screenshot({
        path: testInfo.outputPath(`township-figure-${theme}-${width}.png`),
      })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      )
    })
  }
}
