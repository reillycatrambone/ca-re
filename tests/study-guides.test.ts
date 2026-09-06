import test from 'node:test'
import assert from 'node:assert/strict'
import { getLessons } from '../lib/content'
import { domains } from '../lib/curriculum'
import { getHeadings } from '../lib/headings'
import { createSearch } from '../lib/search'
import { getCoverageAudits, getStudyGuides } from '../lib/study-guides/content'
import { guideSearchEntries } from '../lib/study-guides/search'
import { evaluateLabExpression, validateStudyGuides } from '../lib/study-guides/validation'

const lessons = getLessons()
const guides = getStudyGuides()
const audits = getCoverageAudits()

function fixtures() {
  return structuredClone({ lessons, guides, audits })
}

test('all 33 guides cover their exact H2 anchors and the complete collection validates', () => {
  assert.equal(lessons.length, 33)
  assert.equal(guides.length, 33)
  assert.equal(new Set(guides.map((guide) => guide.lessonSlug)).size, 33)
  assert.deepEqual(validateStudyGuides(lessons, guides, audits), [])
  assert.equal(audits.length, domains.length)
  assert.deepEqual(
    new Set(guides.map((guide) => guide.lab.kind)),
    new Set(['contrast', 'sequence', 'decision', 'calculation'])
  )

  for (const guide of guides) {
    const lesson = lessons.find((item) => item.slug === guide.lessonSlug)
    assert.ok(lesson)
    const expected = getHeadings(lesson.body).filter((heading) => heading.depth === 2)
    assert.deepEqual(
      guide.sections.map((section) => section.id).sort(),
      expected.map((heading) => heading.id).sort(),
      guide.lessonSlug
    )
    assert.equal(guide.overview.length, 3)
    assert.equal(guide.pitfalls.length, 3)
    assert.equal(guide.connections.length, 2)
    for (const section of guide.sections) {
      const count = section.takeaway.trim().split(/\s+/).length
      assert.ok(count >= 15 && count <= 35, `${guide.lessonSlug}#${section.id}: ${count} words`)
    }
  }
})

test('restricted expressions support numeric arithmetic and the approved helper functions', () => {
  for (const [expression, expected] of [
    ['(24000 + 3000) - 5000', 22000],
    ['(25000 / 400000) * 100', 6.25],
    ['2 ^ 3 + -4', 4],
    ['round(160000 / 36, 2)', 4444.44],
    ['min(50000, max(0, 250000 - 230000))', 20000],
  ] as const)
    assert.equal(evaluateLabExpression(expression), expected, expression)
})

test('restricted expressions reject symbols, assignment, access, nonnumeric results, and unapproved calls', () => {
  for (const expression of [
    'balance + 1',
    'pi',
    'amount = 1',
    '1; 2',
    'sqrt(4)',
    'random()',
    'import("module")',
    'max([1, 2])',
    'account.balance',
    '"123"',
    '{ amount: 1 }',
    '1 < 2',
    'true ? 1 : 2',
    '2 cm',
    '1 / 0',
    '0 / 0',
    '(-1) ^ 0.5',
  ])
    assert.throws(() => evaluateLabExpression(expression), expression)
})

test('every authored calculation agrees with its executable expression', () => {
  let calculations = 0
  for (const guide of guides) {
    if (guide.lab.kind !== 'calculation') continue
    calculations++
    for (const step of guide.lab.steps) {
      const result = evaluateLabExpression(step.expression)
      const tolerance = step.format === 'currency' ? 0.0051 : 0.0001
      assert.ok(
        Math.abs(result - step.value) <= tolerance,
        `${guide.lessonSlug}: ${step.expression} = ${result}, not ${step.value}`
      )
    }
  }
  assert.ok(calculations >= 3)
})

