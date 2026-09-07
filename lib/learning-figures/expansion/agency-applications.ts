import type { LearningFigureSpec } from '../types'

const authority =
  'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=9.&part=4.&chapter=1.&article=2.'
const reliance =
  'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=9.&part=4.&chapter=1.&article=3.'
const agencyDuties =
  'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=2079.16.'
const agencyArticle =
  'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=6.&part=4.&chapter=3.&article=2.'
const professional = 'https://dre.ca.gov/files/pdf/ProfessionalResponsibilityCourseBooklet.pdf'
const disclosureTiming =
  'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=2079.14.'
const confirmation =
  'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=2079.17.'
const confidence =
  'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=2079.21.'
const buyerFees =
  'https://www.dre.ca.gov/Licensees/Advisory_2024_11_14_Changes_to_Buyer_Representation.html'
const compensation =
  'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10137.'
const termination =
  'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=9.&part=4.&chapter=1.&article=6.'
const respa =
  'https://www.consumerfinance.gov/compliance/compliance-resources/mortgage-resources/real-estate-settlement-procedures-act/real-estate-settlement-procedures-act-faqs/'

export const agencyApplicationFigures: LearningFigureSpec[] = [
  {
    id: 'exp-agency-three-legal-questions',
    lessonSlug: 'agency-relationships',
    afterSection: 'how-agency-is-created',
    title: 'One conversation, three separate legal questions',
    objective:
      'Separate an undertaking that creates agency duties from enforceable compensation and authority to bind an owner.',
    sourceUrls: [
      professional,
      authority,
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1624.',
    ],
    kind: 'document',
    documentTitle: 'Engagement evidence: fictional file review',
    context:
      'An owner orally asks a broker to find a buyer. The broker agrees, begins negotiations, and later claims an orally promised fee.',
    fields: [
      {
        label: 'Undertaking',
        value: 'Find and negotiate with prospective purchasers.',
        annotation:
          'The agreed undertaking and conduct can establish a relationship carrying duties; an oral arrangement is not permission to act dishonestly.',
      },
      {
        label: 'Compensation evidence',
        value: 'Only an oral promise of a brokerage fee.',
        annotation:
          'The statute of frauds separately governs the required writing for an agreement employing a broker to buy or sell real estate for compensation.',
      },
      {
        label: 'Proposed signature',
        value: 'Broker proposes signing the sale contract for the owner.',
        annotation:
          'Finding a buyer does not itself grant signing authority. Authority for a contract legally required to be written must be given in writing.',
      },
    ],
    conclusion:
      'Do not answer all three questions with "there is an agency." Identify duties, fee enforceability, and the particular act authorized.',
    caption:
      'An agent cannot use a defective compensation arrangement to escape duties already undertaken, or use a fee agreement as substitute authority to convey property.',
  },
  {
    id: 'exp-agency-manager-instruction-limits',
    lessonSlug: 'agency-relationships',
    afterSection: 'authority-can-be-narrower-than-the-assignment',
    title: 'A management assignment still has spending limits',
    objective:
      'Apply specific instructions and the narrow emergency-authority rule to three proposed expenditures.',
    sourceUrls: [authority],
    kind: 'decision',
    question:
      'A fictional agreement authorizes ordinary repairs up to $900 per job. Larger work needs owner approval. What changes the authority analysis?',
    branches: [
      {
        label: '$640 ordinary repair',
        detail: 'Replacing a failed valve is within the stated assignment and spending limit.',
        outcome: 'Authorized on these facts.',
      },
      {
        label: '$3,600 planned upgrade',
        detail:
          'The manager can contact the owner. Calling the work four $900 invoices does not change this one job.',
        outcome: 'Obtain approval; do not enlarge the express limit.',
      },
      {
        label: 'Active flooding',
        detail:
          "There is no time to communicate with the owner, and immediate protective action is clearly in the owner's interest.",
        outcome: 'Analyze the emergency exception, not a general power to renovate.',
      },
    ],
    caption:
      "Civil Code 2320 requires both the principal's clear interest and lack of time to communicate. A convenient improvement is not the same as an emergency.",
  },
  {
    id: 'exp-agency-contractor-restriction-file',
    lessonSlug: 'agency-relationships',
    afterSection: 'compare-two-unauthorized-promises',
    title: 'The contractor has the restriction in writing',
    objective:
      "Identify why known limits undermine an ostensible-authority claim despite a manager's reassuring statement.",
    sourceUrls: [authority, reliance],
    kind: 'document',
    documentTitle: 'Repair approval file: fictional excerpts',
    context: 'A contractor wants the owner to pay for a $5,500 replacement ordered by a manager.',
    fields: [
      {
        label: "Owner's email",
        value: 'Manager may approve work up to $1,000. Send larger estimates to me.',
        annotation: 'The contractor receives the restriction before agreeing to the replacement.',
      },
      {
        label: "Manager's message",
        value: 'Do not worry about the limit; I can approve everything.',
        annotation:
          "The agent's assertion alone does not create broader authority from the principal.",
      },
      {
        label: "Owner's conduct",
        value: 'No broader holding out and no later approval are shown.',
        annotation:
          'The facts do not supply principal-created appearance or subsequent ratification.',
      },
      {
        label: 'Changed fact',
        value: 'Owner personally approves this estimate before work begins.',
        annotation:
          'Now examine that actual approval rather than trying to rely on an appearance contradicted by the written limit.',
      },
    ],
    conclusion:
      "A third party cannot disregard a known restriction and turn the agent's confidence into the owner's authorization.",
    caption:
      'For an ostensible-authority question, inspect evidence from the principal and what the third party knew when committing to the transaction.',
  },
  {
    id: 'exp-agency-reliance-before-commitment',
    lessonSlug: 'agency-relationships',
    afterSection: 'actual-and-ostensible-authority',
    title: 'Reasonable reliance must precede the commitment',
    objective:
      "Place principal-created appearance, notice of a restriction, and a third party's commitment in the correct order.",
    sourceUrls: [authority, reliance],
    kind: 'timeline',
    premise:
      "The owner has repeatedly directed a vendor to accept the manager's ordinary repair orders. Assume no actual authority for the disputed new order.",
    events: [
      {
        label: 'Appearance created',
        when: 'Monday',
        detail:
          "The owner's communications and past conduct suggest authority for this class of repair.",
      },
      {
        label: 'Vendor commits',
        when: 'Tuesday, case A',
        detail:
          'Without contrary notice, the vendor exercises ordinary care and incurs a payment obligation for materials relying on that appearance.',
      },
      {
        label: 'Restriction arrives first',
        when: 'Changed case B',
        detail:
          "Instead, the vendor receives the owner's restriction before committing, then proceeds solely on the manager's assurance.",
      },
    ],
    conclusion:
      'Case A supports the statutory reliance inquiry. Case B changes the knowledge and ordinary-care facts; the same job price does not produce the same result.',
    caption:
      'Civil Code 2334 requires good-faith reliance without lack of ordinary care and liability incurred or value given. A belief without the required reliance is incomplete.',
  },
  {
    id: 'exp-agency-notice-chain',
    lessonSlug: 'agency-relationships',
    afterSection: 'notice-and-responsibility',
    title: "A material response cannot wait in the agent's inbox",
    objective:
      "Apply the principal-agent notice rule without confusing it with the contract's separate delivery requirements.",
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=2332.',
    ],
    kind: 'timeline',
    premise:
      "A buyer's agent receives a material seller response within the agency. Assume the response is genuine; any formal contractual delivery issue must be checked separately.",
    events: [
      {
        label: 'Agent learns',
        when: '10:00 a.m.',
        detail: 'The response affects a decision the buyer must make that afternoon.',
      },
      {
        label: 'Duty to communicate',
        when: 'Promptly',
        detail:
          'Ordinary care and good faith call for relaying the response and its significance, using a reasonable follow-up if the buyer does not respond.',
      },
      {
        label: 'Principal decides',
        when: 'Before the decision point',
        detail:
          'The buyer evaluates the actual terms. The agent does not substitute a private decision that the response is unimportant.',
      },
    ],
    conclusion:
      'Section 2332 can attribute notice of information the agent ought to communicate. Keeping the buyer uninformed does not safely postpone the consequences.',
    caption:
      'Imputed knowledge and compliance with an agreed notice method are different issues. This illustration does not declare that every email legally starts every contract clock.',
  },
  {
    id: 'exp-agency-indivisible-ratification',
    lessonSlug: 'agency-relationships',
    afterSection: 'ratification-and-powers-of-attorney',
    title: 'Ratification includes the indivisible bargain',
    objective:
      'Recognize that informed ratification cannot accept only the favorable portion of an indivisible transaction.',
    sourceUrls: [authority],
    kind: 'document',
    documentTitle: 'Unauthorized purchase: fictional decision file',
    context:
      'Assume an ordinary personal-property purchase for the managed building, oral authority would suffice, and the owner has capacity and full knowledge.',
    fields: [
      {
        label: 'Unauthorized bargain',
        value: 'One indivisible $820 package: cleaning machine plus required service plan.',
        annotation:
          'The manager had no original authority. The package is expressly not separable into independent contracts.',
      },
      {
        label: 'Material information',
        value: 'Owner receives the complete price and service-plan terms.',
        annotation:
          'Informed adoption requires the material transaction facts, not merely knowledge that equipment arrived.',
      },
      {
        label: "Owner's proposed response",
        value: 'I adopt the purchase but reject the service-plan burden.',
        annotation:
          'Ratifying part of this indivisible transaction ratifies the whole under Civil Code 2311.',
      },
      {
        label: 'Writing variant',
        value: 'The unauthorized act instead involves a contract requiring written authority.',
        annotation:
          'Apply the ratification formalities required for that act; benefit retention is not a universal substitute for a writing.',
      },
    ],
    conclusion:
      'The owner must evaluate the whole package. Ratification does not mean selecting benefits while discarding inseparable obligations.',
    caption:
      'The teaching assumptions isolate Civil Code 2310 and 2311; ratification also cannot override other limits on validity or prejudice protected third-party rights.',
  },
  {
    id: 'exp-agency-poa-specific-powers',
    lessonSlug: 'agency-relationships',
    afterSection: 'ratification-and-powers-of-attorney',
    title: 'Read the granted power, not the document label',
    objective:
      'Distinguish authority to manage a property from written authority to execute a sale contract or conveyance.',
    sourceUrls: [authority, professional],
    kind: 'document',
    documentTitle: 'Limited authority: fictional teaching excerpt',
    context:
      'This is not a power-of-attorney form. Assume a valid, currently effective instrument and no separate grant of authority.',
    fields: [
      {
        label: 'Named representative',
        value: 'Avery, attorney-in-fact for the owner.',
        annotation:
          'Attorney-in-fact describes a representative role; it does not establish that Avery is an attorney at law.',
      },
      {
        label: 'Express powers',
        value: 'Collect rents and order ordinary maintenance at 18 Pine Street.',
        annotation: 'These management powers identify the acts the owner granted.',
      },
      {
        label: 'Express restriction',
        value: 'No power to sell, mortgage, or sign a deed.',
        annotation:
          'Broad wording such as "manage all matters" does not erase this specific limitation.',
      },
      {
        label: 'Proposed act',
        value: "Accept a purchaser's offer and sign for the owner.",
        annotation:
          'That act is outside this excerpt. Obtain and verify appropriate authority rather than infer it from the title.',
      },
    ],
    conclusion:
      'The correct question is whether the instrument authorizes this act now, not whether the representative possesses a document called a power of attorney.',
    caption:
      'A real transaction also requires checking execution, scope, effectiveness, revocation, and any applicable recording requirements.',
  },
  {
    id: 'exp-agency-cooperation-not-subagency',
    lessonSlug: 'agency-relationships',
    afterSection: 'classify-the-scope-of-the-job',
    title: 'Cooperating on a lease does not identify the principal',
    objective:
      'Distinguish cooperation, a referral, and authorized subagency by examining actual representation undertakings.',
    sourceUrls: [professional],
    kind: 'relationship',
    center: {
      label: "Tenant's brokerage",
      detail:
        'Assume a written engagement to find warehouse space and negotiate for the tenant only; no subagency has been authorized.',
    },
    nodes: [
      {
        label: 'Tenant',
        connection: 'client',
        detail: 'The brokerage undertakes tenant-side representation under the stated engagement.',
      },
      {
        label: "Landlord's brokerage",
        connection: 'cooperation',
        detail:
          "Exchanging access, proposals, and market information does not itself convert the tenant broker into the landlord's subagent.",
      },
      {
        label: 'Referring brokerage',
        connection: 'introduction',
        detail:
          'Introducing the tenant to this brokerage does not by itself make the referring broker the agent of every party in the lease.',
      },
    ],
    caption:
      'Change the authorized undertaking and the classification may change. Follow assent, scope, and conduct, not the fact that two licensees worked on the same transaction.',
  },
  {
    id: 'exp-agency-offer-net-and-risk',
    lessonSlug: 'agency-fiduciary-duties',
    afterSection: 'compare-offers-in-the-clients-terms',
    title: 'The larger offer has the smaller price-minus-credit amount',
    objective:
      'Compare arithmetic and performance conditions without treating either the highest price or fewest contingencies as an automatic recommendation.',
    sourceUrls: [agencyDuties],
    kind: 'comparison',
    columns: [
      {
        label: 'Offer A: $735,000',
        points: [
          'Requested seller credit: $12,000. Price less credit: $723,000.',
          'Buyer must sell another home; proposed closing is 50 days away.',
          'The headline price is higher, but both the credit and performance conditions matter.',
        ],
      },
      {
        label: 'Offer B: $728,000',
        points: [
          'Requested seller credit: $2,000. Price less credit: $726,000.',
          "Buyer supplies verified funds and proposes the seller's preferred 25-day close.",
          'The arithmetic advantage is $3,000, not $7,000. Verified funds still do not guarantee performance.',
        ],
      },
    ],
    caption:
      "These amounts exclude identical assumed fees, debt payoff, taxes, and other closing items. The seller chooses after receiving the comparison; the broker's own fee preference is not the decision rule.",
  },
  {
    id: 'exp-agency-obedience-is-not-concealment',
    lessonSlug: 'agency-fiduciary-duties',
    afterSection: 'loyalty-and-lawful-obedience',
    title: 'Which seller instruction can the agent follow?',
    objective:
      'Distinguish lawful negotiating instructions from instructions to suppress material information.',
    sourceUrls: [agencyDuties],
    kind: 'decision',
    question:
      'Assume seller-only representation. The seller issues three instructions about the same property.',
    branches: [
      {
        label: 'Counter at $690,000',
        detail: 'The seller chooses a lawful asking position after reviewing the offer.',
        outcome: 'Communicate the authorized counter accurately.',
      },
      {
        label: 'Keep my minimum private',
        detail:
          "The seller's private negotiating limit is not a property defect or other mandatory disclosure.",
        outcome: 'Protect the confidence; do not misrepresent it.',
      },
      {
        label: 'Say the leak never happened',
        detail: 'The agent knows of a material recurring leak that the buyer does not know about.',
        outcome:
          'Do not obey the false instruction. Address disclosure and the conflict with the responsible broker.',
      },
    ],
    caption:
      'Loyalty does not authorize misleading a nonclient. Keeping a permitted confidence and concealing a material property fact have different answers.',
  },
  {
    id: 'exp-agency-prompt-offer-decision',
    lessonSlug: 'agency-fiduciary-duties',
    afterSection: 'disclosure-to-the-principal',
    title: "An offer deadline belongs in the client's decision",
    objective:
      'Recognize why an agent must communicate a significant offer even when the agent expects rejection.',
    sourceUrls: [agencyDuties, professional],
    kind: 'timeline',
    premise:
      'A fictional $650,000 offer has an express 4:00 p.m. expiration. The seller listed at $710,000 and has not instructed the broker to withhold this offer.',
    events: [
      {
        label: 'Offer received',
        when: '9:00 a.m.',
        detail:
          "The listing agent thinks the price is too low. That opinion does not substitute for the seller's judgment.",
      },
      {
        label: 'Terms explained',
        when: 'Promptly after receipt',
        detail:
          'Transmit price, financing, contingencies, and the stated expiration. Explain the available response choices.',
      },
      {
        label: 'Client responds',
        when: 'Before 4:00 p.m.',
        detail:
          'The seller may accept, reject, or authorize a counter, subject to the actual contract rules. The agent documents and implements the decision.',
      },
      {
        label: 'Failed alternative',
        when: 'Next morning',
        detail:
          'Presenting the expired offer after privately discarding it deprived the seller of the timely decision.',
      },
    ],
    conclusion:
      "The problem is not that the seller must accept a low price. It is that the agent cannot quietly take away the seller's opportunity to decide.",
    caption:
      'The clock comes from this fictional offer, not from a universal statutory offer-response period.',
  },
  {
    id: 'exp-agency-inaccessible-report-evidence',
    lessonSlug: 'agency-fiduciary-duties',
    afterSection: 'inspection-limits-do-not-erase-known-information',
    title: 'An inaccessible space can still produce known information',
    objective:
      'Keep the physical scope of a visual inspection separate from the duty to disclose an existing material report.',
    sourceUrls: [
      agencyDuties,
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=2079.3.',
    ],
    kind: 'document',
    documentTitle: 'Inspection notes: fictional one-unit sale',
    context:
      "Assume a covered residential transaction and a material condition not otherwise known to or within the buyer's diligent observation.",
    fields: [
      {
        label: 'Access observation',
        value: 'Attic hatch could not reasonably be reached during the visual inspection.',
        annotation:
          'Civil Code 2079.3 limits the ordinary inspection of normally inaccessible areas.',
      },
      {
        label: 'Existing evidence',
        value: "Seller supplies a prior engineer's report describing damaged attic framing.",
        annotation:
          'The report creates known information even though the agent did not personally enter the attic.',
      },
      {
        label: 'Accurate communication',
        value: 'Identify and deliver the report; explain the access limitation.',
        annotation:
          'Do not replace the report with an unsupported diagnosis or a statement that the attic is sound.',
      },
      {
        label: 'Unresolved question',
        value: 'Has the described damage been properly repaired?',
        annotation:
          'Seek appropriate evidence and qualified evaluation; an inaccessible hatch does not establish repair.',
      },
    ],
    conclusion:
      'The inspection limitation answers where the ordinary visual inspection goes, not whether a known material report can be withheld.',
    caption:
      'Source attribution preserves what is known and unknown. Merely noting the report in an internal file does not communicate it to the buyer.',
  },
  {
    id: 'exp-agency-client-purpose-verification',
    lessonSlug: 'agency-fiduciary-duties',
    afterSection: 'care-competence-and-verification',
    title: 'A stated buyer objective determines what needs an answer',
    objective:
      "Connect a buyer's essential proposed use with qualified verification without assuming a universal permit-search duty.",
    sourceUrls: [
      agencyDuties,
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=2079.3.',
    ],
    kind: 'relationship',
    center: {
      label: 'Legal rental is essential',
      detail:
        'The buyer tells the agent the purchase only works if the detached room can legally generate rental income. Existing approval has not been verified.',
    },
    nodes: [
      {
        label: 'Planning authority',
        connection: 'permitted use',
        detail:
          "Verify applicable use rules and property-specific restrictions; neighboring rentals are not this property's approval.",
      },
      {
        label: 'Building authority',
        connection: 'permit evidence',
        detail:
          "Investigate the unit's permit and occupancy status through appropriate records and qualified help.",
      },
      {
        label: "Buyer's lender",
        connection: 'financing effect',
        detail:
          'If financing depends on rental income, confirm whether the lender can count it under the actual loan program.',
      },
    ],
    caption:
      'The agent should address the known objective and unresolved evidence, not promise legality or underwriting approval. This specific engagement does not turn every visual inspection into a mandatory public-record search.',
  },
  {
    id: 'exp-agency-conduct-versus-outcome',
    lessonSlug: 'agency-fiduciary-duties',
    afterSection: 'separate-misconduct-from-a-disappointing-result',
    title: 'A financial result is not a conduct test',
    objective: 'Assess professional conduct separately from gain, loss, and proof of damages.',
    sourceUrls: [agencyDuties, professional],
    kind: 'comparison',
    columns: [
      {
        label: 'Careful work, later loss',
        points: [
          'Agent verifies material information, discloses known risks, and follows lawful instructions.',
          'The market later falls $30,000.',
          'The decline alone does not establish a breach of duty.',
        ],
      },
      {
        label: 'Hidden interest, later gain',
        points: [
          'Agent conceals a material personal interest in the buyer.',
          'Seller nevertheless receives a profitable sale price.',
          'A good price does not make the undisclosed conflict proper.',
        ],
      },
      {
        label: 'Careless claim, no loss yet',
        points: [
          'Agent states a material fact without a reasonable basis.',
          'No measurable financial loss has yet occurred.',
          'Conduct, disciplinary issues, and the elements of a damages claim remain distinct questions.',
        ],
      },
    ],
    caption:
      'Start with the duty and the acts or omissions. Do not infer professional competence from a profit, or misconduct from every unfavorable market movement.',
  },
  {
    id: 'exp-agency-entrusted-money-not-fee',
    lessonSlug: 'agency-fiduciary-duties',
    afterSection: 'accounting-and-money',
    title: 'Entrusted money follows its instructions, not a fee claim',
    objective:
      'Reconcile entrusted funds while distinguishing authorized disbursement from an asserted commission entitlement.',
    sourceUrls: [professional],
    kind: 'ledger',
    account:
      'Fictional transaction ledger; assume valid written instructions from everyone whose authorization is required for each disbursement.',
    openingBalance: 0,
    entries: [
      {
        label: 'Buyer funds received for the transaction',
        received: 10000,
        paid: 0,
        balance: 10000,
      },
      { label: 'Authorized transfer to escrow', received: 0, paid: 9000, balance: 1000 },
      {
        label: 'Authorized return of remaining funds to buyer',
        received: 0,
        paid: 1000,
        balance: 0,
      },
    ],
    conclusion:
      'The full $10,000 is accounted for. A separate $2,000 commission dispute creates no additional ledger receipt and no automatic permission to take client funds.',
    caption:
      'This is a simplified transaction ledger, not a complete trust-account record system. Arithmetic reconciliation alone would not validate an unauthorized payment.',
  },
  {
    id: 'exp-agency-correct-measurement-claim',
    lessonSlug: 'agency-fiduciary-duties',
    afterSection: 'how-to-correct-an-inaccurate-statement',
    title: 'Correct the information where the buyer encountered it',
    objective:
      'Respond to contradictory area evidence through investigation, correction, and timely communication rather than silent file updates.',
    sourceUrls: [agencyDuties, professional],
    kind: 'timeline',
    premise:
      "The agent advertised 2,050 square feet based on the seller's statement. A later professional measurement reports 1,820. The discrepancy is material to this buyer.",
    events: [
      {
        label: 'Identify conflict',
        when: 'New measurement arrives',
        detail:
          'Preserve both sources and determine what spaces and methods each includes. Do not automatically accuse the seller of intentional fraud.',
      },
      {
        label: 'Stop unsupported claim',
        when: 'After learning of the conflict',
        detail:
          'Do not continue presenting 2,050 as verified. Correct the advertising and transaction materials as warranted.',
      },
      {
        label: 'Reach affected parties',
        when: 'Promptly',
        detail:
          'Communicate the discrepancy and supporting evidence to the principal and prospective buyer; filing the measurement internally is insufficient.',
      },
      {
        label: 'Allow informed action',
        when: 'Before the relevant decision',
        detail:
          "Address the buyer's opportunity for verification and contractual decisions under the actual agreement, without inventing an automatic cancellation right.",
      },
    ],
    conclusion:
      "A responsible correction addresses the source, the published assertion, the recipient, and the timing of the recipient's decision.",
    caption:
      "Changing one database field does not undo a buyer's earlier reliance or communicate the new evidence by itself.",
  },
  {
    id: 'exp-agency-paperwork-evidence-functions',
    lessonSlug: 'agency-disclosure-and-conflicts',
    afterSection: 'three-questions-behind-the-paperwork',
    title: 'Four signatures can document four different things',
    objective:
      'Identify what a disclosure receipt, hiring agreement, confirmation, and conflict consent actually establish.',
    sourceUrls: [agencyArticle, disclosureTiming, confirmation],
    kind: 'document',
    documentTitle: 'Transaction file index: fictional excerpts',
    context:
      'These short descriptions are not substitute statutory forms or a complete representation agreement.',
    fields: [
      {
        label: 'Disclosure receipt',
        value: 'Buyer acknowledges receiving the explanation of agency relationships.',
        annotation:
          'Evidence of delivery does not by itself hire the brokerage or approve an undisclosed conflict.',
      },
      {
        label: 'Representation agreement',
        value: 'Buyer hires Cedar Brokerage for stated services and negotiated compensation.',
        annotation:
          'This is the employment arrangement. Read its scope, term, and payment conditions.',
      },
      {
        label: 'Agency confirmation',
        value: 'Cedar represents the buyer; Harbor represents the seller.',
        annotation:
          'This identifies the actual transaction roles, not all theoretically possible agency arrangements.',
      },
      {
        label: 'Specific conflict consent',
        value: 'Client evaluates a disclosed material interest and the proposed arrangement.',
        annotation:
          'The information and consent must address the actual conflict. A generic receipt signature does not supply missing facts.',
      },
    ],
    conclusion:
      'Ask what each signature acknowledges or agrees to. Counting signatures is not the same as confirming informed representation.',
    caption:
      'Civil Code 2079.24 preserves underlying duties and liability. These documents are not a general release from professional responsibility.',
  },
  {
    id: 'exp-agency-disclosure-role-clocks',
    lessonSlug: 'agency-disclosure-and-conflicts',
    afterSection: 'disclosure-timing-and-coverage',
    title: 'The seller and buyer have different disclosure triggers',
    objective:
      'Apply the role-specific disclosure deadlines and distinguish them from transaction-specific confirmation.',
    sourceUrls: [disclosureTiming, confirmation],
    kind: 'comparison',
    columns: [
      {
        label: 'Seller-side hiring',
        points: [
          'The seller plans to sign a listing at 11:00 a.m.',
          "The seller's agent supplies the agency disclosure before entering that listing.",
          'Waiting until the first buyer makes an offer misses the hiring-stage requirement.',
        ],
      },
      {
        label: 'Buyer-side hiring and offer',
        points: [
          'The buyer plans a representation agreement, then an offer.',
          "The buyer's agent supplies disclosure as soon as practicable before execution of both.",
          'A later offer-stage signature does not cure failure to provide an earlier required disclosure.',
        ],
      },
      {
        label: 'Offer prepared elsewhere',
        points: [
          "The buyer's agent receives an offer from the buyer that the agent did not prepare.",
          'The statutory outside-offer provision requires disclosure no later than the next business day.',
          'This provision is not a general extension of all other representation and disclosure requirements.',
        ],
      },
    ],
    caption:
      'After the educational disclosure, confirm the actual roles under Civil Code 2079.17 at its contract-execution timing. Disclosure and confirmation are separate obligations.',
  },
  {
    id: 'exp-agency-refused-acknowledgment',
    lessonSlug: 'agency-disclosure-and-conflicts',
    afterSection: 'disclosure-timing-and-coverage',
    title: 'A refused receipt has its own record',
    objective:
      'Distinguish refusal to acknowledge receipt from delivery failure and from informed consent to dual agency.',
    sourceUrls: [agencyArticle, disclosureTiming],
    kind: 'document',
    documentTitle: 'Declaration of refusal: fictional teaching record',
    context:
      'Before entering a proposed listing, the agent provides the agency disclosure. The seller accepts the document but refuses to sign its receipt acknowledgment.',
    fields: [
      {
        label: 'Delivery facts',
        value: 'The disclosure was provided to the seller at the meeting.',
        annotation:
          'Record the actual delivery circumstances; do not invent a recipient signature.',
      },
      {
        label: 'Refusal facts',
        value: 'Seller expressly declined to acknowledge receipt in writing.',
        annotation: "Civil Code 2079.15 calls for the agent's written declaration of these facts.",
      },
      {
        label: 'Agent attestation',
        value: 'Agent prepares, signs, and dates the declaration.',
        annotation:
          'This is the statutory refusal procedure, not permission to omit the disclosure itself.',
      },
      {
        label: 'Not established',
        value: 'No agreement to dual agency is stated.',
        annotation:
          'A declaration that a receipt was refused does not create client consent to representation or a conflict.',
      },
    ],
    conclusion:
      'Document the refusal accurately. Then separately resolve the representation and any required informed consent.',
    caption:
      'A declaration records what happened. It neither forges acknowledgment nor releases the agent from duties.',
  },
  {
    id: 'exp-agency-changing-representation-sequence',
    lessonSlug: 'agency-disclosure-and-conflicts',
    afterSection: 'read-the-timing-as-a-sequence',
    title: 'A new client changes the representation file',
    objective:
      "Identify the steps needed when an unrepresented buyer asks a seller's brokerage to undertake buyer representation.",
    sourceUrls: [agencyArticle, confirmation],
    kind: 'timeline',
    premise:
      "A brokerage represents only the seller. Before the agency's object is performed, an unrepresented buyer asks the brokerage to advise and negotiate for the buyer too.",
    events: [
      {
        label: 'Current relationship',
        when: 'Before the request',
        detail:
          'Seller-only representation does not become dual agency merely because the buyer lacks a separate agent.',
      },
      {
        label: 'Proposed change',
        when: 'Buyer asks for representation',
        detail:
          'The broker evaluates whether the new role can be undertaken and explains dual agency and its limitations to both principals.',
      },
      {
        label: 'Required agreement',
        when: 'Before proceeding in the changed role',
        detail:
          "Address buyer-representation requirements and obtain the parties' written consent to the change; an old disclosure receipt is insufficient.",
      },
      {
        label: 'Accurate confirmation',
        when: 'At the statutory transaction stage',
        detail:
          'Confirm the actual dual role as required. Do not retain a seller-only designation after the brokerage undertakes both sides.',
      },
    ],
    conclusion:
      'Conduct, informed consent, and the recorded relationship must agree. Quietly giving buyer-side advocacy while leaving the old paperwork unchanged creates a conflict.',
    caption:
      'Civil Code 2079.22 addresses an unrepresented party; section 2079.23 governs contractual changes with written consent. Neither makes the original disclosure a blanket authorization for future changes.',
  },
  {
    id: 'exp-agency-limited-confidential-permission',
    lessonSlug: 'agency-disclosure-and-conflicts',
    afterSection: 'confidentiality-in-a-dual-agency',
    title: 'Permission to disclose one fact is not permission for the file',
    objective:
      "Apply the actual scope of express permission to a dual agent's proposed communications.",
    sourceUrls: [confidence],
    kind: 'document',
    documentTitle: 'Buyer communication instructions: fictional excerpt',
    context:
      'Assume validly consented dual agency. The buyer gives these limited instructions after discussing what the broker proposes to share.',
    fields: [
      {
        label: 'Express permission',
        value: 'Tell the seller I can complete this purchase within 20 days.',
        annotation:
          "The permitted information is the buyer's stated closing capability, subject to accuracy and actual transaction conditions.",
      },
      {
        label: 'Private offer ceiling',
        value: 'Buyer privately authorizes negotiation up to $725,000.',
        annotation:
          'That separate bargaining limit is not included in permission to share a 20-day capability.',
      },
      {
        label: 'Private financial context',
        value: 'Buyer has additional funds beyond those needed for the current offer.',
        annotation:
          'The financial position remains confidential without the required express permission.',
      },
      {
        label: 'Proposed overstatement',
        value: 'Buyer can close fast and will pay whatever it takes.',
        annotation: "This exceeds the permission and may misrepresent the buyer's instructions.",
      },
    ],
    conclusion:
      'Transmit the authorized fact accurately. Do not infer unlimited disclosure authority from consent to dual agency or from one permitted statement.',
    caption:
      "The respective client controls the express permission for that client's confidential information under Civil Code 2079.21.",
  },
  {
    id: 'exp-agency-shared-report-private-limits',
    lessonSlug: 'agency-disclosure-and-conflicts',
    afterSection: 'what-a-dual-agent-can-still-do',
    title: 'Discuss the shared evidence without disclosing private limits',
    objective:
      'Distinguish legitimate transmission of a repair proposal from use of confidential bargaining information.',
    sourceUrls: [confidence, agencyArticle],
    kind: 'decision',
    question:
      'Both parties have the same $9,000 roof estimate. The buyer submits a $6,000 credit request. What may the dual agent communicate?',
    branches: [
      {
        label: 'Transmit the request',
        detail:
          "Explain the buyer's actual $6,000 proposal and the roof estimate already supplied to both parties.",
        outcome: 'Shared evidence and an authorized proposal can be discussed.',
      },
      {
        label: "Expose the buyer's floor",
        detail:
          'The buyer privately said a $3,000 credit would suffice, without authorizing disclosure.',
        outcome: 'Do not reveal the undisclosed fallback merely to speed agreement.',
      },
      {
        label: "Expose the seller's ceiling",
        detail: 'The seller privately authorized up to $8,000 but has not made that offer public.',
        outcome: "Do not use the seller's confidential authority against the seller.",
      },
    ],
    caption:
      'Information can affect price without being a private bargaining limit. Its source, authorization, and character determine the communication, not whether it helps negotiations finish.',
  },
  {
    id: 'exp-agency-profit-participation-disclosure',
    lessonSlug: 'agency-disclosure-and-conflicts',
    afterSection: 'a-licensees-purchase-requires-a-full-picture',
    title: 'A license number does not disclose a profit arrangement',
    objective:
      'Identify the material economic interest omitted from a superficially accurate self-interest disclosure.',
    sourceUrls: [professional],
    kind: 'document',
    documentTitle: 'Conflict review: fictional resale participation',
    context:
      "The seller's agent recommends an investor's offer. A separate agreement would give the agent part of the investor's resale profit.",
    fields: [
      {
        label: 'What the seller sees',
        value: 'Agent identifies being a licensed real estate professional.',
        annotation:
          "License status alone does not explain a financial stake in this buyer's success.",
      },
      {
        label: 'Undisclosed interest',
        value: 'Agent receives 40% of a defined future resale profit.',
        annotation:
          "The actual economic arrangement and its effect on incentives are material to the seller's evaluation.",
      },
      {
        label: 'Illustrative incentive',
        value: "If the defined profit is $60,000, the agent's share is $24,000.",
        annotation:
          '$60,000 x 0.40 = $24,000. This contingent interest is distinct from the disclosed brokerage fee.',
      },
      {
        label: 'Information needed',
        value:
          'Explain the material participation and relevant transaction information before the seller decides.',
        annotation:
          "An appraisal or the seller's willingness to accept the price does not disclose the omitted conflict.",
      },
    ],
    conclusion:
      'Follow the economic benefit, including contingent and indirect interests. A technically true statement can still omit the central conflict.',
    caption:
      'The profit definition and percentage are fictional. Disclosure must support an informed decision; it does not automatically cure every conflict or make prohibited conduct lawful.',
  },
  {
    id: 'exp-agency-disclosed-payment-legality',
    lessonSlug: 'agency-disclosure-and-conflicts',
    afterSection: 'three-similar-payments-three-different-questions',
    title: 'Payment labels do not decide whether a referral is lawful',
    objective:
      'Distinguish contractual buyer-broker funding, a covered settlement-service kickback, and payment for actual services.',
    sourceUrls: [agencyArticle, respa],
    kind: 'comparison',
    columns: [
      {
        label: 'Seller contribution',
        points: [
          "Seller agrees to fund $7,000 of the buyer's broker obligation.",
          'Examine the compensation contracts, financing restrictions, and accurate credits.',
          "The source of funds does not itself make the buyer's brokerage the seller's agent.",
        ],
      },
      {
        label: 'Referral-only payment',
        points: [
          'In a RESPA-covered loan transaction, an inspector promises $250 per referred closing.',
          'Assume this is for referrals, not actual compensable services or an applicable exception.',
          'A client disclosure does not legalize the prohibited referral arrangement.',
        ],
      },
      {
        label: 'Actual services',
        points: [
          'A provider pays reasonable compensation for genuine services actually performed.',
          'Verify substance, amount, and applicable restrictions; do not disguise referral compensation.',
          'A different factual payment can have a different legal analysis.',
        ],
      },
    ],
    caption:
      'RESPA section 8 has specific exceptions and coverage limits. This comparison does not equate a permitted brokerage referral arrangement with a settlement-service kickback.',
  },
  {
    id: 'exp-agency-fee-contract-elements',
    lessonSlug: 'agency-compensation-and-termination',
    afterSection: 'compensation-is-a-contract-question',
    title: 'The amount, earning event, and payment date are different terms',
    objective:
      'Read a negotiated compensation provision without assuming a customary fee or collapsing earning and payment into one event.',
    sourceUrls: [buyerFees, professional],
    kind: 'document',
    documentTitle: 'Fee analysis: fictional listing provisions',
    context:
      'Teaching excerpts only. Assume a valid signed agreement, a licensed broker, and no unmentioned defenses or conditions.',
    fields: [
      {
        label: 'Services',
        value: 'Market the identified property and procure a qualifying purchaser.',
        annotation: 'Identify what performance the brokerage undertakes.',
      },
      {
        label: 'Negotiated amount',
        value: 'Fixed brokerage compensation of $16,500.',
        annotation:
          'A fixed fee need not be converted to a percentage. The amount is not an industry standard.',
      },
      {
        label: 'Earning condition',
        value:
          'Production within the term of a ready, willing, and able buyer on authorized terms.',
        annotation: 'This clause identifies the assumed performance that earns the claim.',
      },
      {
        label: 'Payment provision',
        value: 'A fee earned on October 5 becomes payable on October 15 under this agreement.',
        annotation:
          'The fictional ten-day interval changes the payment deadline, not the date the agreed earning condition was satisfied.',
      },
      {
        label: 'Changed contract',
        value: 'A different agreement expressly makes closing a condition of entitlement.',
        annotation:
          'That added condition changes the analysis, subject to applicable prevention and other rules.',
      },
    ],
    conclusion:
      'Identify the service, fee base, earning condition, and payment term before deciding whether a commission is owed.',
    caption:
      'The written bargain controls the hypothetical. Neither "no closing, no fee" nor "an offer always earns a fee" answers every contract.',
  },
  {
    id: 'exp-agency-ready-willing-able-evidence',
    lessonSlug: 'agency-compensation-and-termination',
    afterSection: 'test-the-earning-conditions-one-at-a-time',
    title: 'Matching price does not establish all earning conditions',
    objective:
      'Test authorized terms and financial ability separately under an expressly assumed ready-willing-able clause.',
    sourceUrls: [professional],
    kind: 'decision',
    question:
      'A fictional listing requires a ready, willing, and able buyer at $640,000 cash with a 30-day close. Which evidence satisfies the assumed terms?',
    branches: [
      {
        label: 'Same price, new financing',
        detail: 'Buyer offers $640,000 but requires the seller to finance $500,000.',
        outcome: 'The buyer has changed an authorized term; price alone is insufficient.',
      },
      {
        label: 'Same terms, missing funds',
        detail: 'Buyer agrees to cash and 30 days, but the stated funding source is unavailable.',
        outcome: 'Willingness is not demonstrated financial ability.',
      },
      {
        label: 'Same terms, verified capacity',
        detail:
          'Buyer makes the required offer and demonstrates sufficient funds available for the specified performance.',
        outcome:
          'This best satisfies the assumed earning condition; check all actual agreement terms.',
      },
    ],
    caption:
      'If the contract instead includes a closing condition, analyze it as well. The example does not decide a real commission dispute from a prequalification label alone.',
  },
  {
    id: 'exp-agency-owner-produced-purchaser',
    lessonSlug: 'agency-compensation-and-termination',
    afterSection: 'procuring-cause-and-exclusivity',
    title: 'Change the listing, keep the same owner-produced sale',
    objective:
      'Apply open, exclusive-agency, and exclusive-right-to-sell compensation provisions to identical buyer-procurement facts.',
    sourceUrls: [professional],
    kind: 'comparison',
    columns: [
      {
        label: 'Open listing',
        points: [
          'Assume the clause compensates the broker who procures the purchaser.',
          'Owner independently finds and completes a sale to a buyer no broker procured.',
          'The named broker has not met this assumed earning condition.',
        ],
      },
      {
        label: 'Exclusive agency',
        points: [
          'Assume the owner expressly retains the right to sell independently without this listing fee.',
          'The owner produces the same buyer without broker assistance.',
          'The stated owner-sale reservation matters; exclusivity alone does not eliminate it.',
        ],
      },
      {
        label: 'Exclusive right to sell',
        points: [
          'Assume a sale during the term earns the agreed fee regardless of who finds the buyer, with no applicable exception.',
          'The owner produces the same buyer during that term.',
          "The contractual fee provision applies despite the owner's procurement.",
        ],
      },
    ],
    caption:
      'Only the listing terms changed. Procuring cause is not a universal substitute for the compensation event that the parties actually agreed to.',
  },
  {
    id: 'exp-agency-protection-clause-sequence',
    lessonSlug: 'agency-compensation-and-termination',
    afterSection: 'procuring-cause-and-exclusivity',
    title: 'A protection clause has conditions, not an endless tail',
    objective:
      'Apply a fictional post-expiration protection clause to timely prospect identification and a later qualifying contract.',
    sourceUrls: [professional],
    kind: 'timeline',
    premise:
      'Assume a valid clause protects named prospects when the seller receives their written list by July 3 and contracts with one by July 30. It excludes a qualifying later exclusive listing. All dates are invented contract terms.',
    events: [
      {
        label: 'Listing expires',
        when: 'June 30',
        detail:
          'Ordinary listing authority ends. The protection provision is not permission to keep advertising as an authorized agent.',
      },
      {
        label: 'Prospect identified',
        when: 'July 2',
        detail:
          'Seller receives the required list naming Casey. This meets the hypothetical July 3 condition.',
      },
      {
        label: 'Qualifying transaction',
        when: 'July 20',
        detail:
          'Seller contracts with Casey. With no applicable later-listing exception, the stated protection provision can support the fee claim.',
      },
      {
        label: 'Changed facts',
        when: 'List first received July 5',
        detail:
          'The express notice condition is not met. Mere memory of a showing is not equivalent to timely notice; other claims require separate analysis.',
      },
    ],
    conclusion:
      'Read the protected person, notice condition, transaction window, and exceptions. Expiration alone does not decide the fee, and a former inquiry alone does not preserve it forever.',
    caption:
      'The dates are not California statutory protection periods. This illustration isolates a clause rather than deciding every possible procuring-cause or bad-faith claim.',
  },
  {
    id: 'exp-agency-buyer-contribution-credit',
    lessonSlug: 'agency-compensation-and-termination',
    afterSection: 'keep-separate-agreements-separate',
    title: 'A contribution pays part of an obligation; it is not a second fee',
    objective:
      "Calculate the buyer's remaining brokerage obligation when the contracts expressly credit seller funding.",
    sourceUrls: [buyerFees],
    kind: 'calculation',
    rows: [
      { label: 'Negotiated buyer-broker fee under the signed agreement', amount: 13500 },
      { label: 'Seller contribution expressly credited to that fee', amount: -8000 },
      { label: 'Additional brokerage fee reduction agreed in writing', amount: -1500 },
    ],
    result: {
      label: "Buyer's remaining brokerage obligation",
      amount: 4000,
      detail:
        '$13,500 - $8,000 - $1,500 = $4,000. Assume the contribution is permitted, all earning conditions are met, and no other credits apply.',
    },
    caption:
      'The brokerage receives $12,000 total after its agreed reduction: $8,000 from the seller and $4,000 from the buyer. If the seller rejects the contribution, do not subtract an unagreed $8,000.',
  },
  {
    id: 'exp-agency-referral-then-internal-split',
    lessonSlug: 'agency-compensation-and-termination',
    afterSection: 'a-multistep-calculation',
    title: 'Allocate the collected fee in the agreed order',
    objective:
      'Apply a referral percentage to the collected fee and an internal split to the remainder, then reconcile all recipients.',
    sourceUrls: [buyerFees, compensation],
    kind: 'allocation',
    total: 21000,
    segments: [
      {
        label: 'Referring broker',
        amount: 4200,
        detail: 'Fictional agreement: 20% of the $21,000 collected fee. $21,000 x 0.20 = $4,200.',
      },
      {
        label: 'Salesperson',
        amount: 10080,
        detail:
          'Separate agreement: 60% after the referral. ($21,000 - $4,200) x 0.60 = $10,080, paid through the responsible broker.',
      },
      {
        label: 'Retained by brokerage',
        amount: 6720,
        detail:
          'Remainder: $21,000 - $4,200 - $10,080 = $6,720 before operating expenses or taxes.',
      },
    ],
    caption:
      'Check: $4,200 + $10,080 + $6,720 = $21,000. Applying 60% to the gross would produce $12,600, which contradicts the assumed after-referral clause; no percentage here is standard.',
  },
  {
    id: 'exp-agency-salesperson-payment-routing',
    lessonSlug: 'agency-compensation-and-termination',
    afterSection: 'who-may-receive-the-salespersons-fee',
    title: 'Three promises do not create three direct pay channels',
    objective:
      'Identify why client bonuses and inter-licensee compensation must respect the responsible-broker rule.',
    sourceUrls: [compensation],
    kind: 'relationship',
    center: {
      label: 'Responsible broker',
      detail:
        'Assume the salesperson is properly affiliated with this broker throughout the licensed work and payment. This is the payment and supervision relationship.',
    },
    nodes: [
      {
        label: 'Client fee',
        connection: 'brokerage contract',
        detail:
          "The principal's agreed brokerage fee is not a separate authorization to pay the affiliated salesperson privately.",
      },
      {
        label: 'Salesperson share',
        connection: 'internal agreement',
        detail:
          "The broker pays the salesperson according to their agreement. A client's $500 negotiation bonus cannot bypass this rule.",
      },
      {
        label: 'Other licensee',
        connection: 'broker routing',
        detail:
          'An agreement to share licensed-activity compensation does not authorize the salesperson to pay the other licensee outside the responsible broker.',
      },
    ],
    caption:
      'Classify the activity, not the payment label. A tip or side bonus for negotiating the transaction is compensation for licensed work, not an exception created by its small amount.',
  },
  {
    id: 'exp-agency-management-withdrawal-handoff',
    lessonSlug: 'agency-compensation-and-termination',
    afterSection: 'withdrawal-must-be-communicated-responsibly',
    title: "A manager's last day is a transfer of responsibilities",
    objective:
      'Separate ending authority from accounting, urgent communication, confidentiality, and third-party notice.',
    sourceUrls: [termination, professional],
    kind: 'timeline',
    premise:
      "A fictional management agency ends by the manager's renunciation at an agreed transition time. An owner-authorized successor is taking over; funds and records remain entrusted property.",
    events: [
      {
        label: 'Identify pending duties',
        when: 'Before the handoff',
        detail:
          'Inventory rent receipts, deposit records, keys, outstanding repair orders, and an urgent leak report. Resignation does not make those items disappear.',
      },
      {
        label: 'Account and transfer',
        when: 'At the authorized handoff',
        detail:
          'Reconcile balances and transfer property and records under proper instructions. An unpaid management fee does not automatically permit taking entrusted funds.',
      },
      {
        label: 'Notify the relevant people',
        when: 'As authority changes',
        detail:
          'Give tenants and vendors accurate contact and authority information. Under Civil Code 2355, notice matters to people dealing with an agency ended by renunciation.',
      },
      {
        label: 'Respect the boundary',
        when: 'After termination',
        detail:
          "Do not place new orders as the owner's agent. Continue protecting confidential information and address prior conduct and compensation separately.",
      },
    ],
    conclusion:
      "Ending authority is one event; properly closing the agency's unfinished responsibilities requires additional work.",
    caption:
      'This renunciation example does not state that every termination has identical notice rules. Revocation, death, and incapacity require the separate analysis in Civil Code 2356, including its third-party protection.',
  },
]
