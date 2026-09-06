import type { LessonMeta } from './curriculum'
export interface StudyTerm {
  id: string
  term: string
  definition: string
  domain: string
  lessonSlug: string
  lessonTitle: string
}
export function collectTerms(lessons: LessonMeta[]): StudyTerm[] {
  const terms = new Map<string, StudyTerm>()
  for (const lesson of lessons)
    for (const entry of lesson.glossary) {
      const id = entry.term.trim().toLowerCase()
      if (!terms.has(id))
        terms.set(id, {
          ...entry,
          id,
          domain: lesson.domain,
          lessonSlug: lesson.slug,
          lessonTitle: lesson.title,
        })
    }
  return [...terms.values()].sort((a, b) => a.term.localeCompare(b.term))
}
