import type { LearningFigureSpec } from '../types'

export const transferApplicationFigures: LearningFigureSpec[] = [
  {
    lessonSlug: 'transfer-deeds-and-vesting',
    id: 'exp-deed-delivery-recipient',
    afterSection: 'essential-elements-and-intent',
    kind: 'comparison',
    title: 'A condition depends on who receives the deed',
    objective: 'Distinguish a conditional escrow deposit from delivery directly to the grantee.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=2.&title=4.&part=4.&chapter=1.&article=3.',
    ],
    columns: [
      {
        label: 'Deposit with escrow',
        points: [
          'Owner deposits the deed with a third person to release after payment.',
          'The holder must satisfy the delivery condition.',
          'The conditional deposit is not the same as completed delivery to the buyer.',
        ],
      },
      {
        label: 'Deliver to the grantee',
        points: [
          'Owner delivers the grant directly to the buyer but attaches an oral condition.',
          "Civil Code 1056 does not recognize conditional delivery to the grantee or the grantee's agent as such.",
          'Do not use direct delivery as a substitute for escrow.',
        ],
      },
    ],
    caption:
      'Fictional contrast. Sections 1054, 1056 and 1057 separate delivery from conditional custody; other validity requirements still apply.',
  },
  {
    lessonSlug: 'transfer-deeds-and-vesting',
    id: 'exp-deed-returned-paper',
    afterSection: 'title-is-the-interest-a-deed-is-an-instrument',
    kind: 'process',
    title: 'Returning the paper does not return title',
    objective: 'Trace why destruction or redelivery of an effective deed is not a reconveyance.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=2.&title=4.&part=4.&chapter=1.&article=3.',
    ],
    steps: [
      {
        label: 'Effective transfer',
        detail:
          'A valid grant from Owner A to Buyer B is delivered and accepted. B acquires the stated interest.',
      },
      {
        label: 'Paper returned',
        detail:
          'B hands the original deed back to A. That act does not transfer the interest back.',
      },
      {
        label: 'A new legal act',
        detail:
          'A valid transfer back requires an effective conveyance or another legally sufficient basis, not simply cancellation of the old sheet.',
      },
    ],
    caption:
      'Fictional transaction under Civil Code 1058. Distinguish the evidence of a conveyance from the ownership it created.',
  },
  {
    lessonSlug: 'transfer-deeds-and-vesting',
    id: 'exp-deed-covenant-reach',
    afterSection: 'compare-the-deeds',
    kind: 'comparison',
    title: 'Whose act created the title problem?',
    objective:
      'Apply the limited implied grant covenants without converting a grant deed into unlimited title insurance.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1113.',
    ],
    columns: [
      {
        label: "Seller's own act",
        points: [
          'Seller previously conveyed the same interest to someone else.',
          'Or Seller created an undisclosed encumbrance still affecting the estate at execution.',
          'These facts fall within the two statutory covenant subjects, absent express restraint.',
        ],
      },
      {
        label: "An earlier owner's act",
        points: [
          'An unrelated predecessor created the disputed restriction.',
          "The defect alone does not establish a breach of Seller's limited implied covenants.",
          'Investigate title coverage and other duties separately.',
        ],
      },
    ],
    caption:
      'Fictional contrasts. Civil Code 1113 implies two specified covenants from a qualifying use of grant, unless expressly restrained.',
  },
  {
    lessonSlug: 'transfer-deeds-and-vesting',
    id: 'exp-deed-after-acquired-sequence',
    afterSection: 'after-acquired-title-is-a-separate-doctrine',
    kind: 'timeline',
    title: 'A later-acquired title follows the earlier grant',
    objective:
      'Follow the statutory transfer of later title after a proper instrument purporting to grant fee simple.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1106.',
    ],
    premise:
      'Fictional sequence. Assume a proper instrument purporting to grant the entire parcel in fee simple and no separate priority dispute.',
    events: [
      {
        when: 'February',
        label: 'Grant made',
        detail:
          'Dana purports to grant the parcel in fee simple to Lee, although Dana lacks the relevant title.',
      },
      {
        when: 'June',
        label: 'Dana acquires title',
        detail: 'Dana later obtains that title from the true owner.',
      },
      {
        when: 'Upon acquisition',
        label: 'Title passes by law',
        detail:
          "Section 1106 sends the acquired title to Lee or Lee's successor. Dana cannot keep it merely because it arrived later.",
      },
    ],
    conclusion:
      'The operative promise and the title later acquired both matter. Do not assume every quitclaim carries this same effect.',
    caption:
      'An after-acquired-title application, not proof that an earlier defective title was insurable when the first instrument was signed.',
  },
  {
    lessonSlug: 'transfer-deeds-and-vesting',
    id: 'exp-deed-recording-value-test',
    afterSection: 'actual-notice-changes-the-recording-problem',
    kind: 'decision',
    title: 'First recording is only one part of the priority test',
    objective: 'Test value and good faith separately from the recording order.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1214.',
    ],
    question:
      'An earlier valid conveyance is unrecorded. A later grantee records first. What else do the facts show?',
    branches: [
      {
        label: 'Later purchaser paid value',
        detail: 'The later purchaser acted in good faith without notice and duly recorded first.',
        outcome:
          'The later purchaser can receive statutory priority under the stated race-notice facts.',
      },
      {
        label: 'Later purchaser knew',
        detail: 'The later purchaser had actual notice of the earlier transfer.',
        outcome: 'Early recording does not repair the missing good-faith condition.',
      },
      {
        label: 'Later grantee received a gift',
        detail: 'The later grantee supplied no valuable consideration.',
        outcome: 'Recording first does not turn a donee into a purchaser for value.',
      },
    ],
    caption:
      'Fictional priority test under Civil Code 1214. Notice from possession or record facts must also be investigated.',
  },
  {
    lessonSlug: 'transfer-deeds-and-vesting',
    id: 'exp-deed-estate-presumption',
    afterSection: 'essential-elements-and-intent',
    kind: 'comparison',
    title: 'Read the estate, not just the parcel',
    objective:
      'Distinguish a presumed fee simple from an express limited estate in the same described land.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1105.',
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=769.',
    ],
    columns: [
      {
        label: 'No lesser estate expressed',
        points: [
          'The grant identifies Lot 8.',
          'Nothing in the grant shows an intention to transfer a lesser estate.',
          'Section 1105 supplies the fee-simple presumption.',
        ],
      },
      {
        label: 'Limited estate expressed',
        points: [
          "The grant identifies the same Lot 8, but only for the grantee's life.",
          'The duration language defeats the fee-simple inference.',
          'The parcel can stay identical while the estate transferred changes.',
        ],
      },
    ],
    caption:
      'Fictional paraphrases, not deed language for execution. A legal description answers where; the granting terms also answer what interest.',
  },
  {
    lessonSlug: 'transfer-deeds-and-vesting',
    id: 'exp-deed-severance-recording-calendar',
    afterSection: 'choose-vesting-with-its-consequences-in-view',
    kind: 'timeline',
    title: 'A narrow post-death recording exception',
    objective: 'Apply both date limits of the unilateral joint-tenancy severance exception.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=683.2.',
    ],
    premise:
      'Fictional section 683.2(c)(2) example. Assume an otherwise valid unilateral severance of a joint tenancy of record, no contrary agreement, and no subdivision (d) exception.',
    events: [
      {
        when: 'June 8',
        label: 'Execute and acknowledge',
        detail: 'The severing joint tenant signs and acknowledges the instrument before a notary.',
      },
      {
        when: 'June 10',
        label: 'Severing owner dies',
        detail:
          'Execution and acknowledgment occurred two days before death, within the permitted three-day window.',
      },
      {
        when: 'June 17',
        label: 'Record by this date',
        detail:
          'Recording seven days after death meets the second limit. Recording June 18 would miss it.',
      },
    ],
    conclusion:
      'Ordinarily record before the severing owner dies. This exception requires both timely notarized execution and timely recording.',
    caption:
      'Calendar days in this fictional example. Signing months earlier and recording after death does not satisfy the three-day execution condition.',
  },
  {
    lessonSlug: 'transfer-title-and-escrow',
    id: 'exp-title-chain-missing-link',
    afterSection: 'title-review-identifies-the-interest-being-purchased',
    kind: 'timeline',
    title: 'Find the break in this recorded chain',
    objective:
      'Identify a missing conveyance without assuming that a search alone resolves ownership.',
    sourceUrls: [
      'https://www.insurance.ca.gov/01-consumers/105-type/95-guides/03-res/Title-Insurance.cfm',
    ],
    premise:
      'Fictional title-search extract for the same parcel. No inheritance, court order or other transfer is shown in the supplied records.',
    events: [
      {
        when: '2012 deed',
        label: 'Alex to Blair',
        detail: 'Blair is the grantee in the earlier recorded conveyance.',
      },
      {
        when: '2020 deed',
        label: 'Casey to Devon',
        detail: 'Casey signs as grantor, but no listed instrument connects Blair to Casey.',
      },
      {
        when: 'Current proposal',
        label: 'Devon to buyer',
        detail:
          "The unexplained gap requires investigation before relying on Devon's proposed conveyance.",
      },
    ],
    conclusion:
      'Locate the missing link: Blair to Casey. The list does not prove that no unlisted transfer occurred.',
    caption:
      'An original search puzzle, not an abstract or legal opinion. Ownership may require evidence beyond these three entries.',
  },
  {
    lessonSlug: 'transfer-title-and-escrow',
    id: 'exp-title-access-use-map',
    afterSection: 'insurance-does-not-replace-the-purchase-bargain',
    kind: 'parcel',
    title: 'An insured parcel can still have the wrong access',
    objective:
      'Separate the physical access route from the permitted use of its recorded easement.',
    sourceUrls: [
      'https://www.insurance.ca.gov/01-consumers/105-type/95-guides/03-res/Title-Insurance.cfm',
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=806.',
    ],
    extent: {
      width: 100,
      height: 80,
    },
    unit: 'schematic',
    areas: [
      {
        key: 'A',
        label: 'Purchased parcel',
        x: 5,
        y: 5,
        width: 65,
        height: 45,
        pattern: 'clear',
        description: 'The buyer plans a delivery-intensive commercial use.',
      },
      {
        key: 'B',
        label: 'Access strip',
        x: 70,
        y: 5,
        width: 25,
        height: 55,
        pattern: 'hatch',
        description:
          'The recorded grant in this fictional example permits residential access only; the title policy excepts that easement.',
      },
      {
        key: 'C',
        label: 'Public road',
        x: 5,
        y: 60,
        width: 90,
        height: 15,
        pattern: 'solid',
        description: 'Reaching the road physically does not expand the terms of the easement.',
      },
    ],
    conclusion:
      'The route reaches the road, but the stated grant does not establish commercial-delivery rights. Insurance subject to that exception does not rewrite the grant.',
    caption:
      "Fictional schematic, not a survey. Investigate access rights and planned use separately from the insurer's willingness to issue a policy.",
  },
  {
    lessonSlug: 'transfer-title-and-escrow',
    id: 'exp-title-policy-amount-check',
    afterSection: 'owner-and-lender-policies-protect-different-interests',
    kind: 'document',
    title: 'Check the insured amounts against the transaction',
    objective:
      'Spot a purchase-price and loan-amount mismatch without equating a policy limit with an automatic payout.',
    sourceUrls: [
      'https://www.insurance.ca.gov/01-consumers/105-type/95-guides/03-res/Title-Insurance.cfm',
    ],
    documentTitle: 'Policy order / Amount verification',
    context:
      'Fictional $720,000 purchase with a $540,000 loan. These are simplified order fields, not an issued insurance contract.',
    fields: [
      {
        label: 'Owner order',
        value: '$540,000',
        annotation:
          'This incorrectly copies the loan amount. The intended owner order in this example should match the $720,000 purchase price.',
      },
      {
        label: 'Lender order',
        value: '$540,000',
        annotation:
          "This matches the stated loan amount, not the buyer's full ownership investment.",
      },
      {
        label: 'Equity difference',
        value: '$180,000',
        annotation:
          "The arithmetic difference does not mean the lender's policy covers this equity for the buyer.",
      },
    ],
    conclusion:
      'Correct the order before issuance. Any actual recovery still depends on covered loss and the policy terms.',
    caption:
      'An original quality-control specimen. Named insured, estate, description, effective date and exceptions also require review.',
  },
  {
    lessonSlug: 'transfer-title-and-escrow',
    id: 'exp-title-search-to-policy-gap',
    afterSection: 'read-a-title-problem-in-layers',
    kind: 'timeline',
    title: 'The report date is not the closing date',
    objective: 'Identify a title change arising between a preliminary report and closing.',
    sourceUrls: [
      'https://www.insurance.ca.gov/01-consumers/105-type/95-guides/03-res/Title-Insurance.cfm',
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=INS&sectionNum=12340.11.',
    ],
    premise:
      'Fictional sequence. A report is an offer to insure on stated terms, not a continuing guarantee that the records cannot change.',
    events: [
      {
        when: 'May 4',
        label: 'Preliminary report',
        detail: 'The initial report identifies the then-listed matters and proposed requirements.',
      },
      {
        when: 'May 18',
        label: 'New recorded matter',
        detail: "A new lien is recorded against the seller's interest before closing.",
      },
      {
        when: 'May 29',
        label: 'Proposed closing',
        detail:
          'Title and escrow must address the new matter and current issuance requirements; the May 4 list is not enough.',
      },
    ],
    conclusion:
      'Compare the effective date and requirements of the issued policy with the actual transaction, not just an earlier report.',
    caption:
      "Original hypothetical. This timeline does not promise automatic gap coverage or prescribe a particular insurer's underwriting procedure.",
  },
  {
    lessonSlug: 'transfer-title-and-escrow',
    id: 'exp-escrow-good-faith-dispute',
    afterSection: 'conditions-control-disbursement',
    kind: 'process',
    title: 'A deposit dispute does not make escrow the judge',
    objective: 'Distinguish a demand for money from authority to release disputed escrow funds.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=2.&title=4.&part=4.&chapter=1.&article=3.',
    ],
    steps: [
      {
        label: 'Conflicting claims',
        detail:
          'In a qualifying owner-occupied one-to-four-unit transaction, buyer demands the deposit and seller asserts a good-faith contractual right to it.',
      },
      {
        label: 'No unilateral award',
        detail:
          'The demand alone does not resolve entitlement. Section 1057.3 distinguishes good-faith disputes from wrongful refusal to release.',
      },
      {
        label: 'Authorized resolution',
        detail:
          "Obtain legally sufficient release authority or resolve the dispute through the applicable process. The statute preserves escrow's ability to interplead.",
      },
    ],
    caption:
      'Fictional dispute. Returning funds does not itself cancel the purchase contract unless cancellation is expressly stated; see section 1057.3(e).',
  },
  {
    lessonSlug: 'transfer-title-and-escrow',
    id: 'exp-escrow-exemption-facts',
    afterSection: 'who-regulates-the-escrow-holder',
    kind: 'decision',
    title: 'The broker exemption follows the transaction',
    objective:
      'Apply the broker and attorney escrow exemptions to the required relationship and limits.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FIN&sectionNum=17006.',
    ],
    question: 'Which provider relationship is established in the file?',
    branches: [
      {
        label: 'Broker in the sale',
        detail:
          'The broker acts as agent or party in the transaction and performs licensed real estate activity.',
        outcome:
          'Potential broker exemption, subject to its personal and direct-supervision limits.',
      },
      {
        label: 'Broker outside the sale',
        detail:
          'The broker only sells escrow service for an unrelated transaction, with no qualifying licensed activity or role.',
        outcome: 'A broker license alone does not satisfy this exemption.',
      },
      {
        label: 'Attorney for a principal',
        detail:
          'A California lawyer has a bona fide client relationship and is not actively in the escrow-agent business.',
        outcome:
          'The specified attorney exemption may apply; it is not a general public escrow-business exemption.',
      },
    ],
    caption:
      'Fictional classifications under Financial Code 17006. The personal attorney and broker exemptions cannot be used for arrangements performing escrows for more than one business.',
  },
  {
    lessonSlug: 'transfer-title-and-escrow',
    id: 'exp-closing-balanced-wrong-payer',
    afterSection: 'reconcile-a-simple-closing-statement',
    kind: 'comparison',
    title: 'Both statements balance. Only one follows the agreement.',
    objective:
      'Detect an authorized-payer error that arithmetic reconciliation alone cannot reveal.',
    sourceUrls: ['https://www.consumerfinance.gov/owning-a-home/closing-disclosure/'],
    columns: [
      {
        label: 'Agreed allocation',
        points: [
          'Buyer owes a $240 recording charge to the county.',
          'Buyer needs $240 more cash; seller proceeds do not change.',
          'The third-party payment is funded by the party named in the agreement.',
        ],
      },
      {
        label: 'Incorrect allocation',
        points: [
          'Escrow charges the same $240 to the seller instead.',
          'Total funds received and paid can still balance.',
          'Buyer brings $240 too little and seller receives $240 too little relative to the agreement.',
        ],
      },
    ],
    caption:
      'Fictional closing check with all other amounts held constant. Verify the payer and authorization as well as the sum.',
  },
  {
    lessonSlug: 'transfer-taxes-and-prorations',
    id: 'exp-tax-gift-dual-basis-curve',
    afterSection: 'basis-and-gain',
    kind: 'chart',
    title: 'A depreciated gift has a no-gain, no-loss interval',
    objective:
      'Choose the donor basis for gain and gift-date fair market value for loss when the gift value is lower.',
    sourceUrls: ['https://www.irs.gov/publications/p551'],
    xAxis: {
      label: 'Amount realized on later sale',
      format: 'currency',
    },
    yAxis: {
      label: 'Calculated gain or loss',
      format: 'currency',
    },
    series: [
      {
        label: 'Gift: $400,000 donor basis; $350,000 gift-date value',
        points: [
          {
            x: 300000,
            y: -50000,
          },
          {
            x: 350000,
            y: 0,
          },
          {
            x: 375000,
            y: 0,
          },
          {
            x: 400000,
            y: 0,
          },
          {
            x: 450000,
            y: 50000,
          },
        ],
      },
    ],
    conclusion:
      'At $375,000, the gain calculation is negative and the loss calculation is positive. The dual-basis rule yields neither gain nor loss, not a choice of the more favorable basis.',
    caption:
      'Fictional investment land, no intervening adjustments or selling costs. Deductibility and tax character are separate from calculating the gain or loss.',
  },
  {
    lessonSlug: 'transfer-taxes-and-prorations',
    id: 'exp-tax-joint-return-exclusion-gates',
    afterSection: 'test-ownership-and-use-separately',
    kind: 'decision',
    title: 'A joint return does not automatically double the exclusion',
    objective: 'Apply the ownership, use and look-back conditions separately to spouses.',
    sourceUrls: ['https://www.irs.gov/publications/p523'],
    question:
      'Spouses file jointly. Assume no automatic disqualification, nonqualified-use allocation or depreciation issue. Who satisfies the tests?',
    branches: [
      {
        label: 'One owner; both residents',
        detail:
          'One spouse owned for two of the prior five years. Both used the home for that period and meet the two-year look-back rule.',
        outcome:
          'The ordinary $500,000 maximum can apply; both spouses need not hold title for two years.',
      },
      {
        label: 'One fails residence',
        detail:
          'Only one spouse meets the residence test; no partial-exclusion exception is stipulated.',
        outcome:
          "The ordinary joint $500,000 test is not met. Evaluate each spouse's eligibility rather than automatically doubling.",
      },
      {
        label: 'Recent prior exclusion',
        detail: 'One spouse used the exclusion on another sale less than two years earlier.',
        outcome:
          'The look-back condition for the ordinary joint maximum fails; investigate any applicable separate or partial relief.',
      },
    ],
    caption:
      'Fictional eligibility contrasts. The exclusion offsets qualifying gain, not the sales price or loan payoff.',
  },
  {
    lessonSlug: 'transfer-taxes-and-prorations',
    id: 'exp-tax-exchange-concurrent-calendar',
    afterSection: 'like-kind-exchange-deferral',
    kind: 'timeline',
    title: 'The exchange clocks start together',
    objective:
      'Calculate the identification and receipt periods from the relinquished-property transfer.',
    sourceUrls: ['https://www.irs.gov/publications/p544'],
    premise:
      'Fictional deferred exchange: relinquished property transfers January 16, 2026. Assume the tax-return due date including extensions is later than the 180th day, with no special relief.',
    events: [
      {
        when: 'January 16',
        label: 'Transfer starts both periods',
        detail: 'Do not wait for identification before starting the 180-day count.',
      },
      {
        when: 'March 2 / Day 45',
        label: 'Identification boundary',
        detail:
          'Make the required signed written identification and timely delivery to an eligible recipient.',
      },
      {
        when: 'July 15 / Day 180',
        label: 'Receipt boundary',
        detail:
          'Receive qualifying identified replacement property by this date under the stated return-date assumption.',
      },
    ],
    conclusion:
      'The ordinary outside period is not 45 plus 180 days. An earlier tax-return due date, including extensions, can shorten the receipt period.',
    caption:
      'Calendar-day arithmetic; January 16 is day zero. All other exchange conditions, including restrictions on receiving sale proceeds, still apply.',
  },
  {
    lessonSlug: 'transfer-taxes-and-prorations',
    id: 'exp-tax-boot-gain-basis-reconciliation',
    afterSection: 'like-kind-exchange-deferral',
    kind: 'document',
    title: 'Cash received, gain recognized, and replacement basis',
    objective:
      'Reconcile boot, deferred gain and carryover basis in an otherwise qualifying exchange.',
    sourceUrls: ['https://www.irs.gov/publications/p544', 'https://www.irs.gov/publications/p551'],
    documentTitle: 'Exchange worksheet / Cash-only boot',
    context:
      'Fictional investment land: old adjusted basis $280,000; replacement land worth $390,000 plus $30,000 cash received. No debt, expenses, losses or other property.',
    fields: [
      {
        label: 'Realized gain',
        value: '$140,000',
        annotation: '$390,000 land + $30,000 cash - $280,000 old basis.',
      },
      {
        label: 'Recognized gain',
        value: '$30,000',
        annotation:
          'Lesser of the $140,000 realized gain and $30,000 cash boot under these assumptions.',
      },
      {
        label: 'Deferred gain',
        value: '$110,000',
        annotation: '$140,000 realized less $30,000 recognized; it has not disappeared.',
      },
      {
        label: 'Replacement basis',
        value: '$280,000',
        annotation:
          '$280,000 old basis - $30,000 cash + $30,000 recognized gain. Check: $390,000 value - $110,000 deferred gain.',
      },
    ],
    conclusion:
      'Receiving some cash does not necessarily make all realized gain currently taxable. The basis preserves the deferred amount.',
    caption:
      'Original hypothetical, not an exchange recommendation. Debt relief, exchange costs and other property require additional rules.',
  },
  {
    lessonSlug: 'transfer-taxes-and-prorations',
    id: 'exp-tax-firpta-use-and-price',
    afterSection: 'apply-the-appropriate-withholding-system',
    kind: 'decision',
    title: 'Apply the residence category before the FIRPTA rate',
    objective:
      'Distinguish the qualifying buyer-residence exception, reduced rate and general rate.',
    sourceUrls: [
      'https://www.irs.gov/individuals/international-taxpayers/exceptions-from-firpta-withholding',
      'https://www.irs.gov/irm/part3/irm_03-022-261r',
    ],
    question:
      "A foreign individual sells a U.S. real-property interest. Assume no other exemption or withholding certificate. Is the buyer's residence use qualifying?",
    branches: [
      {
        label: 'Qualifying use; $290,000',
        detail: 'Amount realized is at or below $300,000.',
        outcome: 'The buyer-residence exception can eliminate withholding.',
      },
      {
        label: 'Qualifying use; $900,000',
        detail: 'Amount realized exceeds $300,000 but is not over $1 million.',
        outcome: '10% of $900,000 = $90,000 withheld.',
      },
      {
        label: 'Investment use; $290,000',
        detail: 'The buyer-residence requirement is not satisfied.',
        outcome: 'Price alone does not create the exception: general 15% = $43,500.',
      },
    ],
    caption:
      'Fictional cases. Qualifying residence use requires definite plans for buyer or family occupancy for at least 50% of used days in each of the first two 12-month periods; vacant days are excluded.',
  },
  {
    lessonSlug: 'transfer-taxes-and-prorations',
    id: 'exp-tax-california-withholding-shares',
    afterSection: 'withholding-is-a-prepayment',
    kind: 'allocation',
    title: "Allocate withholding by the sellers' interests",
    objective:
      'Apply the FTB decimal multiplier and ownership shares without confusing withholding with final tax.',
    sourceUrls: ['https://www.ftb.ca.gov/forms/misc/1016.html'],
    total: 14985,
    segments: [
      {
        label: 'Seller A / 40%',
        amount: 5994,
        detail: '$450,000 sale x 40% x 0.0333 = $5,994.',
      },
      {
        label: 'Seller B / 60%',
        amount: 8991,
        detail: '$450,000 sale x 60% x 0.0333 = $8,991.',
      },
    ],
    caption:
      'Fictional fully subject transaction with no exemption or alternative election. FTB Publication 1016 specifies 0.0333 for this computation. Total: $14,985; do not substitute an exact one-thirtieth and silently change the result.',
  },
  {
    lessonSlug: 'transfer-taxes-and-prorations',
    id: 'exp-tax-proration-actual-days',
    afterSection: 'rent-and-taxes-run-in-opposite-directions',
    kind: 'timeline',
    title: "The closing day determines who receives each day's rent",
    objective:
      'Count actual days inclusively from the contract-assigned closing day and apply the correct debit direction.',
    sourceUrls: ['https://www.consumerfinance.gov/owning-a-home/closing-disclosure/'],
    premise:
      'Fictional $3,100 August rent, all collected by the seller. Agreement uses actual days, closes August 12 and gives the closing day to the buyer.',
    events: [
      {
        when: 'August 1-11',
        label: 'Seller period / 11 days',
        detail: '$3,100 / 31 = $100 per day. Seller is entitled to $1,100.',
      },
      {
        when: 'August 12-31',
        label: 'Buyer period / 20 days',
        detail: 'Count both August 12 and August 31: buyer is entitled to $2,000.',
      },
      {
        when: 'At closing',
        label: 'Debit seller; credit buyer $2,000',
        detail:
          "Seller already collected the buyer's share. The credit transfers that benefit through settlement.",
      },
    ],
    conclusion:
      '11 + 20 = 31 days. Giving the closing day to the seller instead would shift one $100 day; a different contract changes the allocation.',
    caption:
      'Original contractual calculation, not a universal California closing-day convention. Expense reimbursement may run in the opposite direction.',
  },
  {
    lessonSlug: 'transfer-special-transfers',
    id: 'exp-probate-appointment-before-letters',
    afterSection: 'a-will-an-appointment-and-a-deed-do-different-work',
    kind: 'timeline',
    title: 'An appointment order is not yet effective authority',
    objective:
      'Identify issuance of letters as the point at which a personal representative appointment becomes effective.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=8400.',
    ],
    premise:
      'Fictional estate requiring probate. A named executor wants to sell estate real property; no other independent capacity is established.',
    events: [
      {
        when: 'Will reviewed',
        label: 'Nominated executor',
        detail: 'Being named is not an effective appointment to administer the estate.',
      },
      {
        when: 'Order entered',
        label: 'Appointment ordered',
        detail:
          'The court makes the appointment, but the order does not become effective until letters issue.',
      },
      {
        when: 'Letters issued',
        label: 'Appointment effective',
        detail:
          'Now examine the powers, notice requirements and any sale restrictions before proceeding.',
      },
    ],
    conclusion:
      'A signed order alone is not enough. Section 8400 separately permits a nominated executor to pay funeral expenses and take necessary preservation measures before appointment.',
    caption:
      'Original authority timeline. Limited preappointment preservation acts do not create general authority to sell the house.',
  },
  {
    lessonSlug: 'transfer-special-transfers',
    id: 'exp-trust-property-scope',
    afterSection: 'nonprobate-transfers',
    kind: 'relationship',
    title: "A trustee's power reaches trust property",
    objective:
      'Separate trustee authority from a claim to administer an asset the trust does not own.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=16200.',
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=16226',
    ],
    center: {
      label: 'Successor trustee',
      detail:
        'Assume valid succession. Read the trust terms and any limits on statutory sale powers.',
    },
    nodes: [
      {
        label: 'Funded residence',
        connection: 'Trust property',
        detail:
          "Verified records establish the house as trust property. Evaluate the trustee's sale authority.",
      },
      {
        label: 'Separate vacant lot',
        connection: 'Title unproven',
        detail:
          'The lot remains outside the stipulated trust assets. The trustee title alone does not authorize its sale.',
      },
      {
        label: 'Beneficiary',
        connection: 'Beneficial interest',
        detail:
          'An expected distribution does not by itself make the beneficiary the authorized grantor of trust property.',
      },
    ],
    caption:
      'Fictional asset map. Different ownership evidence or a court determination can change the result; a trust document alone does not establish title to every asset.',
  },
  {
    lessonSlug: 'transfer-special-transfers',
    id: 'exp-probate-iaaa-authority-route',
    afterSection: 'independent-administration-is-still-administration',
    kind: 'decision',
    title: 'Read the letters before choosing a probate sale route',
    objective:
      'Distinguish full independent authority, limited authority and unresolved authority.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=PROB&division=7.&title=&part=6.&chapter=3.&article=2.',
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=10501.',
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=10503.',
    ],
    question: 'What authority has actually been granted for this estate real-property sale?',
    branches: [
      {
        label: 'Full independent authority',
        detail:
          'The representative has the qualifying power and complies with the proposed-action procedure and restrictions.',
        outcome:
          'A sale can proceed without ordinary court confirmation where the applicable requirements are satisfied.',
      },
      {
        label: 'Limited independent authority',
        detail: 'The representative lacks full authority for the real-property sale.',
        outcome: 'Do not import the full-authority exception to ordinary sale supervision.',
      },
      {
        label: 'Only a family statement',
        detail:
          'A relative says the estate is independent, but no authority documents have been examined.',
        outcome:
          'The label is insufficient. Verify appointment and powers before promising either route.',
      },
    ],
    caption:
      'Fictional routing test. Full authority does not remove notices, fiduciary duties, valid objections or appointment restrictions.',
  },
  {
    lessonSlug: 'transfer-special-transfers',
    id: 'exp-probate-appraisal-two-dates',
    afterSection: 'appraisal-threshold-and-overbid-are-separate-calculations',
    kind: 'document',
    title: 'A recent report can use an appraisal date that is too old',
    objective:
      'Check both appraisal completion and valuation dates before applying the 90-percent private-sale test.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=10309',
    ],
    documentTitle: 'Private probate sale / Confirmation check',
    context:
      'Fictional October 20, 2026 confirmation hearing. Assume the ordinary section 10309 rule and no statutory exception.',
    fields: [
      {
        label: 'Appraisal completed',
        value: 'September 1, 2026',
        annotation: 'This date is within one year of the hearing.',
      },
      {
        label: 'Valuation date used',
        value: 'August 1, 2025',
        annotation:
          'This separate date is more than one year before the hearing and fails the ordinary requirement.',
      },
      {
        label: 'Appraised value',
        value: '$900,000',
        annotation:
          '90% would be $810,000, but a price calculation does not cure the stale valuation date.',
      },
      {
        label: 'Accepted offer',
        value: '$830,000',
        annotation: 'It exceeds $810,000, yet the appraisal-date problem remains.',
      },
    ],
    conclusion:
      'Check authority, both dates, then price. Passing the percentage test does not satisfy every confirmation requirement.',
    caption:
      'Original appraisal review specimen, not a court form. A qualifying new appraisal may be needed under the governing procedure.',
  },
  {
    lessonSlug: 'transfer-special-transfers',
    id: 'exp-probate-overbid-gross-price',
    afterSection: 'worked-overbid',
    kind: 'calculation',
    title: 'Compute the first overbid before deducting commission',
    objective:
      'Use the original bid, not net proceeds after brokerage compensation, for the statutory first overbid.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=10311.',
    ],
    rows: [
      {
        label: 'Original bid, before any commission',
        amount: 760000,
      },
      {
        label: '10% of first $10,000',
        amount: 1000,
      },
      {
        label: '5% of remaining $750,000',
        amount: 37500,
      },
    ],
    result: {
      label: 'Minimum first overbid',
      amount: 798500,
      detail:
        "$760,000 + $1,000 + $37,500. Do not subtract the broker's compensation from the base.",
    },
    caption:
      "Fictional section 10311 example. A responsible bidder, legally compliant offer, applicable terms and the court's powers remain relevant.",
  },
  {
    lessonSlug: 'transfer-special-transfers',
    id: 'exp-transfer-deed-in-lieu-junior-right',
    afterSection: 'a-special-deed-does-not-answer-every-title-question',
    kind: 'relationship',
    title: 'A voluntary deed does not perform a lien-priority sale',
    objective:
      'Identify why a subordinate lien must still be addressed in a deed-in-lieu transaction.',
    sourceUrls: [
      'https://servicing-guide.fanniemae.com/svc/d2-3.3-02/fannie-mae-mortgage-release-deed-lieu-foreclosure',
    ],
    center: {
      label: 'Deed to first lender',
      detail: "Proposed deed in lieu, not a completed trustee's foreclosure sale.",
    },
    nodes: [
      {
        label: 'First lender',
        connection: 'Proposed grantee',
        detail:
          'Reviews the settlement and title; accepting a deed is not the same extinguishment process as foreclosure.',
      },
      {
        label: 'Junior lienholder',
        connection: 'Separate lien',
        detail: "The owner's voluntary deed does not automatically release this claim.",
      },
      {
        label: 'Title clearance',
        connection: 'Release required',
        detail:
          "Fannie Mae's cited program requires resolving title issues, including subordinate releases, so clear and marketable title can be conveyed.",
      },
    ],
    caption:
      'Fictional title relationships. The cited servicing requirements are program-specific; the illustration does not promise that any lender will accept a deed in lieu.',
  },
  {
    lessonSlug: 'transfer-special-transfers',
    id: 'exp-transfer-possession-tax-proof',
    afterSection: 'transfers-through-operation-of-law',
    kind: 'decision',
    title: 'Five years alone is not an adverse-possession checklist',
    objective: 'Identify decisive failures involving assessed taxes or protected public property.',
    sourceUrls: [
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=325.',
      'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1007.',
    ],
    question:
      'A person asserts ownership after occupying land for five years. Which additional fact changes the claim?',
    branches: [
      {
        label: 'Assessed taxes unpaid',
        detail:
          'The claimant and qualifying predecessors did not timely pay the taxes levied and assessed for the required period.',
        outcome: 'The required tax condition is missing; occupancy duration does not cure it.',
      },
      {
        label: 'Publicly owned parcel',
        detail: 'The occupied property belongs to the state or another public entity.',
        outcome: 'Section 1007 prevents possession from ripening into a right against that owner.',
      },
      {
        label: 'Taxes paid on private land',
        detail:
          'Certified tax records support timely payments, but the other possession requirements remain disputed.',
        outcome: 'Tax payment is necessary on these facts, not sufficient proof of every element.',
      },
    ],
    caption:
      'Fictional issue spotting. Section 325 also addresses possession and occupation; neither paying a bill nor using land alone proves title.',
  },
]
