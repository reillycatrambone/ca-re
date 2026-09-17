import { test, expect } from '@playwright/test'
import { getQuestions } from '../lib/content'
import { createStudySession } from '../lib/exam'
import { readFileSync } from 'node:fs'

test('a session transferred from the old address keeps answers, flags, and position', async ({
  page,
}) => {
  const session = createStudySession({ questions: getQuestions().slice(0, 10), mode: 'practice' })
  session.answers[session.questionIds[0]] = 2
  session.flags = [session.questionIds[1]]
  session.current = 3
  const hash = new URLSearchParams({ study: JSON.stringify({ session }) })
  await page.goto(`/transfer/#${hash}`)
  await expect(page.getByRole('status')).toHaveText('Your saved session is ready to restore.')
  expect(new URL(page.url()).hash).toBe('')
  await page.getByRole('button', { name: 'Restore saved session', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Your session is saved')
  await page.getByRole('link', { name: 'Continue in Practice', exact: true }).click()
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))
  expect(saved.session).toEqual(session)
  await page.reload()
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))).toEqual(
    saved
  )
})

test('invalid backups cannot replace an existing session', async ({ page }) => {
  const session = createStudySession({ questions: getQuestions().slice(0, 10), mode: 'practice' })
  await page.goto('/transfer/')
  await page.evaluate(
    (value) => localStorage.setItem('ca-re:study:v1', JSON.stringify({ session: value })),
    session
  )
  await page.goto('/transfer/#study=not-json')
  await page.reload()
  // Reloading a cleared hash does not affect the existing saved session.
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))).toEqual({
    session,
  })
  await page
    .getByLabel('Choose a session backup')
    .setInputFiles({
      name: 'invalid.json',
      mimeType: 'application/json',
      buffer: Buffer.from('{"session":{"questionIds":[]}}'),
    })
  await expect(page.getByRole('status')).toContainText('not a valid')
  await expect(
    page.getByRole('button', { name: /Restore saved session|Replace saved session/ })
  ).toHaveCount(0)
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))).toEqual({
    session,
  })
})

test('backup files can restore a session without the old website', async ({ page }) => {
  const session = createStudySession({ questions: getQuestions().slice(0, 10), mode: 'practice' })
  await page.goto('/transfer/')
  await page
    .getByLabel('Choose a session backup')
    .setInputFiles({
      name: 'backup.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify({ session })),
    })
  await page.getByRole('button', { name: 'Restore saved session', exact: true }).click()
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download saved session', exact: true }).click()
  const download = await downloadPromise
  const stream = await download.createReadStream()
  const chunks = []
  for await (const chunk of stream!) chunks.push(chunk)
  expect(JSON.parse(Buffer.concat(chunks).toString())).toEqual({ session })
})

test('the old-site bridge carries a saved session to the new origin', async ({
  page,
  baseURL,
}) => {
  const session = createStudySession({ questions: getQuestions().slice(0, 10), mode: 'practice' })
  session.answers[session.questionIds[0]] = 1
  const bridge = readFileSync('scripts/vercel-retirement/index.html', 'utf8').replaceAll(
    'https://ca-re.reillycatrambone.com',
    baseURL!
  )
  await page.addInitScript((value) => {
    if (location.hostname === 'old-study.example')
      localStorage.setItem('ca-re:study:v1', JSON.stringify({ session: value }))
  }, session)
  await page.route('https://old-study.example/**', (route) =>
    route.fulfill({ contentType: 'text/html', body: bridge })
  )
  await page.goto('https://old-study.example/practice/')
  await expect(page).toHaveURL(new RegExp('/transfer/$'))
  await expect(page.getByRole('status')).toHaveText('Your saved session is ready to restore.')
  await page.getByRole('button', { name: 'Restore saved session', exact: true }).click()
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ca-re:study:v1')!))).toEqual({
    session,
  })
})
