'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { CaseLab } from '@/lib/study-guides/types'
import { Button } from '@/components/ui/button'
import { useLabAnchor } from './use-lab-anchor'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})
const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 })
export function formatLabValue(value: number, format: 'currency' | 'percent' | 'number') {
  return format === 'currency'
    ? currency.format(value)
    : `${number.format(value)}${format === 'percent' ? '%' : ''}`
}

export function CalculationLab({ lab }: { lab: Extract<CaseLab, { kind: 'calculation' }> }) {
  const [active, setActive] = useState(0)
  useLabAnchor('calculation-step', lab.steps.length, setActive)
  return (
    <div className="calculation-lab">
      <dl className="calculation-inputs">
        {lab.inputs.map((input) => (
          <div key={input.label}>
            <dt>{input.label}</dt>
            <dd>{input.value}</dd>
          </div>
        ))}
      </dl>
      <div className="calculation-stepper" role="tablist" aria-label="Calculation steps">
        {lab.steps.map((step, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`calculation-step-${index + 1}`}
            id={`calculation-tab-${index}`}
            tabIndex={active === index ? 0 : -1}
            key={step.label}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let next = index
              if (event.key === 'ArrowRight') next = (index + 1) % lab.steps.length
              else if (event.key === 'ArrowLeft')
                next = (index + lab.steps.length - 1) % lab.steps.length
              else if (event.key === 'Home') next = 0
              else if (event.key === 'End') next = lab.steps.length - 1
              else return
              event.preventDefault()
              setActive(next)
              document.getElementById(`calculation-tab-${next}`)?.focus()
            }}
          >
            <span>{index + 1}</span>
            <span>{step.label}</span>
          </button>
        ))}
      </div>
      {lab.steps.map((step, index) => (
        <div
          id={`calculation-step-${index + 1}`}
          role="tabpanel"
          aria-labelledby={`calculation-tab-${index}`}
          className="calculation-step"
          data-active={active === index}
          key={step.label}
          tabIndex={0}
        >
          <h3>{step.label}</h3>
          <code>{step.expression}</code>
          <output>{formatLabValue(step.value, step.format)}</output>
          <p>{step.explanation}</p>
        </div>
      ))}
      <div className="calculation-navigation">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous calculation step"
          title="Previous step"
          disabled={active === 0}
          onClick={() => setActive(active - 1)}
        >
          <ArrowLeft size={15} />
        </Button>
        <span>
          Step {active + 1} of {lab.steps.length}
        </span>
        <Button
          variant="outline"
          disabled={active === lab.steps.length - 1}
          onClick={() => setActive(active + 1)}
        >
          Next step
          <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  )
}
