'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, RotateCcw, Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { domains } from '@/lib/curriculum'
import { shuffle } from '@/lib/exam'
import type { StudyTerm } from '@/lib/terms'

export function Flashcards({ terms }: { terms: StudyTerm[] }) {
  const [domain, setDomain] = useState('all')
  const [order, setOrder] = useState(terms.map((term) => term.id))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const termMap = useMemo(() => new Map(terms.map((term) => [term.id, term])), [terms])
  const cards = order.flatMap((id) => {
    const term = termMap.get(id)
    return term && (domain === 'all' || term.domain === domain) ? [term] : []
  })
  const cursor = cards.length ? index % cards.length : 0
  const card = cards[cursor]
  const go = (offset: number) => {
    setIndex((cursor + offset + cards.length) % cards.length)
    setFlipped(false)
  }
  return (
    <>
      <div className="eyebrow">Study / Flashcards</div>
      <h1>Flashcards</h1>
      <p className="page-description">Definitions and distinctions from the textbook.</p>
      <div className="study-toolbar">
        <div className="field">
          <label htmlFor="flashcard-domain">Topic</label>
          <select
            id="flashcard-domain"
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value)
              setIndex(0)
              setFlipped(false)
            }}
          >
            <option value="all">All topics</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>
                {d.shortTitle}
              </option>
            ))}
          </select>
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label="Shuffle flashcards"
          title="Shuffle flashcards"
          onClick={() => {
            setOrder(shuffle(order))
            setIndex(0)
            setFlipped(false)
          }}
        >
          <Shuffle />
        </Button>
      </div>
      {!card ? (
        <div className="empty-state">
          <p>No cards in this selection.</p>
          <Button
            variant="link"
            onClick={() => {
              setDomain('all')
              setIndex(0)
            }}
          >
            View all cards
            <ArrowRight />
          </Button>
        </div>
      ) : (
        <>
          <div className="flashcard">
            <div className="flashcard-meta">
              <span>{domains.find((d) => d.id === card.domain)?.shortTitle}</span>
              <span>
                {cursor + 1} / {cards.length}
              </span>
            </div>
            <button
              aria-label={
                flipped
                  ? `${card.term}: ${card.definition} Show term`
                  : `${card.term}. Show definition`
              }
              onClick={() => setFlipped(!flipped)}
              className={`flashcard-face ${flipped ? 'is-back' : ''}`}
            >
              {flipped ? card.definition : card.term}
            </button>
            <Link className="text-link" href={`/docs/${card.lessonSlug}/`}>
              {card.lessonTitle}
              <ArrowRight size={13} />
            </Link>
          </div>
          <div className="flashcard-controls">
            <div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous flashcard"
                title="Previous flashcard"
                onClick={() => go(-1)}
              >
                <ArrowLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next flashcard"
                title="Next flashcard"
                onClick={() => go(1)}
              >
                <ArrowRight />
              </Button>
            </div>
            <div>
              <Button variant="outline" onClick={() => setFlipped(!flipped)}>
                <RotateCcw />
                {flipped ? 'Show term' : 'Show answer'}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
