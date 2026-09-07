import type { CSSProperties } from 'react'
import { learningFigures } from '@/lib/learning-figures'
import { CapitalizationFigure } from './capitalization-figure'
import { RelationshipFigure } from './relationship-figure'
import { EvidenceFigure } from './evidence-figure'
import { ParcelFigure } from './parcel-figure'
import { ChartFigure } from './chart-figure'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function LearningFigure({ id }: { id: string }) {
  const figure = learningFigures.find((figure) => figure.id === id)
  if (!figure) throw new Error(`Unknown learning figure: ${id}`)
  return (
    <figure
      id={id}
      className={`learning-figure learning-figure-${figure.kind}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="learning-figure-heading" id={`${id}-title`}>
        {figure.title}
      </div>
      {(figure.kind === 'document' || figure.kind === 'timeline' || figure.kind === 'ledger') && (
        <EvidenceFigure figure={figure} />
      )}
      {figure.kind === 'process' && (
        <ol className="figure-process" style={{ '--steps': figure.steps.length } as CSSProperties}>
          {figure.steps.map((step, index) => (
            <li key={step.label}>
              <span className="figure-step-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <strong>{step.label}</strong>
              <span>{step.detail}</span>
            </li>
          ))}
        </ol>
      )}
      {figure.kind === 'comparison' && (
        <dl className="figure-comparison">
          {figure.columns.map((column) => (
            <div key={column.label}>
              <dt>{column.label}</dt>
              <dd>
                <ul>
                  {column.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      )}
      {figure.kind === 'decision' && (
        <div className="figure-decision">
          <p className="figure-question">{figure.question}</p>
          <dl className="figure-branches">
            {figure.branches.map((branch) => (
              <div key={branch.label}>
                <dt>{branch.label}</dt>
                <dd>
                  <span>{branch.detail}</span>
                  <strong>{branch.outcome}</strong>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {figure.kind === 'calculation' && (
        <div className="figure-calculation">
          <dl>
            {figure.rows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{currency.format(row.amount)}</dd>
              </div>
            ))}
          </dl>
          <div className="figure-result">
            <strong>{figure.result.label}</strong>
            <span>{currency.format(figure.result.amount)}</span>
          </div>
          <p className="figure-result-detail">{figure.result.detail}</p>
        </div>
      )}
      {figure.kind === 'allocation' && (
        <div className="figure-allocation">
          <div className="figure-allocation-bar" aria-hidden="true">
            {figure.segments.map((segment, index) => (
              <span
                key={`${segment.label}-${index}`}
                style={{ flex: segment.amount / figure.total }}
              />
            ))}
          </div>
          <dl className="figure-allocation-legend">
            {figure.segments.map((segment, index) => (
              <div key={`${segment.label}-${index}`}>
                <dt>
                  <span
                    className={`allocation-swatch allocation-swatch-${index}`}
                    aria-hidden="true"
                  />
                  {segment.label}
                </dt>
                <dd>{segment.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {figure.kind === 'capitalization' && <CapitalizationFigure />}
      {figure.kind === 'relationship' && <RelationshipFigure figure={figure} />}
      {figure.kind === 'parcel' && <ParcelFigure figure={figure} />}
      {figure.kind === 'chart' && <ChartFigure figure={figure} />}
      <figcaption>
        {figure.caption} <a href="#sources">Chapter sources</a>
      </figcaption>
    </figure>
  )
}
