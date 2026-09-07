import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { getAllQuestions, getLessons, getQuestions } from '../lib/content'
import { validateContent } from '../lib/content-validation'
import { buildPractice, examAllocation, getExamForms } from '../lib/exam'

test('published examination banks contain two distinct complete forms outside practice and search', () => {
  const all = getAllQuestions()
  assert.deepEqual(
    getExamForms(all).map((form) => form.available),
    [true, true]
  )
  const practice = getQuestions()
  const practiceIds = new Set(practice.map((question) => question.id))
  const search = fs.readFileSync(path.join(process.cwd(), 'public/search-index.json'), 'utf8')
  const stems = new Set<string>()
  for (const question of all) {
    const stem = question.prompt.toLowerCase().replace(/\s+/g, ' ').trim()
    assert.ok(!stems.has(stem), `Repeated question stem: ${question.id}`)
    stems.add(stem)
    if (question.pool === 'practice') continue
    assert.ok(!practiceIds.has(question.id))
    assert.ok(!search.includes(question.id), `Held-out ID in search: ${question.id}`)
    assert.ok(
      !search.includes(JSON.stringify(question.prompt)),
      `Held-out stem in search: ${question.id}`
    )
  }
  for (const form of ['exam-a', 'exam-b']) {
    const bank = all.filter((question) => question.pool === form)
    assert.equal(bank.length, 150)
    for (const { id, count } of examAllocation()) {
      assert.equal(bank.filter((question) => question.domain === id).length, count)
    }
  }
  const fullPractice = buildPractice(all, 'all', all.length)
  assert.equal(fullPractice.length, practice.length)
  assert.ok(fullPractice.every((question) => question.pool === 'practice'))
})

test('draft exam files cannot be normalized into ordinary practice', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ca-re-bank-test-'))
  try {
    fs.mkdirSync(path.join(directory, 'exams'))
    const file = path.join(directory, 'exams', 'exam-a.json')
    const question = {
      ...getQuestions()[0],
      id: 'fixture-held-out',
      pool: undefined,
      review: undefined,
    }
    fs.writeFileSync(file, JSON.stringify([question]))
    const loaded = getAllQuestions(directory)
    assert.equal(loaded[0].pool, 'exam-a')
    assert.equal(loaded[0].review?.status, 'pending')
    fs.writeFileSync(file, JSON.stringify([{ ...question, pool: 'practice' }]))
    assert.throws(() => getAllQuestions(directory), /pool does not match its bank/)
  } finally {
    fs.rmSync(directory, { recursive: true, force: true })
  }
})

test('source-reviewed items require actual anchors, registered concepts, sources, and misconception tags', () => {
  const questions = structuredClone(getQuestions())
  const question = questions.find((entry) => entry.review?.status === 'source-checked')!
  assert.ok(question)
  question.sectionId = 'not-a-heading'
  question.conceptIds = ['unregistered-concept']
  question.sources = [{ label: 'Unregistered source', url: 'https://example.com/not-reviewed' }]
  question.options.find((_, index) => index !== question.answer)!.misconceptionId = undefined
  const errors = validateContent(getLessons(), questions)
  assert.ok(errors.some((error) => error.includes(`Invalid question section: ${question.id}`)))
  assert.ok(errors.some((error) => error.includes(`Unknown question concept: ${question.id}`)))
  assert.ok(
    errors.some((error) => error.includes(`Question source missing from chapter: ${question.id}`))
  )
  assert.ok(
    errors.some((error) =>
      error.includes(`Reviewed distractor lacks a registered misconception: ${question.id}`)
    )
  )
})
