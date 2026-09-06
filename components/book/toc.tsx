'use client'

import { useEffect, useState } from 'react'

export function LessonToc({
  headings,
}: {
  headings: { depth: number; text: string; id: string }[]
}) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-90px 0px -65% 0px' }
    )
    for (const heading of headings) {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [headings])
  return (
    <aside className="page-aside lesson-toc">
      <span className="aside-label">On this page</span>
      <nav aria-label="On this page">
        {headings
          .filter((h) => h.depth === 2)
          .map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              aria-current={active === heading.id ? 'location' : undefined}
            >
              {heading.text}
            </a>
          ))}
        <a href="#knowledge-check">Knowledge check</a>
        <a href="#sources">Sources</a>
      </nav>
    </aside>
  )
}
