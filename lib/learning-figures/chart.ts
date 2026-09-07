import type { LearningFigureSpec } from './types'

export type ChartSpec = Extract<LearningFigureSpec, { kind: 'chart' }>
export type AxisFormat = ChartSpec['xAxis']['format']

export function formatChartValue(value: number, format: AxisFormat, compact = false) {
  const formatted = new Intl.NumberFormat('en-US', {
    ...(format === 'currency' ? { style: 'currency', currency: 'USD' } : {}),
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: 2,
  }).format(value)
  return format === 'percent' ? `${formatted}%` : formatted
}

export function chartDomain(values: number[]): [number, number] {
  if (!values.length || values.some((value) => !Number.isFinite(value)))
    throw new Error('Chart coordinates must be finite and nonempty')
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (min !== max) return [min, max]
  const padding = Math.max(Math.abs(min) * 0.1, 1)
  return [min - padding, max + padding]
}

export function chartPosition(value: number, domain: [number, number], start: number, end: number) {
  return start + ((value - domain[0]) / (domain[1] - domain[0])) * (end - start)
}

export function chartLeftInset(labels: string[]) {
  // Reserve space in the SVG coordinate system, so labels still fit when the plot scales down.
  return Math.max(92, ...labels.map((label) => label.length * 12 + 24))
}
