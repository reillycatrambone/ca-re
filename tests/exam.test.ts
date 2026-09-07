import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildExam,
  buildPractice,
  getExamForms,
  getPracticeConcepts,
  createStudySession,
  createOptionOrders,
  studySessionSchema,
  sessionMatchesQuestions,
  amendStudySession,
  examAllocation,
  gradeQuestions,
  shuffle,
  gradeByDomain,
  type ExamForm,
} from '../lib/exam'
import { domains, type Question } from '../lib/curriculum'
import { monthlyPayment } from '../lib/calculations'
import { createSearch } from '../lib/search'
import { getHeadings } from '../lib/headings'

const bank: Question[] = domains.flatMap((domain) =>
  Array.from({ length: 80 }, (_, i) => ({
    id: `${domain.id}-${i}`,
    revision: 1,
    pool: 'practice',
    domain: domain.id,
    lessonSlug: `${domain.id}-intro`,
    conceptIds: [],
    sources: [],
    prompt: `${domain.id} question ${i}`,
    options: ['A', 'B', 'C', 'D'].map((text) => ({ text, explanation: 'Explanation' })),
    answer: i % 4,
  }))
)
function formBank(form: ExamForm): Question[] {
  return examAllocation().flatMap(({ id, count }) =>
    bank
      .filter((question) => question.domain === id)
      .slice(0, count)
      .map((question) => ({
        ...question,
        id: `${form}-${question.id}`,
        pool: form,
        review: { status: 'source-checked', method: 'ai-primary-source' },
      }))
  )
}
const formA = formBank('exam-a')
const formB = formBank('exam-b')
const allPools = [...bank, ...formA, ...formB]

