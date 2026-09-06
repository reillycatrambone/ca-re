import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function NotFound() {
  return (
    <div className="standard-page">
      <div className="eyebrow">404</div>
      <h1>Page not found</h1>
      <p className="page-description">This chapter or page is not available.</p>
      <Button asChild>
        <Link href="/">
          <ArrowLeft />
          Back to textbook
        </Link>
      </Button>
    </div>
  )
}
