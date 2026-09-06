import { ArrowDown, ArrowUp } from 'lucide-react'

const sequences: Record<string, { title: string; detail: string }[]> = {
  'Representation and supervision': [
    { title: 'Principal', detail: 'Buyer or seller authorizes the broker' },
    { title: 'Broker', detail: 'Agent of the principal; supervises salesperson' },
    { title: 'Salesperson', detail: 'Performs licensed acts through the broker' },
  ],
  'Direct capitalization': [
    { title: '$48,000 annual NOI', detail: 'Before debt service and income tax' },
    { title: 'Divide by 0.06', detail: '6% market-supported capitalization rate' },
    { title: '$800,000', detail: 'Indicated property value' },
  ],
  'Three parties to a deed of trust': [
    { title: 'Trustor: borrower', detail: 'Signs the note and deed of trust' },
    { title: 'Beneficiary: lender', detail: 'Receives the note and benefits from the security' },
    { title: 'Trustee', detail: 'Holds bare legal title under the deed of trust' },
  ],
  'A simplified escrow sequence': [
    { title: '01 · Agreement', detail: 'Buyer and seller agree on terms' },
    { title: '02 · Escrow opens', detail: 'Written escrow instructions' },
    { title: '03 · Conditions', detail: 'Required conditions are satisfied' },
    { title: '04 · Funding', detail: 'Required funds are available' },
    { title: '05 · Recording', detail: 'Closing and authorized disbursement' },
  ],
  'Three-way trust reconciliation': [
    {
      title: '$5,000 adjusted bank balance',
      detail: '$6,000 statement less $1,000 outstanding checks',
    },
    { title: '= $5,000 control record', detail: 'Receipts less disbursements' },
    { title: '= $5,000 beneficiary ledgers', detail: 'Client A $3,000 + Client B $2,000' },
  ],
  'From offer to agreement': [
    { title: 'Offer', detail: 'Definite proposed terms' },
    { title: 'Acceptance', detail: 'Matches the offer while it remains open' },
    { title: 'Communication', detail: 'Required notice of acceptance is given' },
  ],
}

export function MobileDiagram({ title }: { title: string }) {
  if (title === 'An appurtenant easement')
    return (
      <div
        className="mobile-diagram easement-mobile"
        role="img"
        aria-label="Parcel A benefits from an access easement across Parcel B to the public road."
      >
        <div className="parcel-a">
          <strong>Parcel A</strong>
          <span>Dominant: benefits from access</span>
        </div>
        <div className="parcel-b">
          <div>
            <strong>Parcel B</strong>
            <span>Servient: bears the burden</span>
          </div>
          <div className="access-strip">
            <ArrowUp size={20} />
            <span>Access</span>
          </div>
        </div>
        <div className="public-road">Public road</div>
      </div>
    )
  if (title === 'The township grid')
    return (
      <div className="mobile-diagram">
        <div
          className="township-grid"
          role="img"
          aria-label="Thirty-six sections in a township, numbered in alternating directions starting at the northeast corner."
        >
          {Array.from({ length: 36 }, (_, i) => {
            const row = Math.floor(i / 6)
            const column = i % 6
            const number = row * 6 + (row % 2 ? column + 1 : 6 - column)
            return (
              <span key={i} className={number === 1 ? 'first-section' : ''}>
                {number}
              </span>
            )
          })}
        </div>
        <p className="township-scale">6 miles × 6 miles · North is at the top</p>
      </div>
    )
  const nodes = sequences[title]
  if (!nodes) return null
  return (
    <div className="mobile-diagram diagram-sequence">
      {nodes.map((node, i) => (
        <div key={node.title}>
          <div className="diagram-node">
            <strong>{node.title}</strong>
            <span>{node.detail}</span>
          </div>
          {i < nodes.length - 1 && <ArrowDown size={17} aria-hidden="true" />}
        </div>
      ))}
    </div>
  )
}
