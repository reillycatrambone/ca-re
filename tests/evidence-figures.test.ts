import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import { getLessons } from '../lib/content'
import { learningFigures, figureSearchText } from '../lib/learning-figures'
import { validateLearningFigures } from '../lib/learning-figures/validation'
import { EvidenceFigure } from '../components/book/evidence-figure'
import { rehypeLearningFigures } from '../lib/rehype-learning-figures'

test('educational specimens identify their fictional status and expose every annotation', () => {
  const documents = learningFigures.filter((figure) => figure.kind === 'document')
  assert.ok(documents.length >= 5)
  for (const figure of documents) {
    const html = renderToStaticMarkup(createElement(EvidenceFigure, { figure }))
    assert.match(html, /Fictional educational excerpt \/ Not for execution/)
    assert.equal((html.match(/class="specimen-annotation"/g) ?? []).length, figure.fields.length)
    const searchable = figureSearchText(figure)
    for (const field of figure.fields) {
      assert.ok(searchable.includes(field.value))
      assert.ok(searchable.includes(field.annotation))
    }
    assert.ok(figure.objective && figure.sourceUrls?.length)
  }
})

test('ledger validation rejects a wrong running balance and missing source provenance', () => {
  const changed = structuredClone(learningFigures)
  const ledger = changed.find((figure) => figure.kind === 'ledger')!
  assert.equal(ledger.kind, 'ledger')
  if (ledger.kind !== 'ledger') return
  ledger.entries[0].balance += 1
  ledger.sourceUrls = []
  const errors = validateLearningFigures(getLessons(), changed)
  assert.ok(errors.some((error) => error.includes('Ledger does not reconcile')))
  assert.ok(errors.some((error) => error.includes('Unverified teaching artifact')))
})

test('subsection figures close before parent figures without moving across heading boundaries', async () => {
  const base = learningFigures[0]
  const figures = [
    { ...base, id: 'parent-figure', afterSection: 'parent' },
    { ...base, id: 'first-detail-figure', afterSection: 'first-detail' },
    { ...base, id: 'last-detail-figure', afterSection: 'last-detail' },
  ]
  const { content } = await compileMDX({
    source:
      '## Parent\n\nParent text.\n\n### First detail\n\nFirst text.\n\n### Last detail\n\nLast text.\n\n## Next\n\nNext text.',
    options: { mdxOptions: { rehypePlugins: [rehypeSlug, [rehypeLearningFigures, { figures }]] } },
    components: { 'learning-figure': ({ id }) => createElement('figure', { id }, id) },
  })
  const html = renderToStaticMarkup(content)
  const sequence = [
    'First text.',
    'id="first-detail-figure"',
    'id="last-detail"',
    'Last text.',
    'id="last-detail-figure"',
    'id="parent-figure"',
    'id="next"',
  ]
  for (let index = 1; index < sequence.length; index++)
    assert.ok(html.indexOf(sequence[index - 1]) < html.indexOf(sequence[index]), sequence[index])
})
