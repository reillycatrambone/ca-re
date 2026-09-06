import type { LearningFigureSpec } from './types'

export const ownershipFigures: LearningFigureSpec[] = [
  {
    id: 'fixture-evidence',
    lessonSlug: 'ownership-property-rights',
    afterSection: 'how-an-object-becomes-a-fixture',
    title: 'Fixture analysis: weigh the evidence',
    kind: 'process',
    steps: [
      {
        label: 'The object',
        detail: 'Identify what is attached and how removal affects the property.',
      },
      {
        label: 'The setting',
        detail: "Consider adaptation, the parties' relationship, and objective intent.",
      },
      {
        label: 'The agreement',
        detail: 'Read express inclusions and exclusions; do not rely on appearance alone.',
      },
    ],
    caption:
      'A built-in cabinet and a freestanding cabinet may look similar but present different evidence. No single physical clue replaces the complete fixture analysis.',
  },
  {
    id: 'life-estate-interests',
    lessonSlug: 'ownership-estates-title',
    afterSection: 'freehold-estates-and-future-interests',
    title: 'One parcel, present and future interests',
    kind: 'process',
    steps: [
      { label: 'Grant', detail: "O conveys to A for A's life, then to B." },
      {
        label: "During A's life",
        detail: 'A has the present life estate. B holds the remainder, a future interest.',
      },
      { label: "At A's death", detail: "A's life estate ends. B's remainder becomes possessory." },
    ],
    caption:
      "In this simplified grant, B's remainder exists before B has possession. If A transfers only A's life estate to C, its duration still depends on A's life.",
  },
  {
    id: 'lien-classification',
    lessonSlug: 'ownership-encumbrances',
    afterSection: 'classifying-liens',
    title: 'Classify a lien on two independent axes',
    kind: 'comparison',
    columns: [
      {
        label: 'How it arises',
        points: [
          'Voluntary: agreed security, such as a deed of trust.',
          'Involuntary: imposed by law, such as a property-tax lien.',
        ],
      },
      {
        label: 'What it reaches',
        points: [
          'Specific: identified property, such as the security parcel.',
          "General: a debtor's property within the lien's legal scope.",
        ],
      },
    ],
    caption:
      'A property-tax lien is involuntary and specific. These labels classify the lien; they do not by themselves establish its priority against every competing claim.',
  },
  {
    id: 'parcel-area-allocation',
    lessonSlug: 'ownership-legal-descriptions',
    afterSection: 'area-frontage-and-units',
    title: 'An acre is an area, not a shape',
    kind: 'allocation',
    total: 43560,
    segments: [
      { label: 'Half acre', amount: 21780, detail: '21,780 square feet' },
      { label: 'Quarter acre', amount: 10890, detail: '10,890 square feet' },
      { label: 'Quarter acre', amount: 10890, detail: '10,890 square feet' },
    ],
    caption:
      'Illustrative area proportions only: 43,560 square feet equals one acre. The same area can have different frontage, depth, shape, access, and usable building area. This is not a parcel map.',
  },
  {
    id: 'layered-land-use',
    lessonSlug: 'ownership-land-use-controls',
    afterSection: 'private-controls',
    title: 'A use must clear more than one test',
    kind: 'process',
    steps: [
      {
        label: 'Public controls',
        detail: 'Check applicable planning, zoning, building, and environmental rules.',
      },
      {
        label: 'Private controls',
        detail: 'Check enforceable restrictions, easements, and association documents.',
      },
      {
        label: 'Parcel feasibility',
        detail: 'Check physical access, utilities, soil, and the proposed design.',
      },
    ],
    caption:
      'A zoning approval does not automatically remove an enforceable private restriction. Conversely, private permission does not waive public law. Each applicable constraint requires its own analysis.',
  },
  {
    id: 'water-boundary-change',
    lessonSlug: 'ownership-water-environment',
    afterSection: 'boundaries-changed-by-water',
    title: 'Time and mechanism distinguish water changes',
    kind: 'comparison',
    columns: [
      {
        label: 'Gradual change',
        points: [
          'Accretion: soil builds up through gradual deposits.',
          'Reliction: water recedes and gradually exposes land.',
          'Erosion: land gradually wears away.',
        ],
      },
      {
        label: 'Sudden change',
        points: [
          'Avulsion: a sudden, perceptible change, such as a flood shifting a channel.',
          'Do not assume a sudden channel shift also shifts the legal boundary.',
        ],
      },
    ],
    caption:
      'The physical process helps classify the issue. Actual boundary and ownership consequences also depend on the governing title and law; a salesperson does not resolve them from a photograph.',
  },
]
