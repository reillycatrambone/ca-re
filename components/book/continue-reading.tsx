'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { LessonMeta } from '@/lib/curriculum'
import { useStudy } from '@/components/study/study-provider'

export function ContinueReading({ lessons }: { lessons: LessonMeta[] }) {
  const { state } = useStudy()
  const next = lessons.find((lesson) => !state.completed.includes(lesson.slug)) ?? lessons[0]
  const complete = lessons.length > 0 && lessons.every((l) => state.completed.includes(l.slug))
  if (!next) return null
  return (
    <div className="continue-reading">
      <div className="continue-icon">{complete ? <Check size={21} /> : <BookOpen size={21} />}</div>
      <div>
        <span>
          {complete
            ? 'All chapters complete'
            : state.completed.length
              ? 'Continue reading'
              : 'Chapter 1.1'}
        </span>
        <Link href={`/docs/${next.slug}/`}>{next.title}</Link>
      </div>
      <Button asChild size="icon" variant="ghost" aria-label={`Read ${next.title}`}>
        <Link href={`/docs/${next.slug}/`}>
          <ArrowRight />
        </Link>
      </Button>
    </div>
  )
}
