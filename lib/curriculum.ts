export const domains = [
  {
    id: 'ownership',
    title: 'Property ownership & land use',
    shortTitle: 'Ownership & land use',
    weight: 15,
    description: 'Property rights, ownership, encumbrances, and the limits on land use.',
  },
  {
    id: 'agency',
    title: 'Agency & fiduciary duties',
    shortTitle: 'Agency & duties',
    weight: 17,
    description: 'Representation, disclosure, compensation, and obligations to others.',
  },
  {
    id: 'valuation',
    title: 'Valuation & financial analysis',
    shortTitle: 'Valuation & analysis',
    weight: 14,
    description: 'How value is formed, estimated, and analyzed.',
  },
  {
    id: 'financing',
    title: 'Financing',
    shortTitle: 'Financing',
    weight: 9,
    description: 'Loans, security instruments, lending programs, and credit law.',
  },
  {
    id: 'transfer',
    title: 'Transfer of property',
    shortTitle: 'Transfer of property',
    weight: 8,
    description: 'Deeds, title, escrow, taxation, and special transfers.',
  },
  {
    id: 'practice',
    title: 'Practice & disclosures',
    shortTitle: 'Practice & disclosures',
    weight: 25,
    description: 'Licensing, trust funds, fair housing, management, and disclosure.',
  },
  {
    id: 'contracts',
    title: 'Contracts',
    shortTitle: 'Contracts',
    weight: 12,
    description: 'Formation, performance, agreements, and remedies.',
  },
] as const

export type DomainId = (typeof domains)[number]['id']
export interface Source {
  label: string
  url: string
}
export interface Term {
  term: string
  definition: string
}
export interface LessonMeta {
  slug: string
  title: string
  description: string
  domain: DomainId
  order: number
  objectives: string[]
  reviewed: string
  sources: Source[]
  glossary: Term[]
}
export interface Lesson extends LessonMeta {
  body: string
  readingMinutes: number
}
export interface Question {
  id: string
  domain: DomainId
  lessonSlug: string
  prompt: string
  options: { text: string; explanation: string }[]
  answer: number
}

export const examSpec = { questions: 150, durationMinutes: 180, passPercent: 70 } as const
