import { getLessonSummaries } from '@/lib/content'
import { Progress } from '@/components/study/progress'
export const metadata = { title: 'Progress', robots: { index: false, follow: true } }
export default function ProgressPage() {
  return (
    <div className="standard-page">
      <Progress lessons={getLessonSummaries()} />
    </div>
  )
}
