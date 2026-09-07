import test from 'node:test'
import assert from 'node:assert/strict'
import { getLessons, getQuestions } from '../lib/content'
import {
  auditEditorialEvidence,
  evidenceDigest,
  type RuleEvidence,
  type ReviewRecord,
} from '../lib/editorial-evidence'
import { learningFigures } from '../lib/learning-figures'
import { getVisualInventory } from '../lib/learning-figures/inventory'
import { getCoverageAudits, getStudyGuides } from '../lib/study-guides/content'
import { validateTextbookReleaseArtifacts } from '../lib/textbook-release'

function fixture() {
  const figure = learningFigures.find((entry) => entry.id.startsWith('exp-'))!
  const lesson = getLessons().find((entry) => entry.slug === figure.lessonSlug)!
  const question = {
    ...getQuestions().find((entry) => entry.lessonSlug === lesson.slug)!,
    review: {
      status: 'source-checked' as const,
      reviewed: '2026-09-06',
      method: 'ai-primary-source' as const,
    },
  }
  const rule: RuleEvidence = {
    id: 'fixture-rule',
    lessonSlug: lesson.slug,
    sectionId: figure.afterSection,
    coverageTopics: ['Fixture topic'],
    rule: 'A fictional test record checks evidence connections, not substantive law.',
    conditions: ['The test uses one existing chapter and artifact.'],
    exceptions: [],
    sources: [
      {
        url: lesson.sources[0].url,
        locator: 'Test locator',
        supports: 'This source entry exists only to exercise structural validation.',
      },
    ],
    examples: [
      {
        sectionId: figure.afterSection,
        summary: 'This test example points to an existing visual in its own chapter.',
        figureIds: [figure.id],
      },
    ],
    questionIds: [question.id],
  }
  const review: ReviewRecord = {
    id: 'fixture-review',
    reviewed: '2026-09-06',
    reviewer: 'Test reviewer',
    method: 'independent-ai-primary-source',
    outcome: 'pass',
    scope: 'Synthetic test evidence. This is not an actual editorial review.',
    sourceUrls: [lesson.sources[0].url],
    artifacts: [
      { kind: 'rule', id: rule.id, digest: evidenceDigest(rule) },
      { kind: 'question', id: question.id, digest: evidenceDigest(question) },
      { kind: 'visual', id: figure.id, digest: evidenceDigest(figure) },
    ],
    findings: [],
    limitations: 'Synthetic test fixture only; never included in the production editorial records.',
  }
  return {
    lessons: [lesson],
    questions: [question],
    figures: [figure],
    coverage: [
      { domain: lesson.domain, items: [{ topic: 'Fixture topic', lessonSlugs: [lesson.slug] }] },
    ],
    rules: [rule],
    reviews: [review],
  }
}

test('a chapter mapping alone cannot satisfy substantive evidence gates', () => {
  const report = auditEditorialEvidence({ ...fixture(), rules: [], reviews: [] })
  assert.equal(report.missingTopics.length, 1)
  assert.equal(report.unlinkedQuestions.length, 1)
  assert.equal(report.questionsAwaitingIndependentReview.length, 1)
  assert.ok(report.releaseBlockers.length > 0)
})

test('complete linked evidence passes mechanical checks, but edited artifacts invalidate the review', () => {
  const data = fixture()
  assert.deepEqual(auditEditorialEvidence(data).releaseBlockers, [])
  data.rules[0].rule += ' A changed condition requires a new review.'
  const report = auditEditorialEvidence(data)
  assert.ok(report.errors.some((entry) => entry.includes('stale review for fixture-rule')))
  assert.deepEqual(report.incompleteRules, ['fixture-rule'])
})

test('holdout questions, foreign chapter visuals, and unresolved findings cannot certify teaching', () => {
  const data = fixture()
  data.questions[0].pool = 'exam-a'
  data.rules[0].examples[0].figureIds = ['nonexistent-figure']
  data.reviews[0].findings = [
    { severity: 'material', summary: 'A material condition remains incorrect in this fixture.' },
  ]
  const report = auditEditorialEvidence(data)
  assert.ok(report.errors.some((entry) => entry.includes('invalid teaching question')))
  assert.ok(report.errors.some((entry) => entry.includes('invalid example visual')))
  assert.ok(report.errors.some((entry) => entry.includes('pass has unresolved findings')))
  assert.equal(report.questionsAwaitingIndependentReview.length, 1)
})

