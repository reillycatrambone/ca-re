import type { LearningFigureSpec } from '../types'

const civ = (section: string) =>
  `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=${section}.`
const ccp = (section: string) =>
  `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=${section}.`
const rtc = (section: string) =>
  `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=RTC&sectionNum=${section}.`
const saleArticle =
  'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=14.&part=4.&chapter=2.&article=1.'
const taxChapter = 'transfer-taxes-and-prorations'
const foreclosureChapter = 'financing-notes-security'

export const taxForeclosureFigures: LearningFigureSpec[] = [
  {
    id: 'exp-document-default-notice-reading',
    lessonSlug: foreclosureChapter,
    afterSection: 'from-default-notice-to-sale-notice',
    kind: 'document',
    title: 'A default notice is not a sale notice',
    objective:
      'Read the recording date, identified default, and amount date without mistaking an NOD for an immediate sale or a permanent cure quote.',
    sourceUrls: [civ('2924'), civ('2924c')],
    documentTitle: 'Notice of default / Selected facts',
    context:
      'Fictional teaching extract for an installment default before original maturity. This is not statutory notice language or a document for execution.',
    fields: [
      {
        label: 'Recording date',
        value: 'June 2, 2026',
        annotation:
          'This date starts the statutory three-month interval. It is not the original missed-payment date.',
      },
      {
        label: 'Default identified',
        value: 'Unpaid scheduled installments',
        annotation:
          'Identify the breached obligation. A power-of-sale clause alone does not establish compliance with the foreclosure procedure.',
      },
      {
        label: 'Amounts in default',
        value: '$5,400 as of June 1, 2026',
        annotation:
          'The as-of date matters. Later installments, permitted advances, and costs can change the amount needed to cure.',
      },
      {
        label: 'Sale date',
        value: 'Not established by these NOD facts',
        annotation:
          'A separate notice-of-sale process and all applicable restrictions still must be satisfied.',
      },
    ],
    conclusion:
      'Read the type of notice and its dates before deciding what event has occurred. A recorded default is not a completed foreclosure.',
    caption:
      'Original fictional excerpt. A timely statutory reinstatement excludes principal that would not yet be due without acceleration.',
  },
  {
    id: 'exp-timeline-foreclosure-calendar-minimum',
    lessonSlug: foreclosureChapter,
    afterSection: 'from-default-notice-to-sale-notice',
    kind: 'timeline',
    title: 'Three months is not exactly ninety days',
    objective:
      'Calculate the basic nonjudicial minimum with calendar months and a separate twenty-day notice period.',
    sourceUrls: [civ('2924'), civ('2924b'), saleArticle],
    premise:
      'Assume a valid May 5, 2026 NOD, satisfied pre-recording protections, timely notices, and no other restriction or postponement. These are minimum dates, not a guaranteed sale schedule.',
    events: [
      {
        when: 'May 5',
        label: 'NOD recorded',
        detail:
          'The three-calendar-month interval begins. Separate NOD mailing deadlines also apply.',
      },
      {
        when: 'August 5',
        label: 'Three months elapsed',
        detail:
          'This example spans 92 days. Assume sale-notice recording, required posting and mailing, and first publication occur by this date.',
      },
      {
        when: 'August 12 and 19',
        label: 'Weekly publication continues',
        detail:
          'With the August 5 first publication, these dates illustrate three consecutive calendar weeks.',
      },
      {
        when: 'August 25',
        label: 'Basic earliest-sale boundary',
        detail:
          'Three months plus twenty days have elapsed. Conducting a sale still requires satisfaction of every applicable condition.',
      },
    ],
    conclusion:
      'The option to record the NOS up to five days before the three-month interval ends does not move this August 25 boundary earlier.',
    caption:
      'Illustrative calendar, not a deadline service. Other borrower protections, court orders, or postponements can extend the sequence.',
  },
  {
    id: 'exp-comparison-foreclosure-prerequisite-clocks',
    lessonSlug: foreclosureChapter,
    afterSection: 'before-the-notice-of-default',
    kind: 'comparison',
    title: 'Two prerequisites can run at the same time',
    objective:
      'Distinguish federal delinquency and California contact triggers without mechanically adding their periods.',
    sourceUrls: [
      'https://www.consumerfinance.gov/rules-policy/regulations/1024/41/',
      civ('2923.5'),
      civ('2923.55'),
      civ('2924.15'),
    ],
    columns: [
      {
        label: 'Federal delinquency test',
        points: [
          'For covered mortgages, the general first-notice rule requires more than 120 days of delinquency.',
          'Specified exceptions and loss-mitigation restrictions require separate review.',
        ],
      },
      {
        label: 'California contact test',
        points: [
          'Generally thirty days after required contact or completed statutory due diligence.',
          'Covered first liens, owner-occupied residences of up to four units, household-purpose loans, and servicer rules matter.',
        ],
      },
      {
        label: 'Combined application',
        points: [
          'Each applicable requirement must be satisfied before recording the NOD.',
          'Contact can occur during delinquency. The rules do not automatically require 120 + 30 sequential days.',
        ],
      },
    ],
    caption:
      'Different triggers can create overlapping clocks. These are not universal rules for every loan secured by California property.',
  },
  {
    id: 'exp-timeline-reinstatement-business-days',
    lessonSlug: foreclosureChapter,
    afterSection: 'reinstatement-is-a-cure-not-full-payoff',
    kind: 'timeline',
    title: 'Locate the five-business-day cure boundary',
    objective:
      'Count the reinstatement cutoff using the incorporated California business-day definition rather than assuming Saturdays never count.',
    sourceUrls: [civ('2924c'), civ('9')],
    premise:
      'Assume a qualifying monetary default, an unchanged Wednesday, August 26, 2026 sale date, and no applicable holiday or banking-day exception. Saturday counts in this example.',
    events: [
      {
        when: 'Wednesday, August 19',
        label: 'Before the cutoff',
        detail:
          'A qualifying borrower can still exercise statutory reinstatement by satisfying the actual cure and tender requirements.',
      },
      {
        when: 'Thursday, August 20',
        label: 'Five-business-day boundary',
        detail:
          'Count backward from sale: Tuesday 25, Monday 24, Saturday 22, Friday 21, Thursday 20. Sunday 23 is excluded.',
      },
      {
        when: 'Monday, August 24',
        label: 'Inside the final period',
        detail:
          'Statutory reinstatement is no longer guaranteed. A creditor may agree to a later cure; full payoff is a different pre-sale route.',
      },
      {
        when: 'Wednesday, August 26',
        label: 'Noticed sale date',
        detail:
          'An ordinary completed trustee sale does not create a borrower post-sale statutory redemption period.',
      },
    ],
    conclusion:
      'Qualifying new notices or postponements can revive reinstatement under section 2924c. Recalculate from the legally operative sale date.',
    caption:
      'The example identifies a boundary, not a guaranteed last tender hour. Verify actual notice, holidays, banking rules, and payment instructions.',
  },
  {
    id: 'exp-decision-judicial-redemption-period',
    lessonSlug: foreclosureChapter,
    afterSection: 'after-sale-identify-whether-redemption-exists',
    kind: 'decision',
    title: 'Establish the right before counting redemption time',
    objective:
      'Select no redemption, three months, or one year from the enforcement route, deficiency status, and sale proceeds.',
    sourceUrls: [ccp('726'), ccp('729.030'), civ('2924c')],
    question: 'Which ordinary post-sale borrower redemption result matches the stated foreclosure?',
    branches: [
      {
        label: 'Completed nonjudicial trustee sale',
        detail:
          'Do not import the judicial foreclosure redemption periods into a power-of-sale foreclosure.',
        outcome: 'No borrower post-sale statutory redemption.',
      },
      {
        label: 'Judicial; deficiency waived or prohibited',
        detail: 'Section 726(e) places this sale outside the statutory redemption route.',
        outcome: 'No statutory redemption under this route.',
      },
      {
        label: 'Judicial right applies; proceeds sufficient',
        detail:
          'Proceeds satisfy secured indebtedness, interest, and costs of the action and sale.',
        outcome: 'Three months after sale.',
      },
      {
        label: 'Judicial right applies; proceeds insufficient',
        detail:
          'The same debt, interest, and cost measure is not fully satisfied by sale proceeds.',
        outcome: 'One year after sale.',
      },
    ],
    caption:
      'Redemption requires the statutory payment and procedure. Paying missed installments is reinstatement, not post-sale redemption.',
  },
  {
    id: 'exp-decision-residential-sale-postponements',
    lessonSlug: foreclosureChapter,
    afterSection: 'why-a-minimum-timeline-can-grow',
    kind: 'decision',
    title: 'Different facts trigger different sale extensions',
    objective:
      'Distinguish the listing, follow-on purchase, and first-auction protections without treating them as an automatic ninety-day extension.',
    sourceUrls: [saleArticle],
    question:
      'For residential property of no more than four units, which current section 2924f condition is satisfied?',
    branches: [
      {
        label: 'Qualifying public-marketing listing',
        detail:
          'California-licensed broker listing; trustee receives it through the prescribed tracked, signed delivery at least five business days before sale.',
        outcome: 'One postponement: forty-five days after the scheduled sale date.',
      },
      {
        label: 'Qualifying contract after that postponement',
        detail:
          'Timely prescribed delivery of a fully executed contract covering recorded secured obligations, with required buyer, closing, and escrow terms.',
        outcome: 'One further postponement: at least forty-five days after trustee receipt.',
      },
      {
        label: 'First-lien property remains unsold at first auction',
        detail:
          'The first auction is subject to the statutory 67% fair-market-value floor. This branch is not triggered merely by a borrower listing.',
        outcome: 'Postpone at least seven days; the property may then sell to the highest bidder.',
      },
    ],
    caption:
      'Each branch has its own conditions and trigger. This depicts the version of section 2924f operative in 2026; other postponement rules can also apply.',
  },
  {
    id: 'exp-document-assessment-value-identities',
    lessonSlug: taxChapter,
    afterSection: 'proposition-13-three-different-numbers',
    kind: 'document',
    title: 'Market value and enrolled value need not match',
    objective:
      'Read a fictional assessment summary without substituting market value for the applicable factored base-year value.',
    sourceUrls: [rtc('51'), 'https://www.boe.ca.gov/proptaxes/decline-in-value/'],
    documentTitle: 'Annual assessment / Value summary',
    context:
      'Original fictional excerpt for ordinary real property. Assume no reassessable event, exemptions, disaster adjustment, or other special rule.',
    fields: [
      {
        label: 'Valuation date',
        value: 'January 1',
        annotation:
          'The annual lien-date comparison does not use the November installment due date.',
      },
      {
        label: 'Current market value',
        value: '$750,000',
        annotation:
          'This estimates current value. Appreciation alone does not reset the Proposition 13 baseline.',
      },
      {
        label: 'Factored base-year value',
        value: '$430,000',
        annotation:
          'This follows the existing base-year history and permitted annual inflation adjustments.',
      },
      {
        label: 'Enrolled assessed value',
        value: '$430,000',
        annotation:
          "The lesser applicable value is enrolled. None of these fields establishes the owner's income-tax basis.",
      },
    ],
    conclusion:
      'A $750,000 market estimate does not automatically produce a $750,000 assessment for this continuing owner.',
    caption:
      'An educational value comparison, not a county form. Assessed value and the eventual tax bill are different quantities.',
  },
  {
    id: 'exp-calculation-factored-base-inflation',
    lessonSlug: taxChapter,
    afterSection: 'compound-the-assessment-not-the-market-price',
    kind: 'calculation',
    title: 'Cap the factor, then compound the value',
    objective:
      'Apply a one-percent adjustment followed by a capped two-percent adjustment to the correct preceding factored value.',
    sourceUrls: [rtc('51')],
    rows: [
      { label: 'Starting base-year value', amount: 500000 },
      { label: 'First increase: 1% of $500,000', amount: 5000 },
      { label: 'Next increase: capped 2% of $505,000', amount: 10100 },
    ],
    result: {
      label: 'Factored base-year value',
      amount: 515100,
      detail:
        'The second year uses $505,000, not the original $500,000. Hypothetical 4% inflation is capped at 2% for that adjustment.',
    },
    caption:
      'Assume no reassessment, decline-in-value reduction, or other adjustment. This is assessed-value growth, not a property-tax rate calculation.',
  },
  {
    id: 'exp-timeline-proposition-eight-recovery',
    lessonSlug: taxChapter,
    afterSection: 'proposition-8-compare-two-values-each-january-1',
    kind: 'timeline',
    title: 'Temporary reductions do not reset the ceiling',
    objective:
      'Track Proposition 8 recovery while the independent factored base-year ceiling continues to grow.',
    sourceUrls: [rtc('51'), 'https://www.boe.ca.gov/proptaxes/decline-in-value/faq.htm'],
    premise:
      'Assume successive January 1 valuations, a 2% annual inflation factor, and no ownership change, construction, exemption change, or other adjustment.',
    events: [
      {
        when: 'Year 1',
        label: 'Temporary reduction',
        detail: 'Factored ceiling $600,000; market $520,000. Enroll the lower $520,000.',
      },
      {
        when: 'Year 2',
        label: 'Market recovers below the ceiling',
        detail:
          'Ceiling $612,000; market $580,000. Enroll $580,000, an 11.54% increase from the prior reduced assessment.',
      },
      {
        when: 'Year 3',
        label: 'Restore the factored ceiling',
        detail:
          'Ceiling $624,240; market $650,000. Enroll $624,240 rather than the higher market value.',
      },
    ],
    conclusion:
      'The 2% cap governs growth of the factored ceiling. Recovery from a temporarily reduced assessment can be greater than 2%.',
    caption:
      'Compare both values at each lien date. The reduced Year 1 assessment does not become a new Proposition 13 base year.',
  },
  {
    id: 'exp-decision-reassessment-scope',
    lessonSlug: taxChapter,
    afterSection: 'reassessment-changes-the-baseline',
    kind: 'decision',
    title: 'Reassess the interest or construction that changed',
    objective:
      'Distinguish whole-property reassessment from partial-interest reassessment and the increment added by new construction.',
    sourceUrls: [
      'https://boe.ca.gov/proptaxes/faqs/changeinownership.htm',
      'https://www.boe.ca.gov/proptaxes/newconstructionproperty.htm',
    ],
    question:
      'Assume a $400,000 existing factored value, no exclusion, and no other adjustment. Which independent event occurs?',
    branches: [
      {
        label: 'Reassessable transfer of the whole property',
        detail: 'Fair market value at transfer is $900,000.',
        outcome: 'The whole transferred interest receives a $900,000 new base-year value.',
      },
      {
        label: 'Ordinary reassessable transfer of a 50% interest',
        detail: 'The whole property is worth $900,000; the other half does not change ownership.',
        outcome:
          'Retain $200,000 for the unchanged half; add $450,000 for the transferred half: $650,000.',
      },
      {
        label: 'Completed addition with no ownership change',
        detail:
          'The addition contributes $100,000 of market value, regardless of whether its construction cost differs.',
        outcome: 'Retain $400,000 for the unaffected property; add $100,000: $500,000.',
      },
    ],
    caption:
      'Independent simplified alternatives, not successive events. Routine maintenance generally is not new construction; statutory exclusions and special ownership rules require separate review.',
  },
  {
    id: 'exp-allocation-property-tax-bill-components',
    lessonSlug: taxChapter,
    afterSection: 'proposition-13-three-different-numbers',
    kind: 'allocation',
    title: 'The general levy is one part of the bill',
    objective:
      'Separate the one-percent ad valorem levy from authorized debt rates and a fixed direct assessment.',
    sourceUrls: [
      'https://www.boe.ca.gov/proptaxes/pdf/pub29.pdf',
      'https://auditor.lacounty.gov/bwl-advanced-faq/what-does-my-property-taxes-and-direct-assessments-consist-of-and-where-does-it-go/',
    ],
    total: 7220,
    segments: [
      { label: 'General levy', amount: 6000, detail: '1% of $600,000 taxable assessed value' },
      {
        label: 'Permitted bond debt',
        amount: 720,
        detail: 'Stipulated 0.12% of the same $600,000 base',
      },
      {
        label: 'Direct assessment',
        amount: 500,
        detail: 'Stipulated lawful fixed charge, not another value percentage',
      },
    ],
    caption:
      'The illustrative bill totals $7,220. All additions are assumed authorized; neither 1.12% nor the $500 charge is a statewide universal rate.',
  },
  {
    id: 'exp-document-supplemental-tax-factor',
    lessonSlug: taxChapter,
    afterSection: 'regular-bills-and-supplemental-assessments',
    kind: 'document',
    title: 'A supplemental bill taxes the change in value',
    objective:
      'Read the assessment increase and statutory monthly factor without taxing the full property value twice or substituting a contractual proration convention.',
    sourceUrls: [rtc('75.41'), 'https://www.boe.ca.gov/proptaxes/supplemental-assessment/'],
    documentTitle: 'Supplemental assessment / Calculation extract',
    context:
      'Fictional October 15 sale. Assume assessed value rises from $400,000 to $600,000, a 1.1% applicable ad valorem rate, and no exemptions or other adjustments.',
    fields: [
      {
        label: 'Supplemental assessed value',
        value: '$600,000 - $400,000 = $200,000',
        annotation:
          'Tax the increase, not the whole $600,000 again. The existing annual bill remains separate.',
      },
      {
        label: 'Annual tax on the increase',
        value: '$200,000 x 0.011 = $2,200',
        annotation: 'Apply the stated ad valorem rate before the statutory partial-year factor.',
      },
      {
        label: 'Effective date and factor',
        value: 'November 1 / 0.67',
        annotation:
          'Start the month after the event. Section 75.41 specifies 0.67; do not replace it with exact 8/12.',
      },
      {
        label: 'Supplemental tax',
        value: '$2,200 x 0.67 = $1,474',
        annotation:
          'This statutory calculation is not the buyer-seller debit and credit used to allocate expenses at closing.',
      },
    ],
    conclusion:
      "A later supplemental bill need not be covered by closing prorations or the lender's impound account. Check its own payment instructions.",
    caption:
      'Original educational extract, not a county bill. An October event ordinarily creates one supplemental bill for the affected fiscal year.',
  },
]
