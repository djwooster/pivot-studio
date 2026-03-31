import { redirect }          from 'next/navigation'
import { createServiceClient } from '@/lib/audit/supabase'
import { AuditDashboard }   from './AuditDashboard'

export default async function AuditDashboardPage() {
  // Verify session via cookie-based auth — redirect if not authenticated
  try {
    const supabase = createServiceClient()
    const { data: submissions, error } = await supabase
      .from('audit_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return <AuditDashboard submissions={submissions ?? []} />
  } catch {
    redirect('/dashboard/audit/login')
  }
}
