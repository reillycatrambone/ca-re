import type { ReactNode } from 'react'

export function ReadingSection({
  id,
  label,
  takeaway,
  children,
}: {
  id: string
  label: string
  takeaway: string
  children?: ReactNode
}) {
  return (
    <section className="reading-section" data-reading-section={id}>
      <div className="reading-section-heading">
        <div>
          <h2 id={id}>{label}</h2>
          {takeaway && <p className="section-takeaway">{takeaway}</p>}
        </div>
      </div>
      <div id={`${id}-body`} className="reading-section-content">
        {children}
      </div>
    </section>
  )
}

export function ReadingDetail({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children?: ReactNode
}) {
  return (
    <section className="reading-detail" data-reading-detail={id}>
      <h3 id={id}>{label}</h3>
      <div id={`${id}-detail`} className="reading-detail-content">
        {children}
      </div>
    </section>
  )
}
