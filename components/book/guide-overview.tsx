import type { GuidePoint } from '@/lib/study-guides/types'

export function GuideOverview({ points }: { points: GuidePoint[] }) {
  return (
    <dl className="guide-overview" id="core-distinctions">
      {points.map((point) => (
        <div key={point.label}>
          <dt>{point.label}</dt>
          <dd>{point.detail}</dd>
        </div>
      ))}
    </dl>
  )
}
