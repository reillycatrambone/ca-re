import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'
import type { Lesson, Question } from './curriculum'
import { getHeadings } from './headings'
import type { LearningFigureSpec } from './learning-figures/types'

const id = z.string().regex(/^[a-z][a-z0-9-]+$/)
const source = z.object({
  url: z.url().startsWith('https://'),
  locator: z.string().min(3),
  supports: z.string().min(20),
})
export const ruleEvidenceSchema = z.object({
  id,
  lessonSlug: id,
  sectionId: id,
  coverageTopics: z.array(z.string().min(3)).min(1),
  rule: z.string().min(25),
  conditions: z.array(z.string().min(10)).min(1),
  exceptions: z.array(z.string().min(10)),
  sources: z.array(source).min(1),
  examples: z
    .array(
      z.object({
        sectionId: id,
        summary: z.string().min(25),
        figureIds: z.array(id),
      })
    )
    .min(1),
  questionIds: z.array(id),
})
export const reviewRecordSchema = z.object({
  id,
  reviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reviewer: z.string().min(3),
  method: z.literal('independent-ai-primary-source'),
  outcome: z.enum(['pass', 'changes-required']),
  scope: z.string().min(30),
  sourceUrls: z.array(z.url().startsWith('https://')).min(1),
  artifacts: z
    .array(
      z.object({
        kind: z.enum(['rule', 'question', 'visual']),
        id,
        digest: z.string().regex(/^[a-f0-9]{64}$/),
      })
    )
    .min(1),
  findings: z.array(
    z.object({
      severity: z.enum(['material', 'clarification']),
      summary: z.string().min(20),
      resolution: z.string().min(20).optional(),
    })
  ),
  limitations: z.string().min(30),
})
export type RuleEvidence = z.infer<typeof ruleEvidenceSchema>
export type ReviewRecord = z.infer<typeof reviewRecordSchema>
type Coverage = { domain: string; items: { topic: string; lessonSlugs: string[] }[] }[]

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical)
  if (value !== null && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, entry]) => [key, canonical(entry)])
    )
  return value
}

export function evidenceDigest(value: unknown) {
  return createHash('sha256')
    .update(JSON.stringify(canonical(value)))
    .digest('hex')
}

