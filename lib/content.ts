import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { domains, type Lesson, type LessonMeta, type Question } from './curriculum'

const root = path.join(process.cwd(), 'contents')

export function getLessons(): Lesson[] {
  return domains.flatMap((domain) => {
    const directory = path.join(root, 'textbook', domain.id)
    if (!fs.existsSync(directory)) return []
    return fs
      .readdirSync(directory)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const { data, content } = matter(fs.readFileSync(path.join(directory, file), 'utf8'))
        return {
          ...(data as LessonMeta),
          body: content,
          readingMinutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
        }
      })
      .sort((a, b) => a.order - b.order)
  })
}

export function getLesson(slug: string) {
  return getLessons().find((lesson) => lesson.slug === slug)
}

export function getQuestions(): Question[] {
  return domains.flatMap((domain) => {
    const file = path.join(root, 'questions', `${domain.id}.json`)
    return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, 'utf8')) as Question[]) : []
  })
}

export function getLessonSummaries() {
  return getLessons().map(({ body: _body, ...lesson }) => lesson)
}
