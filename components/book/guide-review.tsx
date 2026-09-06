import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { StudyGuide } from '@/lib/study-guides/types'
import type { LessonMeta } from '@/lib/curriculum'
import { ReadingDetail } from './reader/reading-section'

export function GuideReview({ guide, lessons }: { guide: StudyGuide; lessons: LessonMeta[] }) {
  return (
    <>
      <section className="guide-review" id="exam-pitfalls">
        <h2>Exam pitfalls</h2>
        {guide.pitfalls.map((pitfall, index) => (
          <ReadingDetail id={`pitfall-${index + 1}`} label={pitfall.trap} key={pitfall.trap}>
            <div className="pitfall-answer">
              <strong>{pitfall.correction}</strong>
              <p>{pitfall.why}</p>
            </div>
          </ReadingDetail>
        ))}
      </section>
      <section className="guide-connections" id="connected-concepts">
        <h2>Connected concepts</h2>
        {guide.connections.map((connection) => (
          <Link key={connection.lessonSlug} href={`/docs/${connection.lessonSlug}/`}>
            <span>
              <strong>
                {lessons.find((lesson) => lesson.slug === connection.lessonSlug)?.title}
              </strong>
              <small>{connection.reason}</small>
            </span>
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </section>
    </>
  )
}
