'use client'

import dynamic from 'next/dynamic'
import { AuditCard }      from '@/components/audit/ui/AuditCard'
import { SectionHeader }  from '@/components/audit/ui/SectionHeader'
import { DIMENSION_LABELS } from '@/lib/audit/questions'

const BenchmarkChartInner = dynamic(() => import('./BenchmarkChartInner'), {
  ssr:     false,
  loading: () => <div style={{ height: 220 }} />,
})

const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

// Fixed industry benchmarks per dimension
const INDUSTRY_AVG: Record<string, number> = {
  current_state:        45,
  pain_intensity:       52,
  growth_trajectory:    58,
  tech_readiness:       48,
  decision_speed:       55,
  ai_awareness:         38,
  revenue_impact:       50,
  investment_readiness: 44,
}

interface BenchmarkChartProps { cats: Record<string, number> }

export function BenchmarkChart({ cats }: BenchmarkChartProps) {
  const data = Object.entries(cats).slice(0, 6).map(([k, v]) => ({
    name: DIMENSION_LABELS[k]?.split(' ')[0] ?? k,
    you:  v,
    avg:  INDUSTRY_AVG[k] ?? 48,
  }))

  return (
    <div style={{ marginBottom: '32px' }}>
      <SectionHeader title="Industry Benchmark" sub="Your scores vs. businesses at a similar stage" />
      <AuditCard>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', gap: '20px', fontSize: '12px', marginBottom: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: sans, color: '#6B6860' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#1A1A1A', display: 'inline-block' }} /> You
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: sans, color: '#AEAAA4' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#E8E5E0', display: 'inline-block' }} /> Industry avg
            </span>
          </div>
          <BenchmarkChartInner data={data} />
        </div>
      </AuditCard>
    </div>
  )
}
