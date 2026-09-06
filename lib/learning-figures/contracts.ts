import type { LearningFigureSpec } from './types'

export const contractsFigures: LearningFigureSpec[] = [
  {
    id: 'contract-status-map',
    lessonSlug: 'contracts-formation',
    afterSection: 'void-voidable-and-unenforceable',
    title: 'A defect can have different legal consequences',
    kind: 'comparison',
    columns: [
      {
        label: 'Void',
        points: [
          'No legal effect as a contract.',
          'Example: an agreement with an unlawful object.',
        ],
      },
      {
        label: 'Voidable',
        points: [
          'A protected party may have a right to avoid it.',
          'Example: consent induced by actionable fraud, subject to the facts and law.',
        ],
      },
      {
        label: 'Unenforceable',
        points: [
          'Judicial enforcement is barred despite other contract elements.',
          'Example: a required writing is absent and no applicable exception saves enforcement.',
        ],
      },
    ],
    caption:
      'Do not equate every defect with a void agreement. Identify the particular defect, the protected party, and its legal consequence.',
  },
  {
    id: 'assignment-novation',
    lessonSlug: 'contracts-performance-and-remedies',
    afterSection: 'assignment-is-not-release',
    title: 'Moving performance does not always release the original party',
    kind: 'comparison',
    columns: [
      {
        label: 'Assignment and delegation',
        points: [
          'Contract rights and performance duties may move, subject to restrictions.',
          'The original obligor is not automatically released.',
        ],
      },
      {
        label: 'Novation',
        points: [
          'The required parties agree to substitute a new obligation or party.',
          'An effective novation extinguishes the replaced obligation.',
        ],
      },
    ],
    caption:
      "Permission to assign, a third party's promise to perform, and the creditor's release of the original obligor are different facts. Read what was actually agreed.",
  },
  {
    id: 'listing-owner-sale',
    lessonSlug: 'contracts-representation-agreements',
    afterSection: 'compare-the-principal-listing-types',
    title: 'What if the owner finds the buyer?',
    kind: 'decision',
    question: 'Assume the owner independently procures the buyer during the agreement',
    branches: [
      {
        label: 'Exclusive right to sell',
        detail: "The agreement generally protects the broker's fee even on an owner-procured sale.",
        outcome: 'Read the negotiated compensation trigger and exceptions.',
      },
      {
        label: 'Exclusive agency',
        detail: 'The owner generally retains an independent-sale exception.',
        outcome: 'Determine whether a broker actually procured the buyer.',
      },
      {
        label: 'Open listing',
        detail:
          'No exclusive brokerage employment; compensation generally follows procuring cause.',
        outcome: 'Read the agreement and evidence of procurement.',
      },
    ],
    caption:
      'These are classification rules, not a substitute for the signed compensation terms. A listing agreement employs a broker; it does not itself convey the property.',
  },
  {
    id: 'option-first-refusal',
    lessonSlug: 'contracts-purchase-options-and-leases',
    afterSection: 'options-and-first-refusal-rights',
    title: 'A power to buy is not the same as first refusal',
    kind: 'comparison',
    columns: [
      {
        label: 'Option',
        points: [
          'The holder can elect to purchase on agreed terms within the option period.',
          'Exercise must comply with the option; the holder is not initially required to buy.',
        ],
      },
      {
        label: 'Right of first refusal',
        points: [
          'A specified event triggers an opportunity to purchase under the agreement.',
          'The holder cannot necessarily force the owner to offer a sale now.',
        ],
      },
    ],
    caption:
      'A lease-option combines separate possession and purchase rights. Paying rent alone does not necessarily exercise the option or create purchase equity.',
  },
]