export function readEditorialEvidence(root = process.cwd()) {
  const read = (folder: string): unknown[] => {
    const directory = path.join(root, 'editorial', folder)
    if (!fs.existsSync(directory)) return []
    return fs
      .readdirSync(directory)
      .filter((file) => file.endsWith('.json'))
      .sort()
      .flatMap((file) => JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8')))
  }
  return { rules: read('rules'), reviews: read('reviews') }
}

export function auditEditorialEvidence({
  lessons,
  questions,
  figures,
  coverage,
  rules: rawRules,
  reviews: rawReviews,
}: {
  lessons: Lesson[]
  questions: Question[]
  figures: LearningFigureSpec[]
  coverage: Coverage
  rules: unknown[]
  reviews: unknown[]
}) {
  const errors: string[] = []
  const rules: RuleEvidence[] = []
  const reviews: ReviewRecord[] = []
  for (const raw of rawRules) {
    const result = ruleEvidenceSchema.safeParse(raw)
    if (result.success) rules.push(result.data)
    else errors.push(`Invalid rule evidence: ${result.error.message}`)
  }
  for (const raw of rawReviews) {
    const result = reviewRecordSchema.safeParse(raw)
    if (result.success) reviews.push(result.data)
    else errors.push(`Invalid review record: ${result.error.message}`)
  }
  const ruleById = new Map(rules.map((rule) => [rule.id, rule]))
  const questionById = new Map(questions.map((question) => [question.id, question]))
  const figureById = new Map(figures.map((figure) => [figure.id, figure]))
  const headings = new Map(
    lessons.map((lesson) => [
      lesson.slug,
      new Set(getHeadings(lesson.body).map((heading) => heading.id)),
    ])
  )
  const topics = coverage.flatMap((group) => group.items)
  if (ruleById.size !== rules.length) errors.push('Duplicate rule evidence ID')
  if (questionById.size !== questions.length) errors.push('Duplicate question evidence ID')
  if (figureById.size !== figures.length) errors.push('Duplicate visual evidence ID')
  if (new Set(reviews.map((review) => review.id)).size !== reviews.length)
    errors.push('Duplicate independent review ID')
  for (const rule of rules) {
    const lesson = lessons.find((entry) => entry.slug === rule.lessonSlug)
    if (!lesson) errors.push(`${rule.id}: unknown teaching chapter`)
    if (!headings.get(rule.lessonSlug)?.has(rule.sectionId))
      errors.push(`${rule.id}: invalid rule anchor`)
    for (const topic of rule.coverageTopics)
      if (
        !topics.some(
          (entry) => entry.topic === topic && entry.lessonSlugs.includes(rule.lessonSlug)
        )
      )
        errors.push(`${rule.id}: topic does not map to this chapter: ${topic}`)
    for (const entry of rule.sources)
      if (!lesson?.sources.some((item) => item.url === entry.url))
        errors.push(`${rule.id}: source missing from chapter: ${entry.url}`)
    for (const example of rule.examples) {
      if (!headings.get(rule.lessonSlug)?.has(example.sectionId))
        errors.push(`${rule.id}: invalid example anchor`)
      for (const figureId of example.figureIds)
        if (figureById.get(figureId)?.lessonSlug !== rule.lessonSlug)
          errors.push(`${rule.id}: invalid example visual: ${figureId}`)
    }
    for (const questionId of rule.questionIds) {
      const question = questionById.get(questionId)
      if (question?.lessonSlug !== rule.lessonSlug || question.pool !== 'practice')
        errors.push(`${rule.id}: invalid teaching question: ${questionId}`)
    }
  }

  // A prior pass cannot certify an edited artifact. Review records preserve the exact reviewed content.
  const checked = new Set<string>()
  const rejected = new Set<string>()
  for (const review of reviews) {
    const unresolved = review.findings.some((finding) => !finding.resolution)
    if (review.outcome === 'pass' && unresolved)
      errors.push(`${review.id}: pass has unresolved findings`)
    for (const artifact of review.artifacts) {
      const value =
        artifact.kind === 'rule'
          ? ruleById.get(artifact.id)
          : artifact.kind === 'question'
            ? questionById.get(artifact.id)
            : figureById.get(artifact.id)
      if (!value) errors.push(`${review.id}: unknown ${artifact.kind}: ${artifact.id}`)
      else if (evidenceDigest(value) !== artifact.digest)
        errors.push(`${review.id}: stale review for ${artifact.id}`)
      else if (review.outcome === 'changes-required' || unresolved) {
        rejected.add(`${artifact.kind}:${artifact.id}`)
        if (review.outcome === 'changes-required')
          errors.push(`${review.id}: changes required for ${artifact.kind}: ${artifact.id}`)
      } else checked.add(`${artifact.kind}:${artifact.id}`)
    }
  }
  for (const key of rejected) checked.delete(key)
  const unlinkedQuestions = questions
    .filter(
      (question) =>
        question.pool === 'practice' &&
        !rules.some((rule) => rule.questionIds.includes(question.id))
    )
    .map((question) => question.id)
  const incompleteRules = rules
    .filter(
      (rule) =>
        !rule.questionIds.length ||
        rule.questionIds.some(
          (questionId) => questionById.get(questionId)?.review?.status !== 'source-checked'
        ) ||
        !checked.has(`rule:${rule.id}`)
    )
    .map((rule) => rule.id)
  const incomplete = new Set(incompleteRules)
  const missingTopics = topics
    .filter(
      (topic) =>
        !rules.some((rule) => rule.coverageTopics.includes(topic.topic) && !incomplete.has(rule.id))
    )
    .map((topic) => topic.topic)
  const missingChapters = lessons
    .filter(
      (lesson) => !rules.some((rule) => rule.lessonSlug === lesson.slug && !incomplete.has(rule.id))
    )
    .map((lesson) => lesson.slug)
  const questionsAwaitingIndependentReview = questions
    .filter((question) => !checked.has(`question:${question.id}`))
    .map((question) => question.id)
  const visualsAwaitingIndependentReview = figures
    .filter((figure) => figure.id.startsWith('exp-') && !checked.has(`visual:${figure.id}`))
    .map((figure) => figure.id)
  const releaseBlockers = [...errors]
  if (incompleteRules.length)
    releaseBlockers.push(
      `${incompleteRules.length} rule records need reviewed questions and a separate current reviewer pass`
    )
  if (missingTopics.length)
    releaseBlockers.push(`${missingTopics.length} DRE outline topics lack complete rule evidence`)
  if (missingChapters.length)
    releaseBlockers.push(`${missingChapters.length} chapters lack complete rule evidence`)
  if (unlinkedQuestions.length)
    releaseBlockers.push(
      `${unlinkedQuestions.length} practice questions are not linked to rule evidence`
    )
  if (questionsAwaitingIndependentReview.length)
    releaseBlockers.push(
      `${questionsAwaitingIndependentReview.length} questions await independent AI review`
    )
  if (visualsAwaitingIndependentReview.length)
    releaseBlockers.push(
      `${visualsAwaitingIndependentReview.length} expansion visuals await independent AI review`
    )
  return {
    errors,
    releaseBlockers,
    rules,
    reviews,
    incompleteRules,
    missingTopics,
    missingChapters,
    unlinkedQuestions,
    questionsAwaitingIndependentReview,
    visualsAwaitingIndependentReview,
  }
}
