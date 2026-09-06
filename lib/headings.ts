import GithubSlugger from 'github-slugger'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'

export function getHeadings(markdown: string) {
  const slugger = new GithubSlugger()
  const headings: { depth: number; text: string; id: string }[] = []
  const tree = unified().use(remarkParse).parse(markdown)
  visit(tree, 'heading', (node) => {
    const text = toString(node)
    headings.push({ depth: node.depth, text, id: slugger.slug(text) })
  })
  return headings
}
