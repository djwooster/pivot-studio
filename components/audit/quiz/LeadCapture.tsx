'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { AuditCard } from '@/components/audit/ui/AuditCard'
import { Tag } from '@/components/audit/ui/Tag'
import { ProgressDots } from '@/components/audit/ui/ProgressDots'
import type { AuditLead } from '@/types/audit'

const sans = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

const FIELDS: { id: keyof AuditLead; label: string; type: string; placeholder: string }[] = [
  { id: 'name',    label: 'Full name',    type: 'text',  placeholder: 'Jordan Smith' },
  { id: 'email',   label: 'Work email',   type: 'email', placeholder: 'jordan@company.com' },
  { id: 'company', label: 'Company name', type: 'text',  placeholder: 'Acme Inc.' },
  { id: 'role',    label: 'Your role',    type: 'text',  placeholder: 'CEO, Founder, COO…' },
]

interface LeadCaptureProps {
  onSubmit: (lead: AuditLead) => Promise<void>
  onBack:   () => void
}

export function LeadCapture({ onSubmit, onBack }: LeadCaptureProps) {
  const [form, setForm]       = useState<AuditLead>({ name: '', email: '', company: '', role: '' })
  const [loading, setLoading] = useState(false)

  const valid = form.name.trim() !== '' && form.email.includes('@') && form.company.trim() !== ''

  const handleSubmit = async () => {
    if (!valid || loading) return
    setLoading(true)
    try {
      await onSubmit(form)
    } catch {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="audit-fade-up">
      <div style={{ marginBottom: '24px' }}>
        <ProgressDots current={10} total={10} />
      </div>

      <Tag color="#2D6A4F" bg="#D8F3DC">Report ready</Tag>
      <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#1A1A1A', fontWeight: 400, letterSpacing: '-0.015em', marginTop: '16px', marginBottom: '10px' }}>
        Your report is ready to unlock
      </h2>
      <p style={{ fontSize: '14px', color: '#6B6860', lineHeight: 1.7, fontFamily: sans, fontWeight: 300, marginBottom: '32px' }}>
        {"Enter your details and we'll generate your personalized Readiness Score, financial impact model, and custom roadmap — instantly."}
      </p>

      <AuditCard style={{ marginBottom: '24px' }}>
        {FIELDS.map((f, i) => (
          <div key={f.id} style={{ padding: '12px 16px', borderBottom: i < FIELDS.length - 1 ? '1px solid #E8E5E0' : 'none', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <label style={{ width: '120px', fontSize: '13px', color: '#AEAAA4', flexShrink: 0, fontFamily: sans }}>{f.label}</label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.id]}
              onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
              onKeyDown={e => { if (e.key === 'Enter' && valid) handleSubmit() }}
              className="audit-inline-input"
              style={{ border: 'none', background: 'transparent', padding: 0, fontSize: '14px', outline: 'none', flex: 1, fontFamily: sans, color: '#1A1A1A', boxShadow: 'none' }}
            />
          </div>
        ))}
      </AuditCard>

      <button
        className="audit-cta-btn"
        onClick={handleSubmit}
        disabled={!valid || loading}
        style={{
          width:       '100%',
          padding:     '14px',
          borderRadius:'8px',
          background:  valid ? '#1A1A1A' : '#E8E5E0',
          color:       valid ? '#fff'    : '#AEAAA4',
          border:      'none',
          fontSize:    '15px',
          fontWeight:  500,
          cursor:      valid ? 'pointer' : 'default',
          fontFamily:  sans,
          transition:  'all 0.2s',
        }}
      >
        {loading ? 'Generating your report…' : 'Generate my report →'}
      </button>

      <p style={{ fontSize: '11px', color: '#AEAAA4', textAlign: 'center', marginTop: '12px', fontFamily: sans }}>
        {"No spam. Used only to send your report and schedule a call if you'd like one."}
      </p>

      <button
        onClick={onBack}
        style={{ marginTop: '16px', background: 'none', border: 'none', color: '#AEAAA4', fontSize: '13px', cursor: 'pointer', fontFamily: sans, display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        ← Back
      </button>
    </div>
  )
}
