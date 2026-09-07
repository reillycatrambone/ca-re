import type { Lesson, Question } from './curriculum'
import { validateContent } from './content-validation'
import { getVisualInventory, visualExpansionTarget } from './learning-figures/inventory'
import type { LearningFigureSpec } from './learning-figures/types'
import { validateLearningFigures } from './learning-figures/validation'
import type { CoverageAudit, StudyGuide } from './study-guides/types'
import { validateStudyGuides } from './study-guides/validation'

export function validateTextbookReleaseArtifacts({
  lessons,
  questions,
  figures,
  inventory,
  guides,
  audits,
}: {
  lessons: Lesson[]
  questions: Question[]
  figures: LearningFigureSpec[]
  inventory: ReturnType<typeof getVisualInventory>
  guides: StudyGuide[]
  audits: CoverageAudit[]
}) {
  const errors = [
    ...validateContent(lessons, questions),
    ...validateLearningFigures(lessons, figures),
    ...validateStudyGuides(lessons, guides, audits),
  ]
  const baseline = inventory.filter((visual) => visual.edition === 'baseline')
  const expansion = inventory.filter((visual) => visual.edition === 'expansion')
  if (new Set(inventory.map((visual) => visual.id)).size !== inventory.length)
    errors.push('Duplicate visual inventory ID')
  if (new Set(expansion.map((visual) => visual.objective)).size !== expansion.length)
    errors.push('Repeated expansion learning objective')
  if (baseline.length < visualExpansionTarget.baseline)
    errors.push(`${visualExpansionTarget.baseline - baseline.length} baseline visuals missing`)
  const requiredAdditions = visualExpansionTarget.minimum - visualExpansionTarget.baseline
  if (expansion.length < requiredAdditions)
    errors.push(`${requiredAdditions - expansion.length} additional expansion visuals required`)
  if (inventory.length < visualExpansionTarget.minimum)
    errors.push(
      `${visualExpansionTarget.minimum - inventory.length} additional distinct visuals required`
    )
  for (const lesson of lessons)
    if (!expansion.some((visual) => visual.lessonSlug === lesson.slug))
      errors.push(`${lesson.slug}: no expansion visuals`)
  return errors
}
