import test from 'node:test'
import assert from 'node:assert/strict'
import { auditOptionLengths } from '../lib/question-style-audit'

const options = (texts: string[]) =>
  texts.map((text) => ({ text, explanation: 'Test explanation.' }))

test('length audit gives equal-length choices chance expectation, regardless of answer position', () => {
  for (const answer of [0, 1, 2, 3]) {
    const report = auditOptionLengths([{ options: options(['100', '200', '300', '400']), answer }])
    assert.equal(report.expectedPercent, 25)
    assert.equal(report.uniqueLongestItems, 0)
    assert.equal(report.uniqueLongestCorrect, 0)
  }
})

test('length audit separates genuine unique-longest clues from ties', () => {
  const report = auditOptionLengths([
    { options: options(['short', 'a much longer correct answer', 'short', 'short']), answer: 1 },
    { options: options(['longer', 'longer', 'small', 'tiny']), answer: 0 },
    { options: options(['wrong long answer', 'short', 'short', 'short']), answer: 2 },
  ])
  assert.equal(report.uniqueLongestItems, 2)
  assert.equal(report.uniqueLongestCorrect, 1)
  assert.equal(report.expectedCorrect, 1.5)
  assert.equal(report.expectedPercent, 50)
  assert.equal(auditOptionLengths([]).expectedPercent, 0)
})
