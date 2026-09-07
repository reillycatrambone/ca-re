import type { LearningFigureSpec } from '../types'

const sources = {
  rentNotice:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=827.',
  termination:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1946.1.',
  cureNotice:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=1161.',
  security:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5.',
  tdsExemption:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1102.2.',
  tdsDelivery:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1102.3.',
  nhd: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1103.2.',
  inspection:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=2079.',
  lead: 'https://www.epa.gov/lead/real-estate-disclosures-about-potential-lead-hazards',
  federalHousing:
    'https://uscode.house.gov/view.xhtml?edition=prelim&req=granuleid%3AUSC-prelim-title42-section3603',
  californiaHousing:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12927.',
  housingGuidance: 'https://calcivilrights.ca.gov/housing/',
  protectedIncome:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12955.',
  seniorHousing:
    'https://www.govinfo.gov/content/pkg/USCODE-2024-title42/pdf/USCODE-2024-title42-chap45-subchapI-sec3607.pdf',
  bulkDefinition:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=COM&sectionNum=6102.',
  bulkCoverage:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=COM&sectionNum=6103.',
  bulkNotice:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=COM&sectionNum=6105.',
  taxClearance: 'https://cdtfa.ca.gov/formspubs/pub74/',
  realEstateLaw: 'https://www.dre.ca.gov/Publications/RealEstateLaw.html',
}

