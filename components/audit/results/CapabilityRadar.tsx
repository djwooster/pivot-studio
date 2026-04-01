'use client'

import dynamic from 'next/dynamic'
import { AuditCard }      from '@/components/audit/ui/AuditCard'
import { SectionHeader }  from '@/components/audit/ui/SectionHeader'
import { DIMENSION_LABELS } from '@/lib/audit/questions'

const RadarChartInner = dynamic(() => import('./RadarChartInner'), {
  ssr:     false,
  loading: () => <div style={{ height: 300 }} />,
})

const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

interface CapabilityRadarProps { cats: Record<string, number> }

export function CapabilityRadar({ cats }: CapabilityRadarProps) {
  const data = Object.entries(cats).map(([k, v]) => ({
    subject: DIMENSION_LABELS[k]?.split(' ')[0] ?? k,
    full:    v,
  }))

  return (
    <div style={{ marginBottom: '32px' }}>
      <SectionHeader title="Capability Radar" sub="Your performance across 8 business dimensions" />
      <AuditCard>
        <div style={{ padding: '8px 16px 0' }}>
          <RadarChartInner data={data} />
        </div>
      </AuditCard>
    </div>
  )
}
