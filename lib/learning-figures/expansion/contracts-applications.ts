import type { LearningFigureSpec } from '../types'

const code = (law: string, section: string) =>
  `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=${law}&sectionNum=${section}.`
const contracts = 'https://www.dre.ca.gov/files/pdf/refbook/ref06.pdf'
const leasing = 'https://www.dre.ca.gov/files/pdf/refbook/ref09.pdf'
const finance = 'https://www.dre.ca.gov/files/pdf/refbook/ref12.pdf'
const buyerRules =
  'https://dre.ca.gov/files/pdf/relaw/2025/AB2992_Title_10_CalCodeofRegs29061_29063.pdf'
const advanceFees = 'https://www.dre.ca.gov/files/pdf/adv_fees_essential_elements.pdf'

export const contractsApplicationFigures: LearningFigureSpec[] = [
  {
    id: 'exp-formation-two-lot-assent',
    lessonSlug: 'contracts-formation',
    afterSection: 'consent-is-more-than-a-matching-number',
    kind: 'parcel',
    title: 'The same price can describe two different bargains',
    objective:
      'Locate a material property-scope mismatch before inferring mutual assent from matching prices.',
    sourceUrls: [code('CIV', '1550'), code('CIV', '1636')],
    extent: { width: 120, height: 80 },
    unit: 'schematic',
    areas: [
      {
        key: 'A',
        label: 'Lot 8: house',
        x: 0,
        y: 0,
        width: 75,
        height: 80,
        pattern: 'clear',
        description:
          'The seller proposes $540,000 for Lot 8 only. Both parties know the house lies here.',
      },
      {
        key: 'B',
        label: 'Lot 9: detached workshop',
        x: 75,
        y: 0,
        width: 45,
        height: 80,
        pattern: 'hatch',
        description:
          'The buyer proposes $540,000 for Lots 8 and 9. The workshop is on the separately identified adjacent lot.',
      },
    ],
    conclusion:
      'A shared $540,000 number does not reconcile one lot with two. Clarify the property and obtain agreement to the same terms; do not silently replace the description.',
    caption:
      'Fictional negotiation before agreement, not a survey. A later dispute over an already signed writing requires interpretation and any applicable mistake analysis.',
  },
  {
    id: 'exp-formation-minor-title-capacity',
    lessonSlug: 'contracts-formation',
    afterSection: 'the-four-essentials',
    kind: 'decision',
    title: 'Owning the lot does not answer who can contract',
    objective:
      'Distinguish an unemancipated minor owning inherited land from capacity to sell or delegate a sale.',
    sourceUrls: [code('FAM', '6701'), code('FAM', '7050'), contracts],
    question: 'A 17-year-old owns inherited land. What changes the capacity analysis?',
    branches: [
      {
        label: 'Unemancipated; signs personally',
        detail: 'Ownership is established, but no legally authorized representative is acting.',
        outcome:
          'Section 6701 bars the minor from independently making this real-property contract.',
      },
      {
        label: 'Unemancipated; signs a power of attorney',
        detail: 'The proposed workaround is to delegate the same decision to an adult.',
        outcome:
          'Section 6701 also bars that delegation; changing the signer does not supply valid authority.',
      },
      {
        label: 'Legally emancipated',
        detail:
          'The emancipation and identity are verified; other contract elements remain necessary.',
        outcome:
          'Section 7050 gives adult capacity for the specified contracting and property acts.',
      },
    ],
    caption:
      'Age is not a complete title search or a substitute for verifying representative authority. An authorized court-supervised transaction is a different factual case.',
  },
  {
    id: 'exp-formation-deposit-three-events',
    lessonSlug: 'contracts-formation',
    afterSection: 'promises-performance-and-deposits',
    kind: 'timeline',
    title: 'Formation, deposit delivery, and completed performance',
    objective:
      'Separate exchanged promises from a later deposit duty and distinguish signed from fully performed.',
    sourceUrls: [code('CIV', '1605'), contracts],
    premise:
      'Assume capable parties, lawful terms, valid signed acceptance and delivery, and no clause making deposit receipt a condition of formation.',
    events: [
      {
        when: 'Monday',
        label: 'Promises become binding',
        detail:
          'The buyer promises the price and the seller promises conveyance. Their exchange supplies consideration; the contract remains executory.',
      },
      {
        when: 'Thursday',
        label: 'Agreed deposit becomes due',
        detail:
          'The buyer misses this contractual payment date. Analyze breach, notice, and remedies under the agreement, not an automatic absence of consideration.',
      },
      {
        when: 'Later closing',
        label: 'Performance may be completed',
        detail:
          'If the deposit issue is resolved and all promised duties are fulfilled, the contract becomes executed in the performance sense.',
      },
    ],
    conclusion:
      'A signed contract can still be executory. A later missed deposit does not retroactively prove that no promises were exchanged.',
    caption:
      'The dates are fictional contract terms, not a universal statutory deposit schedule. An express formation condition would require a different analysis.',
  },
  {
    id: 'exp-formation-llc-signature-file',
    lessonSlug: 'contracts-formation',
    afterSection: 'a-signature-must-identify-whose-promise-it-is',
    kind: 'document',
    title: "An LLC name is not proof of the signer's authority",
    objective:
      'Read entity status and representative capacity together instead of assuming every LLC member can bind it.',
    sourceUrls: [code('CORP', '17703.01'), code('CIV', '1624')],
    documentTitle: 'Proposed purchase / Authority review',
    context:
      'Fictional educational excerpt, not for execution. The recipient knows the facts below; no separate delegation, ratification, or other authority exists.',
    fields: [
      {
        label: 'Named buyer',
        value: 'Juniper Example LLC',
        annotation:
          'The intended buyer is the entity, not simply the individual sending the offer.',
      },
      {
        label: 'Articles',
        value: 'Manager-managed LLC',
        annotation: 'This fact changes what membership alone establishes under section 17703.01.',
      },
      {
        label: 'Signature',
        value: 'Avery, member',
        annotation:
          'Avery is not a manager and acts solely as a member. Membership alone does not confer agency power in this manager-managed LLC.',
      },
      {
        label: 'Missing evidence',
        value: 'Authority to bind the named buyer',
        annotation:
          'Obtain legally sufficient authority and correct capacity documentation before relying on the proposed obligation.',
      },
    ],
    conclusion:
      'A complete signature block must reflect actual authority, not create it by a label. Manager signatures and third-party knowledge have their own statutory rules.',
    caption:
      'This isolates a member acting solely as a member. It does not imply that every LLC transaction requires the same number or type of signatures.',
  },
  {
    id: 'exp-formation-receipt-before-acceptance',
    lessonSlug: 'contracts-formation',
    afterSection: 'revocation-and-an-option',
    kind: 'timeline',
    title: "The withdrawal's arrival matters more than its draft time",
    objective:
      'Resolve a revocable-offer sequence using the expressly required receipt of acceptance.',
    sourceUrls: [code('CIV', '1582'), code('CIV', '1587')],
    premise:
      'An ordinary revocable buyer offer requires signed acceptance to reach the buyer by 5 p.m. No option, earlier effective acceptance, or other exception applies.',
    events: [
      {
        when: '4:40 p.m.',
        label: 'Buyer drafts a withdrawal',
        detail: 'A private draft does not communicate the withdrawal to the seller.',
      },
      {
        when: '4:50 p.m.',
        label: 'Seller signs an unchanged acceptance',
        detail: "Signature alone does not satisfy this offer's express receipt requirement.",
      },
      {
        when: '4:52 p.m.',
        label: 'Seller receives the withdrawal',
        detail:
          'The revocation is communicated before acceptance has become effective under the stipulated method.',
      },
      {
        when: '4:56 p.m.',
        label: 'Acceptance reaches the buyer',
        detail: 'The timely-by-5-p.m. arrival is nevertheless after the offer was revoked.',
      },
    ],
    conclusion:
      'Under these facts, there is no acceptance of an open offer. Change the receipt order or add a binding option and the conclusion may change.',
    caption:
      'All times and receipt conditions are stipulated. Do not impose this particular receipt rule on every form or apply a dispatch rule despite contrary offer terms.',
  },
  {
    id: 'exp-formation-inquiry-or-condition',
    lessonSlug: 'contracts-formation',
    afterSection: 'reconstruct-the-negotiation',
    kind: 'comparison',
    title: 'One changed sentence can keep or replace the offer',
    objective:
      'Distinguish a nonrejecting negotiation inquiry from a qualified acceptance requiring new assent.',
    sourceUrls: [code('CIV', '1585'), contracts],
    columns: [
      {
        label: 'Inquiry only',
        points: [
          'Buyer offers $610,000 with a 30-day close.',
          'Seller asks whether a 25-day close would be possible, expressly leaving the offer under consideration.',
          'The question alone need not reject the original proposal; no acceptance has yet been made.',
        ],
      },
      {
        label: 'Acceptance conditioned on change',
        points: [
          'The same $610,000 offer remains the starting point.',
          'Seller signs only on condition of a 25-day close.',
          "This is a new proposal. Matching price and a signature do not supply the buyer's assent to the changed term.",
        ],
      },
      {
        label: 'Unchanged acceptance',
        points: [
          'Seller accepts the original 30-day closing terms without qualification.',
          'The acceptance is communicated by the authorized method while the offer is open.',
          'Assuming all other essentials, the original bargain is accepted.',
        ],
      },
    ],
    caption:
      'Context controls. The comparison deliberately states whether the response insists on a change, rather than treating every negotiating question as a counteroffer.',
  },
  {
    id: 'exp-formation-lease-two-writing-tests',
    lessonSlug: 'contracts-formation',
    afterSection: 'the-writing-requirements',
    kind: 'document',
    title: 'A 12-month lease can still need a writing',
    objective:
      'Apply both the lease-duration test and the one-year-from-making test to a deferred-start agreement.',
    sourceUrls: [code('CIV', '1624')],
    documentTitle: 'Lease proposal / Date audit',
    context:
      'Fictional educational excerpt, not for execution. Assume no applicable exception and no contractual possibility of completing the promised term earlier.',
    fields: [
      {
        label: 'Agreement made',
        value: 'January 1, 2027',
        annotation:
          'Section 1624(a)(1) measures the performance period from making the agreement, not from moving in.',
      },
      {
        label: 'Possession term',
        value: 'July 1, 2027 through June 30, 2028',
        annotation:
          'The lease term is 12 months, so duration alone is not longer than one year under section 1624(a)(3).',
      },
      {
        label: 'Last required performance',
        value: 'June 30, 2028',
        annotation:
          'The stated term cannot be fully performed within a year of January 1, 2027. The independent one-year rule applies.',
      },
      {
        label: 'Required evidence',
        value: 'Sufficient writing signed by the party to be charged',
        annotation: 'A 12-month label does not defeat the separate timing rule.',
      },
    ],
    conclusion:
      'Measure both intervals: length of occupancy and time from agreement to completed performance. The latter exceeds one year here.',
    caption:
      'A lease beginning immediately presents different timing facts. This example does not decide every writing requirement or exception for a real lease.',
  },
  {
    id: 'exp-formation-electronic-evidence-chain',
    lessonSlug: 'contracts-formation',
    afterSection: 'the-writing-requirements',
    kind: 'document',
    title: 'Electronic does not mean informal or unprovable',
    objective:
      'Separate a retained authenticated electronic agreement from an ephemeral message lacking statutory confirmation.',
    sourceUrls: [code('CIV', '1633.7'), code('CIV', '1624')],
    documentTitle: 'Electronic purchase file / Evidence inventory',
    context:
      'Fictional educational excerpt, not for execution. Assume the parties validly agree to electronic dealing and the transaction permits it.',
    fields: [
      {
        label: 'Permanent record',
        value: 'Retained agreement with complete negotiated terms',
        annotation: 'A durable record is different from a disappearing chat about a possible deal.',
      },
      {
        label: 'Signing evidence',
        value: 'Identified signers intentionally adopt their electronic signatures',
        annotation:
          'The electronic medium does not dispense with intent, identity, authority, or authentication.',
      },
      {
        label: 'Communication evidence',
        value: "Receipt record under the offer's stated method",
        annotation:
          'Proving who signed is not the same as proving when acceptance became effective.',
      },
      {
        label: 'Changed fact',
        value: 'Only an ephemeral text remains; no required written confirmation',
        annotation:
          'Section 1624(d) makes that ephemeral message insufficient to constitute the real-property conveyance contract under its rule.',
      },
    ],
    conclusion:
      'Electronic records can satisfy writing and signature rules; they do not cure missing terms, authority, or required communications.',
    caption:
      'The special ephemeral-message rule is not a claim that every email or every electronic real estate contract is invalid.',
  },
  {
    id: 'exp-formation-integration-evidence-purpose',
    lessonSlug: 'contracts-formation',
    afterSection: 'interpret-the-entire-document',
    kind: 'decision',
    title: 'Ask what the outside evidence is being offered to prove',
    objective:
      'Distinguish contradicting integrated terms from proving fraud or interpreting ambiguity.',
    sourceUrls: [code('CCP', '1856'), code('CIV', '1641')],
    question:
      'The parties intended the signed writing as their final, complete agreement. Why is a prior conversation being offered?',
    branches: [
      {
        label: 'To contradict a clear exclusion',
        detail:
          'The writing expressly excludes a movable freezer, but the buyer offers an earlier oral promise that it was included.',
        outcome:
          'The integration rule generally prevents using that prior promise to contradict the final term, absent an applicable exception.',
      },
      {
        label: 'To establish fraudulent inducement',
        detail: 'The claim is that the seller used an intentional material lie to obtain assent.',
        outcome:
          'Section 1856 does not categorically exclude evidence offered to establish fraud. Integration is not automatic immunity.',
      },
      {
        label: 'To explain an ambiguity',
        detail: 'The disputed wording is reasonably susceptible to competing meanings in context.',
        outcome:
          'Relevant interpretive evidence can have a different role from adding a contradictory bargain. The court determines admissibility and interpretation.',
      },
    ],
    caption:
      'A signed amendment is another distinct issue: it is a later agreed change, not merely a prior oral negotiation. Litigation exceptions do not replace accurate drafting.',
  },
  {
    id: 'exp-performance-loan-effort-and-condition',
    lessonSlug: 'contracts-performance-and-remedies',
    afterSection: 'a-signed-contract-begins-a-sequence',
    kind: 'document',
    title: 'A loan clause can contain both a promise and a condition',
    objective:
      'Separate required application efforts from a financing outcome and its stated cancellation procedure.',
    sourceUrls: [code('CIV', '1638'), contracts],
    documentTitle: 'Financing clause / Selected obligations',
    context:
      'Original educational excerpt, not for execution. The cancellation terms below are expressly assumed, not universal form language.',
    fields: [
      {
        label: 'Buyer promise',
        value: 'Apply by May 3 and diligently supply requested information',
        annotation:
          'This is conduct the buyer undertakes to perform; it is not merely an optional financing goal.',
      },
      {
        label: 'Financing condition',
        value: 'Obtain the specified loan commitment by May 20',
        annotation: 'The stated event affects the duty to proceed, subject to the complete clause.',
      },
      {
        label: 'Contractual choice',
        value: 'Timely written cancellation if the condition fails despite required efforts',
        annotation:
          'The buyer must use the agreed procedure; failure of the event is not the same as sending the required notice.',
      },
      {
        label: 'Changed fact',
        value: 'Buyer never applies and withholds requested income records',
        annotation:
          'The failed loan does not erase a separate failure to perform the promised efforts.',
      },
    ],
    conclusion:
      'Identify the promised action, the conditional event, and the authorized response separately before calling the outcome breach or valid cancellation.',
    caption:
      'A disappointing underwriting result after diligent performance is not the same conduct as deliberately failing to seek the loan.',
  },
  {
    id: 'exp-performance-retained-contingency-scope',
    lessonSlug: 'contracts-performance-and-remedies',
    afterSection: 'different-contingencies-can-produce-different-answers',
    kind: 'decision',
    title: 'A lower appraisal is not always a failed loan condition',
    objective:
      'Apply the exact retained financing condition after a separate appraisal contingency has been removed.',
    sourceUrls: [code('CIV', '1638'), code('CIV', '1641')],
    question:
      'Price is $720,000. The appraisal contingency was validly removed. The retained clause requires a $500,000 loan on specified terms; all other terms and timely procedures are satisfied. What does the available loan establish?',
    branches: [
      {
        label: '$510,000 available',
        detail:
          'The lender offers the required $500,000 on the agreed terms despite an appraisal below the price.',
        outcome:
          'A low appraisal alone does not establish failure of this retained $500,000 financing condition.',
      },
      {
        label: 'Only $480,000 available',
        detail:
          "Despite the buyer's required efforts, no lender will supply the specified amount by the deadline.",
        outcome:
          'The $20,000 loan shortfall requires analysis under the retained financing clause and its cancellation process.',
      },
      {
        label: 'Buyer requests a reduction',
        detail: 'The buyer requests a reduction but the seller has not agreed.',
        outcome:
          'The request does not itself change the contract price or restore the removed appraisal right.',
      },
    ],
    caption:
      'These are stipulated clause terms, not a declaration that all financing contingencies work alike. A loan amount, appraisal target, and price amendment answer different questions.',
  },
  {
    id: 'exp-performance-extension-unmoved-dates',
    lessonSlug: 'contracts-performance-and-remedies',
    afterSection: 'modification-waiver-and-informal-extensions',
    kind: 'timeline',
    title: 'Moving closing does not move every date',
    objective: 'Read a limited signed extension with unchanged deposit and investigation duties.',
    sourceUrls: [code('CIV', '1698'), code('CIV', '1641')],
    premise:
      'On May 5, both parties sign an amendment changing only the closing date from May 20 to May 30; it expressly leaves all other dates unchanged.',
    events: [
      {
        when: 'May 6',
        label: 'Additional deposit still due',
        detail: 'The original $8,000 deposit-increase duty remains on May 6, not May 16.',
      },
      {
        when: 'May 12',
        label: 'Investigation election still due',
        detail:
          'The limited closing amendment does not extend this separate investigation deadline.',
      },
      {
        when: 'May 20',
        label: 'Former closing date',
        detail: 'This is the particular performance date the agreed amendment replaced.',
      },
      {
        when: 'May 30',
        label: 'Revised closing date',
        detail:
          'Apply the new date while separately checking loan expiration, possession, and other unamended terms.',
      },
    ],
    conclusion:
      'The contract now contains one moved date and two unchanged dates. Do not apply a blanket ten-day extension that the parties did not grant.',
    caption:
      'This assumes a valid signed amendment and no additional waiver or estoppel facts. Informal changes require their own section 1698 analysis.',
  },
  {
    id: 'exp-performance-novation-release-evidence',
    lessonSlug: 'contracts-performance-and-remedies',
    afterSection: 'assignment-is-not-release',
    kind: 'document',
    title: 'Find the release, not just the replacement name',
    objective:
      'Identify the extra agreement that changes an assignment into a debtor-substitution novation.',
    sourceUrls: [code('CIV', '1457'), code('CIV', '1531')],
    documentTitle: 'Buyer substitution / Two alternative files',
    context:
      'Original educational excerpts, not for execution. Assume all necessary parties have capacity and each described agreement is valid.',
    fields: [
      {
        label: 'Original obligation',
        value: 'Buyer Ari owes performance to Seller Bailey',
        annotation: 'Start with the actual contractual obligor before examining the replacement.',
      },
      {
        label: 'File A',
        value: "Casey accepts assignment; seller permits assignment but preserves Ari's liability",
        annotation:
          'Permission for another buyer to perform is not a release. Ari remains an obligor under these terms.',
      },
      {
        label: 'File B',
        value: 'All required parties agree Casey replaces Ari and Ari is released',
        annotation:
          'The agreed substitution and intent to release distinguish this novation from File A.',
      },
      {
        label: 'Escrow worksheet',
        value: 'Buyer name changed to Casey',
        annotation:
          'The administrative change alone proves neither the required agreement nor release of Ari.',
      },
    ],
    conclusion:
      'A replacement performer, a consent to assignment, and an agreement releasing the original debtor are different evidence.',
    caption:
      'The excerpts isolate liability, not the enforceability of a particular assignment restriction or a complete novation instrument.',
  },
  {
    id: 'exp-performance-restoration-benefits-ledger',
    lessonSlug: 'contracts-performance-and-remedies',
    afterSection: 'rescission-and-restitution',
    kind: 'ledger',
    title: 'Restoration may include benefits received before closing',
    objective:
      'Reconcile an agreed unwinding that returns both a buyer payment and a benefit received during early possession.',
    sourceUrls: [code('CIV', '1691'), code('CIV', '1689')],
    account: 'Agreed restoration / Buyer-side cash',
    openingBalance: 0,
    entries: [
      { label: "Seller returns buyer's price payment", received: 18000, paid: 0, balance: 18000 },
      {
        label: 'Buyer restores rents collected during early possession',
        received: 0,
        paid: 2400,
        balance: 15600,
      },
    ],
    conclusion:
      'The cash return nets $15,600, but the buyer must also return possession as agreed. The deposit alone did not describe everything to unwind.',
    caption:
      'Assume a valid mutual rescission, an agreed $2,400 rent restoration, and no other expenses, damages, or offsets. This is not a universal court-awarded formula; section 1691 has procedural qualifications.',
  },
  {
    id: 'exp-performance-release-scope-document',
    lessonSlug: 'contracts-performance-and-remedies',
    afterSection: 'cancellation-instructions-and-releases',
    kind: 'document',
    title: 'A deposit instruction is not automatically a complete settlement',
    objective:
      'Read disbursement authority, claim release, and unknown-claim language as separate legal effects.',
    sourceUrls: [code('CIV', '1057.3'), code('CIV', '1542'), code('CIV', '1638')],
    documentTitle: 'Cancellation package / Scope comparison',
    context:
      'Original educational excerpts, not for execution. Neither excerpt is a complete release or recommended settlement language.',
    fields: [
      {
        label: 'Disbursement instruction',
        value: 'Pay $9,000 to buyer and $6,000 to seller',
        annotation:
          'The $15,000 allocation tells escrow where the agreed funds go; it does not by itself resolve every theory of liability.',
      },
      {
        label: 'Narrow settlement',
        value: 'Deposit claims resolved; the specified repair claim is reserved',
        annotation:
          'An express reservation preserves the identified issue rather than silently settling it with the deposit.',
      },
      {
        label: 'Broader proposed release',
        value: 'Separate language seeks release of additional transaction claims',
        annotation:
          'This changes the scope of the bargain. It warrants informed review, not treatment as a routine receipt.',
      },
      {
        label: 'Unknown claims',
        value: 'Check any express treatment of Civil Code 1542',
        annotation:
          'The statute protects specified unknown or unsuspected claims. A purported waiver requires its own careful analysis.',
      },
    ],
    conclusion:
      'First identify authority to distribute the money; then identify which claims are actually being surrendered. One signature packet can contain both decisions.',
    caption:
      'Escrow does not adjudicate a disputed entitlement. A mutual fund allocation and a substantive release should not be inferred from each other.',
  },
  {
    id: 'exp-performance-fixed-deposit-threshold-chart',
    lessonSlug: 'contracts-performance-and-remedies',
    afterSection: 'the-residential-deposit-distinction',
    kind: 'chart',
    title: 'The same deposit crosses the threshold as price changes',
    objective:
      'Compare a fixed actual payment with 3% of different prices and identify which party bears the reasonableness burden.',
    sourceUrls: [code('CIV', '1675'), code('CIV', '1677')],
    xAxis: { label: 'Purchase price', format: 'currency' },
    yAxis: { label: 'Deposit or threshold', format: 'currency' },
    series: [
      {
        label: 'Three percent of price',
        points: [
          { x: 600000, y: 18000 },
          { x: 700000, y: 21000 },
          { x: 800000, y: 24000 },
          { x: 900000, y: 27000 },
        ],
      },
      {
        label: 'Amount actually paid',
        points: [
          { x: 600000, y: 24000 },
          { x: 700000, y: 24000 },
          { x: 800000, y: 24000 },
          { x: 900000, y: 24000 },
        ],
      },
    ],
    conclusion:
      'At $600,000 and $700,000 the payment exceeds 3%, so the party upholding the clause must establish reasonableness. At $800,000 and $900,000 it does not exceed 3%, so the buyer must establish unreasonableness under the ordinary rule.',
    caption:
      'Assume a qualifying intended owner-occupied one-to-four-unit purchase, one payment, and compliant formalities; exclude the special initial-condominium rule. The lines are arithmetic, not guaranteed recoveries. Default, cancellation rights, and enforceability still matter.',
  },
  {
    id: 'exp-performance-later-deposit-initials',
    lessonSlug: 'contracts-performance-and-remedies',
    afterSection: 'the-residential-deposit-distinction',
    kind: 'document',
    title: 'A later deposit needs its own liquidated-damages treatment',
    objective:
      'Apply section 1678 to a second payment instead of automatically applying the first provision to every later deposit.',
    sourceUrls: [code('CIV', '1675'), code('CIV', '1677'), code('CIV', '1678')],
    documentTitle: 'Deposit file / First and later payments',
    context:
      'Original educational excerpt, not for execution. A qualifying owner-occupied $700,000 purchase has no special initial-condominium facts.',
    fields: [
      {
        label: 'First payment',
        value: '$12,000 actually paid',
        annotation:
          'Assume its liquidated-damages provision is separately initialed by each party and meets the statutory print requirement.',
      },
      {
        label: 'Later payment',
        value: '$9,000 actually paid',
        annotation:
          'The combined $21,000 equals 3% of $700,000, but that arithmetic does not satisfy every statutory condition.',
      },
      {
        label: 'Later provision',
        value: 'No separate signatures or initials for the $9,000 payment',
        annotation:
          'Section 1678 requires a separate compliant liquidated-damages provision for each subsequent payment.',
      },
      {
        label: 'Corrected file',
        value: 'Each later payment separately covered; total still tested under section 1675',
        annotation:
          'Formalities and total-payment reasonableness are separate tests. Neither establishes default or an automatic escrow disbursement.',
      },
    ],
    conclusion:
      'The first initials do not automatically make the later $9,000 valid liquidated damages. Being at 3% does not cure the missing subsequent-payment provision.',
    caption:
      "Section 1677 requires each party's separate signature or initials; printed provisions need at least 10-point bold or contrasting red print of at least 8-point bold. This specimen is not such a provision.",
  },
  {
    id: 'exp-performance-tender-or-repudiation',
    lessonSlug: 'contracts-performance-and-remedies',
    afterSection: 'tender-breach-and-time',
    kind: 'decision',
    title: 'Three preclosing messages have different consequences',
    objective:
      'Distinguish a request to renegotiate, an unequivocal refusal, and a conforming offer of performance.',
    sourceUrls: [
      contracts,
      'https://courts.ca.gov/system/files/file/judicial_council_of_california_civil_jury_instructions_2026.pdf',
    ],
    question:
      'Closing is next week under an enforceable agreement. No cancellation right or extension has been exercised. What does each message show?',
    branches: [
      {
        label: 'Could we close two days later?',
        detail: 'The buyer asks but does not refuse to perform on the existing date.',
        outcome:
          'A request is not automatically repudiation and does not itself amend the closing date.',
      },
      {
        label: 'I will not buy on any terms',
        detail: 'The buyer unequivocally refuses the future performance owed.',
        outcome:
          'This may constitute anticipatory repudiation; analyze the legal response rather than treating it as a harmless question.',
      },
      {
        label: 'Agreed funds are ready through escrow',
        detail: 'The buyer offers performance on the agreed conditions and is able to supply it.',
        outcome:
          'This supports tender and readiness to perform. It does not automatically establish entitlement to every requested remedy.',
      },
    ],
    caption:
      'Do not mistake funds offered only on a new, unauthorized price condition for tender of the original bargain. The exact communication and ability to perform matter.',
  },
  {
    id: 'exp-representation-named-buyer-carveout',
    lessonSlug: 'contracts-representation-agreements',
    afterSection: 'compare-the-principal-listing-types',
    kind: 'document',
    title: 'Read the exception inside the exclusive right to sell',
    objective:
      'Apply an expressly negotiated named-buyer exception without converting the entire listing into exclusive agency.',
    sourceUrls: [contracts],
    documentTitle: 'Listing compensation / Negotiated exception',
    context:
      'Original educational excerpt, not for execution. Assume a valid, timely listing and no other fee claim or provision.',
    fields: [
      {
        label: 'General trigger',
        value: 'Sale during the term earns the agreed fee regardless of procurer',
        annotation:
          'That is the general exclusive-right-to-sell arrangement, not a requirement that the broker personally find the buyer.',
      },
      {
        label: 'Express exception',
        value: 'No fee for a sale to named prospect Morgan by June 15',
        annotation:
          'The exception has both an identity and a date condition; it is not an unlimited owner-procured-sale exemption.',
      },
      {
        label: 'Case A',
        value: 'Owner independently sells to Morgan on June 10',
        annotation: 'Both stated exception conditions are met, so this particular fee is excluded.',
      },
      {
        label: 'Case B',
        value: 'Owner independently sells to a different buyer on June 10',
        annotation:
          'Owner procurement alone does not satisfy the negotiated named-buyer exception.',
      },
    ],
    conclusion:
      'A specific exception can change one transaction without changing the general listing type. Apply the signed language rather than the heading alone.',
    caption:
      'Dates and compensation triggers are stipulated. A different exception or earning clause would require a different result.',
  },
  {
    id: 'exp-representation-net-listing-allocation',
    lessonSlug: 'contracts-representation-agreements',
    afterSection: 'compare-the-principal-listing-types',
    kind: 'allocation',
    title: "A net listing makes the broker's incentive visible",
    objective:
      "Reconcile a stipulated net arrangement while identifying the undisclosed-profit risk rather than treating the seller's net as permission to conceal.",
    sourceUrls: [contracts],
    total: 650000,
    segments: [
      {
        label: "Seller's specified net",
        amount: 600000,
        detail:
          'Assume the agreement requires the seller to receive this amount after the stated costs.',
      },
      {
        label: 'Other agreed sale costs',
        amount: 10000,
        detail:
          "These specified expenses are deducted before calculating the broker's remainder under this example.",
      },
      {
        label: 'Broker compensation',
        amount: 40000,
        detail:
          "$650,000 - $600,000 - $10,000. This material compensation must be disclosed; the seller's minimum is not a secrecy allowance.",
      },
    ],
    caption:
      "Fictional terms, with no other charges. A $20,000 higher offer would raise the broker's arithmetic remainder by $20,000 if costs and net stay fixed, making loyalty and informed disclosure especially important. This is not a recommended fee model.",
  },
  {
    id: 'exp-representation-listing-duration-exceptions',
    lessonSlug: 'contracts-representation-agreements',
    afterSection: 'residential-listings-have-their-own-duration-limits',
    kind: 'decision',
    title: 'An entity exception does not authorize recording',
    objective:
      'Distinguish the residential listing maximum-term exception from automatic-renewal and recording prohibitions.',
    sourceUrls: [code('CIV', '1670.12')],
    question:
      'Each proposed exclusive listing concerns covered one-to-four-unit property. Which defect or exception applies?',
    branches: [
      {
        label: 'Individual owner; 30-month initial term',
        detail: 'No corporate, LLC, or partnership party supplies the stated duration exception.',
        outcome:
          'The term exceeds the ordinary 24-month maximum; a negotiated fee does not cure it.',
      },
      {
        label: 'LLC owner; 30-month initial term',
        detail:
          'The actual client is the LLC, not an individual who merely calls the property an investment.',
        outcome:
          'The maximum-term exception applies, but automatic renewal and other prohibited provisions are not thereby permitted.',
      },
      {
        label: 'Six-month term; record a memorandum',
        detail: 'The broker proposes recording notice of the listing to secure the engagement.',
        outcome: 'Section 1670.12 prohibits the recording attempt regardless of this short term.',
      },
    ],
    caption:
      'Covered individual renewals cannot exceed 12 months; renewal must be dated, written, and signed, never automatic. A violation can make the agreement void and unenforceable. Maximum terms are not mandatory terms.',
  },
  {
    id: 'exp-representation-showing-sequence-2026',
    lessonSlug: 'contracts-representation-agreements',
    afterSection: 'buyer-agreements-the-current-california-rule',
    kind: 'timeline',
    title: 'Buyer-directed video tours are still showings',
    objective:
      'Locate the 2026 practicability presumption in a buyer-directed remote showing rather than waiting for a later offer.',
    sourceUrls: [buyerRules, code('CIV', '1670.50')],
    premise:
      'A broker is providing licensed services for an individual buyer. This is not a listing agent acting solely for the seller, and no facts rebut practicability.',
    events: [
      {
        when: 'Before agreement',
        label: 'Explain agency',
        detail:
          'Deliver the required agency disclosure before executing the buyer representation agreement.',
      },
      {
        when: 'Before the tour',
        label: 'Obtain the signed agreement',
        detail:
          'The regulation presumes it practicable before an in-person or qualifying virtual showing, not only when a later offer is prepared.',
      },
      {
        when: 'Buyer-directed visit',
        label: 'Agent enters with a camera',
        detail:
          'A live or recorded digital walkthrough while the buyer is elsewhere meets the stated virtual-showing definition.',
      },
      {
        when: 'Offer stage',
        label: 'No later statutory fallback',
        detail:
          "The statute requires execution as soon as practicable and no later than execution of the buyer's offer. That outside limit does not erase the earlier presumption.",
      },
    ],
    conclusion:
      "The buyer does not need to be physically present for the showing presumption to matter. Identify the agent's actual role and activity.",
    caption:
      'The presumption is rebuttable, not an invented absolute rule for every conversation or online photo. Separate private membership policies may have their own requirements.',
  },
  {
    id: 'exp-representation-ninety-days-delayed-start',
    lessonSlug: 'contracts-representation-agreements',
    afterSection: 'count-days-and-distinguish-the-clients',
    kind: 'comparison',
    title: 'Ninety calendar days is not the same date three months later',
    objective:
      'Count an initial buyer-agreement maximum from the correct start and compare an express delayed effective date.',
    sourceUrls: [buyerRules],
    columns: [
      {
        label: 'No delayed effective date',
        points: [
          'Last signature: January 31, 2026. Day 1 is February 1.',
          'February contributes 28 days; March adds 31; April adds 30. April 30 is day 89.',
          'May 1 is day 90. The maximum does not extend a shorter date actually chosen by the parties.',
        ],
      },
      {
        label: 'Express February 10 start',
        points: [
          'Same last signature, but the agreement expressly selects February 10 as its delayed effective date.',
          'February 10-28 supplies 19 days; March adds 31 and April adds 30. April 30 is day 80.',
          'May 10 is day 90 because this delayed-date rule starts on the agreed date itself.',
        ],
      },
    ],
    caption:
      'Initial agreements with individual buyers, using the 2026 regulation and a nonleap year. The calendar calculation does not excuse untimely agreement execution before covered services.',
  },
  {
    id: 'exp-representation-renewal-signature-audit',
    lessonSlug: 'contracts-representation-agreements',
    afterSection: 'buyer-agreements-the-current-california-rule',
    kind: 'document',
    title: 'Renewal is an affirmative agreement, not a rollover',
    objective:
      'Read signatures and the effective date of a buyer-agreement renewal without inferring automatic renewal or stacking from the former expiration.',
    sourceUrls: [buyerRules, code('CIV', '1670.50')],
    documentTitle: 'Buyer representation / Renewal review',
    context:
      "Original educational excerpt, not for execution. An individual buyer's existing agreement expires May 31, 2026.",
    fields: [
      {
        label: 'Proposed renewal',
        value: 'New dated writing, signed May 19 by buyer and May 20 by broker',
        annotation:
          'Both signatures precede expiration, satisfying that timing requirement under the assumed facts.',
      },
      {
        label: 'Effective date',
        value: 'May 20, the last signature date',
        annotation:
          "The regulation fixes the renewal's effective date here, not automatically on June 1 after the former term ends.",
      },
      {
        label: 'Term review',
        value: 'Apply the renewal maximum and actual chosen termination',
        annotation:
          "Do not add a fresh maximum period after the old expiration without checking the renewal's governing date rules.",
      },
      {
        label: 'Insufficient alternative',
        value: 'The original document says it renews unless canceled',
        annotation:
          'A rollover clause cannot replace the required dated, signed renewal; automatic renewal is prohibited.',
      },
    ],
    conclusion:
      'Verify the new assent and its timing. An old signature agreeing to automatic renewal is not the required renewal process.',
    caption:
      "An entity's exemption from maximum terms does not remove the no-automatic-renewal rule. This specimen does not calculate an unstated renewal endpoint.",
  },
  {
    id: 'exp-representation-scope-credit-and-earning',
    lessonSlug: 'contracts-representation-agreements',
    afterSection: 'match-the-promised-service-to-the-fee',
    kind: 'document',
    title: 'Scope, earning, and the source of payment are separate blanks',
    objective:
      'Apply a property-specific fee clause and a partial seller contribution without inventing compensation outside its scope.',
    sourceUrls: [code('CIV', '1670.50'), contracts],
    documentTitle: 'Buyer services / Compensation excerpt',
    context:
      'Original educational excerpt, not for execution. Assume valid terms, no protection provision beyond those shown, and no other compensation obligation.',
    fields: [
      {
        label: 'Scope',
        value: 'Evaluation and purchase of 18 Example Lane only',
        annotation:
          'A property-specific engagement is not automatically a region-wide exclusive search agreement.',
      },
      {
        label: 'Fee and earning event',
        value: '$11,000 due upon closing that purchase',
        annotation:
          'The stipulated event must occur; the agreement does not say all services immediately earn the full fee.',
      },
      {
        label: 'Seller contribution',
        value: '$7,500 credited toward the same fee at closing',
        annotation:
          '$11,000 - $7,500 = $3,500 remains for the buyer under the stated allocation. Do not add $7,500 to the agreed total.',
      },
      {
        label: 'Changed purchase',
        value: 'Buyer instead acquires an unrelated property',
        annotation:
          'This narrow clause alone does not establish a fee on the other property. Examine any other actual agreement rather than assuming one.',
      },
    ],
    conclusion:
      'Who receives services, what transaction earns the fee, and who funds it are related but not interchangeable facts.',
    caption:
      "A seller's refusal to contribute would not itself amend the buyer's promised fee. Any negotiated change requires its own agreement.",
  },
  {
    id: 'exp-representation-advance-fee-expenditure-ledger',
    lessonSlug: 'contracts-representation-agreements',
    afterSection: 'account-for-the-unused-service-budget',
    kind: 'ledger',
    title: 'An estimate is not an expenditure',
    objective:
      'Reconcile a regulated advance-fee refund using substantiated contracted expenditures rather than the original budget.',
    sourceUrls: [advanceFees],
    account: 'Client advance fee / Simplified trust record',
    openingBalance: 0,
    entries: [
      { label: 'Advance fee received into trust', received: 3000, paid: 0, balance: 3000 },
      {
        label: 'Authorized advertising actually provided and paid',
        received: 0,
        paid: 1200,
        balance: 1800,
      },
      {
        label: 'Specified completed service, substantiated and permitted',
        received: 0,
        paid: 600,
        balance: 1200,
      },
      {
        label: 'Unexpended balance refunded upon cancellation',
        received: 0,
        paid: 1200,
        balance: 0,
      },
    ],
    conclusion:
      'The refund is $1,200. A budget that originally expected to spend all $3,000 does not turn unexpended funds into earned revenue.',
    caption:
      'Assume a compliant arrangement and withdrawals, cancellation, and no other permitted charge. The full verified accounting also needs required service and supporting-advertisement details; this running balance is only one part.',
  },
  {
    id: 'exp-representation-advance-fee-three-gates',
    lessonSlug: 'contracts-representation-agreements',
    afterSection: 'advance-fees-are-not-ordinary-earned-commissions',
    kind: 'decision',
    title: 'Submission, no objection, and lawful service are separate gates',
    objective:
      'Reject the inference that passing ten days or obtaining review legalizes every advance-fee proposal.',
    sourceUrls: [advanceFees, 'https://www.dre.ca.gov/Consumers/AdvanceFees.html'],
    question:
      'A broker wants to use an advance-fee agreement. What does each proposed shortcut miss?',
    branches: [
      {
        label: 'Submitted 12 days ago; no response',
        detail:
          'The broker complied with the minimum ten-calendar-day submission interval but has not received no-objection communication.',
        outcome:
          'Elapsed time alone does not authorize use of the materials or collection of the advance fee.',
      },
      {
        label: 'Old no-objection letter; new allocation',
        detail: 'The broker materially changes the fee amount or its allocation among services.',
        outcome:
          'The revised arrangement must be submitted for review before use; the old letter does not cover every future package.',
      },
      {
        label: 'Covered residential loan modification',
        detail: 'The broker proposes taking the fee before fully performing the covered services.',
        outcome:
          'The specific prohibition is not displaced by ordinary advance-fee procedures or by renaming the charge.',
      },
    ],
    caption:
      'DRE review is not approval, endorsement, or a performance guarantee. Permitted advance fees still require the trust, refund, service-description, and verified-accounting safeguards.',
  },
  {
    id: 'exp-purchase-price-amendment-cash-bridge',
    lessonSlug: 'contracts-purchase-options-and-leases',
    afterSection: 'reconcile-the-purchase-funds',
    kind: 'calculation',
    title: 'A price amendment need not increase the loan',
    objective:
      'Recalculate additional buyer cash after a signed price increase while the loan, paid deposit, costs, and credit remain fixed.',
    sourceUrls: [code('CIV', '1638'), contracts],
    rows: [
      { label: 'Amended price: original $640,000 plus $20,000', amount: 660000 },
      { label: 'Unchanged new-loan proceeds', amount: -496000 },
      { label: 'Deposit already paid', amount: -16000 },
      { label: 'Buyer closing costs', amount: 12000 },
      { label: 'Permitted seller credit toward costs', amount: -5000 },
    ],
    result: {
      label: 'Additional cash due',
      amount: 155000,
      detail:
        'The original calculation was $135,000. With everything else fixed, the $20,000 price increase raises additional cash by the same $20,000.',
    },
    caption:
      'Stipulated amendment and lender commitment; no other charges, impounds, or prorations. The paid deposit is credited once, and the seller cost credit does not reduce the stated $660,000 price.',
  },
  {
    id: 'exp-purchase-early-possession-casualty',
    lessonSlug: 'contracts-purchase-options-and-leases',
    afterSection: 'financing-title-and-possession',
    kind: 'timeline',
    title: 'Early possession can change the casualty-risk result',
    objective:
      'Apply Civil Code 1662 before and after possession transfers, without treating recordation as the only trigger.',
    sourceUrls: [code('CIV', '1662'), contracts],
    premise:
      'Assume the purchase contract does not expressly change section 1662, an accidental fire materially destroys the property, neither party is at fault, and no other issue affects the result. The fire cases below are alternatives.',
    events: [
      {
        when: 'Before either transfer',
        label: 'Alternative A: fire before title or possession',
        detail:
          'Neither legal title nor possession has passed. The seller cannot enforce the contract under section 1662(a), and the buyer can recover price payments.',
      },
      {
        when: 'Early occupancy',
        label: 'Buyer receives possession',
        detail:
          'In the alternative sequence, the buyer takes possession before the deed transfer. This is a legally consequential event, not just a scheduling convenience.',
      },
      {
        when: 'After possession; before title',
        label: 'Alternative B: fire after early occupancy',
        detail:
          'Possession has passed even though title has not. Under section 1662(b), that casualty alone does not relieve the buyer of paying or entitle recovery of price already paid.',
      },
    ],
    conclusion:
      'The statutory switch is title OR possession, subject to its conditions and an express contrary agreement. Moving in early can change the analysis before closing.',
    caption:
      'This is a default-rule comparison, not an insurance coverage determination. Fault, nonmaterial damage before transfer, and negotiated risk clauses can change the problem.',
  },
  {
    id: 'exp-purchase-option-two-exercise-conditions',
    lessonSlug: 'contracts-purchase-options-and-leases',
    afterSection: 'exercise-means-following-the-option-terms',
    kind: 'document',
    title: 'Timely notice may satisfy only half the exercise clause',
    objective:
      'Distinguish notice, exercise payment, and later closing performance in a stipulated purchase option.',
    sourceUrls: [contracts, code('CIV', '1585'), code('CIV', '1638')],
    documentTitle: 'Purchase option / Exercise conditions',
    context:
      'Original educational excerpt, not for execution. Assume a valid supported option, clear conditions, and no waiver or other exception.',
    fields: [
      {
        label: 'Underlying bargain',
        value: '$525,000 purchase price',
        annotation:
          'The holder may exercise this bargain, not unilaterally substitute a lower price or new contingency.',
      },
      {
        label: 'Required notice',
        value: 'Unconditional written exercise received by 4 p.m. on August 20',
        annotation:
          'The contract requires receipt, not merely sending the notice before the deadline.',
      },
      {
        label: 'Required exercise payment',
        value: '$5,000 received with exercise by that deadline',
        annotation:
          'This payment is an express exercise condition, not merely an amount due at a later closing.',
      },
      {
        label: 'Actual performance',
        value: 'Notice received at 3 p.m.; payment first tendered the next day',
        annotation:
          'Timely notice alone does not satisfy both of the stipulated exercise conditions.',
      },
    ],
    conclusion:
      'Read what constitutes exercise separately from what happens after exercise. A different option requiring notice alone would create a different case.',
    caption:
      'No universal payment deadline is asserted. This illustration tests the clear terms actually given, not every equitable issue in an option dispute.',
  },
  {
    id: 'exp-purchase-rent-versus-option-credit',
    lessonSlug: 'contracts-purchase-options-and-leases',
    afterSection: 'land-sale-contracts-and-a-worked-scenario',
    kind: 'chart',
    title: 'Rent paid and potential purchase credit do not grow together',
    objective:
      'Trace a lease-option credit that accrues only for qualifying payments and distinguish it from rent paid or ownership equity.',
    sourceUrls: [contracts, code('CIV', '1638')],
    xAxis: { label: 'Completed rental month', format: 'number' },
    yAxis: { label: 'Cumulative amount', format: 'currency' },
    series: [
      {
        label: 'Rent actually paid',
        points: [
          { x: 0, y: 0 },
          { x: 1, y: 2000 },
          { x: 2, y: 4000 },
          { x: 3, y: 6000 },
          { x: 4, y: 8000 },
          { x: 5, y: 10000 },
          { x: 6, y: 12000 },
        ],
      },
      {
        label: 'Potential closing credit',
        points: [
          { x: 0, y: 3000 },
          { x: 1, y: 3400 },
          { x: 2, y: 3800 },
          { x: 3, y: 4200 },
          { x: 4, y: 4200 },
          { x: 5, y: 4600 },
          { x: 6, y: 5000 },
        ],
      },
    ],
    conclusion:
      'After six months the tenant has paid $12,000 rent plus $3,000 option consideration. The potential credit is only $3,000 + five qualifying $400 credits = $5,000, contingent on proper exercise and closing.',
    caption:
      'Fictional terms: $2,000 monthly rent; $400 credit only for timely payments; month 4 is paid late and earns no credit, without otherwise ending the option. The $3,000 option fee is separately paid and credited at closing. Lines connect month-end observations, not daily accrual or present ownership equity.',
  },
  {
    id: 'exp-purchase-first-refusal-trigger-file',
    lessonSlug: 'contracts-purchase-options-and-leases',
    afterSection: 'options-and-first-refusal-rights',
    kind: 'decision',
    title: 'A first-refusal right starts with the agreed trigger',
    objective:
      'Apply a specific first-refusal trigger and matching process instead of treating the right as an immediately exercisable fixed-price option.',
    sourceUrls: [contracts, code('CIV', '1638')],
    question:
      'A valid fictional right applies when the owner decides to accept a bona fide third-party purchase offer; it requires notice of those terms and allows five calendar days after receipt to match. What follows?',
    branches: [
      {
        label: 'Owner declines every offer',
        detail:
          'The holder wants to force a sale today for $400,000, but the agreement sets no such fixed-price purchase power.',
        outcome:
          'The stated first-refusal trigger has not occurred. Do not turn it into an option the owner never granted.',
      },
      {
        label: 'Owner decides to accept $450,000 cash',
        detail:
          'The notice communicates the qualifying offer and the agreed response period begins on receipt.',
        outcome:
          'The holder must follow the matching procedure and applicable terms, not rely on an old informal price discussion.',
      },
      {
        label: 'Holder requests $440,000 and financing',
        detail:
          'The response changes both price and financing instead of matching the noticed cash offer.',
        outcome:
          'The proposed new bargain is not a match under the stipulated right merely because it arrives within five days.',
      },
    ],
    caption:
      'The five-day period and trigger are invented contractual terms, not California-wide defaults. Package sales, transfers to affiliates, gifts, and altered third-party terms require reading the actual agreement and law.',
  },
  {
    id: 'exp-purchase-sublease-retained-year',
    lessonSlug: 'contracts-purchase-options-and-leases',
    afterSection: 'assignment-and-sublease-allocate-different-rights',
    kind: 'timeline',
    title: 'The retained final year identifies the lesser interest',
    objective:
      "Use actual term boundaries to identify a sublease and distinguish possession ending from release of the original tenant's promises.",
    sourceUrls: [leasing],
    premise:
      'A tenant has all of 2027-2029 remaining on a valid commercial lease. Required consent is obtained; no release, extension, or holdover occurs.',
    events: [
      {
        when: 'January 1, 2027',
        label: 'Subtenant takes the entire premises',
        detail:
          'The original tenant grants possession only through December 31, 2028 and retains the last year of the head lease.',
      },
      {
        when: 'December 31, 2028',
        label: 'The granted term ends',
        detail:
          "The subtenant's stated two-year interest ends, while the original tenant still has a year of leasehold rights.",
      },
      {
        when: 'During 2029',
        label: 'Original tenant retains the final year',
        detail:
          'That retained reversionary interval explains why this is a sublease rather than an assignment of the entire remaining term.',
      },
      {
        when: 'December 31, 2029',
        label: 'Head lease reaches its stated end',
        detail:
          "The original tenant's contractual responsibility was not erased merely by granting the sublease.",
      },
    ],
    conclusion:
      'Change the grant to the entire remaining 2027-2029 term and the classification moves toward assignment, but release from promised rent still requires a separate basis.',
    caption:
      "Classification follows the interest transferred, not the document's heading. Residential protective statutes and any actual renewal or default would require separate treatment.",
  },
  {
    id: 'exp-purchase-note-variable-interest-reading',
    lessonSlug: 'contracts-purchase-options-and-leases',
    afterSection: 'notes-and-their-security',
    kind: 'document',
    title: 'Fixed principal and variable interest can coexist',
    objective:
      "Read a note's principal, payee, maturity, variable-interest term, and security reference without automatically disqualifying negotiability.",
    sourceUrls: [code('COM', '3104'), code('COM', '3112'), code('COM', '3106')],
    documentTitle: 'Promissory note / Selected teaching terms',
    context:
      'Original educational excerpt, not for execution. Assume a signed unconditional promise and all other negotiability requirements; no prohibited additional undertaking is included.',
    fields: [
      {
        label: 'Principal and payee',
        value: '$100,000 payable to the order of Example Lender',
        annotation:
          'Identify the fixed money principal and the designated recipient; this is not a deed conveying the property.',
      },
      {
        label: 'Maturity',
        value: 'December 1, 2027',
        annotation:
          'The stipulated date makes payment timing definite rather than dependent on an unspecified successful project.',
      },
      {
        label: 'Interest description',
        value: 'Published index plus the stated margin, reset as specified',
        annotation:
          'Section 3112 permits variable rates and references to outside information; variability alone is not a negotiability defect.',
      },
      {
        label: 'Collateral reference',
        value: 'See the identified deed of trust for collateral rights',
        annotation:
          'A permitted reference concerning security is distinct from making the payment promise subject to another agreement.',
      },
    ],
    conclusion:
      'Test each requirement. Neither a variable rate nor a permitted security reference automatically makes this otherwise qualifying promise nonnegotiable.',
    caption:
      'Negotiability is not a credit rating, guarantee of payment, or proof that selling an investment is exempt from securities law.',
  },
  {
    id: 'exp-purchase-payment-condition-or-source',
    lessonSlug: 'contracts-purchase-options-and-leases',
    afterSection: 'promises-negotiability-and-investment-risk',
    kind: 'comparison',
    title: 'A payment condition differs from a limited payment source',
    objective:
      'Apply Commercial Code 3106 to express conditions, collateral references, and limited-source language without treating them as equivalent.',
    sourceUrls: [code('COM', '3106'), code('COM', '3104')],
    columns: [
      {
        label: 'Express condition',
        points: [
          'The maker owes payment only if a specified project obtains approval.',
          'The promise expressly conditions payment on an outside event.',
          'That raises an unconditional-promise defect; a contract may still exist even if the writing is not negotiable.',
        ],
      },
      {
        label: 'Limited source',
        points: [
          'The promise is payable from an identified fund only, with no other express condition.',
          'Section 3106(b)(2) says a particular-fund or source limitation does not itself make the promise conditional.',
          'Check all other negotiability requirements; do not infer a repayment guarantee from this narrow rule.',
        ],
      },
      {
        label: 'Collateral reference',
        points: [
          'The note refers to a deed of trust for collateral, prepayment, or acceleration rights.',
          'Section 3106(b)(1) permits those references without making the promise conditional for that reason.',
          'This differs from saying all payment rights are subject to a separate agreement.',
        ],
      },
    ],
    caption:
      'Read the operative words, not only whether an outside document or project is mentioned. Source limitation and event-conditioned liability require different analysis.',
  },
  {
    id: 'exp-purchase-seller-financing-title-paths',
    lessonSlug: 'contracts-purchase-options-and-leases',
    afterSection: 'land-sale-contracts-and-a-worked-scenario',
    kind: 'comparison',
    title: 'The same seller-financed balance can use different title arrangements',
    objective:
      'Distinguish retained legal title under an installment land contract from a completed conveyance secured by a seller-held deed of trust.',
    sourceUrls: [code('CIV', '2985'), finance, contracts],
    columns: [
      {
        label: 'Installment land sale contract',
        points: [
          'Price is $400,000; buyer pays $100,000 and owes $300,000 under the stipulated five-year installment terms.',
          'Seller retains legal title until the agreed five-year payment obligation is completed; buyer generally acquires an equitable interest.',
          'Do not infer an automatic forfeiture of all payments after default; remedies and protective rules require separate analysis.',
        ],
      },
      {
        label: 'Deed delivered; seller takes security',
        points: [
          'The same $100,000 cash and $300,000 financing fund a completed conveyance to the buyer.',
          'The $300,000 note states the debt; a deed of trust secures it for the seller as beneficiary.',
          'The seller is a secured creditor, not an owner simply retaining the entire fee until every payment is made.',
        ],
      },
    ],
    caption:
      'Assume valid instruments and no other liens or financing. Equal payment arithmetic does not establish equal title interests, remedies, or recording consequences.',
  },
]
