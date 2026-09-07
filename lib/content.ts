import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {
  domains,
  type Lesson,
  type LessonMeta,
  type Question,
  type QuestionPool,
} from './curriculum'

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
  return getAllQuestions().filter((question) => question.pool === 'practice')
}

export function getAllQuestions(contentRoot = root): Question[] {
  const files: { file: string; pool: QuestionPool }[] = [
    ...domains.map((domain) => ({
      file: path.join(contentRoot, 'questions', `${domain.id}.json`),
      pool: 'practice' as const,
    })),
    ...(['exam-a', 'exam-b'] as const).map((form) => ({
      file: path.join(contentRoot, 'exams', `${form}.json`),
      pool: form,
    })),
  ]
  return files.flatMap(({ file, pool }) => {
    if (!fs.existsSync(file)) return []
    const questions = JSON.parse(fs.readFileSync(file, 'utf8')) as Question[]
    return questions.map((question) => {
      if (question.pool !== undefined && question.pool !== pool)
        throw new Error(`Question pool does not match its bank: ${question.id} in ${file}`)
      return {
        ...question,
        revision: question.revision ?? 1,
        pool,
        conceptIds: question.conceptIds ?? [],
        sources: question.sources ?? [],
        review: question.review ?? { status: 'pending', method: 'ai-primary-source' },
      }
    })
  })
}

export function getLessonSummaries() {
  return getLessons().map(({ body: _body, ...lesson }) => lesson)
}
