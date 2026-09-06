'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { AlignLeft, ListFilter } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { subscribeToAnchorReveal } from '@/lib/in-page-navigation'

type ReadingMode = 'focused' | 'full'
const Context = createContext<{
  mode: ReadingMode
  activeId: string
  details: Set<string>
  sectionIds: string[]
  toggleSection: (id: string) => void
  toggleDetail: (id: string) => void
} | null>(null)

export function useReader() {
  const context = useContext(Context)
  if (!context) throw new Error('Reading components require a ChapterReader')
  return context
}

export function ChapterReader({
  sectionIds,
  children,
}: {
  sectionIds: string[]
  children: ReactNode
}) {
  const [mode, setMode] = useState<ReadingMode>('focused')
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')
  const [details, setDetails] = useState(new Set<string>())
  const [scrollTarget, setScrollTarget] = useState<{ id: string } | null>(null)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      if (localStorage.getItem('ca-re:reading-mode:v1') === 'full') setMode('full')
    } catch {
      /* Reading remains usable without storage. */
    }
    const reveal = (hash: string) => {
      let id: string
      try {
        id = decodeURIComponent(hash.replace(/^#/, ''))
      } catch {
        return
      }
      const target = document.getElementById(id)
      if (!target || !root.current?.contains(target)) return
      const section = target.closest<HTMLElement>('[data-reading-section]')
      if (section) setActiveId(section.dataset.readingSection!)
      const ancestors: string[] = []
      let detail = target.closest<HTMLElement>('[data-reading-detail]')
      while (detail) {
        ancestors.push(detail.dataset.readingDetail!)
        detail = detail.parentElement?.closest<HTMLElement>('[data-reading-detail]') ?? null
      }
      if (ancestors.length) setDetails((current) => new Set([...current, ...ancestors]))
      setScrollTarget({ id })
    }
    return subscribeToAnchorReveal(reveal)
  }, [])

  useEffect(() => {
    if (!scrollTarget) return
    const frame = requestAnimationFrame(() =>
      document.getElementById(scrollTarget.id)?.scrollIntoView({ block: 'start' })
    )
    return () => cancelAnimationFrame(frame)
  }, [scrollTarget])

  const changeMode = (value: string) => {
    const next = value === 'full' ? 'full' : 'focused'
    setMode(next)
    try {
      localStorage.setItem('ca-re:reading-mode:v1', next)
    } catch {
      /* A device preference is optional. */
    }
  }
  return (
    <Context.Provider
      value={{
        mode,
        activeId,
        details,
        sectionIds,
        toggleSection: (id) => setActiveId((current) => (current === id ? '' : id)),
        toggleDetail: (id) =>
          setDetails((current) => {
            const next = new Set(current)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
          }),
      }}
    >
      <div className="chapter-reader" data-reading-mode={mode} ref={root}>
        <div className="reader-toolbar">
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(value) => {
              if (value) changeMode(value)
            }}
            aria-label="Reading mode"
          >
            <ToggleGroupItem value="focused">
              <ListFilter size={14} />
              Focused
            </ToggleGroupItem>
            <ToggleGroupItem value="full">
              <AlignLeft size={14} />
              Full chapter
            </ToggleGroupItem>
          </ToggleGroup>
          <span>{sectionIds.length} sections</span>
        </div>
        {children}
        <noscript>
          <style>
            {
              '@layer base{.reading-section-content[hidden],.reading-detail-content[hidden]{display:block!important}}.case-lab .lab-panel[data-state=inactive],.case-lab .decision-feedback,.case-lab .calculation-step,.lab-print-title,.case-lab .sequence-lab{display:block!important}.reader-toolbar,.next-reading-section,.case-lab [role=tablist],.lab-decision-actions,.calculation-navigation,.reading-section h2 button svg,.reading-detail h3 button svg{display:none!important}.reading-section h2 button,.reading-detail h3 button{display:block!important;cursor:default!important;pointer-events:none}'
            }
          </style>
        </noscript>
      </div>
    </Context.Provider>
  )
}
