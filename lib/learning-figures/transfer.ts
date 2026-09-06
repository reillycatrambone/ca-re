import type { LearningFigureSpec } from './types'

export const transferFigures: LearningFigureSpec[] = [
  {
    id: 'deed-delivery-recording',
    lessonSlug: 'transfer-deeds-and-vesting',
    afterSection: 'notarization-and-recording',
    title: 'Three acts with three different functions',
    kind: 'comparison',
    columns: [
      {
        label: 'Execution',
        points: [
          'The grantor signs the deed.',
          'A signature alone does not establish effective delivery.',
        ],
      },
      {
        label: 'Delivery and acceptance',
        points: [
          'Analyze intent to make the conveyance effective.',
          'Physical handover is evidence, not the entire legal test.',
        ],
      },
      {
        label: 'Recording',
        points: [
          'Places the instrument in public records.',
          'Notice and priority rules are distinct from validity between the parties.',
        ],
      },
    ],
    caption:
      'Notarization generally supports recordability; it is not a substitute for delivery. Recording does not cure every defect in an instrument.',
  },
  {
    id: 'title-policy-interests',
    lessonSlug: 'transfer-title-and-escrow',
    afterSection: 'owner-and-lender-policies-protect-different-interests',
    title: 'Two insured interests in one transaction',
    kind: 'comparison',
    columns: [
      {
        label: "Owner's policy",
        points: [
          "Insures the owner's stated interest.",
          'Scope depends on the policy, exceptions, exclusions, and endorsements.',
        ],
      },
      {
        label: "Lender's policy",
        points: [
          "Insures the lender's secured interest.",
          "Does not serve as the buyer's owner's policy.",
        ],
      },
    ],
    caption:
      'Both policies can exist for the same property because they protect different interests. Neither should be treated as a universal physical-condition warranty.',
  },
  {
    id: 'seller-proceeds-bridge',
    lessonSlug: 'transfer-taxes-and-prorations',
    afterSection: 'basis-and-gain',
    title: 'Sale proceeds are not the same as taxable gain',
    kind: 'calculation',
    rows: [
      { label: 'Illustrative selling price', amount: 800000 },
      { label: 'Assumed selling expenses', amount: -40000 },
      { label: 'Loan payoff', amount: -300000 },
    ],
    result: {
      label: 'Illustrative cash proceeds',
      amount: 460000,
      detail: 'Before other settlement debits, credits, or withholding.',
    },
    caption:
      'With an assumed $500,000 adjusted basis, realized gain is $760,000 amount realized minus $500,000 basis = $260,000 before any exclusion or deferral. The loan payoff affects cash, not that gain calculation.',
  },
  {
    id: 'special-transfer-authority',
    lessonSlug: 'transfer-special-transfers',
    afterSection: 'death-does-not-produce-one-universal-process',
    title: 'After a death, identify title and authority first',
    kind: 'decision',
    question: 'How was this interest held?',
    branches: [
      {
        label: 'Survivorship interest',
        detail: 'Determine whether a valid survivorship form controls.',
        outcome: "Verify the documents needed to establish the survivor's title.",
      },
      {
        label: 'Trust-held interest',
        detail: 'Determine the successor trustee and powers granted.',
        outcome: 'Verify trustee authority and transaction requirements.',
      },
      {
        label: 'Estate interest',
        detail: 'Determine whether probate or another authorized procedure applies.',
        outcome: 'Verify representative authority and any court requirements.',
      },
    ],
    caption:
      'This is a classification map, not a finding that a particular estate qualifies for a procedure. Heirship, a will, and legal authority to sign a sale instrument are different questions.',
  },
]
