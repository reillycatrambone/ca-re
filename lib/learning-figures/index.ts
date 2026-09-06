import { ownershipFigures } from './ownership'
import { agencyFigures } from './agency'
import { valuationFigures } from './valuation'
import { financingFigures } from './financing'
import { transferFigures } from './transfer'
import { practiceFigures } from './practice'
import { contractsFigures } from './contracts'
import type { LearningFigureSpec } from './types'

export const learningFigures: LearningFigureSpec[] = [
  ...ownershipFigures,
  ...agencyFigures,
  ...valuationFigures,
  ...financingFigures,
  ...transferFigures,
  ...practiceFigures,
  ...contractsFigures,
]

export function getLearningFigures(lessonSlug: string) {
  return learningFigures.filter((figure) => figure.lessonSlug === lessonSlug)
}

export function figureSearchText(figure: LearningFigureSpec): string {
  const text = [figure.title, figure.caption]
  switch (figure.kind) {
    case 'process':
      text.push(...figure.steps.flatMap((step) => [step.label, step.detail]))
      break
    case 'comparison':
      text.push(...figure.columns.flatMap((column) => [column.label, ...column.points]))
      break
    case 'decision':
      text.push(
        figure.question,
        ...figure.branches.flatMap((branch) => [branch.label, branch.detail, branch.outcome])
      )
      break
    case 'calculation':
      text.push(
        ...figure.rows.map((row) => `${row.label} ${row.amount}`),
        figure.result.label,
        String(figure.result.amount),
        figure.result.detail
      )
      break
    case 'allocation':
      text.push(
        ...figure.segments.flatMap((segment) => [
          segment.label,
          segment.detail,
          String(segment.amount),
        ])
      )
      break
    case 'capitalization':
      text.push(
        'Annual net operating income NOI 48000 divided by capitalization rate. 4% 1200000; 6% 800000; 8% 600000.'
      )
      break
  }
  return text.join(' ')
}
