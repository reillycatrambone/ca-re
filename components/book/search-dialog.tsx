'use client'

import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import MiniSearch from 'minisearch'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { searchOptions, type SearchEntry } from '@/lib/search'

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<MiniSearch<SearchEntry> | null>(null)
  const [error, setError] = useState(false)
  const [active, setActive] = useState(0)
  const router = useRouter()
  const deferred = useDeferredValue(query)
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', shortcut)
    return () => window.removeEventListener('keydown', shortcut)
  }, [])
  useEffect(() => {
    if (!open || index) return
    const controller = new AbortController()
    setError(false)
    fetch('/search-index.json', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Search unavailable')
        return response.text()
      })
      .then((json) => setIndex(MiniSearch.loadJSON<SearchEntry>(json, searchOptions)))
      .catch((error) => {
        if (error.name !== 'AbortError') setError(true)
      })
    return () => controller.abort()
  }, [open, index])
  const results = useMemo(
    () => (index && deferred.trim() ? index.search(deferred.trim()).slice(0, 12) : []),
    [index, deferred]
  )
  useEffect(() => {
    document.getElementById(`search-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active])
  const navigate = (href: string) => {
    setOpen(false)
    router.push(href)
  }
  return (
    <>
      <button className="search-trigger" onClick={() => setOpen(true)} aria-label="Search textbook">
        <Search size={16} />
        <span>Search textbook...</span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="search-dialog">
          <DialogTitle className="sr-only">Search textbook</DialogTitle>
          <DialogDescription className="sr-only">
            Search lessons, definitions, and examples.
          </DialogDescription>
          <div className="search-field">
            <Search size={19} />
            <input
              autoComplete="off"
              autoFocus
              placeholder="Search textbook..."
              aria-label="Search textbook"
              role="combobox"
              aria-controls="search-results"
              aria-expanded={results.length > 0}
              aria-activedescendant={results[active] ? `search-${active}` : undefined}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActive(0)
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  setActive((value) => Math.min(value + 1, results.length - 1))
                }
                if (event.key === 'ArrowUp') {
                  event.preventDefault()
                  setActive((value) => Math.max(value - 1, 0))
                }
                if (event.key === 'Enter' && results[active]) navigate(results[active].href)
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close search"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </div>
          <div
            id="search-results"
            role="listbox"
            aria-label="Search results"
            className="search-results"
          >
            {error ? (
              <p className="empty-search">Search could not load. Close and reopen to retry.</p>
            ) : !index ? (
              <p className="empty-search" role="status">
                Loading search...
              </p>
            ) : !query.trim() ? (
              <div className="search-suggestions">
                <span>Common topics</span>
                {[
                  'Fiduciary duties',
                  'Easements',
                  'Trust funds',
                  'Buyer representation',
                  'Deeds of trust',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term)
                      setActive(0)
                    }}
                  >
                    {term}
                    <ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
            ) : results.length === 0 ? (
              <p className="empty-search">No results for &ldquo;{query}&rdquo;.</p>
            ) : (
              results.map((result, i) => (
                <button
                  id={`search-${i}`}
                  role="option"
                  aria-selected={active === i}
                  className="search-result"
                  key={result.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => navigate(result.href)}
                >
                  <span className="result-lesson">{result.lessonTitle}</span>
                  <strong>{result.title}</strong>
                  <span>{String(result.text).slice(0, 145)}...</span>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
