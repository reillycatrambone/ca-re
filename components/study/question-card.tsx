'use client'

import { Check, X } from 'lucide-react'
import type { Question } from '@/lib/curriculum'
import { cn } from '@/lib/utils'

export function QuestionCard({
  question,
  selected,
  revealed = false,
  onSelect,
}: {
  question: Question
  selected?: number
  revealed?: boolean
  onSelect: (index: number) => void
}) {
  return (
    <div className="question-card">
      <h3 id={`prompt-${question.id}`} className="question-prompt">
        {question.prompt}
      </h3>
      <fieldset aria-labelledby={`prompt-${question.id}`} className="question-options">
        <legend className="sr-only">Choose one answer</legend>
        {question.options.map((option, index) => (
          <label
            key={index}
            className={cn(
              'question-option',
              selected === index && 'selected',
              revealed && index === question.answer && 'correct',
              revealed && selected === index && index !== question.answer && 'incorrect'
            )}
          >
            <input
              type="radio"
              name={`answer-${question.id}`}
              value={index}
              checked={selected === index}
              disabled={revealed}
              onChange={() => onSelect(index)}
            />
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span className="option-text">
              {option.text}
              {revealed && <span className="option-explanation">{option.explanation}</span>}
            </span>
            {revealed && index === question.answer && (
              <Check size={17} aria-label="Correct answer" />
            )}
            {revealed && selected === index && index !== question.answer && (
              <X size={17} aria-label="Incorrect answer" />
            )}
          </label>
        ))}
      </fieldset>
      {revealed && (
        <p className="answer-status" role="status">
          {selected === question.answer
            ? 'Correct.'
            : selected === undefined
              ? 'Not answered.'
              : 'Not quite.'}{' '}
          The correct answer is {String.fromCharCode(65 + question.answer)}.
        </p>
      )}
    </div>
  )
}
