import test from 'node:test'
import assert from 'node:assert/strict'
import type { Element, ElementContent, Root } from 'hast'
import { createElement, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import { rehypeReadingSections } from '../lib/rehype-reading-sections'
import { rehypeLearningFigures } from '../lib/rehype-learning-figures'
import { learningFigures } from '../lib/learning-figures'

function element(
  tagName: string,
  children: ElementContent[],
  properties: Element['properties'] = {}
): Element {
  return { type: 'element', tagName, properties, children }
}

const text = (value: string): ElementContent => ({ type: 'text', value })
const paragraph = (value: string) => element('p', [text(value)])

function asElement(node: Root['children'][number] | undefined, tagName: string): Element {
  assert.ok(node && node.type === 'element')
  assert.equal(node.tagName, tagName)
  return node
}

test('reading sections preserve introductory nodes, heading text, IDs, and section content', () => {
  const intro = paragraph('Before the first section.')
  const firstBody = paragraph('First section explanation.')
  const lastBody = paragraph('Final section explanation.')
  const tree: Root = {
    type: 'root',
    children: [
      intro,
      element('h2', [text('A '), element('strong', [text('bold')]), text(' heading')], {
        id: 'a-bold-heading',
      }),
      firstBody,
      element('h2', [text('Final section')], { id: 'final-section' }),
      lastBody,
    ],
  }

  rehypeReadingSections({
    takeaways: [
      { id: 'final-section', takeaway: 'The last matching takeaway.' },
      { id: 'a-bold-heading', takeaway: 'The first matching takeaway.' },
    ],
  })(tree)

  assert.equal(tree.children.length, 3)
  assert.equal(tree.children[0], intro)
  const first = asElement(tree.children[1], 'reading-section')
  assert.deepEqual(first.properties, {
    id: 'a-bold-heading',
    label: 'A bold heading',
    number: 1,
    takeaway: 'The first matching takeaway.',
  })
  assert.deepEqual(first.children, [firstBody])
  assert.equal(first.children[0], firstBody)
  const last = asElement(tree.children[2], 'reading-section')
  assert.deepEqual(last.properties, {
    id: 'final-section',
    label: 'Final section',
    number: 2,
    takeaway: 'The last matching takeaway.',
  })
  assert.deepEqual(last.children, [lastBody])
})

test('each H3 starts its own detail and preserves nested content in the final H2', () => {
  const opening = paragraph('Visible section opening.')
  const explanation = paragraph('First detail explanation.')
  const list = element('ul', [element('li', [text('Supporting evidence.')])])
  const finalExplanation = paragraph('Second detail explanation.')
  const tree: Root = {
    type: 'root',
    children: [
      element('h2', [text('Main section')], { id: 'main-section' }),
      opening,
      element('h3', [text('First '), element('code', [text('detail')])], {
        id: 'first-detail',
      }),
      explanation,
      list,
      element('h3', [text('Second detail')], { id: 'second-detail' }),
      finalExplanation,
    ],
  }

  rehypeReadingSections({})(tree)

  const section = asElement(tree.children[0], 'reading-section')
  assert.equal(section.properties.takeaway, '')
  assert.equal(section.children[0], opening)
  const first = asElement(section.children[1], 'reading-detail')
  const second = asElement(section.children[2], 'reading-detail')
  assert.deepEqual(first.properties, { id: 'first-detail', label: 'First detail' })
  assert.deepEqual(first.children, [explanation, list])
  assert.deepEqual(second.properties, { id: 'second-detail', label: 'Second detail' })
  assert.deepEqual(second.children, [finalExplanation])
  assert.equal(section.children.length, 3)
})

test('a section figure ends an optional detail and remains a direct section child', () => {
  const figure = element('learning-figure', [], { id: 'section-figure' })
  const detailText = paragraph('Optional explanation.')
  const afterFigure = paragraph('Visible after the figure.')
  const laterDetail = paragraph('Another optional explanation.')
  const nextSectionText = paragraph('Next section content.')
  const tree: Root = {
    type: 'root',
    children: [
      element('h2', [text('First')], { id: 'first' }),
      element('h3', [text('Detail')], { id: 'detail' }),
      detailText,
      figure,
      afterFigure,
      element('h3', [text('Later detail')], { id: 'later-detail' }),
      laterDetail,
      element('h2', [text('Second')], { id: 'second' }),
      nextSectionText,
    ],
  }

  rehypeReadingSections({})(tree)

  const first = asElement(tree.children[0], 'reading-section')
  assert.deepEqual(asElement(first.children[0], 'reading-detail').children, [detailText])
  assert.equal(first.children[1], figure)
  assert.equal(first.children[2], afterFigure)
  assert.deepEqual(asElement(first.children[3], 'reading-detail').children, [laterDetail])
  assert.deepEqual(asElement(tree.children[1], 'reading-section').children, [nextSectionText])
})

test('documents without top-level H2 headings are left unchanged', () => {
  const tree: Root = {
    type: 'root',
    children: [
      { type: 'doctype' },
      paragraph('An introduction.'),
      element('h3', [text('Standalone detail')], { id: 'standalone-detail' }),
      element('blockquote', [element('h2', [text('Quoted heading')], { id: 'quoted' })]),
    ],
  }
  const original = structuredClone(tree)
  rehypeReadingSections({})(tree)
  assert.deepEqual(tree, original)
})

test('MDX figure insertion and reading sections preserve visible headings and figure boundaries', async () => {
  const figures = [
    { ...learningFigures[0], id: 'first-figure', afterSection: 'first' },
    { ...learningFigures[0], id: 'last-figure', afterSection: 'last' },
  ]
  const { content } = await compileMDX({
    source:
      'Introduction.\n\n## First\n\nOpening.\n\n### Optional **detail**\n\nDetail body.\n\n## Last\n\n### Final detail\n\nFinal body.',
    options: {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeLearningFigures, { figures }],
          [rehypeReadingSections, { takeaways: [{ id: 'first', takeaway: 'First takeaway.' }] }],
        ],
      },
    },
    components: {
      'reading-section': ({
        id,
        label,
        children,
      }: {
        id: string
        label: string
        children: ReactNode
      }) => createElement('section', { id }, createElement('h2', null, label), children),
      'reading-detail': ({
        id,
        label,
        children,
      }: {
        id: string
        label: string
        children: ReactNode
      }) => createElement('details', { id }, createElement('summary', null, label), children),
      'learning-figure': ({ id }: { id: string }) =>
        createElement('figure', { id }, 'Teaching figure'),
    },
  })
  const html = renderToStaticMarkup(content)

  assert.match(html, /<h2>First<\/h2>/)
  assert.match(html, /<summary>Optional detail<\/summary>/)
  assert.match(html, /Detail body\.<\/p>\s*<\/details>\s*<figure id="first-figure"/)
  assert.match(html, /Final body\.<\/p>\s*<\/details>\s*<figure id="last-figure"/)
  for (const value of ['Introduction.', 'Opening.', 'Detail body.', 'Final body.'])
    assert.equal(html.split(value).length - 1, 1)
  assert.equal((html.match(/<section /g) ?? []).length, 2)
  assert.equal((html.match(/<figure /g) ?? []).length, 2)
})
