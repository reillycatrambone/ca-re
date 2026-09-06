import { getLessonSummaries } from '@/lib/content'
import { collectTerms } from '@/lib/terms'
import { Glossary } from '@/components/study/glossary'
export const metadata = { title: 'Glossary' }
export default function GlossaryPage() {
  return (
    <div className="standard-page">
      <div className="eyebrow">Reference / Glossary</div>
      <h1>Glossary</h1>
      <p className="page-description">
        The language of California real estate, from accession to zoning.
      </p>
      <Glossary terms={collectTerms(getLessonSummaries())} />
    </div>
  )
}
