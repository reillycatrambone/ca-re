'use client'

import { useState } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import type { Question } from '@/lib/curriculum'
import { Button } from '@/components/ui/button'
import { QuestionCard } from './question-card'

export function ChapterQuiz({ questions }: { questions: Question[] }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [revealed, setRevealed] = useState(false)
  const [finished, setFinished] = useState(false)
  if (!questions.length) return null
  const question = questions[index]
  const score = questions.filter((q) => answers[q.id] === q.answer).length
  return (
    <section id="knowledge-check" className="chapter-quiz">
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
              setIndex(0)
              setAnswers({})
              setRevealed(false)
              setFinished(false)
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
