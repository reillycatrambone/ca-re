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
