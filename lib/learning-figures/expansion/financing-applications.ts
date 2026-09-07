import type { LearningFigureSpec } from '../types'

const fundamentals = 'financing-loan-fundamentals'
const programs = 'financing-loan-types-programs'
const security = 'financing-notes-security'
const credit = 'financing-credit-law-originators'
const terms = 'https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms/'
const finance = 'https://www.dre.ca.gov/files/pdf/refbook/ref12.pdf'
const regulation = 'https://www.consumerfinance.gov/rules-policy/regulations/1026/19/'
const trid =
  'https://www.consumerfinance.gov/compliance/compliance-resources/mortgage-resources/tila-respa-integrated-disclosures/tila-respa-integrated-disclosure-faqs/'
const civ = (section: string) =>
  `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=${section}.`
const ccp = (section: string) =>
  `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=${section}.`
const bpc = (section: string) =>
  `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=${section}.`

export const financingApplicationFigures: LearningFigureSpec[] = [
  {
    id: 'exp-finance-appraisal-ceiling-curve',
    lessonSlug: fundamentals,
    afterSection: 'trace-the-financing-gap',
    kind: 'chart',
    title: 'A higher appraisal eventually stops increasing the loan',
    objective:
      'Apply an eighty-percent limit to the lower of price or appraisal and identify the cash-gap curve and its plateau.',
    sourceUrls: [terms],
    xAxis: { label: 'Appraised value', format: 'currency' },
    yAxis: { label: 'Loan or buyer price contribution', format: 'currency' },
    series: [
      {
        label: 'Maximum loan',
        points: [
          { x: 500000, y: 400000 },
          { x: 550000, y: 440000 },
          { x: 600000, y: 480000 },
          { x: 650000, y: 480000 },
        ],
      },
      {
        label: 'Buyer contribution to price',
        points: [
          { x: 500000, y: 200000 },
          { x: 550000, y: 160000 },
          { x: 600000, y: 120000 },
          { x: 650000, y: 120000 },
        ],
      },
    ],
    conclusion:
      'At a $550,000 appraisal, $600,000 - (80% x $550,000) = $160,000. At $650,000, the $600,000 price still caps the base; the loan stays $480,000.',
    caption:
      'Fictional $600,000 purchase with an expressly stipulated lower-of-price-or-appraisal rule. Ignore closing costs, credits, and other underwriting constraints. This is not a universal program limit.',
  },
  {
    id: 'exp-finance-income-debt-sensitivity',
    lessonSlug: fundamentals,
    afterSection: 'separate-collateral-risk-from-payment-risk',
    kind: 'chart',
    title: 'Change the payment burden or the qualifying income',
    objective:
      'Recalculate total DTI after an auto debt is eliminated and distinguish that change from a higher qualifying income.',
    sourceUrls: [
      'https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/',
    ],
    xAxis: { label: 'Qualifying gross monthly income', format: 'currency' },
    yAxis: { label: 'Total debt-to-income ratio', format: 'percent' },
    series: [
      {
        label: '$4,000 monthly debt',
        points: [
          { x: 8000, y: 50 },
          { x: 10000, y: 40 },
          { x: 12000, y: 33.33 },
        ],
      },
      {
        label: '$3,300 after auto payoff',
        points: [
          { x: 8000, y: 41.25 },
          { x: 10000, y: 33 },
          { x: 12000, y: 27.5 },
        ],
      },
    ],
    conclusion:
      'At $10,000 income, removing a $700 monthly obligation moves total DTI from 40% to 33%. Paying $700 toward its balance without eliminating the counted payment would not produce that result.',
    caption:
      'Assume $2,800 qualifying housing expense, $700 auto debt, $500 other counted debt, and an accepted payoff that removes the auto payment. Ratios rounded to two decimals; no approval threshold is assumed.',
  },
  {
    id: 'exp-finance-cltv-collateral-file',
    lessonSlug: fundamentals,
    afterSection: 'ratios-describe-different-risks',
    kind: 'document',
    title: 'A first-lien ratio can hide the second loan',
    objective:
      'Calculate first-lien LTV, combined LTV, and remaining equity using every stipulated secured balance.',
    sourceUrls: [
      terms,
      'https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-loan-en-106/',
    ],
    documentTitle: 'Collateral worksheet / Two closed-end liens',
    context:
      'Fictional existing-property comparison. Both loan balances remain unchanged; no other liens or sale costs. These are balance-based ratios, not HELOC commitment underwriting.',
    fields: [
      {
        label: 'Original comparison value',
        value: '$650,000',
        annotation: 'Use the same denominator when comparing the two original ratios.',
      },
      {
        label: 'First lien',
        value: '$455,000 / $650,000 = 70%',
        annotation: 'This is the first-lien LTV, not total leverage.',
      },
      {
        label: 'Second lien',
        value: '$65,000; combined debt $520,000',
        annotation: 'CLTV is $520,000 / $650,000 = 80%; equity is $130,000.',
      },
      {
        label: 'Changed value',
        value: '$520,000',
        annotation: 'First-lien LTV becomes 87.5%; combined LTV becomes 100%; equity becomes zero.',
      },
    ],
    conclusion:
      "The second loan did not disappear when the first ratio was quoted. A 20% value decline consumed all $130,000 of this owner's starting equity.",
    caption:
      'A collateral calculation does not establish that the borrower can afford either loan payment.',
  },
  {
    id: 'exp-finance-monthly-bill-components',
    lessonSlug: fundamentals,
    afterSection: 'compare-the-full-cost',
    kind: 'allocation',
    title: 'The servicer payment is not the entire housing budget',
    objective:
      'Reconcile principal and interest, impounds, mortgage insurance, and separately paid HOA dues without treating each dollar as debt reduction.',
    sourceUrls: [terms],
    total: 3700,
    segments: [
      {
        label: 'Principal and interest',
        amount: 2600,
        detail: 'Stipulated fixed scheduled P&I; only its principal portion reduces debt.',
      },
      {
        label: 'Property-tax impound',
        amount: 600,
        detail: 'Held for property taxes, not extra principal.',
      },
      {
        label: 'Hazard-insurance impound',
        amount: 150,
        detail: 'Pays for property coverage, not mortgage-default insurance.',
      },
      {
        label: 'Mortgage insurance',
        amount: 150,
        detail: 'A separate stipulated loan-related charge.',
      },
      {
        label: 'HOA paid separately',
        amount: 200,
        detail: 'Outside the $3,500 servicer bill but inside this $3,700 budget.',
      },
    ],
    caption:
      'If insurance impounds alone rise $90, the servicer bill becomes $3,590 and this budget becomes $3,790. The fixed $2,600 P&I does not change. Ignore shortages and other expenses in this example.',
  },
  {
    id: 'exp-finance-points-holding-period',
    lessonSlug: fundamentals,
    afterSection: 'compare-cash-cost-with-borrowing-cost',
    kind: 'chart',
    title: 'Upfront pricing changes which holding period looks cheaper',
    objective:
      'Compare cumulative cash differences for points, zero-point pricing, and lender credits while recognizing the limits of simple break-even.',
    sourceUrls: [
      'https://www.consumerfinance.gov/ask-cfpb/how-should-i-use-lender-credits-and-points-also-called-discount-points-en-136/',
    ],
    xAxis: { label: 'Months loan is kept', format: 'number' },
    yAxis: { label: 'Cash saved versus zero-point offer', format: 'currency' },
    series: [
      {
        label: 'Pay $3,600; save $90/month',
        points: [
          { x: 0, y: -3600 },
          { x: 12, y: -2520 },
          { x: 24, y: -1440 },
          { x: 30, y: -900 },
          { x: 40, y: 0 },
          { x: 60, y: 1800 },
        ],
      },
      {
        label: 'Zero-point comparison',
        points: [
          { x: 0, y: 0 },
          { x: 12, y: 0 },
          { x: 24, y: 0 },
          { x: 30, y: 0 },
          { x: 40, y: 0 },
          { x: 60, y: 0 },
        ],
      },
      {
        label: '$2,400 credit; pay $80/month more',
        points: [
          { x: 0, y: 2400 },
          { x: 12, y: 1440 },
          { x: 24, y: 480 },
          { x: 30, y: 0 },
          { x: 40, y: -800 },
          { x: 60, y: -2400 },
        ],
      },
    ],
    conclusion:
      "Points recover their $3,600 cash cost at month 40. The credit's $2,400 initial benefit is consumed at month 30. A sale after 24 months and a sale after 60 months give different cash comparisons.",
    caption:
      'Fictional offers with the same loan amount. Positive means less cumulative cash paid. This simplified screen excludes payoff-balance differences, time value, taxes, and fees beyond those stated; it is not a complete economic-cost or APR comparison.',
  },
  {
    id: 'exp-finance-extra-principal-next-payment',
    lessonSlug: fundamentals,
    afterSection: 'follow-two-amortizing-payments',
    kind: 'comparison',
    title: "Extra principal changes next month's split, not this payment contract",
    objective:
      'Trace an extra principal payment into the next interest charge without assuming a recast or advance of the due date.',
    sourceUrls: [terms],
    columns: [
      {
        label: 'Scheduled $800 only',
        points: [
          '$100,000 x 6% / 12 = $500 interest.',
          '$800 - $500 = $300 principal; balance $99,700.',
          'Next interest $498.50; next $800 payment contains $301.50 principal.',
        ],
      },
      {
        label: '$800 plus $1,000 principal',
        points: [
          'The same $500 interest; principal paid is $1,300.',
          'Balance falls to $98,700.',
          'Next interest $493.50; next $800 payment contains $306.50 principal.',
        ],
      },
    ],
    caption:
      "Fictional monthly-interest loan; immediate principal application, no fee, no recast, and no payment-date change. The extra $1,000 saves $5 in next month's interest; it does not automatically reduce the next $800 bill.",
  },
  {
    id: 'exp-finance-rate-points-amount-financed',
    lessonSlug: fundamentals,
    afterSection: 'worked-comparison',
    kind: 'document',
    title: 'A loan has several different cost numbers',
    objective:
      'Distinguish note principal, points, amount financed, and APR without adding unlike percentages.',
    sourceUrls: [terms],
    documentTitle: 'Fictional credit-cost worksheet',
    context:
      'Assume a $200,000 note, all $5,000 of the stated upfront charges are prepaid finance charges, no other adjustments, and a six-percent annual note rate.',
    fields: [
      {
        label: 'Note principal',
        value: '$200,000',
        annotation:
          'The contractual starting debt does not shrink because upfront costs are disclosed separately.',
      },
      {
        label: 'Points',
        value: '2 points = $4,000',
        annotation:
          '2% x $200,000. Add a stipulated $1,000 other prepaid finance charge for $5,000 total.',
      },
      {
        label: 'Amount financed',
        value: '$195,000',
        annotation: '$200,000 - $5,000 under these expressly simplified facts.',
      },
      {
        label: 'APR',
        value: 'Not established by 6% + 2%',
        annotation:
          'Timing, repayment cash flows, and included charges determine the annualized measure. Points are not annual interest percentage points.',
      },
    ],
    conclusion:
      'A smaller amount financed is a cost-disclosure measure here, not a $5,000 principal payment.',
    caption: 'An educational extraction, not a lender form or a computed APR quote.',
  },
  {
    id: 'exp-finance-owner-servicer-transfer-packet',
    lessonSlug: fundamentals,
    afterSection: 'where-mortgage-money-comes-from',
    kind: 'comparison',
    title: 'Identify which company changed before redirecting a payment',
    objective:
      'Distinguish sale of the loan asset from transfer of servicing through three changed-fact cases.',
    sourceUrls: [
      'https://www.consumerfinance.gov/ask-cfpb/what-happens-if-my-mortgage-is-sold-is-my-loan-safe-en-199/',
    ],
    columns: [
      {
        label: 'Owner changes only',
        points: [
          'Investor B buys the note from Investor A.',
          'Servicer C continues collecting payments.',
          'The asset transfer alone does not instruct a payment to B.',
        ],
      },
      {
        label: 'Servicer changes only',
        points: [
          'Investor A keeps the loan.',
          'The servicing notice names Servicer D and the effective payment instructions.',
          'Use the verified instructions; ownership need not change.',
        ],
      },
      {
        label: 'Both change',
        points: [
          'Investor B owns the loan; Servicer D administers it.',
          'Read both roles in the notices.',
          'Neither transfer alone rewrites a fixed note rate or forgives principal.',
        ],
      },
    ],
    caption:
      'Fictional parties. Confirm authentic notices through known contact channels; no real account or routing information is shown.',
  },
  {
    id: 'exp-program-four-axis-loan-file',
    lessonSlug: programs,
    afterSection: 'classify-along-more-than-one-dimension',
    kind: 'document',
    title: 'Four labels can all describe the same loan',
    objective:
      'Classify one loan by government support, rate behavior, repayment pattern, and lien position without making the categories mutually exclusive.',
    sourceUrls: [terms],
    documentTitle: 'Proposed credit / Classification extract',
    context:
      'Fictional loan terms for classification only, not an offered consumer product or an underwriting approval.',
    fields: [
      {
        label: 'Government support',
        value: 'No government insurance or guaranty',
        annotation:
          'Conventional describes this dimension. It does not by itself establish conforming eligibility.',
      },
      {
        label: 'Rate',
        value: 'Index plus margin, subject to caps',
        annotation: 'Adjustable rate. Conventional does not mean fixed rate.',
      },
      {
        label: 'Repayment',
        value: 'Payments amortized over 30 years; due in 5',
        annotation:
          'The remaining balance is due at maturity. A 30-year payment calculation does not supply a 30-year maturity.',
      },
      {
        label: 'Security position',
        value: 'Behind an existing first deed of trust',
        annotation:
          'Junior lien. This label neither decides the rate nor supplies government backing.',
      },
    ],
    conclusion:
      'This loan can be conventional, adjustable-rate, partially amortizing, and junior at the same time.',
    caption:
      'Read the term that answers the question asked; do not substitute a program label for a payment obligation.',
  },
  {
    id: 'exp-program-arm-multiple-reset-curve',
    lessonSlug: programs,
    afterSection: 'read-an-arm-adjustment-in-order',
    kind: 'chart',
    title: 'An ARM cap can bind at one reset and release at another',
    objective:
      'Apply repeated upward and downward adjustment limits plus a lifetime ceiling to a changing indexed target.',
    sourceUrls: [
      'https://www.consumerfinance.gov/ask-cfpb/for-an-adjustable-rate-mortgage-arm-what-are-the-index-and-margin-and-how-do-they-work-en-1949/',
    ],
    xAxis: { label: 'Annual reset number; zero is start', format: 'number' },
    yAxis: { label: 'Annual interest rate', format: 'percent' },
    series: [
      {
        label: 'Index plus 2-point margin',
        points: [
          { x: 0, y: 4 },
          { x: 1, y: 7 },
          { x: 2, y: 8 },
          { x: 3, y: 9 },
          { x: 4, y: 5 },
        ],
      },
      {
        label: 'Permitted note rate',
        points: [
          { x: 0, y: 4 },
          { x: 1, y: 5 },
          { x: 2, y: 6 },
          { x: 3, y: 6 },
          { x: 4, y: 5 },
        ],
      },
    ],
    conclusion:
      'Reset 1 is limited to 5%, reset 2 reaches 6%, and reset 3 remains 6% despite a 9% target. At reset 4, the 5% target is within the one-point downward limit.',
    caption:
      'Hypothetical initial 4%; each reset may change at most one percentage point in either direction; lifetime maximum 6%; floor 2%; no carryover, rounding, or payment cap. Targets are stipulated, not forecasts or current loan quotes.',
  },
  {
    id: 'exp-program-repayment-balance-paths',
    lessonSlug: programs,
    afterSection: 'compare-maturity-with-amortization',
    kind: 'chart',
    title: 'A smaller payment can leave a larger debt',
    objective:
      'Compare declining, unchanged, and growing principal under three payment patterns on the same starting debt and interest convention.',
    sourceUrls: [
      terms,
      'https://www.consumerfinance.gov/ask-cfpb/what-is-negative-amortization-en-103/',
    ],
    xAxis: { label: 'Payments completed', format: 'number' },
    yAxis: { label: 'Remaining principal', format: 'currency' },
    series: [
      {
        label: '$1,000 monthly payment',
        points: [
          { x: 0, y: 120000 },
          { x: 1, y: 119600 },
          { x: 2, y: 119198 },
          { x: 3, y: 118793.99 },
        ],
      },
      {
        label: '$600 interest-only payment',
        points: [
          { x: 0, y: 120000 },
          { x: 1, y: 120000 },
          { x: 2, y: 120000 },
          { x: 3, y: 120000 },
        ],
      },
      {
        label: '$500 limited payment',
        points: [
          { x: 0, y: 120000 },
          { x: 1, y: 120100 },
          { x: 2, y: 120200.5 },
          { x: 3, y: 120301.5 },
        ],
      },
    ],
    conclusion:
      'For the $500 plan, month 2 interest is $600.50 on $120,100. Its $100.50 shortfall is added to principal. The balance grows even though the borrower makes every stipulated payment.',
    caption:
      'Fictional 6% annual rate, monthly rate 0.5%, month-end payments, interest rounded to cents each month, no fees. The limited-payment contract expressly capitalizes unpaid interest. This is a three-payment illustration, not a full amortization schedule.',
  },
  {
    id: 'exp-program-construction-advance-ledger',
    lessonSlug: programs,
    afterSection: 'repayment-and-collateral-variations',
    kind: 'ledger',
    title: 'An approved construction budget is not all advanced debt',
    objective:
      'Reconcile actual construction advances against a commitment and calculate interest from the stipulated funded balance.',
    sourceUrls: ['https://www.consumerfinance.gov/ask-cfpb/what-is-a-construction-loan-en-108/'],
    account: 'Borrower draws received / Disbursed principal only',
    openingBalance: 0,
    entries: [
      { label: 'Approved site-work draw', received: 120000, paid: 0, balance: 120000 },
      { label: 'Approved framing draw', received: 80000, paid: 0, balance: 200000 },
      { label: 'Approved systems draw', received: 50000, paid: 0, balance: 250000 },
    ],
    conclusion:
      'Against a $400,000 commitment, $250,000 has been advanced and $150,000 remains undrawn. If $250,000 stays outstanding for one full month at 9% / 12, stipulated interest is $1,875, not $3,000 on the entire commitment.',
    caption:
      'Fictional principal subledger, not a trust-account balance. Assume interest paid separately, no capitalized charges, and further draws conditional on approval. Permanent refinancing is not promised by this draw record.',
  },
  {
    id: 'exp-program-fha-file-evidence',
    lessonSlug: programs,
    afterSection: 'fha-insurance-on-approved-loans',
    kind: 'document',
    title: 'An FHA appraisal leaves a different inspection question open',
    objective:
      "Identify which file evidence addresses collateral value, property condition, and the private lender's credit decision.",
    sourceUrls: ['https://www.hud.gov/sites/dfiles/OCHCO/documents/92564-CN.pdf', terms],
    documentTitle: 'Fictional FHA purchase / File status',
    context: 'Educational file notes, not an FHA endorsement or inspection report.',
    fields: [
      {
        label: 'Appraisal received',
        value: 'Value opinion and required property observations',
        annotation:
          "The lender's valuation process does not replace an independently arranged home inspection.",
      },
      {
        label: 'Inspection status',
        value: 'Buyer has not arranged one',
        annotation:
          'The completed appraisal does not change this missing investigation into a completed inspection.',
      },
      {
        label: 'Underwriting status',
        value: 'Income documentation still under review',
        annotation:
          'Government insurance does not make this incomplete private-lender credit decision an approval.',
      },
      {
        label: 'Post-closing defect',
        value: 'Hypothetical roof leak',
        annotation: 'FHA backing is not a promise that FHA will repair or buy back the home.',
      },
    ],
    conclusion:
      'Three separate questions remain: acceptable collateral, informed condition investigation, and borrower qualification.',
    caption:
      'An appraisal can identify concerns without being a comprehensive inspection or a warranty.',
  },
  {
    id: 'exp-program-va-eligibility-gap',
    lessonSlug: programs,
    afterSection: 'va-and-usda',
    kind: 'decision',
    title: 'A VA eligibility document does not solve every missing fact',
    objective:
      'Separate benefit eligibility from occupancy, appraisal-gap funding, and closing-cost requirements in a VA-backed purchase.',
    sourceUrls: ['https://www.va.gov/housing-assistance/home-loans/loan-types/purchase-loan/'],
    question: 'Which remaining issue appears in each independent fictional VA-backed loan file?',
    branches: [
      {
        label: 'COE present; income not verified',
        detail:
          'The buyer has documented benefit eligibility but the lender has not completed credit and income review.',
        outcome: 'COE is not a loan approval.',
      },
      {
        label: '$510,000 price; $490,000 appraisal',
        detail:
          'Assume this approved loan funds $490,000 toward price and the seller will not reduce price.',
        outcome:
          '$20,000 must come from another permitted source; no-down-payment advertising does not erase this gap.',
      },
      {
        label: 'No PMI; closing charges remain',
        detail:
          'The file also requires review of funding-fee applicability and any borrower-paid closing charges.',
        outcome: 'No monthly mortgage insurance does not mean no cash costs.',
      },
      {
        label: 'Purchase intended solely as a rental',
        detail: 'Assume the borrower will not satisfy applicable occupancy requirements.',
        outcome: 'Benefit eligibility alone does not make the proposed use eligible.',
      },
    ],
    caption:
      'Program and lender conditions still apply. No current funding-fee percentage or universal zero-down loan limit is asserted.',
  },
  {
    id: 'exp-program-assistance-payoff-identity',
    lessonSlug: programs,
    afterSection: 'california-programs',
    kind: 'calculation',
    title: 'Deferred assistance still appears at the stipulated payoff event',
    objective:
      'Reconcile seller proceeds after principal and accrued interest on a deferred junior assistance loan.',
    sourceUrls: ['https://www.calhfa.ca.gov/homebuyer/programs/myhome.htm'],
    rows: [
      { label: 'Proceeds after all other stipulated sale items', amount: 72000 },
      { label: 'Deferred junior principal due on this sale', amount: -18000 },
      { label: 'Accrued interest in the supplied payoff quote', amount: -900 },
    ],
    result: {
      label: 'Remaining proceeds',
      amount: 53100,
      detail:
        '$72,000 - $18,000 - $900 = $53,100. No prior monthly payment does not mean no repayment obligation.',
    },
    caption:
      'Fictional deferred-assistance terms and payoff quote, not a current MyHome rate or eligibility offer. MyHome illustrates the junior-loan category; actual program documents determine amount, interest, and repayment triggers. No grant forgiveness or appreciation-sharing term is assumed.',
  },
  {
    id: 'exp-program-hecm-obligation-file',
    lessonSlug: programs,
    afterSection: 'reverse-mortgages',
    kind: 'comparison',
    title: 'Age, property charges, and counseling answer different HECM questions',
    objective:
      'Test a reverse-mortgage proposal without treating age eligibility or the lack of a regular P&I payment as a substitute for continuing obligations.',
    sourceUrls: [
      'https://www.consumerfinance.gov/ask-cfpb/can-anyone-take-out-a-reverse-mortgage-loan-en-227/',
    ],
    columns: [
      {
        label: 'Application facts',
        points: [
          'A sole proposed borrower is 68 and occupies the home.',
          'Those facts address age and residence, not every eligibility condition.',
          'Required counseling and the remaining financial and property review still matter.',
        ],
      },
      {
        label: 'Monthly-cost assumption',
        points: [
          'The applicant budgets zero for property taxes and insurance.',
          'The proposal does not eliminate those property charges or maintenance responsibilities.',
          'Available resources or a required set-aside must be evaluated.',
        ],
      },
      {
        label: 'Existing mortgage',
        points: [
          'An existing $45,000 mortgage is not simply ignored.',
          'It must be paid off at HECM closing, using permitted own funds or reverse-loan proceeds.',
          'That payoff reduces funds otherwise available to the homeowner.',
        ],
      },
    ],
    caption:
      'Fictional sole-borrower proposal. This is not an eligibility determination or a summary of all spouse, absence, default, and repayment protections.',
  },
  {
    id: 'exp-security-note-versus-lien-file',
    lessonSlug: security,
    afterSection: 'the-note-is-the-promise-security-backs-it',
    kind: 'document',
    title: 'Read the promise and the collateral instrument separately',
    objective:
      'Find the repayment obligation, maturity, collateral, and enforcement authority in the correct document.',
    sourceUrls: [
      finance,
      'https://www.consumerfinance.gov/owning-a-home/close/review-documents-before-closing/',
    ],
    documentTitle: 'Fictional note and deed of trust / Matched excerpts',
    context: 'Selected educational terms from two documents, not execution-ready language.',
    fields: [
      {
        label: 'Note principal',
        value: '$240,000 promise to repay',
        annotation:
          'This identifies the debt. It does not itself identify every parcel serving as collateral.',
      },
      {
        label: 'Note maturity',
        value: 'Unpaid balance due on the stated maturity date',
        annotation: 'A monthly-payment amount does not replace the final due date.',
      },
      {
        label: 'Deed of trust collateral',
        value: 'Parcel identified by its legal description',
        annotation: 'This links the secured obligation to the particular real-property interest.',
      },
      {
        label: 'Power of sale',
        value: 'Enforcement authority in the security instrument',
        annotation:
          'The clause does not dispense with applicable default, notice, cure, and sale requirements.',
      },
    ],
    conclusion:
      'To answer how much is promised, read the note. To answer what property backs it and how the security may be enforced, read the security instrument and applicable law.',
    caption:
      "The trustee's limited security role is not beneficial ownership or a right to occupy the property.",
  },
  {
    id: 'exp-security-subordination-recovery-curve',
    lessonSlug: security,
    afterSection: 'clauses-that-change-the-analysis',
    kind: 'chart',
    title: 'Subordination changes who absorbs a low sale result',
    objective:
      "Quantify a seller lender's reduced collateral recovery after an effective subordination to a later construction loan.",
    sourceUrls: [finance],
    xAxis: { label: 'Net proceeds for these liens', format: 'currency' },
    yAxis: { label: 'Seller lien recovery', format: 'currency' },
    series: [
      {
        label: '$100,000 seller lien ahead',
        points: [
          { x: 200000, y: 100000 },
          { x: 300000, y: 100000 },
          { x: 350000, y: 100000 },
          { x: 400000, y: 100000 },
          { x: 500000, y: 100000 },
        ],
      },
      {
        label: 'Seller behind $300,000 construction lien',
        points: [
          { x: 200000, y: 0 },
          { x: 300000, y: 0 },
          { x: 350000, y: 50000 },
          { x: 400000, y: 100000 },
          { x: 500000, y: 100000 },
        ],
      },
    ],
    conclusion:
      'At $350,000 net proceeds, the seller receives $100,000 if first, but only $50,000 if subordinated: $350,000 - $300,000. Earlier recording does not restore the priority expressly surrendered.',
    caption:
      'Assume an enforceable completed subordination, fixed stated payoffs, and no taxes, intervening liens, interest, costs, or other priority issues. The graph measures collateral recovery, not whether an unpaid balance is personally collectible.',
  },
  {
    id: 'exp-security-senior-junior-sale-exposure',
    lessonSlug: security,
    afterSection: 'apply-priority-to-a-sale-price',
    kind: 'comparison',
    title: 'The foreclosing lien determines what remains ahead of the bidder',
    objective:
      'Distinguish net distributions at a senior sale from the senior-lien exposure that survives a junior sale.',
    sourceUrls: [finance],
    columns: [
      {
        label: 'First lien forecloses',
        points: [
          'Assume first payoff $360,000; junior payoff $80,000; $400,000 net available.',
          '$360,000 goes to the first and $40,000 to the junior.',
          'The junior lien is cut off; collectibility of its $40,000 shortfall is a separate question.',
        ],
      },
      {
        label: 'Junior lien forecloses',
        points: [
          'An independent bidder pays $100,000 at the junior sale.',
          'The $360,000 senior lien remains on the property.',
          'Bid plus surviving senior debt is $460,000 of economic exposure before other costs; the bid alone is not a free-and-clear price.',
        ],
      },
    ],
    caption:
      "Independent completed-sale examples with valid notice, stated priorities, and no statutory exception. Taking title subject to the senior lien does not by itself create the bidder's personal assumption of that note.",
  },
  {
    id: 'exp-security-assignment-release-comparison',
    lessonSlug: security,
    afterSection: 'follow-the-parties-through-payoff-and-transfer',
    kind: 'comparison',
    title: 'Three recorded actions change three different things',
    objective:
      'Differentiate a creditor transfer, a partial collateral release, and a full reconveyance by what remains after the document takes effect.',
    sourceUrls: [finance],
    columns: [
      {
        label: 'Assignment to Lender B',
        points: [
          "A valid transfer moves the lender's interest from A to B.",
          'The $180,000 unpaid obligation remains.',
          'Changing the beneficiary does not release the secured parcel.',
        ],
      },
      {
        label: 'Partial reconveyance',
        points: [
          'Assume agreed conditions release Parcel 1 from a two-parcel deed of trust.',
          'Parcel 2 remains security for the remaining obligation.',
          'Do not treat the one-parcel release as cancellation of the entire debt.',
        ],
      },
      {
        label: 'Full reconveyance after payoff',
        points: [
          'Assume all secured obligations are satisfied and the proper full reconveyance is completed.',
          'That deed of trust no longer encumbers its former collateral.',
          'Unrelated liens do not disappear with this one.',
        ],
      },
    ],
    caption:
      'Fictional completed actions. A payoff request, proposed assignment, or promised release is not proof that the corresponding record change has occurred.',
  },
  {
    id: 'exp-security-cure-quote-reconciliation',
    lessonSlug: security,
    afterSection: 'reinstatement-is-a-cure-not-full-payoff',
    kind: 'calculation',
    title: 'Reconcile an as-of-date cure quote before tender',
    objective:
      'Calculate a qualifying reinstatement from matured default amounts, permitted charges, and an applied credit without adding unmatured accelerated principal.',
    sourceUrls: [civ('2924c')],
    rows: [
      { label: 'Scheduled installments already overdue', amount: 7200 },
      { label: 'Permitted protective advance', amount: 900 },
      { label: 'Permitted enforcement charges', amount: 600 },
      { label: 'Payment credit already applied to these amounts', amount: -1700 },
    ],
    result: {
      label: 'Stated cure amount',
      amount: 7000,
      detail:
        '$7,200 + $900 + $600 - $1,700 = $7,000. If another $600 installment becomes due before tender, these otherwise unchanged facts require $7,600.',
    },
    caption:
      'Assume a timely statutory reinstatement for a monetary default before original maturity, all charges valid, and the stated credit not already netted out. An additional $200,000 due solely by acceleration is excluded. Actual tender requirements and current amounts still must be satisfied.',
  },
  {
    id: 'exp-security-first-auction-bid-file',
    lessonSlug: security,
    afterSection: 'why-a-minimum-timeline-can-grow',
    kind: 'document',
    title: 'A bid above the debt can still be below the first-auction floor',
    objective:
      'Apply the residential first-auction percentage to fair market value rather than debt and distinguish eligibility to sell from payment priority.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=14.&part=4.&chapter=2.&article=1.',
    ],
    documentTitle: 'First-lien auction / Fictional bid comparison',
    context:
      'Assume a 2026 first auction covered by Civil Code section 2924f for residential property of no more than four units; all other required conditions are satisfied.',
    fields: [
      {
        label: 'Fair market value used',
        value: '$900,000',
        annotation: 'This is the supplied statutory valuation input, not the unpaid note balance.',
      },
      {
        label: 'First-auction minimum',
        value: '67% x $900,000 = $603,000',
        annotation:
          'The floor is calculated from value even though the first-lien payoff is only $500,000.',
      },
      {
        label: 'Highest offered bid',
        value: '$590,000',
        annotation:
          'It exceeds the stipulated payoff by $90,000 but falls $13,000 below this floor.',
      },
      {
        label: 'Property remains unsold',
        value: 'Postpone at least seven days',
        annotation:
          'The subsequent auction may sell to the highest bidder under the applicable procedure; do not simply substitute $590,000 for a completed first-sale result.',
      },
    ],
    conclusion:
      'Debt, fair market value, and a qualifying bid are different numbers. Paying off the first note is not the sole condition for completing this first auction.',
    caption:
      'An arithmetic application of the version operative in 2026, not an appraisal, bidding recommendation, or a universal floor for every foreclosure.',
  },
  {
    id: 'exp-security-vendor-lender-purchase-tests',
    lessonSlug: security,
    afterSection: 'deficiency-protections-require-classification',
    kind: 'decision',
    title: 'The vendor test is not the third-party lender test',
    objective:
      'Apply the appropriate purchase-money anti-deficiency classification to seller carryback and third-party acquisition loans.',
    sourceUrls: [ccp('580b'), ccp('580d')],
    question: 'Which section 580b classification matches each independent loan?',
    branches: [
      {
        label: 'Warehouse seller carries the unpaid price',
        detail:
          'The buyer gives that vendor a deed of trust on the warehouse for the purchase-price balance.',
        outcome:
          'The vendor purchase-money protection can apply; residential owner occupancy is not imported into this branch.',
      },
      {
        label: 'Bank funds the same warehouse purchase',
        detail:
          'The loan is secured by a commercial warehouse, not a purchaser-occupied dwelling for up to four families.',
        outcome:
          'It does not meet that third-party residential purchase-money test. This does not decide every other defense or section 580d.',
      },
      {
        label: 'Bank funds an owner-occupied fourplex purchase',
        detail: 'Assume proceeds buy that dwelling and the purchaser occupies one unit.',
        outcome: 'The stated facts fit the third-party purchase-money branch.',
      },
    ],
    caption:
      'Ordinary borrower cases; no guarantor, other collateral, or special exception. The loan classification and enforcement route must both be examined.',
  },
  {
    id: 'exp-security-refinance-protected-balance',
    lessonSlug: security,
    afterSection: 'classify-a-possible-deficiency',
    kind: 'document',
    title: 'Cash-out refinancing does not make every dollar identical',
    objective:
      'Separate protected purchase-money refinance principal from a new cash advance and apply the statutory principal-payment ordering.',
    sourceUrls: [ccp('580b'), ccp('580d')],
    documentTitle: 'Post-2013 refinance / Principal classification',
    context:
      'Assume a qualifying section 580b(b) refinance of an institutional purchase-money home loan, no fees or other advances, and ordinary borrower liability only.',
    fields: [
      {
        label: 'Protected loan refinanced',
        value: '$250,000',
        annotation: 'This amount pays the qualifying prior obligation.',
      },
      {
        label: 'New cash for unrelated spending',
        value: '$50,000',
        annotation:
          'It is not used for the old obligation or permitted transaction expenses; it is the new-advance component.',
      },
      {
        label: 'Subsequent principal payment',
        value: '$20,000',
        annotation:
          'Section 580b(b) applies principal payments first to the protected purchase-money balance, not pro rata and not first to the cash-out part.',
      },
      {
        label: 'Classified remaining principal',
        value: '$230,000 protected; $50,000 new advance',
        annotation:
          'The total is $280,000. The cash-out component is not automatically collectible; the enforcement route and other law still matter.',
      },
    ],
    conclusion:
      'The security instrument may secure one $280,000 balance while the anti-deficiency analysis distinguishes two components.',
    caption:
      'If the lender completes a power-of-sale foreclosure on this note, section 580d supplies a separate ordinary anti-deficiency rule. Do not stop at the cash-out label.',
  },
  {
    id: 'exp-credit-application-sixth-item-file',
    lessonSlug: credit,
    afterSection: 'loan-estimate-and-closing-disclosure',
    kind: 'document',
    title: 'The last submitted application item starts this clock',
    objective:
      'Identify the TRID application trigger without confusing saved information, a prequalification label, or verification documents with submission.',
    sourceUrls: [trid, regulation],
    documentTitle: 'Fictional application intake / Event log',
    context:
      'Covered TRID transaction; creditor conducts substantially all business Monday through Friday; no holidays; no timely denial or withdrawal.',
    fields: [
      {
        label: 'Thursday submission',
        value: 'Five required items; no property address',
        annotation:
          'Name, income, credit-report Social Security number, estimated value, and amount sought are submitted. No actual personal data is reproduced.',
      },
      {
        label: 'Friday submission',
        value: 'Property address supplied',
        annotation:
          'The sixth required item has now been submitted. Calling the request prequalification does not erase the trigger.',
      },
      {
        label: 'Monday request',
        value: 'Pay stubs requested',
        annotation:
          'Verification may be sought but cannot be required before providing the Loan Estimate.',
      },
      {
        label: 'LE delivery or mailing deadline',
        value: 'Wednesday',
        annotation:
          'Monday, Tuesday, Wednesday are the three processing business days after Friday under this creditor schedule.',
      },
    ],
    conclusion:
      'A merely saved, unsubmitted application would be different. Here, submission is complete on Friday even while verification remains pending.',
    caption:
      'This processing-day calculation is not the seven-business-day pre-consummation waiting calculation.',
  },
  {
    id: 'exp-credit-mailed-le-cd-two-boundaries',
    lessonSlug: credit,
    afterSection: 'loan-estimate-and-closing-disclosure',
    kind: 'timeline',
    title: 'Mailing starts the LE clock; receipt starts the CD clock',
    objective:
      'Compute simultaneous LE and CD waiting boundaries with presumed receipt and identify the later controlling date.',
    sourceUrls: [regulation],
    premise:
      'Covered transaction in June 2026; no legal public holidays, waiver, or evidence of earlier receipt. Assume initial application processing deadlines are independently satisfied.',
    events: [
      {
        when: 'Monday, June 1',
        label: 'LE placed in mail',
        detail:
          'Seven counted days are June 2, 3, 4, 5, 6, 8, and 9. This clock begins at mailing, not at presumed receipt.',
      },
      {
        when: 'Thursday, June 4',
        label: 'CD placed in mail',
        detail: 'Presumed receipt is three business days later: Friday 5, Saturday 6, Monday 8.',
      },
      {
        when: 'Tuesday, June 9',
        label: 'LE boundary satisfied',
        detail: 'The LE period has elapsed, but the CD waiting period has not yet elapsed.',
      },
      {
        when: 'Thursday, June 11',
        label: 'CD boundary satisfied',
        detail:
          'Three business days after Monday receipt are Tuesday 9, Wednesday 10, Thursday 11. Both boundaries are now satisfied.',
      },
    ],
    conclusion:
      'On these facts, consummation cannot occur before June 11. Neither the LE mailing date nor the CD mailing date can be treated as the CD receipt date.',
    caption:
      'Saturday counts; Sunday does not. Consummation is the state-law loan-obligation event, not necessarily the escrow-disbursement date.',
  },
  {
    id: 'exp-credit-cd-correction-changed-facts',
    lessonSlug: credit,
    afterSection: 'distinguish-correction-from-a-new-waiting-period',
    kind: 'decision',
    title: 'Find the changed loan fact before restarting the wait',
    objective:
      'Separate corrections that require a new CD waiting period from corrections that must be disclosed without automatically restarting it.',
    sourceUrls: [regulation],
    question: 'Assume a valid initial CD and no waiver. What changed before consummation?',
    branches: [
      {
        label: 'Recording charge rises $45',
        detail:
          'Assume the APR remains accurate within applicable tolerances, the product is unchanged, and no prepayment penalty is added.',
        outcome:
          'Correct the disclosure; this isolated change does not trigger a new three-business-day wait.',
      },
      {
        label: 'Fixed-rate product becomes an ARM',
        detail: 'The loan product disclosed to the borrower changes.',
        outcome: 'Corrected CD and a new three-business-day waiting period.',
      },
      {
        label: 'A prepayment penalty is added',
        detail: 'The original disclosed transaction did not include this penalty.',
        outcome: 'Corrected CD and a new three-business-day waiting period.',
      },
      {
        label: 'APR becomes inaccurate',
        detail:
          'Assume it is inaccurate under the governing tolerance rule, not merely different in an immaterial way.',
        outcome: 'Corrected CD and a new three-business-day waiting period.',
      },
    ],
    caption:
      'The kind of change controls. This is not a general permission to ignore changed fees or other applicable disclosure duties.',
  },
  {
    id: 'exp-credit-rescission-late-notice-calendar',
    lessonSlug: credit,
    afterSection: 'rescission-is-a-different-three-day-rule',
    kind: 'timeline',
    title: 'A later rescission notice moves the starting event',
    objective:
      'Start the ordinary rescission count after the last required event rather than automatically after signing.',
    sourceUrls: [
      'https://www.consumerfinance.gov/ask-cfpb/how-long-do-i-have-to-rescind-when-does-the-right-of-rescission-start-en-187/',
    ],
    premise:
      'Assume a covered, nonpurchase principal-residence refinance with a new lender, one consumer entitled to rescind, all required material disclosures accurate, no waiver, and no holidays.',
    events: [
      {
        when: 'Monday, August 3, 2026',
        label: 'Loan consummated',
        detail:
          'The credit contract is signed and material disclosures received, but the required rescission notices have not been supplied.',
      },
      {
        when: 'Wednesday, August 5',
        label: 'Proper notices received',
        detail:
          'The consumer receives the required notices. This is the last of the three triggering events.',
      },
      {
        when: 'Thursday 6 and Friday 7',
        label: 'Days one and two',
        detail:
          "Do not count Monday signing as day one; count after Wednesday's last required event.",
      },
      {
        when: 'Saturday, August 8',
        label: 'Day three ends at midnight',
        detail:
          'On these facts, written rescission may be mailed or delivered before midnight. Saturday is a counting day.',
      },
    ],
    conclusion:
      'A Thursday deadline based only on Monday signing is wrong here. Never receiving a proper notice raises a different extended-right analysis, not this ordinary completed-notice count.',
    caption:
      'The home-purchase loan exclusion and other exceptions must be checked first; this is not a universal cancellation right for every mortgage.',
  },
  {
    id: 'exp-credit-mlds-agent-principal-switch',
    lessonSlug: credit,
    afterSection: 'california-borrower-and-lender-disclosures',
    kind: 'timeline',
    title: "Funding with the broker's money does not erase the earlier agency solicitation",
    objective:
      'Apply the California borrower disclosure duty when a broker solicits as an arranger but then supplies the loan funds.',
    sourceUrls: [bpc('10240')],
    premise:
      'Fictional California warehouse loan. The broker solicits the borrower as an agent arranging financing; assume no valid alternative disclosure route.',
    events: [
      {
        when: 'Monday morning',
        label: 'Completed written application received',
        detail:
          'The application concerns a loan secured by commercial real property. Commercial use does not itself remove the MLDS duty.',
      },
      {
        when: 'Monday afternoon',
        label: 'Broker decides to fund personally',
        detail:
          'The prior agency solicitation brings this switch within section 10240(b); source of funds does not erase the duty.',
      },
      {
        when: 'Before Tuesday note obligation',
        label: 'Complete and execute the MLDS',
        detail:
          'The earlier obligation event controls instead of waiting until the end of a three-business-day period.',
      },
      {
        when: 'At disclosure execution',
        label: 'Deliver the exact signed copy',
        detail:
          'The borrower and negotiating licensee sign the completed statement; the broker retains the signed record for three years.',
      },
    ],
    conclusion:
      'A broker acting solely as a principal from the outset presents different facts. Do not import that distinction into an agent-to-principal switch.',
    caption:
      'Original teaching chronology, not a statutory disclosure form. Required information must be complete before signature.',
  },
  {
    id: 'exp-credit-le-alternative-completeness-file',
    lessonSlug: credit,
    afterSection: 'match-the-obligation-to-the-recipient',
    kind: 'document',
    title: 'A federal LE in the file is not the whole California alternative',
    objective:
      'Audit the conditional LE alternative to the MLDS for signatures, companion disclosure, and applicable additional obligations.',
    sourceUrls: [
      bpc('10240'),
      'https://www.dre.ca.gov/files/pdf/adv/2015_2019/Advisory2015MLDS%20and%20Loan%20Estimate%20Advisory.pdf',
    ],
    documentTitle: 'California borrower package / Missing-item review',
    context:
      'Assume a federally regulated residential first-lien loan of $400,000 within the DRE-described alternative and otherwise compliant disclosures. The displayed notes are not the actual required form.',
    fields: [
      {
        label: 'Loan Estimate',
        value: 'Accurate but unsigned',
        annotation:
          "The DRE alternative requires the borrower's signed LE; federal delivery alone does not cure this missing item.",
      },
      {
        label: 'Companion California disclosure',
        value: 'Not delivered with the LE',
        annotation:
          "The contemporaneous companion must address no loan commitment and how to check the broker or originator's license status.",
      },
      {
        label: 'Identifiers and compensation',
        value: 'Check the complete package',
        annotation:
          'Required license and NMLS information and all broker compensation must be addressed; other-source compensation that cannot appear on the LE goes in the separate disclosure.',
      },
      {
        label: 'Other applicable disclosures',
        value: 'TILA and any balloon disclosure',
        annotation: 'A sufficient loan amount does not dispense with these requirements.',
      },
    ],
    conclusion:
      'This incomplete package does not satisfy the alternative. The presence of a federal LE does not by itself replace the California MLDS.',
    caption:
      'Educational package audit based on DRE guidance; not permission to redesign or omit an approved disclosure.',
  },
  {
    id: 'exp-credit-lpds-evidence-and-waiver',
    lessonSlug: credit,
    afterSection: 'keep-consent-within-its-legal-function',
    kind: 'document',
    title: "An appraisal waiver does not waive the lender's collateral information",
    objective:
      'Distinguish a case-specific independent-appraisal waiver from the continuing duty to disclose supported value and known anticipated encumbrances to a private lender.',
    sourceUrls: [bpc('10232.5')],
    documentTitle: 'Private-lender statement / Collateral evidence notes',
    context:
      'Assume a covered broker-arranged loan, a prospective private lender, and all separate delivery and funding-authorization duties still applicable. Fictional educational annotations only.',
    fields: [
      {
        label: 'Independent appraisal',
        value: 'Case-specific written waiver signed',
        annotation:
          'The broker must still provide a written estimated fair market value with the objective data supporting it.',
      },
      {
        label: 'Existing recorded first lien',
        value: '$300,000',
        annotation:
          "Its pertinent encumbrance information belongs in the lender's analysis, not only the borrower's application.",
      },
      {
        label: 'Additional planned secured loan',
        value: '$50,000; broker received written notice',
        annotation:
          'This is actual knowledge of an expected additional lien under the statute. Do not omit it merely because it is not yet recorded.',
      },
      {
        label: 'Proposed lender advance',
        value: '$100,000 against estimated $500,000 value',
        annotation:
          'All three stated balances total $450,000, or 90% of the estimate if all become outstanding. The proposed loan alone is only 20%; priority requires separate review.',
      },
    ],
    conclusion:
      'Consent concerning one evidence item is not permission to conceal other collateral risks or to disburse funds without proper authority.',
    caption:
      'The lender must also be offered the applicable title-insurance option and supplied the other required information. The waiver is not a waiver of the entire lender disclosure statement.',
  },
  {
    id: 'exp-credit-mlo-license-file-diagnosis',
    lessonSlug: credit,
    afterSection: 'who-originates-and-under-what-authority',
    kind: 'decision',
    title: 'A search result number is not proof of authority to originate',
    objective:
      'Separate a DRE real-estate license, individual MLO endorsement, company sponsorship, and federal registration in changed employment facts.',
    sourceUrls: [
      'https://www.dre.ca.gov/Licensees/MLOLicense.html',
      'https://www.consumerfinance.gov/rules-policy/regulations/1007/103/',
    ],
    question:
      'Assume activity requiring residential MLO authority. Which file fact remains unresolved?',
    branches: [
      {
        label: 'Active DRE salesperson license only',
        detail:
          'The person proposes to originate through a DRE mortgage brokerage but has no required MLO endorsement.',
        outcome: 'The base real-estate license alone is insufficient for the covered activity.',
      },
      {
        label: 'NMLS identifier; endorsement inactive',
        detail:
          'An identifier persists in the system even though the relevant endorsement status is not active.',
        outcome: 'The number is not a substitute for current authority.',
      },
      {
        label: 'Individual endorsed; no approved company relationship',
        detail:
          'The proposed DRE business relationship and required company sponsorship have not been established.',
        outcome:
          'Verify the company authority and sponsorship; individual qualification does not finish the file.',
      },
      {
        label: 'Employee of a covered federally regulated bank',
        detail:
          'The person acts within the applicable federal registration framework, not as an independent DRE mortgage brokerage.',
        outcome:
          'Use the correct registration framework instead of declaring every bank employee needs a DRE endorsement.',
      },
    ],
    caption:
      'Hypothetical status checks, not real identifiers or a complete exemption analysis. A change of employer requires checking authority for the new relationship.',
  },
]
