import { GitCompareArrows, ListOrdered, Calculator, Route } from 'lucide-react'
import type { CaseLab as Lab } from '@/lib/study-guides/types'
import { ContrastLab } from './contrast-lab'
import { SequenceLab } from './sequence-lab'
import { DecisionLab } from './decision-lab'
import { CalculationLab } from './calculation-lab'

const icons = {
  contrast: GitCompareArrows,
  sequence: ListOrdered,
  decision: Route,
  calculation: Calculator,
}
const labels = {
  contrast: 'Change one fact',
  sequence: 'Follow the transaction',
  decision: 'Make the call',
  calculation: 'Work the numbers',
}

export function CaseLab({ lab }: { lab: Lab }) {
  const Icon = icons[lab.kind]
  return (
    <section
      id="case-lab"
      className={`case-lab case-lab-${lab.kind}`}
      aria-labelledby="case-lab-title"
    >
      <div className="lab-eyebrow">
        <Icon size={15} />
        {labels[lab.kind]}
      </div>
      <h2 id="case-lab-title">{lab.title}</h2>
      <p className="lab-setup">{lab.setup}</p>
      {lab.kind === 'contrast' && <ContrastLab lab={lab} />}
      {lab.kind === 'sequence' && <SequenceLab lab={lab} />}
      {lab.kind === 'decision' && <DecisionLab lab={lab} />}
      {lab.kind === 'calculation' && <CalculationLab lab={lab} />}
      <p className="lab-takeaway">
        <strong>Takeaway</strong>
        {lab.takeaway}
      </p>
      <a className="lab-sources" href="#sources">
        Chapter sources
      </a>
    </section>
  )
}
