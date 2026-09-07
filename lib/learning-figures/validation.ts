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
    if (
      !headings.some(
        (heading) => [2, 3].includes(heading.depth) && heading.id === figure.afterSection
      )
    )
      errors.push(`Missing figure section: ${figure.id} -> ${figure.afterSection}`)
    if (
      headings.some((heading) => heading.id === figure.id) ||
      ['sources', 'knowledge-check'].includes(figure.id)
    )
      errors.push(`Figure ID conflicts with an existing anchor: ${figure.id}`)
    if (!figure.title.trim() || !figure.caption.trim())
      errors.push(`Unlabeled figure: ${figure.id}`)
    if (figure.objective !== undefined && !figure.objective.trim())
      errors.push(`Missing learning objective: ${figure.id}`)
    for (const url of figure.sourceUrls ?? []) {
      if (!url.startsWith('https://')) errors.push(`Insecure figure source: ${figure.id}`)
      if (!lesson.sources.some((source) => source.url === url))
        errors.push(`Figure source missing from chapter: ${figure.id} -> ${url}`)
    }
    if (figure.id.startsWith('exp-') || ['document', 'timeline', 'ledger'].includes(figure.kind)) {
      if (!figure.objective?.trim() || !figure.sourceUrls?.length)
        errors.push(`Unverified teaching artifact: ${figure.id}`)
    }
    if (figure.kind === 'chart') {
      const formats = ['number', 'percent', 'currency']
      const points = figure.series.flatMap((series) => series.points)
      if (
        !figure.xAxis.label.trim() ||
        !figure.yAxis.label.trim() ||
        !formats.includes(figure.xAxis.format) ||
        !formats.includes(figure.yAxis.format) ||
        !figure.conclusion.trim() ||
        figure.series.length < 1 ||
        figure.series.length > 4 ||
        new Set(figure.series.map((series) => series.label)).size !== figure.series.length ||
        figure.series.some(
          (series) =>
            !series.label.trim() ||
            series.points.length < 2 ||
            series.points.length > 8 ||
            series.points.some(
              (point, index) =>
                !Number.isFinite(point.x) ||
                !Number.isFinite(point.y) ||
                (index > 0 && point.x <= series.points[index - 1].x)
            )
        ) ||
        new Set(points.map((point) => point.x)).size < 2
      )
        errors.push(`Invalid teaching chart: ${figure.id}`)
    }
    if (figure.kind === 'parcel') {
      const { width, height } = figure.extent
      const inside = (x: number, y: number) =>
        Number.isFinite(x) && Number.isFinite(y) && x >= 0 && y >= 0 && x <= width && y <= height
      if (
        ![width, height].every((value) => Number.isFinite(value) && value > 0) ||
        width / height > 3 ||
        height / width > 3 ||
        !figure.areas.length ||
        !figure.conclusion.trim() ||
        new Set(figure.areas.map((area) => area.key)).size !== figure.areas.length
      )
        errors.push(`Invalid parcel extent or area keys: ${figure.id}`)
      for (const area of figure.areas)
        if (
          !/^[A-Z]{1,3}$/.test(area.key) ||
          !area.label.trim() ||
          !area.description.trim() ||
          area.width <= 0 ||
          area.height <= 0 ||
          !inside(area.x, area.y) ||
          !inside(area.x + area.width, area.y + area.height) ||
          (area.labelAt && !inside(area.labelAt.x, area.labelAt.y))
        )
          errors.push(`Invalid parcel area: ${figure.id} -> ${area.key}`)
      for (const line of figure.lines ?? [])
        if (
          !line.label.trim() ||
          !inside(line.from.x, line.from.y) ||
          !inside(line.to.x, line.to.y) ||
          (line.labelAt && !inside(line.labelAt.x, line.labelAt.y)) ||
          (line.from.x === line.to.x && line.from.y === line.to.y)
        )
          errors.push(`Invalid parcel line: ${figure.id} -> ${line.label}`)
      const markerCenters = [
        ...figure.areas.map(
          (area) => area.labelAt ?? { x: area.x + area.width / 2, y: area.y + area.height / 2 }
        ),
        ...(figure.lines ?? []).map(
          (line) =>
            line.labelAt ?? { x: (line.from.x + line.to.x) / 2, y: (line.from.y + line.to.y) / 2 }
        ),
      ]
      const markerGap = (Math.max(width, height) / 25) * 1.5
      markerCenters.forEach((center, index) => {
        if (
          markerCenters
            .slice(index + 1)
            .some((other) => Math.hypot(center.x - other.x, center.y - other.y) < markerGap)
        )
          errors.push(`Overlapping parcel markers: ${figure.id}`)
      })
    }
    if (figure.kind === 'document') {
      if (
        !figure.documentTitle.trim() ||
        !figure.context.trim() ||
        !figure.conclusion.trim() ||
        figure.fields.length < 3 ||
        figure.fields.length > 8 ||
        new Set(figure.fields.map((field) => field.label)).size !== figure.fields.length ||
        figure.fields.some(
          (field) => !field.label.trim() || !field.value.trim() || !field.annotation.trim()
        )
      )
        errors.push(`Invalid document specimen: ${figure.id}`)
    }
    if (figure.kind === 'timeline') {
      if (
        !figure.premise.trim() ||
        !figure.conclusion.trim() ||
        figure.events.length < 2 ||
        figure.events.some(
          (event) => !event.label.trim() || !event.when.trim() || !event.detail.trim()
        )
      )
        errors.push(`Invalid teaching timeline: ${figure.id}`)
    }
    if (figure.kind === 'ledger') {
      let balance = figure.openingBalance
      if (!Number.isFinite(balance) || !figure.entries.length)
        errors.push(`Invalid ledger opening balance: ${figure.id}`)
      for (const entry of figure.entries) {
        balance += entry.received - entry.paid
        if (
          !entry.label.trim() ||
          ![entry.received, entry.paid, entry.balance].every(Number.isFinite) ||
          entry.received < 0 ||
          entry.paid < 0 ||
          Math.abs(balance - entry.balance) > 0.001
        )
          errors.push(`Ledger does not reconcile: ${figure.id} -> ${entry.label}`)
      }
    }
    if (figure.kind === 'relationship') {
      if (
        figure.nodes.length < 3 ||
        figure.nodes.length > 4 ||
        !figure.center.label.trim() ||
        figure.center.label.length > 26 ||
        !figure.center.detail.trim() ||
        new Set(figure.nodes.map((node) => node.label)).size !== figure.nodes.length ||
        figure.nodes.some(
          (node) =>
            !node.label.trim() ||
            node.label.length > 24 ||
            !node.detail.trim() ||
            !node.connection.trim() ||
            node.connection.length > 20
        )
      )
        errors.push(`Invalid relationship map: ${figure.id}`)
    }
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
