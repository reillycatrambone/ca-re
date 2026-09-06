import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { CoverageAudit, StudyGuide } from './types'

function readCollection<T>(directory: string): T[] {
  const path = join(process.cwd(), 'contents', directory)
  if (!existsSync(path)) return []
  return readdirSync(path)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .flatMap((file) => JSON.parse(readFileSync(join(path, file), 'utf8')) as T | T[])
}

export function getStudyGuides() {
  return readCollection<StudyGuide>('guides')
}
export function getStudyGuide(slug: string) {
  return getStudyGuides().find((guide) => guide.lessonSlug === slug)
}
export function getCoverageAudits() {
  return readCollection<CoverageAudit>('audits')
}
