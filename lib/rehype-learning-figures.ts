import type { Element, Root, RootContent } from 'hast'
import type { LearningFigureSpec } from './learning-figures/types'

/** Close subsection figures before parent-section figures at the next heading boundary. */
export function rehypeLearningFigures({ figures }: { figures: LearningFigureSpec[] }) {
  return (tree: Root) => {
    const children: RootContent[] = []
    let pending: { figure: LearningFigureSpec; depth: number }[] = []
    const flush = (depth: number) => {
      const closing = pending.filter((entry) => entry.depth >= depth)
      for (const { figure } of closing.sort((a, b) => b.depth - a.depth)) {
        const node: Element = {
          type: 'element',
          tagName: 'learning-figure',
          properties: { id: figure.id },
          children: [],
        }
        children.push(node)
      }
      pending = pending.filter((entry) => entry.depth < depth)
    }
    for (const node of tree.children) {
      if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
        const depth = node.tagName === 'h2' ? 2 : 3
        flush(depth)
        pending.push(...figures
          .filter((figure) => figure.afterSection === node.properties.id)
          .map((figure) => ({ figure, depth })))
      }
      children.push(node)
    }
    flush(0)
    tree.children = children
  }
}
