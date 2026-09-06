'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { domains } from '@/lib/curriculum'
import { shuffle } from '@/lib/exam'
import type { StudyTerm } from '@/lib/terms'
import { useStudy, toggleItem } from './study-provider'

export function Flashcards({ terms }: { terms: StudyTerm[] }) {
  const { state, update, ready } = useStudy()
  const [domain, setDomain] = useState('all')
  const [filter, setFilter] = useState('review')
  const [order, setOrder] = useState(terms.map((term) => term.id))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const termMap = useMemo(() => new Map(terms.map((term) => [term.id, term])), [terms])
  const cards = order.flatMap((id) => {
    const term = termMap.get(id)
    return term &&
      (domain === 'all' || term.domain === domain) &&
      (filter === 'all' ||
        (filter === 'known' ? state.knownTerms.includes(id) : !state.knownTerms.includes(id)))
      ? [term]
      : []
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
        <Tabs
          value={filter}
          onValueChange={(value) => {
            setFilter(value)
            setIndex(0)
            setFlipped(false)
          }}
        >
          <TabsList>
            <TabsTrigger value="review">To review</TabsTrigger>
            <TabsTrigger value="known">Known</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
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
      {!ready ? (
        <p className="empty-state" role="status">
          Loading flashcards...
        </p>
      ) : !card ? (
        <div className="empty-state">
          <p>
            {filter === 'review'
              ? 'No cards left to review in this selection.'
              : 'No cards in this selection.'}
          </p>
          <Button
            variant="link"
            onClick={() => {
              setFilter('all')
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
                onClick={() => go(-1)}
              >
                <ArrowLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next flashcard"
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
              <Button
                onClick={() => {
                  update((s) => ({ ...s, knownTerms: toggleItem(s.knownTerms, card.id) }))
                  setFlipped(false)
                }}
              >
                <Check />
                {state.knownTerms.includes(card.id) ? 'Review again' : 'Mark known'}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
