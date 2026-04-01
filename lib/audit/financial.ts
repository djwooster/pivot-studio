import type { FinancialImpact, Track } from '@/types/audit'

const TRACK_MULTIPLIERS: Record<Track, { laborRecoveryRate: number; revenueMultipliers: number[] }> = {
  automate:     { laborRecoveryRate: 0.70, revenueMultipliers: [1.05, 1.12, 1.22, 1.38] },
  see_clearly:  { laborRecoveryRate: 0.45, revenueMultipliers: [1.03, 1.08, 1.16, 1.28] },
  build_better: { laborRecoveryRate: 0.55, revenueMultipliers: [1.06, 1.14, 1.24, 1.40] },
  combined:     { laborRecoveryRate: 0.65, revenueMultipliers: [1.08, 1.18, 1.30, 1.48] },
}

const BASE_REVENUE = [150_000, 400_000, 900_000, 2_500_000]

const AGGRESSIVE_TRACKS: Track[] = ['automate', 'build_better', 'combined']

export function calcFinancialImpact(
  answers: Record<number, number>,
  track: Track
): FinancialImpact {
  const { laborRecoveryRate, revenueMultipliers } = TRACK_MULTIPLIERS[track]
  const investIdx = Math.max(0, Math.min(3, (answers[8] ?? 1) - 1))

  const hoursWasted      = answers[2] ?? 10
  const annualHoursLost  = hoursWasted * 52
  const laborCostLost    = Math.round(annualHoursLost * 75)
  const automationRecovery = Math.round(laborCostLost * laborRecoveryRate)

  const revenueMultiplier = revenueMultipliers[investIdx]
  const baseRevenue       = BASE_REVENUE[investIdx]
  const revenueUnlock     = Math.round(baseRevenue * (revenueMultiplier - 1))

  const totalFirstYearValue = automationRecovery + revenueUnlock
  const monthlyImpact       = Math.round(totalFirstYearValue / 12)

  const growthRate  = AGGRESSIVE_TRACKS.includes(track) ? 1.38 : 1.28
  const projectionData = [0, 1, 2, 3, 4, 5].map(yr => ({
    year:       yr === 0 ? 'Now' : `Yr ${yr}`,
    withAI:     Math.round(baseRevenue * Math.pow(growthRate, yr)),
    withoutAI:  Math.round(baseRevenue * Math.pow(1.08, yr)),
  }))

  return {
    hoursWasted,
    annualHoursLost,
    laborCostLost,
    automationRecovery,
    revenueUnlock,
    totalFirstYearValue,
    monthlyImpact,
    projectionData,
  }
}
