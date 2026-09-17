import { getAllQuestions } from '@/lib/content'
import { StudyTransfer } from '@/components/study/study-transfer'

export const metadata = { title: 'Move your saved session', robots: { index: false } }

export default function TransferPage() {
  return (
    <div className="standard-page">
      <StudyTransfer bank={getAllQuestions()} />
    </div>
  )
}
