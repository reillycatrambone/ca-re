'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { type Question } from '@/lib/curriculum'
import { sessionMatchesQuestions } from '@/lib/exam'
import { studyStateSchema, storageKey, type StudyState, useStudy } from './study-provider'

export function StudyTransfer({ bank }: { bank: Question[] }) {
  const { state, update, ready } = useStudy()
  const [incoming, setIncoming] = useState<StudyState | null>(null)
  const [message, setMessage] = useState('')

  function readBackup(raw: string) {
    try {
      const parsed = studyStateSchema.parse(JSON.parse(raw))
      if (!parsed.session) throw new Error('This backup has no saved session.')
      const byId = new Map(bank.map((question) => [question.id, question]))
      const questions = parsed.session.questionIds.flatMap((id) =>
        byId.get(id) ? [byId.get(id)!] : []
      )
      if (!sessionMatchesQuestions(parsed.session, questions)) {
        throw new Error('This session does not match the current question set.')
      }
      setIncoming(parsed)
      setMessage('Your saved session is ready to restore.')
    } catch (error) {
      setIncoming(null)
      setMessage(
        error instanceof Error && error.message.startsWith('This ')
          ? error.message
          : 'This file is not a valid study-session backup.'
      )
    }
  }

  useEffect(() => {
    const raw = new URLSearchParams(window.location.hash.slice(1)).get('study')
    if (raw) readBackup(raw)
    // The session stays in this browser and is never sent in a server request.
    window.history.replaceState(null, '', window.location.pathname)
  }, [])

  function restore() {
    if (!incoming || !ready) return
    try {
      // Verify persistence before updating the current session or leaving this page.
      localStorage.setItem(storageKey, JSON.stringify(incoming))
      update(() => incoming)
      setIncoming(null)
      setMessage('Your session is saved. Continue in Practice.')
    } catch {
      setMessage('Browser storage is unavailable. Keep your backup and try again.')
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(state)], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'ca-re-study-session.json'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <section className="space-y-6">
      <h1>Move your saved session</h1>
      <p>Keep your answers, marked questions, and place in your current practice or exam.</p>
      <p>
        Your session stays in your browser. Restoring a backup replaces the session saved at this
        address.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button disabled={!ready || !state.session} onClick={download}>
          Download saved session
        </Button>
        <label className="space-y-2">
          <span className="block">Choose a session backup</span>
          <input
            type="file"
            accept="application/json,.json"
            onChange={async (event) => {
              const file = event.target.files?.[0]
              if (file) {
                if (file.size > 1_000_000) {
                  setIncoming(null)
                  setMessage('This backup is too large.')
                  return
                }
                readBackup(await file.text())
              }
            }}
          />
        </label>
      </div>
      {message && <p role="status">{message}</p>}
      {incoming && (
        <Button disabled={!ready} onClick={restore}>
          {state.session ? 'Replace saved session' : 'Restore saved session'}
        </Button>
      )}
      <p>
        <Link href="/practice/">Continue in Practice</Link>
      </p>
    </section>
  )
}
