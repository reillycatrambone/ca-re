import type { Lesson } from '../curriculum'
import { getHeadings } from '../headings'
import type { LearningFigureSpec } from './types'

export function validateLearningFigures(lessons: Lesson[], figures: LearningFigureSpec[]) {
  const errors: string[] = []
  const ids = new Set<string>()
  for (const figure of figures) {
    if (!/^[a-z][a-z0-9-]+$/.test(figure.id) || ids.has(figure.id))
      errors.push(`Invalid or duplicate figure ID: ${figure.id}`)
    ids.add(figure.id)
    const lesson = lessons.find((lesson) => lesson.slug === figure.lessonSlug)
    if (!lesson) {
      errors.push(`Unknown figure chapter: ${figure.id}`)
      continue
    }
    const headings = getHeadings(lesson.body)
    if (!headings.some((heading) => heading.depth === 2 && heading.id === figure.afterSection))
      errors.push(`Missing figure section: ${figure.id} -> ${figure.afterSection}`)
    if (
      headings.some((heading) => heading.id === figure.id) ||
      ['sources', 'knowledge-check'].includes(figure.id)
    )
      errors.push(`Figure ID conflicts with an existing anchor: ${figure.id}`)
    if (!figure.title.trim() || !figure.caption.trim())
      errors.push(`Unlabeled figure: ${figure.id}`)
    if (figure.kind === 'calculation') {
      const sum = figure.rows.reduce((total, row) => total + row.amount, 0)
      if (!Number.isFinite(sum) || Math.abs(sum - figure.result.amount) > 0.001)
        errors.push(`Figure calculation does not reconcile: ${figure.id}`)
    }
    if (figure.kind === 'allocation') {
      const sum = figure.segments.reduce((total, segment) => total + segment.amount, 0)
      if (
        !Number.isFinite(sum) ||
        figure.total <= 0 ||
        figure.segments.some((segment) => segment.amount <= 0) ||
        Math.abs(sum - figure.total) > 0.001
      )
        errors.push(`Figure allocation does not reconcile: ${figure.id}`)
    }
  }
  for (const lesson of lessons)
    if (!figures.some((figure) => figure.lessonSlug === lesson.slug))
      errors.push(`Chapter has no in-text teaching figure: ${lesson.slug}`)
  return errors
}
