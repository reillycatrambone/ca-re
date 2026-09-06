'use client'

import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LessonActions() {
  return (
    <div className="lesson-actions">
      <Button
        variant="ghost"
        size="icon"
        title="Print lesson"
        aria-label="Print lesson"
        onClick={() => window.print()}
      >
        <Printer />
      </Button>
    </div>
  )
}
