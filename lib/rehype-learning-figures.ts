import type { Element, Root, RootContent } from 'hast'
import type { LearningFigureSpec } from './learning-figures/types'

/** Append each figure to its H2 section, preserving the existing MDX heading IDs. */
export function rehypeLearningFigures({ figures }: { figures: LearningFigureSpec[] }) {
  return (tree: Root) => {
    const children: RootContent[] = []
    let pending: LearningFigureSpec[] = []
    const flush = () => {
      for (const figure of pending) {
        const node: Element = {
          type: 'element',
          tagName: 'learning-figure',
          properties: { id: figure.id },
          children: [],
        }
        children.push(node)
      }
      pending = []
    }
    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'h2') {
        flush()
        pending = figures.filter((figure) => figure.afterSection === node.properties.id)
      }
      children.push(node)
    }
    flush()
    tree.children = children
  }
}
