import { mkdirSync, writeFileSync } from 'node:fs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { toString } from 'mdast-util-to-string'
import GithubSlugger from 'github-slugger'
import { getLessons } from '../lib/content'
import { createSearch, type SearchEntry } from '../lib/search'
import { getLearningFigures, figureSearchText } from '../lib/learning-figures'
import { getStudyGuide } from '../lib/study-guides/content'
import { guideSearchEntries } from '../lib/study-guides/search'

const entries: SearchEntry[] = []
for (const lesson of getLessons()) {
  const guide = getStudyGuide(lesson.slug)
  const tree = unified().use(remarkParse).parse(lesson.body)
  const slugger = new GithubSlugger()
  let section = { title: lesson.title, text: lesson.description, anchor: '' }
  const add = () =>
    entries.push({
      id: `${lesson.slug}${section.anchor}`,
      title: section.title,
      text: section.text,
      domain: lesson.domain,
      href: `/docs/${lesson.slug}/${section.anchor}`,
      lessonTitle: lesson.title,
    })
  for (const node of tree.children) {
    if (node.type === 'heading') {
      add()
      const id = slugger.slug(toString(node))
      section = {
        title: toString(node),
        text: guide?.sections.find((section) => section.id === id)?.takeaway ?? '',
        anchor: `#${id}`,
      }
    } else section.text += ` ${toString(node)}`
  }
  add()
  if (guide) entries.push(...guideSearchEntries(guide, lesson))
  for (const figure of getLearningFigures(lesson.slug)) {
    entries.push({
      id: `${lesson.slug}#${figure.id}`,
      title: figure.title,
      text: figureSearchText(figure),
      domain: lesson.domain,
      href: `/docs/${lesson.slug}/#${figure.id}`,
      lessonTitle: lesson.title,
    })
  }
}
mkdirSync('public', { recursive: true })
writeFileSync('public/search-index.json', JSON.stringify(createSearch(entries)))
console.log(`Indexed ${entries.length} sections across ${getLessons().length} lessons.`)
