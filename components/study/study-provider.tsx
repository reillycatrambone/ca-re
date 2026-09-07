'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { studySessionSchema, type StudySession } from '@/lib/exam'
import { z } from 'zod'

const schema = z.object({
  session: studySessionSchema.nullable(),
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
      let restored = emptyStudy
      try {
        restored = stored ? schema.parse(JSON.parse(stored)) : emptyStudy
      } catch {
        setStorageError(
          'The saved session uses an older or invalid question set. Start a new session.'
        )
      }
      setState(restored)
      // Retire unverifiable sessions and strip old tracking without retaining a second copy.
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
      setStorageError('Browser storage is unavailable. This session will last for this visit only.')
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
