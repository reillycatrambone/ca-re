import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { getLessons } from '../lib/content'
import { learningFigures, figureSearchText } from '../lib/learning-figures'
import { validateLearningFigures } from '../lib/learning-figures/validation'
import type { LearningFigureSpec } from '../lib/learning-figures/types'
import { ParcelFigure } from '../components/book/parcel-figure'

function fixture(): Extract<LearningFigureSpec, { kind: 'parcel' }> {
  const lesson = getLessons()[0]
  const base = learningFigures.find((figure) => figure.lessonSlug === lesson.slug)!
  return {
    id: 'exp-test-parcel',
    kind: 'parcel',
    lessonSlug: lesson.slug,
    afterSection: base.afterSection,
    title: 'Test parcel',
    objective: 'Test geometric containment and labels.',
    caption: 'Fictional test diagram.',
    sourceUrls: [lesson.sources[0].url],
    extent: { width: 100, height: 100 },
    unit: 'feet',
    conclusion: 'The area key remains available as text.',
    areas: [
      {
        key: 'A',
        label: 'Whole parcel',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        pattern: 'clear',
        description: 'The entire illustrated parcel.',
        labelAt: { x: 15, y: 50 },
      },
      {
        key: 'B',
        label: 'Interior area',
        x: 25,
        y: 25,
        width: 50,
        height: 50,
        pattern: 'hatch',
        description: 'The marked interior is part of A.',
      },
    ],
    lines: [
      { label: 'West boundary', from: { x: 0, y: 0 }, to: { x: 0, y: 100 }, style: 'dashed' },
    ],
  }
}

test('parcel maps retain accessible titles and complete text alternatives', () => {
  const figure = fixture()
  const html = renderToStaticMarkup(createElement(ParcelFigure, { figure }))
  assert.match(html, /role="img"/)
  assert.match(html, /<title id="exp-test-parcel-map-title">/)
  assert.match(html, /North is up/)
  for (const area of figure.areas) {
    assert.ok(html.includes(area.label))
    assert.ok(figureSearchText(figure).includes(area.description))
  }
  assert.deepEqual(validateLearningFigures(getLessons().slice(0, 1), [figure]), [])
})

test('parcel validation rejects off-map geometry, malformed extents, and colliding labels', () => {
  const figure = fixture()
  figure.areas[1].width = 100
  figure.areas[0].labelAt = { x: 75, y: 50 }
  let errors = validateLearningFigures(getLessons().slice(0, 1), [figure])
  assert.ok(errors.some((error) => error.includes('Invalid parcel area')))
  assert.ok(errors.some((error) => error.includes('Overlapping parcel markers')))
  figure.extent.height = 0
  errors = validateLearningFigures(getLessons().slice(0, 1), [figure])
  assert.ok(errors.some((error) => error.includes('Invalid parcel extent')))
})
