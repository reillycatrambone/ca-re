import { ChevronDown } from 'lucide-react'
import {
  chartDomain,
  chartLeftInset,
  chartPosition,
  formatChartValue,
  type ChartSpec,
} from '@/lib/learning-figures/chart'

const lineStyles = [undefined, '9 5', '2 5', '10 4 2 4']

export function ChartFigure({ figure }: { figure: ChartSpec }) {
  const points = figure.series.flatMap((series) => series.points)
  const xDomain = chartDomain(points.map((point) => point.x))
  const yDomain = chartDomain(points.map((point) => point.y))
  const ticks = [0, 0.5, 1]
  const yTicks = ticks.map((fraction) => {
    const value = yDomain[0] + fraction * (yDomain[1] - yDomain[0])
    return { value, label: formatChartValue(value, figure.yAxis.format, true) }
  })
  const plotLeft = chartLeftInset(yTicks.map((tick) => tick.label))
  const x = (value: number) => chartPosition(value, xDomain, plotLeft, 480)
  const y = (value: number) => chartPosition(value, yDomain, 266, 24)
  return (
    <div className="teaching-chart">
      <div className="chart-axis-heading">{figure.yAxis.label}</div>
      <svg
        viewBox="0 0 520 318"
        className="teaching-chart-plot"
        role="img"
        aria-labelledby={`${figure.id}-plot-title`}
        aria-describedby={`${figure.id}-plot-description`}
      >
        <title
          id={`${figure.id}-plot-title`}
        >{`${figure.title}: ${figure.yAxis.label} by ${figure.xAxis.label}`}</title>
        <desc id={`${figure.id}-plot-description`}>
          {figure.conclusion} Exact coordinates are provided in the Values table.
        </desc>
        {yTicks.map(({ value, label }) => {
          return (
            <g key={`y-${value}`}>
              <line
                x1={plotLeft}
                x2="480"
                y1={y(value)}
                y2={y(value)}
                className="chart-grid-line"
              />
              <text x={plotLeft - 12} y={y(value)} dy="0.35em" textAnchor="end">
                {label}
              </text>
            </g>
          )
        })}
        {ticks.map((fraction) => {
          const value = xDomain[0] + fraction * (xDomain[1] - xDomain[0])
          return (
            <g key={`x-${fraction}`}>
              <line x1={x(value)} x2={x(value)} y1="266" y2="274" className="chart-axis-line" />
              <text x={x(value)} y="301" textAnchor="middle">
                {formatChartValue(value, figure.xAxis.format, true)}
              </text>
            </g>
          )
        })}
        <path d={`M${plotLeft} 24V266H480`} className="chart-axis-line" />
        {figure.series.map((series, index) => (
          <g key={series.label} className="chart-series">
            <polyline
              points={series.points.map((point) => `${x(point.x)},${y(point.y)}`).join(' ')}
              strokeDasharray={lineStyles[index]}
              fill="none"
            />
            {series.points.map((point) =>
              index % 2 === 0 ? (
                <circle key={point.x} cx={x(point.x)} cy={y(point.y)} r="4" />
              ) : (
                <rect key={point.x} x={x(point.x) - 4} y={y(point.y) - 4} width="8" height="8" />
              )
            )}
          </g>
        ))}
      </svg>
      <div className="chart-axis-heading chart-axis-bottom">{figure.xAxis.label}</div>
      <ul className="chart-legend">
        {figure.series.map((series, index) => (
          <li key={series.label}>
            <svg viewBox="0 0 36 12" aria-hidden="true">
              <line x1="0" x2="36" y1="6" y2="6" strokeDasharray={lineStyles[index]} />
            </svg>
            <span>{series.label}</span>
          </li>
        ))}
      </ul>
      <p className="evidence-conclusion">{figure.conclusion}</p>
      <details className="chart-values">
        <summary>
          <ChevronDown size={15} aria-hidden="true" />
          Values
        </summary>
        <div className="chart-data">
          <table>
            <caption>{figure.title}: plotted values</caption>
            <thead>
              <tr>
                <th scope="col">Series</th>
                <th scope="col">{figure.xAxis.label}</th>
                <th scope="col">{figure.yAxis.label}</th>
              </tr>
            </thead>
            <tbody>
              {figure.series.flatMap((series) =>
                series.points.map((point) => (
                  <tr key={`${series.label}-${point.x}`}>
                    <th scope="row">{series.label}</th>
                    <td>{formatChartValue(point.x, figure.xAxis.format)}</td>
                    <td>{formatChartValue(point.y, figure.yAxis.format)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  )
}
