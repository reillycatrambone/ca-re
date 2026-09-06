import MiniSearch, { type Options } from 'minisearch'

export interface SearchEntry {
  id: string
  title: string
  text: string
  domain: string
  href: string
  lessonTitle: string
}
export const searchOptions: Options<SearchEntry> = {
  fields: ['title', 'text', 'lessonTitle'],
  storeFields: ['title', 'domain', 'href', 'lessonTitle', 'text'],
  searchOptions: {
    boost: { title: 4, lessonTitle: 2 },
    prefix: true,
    fuzzy: 0.15,
    combineWith: 'AND',
  },
}
export function createSearch(entries: SearchEntry[]) {
  const search = new MiniSearch<SearchEntry>(searchOptions)
  search.addAll(entries)
  return search
}
