'use client'

import { useCallback, useState } from 'react'
import { Check, RotateCcw, ArrowRight } from 'lucide-react'
import type { CaseLab } from '@/lib/study-guides/types'
import { Button } from '@/components/ui/button'
import { useLabAnchor } from './use-lab-anchor'

export function DecisionLab({ lab }: { lab: Extract<CaseLab, { kind: 'decision' }> }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const revealChoice = useCallback((index: number) => {
    setSelected(index)
    setRevealed(true)
  }, [])
  useLabAnchor('decision-reason', lab.choices.length, revealChoice)
  return (
    <div className="decision-lab">
      <fieldset>
        <legend>{lab.question}</legend>
        {lab.choices.map((choice, index) => (
          <label className="decision-choice" key={choice.label} data-selected={selected === index}>
            <input
              type="radio"
              name="case-decision"
              value={index}
              checked={selected === index}
              onChange={() => {
                setSelected(index)
                setRevealed(false)
              }}
            />
            <span>{choice.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="lab-decision-actions">
        <Button disabled={selected === null || revealed} onClick={() => setRevealed(true)}>
          Check reasoning
          <ArrowRight size={15} />
        </Button>
        {revealed && (
          <Button
            variant="ghost"
            size="icon"
            title="Reset decision"
            aria-label="Reset decision"
            onClick={() => {
              setSelected(null)
              setRevealed(false)
            }}
          >
            <RotateCcw size={15} />
          </Button>
        )}
      </div>
      {lab.choices.map((choice, index) => (
        <div
          key={choice.label}
          id={`decision-reason-${index + 1}`}
          className="decision-feedback"
          data-shown={revealed && selected === index}
          data-correct={choice.correct}
        >
          <h3 className="lab-print-title">{choice.label}</h3>
          <div role={revealed && selected === index ? 'status' : undefined}>
            <strong>
              {choice.correct && <Check size={16} aria-hidden="true" />}
              {choice.result}
            </strong>
            <p>{choice.reasoning}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
