'use client'

import { DIMENSION_LABELS } from '@/lib/audit/questions'

const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

const INSIGHT_COPY: Record<string, string[]> = {
  current_state: [
    'Your business is in the pre-automation phase. The highest-ROI first step is identifying the top 3 processes consuming the most human hours and building lightweight systems around them.',
    'You\'ve started building a foundation, but disconnected tools are creating data silos. The opportunity is in connecting what you have before adding more complexity.',
    'Your automation instincts are strong. The next layer is intelligence — moving from task automation to decision automation using AI models that learn your business patterns.',
    'You\'re operating at a level most businesses never reach. Your edge now is speed of iteration and custom AI that no off-the-shelf tool can replicate.',
  ],
  pain_intensity: [
    'Even 5 hours saved weekly compounds to 260 hours annually — enough for a major strategic initiative.',
    'You\'re losing the equivalent of 2+ full workdays per month. A single automation workflow could recover this in the first week.',
    'That\'s over $50K in annual labor on tasks a system could handle. This is one of the fastest ROI opportunities in your business.',
    'This is a six-figure drain. At this volume, you\'re not just losing money — you\'re losing the ability to scale. This is the first thing we\'d address.',
  ],
  growth_trajectory: [
    'Automation is your fastest path to control. When systems handle the routine, your team can focus on stabilizing the core.',
    'The ceiling on steady growth is almost always operational — the same team doing the same tasks can only output so much.',
    'Operational strain during scale is the #1 reason good businesses plateau. This is exactly the window to build the systems that support your next level.',
    'At this velocity, every week you delay an automation build costs you compounding opportunity. Speed of execution is your competitive moat.',
  ],
  ai_awareness: [
    'Starting fresh is an advantage — you won\'t have to undo bad implementations. We can architect your AI stack correctly from day one.',
    'ChatGPT fluency is a solid starting point. The leap from chatbot to embedded AI workflows is where the business value compounds.',
    'You\'re in the top 20% of AI adoption. The difference between testing tools and operationalizing them is a system design question — and that\'s exactly what we build.',
    'You\'re already thinking at the level most businesses won\'t reach for 3 more years. The opportunity now is custom solutions that give you a durable competitive edge.',
  ],
  revenue_impact: [
    'Even incremental wins here compound. A small process improvement that saves 2 hours/week returns 100+ hours annually.',
    'Operational efficiency gains translate directly to sales velocity. Faster follow-up, fewer errors, and more consistent delivery all lift revenue.',
    'A 10–25% capacity unlock means real growth without adding headcount — the most capital-efficient way to scale a service business.',
    'When a single bottleneck is capping your revenue, removing it creates an outsized return. This is where we\'d focus everything.',
  ],
}

const STATUS_CONFIG = {
  strength:    { label: 'Strength',    color: '#2D6A4F', bg: '#D8F3DC' },
  opportunity: { label: 'Opportunity', color: '#7D4E00', bg: '#FFF3CD' },
  gap:         { label: 'Gap',         color: '#6B1E1E', bg: '#FDECEA' },
}

interface InsightsListProps { cats: Record<string, number> }

export function InsightsList({ cats }: InsightsListProps) {
  const INSIGHT_CATS = ['current_state', 'pain_intensity', 'growth_trajectory', 'ai_awareness']

  const insights = INSIGHT_CATS.map(cat => {
    const score = cats[cat] ?? 50
    const copy  = INSIGHT_COPY[cat]
    const text  = copy?.[Math.min(3, Math.floor(score / 25))] ?? ''
    const status: 'strength' | 'opportunity' | 'gap' = score >= 75 ? 'strength' : score >= 50 ? 'opportunity' : 'gap'
    return { cat, score, text, dim: DIMENSION_LABELS[cat], status }
  })

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ fontFamily: serif, fontSize: '1.35rem', fontWeight: 400, color: '#1A1A1A', marginBottom: '6px', letterSpacing: '-0.01em' }}>Key Insights</h3>
      <p style={{ fontSize: '13px', color: '#AEAAA4', fontFamily: sans, fontWeight: 300, marginBottom: '16px' }}>Personalized findings based on your assessment</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid #E8E5E0', borderRadius: '10px', overflow: 'hidden' }}>
        {insights.map(({ cat, score, text, dim, status }, i) => {
          const cfg = STATUS_CONFIG[status]
          return (
            <div key={cat} style={{ padding: '16px 18px', background: '#FFFFFF', borderBottom: i < insights.length - 1 ? '1px solid #E8E5E0' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 500, color: '#AEAAA4', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: sans }}>{dim}</span>
                <span style={{ fontSize: '10px', fontWeight: 500, color: cfg.color, background: cfg.bg, padding: '2px 8px', borderRadius: '3px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: sans }}>
                  {cfg.label}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '13px', fontWeight: 500, color: '#1A1A1A', fontFamily: sans }}>{score}%</span>
              </div>
              <p style={{ fontSize: '13px', color: '#6B6860', lineHeight: 1.65, fontFamily: sans, fontWeight: 300, margin: 0 }}>{text}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
