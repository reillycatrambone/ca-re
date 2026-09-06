'use client'

import { useState } from 'react'
import type { CaseLab } from '@/lib/study-guides/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLabAnchor } from './use-lab-anchor'

export function SequenceLab({ lab }: { lab: Extract<CaseLab, { kind: 'sequence' }> }) {
  const [active, setActive] = useState(0)
  useLabAnchor('transaction-stage', lab.steps.length, setActive)
  return (
    <Tabs
      value={String(active)}
      onValueChange={(value) => setActive(Number(value))}
      orientation="vertical"
      className="sequence-lab"
    >
      <TabsList aria-label="Transaction stages">
        {lab.steps.map((step, index) => (
          <TabsTrigger key={step.label} value={String(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {step.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="sequence-stage">
        {lab.steps.map((step, index) => (
          <TabsContent key={step.label} value={String(index)} forceMount className="lab-panel">
            <h3 id={`transaction-stage-${index + 1}`}>{step.label}</h3>
            <p className="stage-action">{step.action}</p>
            <dl>
              <div>
                <dt>Evidence to check</dt>
                <dd>{step.evidence}</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>{step.warning}</dd>
              </div>
            </dl>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
