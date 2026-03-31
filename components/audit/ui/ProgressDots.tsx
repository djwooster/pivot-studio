const sans = 'var(--font-geist-sans), system-ui, sans-serif'

interface ProgressDotsProps {
  current: number  // 1-based step number (current step)
  total:   number  // total steps
}

export function ProgressDots({ current, total }: ProgressDotsProps) {
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width:        i < current ? '20px' : '6px',
            height:       '6px',
            borderRadius: '99px',
            transition:   'all 0.35s cubic-bezier(0.22,1,0.36,1)',
            background:   i < current ? '#1A1A1A' : i === current ? '#6B6860' : '#E8E5E0',
          }}
        />
      ))}
      <span style={{ fontSize: '12px', color: '#AEAAA4', marginLeft: '6px', fontFamily: sans }}>
        {current} / {total}
      </span>
    </div>
  )
}
