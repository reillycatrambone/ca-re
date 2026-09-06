import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock3 } from 'lucide-react'
import { getLessons, getQuestions } from '@/lib/content'
import { domains } from '@/lib/curriculum'
import { Button } from '@/components/ui/button'
import { ContinueReading } from '@/components/book/continue-reading'

export default function Home() {
  const lessons = getLessons()
  const questions = getQuestions()
  return (
    <div className="page-grid overview-page">
      <div className="page-primary">
        <div className="eyebrow">Textbook / California salesperson examination</div>
        <h1>California real estate</h1>
        <p className="page-description">
          The principles, laws, and practice behind the California salesperson exam.
        </p>
        <div className="book-facts">
          <span>{domains.length} units</span>
          <span>{lessons.length} chapters</span>
          <span>{questions.length} practice questions</span>
        </div>
        <ContinueReading lessons={lessons.map(({ body: _body, ...lesson }) => lesson)} />
        <div className="section-heading curriculum-heading">
          <h2>Contents</h2>
          <span>Exam weight</span>
        </div>
        <div className="contents-list">
          {domains.map((domain, index) => {
            const chapters = lessons.filter((l) => l.domain === domain.id)
            return (
              <section className="unit-section" key={domain.id} id={domain.id}>
                <div className="unit-title-row">
                  <span className="unit-index">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h2>{domain.title}</h2>
                    <p>{domain.description}</p>
                  </div>
                  <span className="unit-weight">{domain.weight}%</span>
                </div>
                <div className="chapter-list">
                  {chapters.map((lesson, i) => (
                    <Link href={`/docs/${lesson.slug}/`} key={lesson.slug}>
                      <span className="chapter-number">
                        {index + 1}.{i + 1}
                      </span>
                      <span>{lesson.title}</span>
                      <span className="chapter-time">{lesson.readingMinutes} min</span>
                      <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
      <aside className="page-aside overview-aside">
        <span className="aside-label">The examination</span>
        <dl className="exam-facts">
          <div>
            <dt>Questions</dt>
            <dd>150</dd>
          </div>
          <div>
            <dt>Time allowed</dt>
            <dd>3 hours</dd>
          </div>
          <div>
            <dt>Passing score</dt>
            <dd>70%</dd>
          </div>
        </dl>
        <a
          className="text-link"
          href="https://www.dre.ca.gov/Examinees/TakingExam.html"
          target="_blank"
          rel="noreferrer"
        >
          DRE exam details
          <ArrowUpRight size={13} />
        </a>
        <div className="aside-divider" />
        <span className="aside-label">Study</span>
        <Link className="aside-study-link" href="/practice/">
          <Clock3 size={16} />
          <span>Practice examination</span>
          <ArrowRight size={13} />
        </Link>
        <Link className="aside-study-link" href="/glossary/">
          Glossary
          <ArrowRight size={13} />
        </Link>
        <Link className="aside-study-link" href="/math/">
          Real estate math
          <ArrowRight size={13} />
        </Link>
        <div className="aside-divider" />
        <p className="aside-note">Sources checked September 2026.</p>
        <Link className="text-link" href="/sources/">
          Editorial notes
          <ArrowRight size={13} />
        </Link>
      </aside>
    </div>
  )
}
