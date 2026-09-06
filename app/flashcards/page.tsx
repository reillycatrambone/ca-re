import { getLessonSummaries } from '@/lib/content'
import { collectTerms } from '@/lib/terms'
import { Flashcards } from '@/components/study/flashcards'
export const metadata = { title: 'Flashcards' }
export default function FlashcardsPage() {
  return (
    <div className="standard-page">
      <Flashcards terms={collectTerms(getLessonSummaries())} />
    </div>
  )
}
