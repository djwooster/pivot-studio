import React from 'react'

interface TagProps {
  children: React.ReactNode
  color?: string
  bg?: string
}

export function Tag({ children, color = '#6B6860', bg = '#F0EDE8' }: TagProps) {
  return (
    <span style={{
      display:        'inline-block',
      fontSize:       '11px',
      fontWeight:     500,
      letterSpacing:  '0.06em',
      textTransform:  'uppercase',
      color,
      background:     bg,
      padding:        '3px 10px',
      borderRadius:   '4px',
      fontFamily:     'var(--font-geist-sans), system-ui, sans-serif',
    }}>
      {children}
    </span>
  )
}
