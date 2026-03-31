import type { Tier } from '@/types/audit'
import { DIMENSION_LABELS } from './questions'

const QUESTION_MAP: Record<number, { category: string; type: 'slider' | 'single' }> = {
  1: { category: 'pain_intensity',       type: 'slider' },
  2: { category: 'growth_trajectory',    type: 'single' },
  3: { category: 'tech_readiness',       type: 'single' },
  4: { category: 'decision_speed',       type: 'single' },
  5: { category: 'investment_readiness', type: 'single' },
  6: { category: 'current_state',        type: 'single' },
  7: { category: 'ai_awareness',         type: 'single' },
  8: { category: 'revenue_impact',       type: 'single' },
}

const WEIGHTS: Record<string, number> = {
  revenue_impact: 1.2,
  current_state:  1.2,
}

export function computeScore(
  answers: Record<number, number>
): { total: number; cats: Record<string, number> } {
  const cats: Record<string, number> = {}

  for (const [idStr, val] of Object.entries(answers)) {
    const id = Number(idStr)
    const qInfo = QUESTION_MAP[id]
    if (!qInfo || val == null) continue

    if (qInfo.type === 'slider') {
      cats[qInfo.category] = Math.min(100, Math.round((val / 50) * 100))
    } else {
      cats[qInfo.category] = Math.round((val / 4) * 100)
    }
  }

  let weightedSum = 0
  let totalWeight = 0

  for (const [cat, score] of Object.entries(cats)) {
    const w = WEIGHTS[cat] ?? 1
    weightedSum += score * w
    totalWeight += w
  }

  const total = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0
  return { total, cats }
}

export const TIERS: Tier[] = [
  { min: 0,  max: 29,  name: 'Operational Novice',        percentile: 'bottom 30%', color: '#8B8B8B', soft: '#F4F4F4' },
  { min: 30, max: 54,  name: 'Emerging Optimizer',        percentile: 'top 55%',    color: '#B07D3A', soft: '#FDF6EC' },
  { min: 55, max: 74,  name: 'Scaling Operator',          percentile: 'top 28%',    color: '#2D6A8F', soft: '#EBF5FB' },
  { min: 75, max: 100, name: 'High-Performance Operator', percentile: 'top 8%',     color: '#2D6A4F', soft: '#EEF8F2' },
]

export function getTier(score: number): Tier {
  return TIERS.find(t => score >= t.min && score <= t.max) ?? TIERS[0]
}

export function getTopGap(cats: Record<string, number>): string {
  const entries = Object.entries(cats)
  if (!entries.length) return 'Review full report'
  const [lowestCat] = entries.sort(([, a], [, b]) => a - b)[0]
  return DIMENSION_LABELS[lowestCat] ?? 'Review full report'
}
