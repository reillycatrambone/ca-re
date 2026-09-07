import { domains, examSpec, type DomainId, type ExamFormId, type Question } from './curriculum'
import { z } from 'zod'
import { questionConcepts } from './question-concepts'

export const examForms = [
  { id: 'exam-a', label: 'Form A' },
  { id: 'exam-b', label: 'Form B' },
] as const
export type ExamForm = ExamFormId
export type OptionOrder = [number, number, number, number]

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function examAllocation(count: number = examSpec.questions) {
  const allocation = domains.map((domain, order) => ({
    id: domain.id,
    count: Math.floor((domain.weight * count) / 100),
    remainder: ((domain.weight * count) / 100) % 1,
    order,
  }))
  let remaining = count - allocation.reduce((sum, entry) => sum + entry.count, 0)
  const ranked = [...allocation].sort((a, b) => b.remainder - a.remainder || a.order - b.order)
  for (const entry of ranked) if (remaining-- > 0) entry.count++
  return allocation.map(({ id, count }) => ({ id, count }))
}

export function getExamForms(bank: Question[]) {
  const idCounts = new Map<string, number>()
  for (const question of bank) idCounts.set(question.id, (idCounts.get(question.id) ?? 0) + 1)
  return examForms.map((form) => {
    const questions = bank.filter((question) => question.pool === form.id)
    const available =
      questions.length === examSpec.questions &&
      new Set(questions.map((question) => question.id)).size === questions.length &&
      questions.every((question) => idCounts.get(question.id) === 1) &&
      questions.every((question) => question.review?.status === 'source-checked') &&
      examAllocation().every(
        ({ id, count }) => questions.filter((question) => question.domain === id).length === count
      )
    return { ...form, available }
  })
}

export function buildExam(bank: Question[], form: ExamForm, random: () => number = Math.random) {
  if (!getExamForms(bank).find((entry) => entry.id === form)?.available)
    throw new Error(`Exam form is not ready: ${form}`)
  return shuffle(
    bank.filter((question) => question.pool === form),
    random
  )
}

export function buildPractice(
  bank: Question[],
  domain: DomainId | 'all',
  count: number,
  options: { conceptId?: string; random?: () => number } = {}
) {
  if (!Number.isInteger(count) || count < 1) throw new Error('Invalid practice question count')
  return shuffle(
    bank.filter(
      (question) =>
        question.pool === 'practice' &&
        (domain === 'all' || question.domain === domain) &&
        (!options.conceptId || question.conceptIds.includes(options.conceptId))
    ),
    options.random
  ).slice(0, count)
}

export function getPracticeConcepts(bank: Question[], domain: DomainId | 'all') {
  const populated = new Set(
    bank
      .filter(
        (question) =>
          question.pool === 'practice' && (domain === 'all' || question.domain === domain)
      )
      .flatMap((question) => question.conceptIds)
  )
  return questionConcepts.filter((concept) => populated.has(concept.id))
}

export function createOptionOrders(questions: Question[], random: () => number = Math.random) {
  return Object.fromEntries(
    questions.map((question) => [question.id, shuffle([0, 1, 2, 3], random) as OptionOrder])
  )
}

export function gradeQuestions(questions: Question[], answers: Record<string, number>) {
  const score = questions.filter((q) => answers[q.id] === q.answer).length
  return {
    score,
    total: questions.length,
    percent: questions.length ? Math.round((score / questions.length) * 100) : 0,
    passed: questions.length > 0 && score / questions.length >= examSpec.passPercent / 100,
  }
}

const optionIndex = z.number().int().min(0).max(3)
const optionOrderSchema = z
  .tuple([optionIndex, optionIndex, optionIndex, optionIndex])
  .refine((order) => new Set(order).size === 4, 'Option order must be a permutation')

export const studySessionSchema = z
  .object({
    version: z.literal(2),
    id: z.string().min(1),
    mode: z.enum(['practice', 'exam']),
    examForm: z.enum(['exam-a', 'exam-b']).nullable(),
    questionIds: z.array(z.string().min(1)).min(1),
    questionRevisions: z.record(z.string(), z.number().int().positive()),
    optionOrders: z.record(z.string(), optionOrderSchema),
    answers: z.record(z.string(), optionIndex),
    checked: z.array(z.string()),
    flags: z.array(z.string()),
    current: z.number().int().min(0),
    startedAt: z.number().finite(),
    expiresAt: z.number().finite().nullable(),
    finishedAt: z.number().finite().nullable(),
  })
  .refine((session) => {
    const ids = new Set(session.questionIds)
    return (
      ids.size === session.questionIds.length &&
      session.current < ids.size &&
      Object.keys(session.optionOrders).length === ids.size &&
      Object.keys(session.questionRevisions).length === ids.size &&
      session.questionIds.every(
        (id) =>
          session.optionOrders[id] !== undefined && session.questionRevisions[id] !== undefined
      ) &&
      Object.keys(session.answers).every((id) => ids.has(id)) &&
      session.checked.every((id) => ids.has(id) && session.answers[id] !== undefined) &&
      session.flags.every((id) => ids.has(id)) &&
      new Set(session.checked).size === session.checked.length &&
      new Set(session.flags).size === session.flags.length &&
      (session.mode === 'exam'
        ? session.examForm !== null && session.expiresAt !== null && ids.size === examSpec.questions
        : session.examForm === null && session.expiresAt === null)
    )
  }, 'Saved session does not match its question set')

export type StudySession = z.infer<typeof studySessionSchema>

export function createStudySession({
  questions,
  mode,
  examForm = null,
  now = Date.now(),
  random = Math.random,
}: {
  questions: Question[]
  mode: StudySession['mode']
  examForm?: ExamForm | null
  now?: number
  random?: () => number
}): StudySession {
  const session = studySessionSchema.parse({
    version: 2,
    id: crypto.randomUUID(),
    mode,
    examForm,
    questionIds: questions.map((question) => question.id),
    questionRevisions: Object.fromEntries(
      questions.map((question) => [question.id, question.revision])
    ),
    optionOrders: createOptionOrders(questions, random),
    answers: {},
    checked: [],
    flags: [],
    current: 0,
    startedAt: now,
    expiresAt: mode === 'exam' ? now + examSpec.durationMinutes * 60_000 : null,
    finishedAt: null,
  })
  if (!sessionMatchesQuestions(session, questions)) throw new Error('Invalid question pool')
  return session
}

export function sessionMatchesQuestions(session: StudySession, questions: Question[]) {
  return (
    questions.length === session.questionIds.length &&
    questions.every(
      (question, index) =>
        question.id === session.questionIds[index] &&
        question.revision === session.questionRevisions[question.id] &&
        question.pool === (session.mode === 'exam' ? session.examForm : 'practice') &&
        (session.mode !== 'exam' || question.review?.status === 'source-checked')
    )
  )
}

export function amendStudySession(
  session: StudySession,
  amend: (session: StudySession) => StudySession,
  now = Date.now()
) {
  if (session.finishedAt !== null) return session
  if (session.expiresAt !== null && now >= session.expiresAt)
    return { ...session, finishedAt: session.expiresAt }
  return amend(session)
}

export function gradeByDomain(questions: Question[], answers: Record<string, number>) {
  const domainScores: Partial<Record<DomainId, { correct: number; total: number }>> = {}
  for (const q of questions) {
    const d = domainScores[q.domain] ?? { correct: 0, total: 0 }
    d.total++
    if (answers[q.id] === q.answer) d.correct++
    domainScores[q.domain] = d
  }
  return domainScores
}
