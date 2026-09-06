import type { Metadata } from 'next'
import { Providers } from '@/providers'
import { BookShell } from '@/components/book/shell'
import { getLessonSummaries } from '@/lib/content'
import { siteUrl } from '@/lib/site'
import '@fontsource-variable/inter'
import 'katex/dist/katex.min.css'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'California Real Estate | Salesperson Exam Textbook',
    template: '%s | California Real Estate',
  },
  description:
    'An original California real estate salesperson exam textbook, with worked examples, chapter quizzes, flashcards, and timed practice exams.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'California Real Estate',
    description: 'An original salesperson exam textbook and study workspace.',
    images: [
      {
        url: '/images/residential-parcel.png',
        width: 1200,
        height: 800,
        alt: 'California residential parcel illustration',
      },
    ],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <BookShell lessons={getLessonSummaries()}>{children}</BookShell>
        </Providers>
      </body>
    </html>
  )
}
