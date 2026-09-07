import type { Question } from './curriculum'

export function auditOptionLengths(questions: Pick<Question, 'options' | 'answer'>[]) {
  let uniqueLongestCorrect = 0
  let uniqueLongestItems = 0
  let expectedCorrect = 0
  for (const question of questions) {
    const lengths = question.options.map((option) => option.text.trim().length)
    const maximum = Math.max(...lengths)
    const longest = lengths
      .map((length, index) => (length === maximum ? index : -1))
      .filter((index) => index >= 0)
    const includesCorrect = longest.includes(question.answer)
    if (longest.length === 1) {
      uniqueLongestItems++
      if (includesCorrect) uniqueLongestCorrect++
    }
    // Display choices are shuffled. Ties must not favor the stored answer position.
    if (includesCorrect) expectedCorrect += 1 / longest.length
  }
  return {
    uniqueLongestCorrect,
    uniqueLongestItems,
    expectedCorrect,
    expectedPercent: questions.length ? (expectedCorrect / questions.length) * 100 : 0,
  }
}
