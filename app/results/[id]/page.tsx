import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import { createServiceClient } from '@/lib/audit/supabase'
import { ResultsView }   from '@/components/audit/results/ResultsView'
import { TRACK_LABELS }  from '@/lib/audit/questions'
import { AuditTopBar }   from '@/components/audit/ui/AuditTopBar'
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

  return (
    <div>
      <AuditTopBar right="Report generated" />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(28px, 5vw, 52px) 20px 80px' }}>
        <ResultsView submission={sub} />
      </div>
    </div>
  )
}