export const practiceRuleFigures: LearningFigureSpec[] = [
  {
    id: 'exp-practice-rent-notice-arithmetic',
    lessonSlug: 'practice-property-management',
    afterSection: 'choose-the-notice-before-counting-days',
    title: 'The latest increase is not the whole increase',
    kind: 'document',
    objective:
      'Choose a rent-increase notice period using cumulative increases over twelve months.',
    sourceUrls: [sources.rentNotice],
    documentTitle: 'Fictional rent-change worksheet',
    context: 'Month-to-month rental; lawful cap exemption, no stricter rule, personal delivery.',
    fields: [
      {
        label: 'Earlier rent',
        value: '$2,000',
        annotation: 'Lowest rent charged within the preceding twelve months.',
      },
      {
        label: 'Current rent',
        value: '$2,100',
        annotation: 'An earlier $100 increase already occurred.',
      },
      {
        label: 'Proposed rent',
        value: '$2,250',
        annotation: 'Compare with $2,000, not only with $2,100.',
      },
      {
        label: 'Combined increase',
        value: '12.5%',
        annotation: '$250 / $2,000; more than the 10% notice threshold.',
      },
    ],
    conclusion: 'At least 90 days of notice, assuming no special recertification exception.',
    caption:
      'An original arithmetic worksheet, not a complete legal notice. Longer notice does not make a prohibited increase lawful.',
  },
  {
    id: 'exp-practice-cure-holiday-clock',
    lessonSlug: 'practice-property-management',
    afterSection: 'change-one-fact-the-notice-changes',
    title: 'Three cure days can span a long weekend',
    kind: 'timeline',
    objective:
      'Exclude weekends and judicial holidays when counting a curable three-day default notice.',
    sourceUrls: [sources.cureNotice],
    premise:
      'A valid pay-or-quit notice is personally served Friday. Monday is a judicial holiday.',
    events: [
      { label: 'Service', when: 'Friday', detail: 'Delivery day is not counted.' },
      {
        label: 'Excluded days',
        when: 'Saturday to Monday',
        detail: 'Weekend plus the stated judicial holiday.',
      },
      { label: 'First counted day', when: 'Tuesday', detail: 'Day 1 of the cure period.' },
      { label: 'Second counted day', when: 'Wednesday', detail: 'Day 2 of the cure period.' },
      {
        label: 'Third counted day',
        when: 'Thursday',
        detail: 'Day 3; evaluate payment or surrender by the deadline.',
      },
    ],
    conclusion: 'Do not use the ordinary calendar-day rule for this curable notice.',
    caption:
      'This example concerns CCP 1161(2), not every three-day notice. Service, grounds, content, and any additional protections must also be valid.',
  },
  {
    id: 'exp-practice-who-ends-tenancy',
    lessonSlug: 'practice-property-management',
    afterSection: 'habitability-entry-and-possession',
    title: 'Who gives notice changes the baseline',
    kind: 'decision',
    objective: 'Distinguish tenant and landlord periodic-tenancy termination periods.',
    sourceUrls: [sources.termination],
    question: 'Who is ending this otherwise lawfully terminable month-to-month tenancy?',
    branches: [
      {
        label: 'Landlord; sole resident for 8 months',
        detail: 'The resident has occupied for less than one year.',
        outcome: 'At least 30 days under the stated baseline.',
      },
      {
        label: 'Landlord; sole resident for 18 months',
        detail: 'No special sale exception or subsidy rule applies.',
        outcome: 'Ordinarily at least 60 days.',
      },
      {
        label: 'Tenant; resident for 18 months',
        detail: 'The tenant ends a monthly periodic tenancy.',
        outcome: "At least 30 days, not the landlord's 60-day baseline.",
      },
    ],
    caption:
      'Assume required grounds exist and no longer or special notice applies. A 30- or 60-day notice does not bypass just-cause restrictions.',
  },
  {
    id: 'exp-practice-deposit-disposition-ledger',
    lessonSlug: 'practice-property-management',
    afterSection: 'deductions-and-return',
    title: 'Account for every dollar of the deposit',
    kind: 'ledger',
    objective:
      'Reconcile supported deductions and the tenant refund to the original security deposit.',
    sourceUrls: [sources.security],
    account: 'Fictional tenant security disposition',
    openingBalance: 2400,
    entries: [
      { label: 'Apply to established unpaid rent', received: 0, paid: 200, balance: 2200 },
      { label: 'Supported cleaning deduction', received: 0, paid: 150, balance: 2050 },
      { label: 'Supported tenant-caused damage', received: 0, paid: 300, balance: 1750 },
      { label: 'Refund remaining security', received: 0, paid: 1750, balance: 0 },
    ],
    conclusion: '$650 of lawful deductions + $1,750 returned = $2,400 accounted for.',
    caption:
      'Assume each deduction is reasonable, documented, and permitted. The paid column records disposition of security, not necessarily contractor-payment dates; ordinary wear is excluded.',
  },
  {
    id: 'exp-practice-moveout-separate-clocks',
    lessonSlug: 'practice-property-management',
    afterSection: 'apply-the-deposit-exception-to-the-owner',
    title: 'Initial inspection and refund use different clocks',
    kind: 'timeline',
    objective:
      'Separate the requested initial-inspection window, its notice, and deposit accounting.',
    sourceUrls: [sources.security],
    premise:
      'Ordinary covered move-out; the tenant requests an initial inspection and no exception or notice waiver applies.',
    events: [
      {
        label: 'Arrange inspection',
        when: 'Before the appointment',
        detail: "Generally give at least 48 hours' written notice.",
      },
      {
        label: 'Initial inspection',
        when: 'Final two weeks of tenancy',
        detail: 'No earlier than two weeks before the tenancy ends.',
      },
      {
        label: 'Tenant vacates',
        when: 'Move-out',
        detail: 'Check final condition, including later damage.',
      },
      {
        label: 'Account and return',
        when: 'Ordinarily within 21 calendar days',
        detail: 'Return the balance with the required deduction accounting.',
      },
    ],
    conclusion:
      'The inspection appointment does not start or replace the post-vacancy refund clock.',
    caption:
      'The initial inspection permits correction of identified issues. Estimates, photographs, receipts, and follow-up accounting have additional statutory requirements.',
  },
  {
    id: 'exp-practice-trust-exemption-three-tests',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'is-this-actually-a-fiduciary-transfer',
    title: 'A trust name does not answer the TDS question',
    kind: 'decision',
    objective:
      'Apply former ownership and recent occupancy as alternative branches of the revocable-trust exception.',
    sourceUrls: [sources.tdsExemption],
    question:
      'Assume a natural-person trustee is selling during administration of a revocable trust.',
    branches: [
      {
        label: 'Trustee formerly owned the house',
        detail: 'Moved out five years ago.',
        outcome:
          'This fiduciary exemption is defeated; the ownership branch has no one-year limit.',
      },
      {
        label: 'Trustee never owned the house',
        detail: 'Occupied it six months ago.',
        outcome: 'This fiduciary exemption is defeated by occupancy within the preceding year.',
      },
      {
        label: 'Trustee never owned or occupied it',
        detail: 'A professional administers the trust.',
        outcome: 'These stated facts do not trigger the exception to the fiduciary exemption.',
      },
    ],
    caption:
      'The result concerns CIV 1102.2(d), not permission to conceal known material facts or an exemption from every other disclosure.',
  },
  {
    id: 'exp-practice-tds-packet-completeness',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'keep-separate-delivery-clocks-visible',
    title: 'An email timestamp is not a completed packet',
    kind: 'document',
    objective:
      'Recognize that an undelivered required listing-agent TDS section prevents the termination-period trigger.',
    sourceUrls: [sources.tdsDelivery],
    documentTitle: 'Fictional disclosure delivery register',
    context:
      'Covered sale after offer execution; represented seller; parties agreed to electronic delivery.',
    fields: [
      {
        label: 'TDS section I',
        value: 'Completed and delivered',
        annotation: 'Included in the first email.',
      },
      {
        label: 'TDS section II',
        value: 'Completed and delivered',
        annotation: "Seller's required section is present.",
      },
      {
        label: 'TDS section III',
        value: 'Missing',
        annotation: 'Required because the seller has an agent.',
      },
      {
        label: 'Electronic delivery',
        value: 'Agreed method',
        annotation: 'A permitted delivery method cannot cure an incomplete packet.',
      },
    ],
    conclusion: 'The required completed-section delivery trigger has not yet occurred.',
    caption:
      'Original delivery-register excerpt, not a reproduction of the TDS form. CIV 1102.3 specifies the required sections and permits qualifying agent-inspection disclosure information.',
  },
  {
    id: 'exp-practice-lead-waiver-boundary',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'federal-lead-and-sensitive-facts',
    title: 'Waiving testing does not waive known information',
    kind: 'comparison',
    objective: "Separate the buyer's lead-inspection opportunity from mandatory lead information.",
    sourceUrls: [sources.lead],
    columns: [
      {
        label: 'Known lead information',
        points: [
          'Disclose known paint hazards and available reports.',
          'Supply required warning language and pamphlet.',
        ],
      },
      {
        label: 'Inspection opportunity',
        points: [
          'Generally ten days for covered buyers.',
          'May be changed by agreement or waived in writing.',
        ],
      },
      {
        label: 'A signed inspection waiver',
        points: [
          'Does not erase the information duties.',
          'Does not establish that the property contains no lead.',
        ],
      },
    ],
    caption:
      'Assume covered pre-1978 housing. The disclosure rule does not itself generally require a seller to conduct lead testing.',
  },
  {
    id: 'exp-practice-nhd-parcel-mismatch',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'the-natural-hazard-disclosure',
    title: 'A hazard answer for the wrong parcel is not an answer',
    kind: 'document',
    objective: 'Identify a subject-parcel mismatch before relying on a third-party hazard report.',
    sourceUrls: [sources.nhd],
    documentTitle: 'Fictional parcel cross-check',
    context: 'Illustrative identifiers only; no real parcel or hazard designation is represented.',
    fields: [
      {
        label: 'Purchase-file parcel',
        value: 'Example parcel A',
        annotation: 'This is the property being evaluated.',
      },
      {
        label: 'Report parcel',
        value: 'Example parcel B',
        annotation: 'The report identifies a different property.',
      },
      {
        label: 'Report flood finding',
        value: 'Outside mapped area',
        annotation: 'The finding cannot establish the status of parcel A.',
      },
    ],
    conclusion: 'Obtain the correct parcel report before relying on its mapped-hazard finding.',
    caption:
      'Even a correct mapped-zone answer is not a guarantee against physical risk. A known report mismatch cannot be ignored because the document looks complete.',
  },
  {
    id: 'exp-practice-inspection-observation-log',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'distinguish-observation-diagnosis-and-assurance',
    title: 'Write the observation without inventing a diagnosis',
    kind: 'document',
    objective:
      'Distinguish a visible condition, an inspection limitation, and an unsupported technical conclusion.',
    sourceUrls: [sources.inspection],
    documentTitle: 'Fictional showing observation record',
    context:
      'Covered residential transaction; excerpts illustrate classification, not a complete inspection form.',
    fields: [
      {
        label: 'Visible condition',
        value: 'Brown ceiling stain near window',
        annotation: 'Observable condition and location.',
      },
      {
        label: 'Access limitation',
        value: 'Roof cavity not accessible',
        annotation: 'The unobserved area is not certified sound.',
      },
      {
        label: 'Proposed diagnosis',
        value: 'Definitely a failed roof',
        annotation: 'Not established by the visible stain alone.',
      },
      {
        label: 'Next investigation',
        value: 'Qualified roof assessment',
        annotation: 'Disclose the observation and resolve the cause through suitable expertise.',
      },
    ],
    conclusion:
      'Neither “definitely failed” nor “only cosmetic” follows from this observation alone.',
    caption:
      'A visual inspection is not destructive testing or engineering analysis. Existing material reports remain relevant even when an area cannot be inspected.',
  },
  {
    id: 'exp-practice-federal-california-housing-tests',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'federal-exemption-is-not-california-exemption',
    title: 'Three different small-owner tests',
    kind: 'comparison',
    objective:
      "Avoid importing a federal property-count exemption into California's household exception.",
    sourceUrls: [sources.federalHousing, sources.californiaHousing],
    columns: [
      {
        label: 'Federal small building',
        points: [
          'No more than four independently living families.',
          'Owner actually occupies one living quarter.',
        ],
      },
      {
        label: 'Federal single-family house',
        points: [
          'Private individual owns no more than three such houses.',
          'No brokerage services; additional statutory conditions apply.',
        ],
      },
      {
        label: 'California household',
        points: [
          'Owner-occupied single-family household.',
          'No more than one roomer or boarder within it.',
        ],
      },
    ],
    caption:
      'These tests do not remove all advertising or other civil-rights protections. The federal single-family path also has ownership-interest and certain nonresident-sale limits.',
  },
  {
    id: 'exp-practice-broker-involvement-exemption',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'same-owner-different-boundary',
    title: 'One hired service changes the federal house test',
    kind: 'document',
    objective:
      "Recognize that brokerage participation defeats the federal single-family exemption's no-broker condition.",
    sourceUrls: [sources.federalHousing],
    documentTitle: 'Fictional rental engagement summary',
    context:
      'Test only the federal single-family-house exemption; California law must be considered separately.',
    fields: [
      {
        label: 'Owner',
        value: 'Private individual',
        annotation: 'Do not assume an entity satisfies this condition.',
      },
      {
        label: 'House count',
        value: 'Three single-family houses',
        annotation: 'Assume all ownership interests have been counted correctly.',
      },
      {
        label: 'Rental services',
        value: 'Broker hired to market and lease',
        annotation: 'Fails the no-broker-services condition.',
      },
    ],
    conclusion: 'Meeting the house-count condition does not rescue the failed brokerage condition.',
    caption:
      'Original instructional excerpt. Do not automatically attach the single-family no-broker condition to every different federal exemption.',
  },
  {
    id: 'exp-practice-voucher-screening-worksheet',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'screening-with-subsidized-rent',
    title: "Apply the income multiplier to the tenant's share",
    kind: 'document',
    objective:
      "Calculate an assisted applicant's income comparison using the rent the tenant must pay.",
    sourceUrls: [sources.protectedIncome],
    documentTitle: 'Fictional assisted-rent screening worksheet',
    context:
      "Assume an otherwise lawful income standard of 2.5 times the tenant's rent obligation.",
    fields: [
      {
        label: 'Total monthly rent',
        value: '$3,200',
        annotation: 'Not the multiplier base for this assisted household.',
      },
      { label: 'Rental assistance', value: '$2,400', annotation: 'The subsidy pays this portion.' },
      { label: 'Tenant obligation', value: '$800', annotation: '$3,200 minus $2,400.' },
      { label: 'Income comparison', value: '$2,000', annotation: '$800 x 2.5, not $3,200 x 2.5.' },
    ],
    conclusion:
      "Using total rent would demand $8,000 and ignore the applicant's actual assigned burden.",
    caption:
      'This arithmetic does not endorse a universal multiplier or decide the application. Other screening, accommodation, and alternative-evidence duties remain separate.',
  },
  {
    id: 'exp-practice-accommodation-verification',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'compare-equal-service-with-identical-treatment',
    title: 'Ask only about the fact that is actually uncertain',
    kind: 'decision',
    objective:
      'Limit disability-accommodation verification to the disability-related facts that are not apparent.',
    sourceUrls: [sources.housingGuidance, sources.californiaHousing],
    question: 'Which part of the accommodation request needs clarification?',
    branches: [
      {
        label: 'Disability and connection are apparent',
        detail: 'The need for the requested access change is clear.',
        outcome: 'Do not demand additional medical records simply as a routine policy.',
      },
      {
        label: 'Disability is apparent; connection is unclear',
        detail: "The requested exception's disability-related purpose is uncertain.",
        outcome: 'Seek limited information about the connection, not a complete medical history.',
      },
      {
        label: 'Disability and connection are not apparent',
        detail: 'Both relevant facts require appropriate verification.',
        outcome: 'Request necessary supporting information and evaluate the request promptly.',
      },
    ],
    caption:
      'A request need not use legal terminology. Verification, reasonableness, and possible effective alternatives are separate questions; this is not automatic approval of every request.',
  },
  {
    id: 'exp-practice-senior-occupancy-denominator',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'families-and-limited-exemptions',
    title: 'The 80% test uses occupied units',
    kind: 'document',
    objective:
      'Use occupied units rather than total units when applying the federal 55-and-older occupancy threshold.',
    sourceUrls: [sources.seniorHousing],
    documentTitle: 'Fictional age-occupancy audit',
    context:
      'Established community; assume 100 units count as occupied, twenty count as unoccupied, and no special occupancy exclusions apply.',
    fields: [
      {
        label: 'Total units',
        value: '120',
        annotation: 'Includes twenty units assumed unoccupied under the applicable rules.',
      },
      { label: 'Occupied units', value: '100', annotation: 'The occupancy-test denominator.' },
      {
        label: 'Age-qualified occupied units',
        value: '78',
        annotation: 'Each has at least one resident aged 55 or older.',
      },
      {
        label: 'Required occupied units',
        value: '80',
        annotation: '80% of 100; the illustrated 78% falls short.',
      },
    ],
    conclusion: 'A senior-community sign does not cure this failed occupancy element.',
    caption:
      'Policies and age verification are additional requirements. Temporary vacancies and special exclusions need separate classification; California senior-housing rules also remain relevant.',
  },
  {
    id: 'exp-practice-bulk-sale-activity-test',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'when-an-asset-sale-is-a-bulk-sale',
    title: 'A high sales total is not the bulk-sale test',
    kind: 'decision',
    objective:
      'Distinguish an extraordinary asset transfer from ordinary inventory sales and a transfer below the quantity threshold.',
    sourceUrls: [sources.bulkDefinition, sources.bulkCoverage],
    question:
      'Assume the seller satisfies the business and location tests, with no statutory exclusion.',
    branches: [
      {
        label: 'Cafe closes; sells 80% of inventory and equipment',
        detail: 'Outside ordinary operations; measured by value.',
        outcome: 'Fits the stated bulk-sale quantity and activity tests.',
      },
      {
        label: 'Store sells most stock to ordinary customers',
        detail: 'Transactions remain in the ordinary course of business.',
        outcome: 'The high volume alone does not make a bulk sale.',
      },
      {
        label: 'Business sells only 45% of inventory and equipment',
        detail: 'Assume no other transfer changes the stated transaction.',
        outcome: 'Does not exceed the more-than-half quantity threshold.',
      },
    ],
    caption:
      'Apply definitions and exclusions before choosing the notice procedure. Asset value, not item count, controls the illustrated quantity comparison.',
  },
  {
    id: 'exp-practice-bulk-sale-trigger-timeline',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'notice-is-not-a-lien-release',
    title: 'The statutory sale date can come after the signatures',
    kind: 'timeline',
    objective:
      'Identify the later-of payment and asset-transfer trigger for an ordinary statutory bulk-sale date.',
    sourceUrls: [sources.bulkDefinition, sources.bulkNotice],
    premise:
      'Covered nonauction, nonliquidator sale. Treat payment and transfer as effective under section 6102; required advance notices have been completed.',
    events: [
      {
        label: 'Agreement signed',
        when: 'Event A',
        detail: 'No qualifying payment or asset transfer yet.',
      },
      {
        label: 'Assets transferred',
        when: 'Event B, after A',
        detail: 'Buyer receives more than 10% of asset value.',
      },
      {
        label: 'Seller paid',
        when: 'Event C, after B',
        detail: 'Seller receives more than 10% of the net contract price.',
      },
      {
        label: 'Identify the sale date',
        when: 'Event C',
        detail: 'The later of the two qualifying events.',
      },
    ],
    conclusion:
      'Measure the required twelve-business-day notice lead time against the statutory date, not automatically against signing.',
    caption:
      'Escrow deposits and unconditional rights have specific statutory treatment. This timeline assumes those legal classifications rather than treating every deposit as immediate seller payment.',
  },
  {
    id: 'exp-practice-bulk-creditor-notice-register',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'separate-the-business-from-the-premises',
    title: 'One filing is not all three notice channels',
    kind: 'document',
    objective:
      'Distinguish recording, publication, and tax-collector delivery in bulk-sale notice compliance.',
    sourceUrls: [sources.bulkNotice],
    documentTitle: 'Fictional escrow notice register',
    context:
      'Ordinary sale governed by section 6105; assume one applicable county and public-notice district.',
    fields: [
      {
        label: 'County recorder',
        value: 'Recorded',
        annotation:
          'Check completion at least twelve business days before the statutory sale date.',
      },
      {
        label: 'Newspaper publication',
        value: 'Not completed',
        annotation: 'Recording does not substitute for required publication.',
      },
      {
        label: 'County tax collector',
        value: 'Delivery documented',
        annotation: 'A separate notice destination, not a tax-clearance certificate.',
      },
      {
        label: 'Transfer readiness',
        value: 'Not established',
        annotation: 'The missing publication and its required lead time still matter.',
      },
    ],
    conclusion:
      'Complete every applicable notice channel and verify timing before treating the notice duty as satisfied.',
    caption:
      'An original tracking excerpt, not a statutory notice form. Actual notices need required contents, applicable counties or districts, and any additional claim information.',
  },
  {
    id: 'exp-practice-business-tax-holdback-ledger',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'protect-the-buyer-from-a-different-tax-problem',
    title: 'The tax holdback is not seller proceeds',
    kind: 'ledger',
    objective:
      'Keep a required seller-tax holdback distinct from secured payoff and distributable sale proceeds.',
    sourceUrls: [sources.taxClearance],
    account: 'Fictional business-purchase funds',
    openingBalance: 0,
    entries: [
      { label: 'Buyer funds the $180,000 price', received: 180000, paid: 0, balance: 180000 },
      { label: 'Authorized secured-equipment payoff', received: 0, paid: 30000, balance: 150000 },
      { label: 'Authorized seller distribution', received: 0, paid: 136000, balance: 14000 },
      {
        label: 'Pay established tax liability as authorized',
        received: 0,
        paid: 14000,
        balance: 0,
      },
    ],
    conclusion:
      'The $14,000 remains reserved until the covered tax obligation is properly addressed.',
    caption:
      'Assume the withholding rule applies, the $14,000 liability is established, no fees or other claims exist, and all disbursements are authorized. Creditor notice alone would not clear the tax exposure.',
  },
  {
    id: 'exp-practice-estoppel-income-conflict',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'confirm-the-tenants-side-of-the-agreement',
    title: 'Three documents, one unresolved rent credit',
    kind: 'document',
    objective:
      'Recognize that a tenant-confirmed credit can contradict the income assumed from a rent roll and lease.',
    sourceUrls: [sources.realEstateLaw],
    documentTitle: 'Fictional lease-file comparison',
    context: "The buyer has not yet resolved the documents' inconsistency.",
    fields: [
      {
        label: 'Seller rent roll',
        value: '$5,000 monthly',
        annotation: 'Scheduled rent is not proof of net collections.',
      },
      {
        label: 'Signed lease',
        value: '$5,000 monthly',
        annotation: 'Check amendments and later obligations too.',
      },
      {
        label: 'Tenant estoppel',
        value: '$500 continuing monthly credit',
        annotation: 'Tenant attributes the credit to unfinished landlord work.',
      },
      {
        label: 'Income difference',
        value: '$6,000 over twelve months',
        annotation: 'Illustrative exposure if the credit continues for that entire period.',
      },
    ],
    conclusion:
      'Resolve the credit, work obligation, and payment history before relying on $60,000 annual collections.',
    caption:
      'Original fictional excerpts, not a proprietary estoppel form. The certificate raises evidence to reconcile; it does not automatically establish every disputed fact.',
  },
]
