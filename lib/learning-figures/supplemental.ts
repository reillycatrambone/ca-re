import { type LearningFigureSpec } from './types'

export const supplementalFigures: LearningFigureSpec[] = [
  {
    id: 'supplement-divided-property-rights',
    lessonSlug: 'ownership-property-rights',
    afterSection: 'begin-with-the-rights-being-transferred',
    title: 'One property can support several different rights',
    kind: 'relationship',
    center: {
      label: 'One rented property',
      detail: 'Assume an owner leases a house that is also subject to a utility easement.',
    },
    nodes: [
      {
        label: 'Owner',
        connection: 'retained ownership',
        detail: 'Keeps the ownership interest even while the tenant holds possession.',
      },
      {
        label: 'Tenant',
        connection: 'leasehold possession',
        detail: 'Receives the leasehold rights for the agreed term, not the fee title.',
      },
      {
        label: 'Utility',
        connection: 'limited use right',
        detail: 'Uses the property only within the scope of its easement.',
      },
    ],
    caption:
      'Physical entry does not establish the same legal interest. Identify the right, its holder, and its limits before deciding what a sale transfers.',
  },
  {
    id: 'supplement-undivided-shares',
    lessonSlug: 'ownership-estates-title',
    afterSection: 'one-owner-or-concurrent-owners',
    title: 'Undivided shares allocate interests, not separate lots',
    kind: 'allocation',
    total: 900000,
    segments: [
      { label: 'Owner A: 50%', amount: 450000, detail: '$450,000 of gross sale proceeds' },
      { label: 'Owner B: 30%', amount: 270000, detail: '$270,000 of gross sale proceeds' },
      { label: 'Owner C: 20%', amount: 180000, detail: '$180,000 of gross sale proceeds' },
    ],
    caption:
      'Assume tenants in common sell the whole parcel for $900,000. These are gross shares before debts, expenses, and adjustments, not physical parcel boundaries or appraisals of separately sold minority interests.',
  },
  {
    id: 'supplement-easement-relationships',
    lessonSlug: 'ownership-encumbrances',
    afterSection: 'appurtenant-easements-and-easements-in-gross',
    title: 'An appurtenant easement connects two parcels',
    kind: 'relationship',
    center: {
      label: 'Access easement',
      detail: 'A limited right to cross one parcel for the benefit of another.',
    },
    nodes: [
      {
        label: 'Dominant parcel',
        connection: 'benefiting land',
        detail: 'The land receiving the benefit, such as access to a public road.',
      },
      {
        label: 'Servient parcel',
        connection: 'burdened land',
        detail: 'The land crossed by the route; its owner does not lose the entire fee interest.',
      },
      {
        label: 'Creating instrument',
        connection: 'scope and conditions',
        detail: 'For an express grant, read the route, width, purpose, and conditions.',
      },
    ],
    caption:
      'The benefiting land is dominant; the burdened land is servient. An access right does not automatically authorize parking, storage, or a more intensive use.',
  },
  {
    id: 'supplement-boundary-traverse',
    lessonSlug: 'ownership-legal-descriptions',
    afterSection: 'metes-and-bounds',
    title: 'Trace a perimeter back to its point of beginning',
    kind: 'process',
    steps: [
      {
        label: 'Identify the beginning',
        detail: 'Tie the starting point to the specified survey monument.',
      },
      {
        label: 'East, then south',
        detail: 'In this imaginary rectangle, travel east 200 feet, then south 150 feet.',
      },
      {
        label: 'West, then north',
        detail: 'Travel west 200 feet, then north 150 feet to close the perimeter.',
      },
      {
        label: 'Check the evidence',
        detail: 'Use the controlling description and survey evidence, not an assumed fence line.',
      },
    ],
    caption:
      'Metes and bounds describes a traceable perimeter. Directions and distances alone do not locate this rectangle unless its starting reference is identifiable.',
  },
  {
    id: 'supplement-government-powers',
    lessonSlug: 'ownership-land-use-controls',
    afterSection: 'four-government-powers',
    title: 'Identify what the government is doing',
    kind: 'relationship',
    center: {
      label: 'Government power',
      detail: 'The action and its purpose distinguish four commonly tested powers.',
    },
    nodes: [
      {
        label: 'Police power',
        connection: 'public regulation',
        detail: 'Zoning and safety codes regulate use for public health, safety, and welfare.',
      },
      {
        label: 'Eminent domain',
        connection: 'public acquisition',
        detail: 'Acquires private property for public use, subject to constitutional requirements.',
      },
      {
        label: 'Taxation',
        connection: 'public revenue',
        detail: 'Property taxes and authorized assessments fund public functions or improvements.',
      },
      {
        label: 'Escheat',
        connection: 'state succession',
        detail: 'Can transfer property to the state when no legally entitled successor exists.',
      },
    ],
    caption:
      'Requiring repair of unsafe wiring is regulation, not automatically a compensated acquisition. Dying without a will is not automatically escheat.',
  },
  {
    id: 'supplement-water-entitlements',
    lessonSlug: 'ownership-water-environment',
    afterSection: 'surface-water-and-groundwater',
    title: 'Locate the legal basis of the claimed water right',
    kind: 'relationship',
    center: {
      label: 'Water entitlement',
      detail: 'A source of water and a right to use that water are different facts.',
    },
    nodes: [
      {
        label: 'Riparian',
        connection: 'riparian land',
        detail: 'Associated with qualifying land along a natural watercourse and use on that land.',
      },
      {
        label: 'Appropriative',
        connection: 'lawful diversion',
        detail: 'Based on lawful appropriation, not merely ownership beside the source.',
      },
      {
        label: 'Overlying',
        connection: 'overlying land',
        detail: 'Concerns groundwater use on overlying land, with regard to other owners.',
      },
    ],
    caption:
      'Each category remains subject to applicable limits. A working well proves neither unlimited pumping authority nor a guaranteed drought-year supply.',
  },
  {
    id: 'supplement-brokerage-role-map',
    lessonSlug: 'agency-relationships',
    afterSection: 'start-with-who-represents-whom',
    title: 'Follow the brokerage relationship, not the conversation',
    kind: 'relationship',
    center: {
      label: 'Seller brokerage',
      detail: 'Assume the brokerage represents only the seller in this transaction.',
    },
    nodes: [
      {
        label: 'Seller',
        connection: 'represented client',
        detail: 'The principal receives fiduciary representation under the agency.',
      },
      {
        label: 'Affiliated salesperson',
        connection: 'licensed affiliate',
        detail: 'Performs licensed work through the responsible broker.',
      },
      {
        label: 'Unrepresented buyer',
        connection: 'nonclient duties',
        detail:
          'A third party still receives required honesty and disclosure, not seller-side loyalty.',
      },
    ],
    caption:
      'Answering a buyer question or opening a door does not by itself identify a buyer-agency relationship. Determine whom the brokerage undertook to represent.',
  },
  {
    id: 'supplement-competent-verification',
    lessonSlug: 'agency-fiduciary-duties',
    afterSection: 'care-competence-and-verification',
    title: 'Turn an observation into a supported response',
    kind: 'process',
    steps: [
      {
        label: 'Name the evidence',
        detail: 'Separate what you observed from what a seller reported or a document states.',
      },
      {
        label: 'Identify the limit',
        detail: 'A visual observation is not an engineering diagnosis or a guarantee.',
      },
      {
        label: 'Address the uncertainty',
        detail:
          'Disclose material information and direct necessary verification to qualified sources.',
      },
    ],
    caption:
      'An inaccessible attic can limit a visual inspection without erasing knowledge of a report describing damage there. Inspecting and disclosing known information are separate duties.',
  },
  {
    id: 'supplement-self-interest-map',
    lessonSlug: 'agency-disclosure-and-conflicts',
    afterSection: 'an-agent-acting-as-principal',
    title: 'A personal interest can sit behind different arrangements',
    kind: 'relationship',
    center: {
      label: "Agent's economic interest",
      detail: 'Trace who benefits, even when the agent is not named as the buyer.',
    },
    nodes: [
      {
        label: 'Direct purchase',
        connection: 'direct ownership',
        detail: 'The agent acquires all or part of the property being marketed for the client.',
      },
      {
        label: 'Controlled LLC',
        connection: 'indirect ownership',
        detail: 'An entity name does not remove a material ownership conflict.',
      },
      {
        label: 'Resale profit share',
        connection: 'profit participation',
        detail: 'A promised share of resale profit can create an interest requiring disclosure.',
      },
    ],
    caption:
      'Disclosing a license number or obtaining a fair price does not necessarily disclose the material nature of self-dealing.',
  },
  {
    id: 'supplement-termination-separations',
    lessonSlug: 'agency-compensation-and-termination',
    afterSection: 'how-an-agency-ends',
    title: 'Ending authority does not end every obligation',
    kind: 'comparison',
    columns: [
      {
        label: 'Agency authority',
        points: [
          'Ordinary authority can end through revocation, expiration, or another valid event.',
          'The broker must stop taking new unauthorized actions.',
        ],
      },
      {
        label: 'Compensation claim',
        points: [
          'An earned fee or a claim for breach may remain.',
          'Power to revoke is not the same as a right to revoke without consequences.',
        ],
      },
      {
        label: 'Purchase contract',
        points: [
          'The seller and buyer have their own performance obligations.',
          'Canceling the listing does not itself cancel their accepted sale agreement.',
        ],
      },
    ],
    caption:
      'Identify which relationship ended. Listing cancellation, escrow cancellation, and release from a purchase agreement are not interchangeable acts.',
  },
  {
    id: 'supplement-value-ingredients',
    lessonSlug: 'valuation-value-principles',
    afterSection: 'conditions-supporting-value',
    title: 'Four conditions support economic value',
    kind: 'relationship',
    center: {
      label: 'Value conditions',
      detail: 'DUST identifies related conditions, not four amounts to add together.',
    },
    nodes: [
      {
        label: 'Demand',
        connection: 'purchasing power',
        detail: 'Desire must be supported by the ability to buy.',
      },
      {
        label: 'Utility',
        connection: 'benefit to user',
        detail: 'The property must provide a useful benefit to the relevant market.',
      },
      {
        label: 'Scarcity',
        connection: 'relative supply',
        detail: 'Available competing supply matters relative to demand.',
      },
      {
        label: 'Transferability',
        connection: 'conveyable rights',
        detail: 'The relevant property rights must be capable of transfer.',
      },
    ],
    caption:
      'A beautiful site can have limited utility for a proposed use if access or legal permission is missing. Desirability alone is not the complete value analysis.',
  },
  {
    id: 'supplement-net-gross-adjustments',
    lessonSlug: 'valuation-sales-comparison',
    afterSection: 'deriving-and-evaluating-adjustments',
    title: 'Offsetting adjustments can hide a large comparison gap',
    kind: 'comparison',
    columns: [
      {
        label: 'Net adjustment: $2,000',
        points: [
          'Add signed adjustments: +$40,000 - $38,000.',
          'Shows the final direction and change to the sale price.',
        ],
      },
      {
        label: 'Gross adjustment: $78,000',
        points: [
          'Add absolute amounts: $40,000 + $38,000.',
          'Shows how much total adjustment the comparison required.',
        ],
      },
    ],
    caption:
      'A small net adjustment does not prove that two properties are closely comparable. Assess relevance and supporting evidence, not a single total.',
  },
  {
    id: 'supplement-depreciation-causes',
    lessonSlug: 'valuation-cost-approach',
    afterSection: 'three-categories-of-depreciation',
    title: 'The cause of the loss determines its category',
    kind: 'relationship',
    center: {
      label: 'Loss in property value',
      detail: 'Identify the source before deciding whether correction is economically justified.',
    },
    nodes: [
      {
        label: 'Physical deterioration',
        connection: 'physical condition',
        detail: 'A worn roof or broken furnace loses value through damage, wear, or aging.',
      },
      {
        label: 'Functional obsolescence',
        connection: 'internal utility',
        detail: 'An awkward floor plan can be physically sound but poorly suited to buyer needs.',
      },
      {
        label: 'External obsolescence',
        connection: 'external influence',
        detail:
          'Persistent noise or a lost employment center can reduce value from outside the parcel.',
      },
    ],
    caption:
      'A new building can be functionally obsolete. Curability is a separate cost-versus-benefit question, and the same loss should not be counted twice.',
  },
  {
    id: 'supplement-operating-income-bridge',
    lessonSlug: 'valuation-income-analysis',
    afterSection: 'worked-operating-statement',
    title: 'Stop at NOI before subtracting financing costs',
    kind: 'calculation',
    rows: [
      { label: 'Potential annual rent', amount: 144000 },
      { label: '5% vacancy and collection allowance', amount: -7200 },
      { label: 'Other annual income', amount: 3200 },
      { label: 'Operating expenses, including property taxes', amount: -50000 },
    ],
    result: {
      label: 'Annual net operating income',
      amount: 90000,
      detail: 'Effective gross income is $140,000 before operating expenses.',
    },
    caption:
      'Under this market-investment convention, $60,000 of annual debt service would reduce before-tax cash flow to $30,000, not reduce the $90,000 NOI. Assume no additional outlays or adjustments.',
  },
  {
    id: 'supplement-payment-allocation',
    lessonSlug: 'financing-loan-fundamentals',
    afterSection: 'follow-two-amortizing-payments',
    title: 'Only the principal portion reduces the loan balance',
    kind: 'allocation',
    total: 1300,
    segments: [
      {
        label: 'First-month interest',
        amount: 1000,
        detail: '$200,000 x 6% / 12 under the monthly-rate convention',
      },
      {
        label: 'Principal reduction',
        amount: 300,
        detail: '$1,300 payment - $1,000 interest = $300',
      },
    ],
    caption:
      'The new balance is $199,700. At the same rate, next-month interest is $998.50, leaving $301.50 of the unchanged payment for principal. Taxes and insurance are excluded.',
  },
  {
    id: 'supplement-arm-adjustment-order',
    lessonSlug: 'financing-loan-types-programs',
    afterSection: 'read-an-arm-adjustment-in-order',
    title: 'An indexed rate is not automatically the next rate',
    kind: 'process',
    steps: [
      {
        label: 'Find the indexed rate',
        detail: 'A 4.5% index plus a 2% margin gives 6.5%.',
      },
      {
        label: 'Apply the periodic cap',
        detail: 'A current 4% rate with a one-percentage-point adjustment cap can rise only to 5%.',
      },
      {
        label: 'Check the remaining terms',
        detail: 'Apply any further ceiling, then use the balance, term, and payment rules.',
      },
    ],
    caption:
      "Assume no other provision changes this adjustment. A rate cap, a payment cap, and the borrower's plan to refinance are three different things.",
  },
  {
    id: 'supplement-trust-deed-roles',
    lessonSlug: 'financing-notes-security',
    afterSection: 'mortgage-and-deed-of-trust-parties',
    title: 'A deed of trust assigns three distinct roles',
    kind: 'relationship',
    center: {
      label: 'Deed of trust',
      detail:
        'The security instrument supports the obligation; it is not the repayment promise itself.',
    },
    nodes: [
      {
        label: 'Trustor',
        connection: 'security grantor',
        detail: 'The property owner grants the security interest.',
      },
      {
        label: 'Beneficiary',
        connection: 'secured beneficiary',
        detail: 'The lender or other secured beneficiary receives the protection of the security.',
      },
      {
        label: 'Trustee',
        connection: 'limited trustee role',
        detail: 'Has limited reconveyance and enforcement functions under the instrument and law.',
      },
    ],
    caption:
      'The trustee is not the ordinary owner entitled to occupy the home. Read the note for the promise and the deed of trust for the security relationship.',
  },
  {
    id: 'supplement-credit-law-questions',
    lessonSlug: 'financing-credit-law-originators',
    afterSection: 'tila-rate-disclosure-is-not-rate-setting',
    title: 'Separate disclosure, rate limits, and repayment review',
    kind: 'comparison',
    columns: [
      {
        label: 'Credit disclosure',
        points: [
          'TILA requires specified cost disclosures for covered credit.',
          'Note rate, APR, payment, and total costs are not interchangeable.',
        ],
      },
      {
        label: 'Usury analysis',
        points: [
          'Interest limits and exemptions require their own classification.',
          'An exemption does not erase other consumer-protection duties.',
        ],
      },
      {
        label: 'Ability to repay',
        points: [
          'Covered transactions require a reasonable, good-faith repayment evaluation.',
          'Qualified-mortgage treatment is not a guarantee against borrower default.',
        ],
      },
    ],
    caption:
      'A required APR disclosure does not establish one lawful interest rate for every loan. Identify which legal question the facts actually present.',
  },
  {
    id: 'supplement-deed-functions',
    lessonSlug: 'transfer-deeds-and-vesting',
    afterSection: 'compare-the-deeds',
    title: 'Similar document names do different legal work',
    kind: 'comparison',
    columns: [
      {
        label: 'Grant deed',
        points: [
          'Conveys the described interest.',
          'Ordinarily carries limited implied covenants, not a universal title warranty.',
        ],
      },
      {
        label: 'Quitclaim deed',
        points: [
          'Transfers whatever present interest the grantor has.',
          "Does not carry the grant deed's implied covenants.",
        ],
      },
      {
        label: 'Reconveyance',
        points: [
          'Releases deed-of-trust security after the obligation is satisfied.',
          "Is not the seller's ordinary ownership transfer to a buyer.",
        ],
      },
    ],
    caption:
      'A quitclaim is not inherently invalid. A deed label alone does not supply missing present ownership. Qualifying fee-simple grants can pass later-acquired title under Civil Code section 1106; that is a separate question.',
  },
  {
    id: 'supplement-escrow-custody-map',
    lessonSlug: 'transfer-title-and-escrow',
    afterSection: 'escrow-is-conditional-custody',
    title: 'Escrow possession is conditional, not permission to release',
    kind: 'relationship',
    center: {
      label: 'Conditional escrow',
      detail: 'A neutral holder safeguards deliveries until authorized closing conditions are met.',
    },
    nodes: [
      {
        label: 'Buyer funds',
        connection: 'conditional custody',
        detail: 'A deposit does not become unrestricted seller money simply because it arrived.',
      },
      {
        label: 'Seller deed',
        connection: 'conditional custody',
        detail:
          'Possession of the signed document does not itself satisfy every closing requirement.',
      },
      {
        label: 'Authorized instructions',
        connection: 'release conditions',
        detail:
          'Required conditions and properly approved changes govern delivery and disbursement.',
      },
    ],
    caption:
      "Funds and a deed can both be present while a required lien release is missing. One party's request does not ordinarily authorize ignoring the other party's closing condition.",
  },
  {
    id: 'supplement-proration-direction',
    lessonSlug: 'transfer-taxes-and-prorations',
    afterSection: 'transfer-tax-and-prorations',
    title: 'Payment status determines the proration direction',
    kind: 'decision',
    question: 'Who has already paid or received the amount allocated to the other party?',
    branches: [
      {
        label: 'Seller prepaid buyer expense',
        detail: "The seller advanced a charge allocated to the buyer's period.",
        outcome: 'Debit buyer; credit seller.',
      },
      {
        label: 'Buyer will pay seller expense',
        detail: "The seller's allocated share is unpaid and will be paid by the buyer.",
        outcome: 'Debit seller; credit buyer.',
      },
      {
        label: 'Seller collected buyer rent',
        detail: "The seller already received rent allocated to the buyer's period.",
        outcome: 'Debit seller; credit buyer.',
      },
    ],
    caption:
      'Use the stated day count and closing-day allocation. Income already collected and expenses already advanced can produce opposite entries for the same ownership period.',
  },
  {
    id: 'supplement-probate-overbid',
    lessonSlug: 'transfer-special-transfers',
    afterSection: 'worked-overbid',
    title: 'Build the first overbid from the accepted offer',
    kind: 'calculation',
    rows: [
      { label: 'Accepted offer subject to the stated first-overbid rule', amount: 550000 },
      { label: '10% of the first $10,000', amount: 1000 },
      { label: '5% of the remaining $540,000', amount: 27000 },
    ],
    result: {
      label: 'Calculated first-overbid minimum',
      amount: 578000,
      detail: '$550,000 accepted offer + $28,000 combined increments.',
    },
    caption:
      'Assume this court-confirmed sale uses the stated statutory formula. The accepted offer, not the appraisal, supplies this base; bidder eligibility and court requirements remain separate.',
  },
  {
    id: 'supplement-assistant-task-boundary',
    lessonSlug: 'practice-licensing-supervision',
    afterSection: 'assistants-can-support-but-cannot-replace-licensees',
    title: "The caller's question can change who must respond",
    kind: 'decision',
    question: 'Is the request administrative, or does it require licensed judgment?',
    branches: [
      {
        label: 'When will the report arrive?',
        detail: 'The caller needs delivery status, not advice about the transaction.',
        outcome: 'An assistant may obtain and communicate permitted status information.',
      },
      {
        label: 'Should I cancel over the report?',
        detail: 'The caller needs interpretation or advice about contractual consequences.',
        outcome: 'Refer the question to the responsible licensee.',
      },
    ],
    caption:
      "A broker's presence does not license an assistant to negotiate or interpret agreements. Classify the actual task, not the employee's title or communication channel.",
  },
  {
    id: 'supplement-trust-reconciliation',
    lessonSlug: 'practice-trust-funds',
    afterSection: 'three-records-should-tell-one-story',
    title: 'Three records must describe the same trust balance',
    kind: 'relationship',
    center: {
      label: 'Three-way reconciliation',
      detail: 'Agreement must rest on valid transactions and accurate ownership records.',
    },
    nodes: [
      {
        label: 'Adjusted bank balance',
        connection: 'depository evidence',
        detail: 'Reconcile deposits in transit and outstanding checks with the bank statement.',
      },
      {
        label: 'Control-record balance',
        connection: 'account activity',
        detail: 'The chronological record accounts for all receipts and disbursements.',
      },
      {
        label: 'Beneficiary balances',
        connection: 'ownership detail',
        detail: 'Separate records identify whose money makes up the total.',
      },
    ],
    caption:
      "A positive account total cannot cure one beneficiary's shortage. Do not offset one owner's negative balance against money belonging to another.",
  },
  {
    id: 'supplement-discrimination-patterns',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'treat-choices-as-the-consumers-choices',
    title: 'Recognize the conduct, not just the discriminatory motive',
    kind: 'comparison',
    columns: [
      {
        label: 'Steering',
        points: [
          'Directs housing choices toward or away from areas because of protected traits.',
          "Substitutes the agent's demographic assumptions for the consumer's criteria.",
        ],
      },
      {
        label: 'Blockbusting',
        points: [
          'Uses fear of demographic change to induce owners to sell or rent for profit.',
          "Targets the owner's decision through discriminatory pressure.",
        ],
      },
      {
        label: 'Redlining',
        points: [
          'Restricts credit, insurance, or related services on a prohibited demographic basis.',
          'Is not a substitute for legitimate, nondiscriminatory risk analysis.',
        ],
      },
    ],
    caption:
      'Steering directs choices, blockbusting pressures owners, and redlining restricts services or capital. A client instruction does not excuse participation.',
  },
  {
    id: 'supplement-advertising-source-trail',
    lessonSlug: 'practice-ethics-advertising-technology',
    afterSection: 'audit-a-representation-before-publication',
    title: 'A material advertising claim needs a source trail',
    kind: 'process',
    steps: [
      {
        label: 'Classify the statement',
        detail: 'A permitted-bedroom claim is a factual assertion, not merely sales enthusiasm.',
      },
      {
        label: 'Test the source',
        detail:
          'Match supporting records to the property and investigate conflicting measurements.',
      },
      {
        label: 'Correct every affected channel',
        detail:
          'Address relevant websites, syndicated advertisements, materials, and prior communications.',
      },
    ],
    caption:
      'Attributing a statement to the seller does not justify repeating an obvious inconsistency. Correcting one live webpage may leave other consumers with the original error.',
  },
  {
    id: 'supplement-management-duty-map',
    lessonSlug: 'practice-property-management',
    afterSection: 'the-manager-represents-the-owner-within-limits',
    title: 'Management authority has more than one boundary',
    kind: 'relationship',
    center: {
      label: 'Property manager',
      detail: 'Coordinates authorized operations while respecting separate duties and oversight.',
    },
    nodes: [
      {
        label: 'Owner',
        connection: 'represented client',
        detail:
          'The management agreement sets service scope, spending limits, and reporting duties.',
      },
      {
        label: 'Responsible broker',
        connection: 'licensed oversight',
        detail: 'A salesperson performing licensed management work acts through the broker.',
      },
      {
        label: 'Tenants',
        connection: 'tenant protections',
        detail:
          'Owner loyalty does not authorize ignoring dangerous conditions or tenant protections.',
      },
    ],
    caption:
      'Authority to approve a small repair does not necessarily authorize a major renovation. An owner instruction cannot expand authority beyond applicable law.',
  },
  {
    id: 'supplement-rent-concession',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'convert-lease-terms-into-comparable-income',
    title: 'Face rent can conceal a concession',
    kind: 'calculation',
    rows: [
      { label: '$4,000 monthly base rent x 36 months', amount: 144000 },
      { label: 'Three months of free base rent', amount: -12000 },
    ],
    result: {
      label: 'Base rent collected over the term',
      amount: 132000,
      detail: 'Simple monthly average: $132,000 / 36 = about $3,667.',
    },
    caption:
      'Ignore increases, expenses, and time value for this example. The average exposes the concession but is not a complete lease valuation; improvement allowances and other commitments also matter.',
  },
  {
    id: 'supplement-disclosure-claim-boundaries',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'build-a-disclosure-decision-from-the-facts',
    title: 'Three statements that do not erase known facts',
    kind: 'decision',
    question: "What does the seller's statement actually establish?",
    branches: [
      {
        label: 'I never occupied the house',
        detail: 'Nonoccupancy may limit firsthand knowledge.',
        outcome: 'It does not by itself establish a statutory form exemption.',
      },
      {
        label: 'A form exemption applies',
        detail: 'A verified exemption concerns the particular form or statutory requirement.',
        outcome: 'Identify remaining duties and address known material information.',
      },
      {
        label: 'The sale is as-is',
        detail: 'The agreed repair obligation is a different question from accurate information.',
        outcome: 'Do not conceal a known report merely because the seller will not repair.',
      },
    ],
    caption:
      'A buyer accepting a disclosed condition differs from a buyer accepting a condition because its evidence was concealed. Classify the claimed exception before applying it.',
  },
  {
    id: 'supplement-contract-essentials',
    lessonSlug: 'contracts-formation',
    afterSection: 'the-four-essentials',
    title: 'A signature does not replace the four essentials',
    kind: 'relationship',
    center: {
      label: 'Contract formation',
      detail: 'Test each essential against the actual parties and bargain.',
    },
    nodes: [
      {
        label: 'Capable parties',
        connection: 'legal ability',
        detail: 'Check capacity and the authority of anyone signing for another person or entity.',
      },
      {
        label: 'Mutual consent',
        connection: 'shared agreement',
        detail:
          'The parties must agree to sufficiently definite terms with legally meaningful consent.',
      },
      {
        label: 'Lawful object',
        connection: 'permitted purpose',
        detail: 'A signed agreement does not make an unlawful promised activity lawful.',
      },
      {
        label: 'Consideration',
        connection: 'bargained exchange',
        detail:
          'A legal benefit or detriment can consist of exchanged promises, not necessarily cash.',
      },
    ],
    caption:
      'An earnest-money deposit is not the only possible consideration. Formation, a required writing, and later performance remain separate questions.',
  },
  {
    id: 'supplement-remedy-objectives',
    lessonSlug: 'contracts-performance-and-remedies',
    afterSection: 'damages-and-specific-performance',
    title: 'Choose the remedy by the result being sought',
    kind: 'decision',
    question: 'What does the claimant want the remedy to accomplish?',
    branches: [
      {
        label: 'Compensate a recoverable loss',
        detail: 'The claim seeks money for legally supported harm caused by the breach.',
        outcome: 'Analyze damages, including proof, causation, and mitigation.',
      },
      {
        label: 'Obtain the promised conveyance',
        detail: 'The claimant seeks the agreed performance rather than a monetary substitute.',
        outcome: 'Analyze specific performance and its equitable requirements.',
      },
      {
        label: 'Unwind the transaction',
        detail: 'The claimant seeks to reverse the bargain and address benefits already received.',
        outcome: 'Analyze rescission grounds, procedure, and restitution.',
      },
    ],
    caption:
      "A breach does not automatically establish entitlement to every requested remedy. Mediation and arbitration concern the dispute process, not these remedies' different objectives.",
  },
  {
    id: 'supplement-representation-scope',
    lessonSlug: 'contracts-representation-agreements',
    afterSection: 'an-employment-agreement-is-a-separate-contract',
    title: 'Read brokerage employment separately from the sale',
    kind: 'process',
    steps: [
      {
        label: 'Identify the agreement',
        detail: 'A client employs a brokerage; a buyer and seller agree to transfer property.',
      },
      {
        label: 'Locate the service terms',
        detail: 'Read scope, duration, exclusivity, compensation triggers, and termination.',
      },
      {
        label: 'Check the specific authority',
        detail:
          'Permission to market or search does not ordinarily authorize signing a sale contract or deed.',
      },
    ],
    caption:
      "A signed listing is not a seller's signed acceptance of a buyer offer. Professional employment and authority to bind the principal require separate analysis.",
  },
  {
    id: 'supplement-lease-transfer',
    lessonSlug: 'contracts-purchase-options-and-leases',
    afterSection: 'a-lease-transfers-possession-not-the-fee',
    title: 'Follow the interest the original tenant retains',
    kind: 'comparison',
    columns: [
      {
        label: 'Assignment',
        points: [
          'Transfers the remaining leasehold interest in the typical case.',
          'Example: all three remaining years pass to the replacement occupant.',
        ],
      },
      {
        label: 'Sublease',
        points: [
          'Transfers a lesser interest while the original tenant retains a reversionary interest.',
          'Example: two of three remaining years pass, with the final year retained.',
        ],
      },
    ],
    caption:
      'Check consent requirements and the actual interest transferred. Neither structure automatically releases the original tenant from the lease obligations owed to the landlord.',
  },
]