test('guide validation rejects missing, duplicate, stale, and unknown chapter references', () => {
  const changed = fixtures()
  const missing = changed.guides.pop()!
  changed.guides.push(structuredClone(changed.guides[0]))
  changed.guides[1].sections[0].id = 'missing-heading'
  changed.guides[2].sections[1].id = changed.guides[2].sections[0].id
  changed.guides[3].lessonSlug = 'unknown-chapter'
  const errors = validateStudyGuides(changed.lessons, changed.guides, changed.audits)
  assert.ok(errors.includes(`Missing study guide: ${missing.lessonSlug}`))
  assert.ok(errors.some((error) => error.startsWith('Duplicate guide:')))
  assert.ok(
    errors.includes(`Guide does not cover every H2 exactly once: ${changed.guides[1].lessonSlug}`)
  )
  assert.ok(
    errors.includes(`Guide does not cover every H2 exactly once: ${changed.guides[2].lessonSlug}`)
  )
  assert.ok(errors.includes('Unknown guide chapter: unknown-chapter'))
})

test('guide validation rejects invalid connections and conflicting reserved anchors', () => {
  const changed = fixtures()
  changed.guides[0].connections[0].lessonSlug = changed.guides[0].lessonSlug
  changed.guides[1].connections[0].lessonSlug = 'unknown-chapter'
  changed.guides[2].connections[1].lessonSlug = changed.guides[2].connections[0].lessonSlug
  const lesson = changed.lessons.find((item) => item.slug === changed.guides[3].lessonSlug)!
  lesson.body += '\n\n## Case lab\n\nConflicting section anchor.\n'
  const errors = validateStudyGuides(changed.lessons, changed.guides, changed.audits)
  for (const guide of changed.guides.slice(0, 3))
    assert.ok(errors.includes(`Invalid concept connections: ${guide.lessonSlug}`))
  assert.ok(errors.includes(`Guide anchor conflicts with a chapter heading: ${lesson.slug}`))
})

test('guide validation enforces compact summaries, overview and pitfall counts', () => {
  const changed = fixtures()
  changed.guides[0].overview.pop()
  changed.guides[1].pitfalls.pop()
  changed.guides[2].sections[0].takeaway = 'Too short for the required summary.'
  changed.guides[3].sections[0].takeaway = Array.from({ length: 36 }, () => 'word').join(' ')
  changed.guides[4].lab.setup = Array.from({ length: 101 }, () => 'word').join(' ')
  const errors = validateStudyGuides(changed.lessons, changed.guides, changed.audits)
  for (const guide of changed.guides.slice(0, 5))
    assert.ok(errors.some((error) => error.startsWith(`${guide.lessonSlug}:`)))
  assert.ok(errors.some((error) => error.includes('Section takeaways must contain 15-35 words')))
  assert.ok(errors.some((error) => error.includes('Split this passage into smaller units')))
})

test('guide validation catches incorrect math, forbidden expressions, and ambiguous decisions', () => {
  const changed = fixtures()
  const calculations = changed.guides.filter((guide) => guide.lab.kind === 'calculation')
  assert.ok(calculations.length >= 2)
  const first = calculations[0]
  const second = calculations[1]
  assert.equal(first.lab.kind, 'calculation')
  assert.equal(second.lab.kind, 'calculation')
  if (first.lab.kind !== 'calculation' || second.lab.kind !== 'calculation')
    assert.fail('Expected calculation labs')
  first.lab.steps[0].value += 1
  second.lab.steps[0].expression = 'random()'
  const decision = changed.guides.find((guide) => guide.lab.kind === 'decision')!
  if (decision.lab.kind !== 'decision') assert.fail('Expected a decision lab')
  decision.lab.choices.forEach((choice) => {
    choice.correct = true
  })
  const errors = validateStudyGuides(changed.lessons, changed.guides, changed.audits)
  assert.ok(errors.some((error) => error.startsWith(`Calculation mismatch: ${first.lessonSlug},`)))
  assert.ok(errors.some((error) => error.startsWith(`Invalid calculation: ${second.lessonSlug},`)))
  assert.ok(errors.includes(`Decision lab needs one best answer: ${decision.lessonSlug}`))
})

