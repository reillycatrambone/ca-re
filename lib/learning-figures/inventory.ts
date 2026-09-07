import type { Lesson } from '../curriculum'
import { learningFigures } from './index'

export const visualExpansionTarget = { baseline: 75, multiplier: 5, minimum: 375 } as const

export const legacyVisuals = [
  {
    lessonSlug: 'ownership-property-rights',
    title: 'Residential parcel illustration',
    objective: 'Distinguish land, attached improvements, and physical parcel boundaries.',
  },
  {
    lessonSlug: 'ownership-encumbrances',
    title: 'An appurtenant easement',
    objective: 'Locate the dominant parcel, servient parcel, access strip, and public road.',
  },
  {
    lessonSlug: 'ownership-legal-descriptions',
    title: 'The township grid',
    objective: 'Read the alternating section-numbering pattern in a standard township.',
  },
  {
    lessonSlug: 'agency-relationships',
    title: 'Representation and supervision',
    objective: 'Trace the principal, broker, and salesperson relationship.',
  },
  {
    lessonSlug: 'valuation-income-analysis',
    title: 'Direct capitalization',
    objective: 'Relate annual NOI, capitalization rate, and indicated property value.',
  },
  {
    lessonSlug: 'financing-notes-security',
    title: 'Three parties to a deed of trust',
    objective: 'Distinguish the trustor, beneficiary, and trustee in a security transaction.',
  },
  {
    lessonSlug: 'transfer-title-and-escrow',
    title: 'A simplified escrow sequence',
    objective: 'Order the major functions of a conditional escrow closing.',
  },
  {
    lessonSlug: 'practice-trust-funds',
    title: 'Three-way trust reconciliation',
    objective: 'Compare adjusted bank, control, and beneficiary totals.',
  },
  {
    lessonSlug: 'contracts-formation',
    title: 'From offer to agreement',
    objective: 'Identify offer, matching acceptance, and required communication.',
  },
].map((visual) => ({ ...visual, id: `legacy-${visual.lessonSlug}` }))

export function getVisualInventory(lessons: Lesson[]) {
  const chapterSources = (slug: string) =>
    lessons.find((lesson) => lesson.slug === slug)?.sources.map((source) => source.url) ?? []
  return [
    ...learningFigures.map((figure) => ({
      id: figure.id,
      lessonSlug: figure.lessonSlug,
      title: figure.title,
      kind: figure.kind,
      afterSection: figure.afterSection,
      objective: figure.objective ?? figure.caption,
      sourceUrls: figure.sourceUrls ?? chapterSources(figure.lessonSlug),
      edition: figure.id.startsWith('exp-') ? 'expansion' : 'baseline',
    })),
    ...legacyVisuals.map((visual) => ({
      ...visual,
      kind: visual.lessonSlug === 'ownership-property-rights' ? 'illustration' : 'diagram',
      afterSection: null,
      sourceUrls: chapterSources(visual.lessonSlug),
      edition: 'baseline',
    })),
  ]
}
