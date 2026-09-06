import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { domains, type Lesson } from '@/lib/curriculum'
import { getCoverageAudits } from '@/lib/study-guides/content'

export function DepthReview({ lessons }: { lessons: Lesson[] }) {
  const audits = getCoverageAudits()
  return (
    <section className="source-group depth-review">
      <h2>Depth review</h2>
      <p className="muted">
        {audits.reduce((total, audit) => total + audit.findings.length, 0)} documented improvements
        across the seven domains. Reviewed September 6, 2026.
      </p>
      {domains.map((domain) => {
        const audit = audits.find((audit) => audit.domain === domain.id)
        if (!audit) return null
        return (
          <details key={domain.id}>
            <summary>
              <span>{domain.title}</span>
              <small>{audit.findings.length} findings</small>
              <ChevronDown size={16} aria-hidden="true" />
            </summary>
            {audit.findings.map((finding) => (
              <article key={finding.topic}>
                <h3>{finding.topic}</h3>
                <dl>
                  <dt>Gap</dt>
                  <dd>{finding.gap}</dd>
                  <dt>Revision</dt>
                  <dd>{finding.action}</dd>
                </dl>
                <div className="review-links">
                  {finding.lessonSlugs.map((slug) => (
                    <Link key={slug} href={`/docs/${slug}/`}>
                      {lessons.find((lesson) => lesson.slug === slug)?.title}
                    </Link>
                  ))}
                  {finding.sourceUrls.map((url, index) => (
                    <a key={url} href={url} target="_blank" rel="noreferrer">
                      Source {index + 1}: {new URL(url).hostname}
                    </a>
                  ))}
                </div>
              </article>
            ))}
            <p className="audit-limitations">{audit.limitations}</p>
          </details>
        )
      })}
    </section>
  )
}
