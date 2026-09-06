import Link from 'next/link'
import { MathCalculator } from '@/components/study/math-calculator'
export const metadata = { title: 'Real Estate Math' }
const formulas = [
  [
    'Commission',
    'Price × negotiated rate',
    '$600,000 × 0.025 = $15,000. A 2.5% rate is illustrative, not a standard fee.',
  ],
  [
    'Loan-to-value ratio',
    'Loan ÷ property value × 100',
    '$360,000 ÷ $450,000 = 80%. Use the value basis specified in the question.',
  ],
  [
    'Simple interest',
    'Principal × annual rate × time in years',
    '$10,000 × 0.06 × (3 ÷ 12) = $150.',
  ],
  ['Discount points', 'Loan amount × points ÷ 100', 'Two points on a $300,000 loan = $6,000.'],
  [
    'Capitalization',
    'Value = annual NOI ÷ cap rate',
    '$48,000 ÷ 0.06 = $800,000. Do not divide by 6.',
  ],
  [
    'Net operating income',
    'Effective gross income − operating expenses',
    '$90,000 − $30,000 = $60,000. Debt service is not an operating expense.',
  ],
  [
    'Gross rent multiplier',
    'Price ÷ gross rent for the specified period',
    '$480,000 ÷ $4,000 monthly rent = 120 monthly GRM. Keep periods consistent.',
  ],
  [
    'Cash-on-cash return',
    'Annual before-tax cash flow ÷ cash invested',
    '$12,000 ÷ $150,000 = 8%. Cash flow here is after debt service.',
  ],
  [
    'Proration',
    'Periodic charge ÷ days in period × allocated days',
    '$3,600 annual expense ÷ 360 × 45 = $450, only when a 360-day convention is specified.',
  ],
  ['Area', 'Length × width', 'A rectangular 100 ft × 150 ft parcel has 15,000 square feet.'],
  ['Acreage', 'Square feet ÷ 43,560', '87,120 square feet = 2 acres.'],
  [
    'Net proceeds',
    'Sale price − seller costs − liens paid off',
    '$700,000 − $35,000 − $400,000 = $265,000 before any other specified adjustments.',
  ],
]
export default function MathPage() {
  return (
    <div className="standard-page">
      <div className="eyebrow">Reference / Real estate math</div>
      <h1>Real estate math</h1>
      <p className="page-description">Formulas, units, and worked examples for exam problems.</p>
      <div className="table-scroll">
        <table className="reference-table">
          <thead>
            <tr>
              <th>Concept</th>
              <th>Formula</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {formulas.map(([concept, formula, example]) => (
              <tr key={concept}>
                <td>
                  <strong>{concept}</strong>
                </td>
                <td>{formula}</td>
                <td>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MathCalculator />
      <div className="lesson-prose">
        <h2>Set up the problem before calculating</h2>
        <ol>
          <li>Identify what is being asked: a dollar amount, a rate, an area, or a time period.</li>
          <li>
            Convert percentages to decimals and match the time units. A monthly rent multiplier
            cannot be applied to annual rent without conversion.
          </li>
          <li>
            Use the question's stated convention for proration days and rounding. Do not assume
            every transaction uses a 360-day year.
          </li>
          <li>
            Check the scale of the answer. A 1% point is one-hundredth of the loan amount, not
            one-hundredth of the property price.
          </li>
        </ol>
        <h2>Value and financing are different calculations</h2>
        <p>
          A property's investment NOI is calculated before the owner's debt service. Changing the
          owner's loan does not, by itself, change that property's NOI. Cash flow after debt service
          and cash-on-cash return do depend on financing.
        </p>
        <p>
          Property-tax appraisal can use a tax-loaded capitalization convention. Do not combine an
          income figure that already deducts property tax with a capitalization rate that also loads
          the same tax. The{' '}
          <Link href="/docs/valuation-income-analysis/">income analysis chapter</Link> explains the
          distinction.
        </p>
        <h2>Related chapters</h2>
        <ul>
          <li>
            <Link href="/docs/valuation-income-analysis/">Income analysis and capitalization</Link>
          </li>
          <li>
            <Link href="/docs/financing-loan-fundamentals/">Loan fundamentals</Link>
          </li>
          <li>
            <Link href="/docs/transfer-taxes-and-prorations/">Taxes and prorations</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
