export function formatCount(value: number, decimals: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function interpolateCount(target: number, progress: number, decimals: number) {
  const clamped = Math.min(1, Math.max(0, progress))
  const factor = 10 ** decimals
  return Math.round(target * clamped * factor) / factor
}
