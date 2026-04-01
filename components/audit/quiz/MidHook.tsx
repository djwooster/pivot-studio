'use client'

import { ProgressDots } from '@/components/audit/ui/ProgressDots'

const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

interface MidHookProps {
  onContinue: () => void
  onBack:     () => void
}

export function MidHook({ onContinue, onBack }: MidHookProps) {
  return (
    <div className="audit-fade-up">
      <div style={{ marginBottom: '32px' }}>
        <ProgressDots current={5} total={10} />
      </div>

      <div style={{ borderLeft: '3px solid #1A1A1A', paddingLeft: '20px', marginBottom: '32px' }}>
        <div style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#AEAAA4', marginBottom: '10px', fontFamily: sans }}>Early signal</div>
        <p style={{ fontFamily: sans, fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', color: '#1A1A1A', lineHeight: 1.25, fontWeight: 600, letterSpacing: '-0.015em' }}>
          {"Based on your first four answers, you're already ahead of "}
          <em style={{ fontStyle: 'italic', color: '#118840' }}>67% of businesses</em>
          {" we've assessed."}
        </p>
      </div>

      <p style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', color: '#848484', lineHeight: 1.7, fontFamily: sans, fontWeight: 400, marginBottom: '32px' }}>
        The next four questions will unlock your financial impact model — a personalized estimate of what AI and automation could recover in your specific business, in dollars. Continue to see the full picture.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '32px' }}>
        {[
          ['Revenue unlocked',    'Personalized estimate'],
          ['Hours recovered',     'Annually, across your team'],
          ['Labor cost recovered','Based on your inputs'],
          ['5-year trajectory',   'With vs. without AI'],
        ].map(([t, s]) => (
          <div key={t} style={{ padding: '12px 14px', background: '#FAFAF9', border: '1px solid #E8E5E0', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#1A1A1A', fontFamily: sans }}>{t}</div>
            <div style={{ fontSize: '11px', color: '#AEAAA4', fontFamily: sans, marginTop: '2px', fontWeight: 300 }}>{s}</div>
          </div>
        ))}
      </div>

      <button
        className="audit-cta-btn"
        onClick={onContinue}
        style={{ width: '100%', padding: '14px', borderRadius: '8px', background: '#1A1A1A', color: '#fff', border: 'none', fontSize: '15px', fontWeight: 500, cursor: 'pointer', fontFamily: sans }}
      >
        Unlock my financial impact model →
      </button>

      <button
        onClick={onBack}
        style={{ marginTop: '16px', background: 'none', border: 'none', color: '#AEAAA4', fontSize: 'clamp(15px, 1.2vw, 18px)', cursor: 'pointer', fontFamily: sans, display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        ← Back
      </button>
    </div>
  )
}
