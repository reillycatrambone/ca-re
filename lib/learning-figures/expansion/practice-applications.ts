import type { LearningFigureSpec } from '../types'

const sources = {
  regs: 'https://www.dre.ca.gov/files/pdf/relaw/regs.pdf',
  re13: 'https://www.dre.ca.gov/files/pdf/re13.pdf',
  licensing:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10131.',
  compensation:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10137.',
  renewal:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10156.2.',
  renewalGuide: 'https://www.dre.ca.gov/licensees/renewlicense.html',
  records:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10148.',
  branch:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10163.',
  complaint: 'https://www.dre.ca.gov/Consumers/FileComplaint.html',
  recovery: 'https://www.dre.ca.gov/consumers/consumerrecoveryaccount.html',
  trust:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10145.',
  adIdentity:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10140.6.',
  image:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10140.8.',
  misrepresentation:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10176.',
  electronicConsent:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1633.5.',
  electronicEffect:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1633.7.',
  electronicIdentity:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1633.9.',
  antitrust:
    'https://www.ftc.gov/advice-guidance/competition-guidance/guide-antitrust-laws/dealings-competitors/price-fixing',
  wire: 'https://files.consumerfinance.gov/f/documents/cfpb_mortgages-scams_one-pager.pdf',
  housing: 'https://calcivilrights.ca.gov/housing/',
  federalHousing: 'https://www.hud.gov/helping-americans/fair-housing-act-overview',
  stateHousing:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12955.',
  authority:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=2316.',
  security:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5.',
  entry:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1954.',
  service:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=1162.',
  management: 'https://www.dre.ca.gov/files/pdf/refbook/ref22.pdf',
  landlordGuide:
    'https://www.dre.ca.gov/publications/ResourceGuidebook/2026_Landlord_Tenant_Guide.pdf',
  commercial: 'https://www.dre.ca.gov/files/pdf/refbook/ref12.pdf',
  valuation: 'https://www.dre.ca.gov/files/pdf/refbook/ref15.pdf',
  contract:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1638.',
  bulk: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=COM&sectionNum=6103.',
  tdsOther:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1102.8.',
  tds: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1102.3.',
  nhd: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1103.2.',
  inspection:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=2079.',
  inspectionLimit:
    'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=2079.3.',
  lead: 'https://www.epa.gov/lead/real-estate-disclosures-about-potential-lead-hazards',
  clearanceDetail: 'https://cdtfa.ca.gov/formspubs/pub74/notifying-cdtfa.htm',
  aai: 'https://www.epa.gov/brownfields/brownfields-all-appropriate-inquiries',
}

