'use client'

import { useState } from 'react'
import { capitalizedValue } from '@/lib/calculations'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})
const annualNoi = 48000

export function CapitalizationFigure() {
  const [rate, setRate] = useState(6)
  const value = capitalizedValue(annualNoi, rate)!
  return (
    <div className="cap-rate-figure">
      <div className="cap-rate-input">
        <label htmlFor="capitalization-rate">
          Capitalization rate <strong>{rate.toFixed(2)}%</strong>
        </label>
        <input
          id="capitalization-rate"
          type="range"
          min="4"
          max="10"
          step="0.25"
          value={rate}
          onChange={(event) => setRate(Number(event.target.value))}
          aria-valuetext={`${rate.toFixed(2)} percent`}
        />
        <div className="cap-rate-range" aria-hidden="true">
          <span>4%</span>
          <span>10%</span>
        </div>
      </div>
      <output htmlFor="capitalization-rate" className="cap-rate-output" aria-live="polite">
        <span>Indicated value</span>
        <strong>{currency.format(value)}</strong>
        <small>$48,000 / {(rate / 100).toFixed(4)}</small>
      </output>
      <dl className="cap-rate-comparison" aria-label="Value at three capitalization rates">
        {[4, 6, 8].map((comparisonRate) => {
          const comparisonValue = capitalizedValue(annualNoi, comparisonRate)!
          return (
            <div key={comparisonRate}>
              <dt>{comparisonRate}%</dt>
              <dd>
                <span
                  className="cap-rate-bar"
                  style={{ width: `${(comparisonValue / 1200000) * 100}%` }}
                  aria-hidden="true"
                />
                <span>{currency.format(comparisonValue)}</span>
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
