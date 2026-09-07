'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown, Clock3, Flag, Grid2X2, Play, X } from 'lucide-react'
import { domains, type DomainId, type Question } from '@/lib/curriculum'
import {
  amendStudySession,
  buildExam,
  buildPractice,
  createStudySession,
  getExamForms,
  getPracticeConcepts,
  sessionMatchesQuestions,
  type ExamForm,
  type StudySession,
} from '@/lib/exam'
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
import { focusQuestionPrompt, QuestionCard } from './question-card'
import { ExamResults } from './exam-results'

export function Practice({ bank }: { bank: Question[] }) {
  const { state, update, ready } = useStudy()
  const [domain, setDomain] = useState<DomainId | 'all'>('all')
  const [count, setCount] = useState('10')
  const [concept, setConcept] = useState('all')
  const [examForm, setExamForm] = useState<ExamForm>('exam-a')
  const [confirmFinish, setConfirmFinish] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)
  const navigatorTrigger = useRef<HTMLButtonElement>(null)
  const finishTrigger = useRef<HTMLButtonElement>(null)
  const prompt = useRef<HTMLHeadingElement>(null)
  const navigatorSelected = useRef(false)
  const [now, setNow] = useState(0)
  const [startError, setStartError] = useState('')
  const session = state.session
  const bankMap = useMemo(() => new Map(bank.map((q) => [q.id, q])), [bank])
  const forms = useMemo(() => getExamForms(bank), [bank])
  const concepts = useMemo(() => getPracticeConcepts(bank, domain), [bank, domain])
  const selectedConcept = concepts.some((entry) => entry.id === concept) ? concept : 'all'
  const selectedForm =
    forms.find((form) => form.id === examForm && form.available) ??
    forms.find((form) => form.available)
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
  const sessionValid = session ? sessionMatchesQuestions(session, questions) : false
  useEffect(() => {
    if (sessionValid && !session?.finishedAt && !navigatorSelected.current)
      focusQuestionPrompt(prompt.current)
  }, [session?.id, session?.current, sessionValid])
  const finish = () => {
    update((s) => {
      if (!s.session || s.session.finishedAt) return s
      const finished = amendStudySession(s.session, (current) => ({
        ...current,
        finishedAt: Date.now(),
      }))
      return {
        session: finished,
      }
    })
    setConfirmFinish(false)
    window.scrollTo({ top: 0 })
  }
  useEffect(() => {
    if (!session || !sessionValid || session.finishedAt || !session.expiresAt) return
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [session?.id, session?.finishedAt, session?.expiresAt, sessionValid])
  useEffect(() => {
    if (sessionValid && session?.expiresAt && !session.finishedAt && now >= session.expiresAt)
      finish()
  }, [now, session?.expiresAt, session?.finishedAt, sessionValid])
  const start = (mode: StudySession['mode']) => {
    try {
      if (mode === 'exam' && !selectedForm) throw new Error('No exam form is ready')
      const selected =
        mode === 'exam'
          ? buildExam(bank, selectedForm!.id)
          : buildPractice(bank, domain, Number(count), {
              conceptId: selectedConcept === 'all' ? undefined : selectedConcept,
            })
      if (!selected.length) throw new Error('No questions are available for this selection.')
      const startedAt = Date.now()
      const nextSession = createStudySession({
        questions: selected,
        mode,
        examForm: mode === 'exam' ? selectedForm!.id : null,
        now: startedAt,
      })
      update((s) => ({
        ...s,
        session: nextSession,
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
      return { ...s, session: amendStudySession(s.session, fn) }
    })
  if (!ready)
    return (
      <p className="empty-state" role="status">
        Loading study session...
      </p>
    )
  if (session && !sessionValid)
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
          <h2>
            {session.mode === 'exam'
              ? `Practice examination: ${forms.find((form) => form.id === session.examForm)?.label}`
              : 'Topic practice'}
          </h2>
          {session.mode === 'exam' && (
            <span className="session-timer" aria-label="Time remaining">
              <Clock3 size={16} />
              {clock}
            </span>
          )}
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
          promptRef={prompt}
          optionOrder={session.optionOrders[question.id]}
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
              ref={navigatorTrigger}
              title="Question navigator"
              onClick={() => setMapOpen(true)}
            >
              <Grid2X2 />
            </Button>
          </div>
          <div>
            <Button ref={finishTrigger} variant="ghost" onClick={() => setConfirmFinish(true)}>
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
          <DialogContent
            onCloseAutoFocus={(event) => {
              if (finishTrigger.current) {
                event.preventDefault()
                finishTrigger.current.focus({ preventScroll: true })
              }
            }}
          >
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
          <DialogContent
            onCloseAutoFocus={(event) => {
              if (navigatorSelected.current) {
                event.preventDefault()
                navigatorSelected.current = false
                focusQuestionPrompt(prompt.current)
                return
              }
              if (navigatorTrigger.current) {
                event.preventDefault()
                navigatorTrigger.current.focus({ preventScroll: true })
              }
            }}
          >
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
                    navigatorSelected.current = true
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
                onChange={(e) => {
                  setDomain(e.target.value as DomainId | 'all')
                  setConcept('all')
                }}
              >
                <option value="all">All topics</option>
                {domains.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.shortTitle}
                  </option>
                ))}
              </select>
            </div>
            {concepts.length > 0 && (
              <div className="field">
                <label htmlFor="practice-concept">Concept</label>
                <div className="wrapping-select">
                  <span className="wrapping-select-value" aria-hidden="true">
                    {concepts.find((entry) => entry.id === selectedConcept)?.label ??
                      'All concepts'}
                  </span>
                  <ChevronDown size={14} aria-hidden="true" />
                  <select
                    id="practice-concept"
                    value={selectedConcept}
                    onChange={(event) => setConcept(event.target.value)}
                  >
                    <option value="all">All concepts</option>
                    {concepts.map((entry) => (
                      <option key={entry.id} value={entry.id}>
                        {entry.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
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
              Original assessment questions, separate from chapter practice. Not actual DRE
              examination items.
            </p>
            {!selectedForm && <p role="status">Form A and Form B are not yet available.</p>}
            <div className="study-toolbar">
              {selectedForm && (
                <div className="field">
                  <label htmlFor="exam-form">Examination form</label>
                  <select
                    id="exam-form"
                    value={selectedForm.id}
                    onChange={(event) => setExamForm(event.target.value as ExamForm)}
                  >
                    {forms.map((form) => (
                      <option key={form.id} value={form.id} disabled={!form.available}>
                        {form.label}
                        {!form.available ? ' - unavailable' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <Button disabled={!selectedForm} onClick={() => start('exam')}>
                <Clock3 />
                Start timed exam
              </Button>
            </div>
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
