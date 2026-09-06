'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ClipboardList,
  Layers,
  Menu,
  Moon,
  Sun,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { domains, type LessonMeta } from '@/lib/curriculum'
import { cn } from '@/lib/utils'
import { useStudy } from '@/components/study/study-provider'
import { SearchDialog } from './search-dialog'

const views = [
  { href: '/', label: 'Textbook', icon: BookOpen },
  { href: '/practice/', label: 'Practice', icon: ClipboardList },
  { href: '/flashcards/', label: 'Flashcards', icon: Layers },
]

function BookNavigation({ lessons, close }: { lessons: LessonMeta[]; close?: () => void }) {
  const path = usePathname()
  return (
    <nav className="book-navigation" aria-label="Textbook navigation">
      <Link onClick={close} className={cn('sidebar-link', path === '/' && 'active')} href="/">
        <BookOpen size={15} />
        Overview
      </Link>
      <div className="nav-label">Curriculum</div>
      {domains.map((domain, index) => (
        <details
          key={`${domain.id}-${path.startsWith(`/docs/${domain.id}`)}`}
          className="unit-navigation"
          open={path.startsWith(`/docs/${domain.id}`) || undefined}
        >
          <summary>
            <span className="unit-number">{String(index + 1).padStart(2, '0')}</span>
            <span>{domain.shortTitle}</span>
            <ChevronDown size={13} />
          </summary>
          <div className="unit-lessons">
            {lessons
              .filter((lesson) => lesson.domain === domain.id)
              .map((lesson) => (
                <Link
                  onClick={close}
                  key={lesson.slug}
                  href={`/docs/${lesson.slug}/`}
                  className={cn('lesson-link', path.includes(lesson.slug) && 'active')}
                  aria-current={path.includes(lesson.slug) ? 'page' : undefined}
                >
                  {lesson.title}
                </Link>
              ))}
          </div>
        </details>
      ))}
      <div className="nav-label">Reference</div>
      <Link
        onClick={close}
        href="/glossary/"
        className={cn('sidebar-link', path.startsWith('/glossary') && 'active')}
      >
        Glossary
      </Link>
      <Link
        onClick={close}
        href="/math/"
        className={cn('sidebar-link', path.startsWith('/math') && 'active')}
      >
        Real estate math
      </Link>
      <Link
        onClick={close}
        href="/sources/"
        className={cn('sidebar-link', path.startsWith('/sources') && 'active')}
      >
        Sources & editorial notes
      </Link>
      <div className="sidebar-bottom">
        <span>California salesperson exam</span>
        <a
          href="https://www.dre.ca.gov/Examinees/SalesExamContent.html"
          target="_blank"
          rel="noreferrer"
        >
          Official DRE outline
          <ArrowUpRight size={13} />
        </a>
      </div>
    </nav>
  )
}

export function BookShell({
  children,
  lessons,
}: {
  children: React.ReactNode
  lessons: LessonMeta[]
}) {
  const path = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const { storageError } = useStudy()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="app-header">
        <div className="header-brand">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                className="mobile-menu"
                size="icon"
                variant="ghost"
                aria-label="Open navigation"
                title="Open navigation"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="mobile-sheet">
              <SheetTitle>California Real Estate</SheetTitle>
              <SheetDescription className="sr-only">Textbook and study navigation</SheetDescription>
              <div className="mobile-view-links">
                {views.map((view) => (
                  <Link href={view.href} key={view.href} onClick={() => setMobileOpen(false)}>
                    <view.icon size={16} />
                    {view.label}
                  </Link>
                ))}
              </div>
              <BookNavigation lessons={lessons} close={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
          <Link href="/" className="brand" aria-label="California Real Estate home">
            <span className="brand-mark">
              CA<span>RE</span>
            </span>
            <span className="brand-name">
              California
              <br />
              <strong>Real Estate</strong>
            </span>
          </Link>
        </div>
        <nav className="view-navigation" aria-label="Study views">
          {views.map((view) => {
            const active =
              view.href === '/'
                ? !views.slice(1).some((v) => path.startsWith(v.href))
                : path.startsWith(view.href)
            return (
              <Link
                key={view.href}
                href={view.href}
                className={cn(active && 'active')}
                aria-current={active ? 'page' : undefined}
              >
                <view.icon size={15} />
                {view.label}
              </Link>
            )
          })}
        </nav>
        <div className="header-tools">
          <SearchDialog />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle color theme"
            title="Toggle color theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && resolvedTheme === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </div>
      </header>
      <div className="app-layout">
        <aside className="desktop-sidebar">
          <BookNavigation lessons={lessons} />
        </aside>
        <main id="main-content" tabIndex={-1} className="main-content">
          {storageError && (
            <p className="storage-warning" role="status">
              {storageError}
            </p>
          )}
          {children}
          <footer className="page-footer">
            <span>California Real Estate</span>
            <span>Independent study resource. Not affiliated with DRE.</span>
            <Link href="/sources/">Sources</Link>
          </footer>
        </main>
      </div>
    </>
  )
}
