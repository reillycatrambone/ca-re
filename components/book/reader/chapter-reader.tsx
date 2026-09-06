'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { subscribeToAnchorReveal } from '@/lib/in-page-navigation'

export function ChapterReader({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const reveal = (hash: string) => {
      let id: string
      try {
        id = decodeURIComponent(hash.replace(/^#/, ''))
      } catch {
        return
      }
      const target = document.getElementById(id)
      if (!target || !root.current?.contains(target)) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }))
    }
    const unsubscribe = subscribeToAnchorReveal(reveal)
    return () => {
      cancelAnimationFrame(frame)
      unsubscribe()
    }
  }, [])

  return (
    <div className="chapter-reader" ref={root}>
      {children}
      <noscript>
        <style>
          {
            '.case-lab .lab-panel[data-state=inactive],.case-lab .decision-feedback,.case-lab .calculation-step,.lab-print-title,.case-lab .sequence-lab{display:block!important}.case-lab [role=tablist],.lab-decision-actions,.calculation-navigation{display:none!important}'
          }
        </style>
      </noscript>
    </div>
  )
}