test('audit validation rejects missing or duplicate domains, wrong chapter domains, and insecure sources', () => {
  const changed = fixtures()
  const missing = changed.audits.pop()!
  changed.audits.push(structuredClone(changed.audits[0]))
  changed.audits[1].findings[0].lessonSlugs = [
    changed.lessons.find((lesson) => lesson.domain !== changed.audits[1].domain)!.slug,
  ]
  changed.audits[2].findings[0].sourceUrls[0] = 'http://example.com/source'
  const errors = validateStudyGuides(changed.lessons, changed.guides, changed.audits)
  assert.ok(errors.includes(`Expected one coverage audit: ${missing.domain}`))
  assert.ok(errors.includes(`Expected one coverage audit: ${changed.audits[0].domain}`))
  assert.ok(
    errors.some((error) =>
      error.startsWith(`Invalid audit chapter reference: ${changed.audits[1].domain},`)
    )
  )
  assert.ok(errors.some((error) => error.startsWith(`Audit ${changed.audits[2].domain}:`)))
})

test('guide search entries have stable unique anchors and include every lab variant and pitfall explanation', () => {
  const allIds = new Set<string>()
  for (const guide of guides) {
    const lesson = lessons.find((item) => item.slug === guide.lessonSlug)!
    const entries = guideSearchEntries(guide, lesson)
    const lab = guide.lab
    const expectedAnchors = ['core-distinctions', 'case-lab', 'pitfall-1', 'pitfall-2', 'pitfall-3']
    const detailText: string[][] = []
    if (lab.kind === 'contrast')
      lab.cases.forEach((item, index) => {
        expectedAnchors.push(`case-variation-${index + 1}`)
        detailText.push([item.changedFact, item.result, ...item.reasoning])
      })
    if (lab.kind === 'sequence')
      lab.steps.forEach((step, index) => {
        expectedAnchors.push(`transaction-stage-${index + 1}`)
        detailText.push([step.action, step.evidence, step.warning])
      })
    if (lab.kind === 'decision')
      lab.choices.forEach((choice, index) => {
        expectedAnchors.push(`decision-reason-${index + 1}`)
        detailText.push([choice.result, choice.reasoning])
      })
    if (lab.kind === 'calculation')
      lab.steps.forEach((step, index) => {
        expectedAnchors.push(`calculation-step-${index + 1}`)
        detailText.push([
          step.expression,
          String(step.value),
          step.explanation,
          ...lab.inputs.map((input) => input.value),
        ])
      })
    assert.deepEqual(
      entries.map((entry) => entry.id),
      expectedAnchors.map((anchor) => `${lesson.slug}#${anchor}`)
    )
    entries.forEach((entry, index) => {
      assert.equal(entry.href, `/docs/${lesson.slug}/#${expectedAnchors[index]}`)
      assert.equal(entry.domain, lesson.domain)
      assert.equal(entry.lessonTitle, lesson.title)
      assert.ok(entry.title.length > 0 && entry.text.length > 0)
      assert.ok(!allIds.has(entry.id), entry.id)
      allIds.add(entry.id)
    })
    for (const point of guide.overview) {
      assert.ok(entries[0].text.includes(point.label))
      assert.ok(entries[0].text.includes(point.detail))
    }
    assert.ok(entries[1].text.includes(lab.setup))
    assert.ok(entries[1].text.includes(lab.takeaway))
    guide.pitfalls.forEach((pitfall, index) => {
      assert.equal(entries[index + 2].title, pitfall.trap)
      assert.ok(entries[index + 2].text.includes(pitfall.correction))
      assert.ok(entries[index + 2].text.includes(pitfall.why))
    })
    detailText.forEach((parts, index) => {
      for (const part of parts) assert.ok(entries[index + 5].text.includes(part))
    })
  }
})

test('a phrase present only in a lab explanation can be found at the lab detail anchor', () => {
  const guide = structuredClone(guides.find((item) => item.lab.kind === 'sequence')!)
  if (guide.lab.kind !== 'sequence') assert.fail('Expected a sequence lab')
  guide.lab.steps[0].evidence = 'Distinctive escrow verification evidence.'
  const lesson = lessons.find((item) => item.slug === guide.lessonSlug)!
  const index = createSearch(guideSearchEntries(guide, lesson))
  const result = index.search('Distinctive escrow verification evidence')[0]
  assert.ok(result)
  assert.equal(result.id, `${lesson.slug}#transaction-stage-1`)
  assert.equal(result.href, `/docs/${lesson.slug}/#transaction-stage-1`)
})
