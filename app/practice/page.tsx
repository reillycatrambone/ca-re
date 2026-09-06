import { getQuestions } from '@/lib/content'
import { Practice } from '@/components/study/practice'
export const metadata = { title: 'Practice' }
export default function PracticePage() {
  return (
    <div className="standard-page">
      <Practice bank={getQuestions()} />
    </div>
  )
}
