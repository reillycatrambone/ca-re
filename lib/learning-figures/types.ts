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
}

export type LearningFigureSpec = FigureBase &
  (
    | { kind: 'process'; steps: FigureItem[] }
    | { kind: 'comparison'; columns: { label: string; points: string[] }[] }
    | { kind: 'decision'; question: string; branches: (FigureItem & { outcome: string })[] }
    | {
        kind: 'calculation'
        rows: { label: string; amount: number }[]
        result: FigureItem & { amount: number }
      }
    | { kind: 'allocation'; total: number; segments: (FigureItem & { amount: number })[] }
    | { kind: 'capitalization' }
  )
