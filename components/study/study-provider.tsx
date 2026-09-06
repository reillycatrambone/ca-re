'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { StudySession } from '@/lib/exam'
import { z } from 'zod'

const sessionSchema = z.object({
  id: z.string(),
  mode: z.enum(['practice', 'exam']),
  questionIds: z.array(z.string()).min(1),
  answers: z.record(z.string(), z.number().int().min(0).max(3)),
  checked: z.array(z.string()),
  flags: z.array(z.string()),
  current: z.number().int().min(0),
  startedAt: z.number(),
  expiresAt: z.number().nullable(),
  finishedAt: z.number().nullable(),
})
const schema = z.object({
  session: sessionSchema.nullable(),
})
export interface StudyState {
  session: StudySession | null
}
export const emptyStudy: StudyState = {
  session: null,
}
export const storageKey = 'ca-re:study:v1'

const Context = createContext<{
  state: StudyState
  update: (fn: (state: StudyState) => StudyState) => void
  ready: boolean
  storageError: string | null
}>({ state: emptyStudy, update: () => {}, ready: false, storageError: null })

export function StudyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudyState>(emptyStudy)
  const [ready, setReady] = useState(false)
  const [storageError, setStorageError] = useState<string | null>(null)
  useEffect(() => {
    const restore = (stored: string | null) => {
      const restored = stored ? schema.parse(JSON.parse(stored)) : emptyStudy
      setState(restored)
      // Rewrite older records without retaining their retired tracking fields.
      if (stored && JSON.stringify(restored) !== stored) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(restored))
        } catch {
          setStorageError(
            'Browser storage is unavailable. This session will last for this visit only.'
          )
        }
      }
    }
    try {
      restore(localStorage.getItem(storageKey))
    } catch {
      setStorageError(
        'The saved practice session could not be loaded. You can start a new session.'
      )
    }
    setReady(true)
    const sync = (event: StorageEvent) => {
      if (event.key !== storageKey) return
      try {
        restore(event.newValue)
      } catch {
        /* Keep the valid in-memory record. */
      }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  const update = (fn: (state: StudyState) => StudyState) => {
    setState((previous) => {
      const next = fn(previous)
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        setStorageError('Browser storage is unavailable. Changes will last for this visit only.')
      }
      return next
    })
  }
  return (
    <Context.Provider value={{ state, update, ready, storageError }}>{children}</Context.Provider>
  )
}

export function useStudy() {
  return useContext(Context)
}
export function toggleItem(items: string[], item: string) {
  return items.includes(item) ? items.filter((value) => value !== item) : [...items, item]
}
