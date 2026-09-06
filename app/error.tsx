'use client'
import { Button } from '@/components/ui/button'
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="standard-page">
      <h1>This page could not load</h1>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
