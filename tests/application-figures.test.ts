import assert from 'node:assert/strict'
import test from 'node:test'
import { contractsApplicationFigures } from '../lib/learning-figures/expansion/contracts-applications'
import { transferApplicationFigures } from '../lib/learning-figures/expansion/transfer-applications'
import { practiceApplicationFigures } from '../lib/learning-figures/expansion/practice-applications'
import type { LearningFigureSpec } from '../lib/learning-figures/types'

const figures = [
  ...contractsApplicationFigures,
  ...transferApplicationFigures,
  ...practiceApplicationFigures,
]

function figure<K extends LearningFigureSpec['kind']>(id: string, kind: K) {
  const value = figures.find((entry) => entry.id === id)
  assert.ok(value && value.kind === kind, `Missing ${kind}: ${id}`)
  return value as Extract<LearningFigureSpec, { kind: K }>
}

test('residential deposit chart uses actual payment and three percent of each price', () => {
  const chart = figure('exp-performance-fixed-deposit-threshold-chart', 'chart')
  assert.equal(chart.series.length, 2)
  for (const point of chart.series[0].points) assert.equal(point.y, point.x * 0.03)
  for (const point of chart.series[1].points) assert.equal(point.y, 24000)
  assert.equal(24000 / 800000, 0.03)
  assert.match(chart.caption, /owner-occupied/)
  assert.match(chart.caption, /initial-condominium/)
})

test('lease-option chart credits five timely months, not all rent or the late fourth month', () => {
  const chart = figure('exp-purchase-rent-versus-option-credit', 'chart')
  assert.equal(chart.series.length, 2)
  for (const point of chart.series[0].points) assert.equal(point.y, point.x * 2000)
  for (const point of chart.series[1].points) {
    const qualifyingMonths = point.x - (point.x >= 4 ? 1 : 0)
    assert.equal(point.y, 3000 + qualifyingMonths * 400)
  }
  assert.equal(chart.series[1].points.at(-1)?.y, 5000)
})

test('amended purchase cash and net-listing compensation reconcile to their specified bases', () => {
  const cash = figure('exp-purchase-price-amendment-cash-bridge', 'calculation')
  assert.equal(cash.result.amount, 660000 - 496000 - 16000 + 12000 - 5000)
  assert.equal(
    cash.rows.reduce((sum, row) => sum + row.amount, 0),
    cash.result.amount
  )
  const net = figure('exp-representation-net-listing-allocation', 'allocation')
  assert.equal(net.total, 650000)
  assert.equal(net.segments.at(-1)?.amount, 650000 - 600000 - 10000)
  assert.equal(
    net.segments.reduce((sum, segment) => sum + segment.amount, 0),
    net.total
  )
})

test('buyer-agreement examples count the default and delayed effective dates differently', () => {
  const comparison = figure('exp-representation-ninety-days-delayed-start', 'comparison')
  const day = 86400000
  const defaultEnd = new Date(Date.UTC(2026, 0, 31) + 90 * day).toISOString().slice(0, 10)
  const delayedEnd = new Date(Date.UTC(2026, 1, 10) + 89 * day).toISOString().slice(0, 10)
  assert.equal(defaultEnd, '2026-05-01')
  assert.equal(delayedEnd, '2026-05-10')
  assert.match(comparison.columns[0].points.join(' '), /May 1 is day 90/)
  assert.match(comparison.columns[1].points.join(' '), /May 10 is day 90/)
})

test('gift dual-basis chart has a no-gain/no-loss interval between gift value and donor basis', () => {
  const chart = figure('exp-tax-gift-dual-basis-curve', 'chart')
  for (const point of chart.series[0].points) {
    const gainOrLoss = point.x > 400000 ? point.x - 400000 : point.x < 350000 ? point.x - 350000 : 0
    assert.equal(point.y, gainOrLoss)
  }
})

test('California withholding uses the FTB decimal instead of rounding to exact one-thirtieth', () => {
  const withholding = figure('exp-tax-california-withholding-shares', 'allocation')
  const total = Math.round(450000 * 0.0333)
  assert.equal(total, 14985)
  assert.equal(withholding.total, total)
  assert.deepEqual(
    withholding.segments.map((segment) => segment.amount),
    [total * 0.4, total * 0.6]
  )
  assert.notEqual(total, 450000 / 30)
})

test('practice charts preserve remaining life, collected-rent bases, and the percentage breakpoint', () => {
  const carpet = figure('exp-practice-app-remaining-life-damage-chart', 'chart')
  for (const point of carpet.series[0].points) assert.equal(point.y, (1200 * (6 - point.x)) / 6)
  const management = figure('exp-practice-app-management-fee-collection-base', 'chart')
  for (const point of management.series[0].points) assert.equal(point.y, point.x * 0.05)
  const rent = figure('exp-practice-app-percentage-rent-breakpoint', 'chart')
  for (const point of rent.series[0].points)
    assert.equal(point.y, 30000 + Math.max(0, point.x - 600000) * 0.05)
})

test('recovery-account claim is limited by both transaction and remaining licensee capacity', () => {
  const chart = figure('exp-practice-app-recovery-two-ceilings', 'chart')
  for (const point of chart.series[0].points) {
    assert.equal(point.y, Math.min(70000, 50000, Math.max(0, 250000 - point.x)))
  }
  assert.match(chart.caption, /no competing pending claims/)
  assert.match(chart.caption, /ceilings, not promised payments/)
})
