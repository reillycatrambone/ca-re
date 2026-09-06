'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { domains, type Question } from '@/lib/curriculum'
import { gradeQuestions, gradeByDomain, type StudySession } from '@/lib/exam'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { QuestionCard } from './question-card'

export function ExamResults({
  session,
  questions,
  restart,
}: {
  session: StudySession
  questions: Question[]
  restart: () => void
}) {
  const [filter, setFilter] = useState('missed')
  const result = gradeQuestions(questions, session.answers)
  const domainScores = gradeByDomain(questions, session.answers)
  const shown = questions.filter((q) => filter === 'all' || session.answers[q.id] !== q.answer)
  return (
    <div className="exam-results">
      <div className="eyebrow">
        {session.mode === 'exam' ? 'Practice examination' : 'Topic practice'} / Results
      </div>
      <h1>{result.percent}% correct</h1>
      <p className="page-description">
        {result.score} of {result.total} questions answered correctly.
        {session.mode === 'exam' &&
          ` ${result.passed ? 'At or above' : 'Below'} the 70% practice-exam benchmark.`}
      </p>
      <div className="result-actions">
        <Button onClick={restart}>
          <RotateCcw />
          New session
        </Button>
      </div>
      <div className="result-breakdown">
        {domains
          .filter((d) => domainScores[d.id])
          .map((domain) => {
            const score = domainScores[domain.id]!
            return (
              <div key={domain.id}>
                <span>{domain.shortTitle}</span>
                <span>
                  {score.correct} / {score.total}
                </span>
              </div>
            )
          })}
      </div>
      <div className="section-heading">
        <h2>Answer review</h2>
        <ToggleGroup
          type="single"
          aria-label="Answer review filter"
          value={filter}
          onValueChange={(value) => {
            if (value) setFilter(value)
          }}
        >
          <ToggleGroupItem value="missed">Missed</ToggleGroupItem>
          <ToggleGroupItem value="all">All</ToggleGroupItem>
        </ToggleGroup>
      </div>
      {shown.length === 0 ? (
        <p className="empty-state">No missed questions in this session.</p>
      ) : (
        shown.map((q) => (
          <div className="review-question" key={q.id}>
            <span className="field-label">Question {questions.indexOf(q) + 1}</span>
            <QuestionCard
              question={q}
              selected={session.answers[q.id]}
              revealed
              onSelect={() => {}}
            />
            <Link className="text-link" href={`/docs/${q.lessonSlug}/`}>
              Review this topic
              <ArrowRight size={13} />
            </Link>
          </div>
        ))
      )}
    </div>
  )
}
