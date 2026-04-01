import type { Tier } from '@/types/audit'
import { DIMENSION_LABELS } from './questions'

type QuestionMeta = {
  category: string
  type:     'slider' | 'single'
  inverted?: boolean  // higher answer = worse situation = lower score
  cap?:      number   // max score this dimension can reach (0–100)
}

// Base question map — used for automate + combined tracks
const BASE_QUESTION_MAP: Record<number, QuestionMeta> = {
  1: { category: 'current_state',        type: 'single' },
  2: { category: 'pain_intensity',       type: 'slider', inverted: true },
  3: { category: 'biggest_bottleneck',   type: 'single', cap: 50 },
  4: { category: 'cost_of_delay',        type: 'single' },
  5: { category: 'growth_potential',     type: 'single' },
  6: { category: 'ai_awareness',         type: 'single' },
  7: { category: 'decision_speed',       type: 'single' },
  8: { category: 'investment_readiness', type: 'single' },
}

// Track-specific overrides for Q6–Q8
const TRACK_QUESTION_OVERRIDES: Record<string, Record<number, QuestionMeta>> = {
  see_clearly: {
    6: { category: 'current_state',    type: 'single' },
    7: { category: 'ai_awareness',     type: 'single', inverted: true, cap: 50 },
    8: { category: 'revenue_impact',   type: 'single', inverted: true },
  },
  build_better: {
    6: { category: 'current_state',    type: 'single' },
    7: { category: 'ai_awareness',     type: 'single' },
    8: { category: 'revenue_impact',   type: 'single' },
  },
}

function getQuestionMap(track?: string): Record<number, QuestionMeta> {
  const overrides = track ? TRACK_QUESTION_OVERRIDES[track] : undefined
  if (!overrides) return BASE_QUESTION_MAP
  return { ...BASE_QUESTION_MAP, ...overrides }
}

const WEIGHTS: Record<string, number> = {
  revenue_impact: 1.2,
  current_state:  1.2,
}

export function computeScore(
  answers: Record<number, number>,
  track?: string
): { total: number; cats: Record<string, number> } {
  const questionMap = getQuestionMap(track)
  const cats: Record<string, number> = {}

  for (const [idStr, val] of Object.entries(answers)) {
    const id    = Number(idStr)
    const qInfo = questionMap[id]
    if (!qInfo || val == null) continue

    let score: number

    if (qInfo.type === 'slider') {
      const raw = Math.min(100, Math.round((val / 50) * 100))
      score = qInfo.inverted ? 100 - raw : raw
    } else {
      const raw = Math.round((val / 4) * 100)
      score = qInfo.inverted ? 100 - raw : raw
    }

    if (qInfo.cap !== undefined) {
      score = Math.min(score, qInfo.cap)
    }

    cats[qInfo.category] = score
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
