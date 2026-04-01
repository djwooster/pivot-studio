import { sans } from '@/lib/audit/tokens'

interface AuditTopBarProps {
  right?: React.ReactNode
}

export function AuditTopBar({ right }: AuditTopBarProps) {
  return (
    <div style={{
      background:     '#FFFFFF',
      borderBottom:   '1px solid #E8E5E0',
      padding:        '0 clamp(24px, 4vw, 48px)',
      height:         '52px',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      position:       'sticky',
      top:            0,
      zIndex:         100,
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
      {right && (
        <div style={{ fontSize: '12px', color: '#AEAAA4', fontFamily: sans }}>
          {right}
        </div>
      )}
    </div>
  )
}
