import type { LearningFigureSpec } from './types'

export const agencyFigures: LearningFigureSpec[] = [
  {
    id: 'authority-evidence',
    lessonSlug: 'agency-relationships',
    afterSection: 'actual-and-ostensible-authority',
    title: 'Authority: whose conduct creates the belief?',
    kind: 'comparison',
    columns: [
      {
        label: 'Actual authority',
        points: [
          'The principal actually grants authority.',
          'Identify the authorized act and its limits.',
        ],
      },
      {
        label: 'Ostensible authority',
        points: [
          "The principal's conduct creates the relevant appearance.",
          "The agent's unsupported claim of power is not enough by itself.",
        ],
      },
    ],
    caption:
      'Ask what the principal authorized or caused a third party reasonably to believe. Authority to market a property is not automatically authority to sign its purchase contract.',
  },
  {
    id: 'disclosure-confidentiality',
    lessonSlug: 'agency-fiduciary-duties',
    afterSection: 'confidentiality-has-a-boundary',
    title: 'Classify the information before deciding to share',
    kind: 'decision',
    question: 'What kind of fact is at issue?',
    branches: [
      {
        label: 'Material property fact',
        detail: 'Known recurring roof leaks affecting value or desirability.',
        outcome: 'Required disclosure is not defeated by a request for secrecy.',
      },
      {
        label: 'Protected negotiating fact',
        detail: "A client's confidential willingness to accept different terms.",
        outcome: 'Protect confidentiality unless disclosure is authorized or legally required.',
      },
    ],
    caption:
      'The same transaction can contain facts that must be disclosed and information that must be protected. Loyalty does not authorize concealment or misrepresentation.',
  },
  {
    id: 'dual-agency-broker',
    lessonSlug: 'agency-disclosure-and-conflicts',
    afterSection: 'dual-agency-exists-at-the-broker-level',
    title: 'Separate salespersons, one dual-agent broker',
    kind: 'decision',
    question: 'Broker X represents both sides of this sale',
    branches: [
      {
        label: 'Seller side',
        detail: 'Salesperson A works with the seller under Broker X.',
        outcome: 'The seller is a principal of Broker X.',
      },
      {
        label: 'Buyer side',
        detail: 'Salesperson B works with the buyer under Broker X.',
        outcome: 'The buyer is also a principal of Broker X.',
      },
    ],
    caption:
      'Two affiliated salespersons do not make this two independent brokerage agencies. Dual-agency disclosure, consent, and limits must be analyzed at the broker level.',
  },
  {
    id: 'commission-waterfall',
    lessonSlug: 'agency-compensation-and-termination',
    afterSection: 'calculating-a-negotiated-commission',
    title: 'A negotiated fee is allocated in stages',
    kind: 'calculation',
    rows: [
      { label: '$800,000 price x hypothetical 2.5% brokerage fee', amount: 20000 },
      { label: 'Broker retains 30% under the affiliation agreement', amount: -6000 },
    ],
    result: {
      label: 'Salesperson share',
      amount: 14000,
      detail: "70% of this brokerage's $20,000 fee, before other deductions.",
    },
    caption:
      'Purely illustrative negotiated terms, not a standard commission. Apply the salesperson split to the correct brokerage fee, not directly to the sale price.',
  },
]
