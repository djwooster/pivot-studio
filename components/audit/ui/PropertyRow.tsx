const sans = 'var(--font-geist-sans), system-ui, sans-serif'

interface PropertyRowProps {
  label:   string
  value:   string
  accent?: boolean
  last?:   boolean
}

export function PropertyRow({ label, value, accent = false, last = false }: PropertyRowProps) {
  return (
    <div style={{
      display:      'flex',
      alignItems:   'center',
      padding:      '9px 16px',
      borderBottom: last ? 'none' : '1px solid #E8E5E0',
    }}>
      <span style={{ width: '160px', fontSize: '13px', color: '#AEAAA4', flexShrink: 0, fontFamily: sans }}>{label}</span>
      <span style={{ fontSize: '13px', color: accent ? '#4A3728' : '#1A1A1A', fontWeight: accent ? 500 : 400, fontFamily: sans }}>
        {value}
      </span>
    </div>
  )
}
