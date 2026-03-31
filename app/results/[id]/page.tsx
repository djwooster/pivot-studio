import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import { createServiceClient } from '@/lib/audit/supabase'
import { ResultsView }  from '@/components/audit/results/ResultsView'
import { TRACK_LABELS } from '@/lib/audit/questions'
import type { AuditSubmission } from '@/types/audit'

const sans = 'var(--font-geist-sans), system-ui, sans-serif'

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

  if (!sub) {
    notFound()
  }

  return (
    <div>
      {/* Top bar */}
      <div style={{
        background:    '#FFFFFF',
        borderBottom:  '1px solid #E8E5E0',
        padding:       '0 24px',
        height:        '52px',
        display:       'flex',
        alignItems:    'center',
        justifyContent:'space-between',
        position:      'sticky',
        top:           0,
        zIndex:        100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '24px', height: '24px', background: '#1A1A1A', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A', letterSpacing: '-0.01em', fontFamily: sans }}>
            AI Readiness Audit
          </span>
        </div>
        <span style={{ fontSize: '12px', color: '#AEAAA4', fontFamily: sans }}>Report generated</span>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(28px, 5vw, 52px) 20px 80px' }}>
        <ResultsView submission={sub} />
      </div>
    </div>
  )
}
