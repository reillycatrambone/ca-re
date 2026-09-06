import { domains, examSpec, type DomainId, type Question } from './curriculum'

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

export function buildExam(bank: Question[], random: () => number = Math.random) {
  const questions = examAllocation().flatMap(({ id, count }) => {
    const pool = bank.filter((question) => question.domain === id)
    if (pool.length < count)
      throw new Error(`Insufficient questions for ${id}: ${pool.length}/${count}`)
    return shuffle(pool, random).slice(0, count)
  })
  return shuffle(questions, random)
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

export interface StudySession {
  id: string
  mode: 'practice' | 'exam'
  questionIds: string[]
  answers: Record<string, number>
  checked: string[]
  flags: string[]
  current: number
  startedAt: number
  expiresAt: number | null
  finishedAt: number | null
}

export interface Attempt {
  id: string
  mode: 'practice' | 'exam'
  date: number
  score: number
  total: number
  domains: Partial<Record<DomainId, { correct: number; total: number }>>
}

export function summarizeSession(session: StudySession, questions: Question[]): Attempt {
  const domainScores: Attempt['domains'] = {}
  for (const q of questions) {
    const d = domainScores[q.domain] ?? { correct: 0, total: 0 }
    d.total++
    if (session.answers[q.id] === q.answer) d.correct++
    domainScores[q.domain] = d
  }
  return {
    id: session.id,
    mode: session.mode,
    date: session.finishedAt ?? Date.now(),
    score: gradeQuestions(questions, session.answers).score,
    total: questions.length,
    domains: domainScores,
  }
}
