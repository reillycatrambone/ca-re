export interface GuidePoint {
  label: string
  detail: string
}

interface LabBase {
  title: string
  setup: string
  takeaway: string
}

export type CaseLab = LabBase &
  (
    | {
        kind: 'contrast'
        cases: { label: string; changedFact: string; result: string; reasoning: string[] }[]
      }
    | {
        kind: 'sequence'
        steps: { label: string; action: string; evidence: string; warning: string }[]
      }
    | {
        kind: 'decision'
        question: string
        choices: { label: string; result: string; reasoning: string; correct: boolean }[]
      }
    | {
        kind: 'calculation'
        inputs: { label: string; value: string }[]
        steps: {
          label: string
          expression: string
          value: number
          format: 'currency' | 'percent' | 'number'
          explanation: string
        }[]
      }
  )

export interface StudyGuide {
  lessonSlug: string
  overview: GuidePoint[]
  sections: { id: string; takeaway: string }[]
  lab: CaseLab
  pitfalls: { trap: string; correction: string; why: string }[]
  connections: { lessonSlug: string; reason: string }[]
}

export interface CoverageAudit {
  domain: string
  reviewed: string
  findings: {
    topic: string
    gap: string
    action: string
    lessonSlugs: string[]
    sourceUrls: string[]
  }[]
  limitations: string
}
