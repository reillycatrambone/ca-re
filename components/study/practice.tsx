'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Clock3, Flag, Grid2X2, Play, X } from 'lucide-react'
import { domains, examSpec, type Question } from '@/lib/curriculum'
import { buildExam, shuffle, summarizeSession, type StudySession } from '@/lib/exam'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { toggleItem, useStudy } from './study-provider'
import { QuestionCard } from './question-card'
import { ExamResults } from './exam-results'

export function Practice({ bank }: { bank: Question[] }) {
  const { state, update, ready } = useStudy()
  const [domain, setDomain] = useState('all')
  const [count, setCount] = useState('10')
  const [confirmFinish, setConfirmFinish] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)
  const [now, setNow] = useState(0)
  const [startError, setStartError] = useState('')
  const session = state.session
  const bankMap = useMemo(() => new Map(bank.map((q) => [q.id, q])), [bank])
  const questions = useMemo(
    () =>
      session
        ? session.questionIds.flatMap((id) => {
            const q = bankMap.get(id)
            return q ? [q] : []
          })
        : [],
    [session?.questionIds, bankMap]
  )
  const finish = () => {
    update((s) => {
      if (!s.session || s.session.finishedAt) return s
      const finished = { ...s.session, finishedAt: Date.now() }
      const attempt = summarizeSession(
        finished,
        finished.questionIds.flatMap((id) => {
          const q = bankMap.get(id)
          return q ? [q] : []
        })
      )
      return {
        ...s,
        session: finished,
        attempts: [attempt, ...s.attempts.filter((a) => a.id !== finished.id)].slice(0, 50),
      }
    })
    setConfirmFinish(false)
    window.scrollTo({ top: 0 })
  }
  useEffect(() => {
    if (!session || session.finishedAt || !session.expiresAt) return
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [session?.id, session?.finishedAt, session?.expiresAt])
  useEffect(() => {
    if (session?.expiresAt && !session.finishedAt && now >= session.expiresAt) finish()
  }, [now, session?.expiresAt, session?.finishedAt])
  const start = (mode: StudySession['mode']) => {
    try {
      const selected =
        mode === 'exam'
          ? buildExam(bank)
          : shuffle(bank.filter((q) => domain === 'all' || q.domain === domain)).slice(
              0,
              Number(count)
            )
      if (!selected.length) throw new Error('No questions are available for this selection.')
      const startedAt = Date.now()
      update((s) => ({
        ...s,
        session: {
          id: crypto.randomUUID(),
          mode,
          questionIds: selected.map((q) => q.id),
          answers: {},
          checked: [],
          flags: [],
          current: 0,
          startedAt,
          expiresAt: mode === 'exam' ? startedAt + examSpec.durationMinutes * 60_000 : null,
          finishedAt: null,
        },
      }))
      setNow(startedAt)
      setStartError('')
    } catch {
      setStartError('This question set could not be started. Try a different selection.')
    }
  }
  const amend = (fn: (current: StudySession) => StudySession) =>
    update((s) => {
      if (!s.session || s.session.finishedAt) return s
      if (s.session.expiresAt && Date.now() >= s.session.expiresAt) {
        const finished = { ...s.session, finishedAt: s.session.expiresAt }
        const attempt = summarizeSession(finished, questions)
        return {
          ...s,
          session: finished,
          attempts: [attempt, ...s.attempts.filter((a) => a.id !== finished.id)].slice(0, 50),
        }
      }
      return { ...s, session: fn(s.session) }
    })
  if (!ready)
    return (
      <p className="empty-state" role="status">
        Loading study session...
      </p>
    )
  if (session && (questions.length !== session.questionIds.length || !questions.length))
    return (
      <div>
        <h1>Question set updated</h1>
        <p className="page-description">Start a new session with the current questions.</p>
        <Button onClick={() => update((s) => ({ ...s, session: null }))}>New session</Button>
      </div>
    )
  if (session?.finishedAt)
    return (
      <ExamResults
        session={session}
        questions={questions}
        restart={() => update((s) => ({ ...s, session: null }))}
      />
    )
  if (session) {
    const current = Math.min(session.current, questions.length - 1)
    const question = questions[current]
    const revealed = session.mode === 'practice' && session.checked.includes(question.id)
    const answered = questions.filter((q) => session.answers[q.id] !== undefined).length
    const seconds = Math.max(0, Math.ceil(((session.expiresAt ?? now) - now) / 1000))
    const clock = `${Math.floor(seconds / 3600)}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
    return (
      <div className="active-session">
        <div className="eyebrow">
          Study / {session.mode === 'exam' ? 'Timed examination' : 'Topic practice'}
        </div>
        <div className="session-header">
          <h2>{session.mode === 'exam' ? 'Practice examination' : 'Topic practice'}</h2>
          {session.mode === 'exam' && (
            <span className="session-timer" aria-label="Time remaining">
              <Clock3 size={16} />
              {clock}
            </span>
          )}
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={answered}
          aria-label="Questions answered"
        >
          <div style={{ width: `${(answered / questions.length) * 100}%` }} />
        </div>
        <div className="session-question-meta">
          <span>
            Question {current + 1} of {questions.length} ·{' '}
            {domains.find((d) => d.id === question.domain)?.shortTitle}
          </span>
          <Button
            size="icon"
            variant="ghost"
            title="Flag for review"
            aria-label="Flag for review"
            aria-pressed={session.flags.includes(question.id)}
            onClick={() => amend((s) => ({ ...s, flags: toggleItem(s.flags, question.id) }))}
          >
            <Flag fill={session.flags.includes(question.id) ? 'currentColor' : 'none'} />
          </Button>
        </div>
        <QuestionCard
          question={question}
          selected={session.answers[question.id]}
          revealed={revealed}
          onSelect={(answer) =>
            amend((s) => ({ ...s, answers: { ...s.answers, [question.id]: answer } }))
          }
        />
        {session.mode === 'practice' && !revealed && (
          <div className="quiz-footer">
            <Button
              disabled={session.answers[question.id] === undefined}
              onClick={() => amend((s) => ({ ...s, checked: [...s.checked, question.id] }))}
            >
              Check answer
            </Button>
          </div>
        )}
        <div className="session-navigation">
          <div>
            <Button
              variant="outline"
              disabled={current === 0}
              onClick={() => amend((s) => ({ ...s, current: current - 1 }))}
            >
              <ArrowLeft />
              Previous
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Question navigator"
              title="Question navigator"
              onClick={() => setMapOpen(true)}
            >
              <Grid2X2 />
            </Button>
          </div>
          <div>
            <Button variant="ghost" onClick={() => setConfirmFinish(true)}>
              Finish
            </Button>
            {current < questions.length - 1 && (
              <Button onClick={() => amend((s) => ({ ...s, current: current + 1 }))}>
                Next
                <ArrowRight />
              </Button>
            )}
          </div>
        </div>
        <Dialog open={confirmFinish} onOpenChange={setConfirmFinish}>
          <DialogContent>
            <DialogTitle>Finish this session?</DialogTitle>
            <DialogDescription>
              {answered === questions.length
                ? 'All questions have an answer.'
                : `${questions.length - answered} questions are unanswered and will count as incorrect.`}{' '}
              Your answers will be scored and the session will end.
            </DialogDescription>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmFinish(false)}>
                Keep working
              </Button>
              <Button onClick={finish}>Finish and score</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={mapOpen} onOpenChange={setMapOpen}>
          <DialogContent>
            <div className="section-heading">
              <DialogTitle>Questions</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigator"
                onClick={() => setMapOpen(false)}
              >
                <X />
              </Button>
            </div>
            <DialogDescription>
              {answered} answered · {session.flags.length} flagged
            </DialogDescription>
            <div className="question-map">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  className={cn(
                    session.answers[q.id] !== undefined && 'answered',
                    session.flags.includes(q.id) && 'flagged',
                    i === current && 'current'
                  )}
                  aria-label={`Question ${i + 1}${session.answers[q.id] !== undefined ? ', answered' : ', unanswered'}${session.flags.includes(q.id) ? ', flagged' : ''}`}
                  onClick={() => {
                    amend((s) => ({ ...s, current: i }))
                    setMapOpen(false)
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
  return (
    <>
      <div className="eyebrow">Study / Practice</div>
      <h1>Practice</h1>
      <p className="page-description">Original questions covering all seven examination domains.</p>
      <Tabs defaultValue="practice" className="study-tabs">
        <TabsList>
          <TabsTrigger value="practice">Topic practice</TabsTrigger>
          <TabsTrigger value="exam">Mock exam</TabsTrigger>
        </TabsList>
        <TabsContent value="practice">
          <div className="study-toolbar">
            <div className="field">
              <label htmlFor="practice-domain">Topic</label>
              <select
                id="practice-domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              >
                <option value="all">All topics</option>
                {domains.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.shortTitle}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="practice-count">Questions</label>
              <select id="practice-count" value={count} onChange={(e) => setCount(e.target.value)}>
                {[10, 20, 30].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
            <Button onClick={() => start('practice')}>
              <Play />
              Start practice
            </Button>
          </div>
          <div className="practice-intro">
            <h2>Topic practice</h2>
            <p>
              Untimed questions with explanations for every answer. Each session draws up to the
              selected number of questions from the available topic bank.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="exam">
          <div className="exam-summary-strip">
            <div>
              <strong>150</strong>
              <span>questions</span>
            </div>
            <div>
              <strong>3 hours</strong>
              <span>time limit</span>
            </div>
            <div>
              <strong>70%</strong>
              <span>passing benchmark</span>
            </div>
          </div>
          <div className="practice-intro">
            <h2>California salesperson practice exam</h2>
            <p>
              Questions are sampled in the approximate proportions of the DRE outline. Answers are
              reviewed after submission. The timer continues if you leave or reload this page. These
              are original practice questions, not actual DRE exam questions.
            </p>
            <Button onClick={() => start('exam')}>
              <Clock3 />
              Start timed exam
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      {startError && (
        <p role="alert" className="storage-warning">
          {startError}
        </p>
      )}
    </>
  )
}
