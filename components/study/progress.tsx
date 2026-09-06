'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Bookmark, Check, Circle, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { domains, type LessonMeta } from '@/lib/curriculum'
import { collectTerms } from '@/lib/terms'
import { emptyStudy, toggleItem, useStudy } from './study-provider'

export function Progress({ lessons }: { lessons: LessonMeta[] }) {
  const { state, update, ready } = useStudy()
  const [resetOpen, setResetOpen] = useState(false)
  const completed = lessons.filter((l) => state.completed.includes(l.slug)).length
  const terms = collectTerms(lessons)
  const known = terms.filter((t) => state.knownTerms.includes(t.id)).length
  const saved = lessons.filter((l) => state.bookmarks.includes(l.slug))
  return (
    <>
      <div className="eyebrow">Study / Progress</div>
      <h1>Your progress</h1>
      <p className="storage-note">
        Stored in this browser. Clearing browser data removes this record.
      </p>
      {!ready ? (
        <p className="empty-state" role="status">
          Loading progress...
        </p>
      ) : (
        <>
          <div className="exam-summary-strip">
            <div>
              <strong>
                {completed} / {lessons.length}
              </strong>
              <span>chapters complete</span>
            </div>
            <div>
              <strong>
                {known} / {terms.length}
              </strong>
              <span>terms known</span>
            </div>
            <div>
              <strong>{state.attempts.length}</strong>
              <span>sessions finished</span>
            </div>
          </div>
          <h2>Curriculum</h2>
          {domains.map((domain) => {
            const group = lessons.filter((l) => l.domain === domain.id)
            const done = group.filter((l) => state.completed.includes(l.slug)).length
            return (
              <section className="progress-unit" key={domain.id}>
                <div className="progress-unit-header">
                  <Link href={`/#${domain.id}`}>{domain.title}</Link>
                  <span>
                    {done} / {group.length}
                  </span>
                </div>
                <div className="progress-track">
                  <div style={{ width: `${group.length ? (done / group.length) * 100 : 0}%` }} />
                </div>
                <details>
                  <summary className="text-link" style={{ marginTop: 12 }}>
                    Chapters
                  </summary>
                  <div className="progress-unit-links">
                    {group.map((lesson) => (
                      <Link key={lesson.slug} href={`/docs/${lesson.slug}/`}>
                        {state.completed.includes(lesson.slug) ? <Check /> : <Circle />}
                        {lesson.title}
                      </Link>
                    ))}
                  </div>
                </details>
              </section>
            )
          })}
          <section id="bookmarks" className="progress-section">
            <div className="section-heading">
              <h2>Bookmarks</h2>
              <span>{saved.length} saved</span>
            </div>
            {saved.length === 0 ? (
              <p className="empty-state">No bookmarked chapters yet.</p>
            ) : (
              saved.map((lesson) => (
                <div className="bookmark-row" key={lesson.slug}>
                  <Link href={`/docs/${lesson.slug}/`}>{lesson.title}</Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove bookmark: ${lesson.title}`}
                    title="Remove bookmark"
                    onClick={() =>
                      update((s) => ({ ...s, bookmarks: toggleItem(s.bookmarks, lesson.slug) }))
                    }
                  >
                    <Bookmark fill="currentColor" />
                  </Button>
                </div>
              ))
            )}
          </section>
          <section className="progress-section">
            <div className="section-heading">
              <h2>Practice history</h2>
              <Link className="text-link" href="/practice/">
                Practice
                <ArrowRight size={13} />
              </Link>
            </div>
            {state.attempts.length === 0 ? (
              <p className="empty-state">No completed practice sessions yet.</p>
            ) : (
              <div className="table-scroll">
                <table className="reference-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Session</th>
                      <th>Correct</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.attempts.map((attempt) => (
                      <tr key={attempt.id}>
                        <td>{new Date(attempt.date).toLocaleDateString('en-US')}</td>
                        <td>{attempt.mode === 'exam' ? 'Mock exam' : 'Topic practice'}</td>
                        <td>
                          {attempt.score} / {attempt.total}
                        </td>
                        <td>{Math.round((attempt.score / attempt.total) * 100)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          <div className="progress-section">
            <Button variant="outline" onClick={() => setResetOpen(true)}>
              <Trash2 />
              Reset study data
            </Button>
          </div>
          <Dialog open={resetOpen} onOpenChange={setResetOpen}>
            <DialogContent>
              <DialogTitle>Reset study data?</DialogTitle>
              <DialogDescription>
                This removes completed chapters, bookmarks, known flashcards, practice history, and
                the current session from this browser.
              </DialogDescription>
              <DialogFooter>
                <Button variant="outline" onClick={() => setResetOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    update(() => emptyStudy)
                    setResetOpen(false)
                  }}
                >
                  Reset data
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  )
}
