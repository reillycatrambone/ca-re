import { ownershipFigures } from './ownership'
import { agencyFigures } from './agency'
import { valuationFigures } from './valuation'
import { financingFigures } from './financing'
import { transferFigures } from './transfer'
import { practiceFigures } from './practice'
import { contractsFigures } from './contracts'
import { supplementalFigures } from './supplemental'
import { documentFigures } from './expansion/documents'
import { practiceRuleFigures } from './expansion/practice-rules'
import { taxForeclosureFigures } from './expansion/tax-foreclosure'
import { ownershipApplicationFigures } from './expansion/ownership-applications'
import { agencyApplicationFigures } from './expansion/agency-applications'
import { valuationApplicationFigures } from './expansion/valuation-applications'
import { financingApplicationFigures } from './expansion/financing-applications'
import { transferApplicationFigures } from './expansion/transfer-applications'
import { practiceApplicationFigures } from './expansion/practice-applications'
import { contractsApplicationFigures } from './expansion/contracts-applications'
import type { LearningFigureSpec } from './types'

export const learningFigures: LearningFigureSpec[] = [
  ...ownershipFigures,
  ...agencyFigures,
  ...valuationFigures,
  ...financingFigures,
  ...transferFigures,
  ...practiceFigures,
  ...contractsFigures,
  ...supplementalFigures,
  ...documentFigures,
  ...practiceRuleFigures,
  ...taxForeclosureFigures,
  ...ownershipApplicationFigures,
  ...agencyApplicationFigures,
  ...valuationApplicationFigures,
  ...financingApplicationFigures,
  ...transferApplicationFigures,
  ...practiceApplicationFigures,
  ...contractsApplicationFigures,
]

export function getLearningFigures(lessonSlug: string) {
  return learningFigures.filter((figure) => figure.lessonSlug === lessonSlug)
}

export function figureSearchText(figure: LearningFigureSpec): string {
  const text = [figure.title, figure.caption]
  switch (figure.kind) {
    case 'chart':
      text.push(
        figure.xAxis.label,
        figure.yAxis.label,
        figure.conclusion,
        ...figure.series.flatMap((series) => [
          series.label,
          ...series.points.map((point) => `${point.x} ${point.y}`),
        ])
      )
      break
    case 'parcel':
      text.push(
        figure.unit,
        String(figure.extent.width),
        String(figure.extent.height),
        figure.conclusion,
        ...figure.areas.flatMap((area) => [area.key, area.label, area.description]),
        ...(figure.lines ?? []).map((line) => line.label)
      )
      break
    case 'document':
      text.push(
        figure.documentTitle,
        figure.context,
        figure.conclusion,
        ...figure.fields.flatMap((field) => [field.label, field.value, field.annotation])
      )
      break
    case 'timeline':
      text.push(
        figure.premise,
        figure.conclusion,
        ...figure.events.flatMap((event) => [event.label, event.when, event.detail])
      )
      break
    case 'ledger':
      text.push(
        figure.account,
        String(figure.openingBalance),
        figure.conclusion,
        ...figure.entries.flatMap((entry) => [
          entry.label,
          String(entry.received),
          String(entry.paid),
          String(entry.balance),
        ])
      )
      break
    case 'relationship':
      text.push(
        figure.center.label,
        figure.center.detail,
        ...figure.nodes.flatMap((node) => [node.label, node.connection, node.detail])
      )
      break
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
  return [...text, figure.objective ?? ''].join(' ')
}
