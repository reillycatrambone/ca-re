'use client'

import { useState } from 'react'
import type { CaseLab } from '@/lib/study-guides/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLabAnchor } from './use-lab-anchor'

export function ContrastLab({ lab }: { lab: Extract<CaseLab, { kind: 'contrast' }> }) {
  const [active, setActive] = useState(0)
  useLabAnchor('case-variation', lab.cases.length, setActive)
  return (
    <Tabs
      value={String(active)}
      onValueChange={(value) => setActive(Number(value))}
      className="contrast-lab"
    >
      <TabsList aria-label="Case variations">
        {lab.cases.map((item, index) => (
          <TabsTrigger key={item.label} value={String(index)}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {lab.cases.map((item, index) => (
        <TabsContent key={item.label} value={String(index)} forceMount className="lab-panel">
          <h3 className="lab-print-title">{item.label}</h3>
          <dl className="contrast-fact" id={`case-variation-${index + 1}`}>
            <dt>Changed fact</dt>
            <dd>{item.changedFact}</dd>
          </dl>
          <div className="contrast-outcome">
            <strong>{item.result}</strong>
            <ul>
              {item.reasoning.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
