'use client'

import { ThemeProvider } from 'next-themes'
import { StudyProvider } from '@/components/study/study-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <StudyProvider>{children}</StudyProvider>
    </ThemeProvider>
  )
}
