import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { getLessons } from '../lib/content'
import { learningFigures, figureSearchText } from '../lib/learning-figures'
import {
  chartDomain,
  chartLeftInset,
  chartPosition,
  formatChartValue,
  type ChartSpec,
} from '../lib/learning-figures/chart'
import { validateLearningFigures } from '../lib/learning-figures/validation'
import { ChartFigure } from '../components/book/chart-figure'

function fixture(): ChartSpec {
  const lesson = getLessons()[0]
  return {
    id: 'exp-test-chart',
    kind: 'chart',
    lessonSlug: lesson.slug,
    afterSection: learningFigures.find((figure) => figure.lessonSlug === lesson.slug)!.afterSection,
    title: 'Fictional cost and value',
    caption: 'A test-only example.',
    objective: 'Show the separate cost and contribution coordinates.',
    sourceUrls: [lesson.sources[0].url],
    xAxis: { label: 'Stage', format: 'number' },
    yAxis: { label: 'Amount', format: 'currency' },
    series: [
      {
        label: 'Cost',
        points: [
          { x: 1, y: 10000 },
          { x: 2, y: 20000 },
        ],
      },
      {
        label: 'Contribution',
        points: [
          { x: 1, y: 14000 },
          { x: 2, y: 12000 },
        ],
      },
    ],
    conclusion: 'More expenditure does not establish more contribution.',
  }
}

test('chart scales preserve nonzero domains, constant values, and negative coordinates', () => {
  assert.deepEqual(chartDomain([10, 20]), [10, 20])
  assert.deepEqual(chartDomain([0, 0]), [-1, 1])
  assert.deepEqual(chartDomain([-100, -100]), [-110, -90])
  assert.equal(chartPosition(15, [10, 20], 0, 100), 50)
  assert.equal(chartPosition(-50, [-100, 0], 100, 0), 50)
  assert.throws(() => chartDomain([NaN]))
  assert.throws(() => chartDomain([]))
  assert.equal(formatChartValue(6, 'percent'), '6%')
  assert.equal(formatChartValue(1250000, 'currency'), '$1,250,000.00')
})

test('charts expose source data and accessible title without a client-side dependency', () => {
  const figure = fixture()
  const html = renderToStaticMarkup(createElement(ChartFigure, { figure }))
  assert.match(html, /role="img"/)
  assert.match(html, /<title id="exp-test-chart-plot-title">/)
  assert.match(html, /<summary>/)
  assert.match(html, /<caption>/)
  assert.match(html, /stroke-dasharray="9 5"/)
  assert.ok(html.includes('$14,000.00'))
  assert.ok(figureSearchText(figure).includes('Contribution'))
  assert.ok(figureSearchText(figure).includes('14000'))
  assert.deepEqual(validateLearningFigures(getLessons().slice(0, 1), [figure]), [])
})

test('chart axes reserve space for long currency ticks without shrinking their text', () => {
  assert.equal(chartLeftInset(['0', '1', '2']), 92)
  assert.equal(chartLeftInset(['$118.79K', '$119.55K', '$120.3K']), 120)
  const figure = fixture()
  figure.series = [
    {
      label: 'Balance',
      points: [
        { x: 0, y: 118793.99 },
        { x: 3, y: 120301.5 },
      ],
    },
  ]
  const html = renderToStaticMarkup(createElement(ChartFigure, { figure }))
  assert.ok(html.includes('M120 24V266H480'))
  assert.ok(html.includes('x="108"'))
  assert.ok(html.includes('$118.79K'))
})

test('chart validation rejects unordered, nonfinite, or unlabeled data', () => {
  for (const mutate of [
    (figure: ChartSpec) => {
      figure.series[0].points[1].x = 1
    },
    (figure: ChartSpec) => {
      figure.series[0].points[0].y = Infinity
    },
    (figure: ChartSpec) => {
      figure.series[0].points = []
    },
    (figure: ChartSpec) => {
      figure.series[1].label = figure.series[0].label
    },
    (figure: ChartSpec) => {
      figure.xAxis.label = ''
    },
  ]) {
    const figure = fixture()
    mutate(figure)
    assert.ok(
      validateLearningFigures(getLessons().slice(0, 1), [figure]).some((error) =>
        error.includes('Invalid teaching chart')
      )
    )
  }
})
