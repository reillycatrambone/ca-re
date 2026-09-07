import { getAllQuestions, getLessons } from '../lib/content'
import { domains } from '../lib/curriculum'
import { getExamForms } from '../lib/exam'
import { getVisualInventory, visualExpansionTarget } from '../lib/learning-figures/inventory'
import { learningFigures } from '../lib/learning-figures'
import { auditEditorialEvidence, readEditorialEvidence } from '../lib/editorial-evidence'
import coverage from '../contents/coverage.json'
import { auditOptionLengths } from '../lib/question-style-audit'
import { getCoverageAudits, getStudyGuides } from '../lib/study-guides/content'
import { validateTextbookReleaseArtifacts } from '../lib/textbook-release'

const lessons = getLessons()
const questions = getAllQuestions()
const practice = questions.filter((question) => question.pool === 'practice')
const inventory = getVisualInventory(lessons)
const forms = getExamForms(questions)
const reviewed = practice.filter((question) => question.review?.status === 'source-checked')
const optionLengths = auditOptionLengths(practice)
const cuePercent = optionLengths.expectedPercent
const errors = validateTextbookReleaseArtifacts({
  lessons,
  questions,
  figures: learningFigures,
  inventory,
  guides: getStudyGuides(),
  audits: getCoverageAudits(),
})
const evidence = auditEditorialEvidence({
  lessons,
  questions,
  figures: learningFigures,
  coverage,
  ...readEditorialEvidence(),
})
errors.push(...evidence.releaseBlockers)
if (reviewed.length !== practice.length)
  errors.push(
    `${practice.length - reviewed.length} practice questions lack item-level source review`
  )
for (const form of forms)
  if (!form.available) errors.push(`${form.label} is not a complete reviewed 150-question form`)
if (cuePercent > 35)
  errors.push(
    `Longest-option shortcut remains ${cuePercent.toFixed(1)}%; review distractor construction (release ceiling 35%)`
  )
for (const question of questions) {
  if (
    question.review?.status === 'source-checked' &&
    (!question.sources.length || !question.conceptIds.length || !question.review.reviewed)
  )
    errors.push(`${question.id}: incomplete source-check evidence`)
}

const report = {
  scope:
    'Editorial inventory and mechanical checks; not proof of legal accuracy or exam readiness.',
  visuals: {
    current: inventory.length,
    baseline: inventory.filter((visual) => visual.edition === 'baseline').length,
    target: visualExpansionTarget.minimum,
    added: inventory.filter((visual) => visual.edition === 'expansion').length,
  },
  practice: {
    total: practice.length,
    sourceChecked: reviewed.length,
    uniqueLongestOptionCorrect: optionLengths.uniqueLongestCorrect,
    uniqueLongestOptionItems: optionLengths.uniqueLongestItems,
    longestOptionExpectedPercent: Number(cuePercent.toFixed(2)),
    longestOptionMethod:
      'Choose a longest option; break equal-length ties uniformly after display shuffling. Editorial signal, not empirical item validation.',
  },
  heldOutForms: forms.map((form) => ({
    ...form,
    questions: questions.filter((question) => question.pool === form.id).length,
  })),
  domains: domains.map((domain) => ({
    domain: domain.id,
    visuals: inventory.filter((visual) => visual.lessonSlug.startsWith(`${domain.id}-`)).length,
  })),
  humanSubjectMatterReview: 'Not obtained',
  evidence: {
    ruleRecords: evidence.rules.length,
    reviewRecords: evidence.reviews.length,
    completeOutlineTopics: 65 - evidence.missingTopics.length,
    questionsAwaitingIndependentReview: evidence.questionsAwaitingIndependentReview.length,
    visualsAwaitingIndependentReview: evidence.visualsAwaitingIndependentReview.length,
  },
  releaseBlockers: errors,
}

console.log(
  JSON.stringify(
    process.argv.includes('--inventory')
      ? { ...report, inventory, evidenceDetails: evidence }
      : report,
    null,
    2
  )
)
if (process.argv.includes('--release') && errors.length) process.exitCode = 1
