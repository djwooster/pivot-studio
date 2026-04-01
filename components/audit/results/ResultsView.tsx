import { ScoreRing }       from './ScoreRing'
import { FinancialImpact } from './FinancialImpact'
import { InsightsList }    from './InsightsList'
import { CTABlock }               from './CTABlock'
import type { NarrativeSection }  from '@/lib/audit/narrative'
import { TRACK_LABELS }           from '@/lib/audit/questions'
import type { AuditSubmission }   from '@/types/audit'
import { sans, serif }            from '@/lib/audit/tokens'

const CITATIONS = [
  {
    stat:   '"Businesses that deploy AI at scale report an average of 20–30% reduction in operational costs within the first year."',
    source: 'McKinsey & Company',
    detail: 'The State of AI in 2023',
  },
  {
    stat:   '"AI tools increased worker productivity by 14% on average — with the largest gains for those handling the highest volume of repetitive tasks."',
    source: 'MIT & Stanford',
    detail: 'Brynjolfsson, Li & Raymond, 2023',
  },
  {
    stat:   '"Companies that adopt AI faster are 1.5x more likely to achieve revenue growth of 10% or more compared to slower-moving competitors."',
    source: 'McKinsey Global Institute',
    detail: 'AI Adoption & Impact Report, 2022',
  },
]

function ResearchSection() {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 500, color: '#AEAAA4', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: sans, marginBottom: '6px' }}>
          The case for moving now
        </div>
        <p style={{ fontSize: '14px', color: '#6B6860', lineHeight: 1.65, fontFamily: sans, fontWeight: 300, margin: 0 }}>
          {"The gap between businesses that act on AI and those that wait is widening every quarter. Here's what the research says."}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid #E8E5E0', borderRadius: '10px', overflow: 'hidden' }}>
        {CITATIONS.map(({ stat, source, detail }, i) => (
          <div key={i} style={{ padding: '16px 18px', background: '#FFFFFF', borderBottom: i < CITATIONS.length - 1 ? '1px solid #E8E5E0' : 'none' }}>
            <p style={{ fontSize: '14px', color: '#1A1A1A', lineHeight: 1.65, fontFamily: sans, fontWeight: 400, margin: '0 0 8px', maxWidth: '85%' }}>{stat}</p>
            <div style={{ fontSize: '12px', color: '#AEAAA4', fontFamily: sans, fontWeight: 500 }}>
              {source} <span style={{ fontWeight: 400 }}>· {detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ResultsViewProps { submission: AuditSubmission; financialNarrative?: NarrativeSection[] }

const TIER_BLURBS: Record<string, string> = {
  'High-Performance Operator': 'You\'re operating at a level most businesses won\'t reach for years. Your report highlights where to push further.',
  'Scaling Operator':          'You have strong foundations. Your report shows the specific gaps between where you are and best-in-class.',
  'Emerging Optimizer':        'You\'re further along than most. Your report identifies the highest-leverage moves available to you now.',
  'Operational Novice':        'Every high-performing business starts here. Your report maps the clearest path to your first automation wins.',
}

export function ResultsView({ submission, financialNarrative }: ResultsViewProps) {
  const { score, tier: tierName, cats, financial_impact: fin, track, name, company, role, top_gap } = submission
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
        <div style={{ fontSize: '13px', color: '#AEAAA4', fontFamily: sans, marginBottom: '20px' }}>
          AI Readiness Report &nbsp;·&nbsp; {new Date(submission.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <ScoreRing score={score} tier={tier} size={120} />
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'inline-block', fontSize: '12px', fontWeight: 500, color: tier.color, background: tier.soft, padding: '3px 10px', borderRadius: '4px', marginBottom: '12px', letterSpacing: '0.04em', fontFamily: sans }}>
              {tier.name} &nbsp;·&nbsp; {tier.percentile}
            </div>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '8px', letterSpacing: '-0.015em' }}>
              {"Hi "}{firstName}{", here's your full picture."}
            </h2>
            <p style={{ fontSize: '14px', color: '#6B6860', lineHeight: 1.6, fontFamily: sans, fontWeight: 300, marginBottom: '20px' }}>
              {TIER_BLURBS[tierName]}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
              {[
                [name,                    role],
                [company,                 TRACK_LABELS[track]],
                ['Top gap',               top_gap ?? 'Review full report'],
                ['Investment range',      budgetLabel],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '11px', color: '#AEAAA4', fontFamily: sans, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                  <span style={{ fontSize: '13px', color: '#1A1A1A', fontFamily: sans, fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report Summary — commented out, info surfaced in header above */}
      {/*
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
      */}

      {/* Key Insights */}
      <InsightsList cats={cats} />

      {/* Financial Impact */}
      {fin && <FinancialImpact data={fin} narrative={financialNarrative} />}

      {/* Research Citations */}
      <ResearchSection />

      {/* Share + Social proof */}
      <CTABlock />
    </div>
  )
}
