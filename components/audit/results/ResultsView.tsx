'use client'

import { ScoreRing }       from './ScoreRing'
import { FinancialImpact } from './FinancialImpact'
import { CapabilityRadar } from './CapabilityRadar'
import { BenchmarkChart }  from './BenchmarkChart'
import { InsightsList }    from './InsightsList'
import { CTABlock }        from './CTABlock'
import { AuditCard }       from '@/components/audit/ui/AuditCard'
import { PropertyRow }     from '@/components/audit/ui/PropertyRow'
import { TRACK_LABELS }    from '@/lib/audit/questions'
import type { AuditSubmission } from '@/types/audit'

const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

interface ResultsViewProps { submission: AuditSubmission }

const TIER_BLURBS: Record<string, string> = {
  'High-Performance Operator': 'You\'re operating at a level most businesses won\'t reach for years. Your report highlights where to push further.',
  'Scaling Operator':          'You have strong foundations. Your report shows the specific gaps between where you are and best-in-class.',
  'Emerging Optimizer':        'You\'re further along than most. Your report identifies the highest-leverage moves available to you now.',
  'Operational Novice':        'Every high-performing business starts here. Your report maps the clearest path to your first automation wins.',
}

export function ResultsView({ submission }: ResultsViewProps) {
  const { score, tier: tierName, cats, financial_impact: fin, track, name, company, role, top_gap, id } = submission
  const firstName = name.split(' ')[0]

  // Reconstruct tier object from stored tier name
  const tierColors: Record<string, { color: string; soft: string; percentile: string }> = {
    'Operational Novice':        { color: '#8B8B8B', soft: '#F4F4F4', percentile: 'bottom 30%' },
    'Emerging Optimizer':        { color: '#B07D3A', soft: '#FDF6EC', percentile: 'top 55%'    },
    'Scaling Operator':          { color: '#2D6A8F', soft: '#EBF5FB', percentile: 'top 28%'    },
    'High-Performance Operator': { color: '#2D6A4F', soft: '#EEF8F2', percentile: 'top 8%'     },
  }
  const tierMeta = tierColors[tierName] ?? tierColors['Operational Novice']
  const tier     = { min: 0, max: 100, name: tierName, ...tierMeta }

  const budgetLabel = (() => {
    const inv = submission.answers?.[8] ?? 1
    return ['Under $5K', '$5K–$20K', '$20K–$50K', '$50K+'][Math.max(0, inv - 1)]
  })()

  return (
    <div className="audit-fade-in">
      {/* Score Header */}
      <div style={{ paddingBottom: '32px', borderBottom: '1px solid #E8E5E0', marginBottom: '32px' }}>
        <div style={{ fontSize: '14px', color: '#AEAAA4', fontFamily: sans, marginBottom: '16px' }}>
          AI Readiness Report &nbsp;·&nbsp; {company} &nbsp;·&nbsp; {new Date(submission.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <ScoreRing score={score} tier={tier} size={110} />
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'inline-block', fontSize: '12px', fontWeight: 500, color: tier.color, background: tier.soft, padding: '3px 10px', borderRadius: '4px', marginBottom: '10px', letterSpacing: '0.04em', fontFamily: sans }}>
              {tier.name} &nbsp;·&nbsp; {tier.percentile}
            </div>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '10px', letterSpacing: '-0.015em' }}>
              {"Hi "}{firstName}{", here's your full picture."}
            </h2>
            <p style={{ fontSize: '15px', color: '#6B6860', lineHeight: 1.6, fontFamily: sans, fontWeight: 300, margin: 0 }}>
              {TIER_BLURBS[tierName]}
            </p>
          </div>
        </div>
      </div>

      {/* Report Summary */}
      <AuditCard style={{ marginBottom: '32px' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #E8E5E0', fontSize: '12px', fontWeight: 500, color: '#AEAAA4', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: sans }}>
          Report summary
        </div>
        <PropertyRow label="AI Readiness Score" value={`${score} / 100`} accent />
        <PropertyRow label="Tier"               value={tier.name} />
        <PropertyRow label="Percentile ranking" value={tier.percentile} />
        <PropertyRow label="Track"              value={TRACK_LABELS[track]} />
        <PropertyRow label="Assessed for"       value={`${name} · ${role}`} />
        <PropertyRow label="Company"            value={company} />
        <PropertyRow label="Investment range"   value={budgetLabel} />
        <PropertyRow label="Top priority gap"   value={top_gap ?? 'Review full report'} last />
      </AuditCard>

      {/* Financial Impact */}
      {fin && <FinancialImpact data={fin} />}

      {/* Capability Radar */}
      <CapabilityRadar cats={cats} />

      {/* Industry Benchmark */}
      <BenchmarkChart cats={cats} />

      {/* Key Insights */}
      <InsightsList cats={cats} />

      {/* CTA */}
      <CTABlock track={track} submissionId={id} company={company} />
    </div>
  )
}
