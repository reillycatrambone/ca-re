'use client'

import { useState } from 'react'
import { monthlyPayment } from '@/lib/calculations'

export function MathCalculator() {
  const [principal, setPrincipal] = useState('400000')
  const [rate, setRate] = useState('6')
  const [years, setYears] = useState('30')
  const payment =
    principal.trim() && rate.trim() && years.trim()
      ? monthlyPayment(Number(principal), Number(rate), Number(years))
      : null
  return (
    <section className="math-calculator">
      <h2>Amortizing loan payment</h2>
      <div className="calculator-fields">
        <div className="field">
          <label htmlFor="loan-principal">Principal ($)</label>
          <input
            id="loan-principal"
            type="number"
            min="0"
            step="1000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="loan-rate">Annual interest rate (%)</label>
          <input
            id="loan-rate"
            type="number"
            min="0"
            step="0.125"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="loan-years">Term (years)</label>
          <input
            id="loan-years"
            type="number"
            min="1"
            step="1"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
      </div>
      <div className="calculator-result" aria-live="polite">
        <span>Monthly principal and interest</span>
        <strong>
          {payment === null
            ? 'Invalid input'
            : payment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </strong>
      </div>
      <p className="storage-note">
        Illustrative fixed-rate loan with monthly payments. Excludes taxes, insurance, fees, and
        mortgage insurance.
      </p>
    </section>
  )
}
