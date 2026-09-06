import type { Element, ElementContent, Root, RootContent } from 'hast'

function nodeText(node: RootContent): string {
  if (node.type === 'text') return node.value
  return 'children' in node ? node.children.map(nodeText).join('') : ''
}

function wrapDetails(nodes: ElementContent[]): ElementContent[] {
  const output: ElementContent[] = []
  let detail: Element | undefined
  for (const node of nodes) {
    if (node.type === 'element' && node.tagName === 'h3') {
      detail = {
        type: 'element',
        tagName: 'reading-detail',
        properties: { id: node.properties.id, label: nodeText(node) },
        children: [],
      }
      output.push(detail)
    } else if (node.type === 'element' && node.tagName === 'learning-figure') {
      // A section figure belongs to the section, not to its final optional detail.
      detail = undefined
      output.push(node)
    } else if (detail) detail.children.push(node)
    else output.push(node)
  }
  return output
}

export function rehypeReadingSections({
  takeaways = [],
}: {
  takeaways?: { id: string; takeaway: string }[]
}) {
  return (tree: Root) => {
    const output: RootContent[] = []
    let section: Element | undefined
    let index = 0
    const finish = () => {
      if (section) section.children = wrapDetails(section.children)
    }
    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'h2') {
        finish()
        const id = String(node.properties.id)
        section = {
          type: 'element',
          tagName: 'reading-section',
          properties: {
            id,
            label: nodeText(node),
            number: ++index,
            takeaway: takeaways.find((entry) => entry.id === id)?.takeaway ?? '',
          },
          children: [],
        }
        output.push(section)
      } else if (section && node.type !== 'doctype' && node.type !== 'mdxjsEsm')
        section.children.push(node)
      else output.push(node)
    }
    finish()
    tree.children = output
  }
}
