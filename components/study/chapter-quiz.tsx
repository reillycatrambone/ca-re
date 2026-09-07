'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import type { Question } from '@/lib/curriculum'
import { createOptionOrders, type OptionOrder } from '@/lib/exam'
import { Button } from '@/components/ui/button'
import { focusQuestionPrompt, QuestionCard } from './question-card'

export function ChapterQuiz({ questions: bank }: { questions: Question[] }) {
  const questions = bank.filter((question) => question.pool === 'practice')
  return (
    <ChapterQuizSession
      key={questions.map((question) => `${question.id}:${question.revision}`).join('|')}
      questions={questions}
    />
  )
}

function ChapterQuizSession({ questions }: { questions: Question[] }) {
  const [optionOrders, setOptionOrders] = useState<Record<string, OptionOrder> | null>(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [revealed, setRevealed] = useState(false)
  const [finished, setFinished] = useState(false)
  const prompt = useRef<HTMLHeadingElement>(null)
  const navigationRequested = useRef(false)
  useEffect(() => {
    if (!optionOrders) setOptionOrders(createOptionOrders(questions))
  }, [questions, optionOrders])
  useEffect(() => {
    if (navigationRequested.current) {
      focusQuestionPrompt(prompt.current)
      navigationRequested.current = false
    }
  }, [index, finished])
  if (!questions.length) return null
  const question = questions[index]
  const score = questions.filter((q) => answers[q.id] === q.answer).length
  return (
    <section id="knowledge-check" className="chapter-quiz" aria-busy={!optionOrders}>
      <div className="section-heading">
        <h2>Knowledge check</h2>
        <span>
          {finished
            ? `${score} of ${questions.length} correct`
            : `${index + 1} / ${questions.length}`}
        </span>
      </div>
      {finished ? (
        <div className="quiz-finished">
          <p>
            {score === questions.length
              ? 'All answers correct.'
              : 'Review the explanations, then try the chapter again.'}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              navigationRequested.current = true
              setIndex(0)
              setAnswers({})
              setRevealed(false)
              setFinished(false)
              setOptionOrders(createOptionOrders(questions))
            }}
          >
            <RotateCcw />
            Try again
          </Button>
        </div>
      ) : (
        <>
          <QuestionCard
            question={question}
            promptRef={prompt}
            optionOrder={optionOrders?.[question.id] ?? [0, 1, 2, 3]}
            disabled={!optionOrders}
            selected={answers[question.id]}
            revealed={revealed}
            onSelect={(answer) => setAnswers({ ...answers, [question.id]: answer })}
          />
          <div className="quiz-footer">
            {revealed ? (
              <Button
                onClick={() => {
                  if (index === questions.length - 1) setFinished(true)
                  else {
                    navigationRequested.current = true
                    setIndex(index + 1)
                    setRevealed(false)
                  }
                }}
              >
                {index === questions.length - 1 ? 'See result' : 'Next question'}
                <ArrowRight />
              </Button>
            ) : (
              <Button
                disabled={answers[question.id] === undefined}
                onClick={() => setRevealed(true)}
              >
                Check answer
              </Button>
            )}
          </div>
        </>
      )}
    </section>
  )
}
