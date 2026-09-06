import type { MetadataRoute } from 'next'
import { getLessons } from '@/lib/content'
import { siteUrl } from '@/lib/site'
export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
    ...['practice', 'flashcards', 'glossary', 'math', 'sources'].map((slug) => ({
      url: `${siteUrl}/${slug}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...getLessons().map((lesson) => ({
      url: `${siteUrl}/docs/${lesson.slug}/`,
      lastModified: lesson.reviewed,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
