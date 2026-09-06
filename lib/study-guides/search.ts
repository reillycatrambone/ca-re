import type { LessonMeta } from '../curriculum'
import type { SearchEntry } from '../search'
import type { StudyGuide } from './types'

export function guideSearchEntries(guide: StudyGuide, lesson: LessonMeta): SearchEntry[] {
  const entry = (anchor: string, title: string, text: string): SearchEntry => ({
    id: `${lesson.slug}#${anchor}`,
    title,
    text,
    domain: lesson.domain,
    lessonTitle: lesson.title,
    href: `/docs/${lesson.slug}/#${anchor}`,
  })
  const lab = guide.lab
  const entries = [
    entry(
      'core-distinctions',
      `${lesson.title}: core distinctions`,
      guide.overview.map((point) => `${point.label} ${point.detail}`).join(' ')
    ),
    entry('case-lab', lab.title, `${lab.setup} ${lab.takeaway}`),
    ...guide.pitfalls.map((pitfall, index) =>
      entry(`pitfall-${index + 1}`, pitfall.trap, `${pitfall.correction} ${pitfall.why}`)
    ),
  ]
  if (lab.kind === 'contrast')
    entries.push(
      ...lab.cases.map((item, index) =>
        entry(
          `case-variation-${index + 1}`,
          `${lab.title}: ${item.label}`,
          [item.changedFact, item.result, ...item.reasoning].join(' ')
        )
      )
    )
  if (lab.kind === 'sequence')
    entries.push(
      ...lab.steps.map((step, index) =>
        entry(
          `transaction-stage-${index + 1}`,
          `${lab.title}: ${step.label}`,
          `${step.action} ${step.evidence} ${step.warning}`
        )
      )
    )
  if (lab.kind === 'decision')
    entries.push(
      ...lab.choices.map((choice, index) =>
        entry(
          `decision-reason-${index + 1}`,
          `${lab.title}: ${choice.label}`,
          `${choice.result} ${choice.reasoning}`
        )
      )
    )
  if (lab.kind === 'calculation')
    entries.push(
      ...lab.steps.map((step, index) =>
        entry(
          `calculation-step-${index + 1}`,
          `${lab.title}: ${step.label}`,
          `${lab.inputs.map((input) => `${input.label} ${input.value}`).join(' ')} ${step.expression} ${step.value} ${step.explanation}`
        )
      )
    )
  return entries
}
