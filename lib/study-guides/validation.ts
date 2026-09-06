import { z } from 'zod'
import {
  parse,
  type ConstantNode,
  type FunctionNode,
  type OperatorNode,
  type SymbolNode,
} from 'mathjs'
import type { Lesson } from '../curriculum'
import { domains } from '../curriculum'
import { getHeadings } from '../headings'
import type { CoverageAudit, StudyGuide } from './types'

const paragraph = z
  .string()
  .min(5)
  .refine(
    (value) => value.trim().split(/\s+/).length <= 100,
    'Split this passage into smaller units'
  )
const label = z.string().min(2).max(130)
const base = { title: label, setup: paragraph, takeaway: paragraph }
const labSchema = z.discriminatedUnion('kind', [
  z.object({
    ...base,
    kind: z.literal('contrast'),
    cases: z
      .array(
        z.object({
          label,
          changedFact: paragraph,
          result: paragraph,
          reasoning: z.array(paragraph).min(2).max(4),
        })
      )
      .min(2)
      .max(4),
  }),
  z.object({
    ...base,
    kind: z.literal('sequence'),
    steps: z
      .array(z.object({ label, action: paragraph, evidence: paragraph, warning: paragraph }))
      .min(3)
      .max(6),
  }),
  z.object({
    ...base,
    kind: z.literal('decision'),
    question: paragraph,
    choices: z
      .array(
        z.object({
          label: paragraph,
          result: paragraph,
          reasoning: paragraph,
          correct: z.boolean(),
        })
      )
      .min(3)
      .max(4),
  }),
  z.object({
    ...base,
    kind: z.literal('calculation'),
    inputs: z
      .array(z.object({ label, value: z.string().min(1) }))
      .min(2)
      .max(6),
    steps: z
      .array(
        z.object({
          label,
          expression: z.string().min(1).max(240),
          value: z.number(),
          format: z.enum(['currency', 'percent', 'number']),
          explanation: paragraph,
        })
      )
      .min(3)
      .max(6),
  }),
])
const guideSchema = z.object({
  lessonSlug: z.string(),
  overview: z.array(z.object({ label, detail: paragraph })).length(3),
  sections: z.array(
    z.object({
      id: z.string(),
      takeaway: paragraph.refine((text) => {
        const words = text.trim().split(/\s+/).length
        return words >= 15 && words <= 35
      }, 'Section takeaways must contain 15-35 words'),
    })
  ),
  lab: labSchema,
  pitfalls: z.array(z.object({ trap: paragraph, correction: paragraph, why: paragraph })).length(3),
  connections: z.array(z.object({ lessonSlug: z.string(), reason: paragraph })).length(2),
})
const auditSchema = z.object({
  domain: z.enum(domains.map((domain) => domain.id)),
  reviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  findings: z
    .array(
      z.object({
        topic: label,
        gap: paragraph,
        action: paragraph,
        lessonSlugs: z.array(z.string()).min(1),
        sourceUrls: z.array(z.url().startsWith('https://')).min(1),
      })
    )
    .min(3),
  limitations: paragraph,
})

export function evaluateLabExpression(expression: string) {
  const tree = parse(expression)
  const functions = new Set(['round', 'min', 'max'])
  tree.traverse((node, path, parent) => {
    if (node.type === 'ConstantNode' && typeof (node as ConstantNode).value === 'number') return
    if (node.type === 'ParenthesisNode') return
    if (
      node.type === 'OperatorNode' &&
      ['+', '-', '*', '/', '^'].includes((node as OperatorNode).op)
    )
      return
    if (node.type === 'FunctionNode' && functions.has((node as FunctionNode).fn.name)) return
    if (
      node.type === 'SymbolNode' &&
      parent?.type === 'FunctionNode' &&
      path === 'fn' &&
      functions.has((node as SymbolNode).name)
    )
      return
    throw new Error(`Unsupported expression node: ${node.type}`)
  })
  const value: unknown = tree.compile().evaluate()
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new Error('The expression must produce a finite number')
  return value
}

