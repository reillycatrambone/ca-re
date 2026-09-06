'use client'

import type { ReactNode } from 'react'
import { ArrowRight, ChevronDown, Plus, Minus } from 'lucide-react'
import { useReader } from './reader-context'

export function ReadingSection({
  id,
  label,
  takeaway,
  number,
  children,
}: {
  id: string
  label: string
  takeaway: string
  number: number
  children?: ReactNode
}) {
  const reader = useReader()
  const expanded = reader.mode === 'full' || reader.activeId === id
  const nextId = reader.sectionIds[reader.sectionIds.indexOf(id) + 1]
  return (
    <section className="reading-section" data-reading-section={id} data-expanded={expanded}>
      <div className="reading-section-heading">
        <span className="reading-section-number" aria-hidden="true">
          {String(number).padStart(2, '0')}
        </span>
        <div>
          <h2 id={id}>
            {reader.mode === 'full' ? (
              label
            ) : (
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`${id}-body`}
                onClick={() => reader.toggleSection(id)}
              >
                {label}
                <ChevronDown size={17} aria-hidden="true" />
              </button>
            )}
          </h2>
          {takeaway && <p className="section-takeaway">{takeaway}</p>}
        </div>
      </div>
      <div id={`${id}-body`} className="reading-section-content" hidden={!expanded}>
        {children}
        {nextId && reader.mode === 'focused' && (
          <a className="next-reading-section" href={`#${nextId}`}>
            Next section
            <ArrowRight size={14} />
          </a>
        )}
      </div>
    </section>
  )
}

export function ReadingDetail({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children?: ReactNode
}) {
  const reader = useReader()
  const expanded = reader.mode === 'full' || reader.details.has(id)
  return (
    <section className="reading-detail" data-reading-detail={id}>
      <h3 id={id}>
        {reader.mode === 'full' ? (
          label
        ) : (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={`${id}-detail`}
            onClick={() => reader.toggleDetail(id)}
          >
            {expanded ? (
              <Minus size={15} aria-hidden="true" />
            ) : (
              <Plus size={15} aria-hidden="true" />
            )}
            {label}
          </button>
        )}
      </h3>
      <div id={`${id}-detail`} className="reading-detail-content" hidden={!expanded}>
        {children}
      </div>
    </section>
  )
}
