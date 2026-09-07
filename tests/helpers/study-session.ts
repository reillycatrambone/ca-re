import type { Page } from '@playwright/test'
import { getQuestions } from '../../lib/content'
import { createStudySession } from '../../lib/exam'

export async function seedLongPractice(page: Page) {
  const session = createStudySession({ questions: getQuestions().slice(0, 150), mode: 'practice' })
  await page.goto('/practice/')
  await page.evaluate((value) => {
    localStorage.setItem('ca-re:study:v1', JSON.stringify({ session: value }))
  }, session)
  await page.reload()
  return session
}
