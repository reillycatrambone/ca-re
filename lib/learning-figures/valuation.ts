import type { LearningFigureSpec } from './types'

export const valuationFigures: LearningFigureSpec[] = [
  {
    id: 'highest-best-use-tests',
    lessonSlug: 'valuation-value-principles',
    afterSection: 'highest-and-best-use',
    title: 'Highest and best use: four filters',
    kind: 'process',
    steps: [
      {
        label: 'Legally permissible',
        detail: 'Can the use proceed under applicable legal controls?',
      },
      { label: 'Physically possible', detail: 'Can this site physically accommodate the use?' },
      {
        label: 'Financially feasible',
        detail: 'Does supported income or value justify the necessary costs?',
      },
      {
        label: 'Maximally productive',
        detail: 'Among feasible uses, which yields the highest value?',
      },
    ],
    caption:
      'A profitable idea cannot be selected as the current highest and best use merely by ignoring legal or physical constraints. Legality and physical possibility may be screened together.',
  },
  {
    id: 'comparable-adjustments',
    lessonSlug: 'valuation-sales-comparison',
    afterSection: 'adjust-the-comparable-to-the-subject',
    title: 'Adjust the comparable toward the subject',
    kind: 'calculation',
    rows: [
      { label: 'Comparable sale price', amount: 600000 },
      { label: 'Comparable has an extra bath: subtract supported contribution', amount: -15000 },
      { label: "Comparable lacks subject's garage: add supported contribution", amount: 25000 },
    ],
    result: {
      label: 'Adjusted indication',
      amount: 610000,
      detail: 'What this comparable suggests after these two differences.',
    },
    caption:
      'Assume market evidence supports both amounts and no other adjustments are needed. Adjustments reflect contributory value, not automatically the cost to build the feature.',
  },
  {
    id: 'cost-value-bridge',
    lessonSlug: 'valuation-cost-approach',
    afterSection: 'worked-cost-indication',
    title: 'From new cost to an indicated property value',
    kind: 'calculation',
    rows: [
      { label: 'Replacement cost new of improvements', amount: 360000 },
      { label: 'Accrued depreciation of improvements', amount: -90000 },
      { label: 'Land value as if vacant', amount: 180000 },
    ],
    result: {
      label: 'Cost approach indication',
      amount: 450000,
      detail: '$270,000 depreciated improvements + $180,000 land.',
    },
    caption:
      'The depreciation deduction applies to improvements in this calculation, not to the land estimate. Appraisal depreciation measures loss in value, not a tax deduction schedule.',
  },
  {
    id: 'cap-rate-sensitivity',
    lessonSlug: 'valuation-income-analysis',
    afterSection: 'direct-capitalization',
    title: 'The cap rate changes the value indication',
    kind: 'capitalization',
    caption:
      'Holding annual NOI at $48,000 isolates the effect of the capitalization rate. This is a sensitivity example, not a forecast; market evidence must support the selected NOI and rate.',
  },
]
