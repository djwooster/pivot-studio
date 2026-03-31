import type { Metadata } from 'next'
import { QuizShell } from '@/components/audit/quiz/QuizShell'

export const metadata: Metadata = {
  title:  'AI Readiness Audit | Pivot Studio',
  robots: { index: false, follow: false },
}

export default function AuditPage() {
  return <QuizShell />
}
