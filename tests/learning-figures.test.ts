import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import { getLessons } from '../lib/content'
import { capitalizedValue } from '../lib/calculations'
import { learningFigures, figureSearchText } from '../lib/learning-figures'
import { validateLearningFigures } from '../lib/learning-figures/validation'
import { rehypeLearningFigures } from '../lib/rehype-learning-figures'

test('every chapter has a labeled in-text figure with a valid, nonconflicting section anchor', () => {
  assert.equal(learningFigures.length, 33)
  assert.deepEqual(validateLearningFigures(getLessons(), learningFigures), [])
})

test('figure validation rejects stale anchors, duplicate IDs, and incorrect arithmetic', () => {
  const changed = structuredClone(learningFigures)
  changed[0].afterSection = 'missing-section'
  changed[1].id = changed[0].id
  const calculation = changed.find((figure) => figure.kind === 'calculation')!
  if (calculation.kind === 'calculation') calculation.result.amount += 1
  const allocation = changed.find((figure) => figure.kind === 'allocation')!
  if (allocation.kind === 'allocation') allocation.segments[0].amount = -1
  const errors = validateLearningFigures(getLessons(), changed)
  assert.ok(errors.some((error) => error.includes('Missing figure section')))
  assert.ok(errors.some((error) => error.includes('duplicate figure ID')))
  assert.ok(errors.some((error) => error.includes('calculation does not reconcile')))
  assert.ok(errors.some((error) => error.includes('allocation does not reconcile')))
})

test('figure text is searchable, including branches, amounts, and captions', () => {
  const figure = learningFigures.find((figure) => figure.id === 'seller-proceeds-bridge')!
  const text = figureSearchText(figure)
  assert.match(text, /460000/)
  assert.match(text, /Loan payoff/)
  assert.match(text, /taxable gain/)
  assert.ok(learningFigures.every((figure) => figureSearchText(figure).length > 150))
})

test('figures compile at the end of the correct H2 section, including the final section', async () => {
  const base = learningFigures[0]
  const figures = [
    { ...base, id: 'first-figure', afterSection: 'first' },
    { ...base, id: 'last-figure', afterSection: 'last' },
  ]
  const { content } = await compileMDX({
    source:
      '## First\n\nOpening paragraph.\n\n### Detail\n\nLast detail.\n\n## Last\n\nFinal paragraph.',
    options: { mdxOptions: { rehypePlugins: [rehypeSlug, [rehypeLearningFigures, { figures }]] } },
    components: {
      'learning-figure': ({ id }) => createElement('figure', { id }, 'Teaching figure'),
    },
  })
  const html = renderToStaticMarkup(content)
  assert.ok(html.indexOf('Last detail.') < html.indexOf('id="first-figure"'))
  assert.ok(html.indexOf('id="first-figure"') < html.indexOf('id="last"'))
  assert.ok(html.indexOf('Final paragraph.') < html.indexOf('id="last-figure"'))
  assert.equal((html.match(/<figure/g) ?? []).length, 2)
})

test('capitalization converts percent to decimal and rejects invalid or overflowing values', () => {
  assert.equal(capitalizedValue(48000, 6), 800000)
  assert.equal(capitalizedValue(48000, 4), 1200000)
  assert.equal(capitalizedValue(48000, 8), 600000)
  assert.equal(capitalizedValue(0, 6), 0)
  for (const [noi, rate] of [
    [48000, 0],
    [-1, 6],
    [NaN, 6],
    [48000, Infinity],
    [Number.MAX_VALUE, Number.MIN_VALUE],
  ])
    assert.equal(capitalizedValue(noi, rate), null)
})
