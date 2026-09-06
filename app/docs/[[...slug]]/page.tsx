import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import { getLesson, getLessons, getQuestions } from '@/lib/content'
import { domains } from '@/lib/curriculum'
import { getHeadings } from '@/lib/headings'
import { LessonToc } from '@/components/book/toc'
import { ConceptDiagram } from '@/components/book/concept-diagram'
import { LessonActions } from '@/components/study/lesson-actions'
import { ChapterQuiz } from '@/components/study/chapter-quiz'

interface Props {
  params: Promise<{ slug?: string[] }>
}
export const dynamicParams = false
export function generateStaticParams() {
  return getLessons().map((lesson) => ({ slug: [lesson.slug] }))
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const lesson = getLesson(slug?.join('/') ?? '')
  return lesson ? { title: lesson.title, description: lesson.description } : {}
}

export default async function Chapter({ params }: Props) {
  const { slug } = await params
  const lesson = getLesson(slug?.join('/') ?? '')
  if (!lesson) notFound()
  const domain = domains.find((d) => d.id === lesson.domain)!
  const lessons = getLessons()
  const index = lessons.findIndex((l) => l.slug === lesson.slug)
  const previous = lessons[index - 1]
  const next = lessons[index + 1]
  const { content } = await compileMDX({
    source: lesson.body,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, [remarkMath, { singleDollarTextMath: false }]],
        rehypePlugins: [rehypeSlug, rehypeKatex],
      },
    },
    components: {
      table: (props) => (
        <div className="table-scroll">
          <table {...props} />
        </div>
      ),
      a: (props) => (
        <a {...props} rel={props.href?.startsWith('http') ? 'noreferrer' : undefined} />
      ),
    },
  })
  const questions = getQuestions().filter((q) => q.lessonSlug === lesson.slug)
  return (
    <div className="page-grid lesson-page">
      <article className="page-primary">
        <div className="eyebrow">
          <Link href="/">Textbook</Link>
          <span>/</span>
          <Link href={`/#${domain.id}`}>{domain.shortTitle}</Link>
        </div>
        <div className="chapter-meta">
          Unit {String(domains.indexOf(domain) + 1).padStart(2, '0')} · Chapter {lesson.order} ·{' '}
          {lesson.readingMinutes} min read
        </div>
        <h1>{lesson.title}</h1>
        <p className="page-description">{lesson.description}</p>
        <LessonActions slug={lesson.slug} />
        <section className="learning-objectives">
          <h2>Learning objectives</h2>
          <ul>
            {lesson.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </section>
        <ConceptDiagram slug={lesson.slug} />
        <div className="lesson-prose">{content}</div>
        <ChapterQuiz questions={questions} />
        <section className="lesson-sources" id="sources">
          <div className="section-heading">
            <h2>Sources</h2>
            <span>Reviewed {lesson.reviewed}</span>
          </div>
          <ol>
            {lesson.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.label}
                  <ArrowUpRight size={13} />
                </a>
              </li>
            ))}
          </ol>
        </section>
        <div className="chapter-end-actions">
          <LessonActions slug={lesson.slug} />
        </div>
        <nav className="chapter-pagination" aria-label="Chapter navigation">
          {previous ? (
            <Link href={`/docs/${previous.slug}/`}>
              <ArrowLeft size={17} />
              <span>
                <small>Previous</small>
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/docs/${next.slug}/`}>
              <span>
                <small>Next</small>
                {next.title}
              </span>
              <ArrowRight size={17} />
            </Link>
          ) : (
            <Link href="/practice/">
              <span>
                <small>Next</small>Practice examination
              </span>
              <ArrowRight size={17} />
            </Link>
          )}
        </nav>
      </article>
      <LessonToc headings={getHeadings(lesson.body)} />
    </div>
  )
}
