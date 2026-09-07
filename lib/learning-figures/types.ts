export interface FigureItem {
  label: string
  detail: string
}

interface FigureBase {
  id: string
  lessonSlug: string
  afterSection: string
  title: string
  caption: string
  objective?: string
  sourceUrls?: string[]
}

export interface DocumentField {
  label: string
  value: string
  annotation: string
}

export interface TimelineEvent {
  label: string
  when: string
  detail: string
}

export type LearningFigureSpec = FigureBase &
  (
    | {
        kind: 'chart'
        xAxis: { label: string; format: 'number' | 'percent' | 'currency' }
        yAxis: { label: string; format: 'number' | 'percent' | 'currency' }
        series: { label: string; points: { x: number; y: number }[] }[]
        conclusion: string
      }
    | {
        kind: 'document'
        documentTitle: string
        context: string
        fields: DocumentField[]
        conclusion: string
      }
    | {
        kind: 'timeline'
        premise: string
        events: TimelineEvent[]
        conclusion: string
      }
    | {
        kind: 'parcel'
        extent: { width: number; height: number }
        unit: 'feet' | 'miles' | 'schematic'
        areas: {
          key: string
          label: string
          x: number
          y: number
          width: number
          height: number
          pattern: 'clear' | 'solid' | 'hatch'
          description: string
          labelAt?: { x: number; y: number }
        }[]
        lines?: {
          label: string
          from: { x: number; y: number }
          to: { x: number; y: number }
          style: 'solid' | 'dashed'
          labelAt?: { x: number; y: number }
        }[]
        conclusion: string
      }
    | {
        kind: 'ledger'
        account: string
        openingBalance: number
        entries: { label: string; received: number; paid: number; balance: number }[]
        conclusion: string
      }
    | { kind: 'process'; steps: FigureItem[] }
    | { kind: 'comparison'; columns: { label: string; points: string[] }[] }
    | { kind: 'decision'; question: string; branches: (FigureItem & { outcome: string })[] }
    | {
        kind: 'calculation'
        rows: { label: string; amount: number }[]
        result: FigureItem & { amount: number }
      }
    | { kind: 'allocation'; total: number; segments: (FigureItem & { amount: number })[] }
    | {
        kind: 'relationship'
        center: FigureItem
        nodes: (FigureItem & { connection: string })[]
      }
    | { kind: 'capitalization' }
  )