export function validateStudyGuides(
  lessons: Lesson[],
  guides: StudyGuide[],
  audits: CoverageAudit[]
) {
  const errors: string[] = []
  const ids = new Set<string>()
  for (const guide of guides) {
    const checked = guideSchema.safeParse(guide)
    if (!checked.success) {
      errors.push(`${guide.lessonSlug}: ${checked.error.message}`)
      continue
    }
    if (ids.has(guide.lessonSlug)) errors.push(`Duplicate guide: ${guide.lessonSlug}`)
    ids.add(guide.lessonSlug)
    const lesson = lessons.find((lesson) => lesson.slug === guide.lessonSlug)
    if (!lesson) {
      errors.push(`Unknown guide chapter: ${guide.lessonSlug}`)
      continue
    }
    const headings = getHeadings(lesson.body)
    const expected = headings.filter((heading) => heading.depth === 2).map((heading) => heading.id)
    if (
      expected.length !== guide.sections.length ||
      new Set(guide.sections.map((section) => section.id)).size !== guide.sections.length ||
      expected.some((id) => !guide.sections.some((section) => section.id === id))
    )
      errors.push(`Guide does not cover every H2 exactly once: ${guide.lessonSlug}`)
    if (
      guide.connections.some(
        (connection) =>
          connection.lessonSlug === guide.lessonSlug ||
          !lessons.some((lesson) => lesson.slug === connection.lessonSlug)
      ) ||
      new Set(guide.connections.map((connection) => connection.lessonSlug)).size !== 2
    )
      errors.push(`Invalid concept connections: ${guide.lessonSlug}`)
    if (
      guide.lab.kind === 'decision' &&
      guide.lab.choices.filter((choice) => choice.correct).length !== 1
    )
      errors.push(`Decision lab needs one best answer: ${guide.lessonSlug}`)
    if (guide.lab.kind === 'calculation')
      for (const step of guide.lab.steps) {
        try {
          const value = evaluateLabExpression(step.expression)
          const tolerance = step.format === 'currency' ? 0.0051 : 0.0001
          if (Math.abs(value - step.value) > tolerance)
            errors.push(
              `Calculation mismatch: ${guide.lessonSlug}, ${step.label}: ${value} != ${step.value}`
            )
        } catch (error) {
          errors.push(`Invalid calculation: ${guide.lessonSlug}, ${step.label}: ${String(error)}`)
        }
      }
    const reserved = [
      'core-distinctions',
      'case-lab',
      'case-lab-title',
      'exam-pitfalls',
      'connected-concepts',
      'learning-objectives',
      'pitfall-1',
      'pitfall-2',
      'pitfall-3',
    ]
    if (
      headings.some(
        (heading) =>
          reserved.includes(heading.id) ||
          /^(case-variation|transaction-stage|decision-reason|calculation-step|calculation-tab)-\d+$/.test(
            heading.id
          )
      )
    )
      errors.push(`Guide anchor conflicts with a chapter heading: ${guide.lessonSlug}`)
  }
  for (const lesson of lessons)
    if (!ids.has(lesson.slug)) errors.push(`Missing study guide: ${lesson.slug}`)
  for (const audit of audits) {
    const checked = auditSchema.safeParse(audit)
    if (!checked.success) {
      errors.push(`Audit ${audit.domain}: ${checked.error.message}`)
      continue
    }
    for (const finding of audit.findings)
      if (
        finding.lessonSlugs.some(
          (slug) =>
            !lessons.some((lesson) => lesson.slug === slug && lesson.domain === audit.domain)
        )
      )
        errors.push(`Invalid audit chapter reference: ${audit.domain}, ${finding.topic}`)
  }
  for (const domain of domains)
    if (audits.filter((audit) => audit.domain === domain.id).length !== 1)
      errors.push(`Expected one coverage audit: ${domain.id}`)
  return errors
}
