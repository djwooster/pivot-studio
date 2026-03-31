export type Track = 'automate' | 'see_clearly' | 'build_better' | 'combined'
export type Stage = 'landing' | 'track_select' | 'quiz' | 'mid_hook' | 'capture' | 'submitted'

export interface Option {
  label: string
  sub: string
  value: number
}

export interface SliderBand {
  max: number
  label: string
}

export interface Question {
  id: number
  category: string
  label: string
  question: string
  subtext: string
  type: 'single' | 'slider'
  options?: Option[]
  min?: number
  max?: number
  step?: number
  unit?: string
  bands?: SliderBand[]
}

export interface Tier {
  min: number
  max: number
  name: string
  percentile: string
  color: string
  soft: string
}

export interface FinancialImpact {
  hoursWasted: number
  annualHoursLost: number
  laborCostLost: number
  automationRecovery: number
  revenueUnlock: number
  totalFirstYearValue: number
  monthlyImpact: number
  projectionData: Array<{ year: string; withAI: number; withoutAI: number }>
}

export interface AuditLead {
  name: string
  email: string
  company: string
  role: string
}

export interface AuditSubmission {
  id: string
  created_at: string
  name: string
  email: string
  company: string
  role: string
  track: Track
  answers: Record<number, number>
  score: number
  tier: string
  cats: Record<string, number>
  financial_impact: FinancialImpact
  top_gap: string
  source: string
  pdf_url: string | null
  cta_clicked: string | null
  results_url: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}
