import Link from 'next/link'
import { domains, type LessonMeta } from '@/lib/curriculum'
import coverage from '@/contents/coverage.json'

export function CoverageTable({ lessons }: { lessons: LessonMeta[] }) {
  return (
    <section className="source-group">
      <h2>DRE topic map</h2>
      {coverage.map((group) => (
        <details className="coverage-unit" key={group.domain}>
          <summary>
            {domains.find((d) => d.id === group.domain)?.title}
            <span>{group.items.length} topics</span>
          </summary>
          <div className="table-scroll">
            <table className="reference-table">
              <thead>
                <tr>
                  <th>Published DRE topic</th>
                  <th>Chapters</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((item) => (
                  <tr key={item.topic}>
                    <td>{item.topic}</td>
                    <td>
                      {item.lessonSlugs.map((slug) => (
                        <Link className="coverage-link" key={slug} href={`/docs/${slug}/`}>
                          {lessons.find((l) => l.slug === slug)?.title}
                        </Link>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ))}
    </section>
  )
}
