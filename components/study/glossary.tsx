'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { StudyTerm } from '@/lib/terms'

export function Glossary({ terms }: { terms: StudyTerm[] }) {
  const [query, setQuery] = useState('')
  const filtered = terms.filter((term) =>
    `${term.term} ${term.definition}`.toLowerCase().includes(query.trim().toLowerCase())
  )
  const letters = [...new Set(filtered.map((term) => term.term[0].toUpperCase()))].sort()
  return (
    <>
      <div className="field glossary-search">
        <label htmlFor="glossary-query" className="sr-only">
          Filter glossary
        </label>
        <input
          id="glossary-query"
          type="search"
          placeholder="Find a term..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <nav className="glossary-alphabet" aria-label="Glossary letters">
        {letters.map((letter) => (
          <a key={letter} href={`#letter-${letter}`}>
            {letter}
          </a>
        ))}
      </nav>
      <p className="storage-note" role="status">
        {filtered.length} terms
      </p>
      {letters.length === 0 ? (
        <p className="empty-state">No terms match &ldquo;{query}&rdquo;.</p>
      ) : (
        letters.map((letter) => (
          <section className="glossary-group" id={`letter-${letter}`} key={letter}>
            <h2>{letter}</h2>
            <dl>
              {filtered
                .filter((term) => term.term[0].toUpperCase() === letter)
                .map((term) => (
                  <div className="glossary-entry" key={term.id}>
                    <dt>{term.term}</dt>
                    <dd>
                      {term.definition}
                      <br />
                      <Link href={`/docs/${term.lessonSlug}/`}>
                        {term.lessonTitle}
                        <ArrowRight size={12} />
                      </Link>
                    </dd>
                  </div>
                ))}
            </dl>
          </section>
        ))
      )}
    </>
  )
}
