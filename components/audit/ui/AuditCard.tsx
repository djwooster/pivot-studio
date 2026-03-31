import React from 'react'

interface AuditCardProps {
  children:  React.ReactNode
  style?:    React.CSSProperties
  className?: string
}

export function AuditCard({ children, style = {}, className }: AuditCardProps) {
  return (
    <div
      className={className}
      style={{
        background:   '#FFFFFF',
        border:       '1px solid #E8E5E0',
        borderRadius: '10px',
        overflow:     'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
