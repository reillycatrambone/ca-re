import type { LearningFigureSpec } from '@/lib/learning-figures/types'

type Relationship = Extract<LearningFigureSpec, { kind: 'relationship' }>

function labelLines(label: string) {
  const lines: string[] = []
  for (const word of label.split(' ')) {
    const last = lines.at(-1)
    if (last && `${last} ${word}`.length <= 17) lines[lines.length - 1] += ` ${word}`
    else lines.push(word)
  }
  return lines
}

function DiagramLabel({ label, x, y }: { label: string; x: number; y: number }) {
  const lines = labelLines(label)
  return (
    <text textAnchor="middle" dominantBaseline="middle">
      {lines.map((line, index) => (
        <tspan key={`${line}-${index}`} x={x} y={y + (index - (lines.length - 1) / 2) * 19}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

export function RelationshipFigure({ figure }: { figure: Relationship }) {
  const positions =
    figure.nodes.length === 3
      ? [
          [120, 60],
          [600, 60],
          [360, 310],
        ]
      : [
          [120, 60],
          [600, 60],
          [120, 300],
          [600, 300],
        ]

  return (
    <div className="relationship-figure">
      <div className="relationship-center">
        <strong>{figure.center.label}</strong>
        <p>{figure.center.detail}</p>
      </div>
      <svg className="relationship-map" viewBox="0 0 720 365" aria-hidden="true" focusable="false">
        {positions.map(([x, y], index) => (
          <g key={figure.nodes[index].label}>
            <line x1="360" y1="180" x2={x} y2={y} className="relationship-edge" />
            <rect
              x={(360 + x) / 2 - 75}
              y={(180 + y) / 2 - 12}
              width="150"
              height="24"
              className="relationship-edge-label"
            />
            <text
              x={(360 + x) / 2}
              y={(180 + y) / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="relationship-connection"
            >
              {figure.nodes[index].connection}
            </text>
            <rect
              x={x - 100}
              y={y - 30}
              width="200"
              height="60"
              rx="4"
              className="relationship-node"
            />
            <DiagramLabel label={figure.nodes[index].label} x={x} y={y} />
          </g>
        ))}
        <rect x="258" y="145" width="204" height="70" rx="4" className="relationship-hub" />
        <g className="relationship-hub-label">
          <DiagramLabel label={figure.center.label} x={360} y={180} />
        </g>
      </svg>
      <dl className="relationship-details">
        {figure.nodes.map((node) => (
          <div key={node.label}>
            <dt>
              {node.label}
              <span>{node.connection}</span>
            </dt>
            <dd>{node.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
