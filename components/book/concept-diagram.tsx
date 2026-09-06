import type { ReactNode } from 'react'
import { MobileDiagram } from './mobile-diagram'

function Plate({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <figure className="concept-figure">
      <div className="figure-label">{title}</div>
      <div className="diagram-scroll">
        <svg
          viewBox="0 0 640 330"
          role="img"
          aria-label={`${title}. ${description}`}
          className="concept-svg"
        >
          <defs>
            <marker
              id={`arrow-${title.replaceAll(' ', '-')}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
            <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M0 8L8 0" stroke="currentColor" strokeOpacity=".12" />
            </pattern>
          </defs>
          {children}
        </svg>
      </div>
      <MobileDiagram title={title} />
      <figcaption>{description}</figcaption>
    </figure>
  )
}

const Box = ({
  x,
  y,
  w = 160,
  h = 68,
  title,
  label,
}: {
  x: number
  y: number
  w?: number
  h?: number
  title: string
  label: string
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="3"
      fill="var(--background)"
      stroke="currentColor"
      strokeOpacity=".45"
    />
    <text x={x + w / 2} y={y + h / 2 - 4} textAnchor="middle" fontSize="16" fontWeight="600">
      {title}
    </text>
    <text x={x + w / 2} y={y + h / 2 + 18} textAnchor="middle" fontSize="12" opacity=".7">
      {label}
    </text>
  </g>
)

export function ConceptDiagram({ slug }: { slug: string }) {
  if (slug === 'ownership-property-rights')
    return (
      <figure className="concept-figure property-figure">
        <img
          src="/images/residential-parcel.png"
          width="1200"
          height="800"
          alt="Original architectural illustration of a house, garage, driveway, neighboring structure, and dashed parcel boundaries."
        />
        <figcaption>
          Land and attached improvements form real property. Parcel boundaries and ownership rights
          are distinct from the physical improvements shown. Illustrative, not a survey.
        </figcaption>
      </figure>
    )
  if (slug === 'ownership-encumbrances')
    return (
      <Plate
        title="An appurtenant easement"
        description="Parcel A benefits from access across Parcel B. A is the dominant tenement; B is the servient tenement. B retains ownership of the burdened land."
      >
        <rect x="55" y="24" width="530" height="106" fill="none" stroke="currentColor" />
        <text x="280" y="69" textAnchor="middle" fontSize="17" fontWeight="600">
          Parcel A
        </text>
        <text x="280" y="94" textAnchor="middle" fontSize="13">
          Dominant tenement: benefits from access
        </text>
        <rect x="55" y="130" width="530" height="150" fill="none" stroke="currentColor" />
        <rect
          x="483"
          y="130"
          width="102"
          height="150"
          fill="url(#hatch)"
          stroke="currentColor"
          strokeDasharray="5 5"
        />
        <text x="257" y="191" textAnchor="middle" fontSize="17" fontWeight="600">
          Parcel B
        </text>
        <text x="257" y="216" textAnchor="middle" fontSize="13">
          Servient tenement: bears the burden
        </text>
        <path d="M535 256V147m-7 10 7-10 7 10" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="532" y="117" textAnchor="middle" fontSize="12">
          Access
        </text>
        <rect x="30" y="280" width="580" height="37" fill="currentColor" opacity=".07" />
        <text x="320" y="304" textAnchor="middle" fontSize="13">
          Public road
        </text>
      </Plate>
    )
  if (slug === 'ownership-legal-descriptions')
    return (
      <Plate
        title="The township grid"
        description="A standard township is six miles by six miles, containing 36 sections. Numbering begins at the northeast corner and reverses direction in each row. A standard section is 640 acres; actual surveys can include irregular sections."
      >
        {Array.from({ length: 36 }, (_, i) => {
          const row = Math.floor(i / 6)
          const column = i % 6
          const number = row * 6 + (row % 2 ? column + 1 : 6 - column)
          return (
            <g key={i}>
              <rect
                x={168 + column * 46}
                y={18 + row * 46}
                width="46"
                height="46"
                fill={number === 1 ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeOpacity=".4"
              />
              <text
                x={191 + column * 46}
                y={47 + row * 46}
                textAnchor="middle"
                fontSize="15"
                fill={number === 1 ? 'var(--background)' : 'currentColor'}
              >
                {number}
              </text>
            </g>
          )
        })}
        <text x="306" y="319" textAnchor="middle" fontSize="13">
          6 miles
        </text>
        <text x="480" y="158" fontSize="13">
          N
        </text>
        <path d="M486 142V96m-5 8 5-8 5 8" fill="none" stroke="currentColor" />
        <text x="98" y="165" textAnchor="middle" fontSize="13">
          6 miles
        </text>
      </Plate>
    )
  if (slug === 'agency-relationships')
    return (
      <Plate
        title="Representation and supervision"
        description="The principal authorizes the broker to act as agent. An affiliated salesperson performs licensed activities through the responsible broker. The broker's client and the other party to the transaction are not interchangeable roles."
      >
        <Box x={50} y={115} title="Principal" label="Buyer or seller" />
        <Box x={245} y={115} title="Broker" label="Agent of the principal" />
        <Box x={440} y={115} title="Salesperson" label="Acts through broker" />
        <path
          d="M210 149H243m-8-5 8 5-8 5M405 149H438m-8-5 8 5-8 5"
          fill="none"
          stroke="currentColor"
        />
        <text x="322" y="85" textAnchor="middle" fontSize="13">
          Authorized representation
        </text>
        <path d="M325 195V243H520V195" fill="none" stroke="currentColor" strokeDasharray="4 4" />
        <text x="423" y="268" textAnchor="middle" fontSize="13">
          Broker supervision
        </text>
      </Plate>
    )
  if (slug === 'valuation-income-analysis')
    return (
      <Plate
        title="Direct capitalization"
        description="Illustration: annual net operating income of $48,000 divided by a 6% capitalization rate indicates $800,000 in value. NOI is before debt service and income tax; the cap rate must be supported by the market."
      >
        <Box x={38} y={108} w={172} title="$48,000" label="Annual NOI" />
        <text x="231" y="149" textAnchor="middle" fontSize="26">
          ÷
        </text>
        <Box x={252} y={108} w={120} title="0.06" label="6% cap rate" />
        <text x="394" y="149" textAnchor="middle" fontSize="26">
          =
        </text>
        <Box x={416} y={108} w={185} title="$800,000" label="Indicated value" />
        <text x="320" y="234" textAnchor="middle" fontSize="14">
          At the same NOI: higher cap rate → lower value
        </text>
      </Plate>
    )
  if (slug === 'financing-notes-security')
    return (
      <Plate
        title="Three parties to a deed of trust"
        description="The borrower signs a promissory note in favor of the lender and a deed of trust conveying bare legal title to the trustee as security. The trustee can reconvey after payoff or exercise an authorized power of sale, subject to law."
      >
        <Box x={30} y={30} w={195} title="Trustor" label="Borrower / property owner" />
        <Box x={415} y={30} w={195} title="Beneficiary" label="Lender" />
        <Box x={222} y={226} w={196} title="Trustee" label="Holds bare legal title" />
        <path
          d="M225 66H410m-8-5 8 5-8 5M126 102V262H216m-8-5 8 5-8 5M513 102V261H423m8-5-8 5 8 5"
          fill="none"
          stroke="currentColor"
        />
        <text x="320" y="52" textAnchor="middle" fontSize="12">
          Promissory note
        </text>
        <text x="145" y="166" fontSize="12">
          Deed of trust
        </text>
        <text x="430" y="167" fontSize="12">
          Security benefits
        </text>
        <text x="430" y="184" fontSize="12">
          the lender
        </text>
      </Plate>
    )
  if (slug === 'transfer-title-and-escrow')
    return (
      <Plate
        title="A simplified escrow sequence"
        description="Escrow coordinates the parties' written instructions. Closing requires satisfaction of the applicable instructions and conditions; signing documents alone does not mean the transaction has closed."
      >
        {['Agreement', 'Escrow opens', 'Conditions', 'Funding', 'Recording'].map((label, i) => (
          <g key={label}>
            <circle
              cx={70 + i * 124}
              cy="130"
              r="17"
              fill="var(--background)"
              stroke="currentColor"
            />
            <text x={70 + i * 124} y="135" fontSize="13" textAnchor="middle">
              {i + 1}
            </text>
            {i < 4 && (
              <path d={`M${87 + i * 124} 130h90`} stroke="currentColor" strokeOpacity=".5" />
            )}
            <text x={70 + i * 124} y="177" fontSize="13" textAnchor="middle" fontWeight="600">
              {label}
            </text>
          </g>
        ))}
        <text x="320" y="236" textAnchor="middle" fontSize="13">
          Written instructions → performance → closing and disbursement
        </text>
      </Plate>
    )
  if (slug === 'practice-trust-funds')
    return (
      <Plate
        title="Three-way trust reconciliation"
        description="Illustrative records: the adjusted bank balance, trust control record, and total of individual beneficiary balances must agree. Reconciliation identifies errors; agreement alone does not establish that every disbursement was authorized."
      >
        <Box x={28} y={73} w={176} h={108} title="$5,000" label="Adjusted bank balance" />
        <Box x={232} y={73} w={176} h={108} title="$5,000" label="Control record balance" />
        <Box x={436} y={73} w={176} h={108} title="$5,000" label="Beneficiary ledgers total" />
        <text x="116" y="216" textAnchor="middle" fontSize="12">
          $6,000 bank statement
        </text>
        <text x="116" y="236" textAnchor="middle" fontSize="12">
          − $1,000 outstanding checks
        </text>
        <text x="320" y="226" textAnchor="middle" fontSize="12">
          Receipts less disbursements
        </text>
        <text x="524" y="216" textAnchor="middle" fontSize="12">
          Client A: $3,000
        </text>
        <text x="524" y="236" textAnchor="middle" fontSize="12">
          Client B: $2,000
        </text>
      </Plate>
    )
  if (slug === 'contracts-formation')
    return (
      <Plate
        title="From offer to agreement"
        description="An acceptance must match the offer and be communicated as required while the offer remains open. The other elements of a valid contract, including capacity, consent, lawful object, and consideration, must also be present."
      >
        <Box x={25} y={109} w={172} title="Offer" label="Definite proposed terms" />
        <Box x={234} y={109} w={172} title="Acceptance" label="Matches the offer" />
        <Box x={443} y={109} w={172} title="Communication" label="Required notice given" />
        <path
          d="M198 143H231m-8-5 8 5-8 5M407 143H440m-8-5 8 5-8 5"
          fill="none"
          stroke="currentColor"
        />
        <text x="320" y="237" textAnchor="middle" fontSize="14">
          A changed term is generally a counteroffer.
        </text>
      </Plate>
    )
  return null
}
