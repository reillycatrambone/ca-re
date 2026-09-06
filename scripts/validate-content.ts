import { getLessons, getQuestions } from '../lib/content'
import { validateContent } from '../lib/content-validation'
import { domains } from '../lib/curriculum'
import coverage from '../contents/coverage.json'
import { learningFigures } from '../lib/learning-figures'
import { validateLearningFigures } from '../lib/learning-figures/validation'
import { getStudyGuides, getCoverageAudits } from '../lib/study-guides/content'
import { validateStudyGuides } from '../lib/study-guides/validation'

const lessons = getLessons()
const questions = getQuestions()
const errors = validateContent(lessons, questions)
errors.push(...validateLearningFigures(lessons, learningFigures))
const guides = getStudyGuides()
const audits = getCoverageAudits()
errors.push(...validateStudyGuides(lessons, guides, audits))
for (const domain of domains) {
  const group = coverage.find((entry) => entry.domain === domain.id)
  if (!group?.items.length) errors.push(`Missing coverage map: ${domain.id}`)
  for (const item of group?.items ?? []) {
    if (!item.lessonSlugs.length) errors.push(`Unmapped topic: ${item.topic}`)
    for (const slug of item.lessonSlugs)
      if (!lessons.some((lesson) => lesson.slug === slug))
        errors.push(`Unknown coverage chapter: ${slug}`)
  }
}
if (coverage.reduce((sum, group) => sum + group.items.length, 0) !== 65)
  errors.push('Expected 65 published DRE outline subtopics')
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.table(
  domains.map((domain) => ({
    domain: domain.id,
    chapters: lessons.filter((l) => l.domain === domain.id).length,
    questions: questions.filter((q) => q.domain === domain.id).length,
  }))
)
console.log(
  `${lessons.length} chapters, ${lessons.reduce((sum, lesson) => sum + lesson.body.split(/\s+/).length, 0).toLocaleString()} chapter words, ${questions.length} original questions, ${learningFigures.length} in-text figures, ${guides.length} chapter guides, ${audits.reduce((sum, audit) => sum + audit.findings.length, 0)} audit findings. Content validation passed.`
)
