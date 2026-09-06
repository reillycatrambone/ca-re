import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildExam,
  examAllocation,
  gradeQuestions,
  shuffle,
  summarizeSession,
  type StudySession,
} from '../lib/exam'
import { domains, type Question } from '../lib/curriculum'
import { monthlyPayment } from '../lib/calculations'
import { createSearch } from '../lib/search'
import { getHeadings } from '../lib/headings'

const bank: Question[] = domains.flatMap((domain) =>
  Array.from({ length: 80 }, (_, i) => ({
    id: `${domain.id}-${i}`,
    domain: domain.id,
    lessonSlug: `${domain.id}-intro`,
    prompt: `${domain.id} question ${i}`,
    options: ['A', 'B', 'C', 'D'].map((text) => ({ text, explanation: 'Explanation' })),
    answer: i % 4,
  }))
)
test('exam uses exactly 150 unique questions and the largest-remainder allocation', () => {
  const exam = buildExam(bank)
  assert.equal(exam.length, 150)
  assert.equal(new Set(exam.map((q) => q.id)).size, 150)
  for (const domain of domains) {
    const count = exam.filter((q) => q.domain === domain.id).length
    assert.equal(count, examAllocation().find((a) => a.id === domain.id)!.count)
    assert.ok(Math.abs(count - domain.weight * 1.5) <= 0.5)
  }
})
test('undersized pools fail without duplicate-question padding', () =>
  assert.throws(() => buildExam(bank.filter((q) => q.domain !== 'agency')), /Insufficient/))
test('shuffle preserves the input and its members', () => {
  const input = [1, 2, 3, 4]
  assert.deepEqual([...shuffle(input)].sort(), input)
  assert.deepEqual(input, [1, 2, 3, 4])
})
test('unanswered questions count against the score; passing uses the unrounded fraction', () => {
  const questions = bank.slice(0, 150)
  const answers = Object.fromEntries(questions.slice(0, 104).map((q) => [q.id, q.answer]))
  assert.equal(gradeQuestions(questions, answers).passed, false)
  answers[questions[104].id] = questions[104].answer
  assert.deepEqual(gradeQuestions(questions, answers), {
    score: 105,
    total: 150,
    percent: 70,
    passed: true,
  })
})
test('session summary attributes unanswered questions to the correct domains', () => {
  const questions = [bank[0], bank[80]]
  const session: StudySession = {
    id: 'test',
    mode: 'exam',
    questionIds: questions.map((q) => q.id),
    answers: { [questions[0].id]: questions[0].answer },
    checked: [],
    flags: [],
    current: 0,
    startedAt: 1,
    expiresAt: 100,
    finishedAt: 100,
  }
  const result = summarizeSession(session, questions)
  assert.deepEqual(result.domains.ownership, { correct: 1, total: 1 })
  assert.deepEqual(result.domains.agency, { correct: 0, total: 1 })
  assert.equal(result.date, 100)
})
test('amortization supports zero interest and rejects invalid figures', () => {
  assert.ok(Math.abs(monthlyPayment(400000, 6, 30)! - 2398.2021) < 0.001)
  assert.equal(monthlyPayment(12000, 0, 1), 1000)
  assert.equal(monthlyPayment(-10, 6, 30), null)
  assert.equal(monthlyPayment(100, 6, 0), null)
  assert.equal(monthlyPayment(NaN, 6, 30), null)
})
test('section search handles punctuation and ranks matching content across the whole index', () => {
  const records = Array.from({ length: 150 }, (_, i) => ({
    id: `${i}`,
    title: `Chapter ${i}`,
    text: 'California property law',
    domain: 'ownership',
    href: `/docs/${i}/`,
    lessonTitle: 'Property',
  }))
  records[140].title = 'Easement appurtenant'
  records[140].text = 'Dominant and servient tenements and an easement appurtenant.'
  const search = createSearch(records)
  assert.equal(search.search('easement appurtenant')[0].id, '140')
  assert.doesNotThrow(() => search.search('[(*'))
})
test('table of contents IDs handle duplicate headings and ignore code fences', () => {
  const headings = getHeadings(
    '## Title\n\n## Title\n\n```md\n## Not a heading\n```\n\n## A **bold** heading'
  )
  assert.deepEqual(
    headings.map((h) => h.id),
    ['title', 'title-1', 'a-bold-heading']
  )
})