test('held-out exam uses exactly its 150 unique questions and largest-remainder allocation', () => {
  const exam = buildExam(allPools, 'exam-a')
  assert.equal(exam.length, 150)
  assert.equal(new Set(exam.map((q) => q.id)).size, 150)
  for (const domain of domains) {
    const count = exam.filter((q) => q.domain === domain.id).length
    assert.equal(count, examAllocation().find((a) => a.id === domain.id)!.count)
    assert.ok(Math.abs(count - domain.weight * 1.5) <= 0.5)
  }
  assert.ok(exam.every((question) => question.pool === 'exam-a'))
  assert.deepEqual(
    new Set(exam.map((question) => question.id)),
    new Set(formA.map((question) => question.id))
  )
})
test('unavailable forms are never filled from practice or another form', () => {
  assert.throws(() => buildExam(bank, 'exam-a'), /not ready/)
  assert.throws(() => buildExam([...bank, ...formA.slice(1), ...formB], 'exam-a'), /not ready/)
  assert.throws(() => buildExam([...formA, formA[0]], 'exam-a'), /not ready/)
  assert.throws(
    () => buildExam([...formA, { ...formB[0], id: formA[0].id }], 'exam-a'),
    /not ready/
  )
  assert.throws(
    () =>
      buildExam(
        formA.map((q, i) => (i ? q : { ...q, domain: 'agency' })),
        'exam-a'
      ),
    /not ready/
  )
  assert.throws(
    () =>
      buildExam(
        formA.map((q, i) =>
          i ? q : { ...q, review: { status: 'pending', method: 'ai-primary-source' } }
        ),
        'exam-a'
      ),
    /not ready/
  )
  assert.deepEqual(
    getExamForms(bank).map((form) => form.available),
    [false, false]
  )
  assert.deepEqual(
    getExamForms(allPools).map((form) => form.available),
    [true, true]
  )
})
test('topic practice excludes every held-out item and respects its domain', () => {
  assert.ok(buildPractice(allPools, 'all', 1000).every((question) => question.pool === 'practice'))
  const selected = buildPractice(allPools, 'financing', 20)
  assert.equal(selected.length, 20)
  assert.ok(
    selected.every((question) => question.domain === 'financing' && question.pool === 'practice')
  )
  assert.throws(() => buildPractice(bank, 'all', -1), /Invalid/)
})
test('concept practice exposes only registered concepts with practice questions', () => {
  const questions: Question[] = [
    { ...bank[0], conceptIds: ['fiduciary-duties'] },
    { ...bank[1], conceptIds: ['not-registered'] },
    { ...formA[0], conceptIds: ['bulk-sales'] },
  ]
  assert.deepEqual(
    getPracticeConcepts(questions, 'all').map((concept) => concept.id),
    ['fiduciary-duties']
  )
  assert.deepEqual(getPracticeConcepts(questions, 'financing'), [])
  assert.deepEqual(
    buildPractice(questions, 'all', 10, { conceptId: 'fiduciary-duties' }).map(
      (question) => question.id
    ),
    [bank[0].id]
  )
  assert.deepEqual(buildPractice(questions, 'all', 10, { conceptId: 'bulk-sales' }), [])
})
test('option shuffling preserves authored answers and grading through save and resume', () => {
  const questions = bank.slice(0, 10)
  const snapshot = structuredClone(questions)
  const session = createStudySession({ questions, mode: 'practice', random: () => 0 })
  assert.deepEqual(session.optionOrders[questions[0].id], [1, 2, 3, 0])
  for (const question of questions) {
    const displayIndex = session.optionOrders[question.id].indexOf(question.answer)
    session.answers[question.id] = session.optionOrders[question.id][displayIndex]
  }
  const restored = studySessionSchema.parse(JSON.parse(JSON.stringify(session)))
  assert.deepEqual(restored, session)
  assert.equal(sessionMatchesQuestions(restored, questions), true)
  assert.equal(gradeQuestions(questions, restored.answers).score, 10)
  assert.deepEqual(questions, snapshot)
  for (const order of Object.values(createOptionOrders(questions)))
    assert.deepEqual([...order].sort(), [0, 1, 2, 3])
})
test('revisions, deleted questions, changed pools and withdrawn reviews invalidate saved sessions', () => {
  const questions = bank.slice(0, 10)
  const session = createStudySession({ questions, mode: 'practice' })
  assert.equal(
    sessionMatchesQuestions(
      session,
      questions.map((q, i) => (i ? q : { ...q, revision: 2 }))
    ),
    false
  )
  assert.equal(sessionMatchesQuestions(session, questions.slice(1)), false)
  assert.equal(
    sessionMatchesQuestions(
      session,
      questions.map((q, i) => (i ? q : { ...q, pool: 'exam-a' }))
    ),
    false
  )
  assert.equal(sessionMatchesQuestions(session, [...questions].reverse()), false)
  const exam = createStudySession({ questions: formA, mode: 'exam', examForm: 'exam-a' })
  assert.equal(
    sessionMatchesQuestions(
      exam,
      formA.map((q, i) =>
        i ? q : { ...q, review: { status: 'pending', method: 'ai-primary-source' } }
      )
    ),
    false
  )
})
test('legacy and malformed stored answer orders cannot silently resume', () => {
  const session = createStudySession({ questions: bank.slice(0, 10), mode: 'practice' })
  const first = session.questionIds[0]
  for (const changed of [
    { ...session, version: undefined },
    { ...session, questionRevisions: {} },
    { ...session, optionOrders: {} },
    { ...session, optionOrders: { ...session.optionOrders, [first]: [0, 0, 2, 3] } },
    { ...session, optionOrders: { ...session.optionOrders, [first]: [0, 1, 2, 4] } },
    { ...session, answers: { absent: 0 } },
    { ...session, checked: [first] },
    { ...session, current: 10 },
    { ...session, examForm: 'exam-a' },
  ])
    assert.equal(studySessionSchema.safeParse(changed).success, false)
})
test('expired and finished sessions reject changes without altering saved option order', () => {
  const session = createStudySession({
    questions: formA,
    mode: 'exam',
    examForm: 'exam-a',
    now: 1_000,
  })
  const question = formA[0]
  const answer = (current: typeof session) => ({
    ...current,
    answers: { [question.id]: question.answer },
  })
  assert.equal(amendStudySession(session, answer, 2_000).answers[question.id], question.answer)
  const expired = amendStudySession(session, answer, session.expiresAt!)
  assert.deepEqual(expired.answers, {})
  assert.equal(expired.finishedAt, session.expiresAt)
  assert.deepEqual(expired.optionOrders, session.optionOrders)
  assert.equal(amendStudySession(expired, answer, 3_000), expired)
})
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
test('domain scores attribute unanswered questions to the correct domains', () => {
  const questions = [bank[0], bank[80]]
  const result = gradeByDomain(questions, { [questions[0].id]: questions[0].answer })
  assert.deepEqual(result.ownership, { correct: 1, total: 1 })
  assert.deepEqual(result.agency, { correct: 0, total: 1 })
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
