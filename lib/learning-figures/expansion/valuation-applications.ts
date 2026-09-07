import type { LearningFigureSpec } from '../types'

const basic = 'https://www.boe.ca.gov/proptaxes/pdf/ah501.pdf'
const advanced = 'https://www.boe.ca.gov/proptaxes/pdf/ah502.pdf'
const dre = 'https://www.dre.ca.gov/files/pdf/refbook/ref15.pdf'
const rule2 = 'https://www.boe.ca.gov/proptaxes/pdf/rules/Rule2.pdf'
const rule4 = 'https://www.boe.ca.gov/proptaxes/pdf/rules/Rule4.pdf'
const rule6 = 'https://www.boe.ca.gov/proptaxes/pdf/rules/Rule6.pdf'
const rule8 = 'https://www.boe.ca.gov/proptaxes/pdf/rules/Rule8.pdf'
const adjustments = 'https://selling-guide.fanniemae.com/sel/b4-1.3-09/adjustments-comparable-sales'
const rentalTax = 'https://www.irs.gov/publications/p527'

export const valuationApplicationFigures: LearningFigureSpec[] = [
  {
    id: 'exp-value-assignment-identity',
    lessonSlug: 'valuation-value-principles',
    afterSection: 'value-is-an-opinion-with-a-defined-purpose',
    title: 'A value conclusion needs an identity',
    objective:
      'Identify the property interest, value definition, and effective date before comparing two value opinions.',
    sourceUrls: [basic, rule2],
    kind: 'document',
    documentTitle: 'Valuation instructions: fictional excerpts',
    context:
      'Two reports concern the same street address. That alone does not establish that their conclusions should match.',
    fields: [
      {
        label: 'Report A',
        value: 'Market value of the leased-fee interest as of March 1.',
        annotation:
          "The owner's interest is subject to the specified existing lease and its actual terms.",
      },
      {
        label: 'Report B',
        value: 'A fee-simple value opinion as of September 1 under its stated assumptions.',
        annotation:
          'Different rights and a later economic setting can produce a different conclusion without an arithmetic error.',
      },
      {
        label: 'Missing information',
        value: 'A third document states only: Property value $900,000.',
        annotation:
          'Without the interest, date, definition, and assumptions, the figure cannot be evaluated as an equivalent opinion.',
      },
      {
        label: 'Tax-assessment variant',
        value: 'California property-tax valuation under Rule 2.',
        annotation:
          "The rule specifies its fee-simple framework. Do not automatically import a private leased-fee assignment's assumptions.",
      },
    ],
    conclusion: 'Compare like assignments before comparing their final dollar amounts.',
    caption:
      'Property address identifies the location, not the entire appraisal problem. Purpose, rights, date, and assumptions identify what was actually valued.',
  },
  {
    id: 'exp-value-purpose-not-ranking',
    lessonSlug: 'valuation-value-principles',
    afterSection: 'identify-the-value-question-before-choosing-evidence',
    title: 'Different value questions are not competing bids',
    objective:
      "Distinguish ordinary market exchange, a particular investor's benefit, and covered rebuilding cost.",
    sourceUrls: [basic, dre],
    kind: 'comparison',
    columns: [
      {
        label: 'Market exchange',
        points: [
          'The assignment asks what typical informed participants would probably exchange under the defined conditions.',
          'Relevant competing sales support an illustrative $820,000 opinion.',
          'The opinion is not a promise that this exact price will be paid.',
        ],
      },
      {
        label: 'Particular investor',
        points: [
          'An adjoining business can eliminate costly offsite storage by acquiring this property.',
          'Its own analysis supports paying $900,000.',
          "That special benefit may explain investment value; it does not automatically reset every buyer's market value.",
        ],
      },
      {
        label: 'Insurance purpose',
        points: [
          'A policy-based estimate considers $560,000 of covered rebuilding costs.',
          'The land remains after the assumed structure loss.',
          'Do not use this building-focused figure as the market value of the land and building together.',
        ],
      },
    ],
    caption:
      'The numbers are fictional and the insurance result depends on policy terms. Choosing the largest amount does not identify the correct value standard.',
  },
  {
    id: 'exp-value-substitution-delay-cost',
    lessonSlug: 'valuation-value-principles',
    afterSection: 'principles-that-explain-buyer-behavior',
    title: 'An alternative is not equally available when it requires a wait',
    objective:
      'Include a stated delay cost when comparing the economic substitute for an immediately usable property.',
    sourceUrls: [basic],
    kind: 'calculation',
    rows: [
      { label: "Fictional equally useful alternative's purchase cost", amount: 620000 },
      { label: 'Necessary temporary occupancy during the delay', amount: 18000 },
      { label: 'Additional moving and transaction costs caused by this alternative', amount: 7000 },
    ],
    result: {
      label: 'Comparable economic outlay for the delayed alternative',
      amount: 645000,
      detail:
        '$620,000 + $18,000 + $7,000 = $645,000. Assume these are the only relevant differences and all amounts are supported.',
    },
    caption:
      'Substitution does not mean selecting the lowest advertised price without comparing timing and utility. This buyer-specific illustration is not, by itself, a market appraisal or a universal price ceiling.',
  },
  {
    id: 'exp-value-marginal-improvement-curve',
    lessonSlug: 'valuation-value-principles',
    afterSection: 'distinguish-benefits-expenditures-and-remaining-value',
    title: 'The next improvement can destroy the earlier surplus',
    objective:
      'Compare the marginal contribution of successive improvements with their additional costs.',
    sourceUrls: [basic],
    kind: 'chart',
    xAxis: { label: 'Cumulative improvement spending', format: 'currency' },
    yAxis: { label: 'Cumulative dollars', format: 'currency' },
    series: [
      {
        label: 'Cost incurred',
        points: [
          { x: 0, y: 0 },
          { x: 10000, y: 10000 },
          { x: 28000, y: 28000 },
          { x: 53000, y: 53000 },
        ],
      },
      {
        label: 'Added market value',
        points: [
          { x: 0, y: 0 },
          { x: 10000, y: 15000 },
          { x: 28000, y: 37000 },
          { x: 53000, y: 45000 },
        ],
      },
    ],
    conclusion:
      'Stage 2 leaves a $9,000 value-over-cost surplus. Stage 3 adds only $8,000 of value for another $25,000 of cost, reducing the total result to an $8,000 shortfall.',
    caption:
      'Fictional supported increments: $15,000, $22,000, then $8,000. Compare each next benefit with its next cost; a successful early stage does not justify every later expenditure. Connecting lines organize stages, not an estimate for every intermediate design.',
  },
  {
    id: 'exp-value-anticipation-evidence-stages',
    lessonSlug: 'valuation-value-principles',
    afterSection: 'principles-that-explain-buyer-behavior',
    title: 'A future benefit needs evidence, not just a story',
    objective:
      'Distinguish the principle of anticipation from assuming that a hoped-for project is already certain.',
    sourceUrls: [basic, dre],
    kind: 'timeline',
    premise:
      'A fictional parcel may benefit from a proposed transportation connection. The property itself is unchanged at each observation date.',
    events: [
      {
        label: 'Unverified rumor',
        when: 'First observation',
        detail:
          'The seller reports that a connection may be built. Neither the proposal nor its effect on this property has been verified.',
      },
      {
        label: 'Documented proposal',
        when: 'Later evidence',
        detail:
          'The project appears in an official plan, but financing, approvals, and schedule remain unresolved.',
      },
      {
        label: 'More certain prospect',
        when: 'Further evidence',
        detail:
          'Necessary approvals and funding are documented. Analyze remaining risks and how actual market participants price the expected benefit.',
      },
    ],
    conclusion:
      'Anticipation can affect present value before completion, but neither a proposal nor a funded project supplies an automatic dollar premium.',
    caption:
      'Consider both benefits and adverse effects, such as access changes or noise. Do not turn these illustrative stages into a forecast about a real transportation project.',
  },
  {
    id: 'exp-value-physical-use-envelope',
    lessonSlug: 'valuation-value-principles',
    afterSection: 'highest-and-best-use',
    title: 'A financially attractive footprint still has to fit',
    objective:
      'Reject a proposed use that exceeds the assumed development envelope before ranking its projected return.',
    sourceUrls: [basic],
    kind: 'parcel',
    extent: { width: 120, height: 110 },
    unit: 'feet',
    areas: [
      {
        key: 'A',
        label: 'Site',
        x: 10,
        y: 10,
        width: 100,
        height: 90,
        pattern: 'clear',
        labelAt: { x: 16, y: 18 },
        description:
          'Fictional 100-by-90-foot site. All boundaries and permitted dimensions are stipulated, not a statement of any local ordinance.',
      },
      {
        key: 'B',
        label: 'Allowed footprint envelope',
        x: 25,
        y: 25,
        width: 70,
        height: 60,
        pattern: 'hatch',
        labelAt: { x: 85, y: 73 },
        description:
          'The assumed legal and physical review permits a building footprint only within this 70-by-60-foot rectangle.',
      },
      {
        key: 'C',
        label: 'Proposed footprint',
        x: 15,
        y: 35,
        width: 90,
        height: 40,
        pattern: 'solid',
        labelAt: { x: 60, y: 52 },
        description:
          'The proposed 90-by-40-foot building crosses both side limits. A 90-degree rotation also fails: its 90-foot dimension exceeds the envelope\'s 60-foot depth.',
      },
    ],
    conclusion:
      'A $200,000 projected development profit does not rescue a footprint that fails the stated constraints. Redesign and re-evaluate; do not assume permission or physical feasibility.',
    caption:
      'The diagram is a fictional screening problem, not a survey. Total footprint area of 3,600 square feet is less than the 4,200-square-foot envelope, but area alone does not prove that the dimensions fit.',
  },
  {
    id: 'exp-value-development-residual-ranking',
    lessonSlug: 'valuation-value-principles',
    afterSection: 'work-through-the-four-tests-with-numbers',
    title: 'The highest completed value can leave less for the land',
    objective:
      'Rank feasible development alternatives using residual value after consistent costs and required developer return.',
    sourceUrls: [basic],
    kind: 'comparison',
    columns: [
      {
        label: 'Office proposal',
        points: [
          'Supported completed value: $1,500,000.',
          'Nonland costs, timing allowances, and required developer return: $1,180,000.',
          'Residual to land: $320,000.',
        ],
      },
      {
        label: 'Apartment proposal',
        points: [
          'Supported completed value: $1,850,000.',
          'Comparable nonland deductions: $1,400,000.',
          'Residual to land: $450,000, initially $130,000 above offices.',
        ],
      },
      {
        label: 'Apartment cost revision',
        points: [
          'Completed value remains $1,850,000.',
          'Supported nonland deductions rise to $1,600,000.',
          'Residual falls to $250,000; offices now support $70,000 more for the land.',
        ],
      },
    ],
    caption:
      "Assume both uses are legally and physically acceptable and timing and risk are treated consistently. Residual ranking changes when costs change, even without a decline in the larger project's completed value.",
  },
  {
    id: 'exp-value-assemblage-width-benefit',
    lessonSlug: 'valuation-value-principles',
    afterSection: 'assemblage-and-plottage',
    title: 'Combining narrow sites can change their utility',
    objective:
      'Distinguish the physical act of assemblage, gross plottage, and the net result after assembly expenses.',
    sourceUrls: [basic, dre],
    kind: 'parcel',
    extent: { width: 120, height: 100 },
    unit: 'feet',
    areas: [
      {
        key: 'A',
        label: 'West parcel',
        x: 10,
        y: 10,
        width: 30,
        height: 80,
        pattern: 'clear',
        description:
          'Separate supported value: $150,000. Alone, this narrow site cannot support the stated combined-site plan.',
      },
      {
        key: 'B',
        label: 'Middle parcel',
        x: 40,
        y: 10,
        width: 30,
        height: 80,
        pattern: 'hatch',
        description:
          'Separate supported value: $170,000. Assembly connects its usable width to the adjoining parcels.',
      },
      {
        key: 'C',
        label: 'East parcel',
        x: 70,
        y: 10,
        width: 40,
        height: 80,
        pattern: 'solid',
        description:
          'Separate supported value: $180,000. The assembled site is 100 feet wide; assume the combined plan has appropriate legal and physical support.',
      },
    ],
    conclusion:
      'Separate values total $500,000. A supported assembled value of $590,000 indicates $90,000 of gross plottage; $40,000 of assembly expenses leave a $50,000 net advantage in this simplified analysis.',
    caption:
      'Acquiring adjoining parcels does not automatically erase legal lot lines or obtain project approvals. Here those feasibility questions are expressly assumed resolved; geometry explains the stated utility change.',
  },
  {
    id: 'exp-value-retain-or-clear-site',
    lessonSlug: 'valuation-value-principles',
    afterSection: 'highest-and-best-use',
    title: 'As though vacant is not the same as already vacant',
    objective:
      'Compare retention with clearing a site and avoid combining land and improvements from incompatible uses.',
    sourceUrls: [basic],
    kind: 'document',
    documentTitle: 'Existing-use decision: fictional appraisal worksheet',
    context:
      'Assume the alternatives below are legally feasible, the stated prices and costs are supported, and no additional conversion or sale costs apply.',
    fields: [
      {
        label: 'Retain present use',
        value: 'Existing land and building together support $680,000.',
        annotation:
          "This is the improved property's total value under its continuing use, not the value of the building alone.",
      },
      {
        label: 'Site as though vacant',
        value: 'The redevelopment site supports $620,000.',
        annotation: 'This hypothetical vacant condition is not the current physical state.',
      },
      {
        label: 'Clear the current site',
        value: 'Demolition costs $30,000.',
        annotation:
          'Net value attributable to clearing the current property: $620,000 - $30,000 = $590,000.',
      },
      {
        label: 'Compare actual alternatives',
        value: 'Retention exceeds clearing by $90,000.',
        annotation:
          'Do not add the existing building to a land estimate based on a redevelopment use that requires its removal.',
      },
    ],
    conclusion:
      'On the stated facts, keep the existing use. A redevelopment possibility alone does not prove that demolition creates value today.',
    caption:
      'Highest and best use as improved asks what to do with the existing property, including conversion costs. The as-vacant analysis answers a related but different question.',
  },
  {
    id: 'exp-sales-evidence-status-file',
    lessonSlug: 'valuation-sales-comparison',
    afterSection: 'define-the-assignment-and-gather-evidence',
    title: 'Four prices describe four different stages',
    objective: 'Distinguish a verified closing from pending, active, and expired listing evidence.',
    sourceUrls: [basic, adjustments],
    kind: 'document',
    documentTitle: 'Market evidence log: fictional transactions',
    context:
      "The subject's current competitive market contains these four records. None can be evaluated by price alone.",
    fields: [
      {
        label: 'Closed: $612,000',
        value: 'Transfer completed and material terms verified.',
        annotation:
          'Evidence of an actual exchange, still subject to differences in rights, timing, condition, and sale circumstances.',
      },
      {
        label: 'Pending: $625,000',
        value: 'Contract reported; closing remains conditional.',
        annotation:
          'Useful current-market evidence, not proof of a completed transaction at that price.',
      },
      {
        label: 'Active: $650,000',
        value: 'Seller is currently asking this amount.',
        annotation:
          'Shows available competition and seller expectations, not demonstrated buyer acceptance.',
      },
      {
        label: 'Expired: $675,000',
        value: 'Marketing ended without a reported sale.',
        annotation:
          'Investigate exposure and terms; expiration may show price resistance but does not reveal the exact achievable value.',
      },
    ],
    conclusion:
      'Classify the record and verify its terms before using its number as equivalent market evidence.',
    caption:
      'The file does not imply that pending or listing evidence is worthless. It identifies what each record can and cannot establish.',
  },
  {
    id: 'exp-sales-competitive-alternatives',
    lessonSlug: 'valuation-sales-comparison',
    afterSection: 'select-competitors-before-selecting-convenient-statistics',
    title: 'A nearby sale may serve a different buyer',
    objective:
      'Evaluate competitive relevance before ranking comparable sales by distance or convenience.',
    sourceUrls: [basic, adjustments],
    kind: 'relationship',
    center: {
      label: 'Modest detached subject',
      detail:
        'The subject has ordinary residential utility, fee-simple ownership, and no unusual commercial permission.',
    },
    nodes: [
      {
        label: 'Nearby luxury condo',
        connection: 'different product',
        detail:
          'Only one block away, but ownership rights, assessments, shared amenities, and buyer choices differ substantially.',
      },
      {
        label: 'Farther detached sale',
        connection: 'possible competitor',
        detail:
          'Similar size, utility, and purchaser pool. Analyze location differences rather than discard it solely for being farther away.',
      },
      {
        label: 'Next-door corner site',
        connection: 'different legal use',
        detail:
          'A valuable commercial entitlement may influence this sale. Geographic closeness does not remove the rights difference.',
      },
    ],
    caption:
      'The strongest comparable is determined by market competition and credible adjustments, not automatically the nearest address or the lowest gross adjustment.',
  },
  {
    id: 'exp-sales-paired-feature-isolation',
    lessonSlug: 'valuation-sales-comparison',
    afterSection: 'deriving-and-evaluating-adjustments',
    title: 'A price gap cannot all belong to the garage',
    objective:
      'Remove a separately supported condition difference before attributing a paired-sale price gap to one feature.',
    sourceUrls: [basic, advanced, adjustments],
    kind: 'calculation',
    rows: [
      { label: 'Sale A: garage plus superior condition', amount: 625000 },
      { label: 'Subtract Sale B: no garage, inferior condition', amount: -590000 },
      { label: 'Remove independently supported condition contribution', amount: -20000 },
    ],
    result: {
      label: 'Indicated garage contribution from this pair',
      amount: 15000,
      detail:
        '$625,000 - $590,000 - $20,000 = $15,000. Assume timing, rights, location, size, and all remaining relevant attributes are equivalent.',
    },
    caption:
      'The raw $35,000 price gap mixes two differences. Without independent support for the condition adjustment, this pair would not isolate a reliable garage adjustment by itself.',
  },
  {
    id: 'exp-sales-time-before-feature-adjustments',
    lessonSlug: 'valuation-sales-comparison',
    afterSection: 'combine-adjustments-without-reversing-the-reference-point',
    title: 'Apply the stated percentage to the stated base',
    objective:
      'Apply a supported time adjustment before dollar feature adjustments and keep the comparable as the reference being changed.',
    sourceUrls: [rule4, adjustments],
    kind: 'calculation',
    rows: [
      { label: "Comparable's verified sale price", amount: 640000 },
      { label: 'First: supported 5% increase on $640,000', amount: 32000 },
      { label: 'Then: superior view relative to subject', amount: -24000 },
      { label: 'Then: inferior condition relative to subject', amount: 9000 },
    ],
    result: {
      label: 'Adjusted comparable indication',
      amount: 657000,
      detail:
        '$640,000 x 1.05 - $24,000 + $9,000 = $657,000. The exercise explicitly specifies this sequence and supports each amount.',
    },
    caption:
      "Applying 5% after the two dollar changes produces $656,250, a different model. A general annual trend also cannot replace evidence for the comparable's contract-date-to-effective-date interval.",
  },
  {
    id: 'exp-sales-concession-market-effect',
    lessonSlug: 'valuation-sales-comparison',
    afterSection: 'common-adjustment-categories',
    title: "The seller's cost and the price effect are not identical",
    objective:
      "Use a supported concession price effect instead of automatically deducting the seller's entire payment.",
    sourceUrls: [adjustments],
    kind: 'document',
    documentTitle: 'Concession analysis: fictional comparable',
    context:
      'Assume an appraisal governed by the cited Fannie Mae guidance. The listed amounts are stipulated market findings, not presumed adjustment rules.',
    fields: [
      {
        label: 'Reported transaction',
        value: 'Sale price $680,000; seller paid $12,000 of buyer costs.',
        annotation:
          'Report and verify the known concession. The cost alone does not measure its price effect.',
      },
      {
        label: 'Supported market effect',
        value: 'Analysis attributes $7,000 of the price to the concession.',
        annotation:
          'The adjustment addresses this observed market influence rather than automatically subtracting $12,000.',
      },
      {
        label: 'Adjusted for this item',
        value: '$680,000 - $7,000 = $673,000.',
        annotation: 'Other supported differences must still be addressed separately.',
      },
      {
        label: 'Changed evidence',
        value: 'If supported price impact is the full $12,000, the deduction would be $12,000.',
        annotation:
          'A dollar-for-dollar adjustment can be appropriate when supported; it is not required solely because the seller spent that amount.',
      },
    ],
    conclusion:
      "The measured effect on the comparable's negotiated price determines the concession adjustment in this framework.",
    caption:
      'Do not combine a cash-equivalency rule from a different assignment with a lender-specific concession method without recognizing their different instructions.',
  },
  {
    id: 'exp-sales-noncash-consideration-equivalent',
    lessonSlug: 'valuation-sales-comparison',
    afterSection: 'define-the-assignment-and-gather-evidence',
    title: 'Face value is not always cash-equivalent consideration',
    objective:
      'Convert a stipulated noncash purchase component to cash equivalence under the stated property-tax comparison framework.',
    sourceUrls: [rule4, basic],
    kind: 'calculation',
    rows: [
      { label: 'Cash paid by purchaser', amount: 200000 },
      { label: 'Supported cash value of the $400,000 seller note', amount: 350000 },
    ],
    result: {
      label: 'Cash-equivalent transaction amount',
      amount: 550000,
      detail:
        '$200,000 cash + $350,000 supported note value = $550,000, not the $600,000 nominal total.',
    },
    caption:
      "Assume the note's $350,000 cash value is already supported and there are no other consideration components. This Rule 4 illustration does not derive the note value or prescribe a dollar-for-dollar lender concession adjustment.",
  },
  {
    id: 'exp-sales-average-versus-marginal-area',
    lessonSlug: 'valuation-sales-comparison',
    afterSection: 'select-competitors-before-selecting-convenient-statistics',
    title: "Average price per square foot is not the next foot's value",
    objective:
      'Distinguish a whole-property price-per-area ratio from the supported marginal contribution of extra living area.',
    sourceUrls: [basic, adjustments],
    kind: 'chart',
    xAxis: { label: 'Living area in square feet', format: 'number' },
    yAxis: { label: 'Indicated total property value', format: 'currency' },
    series: [
      {
        label: 'Supported $100 marginal contribution',
        points: [
          { x: 1500, y: 600000 },
          { x: 1700, y: 620000 },
          { x: 1900, y: 640000 },
        ],
      },
      {
        label: 'Incorrect $400 average-rate shortcut',
        points: [
          { x: 1500, y: 600000 },
          { x: 1700, y: 680000 },
          { x: 1900, y: 760000 },
        ],
      },
    ],
    conclusion:
      'The $600,000 base sale divided by 1,500 square feet is $400 per square foot, but a supported $100 marginal adjustment adds only $20,000 for the next 200 square feet, not $80,000.',
    caption:
      'Fictional closely comparable properties; assume no other differences and a supported constant marginal rate only within the displayed size range. The average ratio allocates land and other contributions across the building area.',
  },
  {
    id: 'exp-sales-overlapping-condition-allowances',
    lessonSlug: 'valuation-sales-comparison',
    afterSection: 'watch-for-double-counted-explanations',
    title: 'Two descriptions can refer to one price difference',
    objective:
      'Recognize overlapping adjustment evidence and distinguish it from independently supported component differences.',
    sourceUrls: [basic, adjustments],
    kind: 'decision',
    question:
      'A comparable is inferior to the subject in condition. Should a kitchen adjustment be added to the whole-property condition adjustment?',
    branches: [
      {
        label: 'Kitchen already included',
        detail:
          'The supported $30,000 condition allowance expressly includes the $20,000 kitchen deficiency.',
        outcome: 'Use $30,000 for that defined difference, not $50,000.',
      },
      {
        label: 'Separate supported differences',
        detail:
          'The $30,000 allowance expressly excludes the kitchen; independent analysis supports an additional $20,000 kitchen difference.',
        outcome: 'Both may apply if the evidence and absence of overlap are established.',
      },
      {
        label: 'Scope of evidence unknown',
        detail: 'The worksheet has two labels but does not explain what either includes.',
        outcome:
          'Resolve the scope before adding; two rows are not proof of two distinct contributions.',
      },
    ],
    caption:
      'Each adjustment must change the comparable toward the subject for a distinct supported reason. Precise arithmetic cannot repair double-counted evidence.',
  },
  {
    id: 'exp-sales-outlier-separate-parcel',
    lessonSlug: 'valuation-sales-comparison',
    afterSection: 'use-ranges-to-reveal-questions-worth-resolving',
    title: 'Investigate the outlier before averaging it',
    objective:
      'Explain an unusually high indication through a verified extra property component rather than mechanically including or discarding it.',
    sourceUrls: [basic, rule4, adjustments],
    kind: 'document',
    documentTitle: 'Reconciliation review: fictional four-sale file',
    context:
      'Three otherwise adjusted indications are $610,000, $620,000, and $615,000. A fourth initially indicates $695,000.',
    fields: [
      {
        label: 'Initial average',
        value: '$635,000 from the four uncorrected indications.',
        annotation:
          'The computation is correct, but the fourth result may not represent the same property unit.',
      },
      {
        label: 'Verified difference',
        value: 'The fourth transaction includes a separate adjoining parcel.',
        annotation: 'Its contribution has not yet been removed from the comparable worksheet.',
      },
      {
        label: 'Supported component',
        value: 'Independent evidence supports $80,000 for the additional parcel.',
        annotation:
          'On the stipulated facts, $695,000 - $80,000 = $615,000 for the comparison being analyzed.',
      },
      {
        label: 'Revised evidence',
        value: 'Indications now range from $610,000 to $620,000.',
        annotation:
          'Reconcile reliability and relevance within that evidence; agreement does not make an automatic average mandatory.',
      },
    ],
    conclusion:
      'The outlier identified a missing property-unit adjustment. Do not invent a deduction merely to force agreement, and do not retain the uncorrected price just because it is a verified sale.',
    caption:
      'The extra parcel and $80,000 allocation are explicit fictional evidence. If either were unverified, further investigation or a stated limitation would be necessary.',
  },
  {
    id: 'exp-cost-select-cost-definition',
    lessonSlug: 'valuation-cost-approach',
    afterSection: 'replacement-reproduction-and-cost-components',
    title: 'Choose the cost concept before selecting the estimate',
    objective:
      'Distinguish historical expenditure, a current duplicate, and a current equivalent-utility substitute.',
    sourceUrls: [rule6, basic],
    kind: 'document',
    documentTitle: 'Construction estimate file: fictional building',
    context:
      'An older building has ornate custom finishes. The assignment seeks the current cost of an equally useful modern substitute, before depreciation.',
    fields: [
      {
        label: 'Original invoice',
        value: '$410,000 paid when the building was constructed.',
        annotation:
          "Historical cost does not automatically reflect today's labor, materials, or requirements.",
      },
      {
        label: 'Exact-duplicate estimate',
        value: '$900,000 using the original design and custom finishes.',
        annotation: 'This is the stated current reproduction estimate.',
      },
      {
        label: 'Equivalent-utility estimate',
        value: '$650,000 using contemporary construction and ordinary finishes.',
        annotation:
          "This is the stated replacement estimate matching the assignment's requested alternative.",
      },
      {
        label: 'Remaining analysis',
        value: 'Measure relevant depreciation and add separately supported land.',
        annotation:
          'Selecting the correct cost concept does not finish the appraisal or establish that every cost contributes equal value.',
      },
    ],
    conclusion:
      "Use $650,000 as this assignment's stated replacement-cost input, not simply the oldest or largest number in the file.",
    caption:
      'A different assignment may need a reproduction analysis. These invented estimates illustrate definitions, not current construction prices.',
  },
  {
    id: 'exp-cost-complete-construction-input',
    lessonSlug: 'valuation-cost-approach',
    afterSection: 'build-a-complete-cost-estimate',
    title: 'A square-foot subtotal can omit necessary development costs',
    objective:
      'Build the stated improvement cost from direct construction, separately excluded indirect costs, and entrepreneurial incentive.',
    sourceUrls: [rule6, basic],
    kind: 'calculation',
    rows: [
      { label: '1,600 square feet x $210 direct cost per square foot', amount: 336000 },
      {
        label: 'Design, permits, and stated indirect costs excluded from the unit rate',
        amount: 28000,
      },
      { label: 'Separately supported entrepreneurial incentive', amount: 24000 },
    ],
    result: {
      label: 'Current improvement cost before depreciation',
      amount: 388000,
      detail:
        '$336,000 + $28,000 + $24,000 = $388,000. Land and separate site improvements are outside this building estimate.',
    },
    caption:
      'The unit rate explicitly excludes the two additions. If a supplied rate already included them, adding them again would overstate cost; the inclusions control the arithmetic.',
  },
  {
    id: 'exp-cost-site-inclusion-inventory',
    lessonSlug: 'valuation-cost-approach',
    afterSection: 'land-and-improvements-are-separate',
    title: 'One driveway cannot appear in two cost totals',
    objective:
      'Remove an identified overlap between building and site-improvement estimates before applying depreciation.',
    sourceUrls: [rule6, basic],
    kind: 'document',
    documentTitle: 'Cost inclusions audit: fictional estimate',
    context:
      'The building and site schedules were prepared separately. All listed amounts are current costs new, with land excluded.',
    fields: [
      {
        label: 'Building schedule',
        value: '$350,000 including a $12,000 driveway allowance.',
        annotation: 'The driveway is already present inside this subtotal.',
      },
      {
        label: 'Site schedule',
        value: '$27,000: the same $12,000 driveway plus $15,000 fencing.',
        annotation:
          'Only the fencing is an additional component relative to the building schedule.',
      },
      {
        label: 'Reconciled new cost',
        value: '$350,000 + $27,000 - $12,000 = $365,000.',
        annotation:
          'The corrected sum counts each improvement once; $377,000 would duplicate the driveway.',
      },
      {
        label: 'Next appraisal step',
        value: 'Evaluate appropriate depreciation for the actual components.',
        annotation:
          'Paving and fencing can wear out. Correcting the inventory does not establish their remaining contribution.',
      },
    ],
    conclusion:
      'Resolve what each subtotal includes before adding schedules or applying loss factors.',
    caption:
      'The underlying land is separate from its physical site improvements. A land estimate is not a duplicate driveway allowance merely because both relate to the same parcel.',
  },
  {
    id: 'exp-cost-replacement-obsolescence-overlap',
    lessonSlug: 'valuation-cost-approach',
    afterSection: 'three-categories-of-depreciation',
    title: 'Replacement can already omit an obsolete design cost',
    objective:
      'Avoid deducting the same functional loss again after changing from reproduction to an equivalent-utility replacement estimate.',
    sourceUrls: [rule6, basic, dre],
    kind: 'comparison',
    columns: [
      {
        label: 'Reproduction route',
        points: [
          'Current duplicate cost: $800,000.',
          'Supported loss from an unnecessary design feature: $150,000; separate physical loss: $30,000.',
          'Indicated improvement contribution: $800,000 - $150,000 - $30,000 = $620,000.',
        ],
      },
      {
        label: 'Replacement route',
        points: [
          'Equivalent-utility replacement cost: $650,000, already omitting that $150,000 unnecessary feature.',
          'Apply the same separately supported $30,000 physical loss.',
          'Indicated contribution: $650,000 - $30,000 = $620,000, not $470,000.',
        ],
      },
    ],
    caption:
      'Assume the replacement estimate removes exactly this identified functional issue and no other differences apply. Replacement does not eliminate every possible obsolescence, but it changes what remains to be deducted.',
  },
  {
    id: 'exp-cost-curability-two-dimensions',
    lessonSlug: 'valuation-cost-approach',
    afterSection: 'curable-does-not-mean-cheap-and-incurable-does-not-mean-impossible',
    title: 'Affordable, repairable, and economically curable are different',
    objective:
      'Judge economic curability by supported benefit relative to correction cost rather than price size or physical possibility.',
    sourceUrls: [basic, dre],
    kind: 'comparison',
    columns: [
      {
        label: 'Small correction',
        points: [
          'Technically possible at a cost of $5,000.',
          'Stated market value restored: $2,500.',
          'The isolated economic test leaves a $2,500 shortfall; low cost alone does not make it curable.',
        ],
      },
      {
        label: 'Large correction',
        points: [
          'Technically possible at a cost of $70,000.',
          'Stated market value restored: $95,000.',
          'The isolated economic test leaves a $25,000 benefit above cost; expensive can still be curable.',
        ],
      },
      {
        label: 'Required safety work',
        points: [
          "Correction is legally required under the problem's explicit facts.",
          'The stand-alone resale premium is uncertain.',
          'Economic classification does not decide whether the legal obligation exists.',
        ],
      },
    ],
    caption:
      'Assume the first two cases include all relevant economic costs and benefits. The cause of the deficiency, its curability, and a legal correction requirement are separate questions.',
  },
  {
    id: 'exp-cost-age-life-denominator',
    lessonSlug: 'valuation-cost-approach',
    afterSection: 'age-and-life',
    title: 'Remaining life is not the age-life denominator',
    objective:
      'Use effective age and total economic life consistently in a stipulated straight-line age-life model.',
    sourceUrls: [basic, dre],
    kind: 'document',
    documentTitle: 'Age-life worksheet: fictional renovated building',
    context:
      'Assume the simplified model uses effective age plus remaining economic life as total economic life. No additional separately measured losses apply.',
    fields: [
      {
        label: 'Chronological age',
        value: '40 years since construction.',
        annotation:
          'This dates the building; it is not automatically the effective-age input after renovation.',
      },
      {
        label: 'Condition-based age',
        value: 'Effective age 8 years; remaining economic life 32 years.',
        annotation: 'Total economic life in this model is 8 + 32 = 40 years.',
      },
      {
        label: 'Depreciation factor',
        value: '8 / 40 = 20%.',
        annotation:
          'Using 8 / 32 would produce 25% by incorrectly using remaining life as the denominator.',
      },
      {
        label: 'Dollar application',
        value: '$500,000 current improvement cost x 20% = $100,000 loss.',
        annotation:
          'The remaining improvement contribution is $400,000. Land is not included in this calculation.',
      },
    ],
    conclusion:
      'Use the given effective age, reconstruct the total life where necessary, and apply the resulting factor only to its stated component.',
    caption:
      "Economic life concerns value contribution, not merely how long a structure can remain standing. This simplified relationship is not a guarantee about a real building's future.",
  },
  {
    id: 'exp-cost-percent-good-partition',
    lessonSlug: 'valuation-cost-approach',
    afterSection: 'percent-good-measures-the-remaining-contribution',
    title: 'Percent good labels the portion retained',
    objective:
      'Distinguish percent good from percent depreciation and keep the factor limited to the building.',
    sourceUrls: [rule6],
    kind: 'allocation',
    total: 500000,
    segments: [
      {
        label: 'Remaining building contribution',
        amount: 380000,
        detail: '76% good means $500,000 x 0.76 = $380,000 retained value in the stated model.',
      },
      {
        label: 'Accrued building depreciation',
        amount: 120000,
        detail: 'The complementary 24% is the loss: $500,000 x 0.24 = $120,000.',
      },
    ],
    caption:
      'With separately supported land of $210,000 and already-depreciated site improvements of $20,000, the total indication is $610,000. Do not subtract the 76% good portion or apply the building factor to the land.',
  },
  {
    id: 'exp-cost-curable-before-residual-age',
    lessonSlug: 'valuation-cost-approach',
    afterSection: 'avoid-counting-a-repair-twice-in-depreciation',
    title: 'A separately removed defect changes the remaining base',
    objective:
      'Follow an expressly specified breakdown method without applying the remaining age-life factor to an already removed defect.',
    sourceUrls: [basic, dre],
    kind: 'calculation',
    rows: [
      { label: 'Current improvement cost new', amount: 480000 },
      { label: 'First deduct the separately measured curable defect', amount: -20000 },
      { label: 'Then deduct 20% of the remaining $460,000', amount: -92000 },
    ],
    result: {
      label: 'Depreciated improvement contribution',
      amount: 368000,
      detail: '$480,000 - $20,000 - ($460,000 x 0.20) = $368,000. Total loss is $112,000.',
    },
    caption:
      'The exercise expressly applies age-life only after removing the curable item. Applying 20% to all $480,000 and then deducting $20,000 produces $364,000, a different model with $4,000 more loss.',
  },
  {
    id: 'exp-cost-tax-deduction-market-value',
    lessonSlug: 'valuation-cost-approach',
    afterSection: 'appraisal-depreciation-versus-tax-depreciation',
    title: 'A tax deduction does not measure a market decline',
    objective:
      'Keep federal rental-building cost recovery separate from land basis and appraisal changes in market value.',
    sourceUrls: [rentalTax, basic],
    kind: 'document',
    documentTitle: 'Two-purpose worksheet: fictional residential rental',
    context:
      'Assume eligible residential rental property under MACRS GDS, a full intervening recovery year, no personal-use allocation, and no other adjustments. This is not the first or final recovery year.',
    fields: [
      {
        label: 'Supported basis allocation',
        value: 'Building $330,000; land $170,000.',
        annotation:
          'Only the eligible building basis is used for this building-depreciation calculation.',
      },
      {
        label: 'Tax cost recovery',
        value: '$330,000 / 27.5 = $12,000 for the assumed full year.',
        annotation:
          'The period is a tax recovery convention, not a conclusion that the building has a 27.5-year appraisal life.',
      },
      {
        label: 'Independent market evidence',
        value: 'Whole-property market value rises from $500,000 to $540,000.',
        annotation: 'The market increase can coexist with the tax deduction.',
      },
      {
        label: 'Incorrect inference',
        value: 'Property must now be worth $488,000 because $12,000 was deducted.',
        annotation:
          "Subtracting tax cost recovery from last year's market value confuses two measurement systems.",
      },
    ],
    conclusion:
      'Tax depreciation allocates qualifying basis. Appraisal depreciation measures loss relative to current improvement cost; neither equals an automatic annual reduction in total market value.',
    caption:
      'Actual tax calculations require the applicable system, eligibility, basis, and conventions, including the mid-month convention for the first and last years. Land is not depreciated for federal income tax purposes.',
  },
  {
    id: 'exp-income-contract-rent-rights',
    lessonSlug: 'valuation-income-analysis',
    afterSection: 'income-creates-an-investment-rationale',
    title: 'A higher market rent does not rewrite the existing lease',
    objective:
      'Distinguish contract income from market rent and connect the selected rent to the interest and assignment being valued.',
    sourceUrls: [basic, rule8],
    kind: 'document',
    documentTitle: 'Income rights file: fictional leased building',
    context:
      'Assume a valid five-year lease with no current right to reset the stated rent. The example does not determine a residential rent-control issue.',
    fields: [
      {
        label: 'Enforceable contract',
        value: '$3,000 per month for the stated remaining term.',
        annotation: 'Annual contract rent is $36,000 before other income, losses, and expenses.',
      },
      {
        label: 'Comparable market evidence',
        value: '$4,000 per month for equivalent newly leased space.',
        annotation:
          'Annual market rent is $48,000. This evidence does not itself amend the existing lease.',
      },
      {
        label: 'Leased-fee question',
        value: "Value the owner's interest subject to this lease.",
        annotation:
          'Address the actual contractual rights and expected benefits rather than pretending immediate collection is $48,000.',
      },
      {
        label: 'Property-tax question',
        value: 'Apply the specific unencumbered-income framework in BOE Rule 8.',
        annotation:
          'That assignment can call for market-based income despite the lease. It answers a different defined value problem.',
      },
    ],
    conclusion:
      'First identify the property interest and value standard. Then choose the income assumptions they require.',
    caption:
      'Contract rent, market rent, and a stabilized forecast are not interchangeable labels for the largest number available.',
  },
  {
    id: 'exp-income-normalize-owner-statement',
    lessonSlug: 'valuation-income-analysis',
    afterSection: 'stabilize-income-without-inventing-it',
    title: 'Remove a one-time receipt and recognize ongoing management',
    objective:
      'Normalize a stated operating result for a nonrecurring receipt and a separately supported market-management expense.',
    sourceUrls: [basic, advanced],
    kind: 'calculation',
    rows: [
      { label: "Seller's reported operating result, including a one-time refund", amount: 104000 },
      { label: 'Remove the nonrecurring insurance refund included above', amount: -4000 },
      {
        label: 'Recognize supported annual management cost omitted for owner labor',
        amount: -8000,
      },
    ],
    result: {
      label: 'Stabilized annual NOI under the stated convention',
      amount: 92000,
      detail:
        '$104,000 - $4,000 - $8,000 = $92,000. Assume vacancy and every other expense, including property taxes, are already properly reflected.',
    },
    caption:
      "This forecast assumes the refund will not recur and prudent management requires the stated expense. It does not deduct $8,000 twice or claim every owner's reported expense must be replaced by a generic average.",
  },
  {
    id: 'exp-income-property-tax-rate-consistency',
    lessonSlug: 'valuation-income-analysis',
    afterSection: 'build-the-operating-statement',
    title: 'Account for property tax in the income or the rate, consistently',
    objective:
      "Distinguish the chapter's market-investment NOI convention from a stipulated BOE property-tax capitalization example.",
    sourceUrls: [rule8, basic],
    kind: 'document',
    documentTitle: 'Matched capitalization methods: fictional worksheet',
    context:
      'Assume $100,000 annual income after all expenses except property tax, a 4% base capitalization rate, and a stipulated 1% value-based property-tax component with a 100% assessment ratio. No fixed assessments or other differences apply.',
    fields: [
      {
        label: 'Property-tax method',
        value: '$100,000 / (0.04 + 0.01) = $2,000,000.',
        annotation:
          'The tax is represented through the rate component rather than deducted from this income figure.',
      },
      {
        label: 'Consistent tax expense',
        value: '$2,000,000 x 1% = $20,000.',
        annotation:
          'This is the property-tax amount consistent with the stipulated value-based model.',
      },
      {
        label: 'Market-investment check',
        value: '($100,000 - $20,000) / 0.04 = $2,000,000.',
        annotation:
          'Deduct the same tax in NOI and use the rate that excludes its separate tax component.',
      },
      {
        label: 'Double-counted version',
        value: '$80,000 / 0.05 = $1,600,000.',
        annotation:
          'This incorrect combination subtracts the tax and then loads the rate for it again.',
      },
    ],
    conclusion:
      'Pair income and rate definitions. The correct arithmetic depends on a consistent treatment of the same expense.',
    caption:
      "The 1% is a hypothetical input, not a claim about any parcel's actual tax bill or effective rate. This illustration does not calculate Proposition 13 assessed value.",
  },
  {
    id: 'exp-income-noi-rate-value-lines',
    lessonSlug: 'valuation-income-analysis',
    afterSection: 'measure-the-value-effect-of-a-recurring-change',
    title: 'The value of another dollar of NOI depends on the rate',
    objective:
      'Compare the value effect of recurring NOI changes at two independently held capitalization rates.',
    sourceUrls: [basic, dre],
    kind: 'chart',
    xAxis: { label: 'Stabilized annual NOI', format: 'currency' },
    yAxis: { label: 'Direct-capitalization value', format: 'currency' },
    series: [
      {
        label: '6% capitalization rate',
        points: [
          { x: 60000, y: 1000000 },
          { x: 72000, y: 1200000 },
          { x: 84000, y: 1400000 },
        ],
      },
      {
        label: '8% capitalization rate',
        points: [
          { x: 60000, y: 750000 },
          { x: 72000, y: 900000 },
          { x: 84000, y: 1050000 },
        ],
      },
    ],
    conclusion:
      'A sustainable $12,000 NOI increase adds $200,000 at 6%, but $150,000 at 8%. Divide the recurring change by the rate rather than treating income and value as dollar-for-dollar.',
    caption:
      'Each line holds its rate constant and uses consistent annual NOI. A one-time $12,000 refund is not the recurring increase plotted here. Both income and rate require market support; the graph is not a forecast.',
  },
  {
    id: 'exp-income-discount-separated-receipts',
    lessonSlug: 'valuation-income-analysis',
    afterSection: 'recognize-the-time-value-of-money',
    title: 'Discount each receipt for its own waiting period',
    objective:
      'Compute the present value of two finite future receipts instead of using a perpetual-income capitalization formula.',
    sourceUrls: [dre, advanced],
    kind: 'timeline',
    premise:
      'A fictional investment right produces exactly two net receipts and then ends. The stipulated annual discount rate is 10%; there are no other payments or residual interests.',
    events: [
      {
        label: 'Valuation date',
        when: 'Today',
        detail: 'Discount each promised net receipt back to this date using its own waiting period.',
      },
      {
        label: 'First receipt',
        when: 'End of year 1',
        detail: '$110,000 / 1.10 = $100,000 present value.',
      },
      {
        label: 'Final receipt',
        when: 'End of year 2',
        detail:
          '$121,000 / (1.10 x 1.10) = $100,000 present value. Any final proceeds are included in this stipulated receipt.',
      },
    ],
    conclusion:
      'Today\'s value is $100,000 + $100,000 = $200,000. The undiscounted $231,000 sum ignores timing; dividing it by 10% would misuse a capitalization shortcut for this finite claim.',
    caption:
      'The rate is an assumed discount rate, not a loan rate or a promise of return. A property DCF would also need all relevant operating flows, outlays, and net reversion without double counting.',
  },
  {
    id: 'exp-income-grm-period-matching',
    lessonSlug: 'valuation-income-analysis',
    afterSection: 'gross-rent-and-gross-income-multipliers',
    title: 'Monthly and annual multipliers give the same value when matched',
    objective:
      'Derive and apply monthly and annual gross-rent multipliers without mixing their periods.',
    sourceUrls: [dre, rule8],
    kind: 'document',
    documentTitle: 'Gross-rent multiplier worksheet: fictional comparable',
    context:
      'Assume comparable rights, rent definitions, vacancy, expense structures, and market conditions; the exercise supplies a usable $840,000 sale with $5,000 monthly gross rent.',
    fields: [
      {
        label: 'Monthly multiplier',
        value: '$840,000 / $5,000 = 168.',
        annotation: 'The ratio is 168 times monthly rent, not 168%.',
      },
      {
        label: 'Annual multiplier',
        value: '$840,000 / ($5,000 x 12) = 14.',
        annotation: 'Annual gross rent is $60,000; the corresponding annual multiplier is 14.',
      },
      {
        label: 'Subject, monthly route',
        value: '$5,500 x 168 = $924,000.',
        annotation: "The subject's monthly rent matches the multiplier's monthly period.",
      },
      {
        label: 'Subject, annual route',
        value: '($5,500 x 12) x 14 = $924,000.',
        annotation: 'Annual rent of $66,000 produces the same indication.',
      },
      {
        label: 'Period mismatch',
        value: '$5,500 x 14 = $77,000.',
        annotation:
          'This wrong result combines monthly rent with an annual multiplier and is twelve times too low.',
      },
    ],
    conclusion:
      'Write the period beside both rent and multiplier. Multipliers are ratios, not cap rates.',
    caption:
      'A well-labeled multiplication is still only as reliable as the comparable income and expense structures behind the multiplier.',
  },
  {
    id: 'exp-income-lease-expense-comparison',
    lessonSlug: 'valuation-income-analysis',
    afterSection: 'compare-equal-gross-income-with-unequal-costs',
    title: 'Equal collected income can buy different operating results',
    objective:
      'Identify why different lease expense obligations limit a comparison based on gross income alone.',
    sourceUrls: [basic, advanced],
    kind: 'comparison',
    columns: [
      {
        label: 'Building A',
        points: [
          'Annual effective gross income: $200,000.',
          'Owner operating expenses, including property taxes: $80,000. Tenants separately bear stated utility obligations.',
          'NOI: $120,000. At the assumed 6% rate, value is $2,000,000.',
        ],
      },
      {
        label: 'Building B',
        points: [
          'Annual effective gross income: $200,000.',
          'Owner operating expenses: $110,000, including the additional $30,000 utility obligation.',
          'NOI: $90,000. At the same assumed 6% rate, value is $1,500,000.',
        ],
      },
    ],
    caption:
      'Assume the same risk, capitalization convention, and all other relevant characteristics. The $30,000 recurring NOI difference indicates $500,000 of value difference; matching gross receipts did not match lease economics.',
  },
  {
    id: 'exp-income-cash-return-and-coverage',
    lessonSlug: 'valuation-income-analysis',
    afterSection: 'debt-coverage-and-cash-return-answer-different-questions',
    title: 'Cash return and debt coverage use different denominators',
    objective:
      'Calculate before-tax cash-on-cash return and DSCR from the same investment without omitting stated initial costs or confusing cash with equity growth.',
    sourceUrls: [advanced],
    kind: 'document',
    documentTitle: 'Investor worksheet: fictional first full operating year',
    context:
      'Assume NOI follows the market-investment convention, property taxes are included in operating expenses, and the stated annual capital outlay is shown after NOI. No other owner cash adjustments apply.',
    fields: [
      {
        label: 'Property and debt',
        value: 'Annual NOI $96,000; annual principal-and-interest payments $72,000.',
        annotation: "Financing does not reduce the property's $96,000 NOI.",
      },
      {
        label: 'Spendable before-tax cash',
        value: '$96,000 - $72,000 - $6,000 additional capital outlay = $18,000.',
        annotation:
          'The outlay is stipulated after NOI for this cash-return measure; do not deduct it twice.',
      },
      {
        label: 'Initial cash invested',
        value:
          '$300,000 down payment + $10,000 acquisition costs + $50,000 initial improvements = $360,000.',
        annotation: 'The problem includes all three in its cash-investment denominator.',
      },
      {
        label: 'Cash-on-cash return',
        value: '$18,000 / $360,000 = 5%.',
        annotation:
          'Using only the down payment would produce 6%, but it would omit two expressly included cash investments.',
      },
      {
        label: 'Debt service coverage',
        value: '$96,000 / $72,000 = 1.33, rounded.',
        annotation:
          'This stated DSCR uses NOI, not the $18,000 after-debt cash amount. No universal lender approval threshold is assumed.',
      },
      {
        label: 'Principal reduction',
        value: 'Assume $10,000 of the $72,000 debt service repays principal.',
        annotation:
          'That can increase equity, but it is not another $10,000 of distributed cash to add to this cash-on-cash numerator.',
      },
    ],
    conclusion:
      'Label the numerator and denominator before dividing: property income covers debt; owner cash flow earns a cash return on invested cash.',
    caption:
      'These ratios do not include a later sale, appreciation, or income-tax effects. A broader total-return analysis is a different calculation.',
  },
  {
    id: 'exp-income-leveraged-equity-sensitivity',
    lessonSlug: 'valuation-income-analysis',
    afterSection: 'analyze-the-owners-investment',
    title: 'The same property movement has a larger effect on leveraged equity',
    objective:
      "Calculate how a fixed debt balance magnifies gains and losses relative to the investor's initial equity.",
    sourceUrls: [advanced],
    kind: 'chart',
    xAxis: { label: 'Property value change', format: 'percent' },
    yAxis: { label: 'Change in initial equity', format: 'percent' },
    series: [
      {
        label: 'No debt: $1,000,000 initial equity',
        points: [
          { x: -10, y: -10 },
          { x: 0, y: 0 },
          { x: 10, y: 10 },
        ],
      },
      {
        label: '$800,000 debt: $200,000 initial equity',
        points: [
          { x: -10, y: -50 },
          { x: 0, y: 0 },
          { x: 10, y: 50 },
        ],
      },
    ],
    conclusion:
      'A decline from $1,000,000 to $900,000 leaves $100,000 equity after the unchanged $800,000 debt: a 50% equity loss. A rise to $1,100,000 instead leaves $300,000 equity: a 50% gain.',
    caption:
      'Assume the debt stays fixed and ignore operating cash flow, amortization, taxes, and transaction costs. This isolates equity sensitivity, not total investment return or spendable cash.',
  },
]