test('artifact fingerprints ignore object key order but preserve ordered instructional content', () => {
  assert.equal(evidenceDigest({ b: 2, a: [1, 2] }), evidenceDigest({ a: [1, 2], b: 2 }))
  assert.notEqual(evidenceDigest([1, 2]), evidenceDigest([2, 1]))
})

test('a matching changes-required review blocks a pass regardless of record order', () => {
  const data = fixture()
  const rejected: ReviewRecord = {
    ...data.reviews[0],
    id: 'fixture-changes-required',
    reviewed: '2026-09-07',
    outcome: 'changes-required',
    findings: [
      { severity: 'material', summary: 'A material condition remains incorrect in this fixture.' },
    ],
  }
  for (const reviews of [
    [...data.reviews, rejected],
    [rejected, ...data.reviews],
  ]) {
    const report = auditEditorialEvidence({ ...data, reviews })
    assert.ok(report.errors.some((entry) => entry.includes('changes required for')))
    assert.deepEqual(report.incompleteRules, ['fixture-rule'])
    assert.deepEqual(report.questionsAwaitingIndependentReview, [data.questions[0].id])
    assert.deepEqual(report.visualsAwaitingIndependentReview, [data.figures[0].id])
  }
})

test('duplicate artifact identities cannot reuse one independent review', () => {
  const data = fixture()
  const report = auditEditorialEvidence({
    ...data,
    questions: [...data.questions, data.questions[0]],
    figures: [...data.figures, data.figures[0]],
  })
  assert.ok(report.errors.includes('Duplicate question evidence ID'))
  assert.ok(report.errors.includes('Duplicate visual evidence ID'))
})

function releaseFixture() {
  const lessons = getLessons()
  return {
    lessons,
    questions: getQuestions(),
    figures: learningFigures,
    inventory: getVisualInventory(lessons),
    guides: getStudyGuides(),
    audits: getCoverageAudits(),
  }
}

test('release composition rejects duplicate questions and figures with missing teaching anchors', () => {
  const data = releaseFixture()
  assert.deepEqual(validateTextbookReleaseArtifacts(data), [])
  const errors = validateTextbookReleaseArtifacts({
    ...data,
    questions: [...data.questions, data.questions[0]],
    figures: data.figures.map((figure, index) =>
      index === 0 ? { ...figure, afterSection: 'nonexistent-section' } : figure
    ),
  })
  assert.ok(errors.some((entry) => entry.includes(`Duplicate question: ${data.questions[0].id}`)))
  assert.ok(errors.some((entry) => entry.includes('nonexistent-section')))
})

test('release requires retained baseline, 300 additions, and an addition in every chapter', () => {
  const data = releaseFixture()
  const expansion = data.inventory.find((visual) => visual.edition === 'expansion')!
  const disguised = data.inventory.map((visual) =>
    visual.id === expansion.id ? { ...visual, edition: 'baseline' } : visual
  )
  assert.ok(
    validateTextbookReleaseArtifacts({ ...data, inventory: disguised }).includes(
      '1 additional expansion visuals required'
    )
  )
  const baseline = data.inventory.find((visual) => visual.edition === 'baseline')!
  const replaced = data.inventory.map((visual) =>
    visual.id === baseline.id ? { ...visual, edition: 'expansion' } : visual
  )
  assert.ok(
    validateTextbookReleaseArtifacts({ ...data, inventory: replaced }).includes(
      '1 baseline visuals missing'
    )
  )
  const chapter = data.lessons[0].slug
  const moved = data.inventory.map((visual) =>
    visual.edition === 'expansion' && visual.lessonSlug === chapter
      ? { ...visual, lessonSlug: data.lessons[1].slug }
      : visual
  )
  assert.ok(
    validateTextbookReleaseArtifacts({ ...data, inventory: moved }).includes(
      `${chapter}: no expansion visuals`
    )
  )
})
