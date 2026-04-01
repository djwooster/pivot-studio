'use client'

import dynamic from 'next/dynamic'
import { AuditCard }       from '@/components/audit/ui/AuditCard'
import { Tag }             from '@/components/audit/ui/Tag'
import { SectionHeader }   from '@/components/audit/ui/SectionHeader'
import type { FinancialImpact as FI } from '@/types/audit'

const FinancialAreaChart = dynamic(() => import('./FinancialAreaChart'), {
  ssr:     false,
  loading: () => <div style={{ height: 200 }} />,
})

const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

const fmtDollar = (n: number) =>
  '$' + (n >= 1_000_000 ? (n/1_000_000).toFixed(1) + 'M' : n >= 1_000 ? Math.round(n/1_000) + 'K' : n.toLocaleString())

interface FinancialImpactProps { data: FI }

export function FinancialImpact({ data }: FinancialImpactProps) {
  const metrics = [
    { label: 'Est. labor cost recovered', value: fmtDollar(data.automationRecovery),   sub: `${data.annualHoursLost} hours/yr at $75/hr avg`, color: '#2D6A4F', soft: '#D8F3DC' },
    { label: 'Est. revenue unlocked',     value: fmtDollar(data.revenueUnlock),         sub: 'New capacity × conversion rate',                  color: '#4A3728', soft: '#F5F0EB' },
    { label: 'Total first-year value',    value: fmtDollar(data.totalFirstYearValue),   sub: 'Conservative estimate',                           color: '#1A1A1A', soft: '#F0EDE8' },
    { label: 'Monthly impact',            value: fmtDollar(data.monthlyImpact),          sub: 'Run-rate after implementation',                   color: '#2D6A8F', soft: '#EBF5FB' },
  ]

  return (
    <div style={{ marginBottom: '32px' }}>
      <SectionHeader
        title="Financial Impact Model"
        sub={<>{"Based on your inputs — "}{data.hoursWasted}{" hours/week of manual work — here's what AI and automation could realistically deliver in year one."}</>}
        tag={<Tag color="#2D6A4F" bg="#D8F3DC">Personalized</Tag>}
        subColor="#6B6860"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
        {metrics.map(({ label, value, sub, color, soft }) => (
          <div key={label} style={{ padding: '16px', background: soft, border: '1px solid #E8E5E0', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#959087', fontFamily: sans, fontWeight: 400, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
            <div style={{ fontSize: '44px', fontFamily: serif, fontWeight: 400, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#817c74', fontFamily: sans, marginTop: '4px', fontWeight: 400 }}>{sub}</div>
          </div>
        ))}
      </div>

      <AuditCard>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #E8E5E0' }}>
          <div style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A1A', fontFamily: sans }}>5-year revenue trajectory</div>
          <div style={{ fontSize: '12px', color: '#AEAAA4', fontFamily: sans, marginTop: '2px', fontWeight: 300 }}>With AI implementation vs. status quo</div>
        </div>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', gap: '20px', fontSize: '12px', marginBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: sans, color: '#6B6860' }}>
              <span style={{ width: '24px', height: '2px', background: '#2D6A4F', display: 'inline-block', borderRadius: '1px' }} /> With AI
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: sans, color: '#AEAAA4' }}>
              <span style={{ width: '24px', height: '0', borderTop: '2px dashed #dc2626', display: 'inline-block' }} /> Status quo
            </span>
          </div>
          <FinancialAreaChart data={data.projectionData} />
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #E8E5E0', background: '#FAFAF9' }}>
          <p style={{ fontSize: '11px', color: '#AEAAA4', fontFamily: sans, lineHeight: 1.5, fontWeight: 300, margin: 0 }}>
            Model assumes labor hours recovered via automation, industry-standard conversion lift, and compound growth from freed capacity. Individual results vary.
          </p>
        </div>
      </AuditCard>
    </div>
  )
}
