import { z } from 'zod'
import { domains, type Lesson, type Question } from './curriculum'
import { examAllocation } from './exam'
import { getHeadings } from './headings'
import { questionConcepts, questionMisconceptions } from './question-concepts'

const domainSchema = z.enum(domains.map((domain) => domain.id))
const lessonSchema = z.object({
  slug: z.string().regex(/^[a-z]+-[a-z0-9-]+$/),
  title: z.string().min(5),
  description: z.string().min(20),
  domain: domainSchema,
  order: z.number().int().positive(),
  objectives: z.array(z.string().min(10)).min(3),
  reviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sources: z
    .array(z.object({ label: z.string().min(3), url: z.url().startsWith('https://') }))
    .min(2),
  glossary: z.array(z.object({ term: z.string().min(2), definition: z.string().min(10) })).min(5),
  body: z.string().min(1),
})
const questionSchema = z.object({
  id: z.string().min(3),
  revision: z.number().int().positive(),
  pool: z.enum(['practice', 'exam-a', 'exam-b']),
  domain: domainSchema,
  lessonSlug: z.string(),
  sectionId: z.string().optional(),
  conceptIds: z.array(z.string().regex(/^[a-z][a-z0-9-]+$/)),
  sources: z.array(z.object({ label: z.string().min(3), url: z.url().startsWith('https://') })),
  review: z
    .object({
      status: z.enum(['pending', 'source-checked']),
      reviewed: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .optional(),
      method: z.literal('ai-primary-source'),
    })
    .optional(),
  prompt: z.string().min(20),
  options: z
    .array(
      z.object({
        text: z.string().min(1),
        explanation: z.string().min(15),
        misconceptionId: z.string().optional(),
      })
    )
    .length(4),
  answer: z.number().int().min(0).max(3),
})
const minimumLessons = {
  ownership: 6,
  agency: 4,
  valuation: 4,
  financing: 4,
  transfer: 4,
  practice: 7,
  contracts: 4,
}

export function validateContent(lessons: Lesson[], questions: Question[]) {
  const errors: string[] = []
  const lessonIds = new Set<string>()
  for (const lesson of lessons) {
    const parsed = lessonSchema.safeParse(lesson)
    if (!parsed.success) errors.push(`${lesson.slug}: ${parsed.error.message}`)
    if (lessonIds.has(lesson.slug)) errors.push(`Duplicate lesson: ${lesson.slug}`)
    lessonIds.add(lesson.slug)
    if (!lesson.slug.startsWith(`${lesson.domain}-`))
      errors.push(`Domain/slug mismatch: ${lesson.slug}`)
    if (questions.filter((q) => q.lessonSlug === lesson.slug).length < 9)
      errors.push(`Fewer than nine questions: ${lesson.slug}`)
  }
  const questionIds = new Set<string>()
  const prompts = new Set<string>()
  const concepts = new Set<string>(questionConcepts.map((concept) => concept.id))
  const misconceptions = new Set<string>(
    questionMisconceptions.map((misconception) => misconception.id)
  )
  const lessonHeadings = new Map(
    lessons.map((lesson) => [
      lesson.slug,
      new Set(getHeadings(lesson.body).map((heading) => heading.id)),
    ])
  )
  for (const question of questions) {
    const parsed = questionSchema.safeParse(question)
    if (!parsed.success) errors.push(`${question.id}: ${parsed.error.message}`)
    if (questionIds.has(question.id)) errors.push(`Duplicate question: ${question.id}`)
    questionIds.add(question.id)
    const prompt = question.prompt.toLowerCase().trim()
    if (prompts.has(prompt)) errors.push(`Duplicate prompt: ${question.id}`)
    prompts.add(prompt)
    const lesson = lessons.find((l) => l.slug === question.lessonSlug)
    if (!lesson || lesson.domain !== question.domain)
      errors.push(`Invalid question lesson: ${question.id}`)
    if (
      question.review?.status === 'source-checked' &&
      (!question.review.reviewed || !question.sources.length || !question.conceptIds.length)
    )
      errors.push(`Source-checked question lacks review evidence: ${question.id}`)
    for (const concept of question.conceptIds)
      if (!concepts.has(concept))
        errors.push(`Unknown question concept: ${question.id} / ${concept}`)
    if (question.sectionId && !lessonHeadings.get(question.lessonSlug)?.has(question.sectionId))
      errors.push(`Invalid question section: ${question.id} / ${question.sectionId}`)
    if (question.review?.status === 'source-checked') {
      if (!question.sectionId)
        errors.push(`Reviewed question lacks a teaching anchor: ${question.id}`)
      for (const source of question.sources)
        if (!lesson?.sources.some((entry) => entry.url === source.url))
          errors.push(`Question source missing from chapter: ${question.id} / ${source.url}`)
      question.options.forEach((option, index) => {
        if (index !== question.answer && !misconceptions.has(option.misconceptionId ?? ''))
          errors.push(
            `Reviewed distractor lacks a registered misconception: ${question.id} / ${index}`
          )
        if (index === question.answer && option.misconceptionId)
          errors.push(`Correct option has a misconception: ${question.id}`)
      })
    }
    if (new Set(question.options.map((o) => o.text.trim().toLowerCase())).size !== 4)
      errors.push(`Duplicate options: ${question.id}`)
  }
  for (const domain of domains) {
    const group = lessons.filter((l) => l.domain === domain.id)
    if (group.length < minimumLessons[domain.id]) errors.push(`Incomplete domain: ${domain.id}`)
    if (new Set(group.map((l) => l.order)).size !== group.length)
      errors.push(`Repeated chapter order: ${domain.id}`)
  }
  for (const allocation of examAllocation())
    if (questions.filter((q) => q.domain === allocation.id).length < allocation.count)
      errors.push(`Insufficient exam pool: ${allocation.id}`)
  return errors
}