export const practiceApplicationFigures: LearningFigureSpec[] = [
  {
    id: 'exp-practice-app-licensed-activity-trigger',
    lessonSlug: 'practice-licensing-supervision',
    afterSection: 'the-activity-determines-the-license',
    title: 'One changed role changes the licensing analysis',
    objective:
      'Identify acting for another and expected compensation rather than relying on a job label.',
    sourceUrls: [sources.licensing, sources.compensation],
    kind: 'comparison',
    columns: [
      {
        label: 'Owner sells own building',
        points: [
          'Acts for self, not another.',
          'The ordinary broker definition does not attach on that fact alone.',
        ],
      },
      {
        label: "Consultant negotiates owner's sale",
        points: [
          'Acts for another and expects a fee.',
          'The consulting label does not remove the licensed activity.',
        ],
      },
      {
        label: 'Salesperson negotiates for client',
        points: ['Performs brokerage activity.', 'Must work through the responsible broker.'],
      },
    ],
    caption:
      'Fictional roles. Test actual functions and any specific exemption; this is not a list of all exempt activities.',
  },
  {
    id: 'exp-practice-app-recovery-two-ceilings',
    lessonSlug: 'practice-licensing-supervision',
    afterSection: 'separate-the-remedy-from-the-complaint',
    title: 'Two recovery limits apply at the same time',
    objective:
      'Compute the lower ceiling from the transaction limit and remaining aggregate capacity without treating either limit as a guaranteed award.',
    sourceUrls: [sources.recovery],
    kind: 'chart',
    xAxis: { label: 'Prior payments counted against this licensee', format: 'currency' },
    yAxis: { label: 'Ceiling for the stated claim', format: 'currency' },
    series: [
      {
        label: 'Lower of $50,000 or unused $250,000 aggregate',
        points: [
          { x: 0, y: 50000 },
          { x: 200000, y: 50000 },
          { x: 225000, y: 25000 },
          { x: 240000, y: 10000 },
          { x: 250000, y: 0 },
        ],
      },
    ],
    conclusion:
      'With $225,000 already counted against the licensee limit, only $25,000 of aggregate capacity remains. A $70,000 eligible loss cannot bypass that limit by invoking the $50,000 transaction cap.',
    caption:
      'Fictional limit calculation for one new transaction with $70,000 of otherwise eligible uncompensated direct loss. Assume the prior payments remain counted and no competing pending claims or other adjustment. Eligibility, approval, and statutory proration are separate issues; these lines are ceilings, not promised payments. Multiple victims of one transaction share its limit.',
  },
  {
    id: 'exp-practice-app-timely-renewal-fork',
    lessonSlug: 'practice-licensing-supervision',
    afterSection: 'initial-qualification-and-renewal',
    title: 'The expiration date is not the only renewal fact',
    objective:
      'Apply the timely-filing continuation rule separately from late-renewal eligibility.',
    sourceUrls: [sources.renewal, sources.renewalGuide],
    kind: 'comparison',
    columns: [
      {
        label: 'Timely qualifying filing',
        points: [
          'Prescribed application, fee, and good-faith CE evidence filed on time.',
          'No prior suspension or revocation.',
          "Existing authority continues subject to DRE's statutory determination.",
        ],
      },
      {
        label: 'Deadline missed',
        points: [
          'No qualifying on-time filing.',
          'Late-renewal eligibility may remain.',
          'Do not perform licensed acts during the lapse.',
        ],
      },
    ],
    caption:
      'Both fictional licensees reach the printed expiration date. The filing facts, not the calendar label alone, distinguish their authority.',
  },
  {
    id: 'exp-practice-app-retention-start-events',
    lessonSlug: 'practice-licensing-supervision',
    afterSection: 'records-make-conduct-reviewable',
    title: 'Pick the event that starts retention',
    objective:
      'Use closing for a completed transaction and listing date for an unconsummated transaction.',
    sourceUrls: [sources.records],
    kind: 'timeline',
    premise:
      'Compare two fictional listing files under the general three-year broker record rule; longer duties may apply.',
    events: [
      {
        label: 'Completed sale listed',
        when: 'March 2, 2026',
        detail: "Listing is not this completed transaction's retention start.",
      },
      {
        label: 'Completed sale closes',
        when: 'May 14, 2026',
        detail: 'General minimum runs three years from closing.',
      },
      {
        label: 'Different listing begins',
        when: 'June 1, 2026',
        detail: 'This transaction never closes: use its listing date.',
      },
      {
        label: 'Different listing canceled',
        when: 'August 20, 2026',
        detail: 'Cancellation does not replace the statutory listing-date trigger.',
      },
    ],
    conclusion: 'The correct start event matters before adding the retention period.',
    caption:
      'This comparison does not authorize destruction of records needed for litigation, other laws, or unresolved matters.',
  },
  {
    id: 'exp-practice-app-branch-license-evidence',
    lessonSlug: 'practice-licensing-supervision',
    afterSection: 'build-supervision-around-evidence',
    title: 'A second office needs its own licensing check',
    objective: 'Identify the additional office authorization distinct from personnel supervision.',
    sourceUrls: [sources.branch],
    kind: 'document',
    documentTitle: 'Fictional branch-opening file',
    context:
      'A broker opens another place of business in California; not a temporary showing location.',
    fields: [
      {
        label: 'Principal office',
        value: 'Existing broker location',
        annotation: 'Its license does not by itself establish a separate branch license.',
      },
      {
        label: 'Additional office',
        value: 'Second permanent business location',
        annotation: 'Section 10163 requires an additional license for each branch.',
      },
      {
        label: 'Application evidence',
        value: 'Submitted branch application',
        annotation: 'Submission and issuance are distinct events; verify the authorization.',
      },
    ],
    conclusion:
      "Check the location's license and the broker's supervision arrangements separately.",
    caption:
      'Original instructional file excerpt, not an application or complete licensing checklist.',
  },
  {
    id: 'exp-practice-app-supervision-exception-log',
    lessonSlug: 'practice-licensing-supervision',
    afterSection: 'build-supervision-around-evidence',
    title: 'Close a supervision exception with evidence',
    objective: 'Turn a repeated late deposit-receipt warning into a documented corrective control.',
    sourceUrls: [sources.regs],
    kind: 'document',
    documentTitle: 'Fictional transaction review entry',
    context:
      "The broker's review implements Regulation 2725; fields illustrate evidence, not a mandatory DRE form.",
    fields: [
      {
        label: 'Observed pattern',
        value: 'Three late receipt uploads',
        annotation: 'Late paperwork warrants checking actual custody dates.',
      },
      {
        label: 'Verified chronology',
        value: 'Receipt and escrow delivery confirmed',
        annotation: 'Distinguish delayed filing from delayed money placement.',
      },
      {
        label: 'Corrective action',
        value: 'Same-day receipt routing assigned',
        annotation: 'Name who performs and who checks the step.',
      },
      {
        label: 'Follow-up',
        value: 'Next five files rechecked',
        annotation: 'Training acknowledgment alone does not verify later compliance.',
      },
    ],
    conclusion:
      'Document the finding, response, and follow-up instead of simply marking the file complete.',
    caption:
      "Original instructional record. Controls should match the brokerage's activities and actual risks.",
  },
  {
    id: 'exp-practice-app-remedy-forum-routing',
    lessonSlug: 'practice-licensing-supervision',
    afterSection: 'separate-the-remedy-from-the-complaint',
    title: 'The desired remedy determines the next forum',
    objective:
      'Separate discipline, civil recovery, and limited statutory recovery-account relief.',
    sourceUrls: [sources.complaint, sources.recovery],
    kind: 'decision',
    question: 'What result is the claimant seeking?',
    branches: [
      {
        label: 'Review of licensee misconduct',
        detail: 'Possible licensing-law violation.',
        outcome: 'DRE investigation and discipline process.',
      },
      {
        label: 'Repair damages or contract relief',
        detail: 'An adjudication of the private civil claim.',
        outcome: 'Court or other authorized dispute forum.',
      },
      {
        label: 'Eligible unpaid fraud or conversion loss',
        detail: 'Qualifying determination and statutory collection requirements.',
        outcome: 'Evaluate Consumer Recovery Account eligibility and caps.',
      },
    ],
    caption:
      'The same facts may support more than one process. A DRE complaint alone is not a damages award or recovery-account approval.',
  },
  {
    id: 'exp-practice-app-receipt-role-clocks',
    lessonSlug: 'practice-trust-funds',
    afterSection: 'two-different-clocks',
    title: "The recipient's role selects the custody clock",
    objective:
      'Distinguish salesperson delivery, ordinary broker placement, and the broker-escrow exception.',
    sourceUrls: [sources.trust, sources.regs],
    kind: 'comparison',
    columns: [
      {
        label: 'Salesperson receives funds',
        points: [
          'Immediately deliver to the broker or broker-directed authorized destination.',
          'No personal three-day holding period.',
        ],
      },
      {
        label: 'Ordinary broker custody',
        points: [
          'Placement no later than three business days following receipt.',
          'Receipt by the broker or salesperson starts the clock.',
        ],
      },
      {
        label: 'Broker acts as escrow holder',
        points: [
          'Specified Regulation 2832(e) transaction; broker not licensed under Escrow Law.',
          'Placement no later than the next business day.',
        ],
      },
    ],
    caption:
      'Apply relevant written instructions and statutory exceptions. The faster broker-escrow rule overrides the ordinary timing in its stated setting.',
  },
  {
    id: 'exp-practice-app-offer-check-authority-handoff',
    lessonSlug: 'practice-trust-funds',
    afterSection: 'holding-an-offer-check-uncashed',
    title: 'Acceptance changes whose instruction matters',
    objective:
      'Recognize the change from offeror instructions before acceptance to offeree authority for continued holding.',
    sourceUrls: [sources.regs],
    kind: 'timeline',
    premise:
      'Fictional negotiable offer check; ordinary brokerage, not the special broker-escrow setting.',
    events: [
      {
        label: 'Buyer gives check',
        when: 'Before presentation',
        detail: 'Written buyer instruction: hold uncashed until acceptance.',
      },
      {
        label: 'Seller hears the offer',
        when: 'At presentation',
        detail: 'Seller is informed that the check is being held.',
      },
      {
        label: 'Seller accepts',
        when: 'Acceptance event',
        detail: 'The initial holding authority is no longer an indefinite instruction.',
      },
      {
        label: 'Continued holding',
        when: 'After acceptance',
        detail:
          "Obtain the offeree's written authorization; otherwise comply with the placement deadline.",
      },
    ],
    conclusion:
      "A buyer's original instruction does not supply the seller's postacceptance authorization.",
    caption:
      "Regulation 2832(c)-(e). Direct delivery to the offeree under the ordinary postacceptance rule also requires both parties' express written authorization.",
  },
  {
    id: 'exp-practice-app-mixed-receipt-deposit-clock',
    lessonSlug: 'practice-trust-funds',
    afterSection: 'keep-broker-compensation-distinct',
    title: 'The 25-day clock starts at deposit',
    objective:
      'Apply the mixed-receipt exception without restarting its clock at later bookkeeping.',
    sourceUrls: [sources.regs],
    kind: 'timeline',
    premise:
      'A compliant account receives an inseparable $2,000 payment: $1,840 principal funds and an undisputed $160 earned broker fee.',
    events: [
      {
        label: 'Mixed receipt deposited',
        when: 'Day 0',
        detail: 'Separation before deposit was not reasonably practicable.',
      },
      {
        label: 'Fee posted in records',
        when: 'Day 8',
        detail: 'The bookkeeping date does not restart the deadline.',
      },
      {
        label: 'Undisputed fee disbursed',
        when: 'No later than day 25',
        detail: 'The broker portion leaves the trust account.',
      },
      {
        label: 'Changed fact: principal disputes fee',
        when: 'Before withdrawal',
        detail: 'The disputed portion remains until finally settled.',
      },
    ],
    conclusion:
      "Deposit starts this exception's clock; a dispute changes whether the broker may withdraw.",
    caption: 'Regulation 2835(b), not a general right to hold or take contested compensation.',
  },
  {
    id: 'exp-practice-app-trust-signature-authority',
    lessonSlug: 'practice-trust-funds',
    afterSection: 'the-account-and-the-people-with-access',
    title: 'A job title is not signing authority',
    objective:
      'Check written authorization and required employee fidelity protection before a trust withdrawal.',
    sourceUrls: [sources.regs, sources.trust],
    kind: 'decision',
    question: "Who may sign for this individual broker's trust account?",
    branches: [
      {
        label: 'Salesperson licensed to this broker',
        detail: 'Specifically authorized in writing.',
        outcome: 'Permitted regulatory signer category.',
      },
      {
        label: 'Unlicensed employee',
        detail: 'Written authority and fidelity bond covering maximum accessible trust funds.',
        outcome: 'Permitted category when these requirements are met.',
      },
      {
        label: 'Outside bookkeeper with a password',
        detail: 'No qualifying regulatory status or authorization established.',
        outcome: 'Access credentials alone do not authorize withdrawal.',
      },
    ],
    caption:
      "Regulation 2834 also addresses broker signers and corporate broker accounts. Business and Professions Code 10145(a)(2)(C) additionally permits qualifying insurance, with conditions on employee-dishonesty coverage, deductibles, and financial responsibility. Delegation does not remove the responsible broker's liability.",
  },
  {
    id: 'exp-practice-app-provisional-credit-return',
    lessonSlug: 'practice-trust-funds',
    afterSection: 'diagnose-shortages-without-hiding-them',
    title: "A returned deposit can consume other people's money",
    objective:
      'Trace a premature refund through provisional bank credit and the later returned check.',
    sourceUrls: [sources.re13, sources.trust],
    kind: 'ledger',
    account: 'Fictional bank balance during an improper premature refund',
    openingBalance: 9000,
    entries: [
      {
        label: 'Provisional credit for buyer check',
        received: 5000,
        paid: 0,
        balance: 14000,
      },
      {
        label: 'Refund sent before collection verified',
        received: 0,
        paid: 5000,
        balance: 9000,
      },
      {
        label: 'Original check returned unpaid',
        received: 0,
        paid: 5000,
        balance: 4000,
      },
    ],
    conclusion:
      '$4,000 remains against $9,000 owed to the original fund owners: a $5,000 shortage.',
    caption:
      'Failure example, not an approved workflow. The first receipt is provisional bank credit, not a finding that the buyer supplied collected funds. Other owners did not authorize use of their money.',
  },
  {
    id: 'exp-practice-app-correct-total-wrong-owner',
    lessonSlug: 'practice-trust-funds',
    afterSection: 'three-records-should-tell-one-story',
    title: 'A matching total can hide a posting error',
    objective:
      'Use receipt ownership to detect a wrong-beneficiary entry despite matching account totals.',
    sourceUrls: [sources.regs, sources.re13],
    kind: 'document',
    documentTitle: 'Fictional receipt-to-ledger comparison',
    context:
      'Before this receipt, Owner A has $2,000 and Owner B has $3,000. No disbursements occur.',
    fields: [
      {
        label: 'Receipt identifies',
        value: '$1,200 rent for Owner A',
        annotation: 'The transaction evidence identifies the beneficiary.',
      },
      {
        label: 'Incorrect separate records',
        value: 'A $2,000; B $4,200',
        annotation: 'These sum to $6,200 but misallocate the receipt.',
      },
      {
        label: 'Correct separate records',
        value: 'A $3,200; B $3,000',
        annotation: 'These also sum to $6,200 and match the receipt.',
      },
      {
        label: 'Bank and control totals',
        value: '$6,200 each',
        annotation: 'Total agreement alone cannot identify the posting error.',
      },
    ],
    conclusion: 'Reconcile the ownership evidence as well as the arithmetic.',
    caption:
      'Original instructional accounting excerpt. Corrections need a traceable basis, not an unexplained transfer between owners.',
  },
  {
    id: 'exp-practice-app-broker-bank-fee-ledger',
    lessonSlug: 'practice-trust-funds',
    afterSection: 'limited-broker-money-is-an-exception-not-a-target',
    title: 'Keep bank charges on the correct ownership record',
    objective:
      'Track permitted broker-owned bank-charge funds without charging a random beneficiary.',
    sourceUrls: [sources.regs, sources.re13],
    kind: 'ledger',
    account: "Broker's separate bank-charge record within the trust account",
    openingBalance: 160,
    entries: [
      {
        label: 'Bank service charge',
        received: 0,
        paid: 25,
        balance: 135,
      },
      {
        label: 'Second documented bank charge',
        received: 0,
        paid: 15,
        balance: 120,
      },
      {
        label: 'Return excess broker cushion to operating account',
        received: 0,
        paid: 20,
        balance: 100,
      },
    ],
    conclusion:
      '$100 remains separately identified as broker money; client balances are unchanged.',
    caption:
      "Assume the listed charges are the broker's responsibility. Regulation 2835(a)'s limited bank-charge allowance does not turn remaining money into a client balance or authorize direct personal spending.",
  },
  {
    id: 'exp-practice-app-interest-owner-not-affiliate',
    lessonSlug: 'practice-trust-funds',
    afterSection: 'keep-broker-compensation-distinct',
    title: 'An interest instruction cannot override the statute',
    objective:
      'Identify prohibited broker benefit in a qualifying interest-bearing trust arrangement.',
    sourceUrls: [sources.trust],
    kind: 'decision',
    question:
      'Who is to receive interest under an otherwise qualifying section 10145(d) arrangement?',
    branches: [
      {
        label: 'Authorized principal',
        detail: 'Proper written agreement and all other account conditions satisfied.',
        outcome: 'Interest follows the permitted principal arrangement.',
      },
      {
        label: 'Responsible broker',
        detail: 'Principal offers the interest as a thank-you.',
        outcome: 'Do not accept the prohibited direct benefit.',
      },
      {
        label: 'Affiliated licensee',
        detail: "Principal proposes routing the interest through the broker's associate.",
        outcome: 'Indirect benefit does not avoid the restriction.',
      },
    ],
    caption:
      'Section 10145(d)(5). Consent is one requirement, not an exception to the prohibition on broker or affiliated-licensee benefit.',
  },
  {
    id: 'exp-practice-app-subsidy-credit-alternative',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'screening-with-subsidized-rent',
    title: 'A missing credit score is not the end of screening',
    objective:
      'Apply the applicant-elected alternative-evidence process when government rental assistance is involved.',
    sourceUrls: [sources.stateHousing],
    kind: 'process',
    steps: [
      {
        label: 'Provider would use credit history',
        detail: 'Identify the qualifying government rent subsidy.',
      },
      {
        label: 'Offer the applicant a choice',
        detail:
          'Lawful, verifiable evidence of ability to pay the tenant share may replace credit history.',
      },
      {
        label: 'Applicant elects that route',
        detail:
          'Allow reasonable time for benefit records, pay records, bank statements, or other qualifying evidence.',
      },
      {
        label: 'Reasonably consider the evidence',
        detail:
          'Evaluate it in lieu of credit history; do not automatically reject a missing score.',
      },
    ],
    caption:
      'Government Code 12955(o)(1)(B). This process does not guarantee approval or prohibit permitted identity, employment, and landlord-reference checks.',
  },
  {
    id: 'exp-practice-app-housing-protection-layers',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'equal-opportunity-is-a-transaction-duty',
    title: 'California protection is not limited to seven labels',
    objective:
      'Recognize additional California statutory grounds without narrowing overlapping federal protection.',
    sourceUrls: [sources.federalHousing, sources.stateHousing],
    kind: 'comparison',
    columns: [
      {
        label: 'Federal statutory categories',
        points: [
          'Race, color, national origin, religion.',
          'Sex, familial status, disability.',
          'Apply the statute and relevant coverage rules.',
        ],
      },
      {
        label: 'Additional California examples',
        points: [
          'Marital status and ancestry.',
          'Source of income, including qualifying subsidies.',
          'Veteran or military status; genetic information.',
        ],
      },
    ],
    caption:
      'Illustrative comparison, not an exhaustive California list or a statement that these categories never overlap federal protections.',
  },
  {
    id: 'exp-practice-app-advertisement-people-versus-property',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'advertising-and-screening',
    title: 'Describe the dwelling, not a preferred resident',
    objective: 'Replace discriminatory resident preferences with accurate property information.',
    sourceUrls: [sources.stateHousing, sources.housing],
    kind: 'comparison',
    columns: [
      {
        label: 'Property information',
        points: [
          'Two bedrooms and an elevator.',
          'Entrance dimensions and floor level.',
          'Accurate rent and application terms.',
        ],
      },
      {
        label: 'Protected-characteristic filters',
        points: [
          'Adults only, without a qualifying exemption.',
          'No applicants using rental assistance.',
          'Residents of one preferred religion only.',
        ],
      },
    ],
    caption:
      'Assume ordinary covered housing and no applicable exemption. Accurate features support consumer choice; a preferred protected group is a different statement.',
  },
  {
    id: 'exp-practice-app-modification-cost-setting',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'disability-policies-and-physical-features',
    title: 'Identify why the physical work is needed',
    objective:
      "Distinguish a tenant-requested modification from the provider's existing maintenance or code obligation.",
    sourceUrls: [sources.housing],
    kind: 'comparison',
    columns: [
      {
        label: 'New tenant-requested feature',
        points: [
          'Reasonable grab-bar addition in ordinary private housing.',
          'Tenant generally bears modification cost under the applicable conditions.',
        ],
      },
      {
        label: 'Required feature was never installed',
        points: [
          'Accessibility feature was required when built.',
          "The provider cannot simply reclassify its code failure as the tenant's expense.",
        ],
      },
      {
        label: 'Existing accessible feature fails',
        points: [
          'Repair is required because of failed maintenance.',
          'Do not shift an existing provider repair duty by calling it a new modification.',
        ],
      },
    ],
    caption:
      'Funding rules and other laws can change payment obligations. The comparison assumes the stated underlying requirements are established.',
  },
  {
    id: 'exp-practice-app-retaliation-sequence',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'recognize-discrimination-before-a-rejection',
    title: 'Protected complaints cannot become a penalty trigger',
    objective:
      'Identify adverse treatment imposed because a resident opposed housing discrimination.',
    sourceUrls: [sources.stateHousing, sources.housing],
    kind: 'timeline',
    premise:
      "Fictional facts expressly establish retaliation as the owner's dominant purpose; no independent lawful reason is stated.",
    events: [
      {
        label: 'Resident objects',
        when: 'First event',
        detail: 'Reports a discriminatory rental practice.',
      },
      {
        label: "Owner's stated response",
        when: 'Later message',
        detail: 'Says the resident will lose parking because of the complaint.',
      },
      {
        label: 'Benefit withdrawn',
        when: 'Following week',
        detail: 'Parking is taken away on that stated basis.',
      },
    ],
    conclusion:
      'The protected complaint cannot be used as the reason to impose the adverse treatment.',
    caption:
      'Timing alone does not prove motive in every real case. Here the stated reason supplies the causal fact; Government Code 12955(f) and CRD guidance govern.',
  },
  {
    id: 'exp-practice-app-availability-treatment-record',
    lessonSlug: 'practice-fair-housing',
    afterSection: 'treat-choices-as-the-consumers-choices',
    title: 'Compare the service actually offered',
    objective:
      'Use matched availability records to identify unequal treatment needing investigation.',
    sourceUrls: [sources.stateHousing, sources.housing],
    kind: 'document',
    documentTitle: 'Fictional available-unit contact log',
    context:
      'Two callers ask for the same stated criteria; Unit 4 remains available throughout the period.',
    fields: [
      {
        label: 'Inventory record',
        value: 'Unit 4 available, 9:00-9:30',
        annotation: 'No intervening rental explains a changed answer.',
      },
      {
        label: 'First caller',
        value: 'Told available; tour offered',
        annotation: 'Record the information and opportunity given.',
      },
      {
        label: 'Second caller',
        value: 'Told unavailable after an accent is heard',
        annotation:
          'Investigate the reason for inconsistent service; an accent is not an eligibility criterion.',
      },
      {
        label: 'Review',
        value: 'Compare criteria and actual communications',
        annotation: 'Do not infer a lawful explanation from a completed checklist alone.',
      },
    ],
    conclusion: 'Equal service concerns access to information and tours, not only final approval.',
    caption:
      'Original instructional evidence excerpt. The comparison flags conduct for review rather than treating incomplete records alone as a final adjudication.',
  },
  {
    id: 'exp-practice-app-photo-alteration-sorting',
    lessonSlug: 'practice-ethics-advertising-technology',
    afterSection: 'digitally-altered-images',
    title: 'Classify the edit before selecting the disclosure',
    objective:
      'Apply the difference between a nonrepresentational photographic correction and a covered alteration.',
    sourceUrls: [sources.image],
    kind: 'comparison',
    columns: [
      {
        label: 'Exposure corrected',
        points: [
          'No represented property element changes.',
          'Fits the stated ordinary-adjustment exclusion.',
        ],
      },
      {
        label: 'Virtual furniture added',
        points: [
          'An element is added to the room.',
          'Covered alteration: disclosure and original access.',
        ],
      },
      {
        label: 'Utility pole erased',
        points: [
          'A visible outside element is removed.',
          'Covered alteration; truthfulness still matters.',
        ],
      },
    ],
    caption:
      'Section 10140.8 applies to specified real-property sales advertising. An excluded editing technique is not permission to create a misleading representation.',
  },
  {
    id: 'exp-practice-app-altered-image-public-access',
    lessonSlug: 'practice-ethics-advertising-technology',
    afterSection: 'distinguish-illustration-from-concealment',
    title: 'A private original does not complete the advertisement',
    objective: 'Read the two public-facing elements required beside a covered altered image.',
    sourceUrls: [sources.image, sources.misrepresentation],
    kind: 'document',
    documentTitle: 'Fictional publication review excerpt',
    context: 'Advertiser-controlled website shows a room with digitally removed shelving.',
    fields: [
      {
        label: 'On or beside the image',
        value: 'Conspicuous alteration statement',
        annotation: 'Identify alteration and explain where the original is accessible.',
      },
      {
        label: 'Original-image access',
        value: 'Public link to identified original',
        annotation:
          'The original must be publicly accessible, not behind a private transaction login.',
      },
      {
        label: 'Original retained in office',
        value: 'Useful evidence, not public access',
        annotation: 'Retention alone does not satisfy the posting requirement.',
      },
      {
        label: 'Claim about removal',
        value: 'No unsupported feasibility promise',
        annotation: 'An image disclosure does not prove structural or permit feasibility.',
      },
    ],
    conclusion: 'Check public presentation and factual accuracy as separate requirements.',
    caption: 'Original instructional excerpt, not complete advertising copy or a proprietary form.',
  },
  {
    id: 'exp-practice-app-ad-professional-identity',
    lessonSlug: 'practice-ethics-advertising-technology',
    afterSection: 'identify-the-professional-behind-the-advertisement',
    title: 'Make the responsible professional identifiable',
    objective:
      'Distinguish salesperson identification, responsible broker identity, and optional branding in a covered first-contact advertisement.',
    sourceUrls: [sources.adIdentity, sources.regs],
    kind: 'document',
    documentTitle: 'Fictional advertising identity check',
    context:
      'Ordinary salesperson first-contact website advertisement; no format-specific exemption is assumed.',
    fields: [
      {
        label: 'Salesperson',
        value: 'Fictional licensee name and DRE ID field',
        annotation: 'An actual advertisement needs the correct license identification number.',
      },
      {
        label: 'Responsible broker',
        value: "Broker's licensed name or authorized DBA",
        annotation: 'A network slogan alone does not identify the responsible broker.',
      },
      {
        label: 'Prominence',
        value: 'License ID remains readily legible',
        annotation: 'Apply the applicable size and display rules; do not bury required identity.',
      },
      {
        label: 'Team branding',
        value: 'Supplementary, not a new brokerage',
        annotation: 'Branding cannot imply the salesperson operates independently.',
      },
    ],
    conclusion:
      'A logo and a contact button do not substitute for required professional identification.',
    caption:
      'No real license numbers or personal information are used. This is an instructional specimen, not publishable advertising.',
  },
  {
    id: 'exp-practice-app-electronic-signature-three-questions',
    lessonSlug: 'practice-ethics-advertising-technology',
    afterSection: 'verify-identity-as-well-as-the-document',
    title: 'A signature image answers only part of the inquiry',
    objective:
      'Separate agreement to transact electronically, attribution, and substantive authority.',
    sourceUrls: [sources.electronicConsent, sources.electronicEffect, sources.electronicIdentity],
    kind: 'relationship',
    center: {
      label: 'Electronic transaction',
      detail: 'A digital format can have legal effect without resolving every validity question.',
    },
    nodes: [
      {
        label: 'Electronic agreement',
        connection: 'Section 1633.5',
        detail: 'Determine agreement from context and surrounding circumstances.',
      },
      {
        label: 'Signer attribution',
        connection: 'Section 1633.9',
        detail: 'Examine evidence that the act was theirs.',
      },
      {
        label: 'Authority and terms',
        connection: 'Other applicable law',
        detail: 'Electronic form does not cure lack of authority or unlawful terms.',
      },
    ],
    caption:
      'An audit trail is evidence, not an automatic finding that an account user could bind a company or principal.',
  },
  {
    id: 'exp-practice-app-independent-versus-coordinated-price',
    lessonSlug: 'practice-ethics-advertising-technology',
    afterSection: 'competition-and-compensation',
    title: 'Matching prices are not the same as an agreement',
    objective:
      'Identify coordination among competitors rather than inferring price fixing from similar fees alone.',
    sourceUrls: [sources.antitrust],
    kind: 'comparison',
    columns: [
      {
        label: 'Independent decisions',
        points: [
          'Firm A sets its own fee.',
          'Firm B separately chooses the same fee.',
          'Price similarity alone does not prove agreement.',
        ],
      },
      {
        label: 'Coordinated minimum',
        points: [
          'Competing firms agree not to quote below a common rate.',
          'Each firm publishes that rate to clients.',
          'Customer disclosure does not cure the coordination.',
        ],
      },
    ],
    caption:
      'Fictional firms. The problem is the agreement restraining independent competition, not whether the fee looks high or low.',
  },
  {
    id: 'exp-practice-app-claim-type-evidence',
    lessonSlug: 'practice-ethics-advertising-technology',
    afterSection: 'facts-opinions-and-omissions',
    title: 'Match a claim to the evidence it needs',
    objective:
      'Distinguish subjective promotion, historical facts, and permission-dependent projections.',
    sourceUrls: [sources.misrepresentation],
    kind: 'decision',
    question: 'What does this proposed statement assert?',
    branches: [
      {
        label: 'A charming living room',
        detail: 'Subjective description without a specific factual promise.',
        outcome: 'Evaluate the overall impression for honesty.',
      },
      {
        label: 'Roof replaced in 2024',
        detail: 'A claimed historical event.',
        outcome: 'Verify the work and date before stating it as fact.',
      },
      {
        label: 'Garage can legally become a rental',
        detail: 'A proposed use requiring applicable approvals.',
        outcome: 'Verify feasibility and authority; a photograph is insufficient.',
      },
    ],
    caption:
      'Context can make even opinion-like language misleading. A source attribution does not excuse ignoring known contradictions.',
  },
  {
    id: 'exp-practice-app-wire-loss-response-clock',
    lessonSlug: 'practice-ethics-advertising-technology',
    afterSection: 'worked-scenario-the-altered-wire-instruction',
    title: 'After the wire, delay is another risk',
    objective:
      'Prioritize urgent financial-institution contact and reporting after suspected closing-wire fraud.',
    sourceUrls: [sources.wire],
    kind: 'timeline',
    premise:
      'A fictional buyer discovers that closing funds went to an account from a fraudulent message.',
    events: [
      {
        label: 'Contact sending institution',
        when: 'Immediately',
        detail: 'Request action to stop or reverse the transfer.',
      },
      {
        label: 'Report the fraud',
        when: 'Promptly',
        detail: 'File with the FBI Internet Crime Complaint Center.',
      },
      {
        label: 'Preserve the trail',
        when: 'Alongside response',
        detail: 'Keep the message, transfer details, and relevant records.',
      },
      {
        label: 'Re-establish trusted contact',
        when: 'Before further payment',
        detail: 'Use previously verified settlement contacts, not the suspicious message.',
      },
    ],
    conclusion: 'Act quickly without promising that transferred funds will be recovered.',
    caption:
      'CFPB guidance identifies urgent bank contact and FBI reporting. The record-preservation step supports the response; it is not a guarantee of recovery.',
  },
  {
    id: 'exp-practice-app-manager-spending-authority',
    lessonSlug: 'practice-property-management',
    afterSection: 'the-manager-represents-the-owner-within-limits',
    title: 'A repair budget is not a blank authorization',
    objective:
      "Read a management agreement's per-job authority limit before approving a nonemergency expense.",
    sourceUrls: [sources.authority, sources.management],
    kind: 'document',
    documentTitle: 'Fictional management authority excerpt',
    context:
      'No emergency, later authorization, or other applicable duty changes the stated authority.',
    fields: [
      {
        label: 'Annual repair budget',
        value: '$9,000',
        annotation: 'Planning total, not authority to approve every individual job.',
      },
      {
        label: 'Nonemergency approval limit',
        value: '$800 per job',
        annotation: "Larger commitments require the owner's prior approval.",
      },
      {
        label: 'Proposed repair',
        value: '$1,250 plumbing replacement',
        annotation: 'Within annual budget but above delegated authority.',
      },
      {
        label: 'Required next evidence',
        value: "Owner's authorization",
        annotation: 'Document approval before making the commitment.',
      },
    ],
    conclusion: '$9,000 available in a budget does not supply authority for this $1,250 contract.',
    caption:
      'Original instructional excerpt. Actual management authority follows the agreement and applicable law, not these fictional dollar amounts.',
  },
  {
    id: 'exp-practice-app-small-owner-deposit-facts',
    lessonSlug: 'practice-property-management',
    afterSection: 'current-security-deposit-limits',
    title: 'Change the owner or tenant, change the ceiling',
    objective:
      'Apply the small-owner security-deposit exception to ownership composition, portfolio size, and service-member status.',
    sourceUrls: [sources.security],
    kind: 'decision',
    question:
      'For new security demanded in 2026 at $2,400 monthly rent, does the stated small-owner exception apply?',
    branches: [
      {
        label: 'Individual; 2 properties and 4 units',
        detail: 'All units offered for rent; prospective tenant is not a service member.',
        outcome: 'Up to $4,800 under this exception.',
      },
      {
        label: 'Same portfolio; LLC has a corporate member',
        detail: 'The all-natural-person membership condition fails.',
        outcome: 'Ordinary $2,400 ceiling, absent another applicable exception.',
      },
      {
        label: 'Qualifying owner; tenant is a service member',
        detail: 'The higher small-owner limit does not apply.',
        outcome: 'Ordinary $2,400 ceiling; do not refuse because of this limit.',
      },
    ],
    caption:
      "Security is separate from first-month rent. Count the owner's whole relevant portfolio, not just the property being leased; other statutory exceptions require their own facts.",
  },
  {
    id: 'exp-practice-app-remaining-life-damage-chart',
    lessonSlug: 'practice-property-management',
    afterSection: 'calculate-damage-without-funding-an-upgrade',
    title: 'Remaining useful life limits the damage charge',
    objective:
      "Prorate a damaged item's remaining useful life instead of charging the tenant for an entirely new item.",
    sourceUrls: [sources.security, sources.landlordGuide],
    kind: 'chart',
    xAxis: {
      label: 'Carpet age at damage, years',
      format: 'number',
    },
    yAxis: {
      label: 'Illustrative remaining-life charge',
      format: 'currency',
    },
    series: [
      {
        label: '$1,200 similar replacement; 6-year useful life',
        points: [
          {
            x: 0,
            y: 1200,
          },
          {
            x: 2,
            y: 800,
          },
          {
            x: 4,
            y: 400,
          },
          {
            x: 6,
            y: 0,
          },
        ],
      },
    ],
    conclusion: 'At year 4, two of six years remain: $1,200 times 2 / 6 = $400.',
    caption:
      'Assume documented tenant damage beyond wear, reasonable necessary replacement, and the stated life. Straight-line proration is an illustrative method from the DRE guide, not a universal statutory schedule.',
  },
  {
    id: 'exp-practice-app-management-fee-collection-base',
    lessonSlug: 'practice-property-management',
    afterSection: 'reconcile-the-budget-with-cash',
    title: 'A collected-rent fee follows collection',
    objective:
      'Calculate a contractual management fee on actual rent received, not scheduled rent or security deposits.',
    sourceUrls: [sources.authority, sources.management],
    kind: 'chart',
    xAxis: {
      label: 'Rent actually collected',
      format: 'currency',
    },
    yAxis: {
      label: 'Management fee',
      format: 'currency',
    },
    series: [
      {
        label: 'Fictional agreement: 5% of rent collected',
        points: [
          {
            x: 0,
            y: 0,
          },
          {
            x: 5000,
            y: 250,
          },
          {
            x: 10000,
            y: 500,
          },
          {
            x: 15000,
            y: 750,
          },
        ],
      },
    ],
    conclusion:
      'If $12,000 was scheduled but only $10,000 collected, this agreement produces a $500 fee, not $600.',
    caption:
      'The line assumes an unchanged 5% contractual rate and no other fee term. Security deposits are not rent collected for this defined base; 5% is illustrative, not a prescribed market rate.',
  },
  {
    id: 'exp-practice-app-entry-purpose-notice',
    lessonSlug: 'practice-property-management',
    afterSection: 'handle-an-occupied-unit-emergency',
    title: 'An emergency exception is tied to the emergency',
    objective: 'Separate emergency entry, ordinary repair notice, and present-tenant consent.',
    sourceUrls: [sources.entry],
    kind: 'decision',
    question: 'What authorizes entry into this dwelling?',
    branches: [
      {
        label: 'Active emergency flooding',
        detail: 'Entry responds to an actual emergency.',
        outcome: 'No advance entry notice required for that response.',
      },
      {
        label: 'Routine necessary repair',
        detail: 'No other notice exception applies.',
        outcome:
          'Reasonable written notice; 24 hours is presumptively reasonable, with normal-business-hours entry.',
      },
      {
        label: 'Tenant present and consenting',
        detail: 'Consent is given at the time of entry.',
        outcome: 'The stated advance-notice exception applies.',
      },
    ],
    caption:
      'Section 1954 contains additional conditions and routes. Do not use a completed emergency as permission for unrelated visits or harassment.',
  },
  {
    id: 'exp-practice-app-residential-notice-service-branches',
    lessonSlug: 'practice-property-management',
    afterSection: 'choose-the-notice-before-counting-days',
    title: 'Posting is a conditional service route',
    objective:
      'Apply the residential notice-service conditions and retain the required mailed copy.',
    sourceUrls: [sources.service],
    kind: 'decision',
    question: 'How can a notice governed by CCP 1162(a) be served?',
    branches: [
      {
        label: 'Tenant found personally',
        detail: 'Deliver a copy to the tenant.',
        outcome: 'Personal service route.',
      },
      {
        label: 'Tenant absent at residence and usual business',
        detail:
          'Leave with a suitable-age, discreet person at either place; mail to the residence.',
        outcome: 'Substituted delivery plus mailing.',
      },
      {
        label: 'Places cannot be ascertained, or no suitable person found',
        detail: 'Post conspicuously; give a copy to a resident if found; mail to the property.',
        outcome: 'Conditional posting route with the additional required acts.',
      },
    ],
    caption:
      'This is the residential branch, not commercial service under subdivision (b). A photo of a posted notice does not prove all conditions and additional delivery acts were satisfied.',
  },
  {
    id: 'exp-practice-app-reimbursement-no-double-count',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'income-is-evidence-to-verify',
    title: 'Count reimbursements and expenses once each',
    objective:
      'Normalize landlord-paid operating costs and tenant reimbursements without omitting or double counting either.',
    sourceUrls: [sources.commercial, sources.valuation],
    kind: 'calculation',
    rows: [
      {
        label: 'Collected annual base rent',
        amount: 60000,
      },
      {
        label: 'Collected operating-cost reimbursements',
        amount: 12000,
      },
      {
        label: 'Full landlord-paid operating expenses',
        amount: -20000,
      },
    ],
    result: {
      label: 'Net operating income',
      amount: 52000,
      detail: '$72,000 income minus $20,000 operating expenses.',
    },
    caption:
      'Fictional annual statement with no other income, vacancy adjustment, or expenses. Do not both add the $12,000 reimbursement and subtract only the $8,000 net expense: that would count the benefit twice.',
  },
  {
    id: 'exp-practice-app-lease-expiration-concentration',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'follow-a-discrepancy-through-due-diligence',
    title: 'Full occupancy can conceal near-term rollover',
    objective: 'Identify the portion of current rent exposed to near-term lease expirations.',
    sourceUrls: [sources.commercial],
    kind: 'timeline',
    premise:
      'At January 1, a fully occupied fictional property collects $10,000 monthly. No renewal or holdover income is guaranteed.',
    events: [
      {
        label: 'Tenant A',
        when: 'February 28 expiration',
        detail: '$3,000 monthly base rent.',
      },
      {
        label: 'Tenant B',
        when: 'March 31 expiration',
        detail: '$2,000 monthly base rent.',
      },
      {
        label: 'Tenant C',
        when: 'December 31 expiration',
        detail: '$5,000 monthly base rent.',
      },
    ],
    conclusion: 'Half of current monthly rent reaches lease expiration in the first quarter.',
    caption:
      'This identifies timing exposure, not a forecast of automatic vacancy. Verify renewal rights, tenant plans, reletting time, and associated costs.',
  },
  {
    id: 'exp-practice-app-percentage-rent-breakpoint',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'lease-labels-need-supporting-language',
    title: 'Only sales above the breakpoint add percentage rent',
    objective:
      'Graph a stated base-plus-percentage lease without applying the percentage to all sales or to profit.',
    sourceUrls: [sources.contract],
    kind: 'chart',
    xAxis: {
      label: 'Annual defined gross sales',
      format: 'currency',
    },
    yAxis: {
      label: 'Annual rent before other charges',
      format: 'currency',
    },
    series: [
      {
        label: '$30,000 base + 5% of sales above $600,000',
        points: [
          {
            x: 0,
            y: 30000,
          },
          {
            x: 300000,
            y: 30000,
          },
          {
            x: 600000,
            y: 30000,
          },
          {
            x: 900000,
            y: 45000,
          },
          {
            x: 1200000,
            y: 60000,
          },
        ],
      },
    ],
    conclusion: 'At $900,000 sales, rent is $30,000 + 5% of $300,000 = $45,000.',
    caption:
      'Fictional express lease formula; straight segments follow that formula between points. Other leases can define a different breakpoint, sales base, or rent structure.',
  },
  {
    id: 'exp-practice-app-bulk-value-two-measures',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'when-an-asset-sale-is-a-bulk-sale',
    title: 'The two dollar exclusions use different bases',
    objective:
      'Apply the lower net-value exclusion and upper asset-value exclusion without swapping their measures.',
    sourceUrls: [sources.bulk],
    kind: 'decision',
    question:
      'Assume business, location, quantity, and extraordinary-sale tests are met; do these value exclusions apply?',
    branches: [
      {
        label: '$12,000 assets; $3,000 liens',
        detail: 'Net value at the bulk sale is $9,000.',
        outcome: 'Below $10,000: lower-value exclusion applies.',
      },
      {
        label: '$15,000 assets; $5,000 liens',
        detail: 'Net value at the bulk sale is exactly $10,000.',
        outcome: 'Not below $10,000: this exclusion does not apply.',
      },
      {
        label: '$5.1 million assets; $4 million liens',
        detail: 'Asset value at the agreement exceeds $5 million.',
        outcome: 'Upper-value exclusion applies despite the lower net equity.',
      },
    ],
    caption:
      "Commercial Code 6103(c)(12). Assume the stated debts are secured solely by the sold assets and no other exclusion controls; jointly secured debt requires the statute's allocation.",
  },
  {
    id: 'exp-practice-app-clearance-versus-registration',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'protect-the-buyer-from-a-different-tax-problem',
    title: 'A permit, request, and certificate do different work',
    objective:
      'Distinguish tax account registration and a pending clearance request from issued seller-tax clearance.',
    sourceUrls: [sources.clearanceDetail],
    kind: 'document',
    documentTitle: 'Fictional business-purchase tax file',
    context: 'The sales-and-use-tax successor rules apply; the buyer is a new business entity.',
    fields: [
      {
        label: "Seller's existing account",
        value: 'Issued to the selling entity',
        annotation:
          "An account is valid for its named entity, not proof of the buyer's registration.",
      },
      {
        label: 'Clearance request',
        value: 'Submitted with purchase details',
        annotation: 'A request alone is not the certificate releasing withholding.',
      },
      {
        label: 'Issued certificate',
        value: 'CDTFA states no seller amount due',
        annotation: 'This addresses the covered seller-tax withholding obligation.',
      },
      {
        label: "Buyer's account",
        value: 'New entity registration checked',
        annotation: "Separate from clearing the seller's historical liability.",
      },
    ],
    conclusion: "Verify the document's function and status before treating it as complete.",
    caption:
      'Original instructional excerpt, not a tax certificate. A clearance does not release unrelated liens or supply landlord assignment consent.',
  },
  {
    id: 'exp-practice-app-environmental-data-gap-specimen',
    lessonSlug: 'practice-commercial-specialties',
    afterSection: 'environmental-and-physical-investigation',
    title: 'Read the unresolved part of the environmental report',
    objective:
      'Recognize a significant data gap and recommended inquiry instead of treating a Phase I label as a clean-site guarantee.',
    sourceUrls: [sources.aai],
    kind: 'document',
    documentTitle: 'Fictional environmental inquiry excerpt',
    context:
      'An environmental professional evaluates former industrial use; this is not a real report or conclusion about an actual site.',
    fields: [
      {
        label: 'Historical clue',
        value: 'Earlier records identify solvent use',
        annotation: 'Past use supplies a reason for professional evaluation.',
      },
      {
        label: 'Missing evidence',
        value: 'Some disposal records unavailable',
        annotation: 'The professional must assess whether the data gap is significant.',
      },
      {
        label: 'Written opinion',
        value: 'Further investigation recommended',
        annotation: 'Read the reasoning and scope; do not summarize this as no contamination.',
      },
      {
        label: 'Additional work',
        value: 'Targeted sampling may be proposed',
        annotation:
          'Phase II sampling is an additional service, not proof already contained in a Phase I label.',
      },
    ],
    conclusion:
      'Identify what was learned, what remains uncertain, and what the professional recommends.',
    caption:
      'EPA AAI guidance requires relevant opinions and significant-data-gap documentation. This excerpt does not establish that all AAI or liability-protection conditions are satisfied.',
  },
  {
    id: 'exp-practice-app-known-report-versus-empty-form',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'keep-the-remaining-duties',
    title: 'A blank form does not erase a known report',
    objective: 'Distinguish disclosure-form status from an independently known material condition.',
    sourceUrls: [sources.tdsOther, sources.inspection],
    kind: 'document',
    documentTitle: 'Fictional disclosure-file discrepancy',
    context: "The agent has a contractor's existing letter about material foundation movement.",
    fields: [
      {
        label: "Seller's form response",
        value: 'No known foundation problem',
        annotation: 'Compare the response with information actually in the file.',
      },
      {
        label: "Contractor's letter",
        value: 'Prior movement and recommended evaluation',
        annotation: 'The letter is known information, not a hidden condition the agent must guess.',
      },
      {
        label: 'Required response',
        value: 'Disclose the conflict and seek clarification',
        annotation: 'Do not select the favorable document and discard the other.',
      },
    ],
    conclusion: 'Form delivery does not replace the duty to address known material facts.',
    caption:
      'Original instructional excerpt. Neither the form nor this comparison is a technical foundation diagnosis.',
  },
  {
    id: 'exp-practice-app-tds-delivery-method-clock',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'keep-separate-delivery-clocks-visible',
    title: 'The delivery method changes the TDS period',
    objective:
      'Choose the statutory postexecution termination period for a complete late TDS or material amendment.',
    sourceUrls: [sources.tds],
    kind: 'comparison',
    columns: [
      {
        label: 'Personal delivery',
        points: [
          'Complete required sections delivered after execution of the offer.',
          'Three days after delivery.',
        ],
      },
      {
        label: 'Deposit in the mail',
        points: [
          'Complete required sections delivered by the statutory mailing route.',
          'Five days after deposit in the mail.',
        ],
      },
      {
        label: 'Agreed electronic transaction',
        points: [
          "Complete required sections delivered electronically under the parties' agreement.",
          'Five days after electronic delivery.',
        ],
      },
    ],
    caption:
      "Written termination notice must be delivered to the seller or seller's agent. This compares statutory periods, not a dated deadline calculation or the contract's separate inspection contingency.",
  },
  {
    id: 'exp-practice-app-nhd-six-mapped-questions',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'the-natural-hazard-disclosure',
    title: 'Six map questions are not one safety rating',
    objective:
      'Separate the principal NHD hazard categories instead of treating one negative answer as a clean bill of health.',
    sourceUrls: [sources.nhd],
    kind: 'comparison',
    caption:
      'Section 1103.2 describes the exact categories and qualifiers. A mapped answer estimates hazard; it is not a guarantee that a disaster will or will not occur.',
    columns: [
      {
        label: 'Flooding',
        points: [
          'FEMA special flood hazard: specified A or V zones.',
          'Potential flooding from dam failure.',
        ],
      },
      {
        label: 'Fire',
        points: [
          'Specified high or very high fire hazard severity zones.',
          'Qualifying wildland fire area.',
        ],
      },
      {
        label: 'Ground movement',
        points: ['Earthquake fault zone.', 'Seismic hazard: landslide or liquefaction.'],
      },
    ],
  },
  {
    id: 'exp-practice-app-visual-inspection-spatial-limits',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'the-agents-inspection-and-its-limits',
    title: 'Separate accessible space from excluded inspection areas',
    objective:
      'Locate the ordinary statutory visual-inspection scope without confusing its limits with permission to suppress known facts.',
    sourceUrls: [sources.inspection, sources.inspectionLimit],
    kind: 'parcel',
    extent: {
      width: 120,
      height: 75,
    },
    unit: 'schematic',
    areas: [
      {
        key: 'A',
        label: 'Accessible room',
        x: 5,
        y: 10,
        width: 40,
        height: 50,
        pattern: 'clear',
        description:
          'Within the subject: reasonably competent and diligent visual inspection applies to accessible conditions.',
      },
      {
        key: 'B',
        label: 'Inaccessible void',
        x: 48,
        y: 10,
        width: 27,
        height: 50,
        pattern: 'hatch',
        description:
          'Assume normally and reasonably inaccessible without opening a wall; excluded from this statutory visual examination.',
      },
      {
        key: 'C',
        label: 'Neighbor site',
        x: 88,
        y: 10,
        width: 27,
        height: 50,
        pattern: 'solid',
        description:
          "Off-site affirmative inspection is not part of the article's ordinary inspection scope.",
      },
    ],
    lines: [
      {
        label: 'Subject boundary',
        from: {
          x: 81,
          y: 0,
        },
        to: {
          x: 81,
          y: 75,
        },
        style: 'dashed',
        labelAt: {
          x: 60,
          y: 70,
        },
      },
    ],
    conclusion:
      'Scope limits concern what must be inspected, not whether already known material information may be concealed.',
    caption:
      'Fictional schematic, not a survey or full inspection protocol. Other contractual, fiduciary, or common-law duties can go beyond this statutory scope.',
  },
  {
    id: 'exp-practice-app-new-leak-after-report',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'coordinate-reports-without-treating-them-as-substitutes',
    title: 'Later evidence can reopen an earlier conclusion',
    objective:
      'Respond to a material new observation instead of relying mechanically on an older specialist report.',
    sourceUrls: [sources.inspection, sources.tdsOther],
    kind: 'timeline',
    premise:
      'A fictional roof report predates a storm; the agent later observes water entering the living room.',
    events: [
      {
        label: 'Earlier report delivered',
        when: 'Before the storm',
        detail: 'Report describes the conditions and limits of that earlier inspection.',
      },
      {
        label: 'New leak observed',
        when: 'After the storm',
        detail: 'A material current fact now conflicts with a clean summary.',
      },
      {
        label: 'Communicate the change',
        when: 'Promptly after discovery',
        detail: 'Disclose the new observation and provide the relevant report context.',
      },
      {
        label: 'Targeted follow-up',
        when: 'Within applicable investigation rights',
        detail: 'Seek qualified evaluation; keep contractual deadlines separate.',
      },
    ],
    conclusion:
      'An earlier report is evidence with a date and scope, not immunity from later information.',
    caption:
      'The agent communicates facts and coordinates expertise; the sequence does not diagnose the leak or guarantee an extension of contract deadlines.',
  },
  {
    id: 'exp-practice-app-lead-precommitment-sequence',
    lessonSlug: 'practice-disclosures-inspections',
    afterSection: 'federal-lead-and-sensitive-facts',
    title: 'Place lead information before commitment',
    objective:
      "Distinguish the lead information supplied before commitment from the buyer's inspection opportunity and later closing.",
    sourceUrls: [sources.lead],
    kind: 'timeline',
    premise: 'A covered pre-1978 sale with no applicable exclusion.',
    events: [
      {
        label: 'Required information supplied',
        when: 'Before the buyer becomes bound',
        detail:
          'Known lead facts, available reports, pamphlet, and prescribed warning/acknowledgment.',
      },
      {
        label: 'Inspection opportunity',
        when: 'Normally 10 days',
        detail: 'Opportunity to inspect or assess risk; not a mandatory seller-funded test.',
      },
      {
        label: 'Different inspection arrangement',
        when: 'If properly agreed or waived',
        detail: 'A written period change or buyer waiver does not erase required information.',
      },
      {
        label: 'Transaction proceeds',
        when: 'Under the actual agreement',
        detail: 'Do not substitute a TDS period or closing date for the lead requirements.',
      },
    ],
    conclusion: 'Information, opportunity, and closing are separate events with separate effects.',
    caption:
      'Original instructional sequence. It does not assert that the parties must wait ten days to sign regardless of a valid inspection arrangement.',
  },
]
