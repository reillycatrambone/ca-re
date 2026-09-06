'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Attempt, StudySession } from '@/lib/exam'
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
const attemptSchema = z.object({
  id: z.string(),
  mode: z.enum(['practice', 'exam']),
  date: z.number(),
  score: z.number(),
  total: z.number(),
  domains: z.record(z.string(), z.object({ correct: z.number(), total: z.number() })),
})
const schema = z.object({
  completed: z.array(z.string()),
  bookmarks: z.array(z.string()),
  knownTerms: z.array(z.string()),
  attempts: z.array(attemptSchema),
  session: sessionSchema.nullable(),
})
export interface StudyState {
  completed: string[]
  bookmarks: string[]
  knownTerms: string[]
  attempts: Attempt[]
  session: StudySession | null
}
export const emptyStudy: StudyState = {
  completed: [],
  bookmarks: [],
  knownTerms: [],
  attempts: [],
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
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) setState(schema.parse(JSON.parse(stored)) as StudyState)
    } catch {
      setStorageError(
        'Saved study data could not be loaded. This session starts with a clean record.'
      )
    }
    setReady(true)
    const sync = (event: StorageEvent) => {
      if (event.key !== storageKey) return
      try {
        setState(
          event.newValue ? (schema.parse(JSON.parse(event.newValue)) as StudyState) : emptyStudy
        )
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
