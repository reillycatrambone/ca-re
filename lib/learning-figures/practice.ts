import type { LearningFigureSpec } from './types'

export const practiceFigures: LearningFigureSpec[] = [
  {
    id: 'supervision-delegation',
    lessonSlug: 'practice-licensing-supervision',
    afterSection: 'supervision-is-an-operating-responsibility',
    title: 'A supervision system follows the work',
    kind: 'process',
    steps: [
      {
        label: 'Set the scope',
        detail: "Assign tasks within each person's license and authority.",
      },
      {
        label: 'Set the procedure',
        detail: 'Give clear requirements for documents, trust funds, and disclosures.',
      },
      {
        label: 'Review performance',
        detail: 'Check actual work and respond to exceptions and warning signs.',
      },
      {
        label: 'Correct and document',
        detail: 'Address deficiencies and preserve required records.',
      },
    ],
    caption:
      "Written policies are part of supervision, not a replacement for it. Assigning a task does not by itself eliminate the responsible broker's supervisory duty.",
  },
  {
    id: 'trust-fund-ownership',
    lessonSlug: 'practice-trust-funds',
    afterSection: 'limited-broker-money-is-an-exception-not-a-target',
    title: 'Account location and lawful use are separate questions',
    kind: 'comparison',
    columns: [
      {
        label: 'Commingling',
        points: [
          "Improper mixing of trust funds and the broker's own money.",
          'Analyze permitted limited exceptions separately.',
        ],
      },
      {
        label: 'Conversion',
        points: [
          'Unauthorized use of funds belonging to another.',
          'A separate trust account does not make an unauthorized withdrawal lawful.',
        ],
      },
    ],
    caption:
      'Correct custody, accurate beneficiary records, and authorized disbursement are all necessary. A balanced bank statement cannot by itself establish compliance.',
  },
  {
    id: 'accommodation-modification',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'disability-policies-and-physical-features',
    title: 'Policy change or physical change?',
    kind: 'decision',
    question: 'What change is being requested for disability-related access?',
    branches: [
      {
        label: 'Reasonable accommodation',
        detail: 'A change to a rule, policy, practice, or service.',
        outcome: 'Example: an exception to a no-pets policy for an assistance animal.',
      },
      {
        label: 'Reasonable modification',
        detail: 'A change to the physical premises.',
        outcome: 'Example: installing a grab bar or a ramp.',
      },
    ],
    caption:
      'These are different legal categories. Analyze necessity, reasonableness, verification limits, and cost responsibility under the applicable law and housing program; do not assume every request has the same answer.',
  },
  {
    id: 'wire-change-verification',
    lessonSlug: 'practice-ethics-advertising-technology',
    afterSection: 'worked-scenario-the-altered-wire-instruction',
    title: 'A changed wire instruction needs independent verification',
    kind: 'process',
    steps: [
      {
        label: 'Pause',
        detail: 'Do not send funds solely because an urgent message appears familiar.',
      },
      {
        label: 'Verify independently',
        detail: 'Use an established, trusted contact number, not one in the suspect message.',
      },
      {
        label: 'Escalate',
        detail: 'Notify the responsible broker and appropriate transaction parties.',
      },
      {
        label: 'Preserve evidence',
        detail: 'Retain the message and document the verification and response.',
      },
    ],
    caption:
      'A familiar signature, accurate closing details, or a professional-looking attachment does not authenticate new payment instructions. If money was already sent, prompt contact with the financial institution is critical.',
  },
  {
    id: 'management-cash-flow',
    lessonSlug: 'practice-property-management',
    afterSection: 'operate-from-a-budget-and-reliable-records',
    title: 'Budgeted rent is not cash available to distribute',
    kind: 'calculation',
    rows: [
      { label: 'Rent actually collected this month', amount: 8000 },
      { label: 'Authorized operating payments', amount: -2500 },
      { label: 'Amount retained for an agreed operating reserve', amount: -1500 },
    ],
    result: {
      label: 'Illustrative owner distribution',
      amount: 4000,
      detail: 'Subject to the agreement and all outstanding obligations.',
    },
    caption:
      'Security deposits held for tenants are excluded from this example. A reserve retained in the account is not automatically an expense in an operating-income calculation.',
  },
  {
    id: 'commercial-lease-costs',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'lease-labels-need-supporting-language',
    title: 'Lease economics follow the actual expense allocation',
    kind: 'comparison',
    columns: [
      {
        label: 'Gross structure',
        points: [
          'Landlord generally bears the agreed operating expenses.',
          'Read base-year provisions and pass-throughs.',
        ],
      },
      {
        label: 'Net structure',
        points: [
          'Tenant bears specified expenses in addition to base rent.',
          'Read which taxes, insurance, maintenance, or other costs are shifted.',
        ],
      },
      {
        label: 'Percentage rent',
        points: [
          'Rent includes an agreed share of defined sales.',
          'Read the breakpoint, exclusions, and reporting requirements.',
        ],
      },
    ],
    caption:
      'These labels do not replace the lease. A percentage-rent provision can coexist with a net expense structure, so the categories are not necessarily mutually exclusive.',
  },
  {
    id: 'inspection-evidence',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'use-the-right-report-for-the-question',
    title: 'Different evidence answers different property questions',
    kind: 'comparison',
    columns: [
      {
        label: 'Seller disclosure',
        points: [
          'What does the seller know about the property?',
          "Does not replace the agent's independent duties.",
        ],
      },
      {
        label: 'Agent inspection',
        points: [
          'What does the required visual inspection reveal?',
          'Is not an engineering or other specialist evaluation.',
        ],
      },
      {
        label: 'Specialist report',
        points: [
          'What does a qualified investigation establish within its scope?',
          'Read exclusions, limitations, and recommendations.',
        ],
      },
    ],
    caption:
      'A completed form is one source of information. Contradictory observations and recommendations for further investigation still require attention.',
  },
]
