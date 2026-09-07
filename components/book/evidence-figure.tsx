import type { LearningFigureSpec } from '@/lib/learning-figures/types'

type EvidenceFigureSpec = Extract<LearningFigureSpec, { kind: 'document' | 'timeline' | 'ledger' }>
const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export function EvidenceFigure({ figure }: { figure: EvidenceFigureSpec }) {
  if (figure.kind === 'document')
    return (
      <div className="document-specimen">
        <header className="specimen-header">
          <span>Fictional educational excerpt / Not for execution</span>
          <h4>{figure.documentTitle}</h4>
          <p>{figure.context}</p>
        </header>
        <ol className="specimen-fields">
          {figure.fields.map((field, index) => (
            <li key={field.label}>
              <div className="specimen-field">
                <span className="evidence-marker" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <strong>{field.label}</strong>
                  <span>{field.value}</span>
                </div>
              </div>
              <p className="specimen-annotation">{field.annotation}</p>
            </li>
          ))}
        </ol>
        <p className="evidence-conclusion">{figure.conclusion}</p>
      </div>
    )
  if (figure.kind === 'timeline')
    return (
      <div className="evidence-timeline">
        <p className="evidence-premise">{figure.premise}</p>
        <ol>
          {figure.events.map((event, index) => (
            <li key={`${event.label}-${index}`}>
              <span className="timeline-when">{event.when}</span>
              <div>
                <strong>{event.label}</strong>
                <p>{event.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="evidence-conclusion">{figure.conclusion}</p>
      </div>
    )
  return (
    <div className="evidence-ledger">
      <div className="ledger-header">
        <strong>{figure.account}</strong>
        <span>Fictional transaction record</span>
      </div>
      <div className="ledger-opening">
        <span>Opening balance</span>
        <strong>{money.format(figure.openingBalance)}</strong>
      </div>
      <table>
        <caption className="sr-only">
          {figure.account}: receipts, disbursements, and running balances
        </caption>
        <thead>
          <tr>
            <th scope="col">Entry</th>
            <th scope="col">In</th>
            <th scope="col">Out</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {figure.entries.map((entry, index) => (
            <tr key={`${entry.label}-${index}`}>
              <th scope="row">{entry.label}</th>
              <td data-label="In">{money.format(entry.received)}</td>
              <td data-label="Out">{money.format(entry.paid)}</td>
              <td data-label="Balance">{money.format(entry.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="evidence-conclusion">{figure.conclusion}</p>
    </div>
  )
}
