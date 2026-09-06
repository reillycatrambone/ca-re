'use client'

import { Bookmark, Check, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toggleItem, useStudy } from './study-provider'

export function LessonActions({ slug }: { slug: string }) {
  const { state, update, ready } = useStudy()
  const saved = state.bookmarks.includes(slug)
  const completed = state.completed.includes(slug)
  return (
    <div className="lesson-actions">
      <Button
        variant={completed ? 'secondary' : 'outline'}
        disabled={!ready}
        aria-pressed={completed}
        onClick={() => update((s) => ({ ...s, completed: toggleItem(s.completed, slug) }))}
      >
        <Check />
        {completed ? 'Completed' : 'Mark complete'}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        disabled={!ready}
        title={saved ? 'Remove bookmark' : 'Bookmark lesson'}
        aria-label={saved ? 'Remove bookmark' : 'Bookmark lesson'}
        aria-pressed={saved}
        onClick={() => update((s) => ({ ...s, bookmarks: toggleItem(s.bookmarks, slug) }))}
      >
        <Bookmark fill={saved ? 'currentColor' : 'none'} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        title="Print lesson"
        aria-label="Print lesson"
        onClick={() => window.print()}
      >
        <Printer />
      </Button>
    </div>
  )
}
