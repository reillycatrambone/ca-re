import { z } from 'zod'
import { domains, type Lesson, type Question } from './curriculum'
import { examAllocation } from './exam'

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
  body: z.string().min(3000),
})
const questionSchema = z.object({
  id: z.string().min(3),
  domain: domainSchema,
  lessonSlug: z.string(),
  prompt: z.string().min(20),
  options: z
    .array(z.object({ text: z.string().min(1), explanation: z.string().min(15) }))
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
    if (lesson.body.split(/\s+/).length < 1700) errors.push(`Chapter too short: ${lesson.slug}`)
    if (!lesson.slug.startsWith(`${lesson.domain}-`))
      errors.push(`Domain/slug mismatch: ${lesson.slug}`)
    if (questions.filter((q) => q.lessonSlug === lesson.slug).length < 9)
      errors.push(`Fewer than nine questions: ${lesson.slug}`)
  }
  const questionIds = new Set<string>()
  const prompts = new Set<string>()
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
