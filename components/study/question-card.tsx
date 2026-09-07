'use client'

import { Check, X } from 'lucide-react'
import type { RefObject } from 'react'
import type { Question } from '@/lib/curriculum'
import { cn } from '@/lib/utils'

export function focusQuestionPrompt(prompt: HTMLHeadingElement | null) {
  prompt?.focus({ preventScroll: true })
  prompt?.scrollIntoView({ block: 'start', behavior: 'instant' })
}

export function QuestionCard({
  question,
  optionOrder,
  selected,
  revealed = false,
  disabled = false,
  promptRef,
  onSelect,
}: {
  question: Question
  optionOrder: readonly number[]
  selected?: number
  revealed?: boolean
  disabled?: boolean
  promptRef?: RefObject<HTMLHeadingElement | null>
  onSelect: (index: number) => void
}) {
  return (
    <div className="question-card">
      <h3
        id={`prompt-${question.id}`}
        className="question-prompt"
        ref={promptRef}
        tabIndex={promptRef ? -1 : undefined}
      >
        {question.prompt}
      </h3>
      <fieldset aria-labelledby={`prompt-${question.id}`} className="question-options">
        <legend className="sr-only">Choose one answer</legend>
        {optionOrder.map((authoredIndex, displayIndex) => {
          const option = question.options[authoredIndex]
          return (
            <label
              key={authoredIndex}
              className={cn(
                'question-option',
                selected === authoredIndex && 'selected',
                revealed && authoredIndex === question.answer && 'correct',
                revealed &&
                  selected === authoredIndex &&
                  authoredIndex !== question.answer &&
                  'incorrect'
              )}
            >
              <input
                type="radio"
                name={`answer-${question.id}`}
                value={authoredIndex}
                checked={selected === authoredIndex}
                disabled={revealed || disabled}
                onChange={() => onSelect(authoredIndex)}
              />
              <span className="option-letter">{String.fromCharCode(65 + displayIndex)}</span>
              <span className="option-text">
                {option.text}
                {revealed && <span className="option-explanation">{option.explanation}</span>}
              </span>
              {revealed && authoredIndex === question.answer && (
                <Check size={17} aria-label="Correct answer" />
              )}
              {revealed && selected === authoredIndex && authoredIndex !== question.answer && (
                <X size={17} aria-label="Incorrect answer" />
              )}
            </label>
          )
        })}
      </fieldset>
      {revealed && (
        <p className="answer-status" role="status">
          {selected === question.answer
            ? 'Correct.'
            : selected === undefined
              ? 'Not answered.'
              : 'Not quite.'}{' '}
          The correct answer is {String.fromCharCode(65 + optionOrder.indexOf(question.answer))}.
        </p>
      )}
    </div>
  )
}
