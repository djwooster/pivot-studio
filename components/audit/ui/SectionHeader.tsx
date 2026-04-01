const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

interface SectionHeaderProps {
  title:     string
  sub:       React.ReactNode
  tag?:      React.ReactNode
  subColor?: string
}

export function SectionHeader({ title, sub, tag, subColor = '#959087' }: SectionHeaderProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h3 style={{ fontFamily: serif, fontSize: '1.85rem', fontWeight: 400, color: '#1A1A1A', letterSpacing: '-0.01em', margin: 0 }}>
          {title}
        </h3>
        {tag}
      </div>
      <p style={{ fontSize: '15px', color: subColor, fontFamily: sans, fontWeight: 400, margin: 0 }}>
        {sub}
      </p>
    </div>
  )
}
