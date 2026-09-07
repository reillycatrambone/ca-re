import assert from 'node:assert/strict'
import test from 'node:test'
import { getQuestions } from '../lib/content'

const questions = getQuestions()
function answer(id: string) {
  const question = questions.find((item) => item.id === id)
  assert.ok(question, `Missing question ${id}`)
  return { question, correct: question.options[question.answer] }
}

test('security-deposit supplements separate payees, delivery routes, and follow-up clocks', () => {
  assert.match(
    answer('practice-119').correct.text,
    /Electronic refund; statement by personal delivery/
  )
  assert.equal(answer('practice-120').correct.text, 'Lee and Sam together.')
  assert.equal(answer('practice-121').correct.text, 'October 8.')
  const deadline = new Date(Date.UTC(2026, 8, 24) + 14 * 86400000)
  assert.equal(deadline.toISOString().slice(0, 10), '2026-10-08')
})

test('raw-tract and cost-index supplements keep the correct allowances and index base', () => {
  assert.equal(8 * 150000 - 280000 - 60000 - 180000 - 40000, 640000)
  assert.equal(900000 - 210000 - 45000 - 135000 - 30000, 480000)
  assert.equal(answer('valuation-57').correct.text, '$480,000.')
  assert.equal(400000 * (200 / 160), 500000)
  assert.equal(240000 * (150 / 125), 288000)
  assert.match(answer('valuation-58').correct.text, /288,000.*1\.20/)
})

test('supplemental financing examples use the combined balance and full housing outlay', () => {
  assert.equal((450000 + 90000) / 600000, 0.9)
  assert.equal(answer('financing-058').correct.text, '90%.')
  assert.ok(
    answer('financing-058').question.sources?.some((source) =>
      source.url.includes('combined-loan-value-cltv-ratios')
    )
  )
  assert.equal(2100 + 400 + 100 + 120 + 180, 2900)
  assert.match(answer('financing-059').correct.text, /2,900/)
  assert.equal(240000 - 6000, 234000)
  assert.match(answer('financing-060').correct.text, /234,000/)
})

test('equity loss and construction interest use the stated equity and funded bases', () => {
  assert.equal((350000 - 280000 - (315000 - 280000)) / (350000 - 280000), 0.5)
  assert.match(answer('financing-061').correct.text, /50%/)
  assert.equal(((75000 + 125000) * 0.09) / 12, 1500)
  assert.match(answer('financing-063').correct.text, /1,500/)
})

test('exchange and TOD examples count from the statutory triggering event', () => {
  const day = 86400000
  const exchange = Date.UTC(2026, 10, 1)
  assert.equal(new Date(exchange + 45 * day).toISOString().slice(0, 10), '2026-12-16')
  assert.equal(new Date(exchange + 180 * day).toISOString().slice(0, 10), '2027-04-30')
  assert.match(answer('transfer-055').correct.text, /December 16.*April 15/)
  const acknowledgment = Date.UTC(2026, 5, 5)
  assert.equal(new Date(acknowledgment + 60 * day).toISOString().slice(0, 10), '2026-08-04')
  assert.match(answer('transfer-058').correct.text, /August 4/)
})

test('property tax and public-use questions retain the reviewed qualifications', () => {
  const tax = answer('transfer-056')
  assert.match(tax.correct.text, /at the December 10 cutoff/)
  assert.match(tax.correct.explanation, /5 p\.m\. or the close of business, whichever is later/)
  assert.match(answer('transfer-066').question.prompt, /improvements, cleaning, or maintenance/)
})

test('USDA application-channel question cites the two specific programs', () => {
  const { question, correct } = answer('financing-072')
  assert.equal(question.sources?.length, 2)
  assert.ok(question.sources?.some((source) => source.url.includes('sfhd-09252024.pdf')))
  assert.ok(
    question.sources?.some((source) =>
      source.url.endsWith('single-family-housing-guaranteed-loan-program')
    )
  )
  assert.match(correct.text, /Direct: Rural Development; guaranteed: participating lender/)
})
