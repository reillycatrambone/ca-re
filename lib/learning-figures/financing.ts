import type { LearningFigureSpec } from './types'

export const financingFigures: LearningFigureSpec[] = [
  {
    id: 'loan-equity-share',
    lessonSlug: 'financing-loan-fundamentals',
    afterSection: 'ratios-describe-different-risks',
    title: 'LTV compares the loan to property value',
    kind: 'allocation',
    total: 400000,
    segments: [
      { label: 'Loan: 80%', amount: 320000, detail: '$320,000 borrowed' },
      { label: 'Equity: 20%', amount: 80000, detail: '$80,000 difference' },
    ],
    caption:
      'Assume a $400,000 property value and one $320,000 loan: LTV is 80%. This balance-sheet illustration excludes closing costs. Equity is not the same as cash proceeds after a sale.',
  },
  {
    id: 'loan-program-roles',
    lessonSlug: 'financing-loan-types-programs',
    afterSection: 'va-and-usda',
    title: 'Insurance, guaranty, and direct lending are different roles',
    kind: 'comparison',
    columns: [
      {
        label: 'FHA',
        points: [
          'Insures eligible loans made by approved lenders.',
          'Insurance protects the lender against covered losses.',
        ],
      },
      {
        label: 'VA',
        points: [
          'Generally guarantees part of eligible private-lender loans.',
          'Eligibility does not remove underwriting or repayment duties.',
        ],
      },
      {
        label: 'USDA',
        points: [
          'Has both guaranteed and direct housing loan programs.',
          'Program-specific eligibility and location requirements apply.',
        ],
      },
    ],
    caption:
      'Identify what the agency does before selecting a program answer. Government backing does not mean every loan is funded directly by the government or every applicant qualifies.',
  },
  {
    id: 'assumption-subject-to',
    lessonSlug: 'financing-notes-security',
    afterSection: 'assumption-versus-subject-to',
    title: 'Who promises to repay the existing debt?',
    kind: 'comparison',
    columns: [
      {
        label: 'Assumption',
        points: [
          'The buyer agrees to take on repayment responsibility.',
          'A release of the original borrower is a separate issue.',
        ],
      },
      {
        label: 'Subject to',
        points: [
          'The buyer takes title subject to the existing lien.',
          "Taking title alone does not create the buyer's personal promise to the lender.",
        ],
      },
    ],
    caption:
      'In either structure, analyze the loan terms, lender rights, and any applicable due-on-sale exceptions. A transfer agreement between buyer and seller does not itself erase lender rights.',
  },
  {
    id: 'credit-law-coverage',
    lessonSlug: 'financing-credit-law-originators',
    afterSection: 'start-with-the-transactions-coverage',
    title: 'Classify the loan before applying a disclosure rule',
    kind: 'process',
    steps: [
      {
        label: 'Purpose',
        detail: "Consumer or business purpose? The borrower's label alone is not decisive.",
      },
      {
        label: 'Property and structure',
        detail: 'What secures it? Is it closed-end, open-end, or a reverse mortgage?',
      },
      {
        label: 'Participants',
        detail: 'Who is the lender or broker, and what licensing framework applies?',
      },
      {
        label: 'Applicable rule',
        detail: 'Determine the required disclosure, trigger, timing, and any exception.',
      },
    ],
    caption:
      'Federal mortgage disclosures and California broker disclosures have different coverage tests. Do not apply a remembered deadline before establishing that the rule covers this transaction.',
  },
]
