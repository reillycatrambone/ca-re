import { ArrowUpRight } from 'lucide-react'
import { getLessons } from '@/lib/content'
import { domains } from '@/lib/curriculum'
import { CoverageTable } from '@/components/book/coverage-table'
import { DepthReview } from '@/components/book/depth-review'
export const metadata = { title: 'Sources & Editorial Notes' }
export default function SourcesPage() {
  const lessons = getLessons()
  const sources = [
    ...new Map(
      lessons.flatMap((lesson) => lesson.sources).map((source) => [source.url, source])
    ).values(),
  ]
  return (
    <div className="standard-page">
      <div className="eyebrow">Reference / Sources</div>
      <h1>Sources & editorial notes</h1>
      <p className="page-description">
        California salesperson examination. Source review: September 6-7, 2026.
      </p>
      <div className="lesson-prose">
        <h2>Scope</h2>
        <p>
          This independent textbook is organized around the seven domains in the{' '}
          <a href="https://www.dre.ca.gov/Examinees/SalesExamContent.html">
            California Department of Real Estate salesperson examination outline
          </a>
          . The outline is a guide to coverage, not an exhaustive list of everything that may be
          tested. The{' '}
          <a href="https://www.dre.ca.gov/Examinees/TakingExam.html">DRE examination page</a>{' '}
          supplies the current format: 150 multiple-choice questions, three hours, and a 70% passing
          score.
        </p>
        <h2>Editorial method</h2>
        <p>
          Explanations, scenarios, questions, and diagrams are original and were authored with AI
          assistance. Chapters link to the primary sources used to check their legal and factual
          claims. Numerical examples are illustrative. Practice questions are not actual DRE
          questions, and practice scores are not a guarantee of an examination result.
        </p>
        <p>
          Separate AI reviewers checked the 543 practice questions, both 150-question mock forms,
          396 linked rule records, and 300 added teaching figures against primary sources. Review
          records identify the exact content checked, findings, corrections, and limitations.
          Qualified human subject-matter review has not been obtained. These reviews, topic
          mappings, and software tests do not establish exhaustive coverage or a guaranteed score.
        </p>
        <p>
          California rules and federal rules are identified in the relevant chapters. The{' '}
          <a href="https://www.dre.ca.gov/Publications/RealEstateLaw.html">
            2026 DRE law compilation
          </a>{' '}
          is a baseline as of January 1, 2026; later changes and applicable statutes and regulations
          must also be checked. Chapter review dates identify when this material was checked, not a
          promise that the law has remained unchanged.
        </p>
        <h2>Corrections and revisions</h2>
        <p>
          Corrections can be proposed through the{' '}
          <a href="https://github.com/reillycatrambone/ca-re/issues">
            public repository's issue tracker
          </a>
          . Include the chapter, disputed statement, and supporting primary source. Do not include
          personal information. Legal changes should update the explanation, related questions,
          glossary, and review date together.
        </p>
        <h2>Privacy</h2>
        <p>
          The application does not require an account or application API keys and contains no
          analytics integration. Only the current practice session and color-theme preference are
          saved in your browser; there is no reading history or study profile. The hosting provider
          may process ordinary web request data to deliver the site.
        </p>
        <h2>Attribution</h2>
        <p>
          The reading interface adapts{' '}
          <a href="https://github.com/rubixvi/rubix-documents">Rubix Documents</a>, with its MIT
          license preserved in the repository. Base controls use shadcn/ui and Radix primitives. The
          residential parcel illustration was generated for this textbook; the labeled teaching
          diagrams are original authored graphics. The site is not affiliated with or endorsed by
          DRE.
        </p>
      </div>
      <section className="source-group">
        <h2>Curriculum coverage</h2>
        <div className="table-scroll">
          <table className="reference-table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Weight</th>
                <th>Chapters</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((domain) => (
                <tr key={domain.id}>
                  <td>{domain.title}</td>
                  <td>{domain.weight}%</td>
                  <td>{lessons.filter((l) => l.domain === domain.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <CoverageTable lessons={lessons} />
      <DepthReview lessons={lessons} />
      <section className="source-group">
        <h2>Primary-source library</h2>
        {sources.map((source) => (
          <a
            className="source-row"
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
          >
            <span style={{ color: 'var(--foreground)', fontSize: 12, whiteSpace: 'normal' }}>
              {source.label}
            </span>
            <span>{new URL(source.url).hostname}</span>
            <ArrowUpRight size={13} />
          </a>
        ))}
      </section>
    </div>
  )
}
