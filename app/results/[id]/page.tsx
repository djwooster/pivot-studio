import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import { createServiceClient }      from '@/lib/audit/supabase'
import { generateFinancialNarrative, type NarrativeSection } from '@/lib/audit/narrative'
import { ResultsView }    from '@/components/audit/results/ResultsView'
import { NextStepCTA }    from '@/components/audit/results/CTABlock'
import { TRACK_LABELS }            from '@/lib/audit/questions'
import { AuditTopBar }             from '@/components/audit/ui/AuditTopBar'
import { getBookingUrl }           from '@/lib/audit/tokens'
import type { AuditSubmission } from '@/types/audit'

interface Props { params: Promise<{ id: string }> }

async function getSubmission(id: string): Promise<AuditSubmission | null> {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('audit_submissions')
      .select('*')
      .eq('id', id)
      .single()
    if (error || !data) return null
    return data as AuditSubmission
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id }  = await params
  const sub     = await getSubmission(id)
  if (!sub) return { title: 'Results | AI Readiness Audit' }

  return {
    title:       `${sub.name}'s ${sub.tier} Score: ${sub.score}/100 | AI Readiness Audit`,
    description: `${sub.company} scored ${sub.score}/100 on the AI Readiness Audit. Track: ${TRACK_LABELS[sub.track]}. Top opportunity: ${sub.top_gap}.`,
    openGraph: {
      title:       `${sub.name}'s ${sub.tier} Score: ${sub.score}/100 | AI Readiness Audit`,
      description: `${sub.company} scored ${sub.score}/100. Track: ${TRACK_LABELS[sub.track]}. Top opportunity: ${sub.top_gap}.`,
      type:        'website',
    },
  }
}

export default async function ResultsPage({ params }: Props) {
  const { id } = await params
  const sub    = await getSubmission(id)

  if (!sub) notFound()

  const narrative: NarrativeSection[] = sub.financial_impact
    ? await generateFinancialNarrative({
        company: sub.company,
        role:    sub.role,
        track:   sub.track,
        score:   sub.score,
        tier:    sub.tier,
        topGap:  sub.top_gap ?? '',
        fin:     sub.financial_impact,
      }).catch(() => [])
    : []

  return (
    <div>
      <AuditTopBar right={
        <a
          href={getBookingUrl(sub.track)}
          target="_blank"
          rel="noopener noreferrer"
          className="topbar-book-btn"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '6px',
            background:     '#1A1A1A',
            color:          '#fff',
            fontSize:       '12px',
            fontWeight:     500,
            padding:        '6px 12px',
            borderRadius:   '6px',
            textDecoration: 'none',
            letterSpacing:  '-0.01em',
          }}
        >
          Book a call
          <svg className="topbar-arrow" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5h6M5 2l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      } />
      <div style={{ padding: 'clamp(28px, 5vw, 52px) clamp(24px, 4vw, 48px) 80px' }}>
        <div className="results-layout">
          <main className="results-main">
            <ResultsView submission={sub} financialNarrative={narrative} />
          </main>
          <aside className="results-sidebar">
            <div style={{ position: 'sticky', top: '72px' }}>
              <NextStepCTA track={sub.track} submissionId={sub.id} company={sub.company} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
