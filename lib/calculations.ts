export function monthlyPayment(principal: number, annualRate: number, years: number) {
  if (
    ![principal, annualRate, years].every(Number.isFinite) ||
    principal < 0 ||
    annualRate < 0 ||
    years <= 0
  )
    return null
  const months = years * 12
  const rate = annualRate / 100 / 12
  return rate === 0 ? principal / months : (principal * rate) / (1 - (1 + rate) ** -months)
}

export function capitalizedValue(annualNoi: number, capRatePercent: number) {
  if (![annualNoi, capRatePercent].every(Number.isFinite) || annualNoi < 0 || capRatePercent <= 0)
    return null
  const value = annualNoi / (capRatePercent / 100)
  return Number.isFinite(value) ? value : null
}
