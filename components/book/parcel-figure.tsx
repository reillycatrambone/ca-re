import type { LearningFigureSpec } from '@/lib/learning-figures/types'

export function ParcelFigure({
  figure,
}: {
  figure: Extract<LearningFigureSpec, { kind: 'parcel' }>
}) {
  const { width, height } = figure.extent
  const marker = Math.max(width, height) / 25
  const patternId = `${figure.id}-hatch`
  return (
    <div className="parcel-figure">
      <div className="parcel-scale">
        <span>North is up</span>
        <span>
          {figure.unit === 'schematic'
            ? 'Schematic / Not to scale'
            : `${width} × ${height} ${figure.unit}`}
        </span>
      </div>
      <svg
        className="parcel-plan"
        viewBox={`${-marker} ${-marker} ${width + marker * 2} ${height + marker * 2}`}
        role="img"
        aria-labelledby={`${figure.id}-map-title`}
        aria-describedby={`${figure.id}-map-desc`}
      >
        <title id={`${figure.id}-map-title`}>{`${figure.title}: parcel plan`}</title>
        <desc id={`${figure.id}-map-desc`}>
          {figure.areas.map((area) => `${area.key}: ${area.label}. ${area.description}`).join(' ')}{' '}
          {figure.lines?.map((line, index) => `Line ${index + 1}: ${line.label}.`).join(' ')}
        </desc>
        <defs>
          <pattern
            id={patternId}
            width={marker / 2}
            height={marker / 2}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={marker / 2}
              stroke="currentColor"
              strokeWidth={marker / 14}
            />
          </pattern>
        </defs>
        {figure.areas.map((area) => (
          <rect
            key={area.key}
            x={area.x}
            y={area.y}
            width={area.width}
            height={area.height}
            className={`parcel-area parcel-area-${area.pattern}`}
            fill={area.pattern === 'hatch' ? `url(#${patternId})` : undefined}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {figure.lines?.map((line, index) => (
          <g key={`${line.label}-${index}`}>
            <line
              x1={line.from.x}
              y1={line.from.y}
              x2={line.to.x}
              y2={line.to.y}
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={line.style === 'dashed' ? '6 4' : undefined}
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={line.labelAt?.x ?? (line.from.x + line.to.x) / 2}
              cy={line.labelAt?.y ?? (line.from.y + line.to.y) / 2}
              r={marker * 0.6}
              className="parcel-line-marker"
            />
            <text
              x={line.labelAt?.x ?? (line.from.x + line.to.x) / 2}
              y={line.labelAt?.y ?? (line.from.y + line.to.y) / 2}
              fontSize={marker * 0.7}
              textAnchor="middle"
              dominantBaseline="central"
              className="parcel-key"
            >
              {index + 1}
            </text>
          </g>
        ))}
        {figure.areas.map((area) => (
          <g key={`${area.key}-label`}>
            <circle
              cx={area.labelAt?.x ?? area.x + area.width / 2}
              cy={area.labelAt?.y ?? area.y + area.height / 2}
              r={marker * 0.75}
              className="parcel-area-marker"
            />
            <text
              x={area.labelAt?.x ?? area.x + area.width / 2}
              y={area.labelAt?.y ?? area.y + area.height / 2}
              fontSize={marker}
              textAnchor="middle"
              dominantBaseline="central"
              className="parcel-key"
            >
              {area.key}
            </text>
          </g>
        ))}
      </svg>
      <dl className="parcel-legend">
        {figure.areas.map((area) => (
          <div key={area.key}>
            <dt>
              <span className="parcel-legend-key" aria-hidden="true">
                {area.key}
              </span>
              {area.label}
            </dt>
            <dd>{area.description}</dd>
          </div>
        ))}
        {figure.lines?.map((line, index) => (
          <div key={`${line.label}-${index}`}>
            <dt>Line {index + 1}</dt>
            <dd>{line.label}</dd>
          </div>
        ))}
      </dl>
      <p className="evidence-conclusion">{figure.conclusion}</p>
    </div>
  )
}
