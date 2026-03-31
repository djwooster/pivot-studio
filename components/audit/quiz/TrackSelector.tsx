'use client'

import { useAuditStore } from '@/lib/audit/store'
import type { Track } from '@/types/audit'

const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

const TRACKS: {
  id:          Track
  icon:        React.ReactNode
  headline:    string
  description: string
}[] = [
  {
    id:          'automate',
    headline:    'Stop doing manually what a system could do for you',

    description: 'AI workflows, process automation, repetitive task elimination, and intelligent operations.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="5" width="6" height="4" rx="1" stroke="#1A1A1A" strokeWidth="1.25"/>
        <rect x="13" y="11" width="6" height="4" rx="1" stroke="#1A1A1A" strokeWidth="1.25"/>
        <path d="M7 7h3l3 6h0" stroke="#1A1A1A" strokeWidth="1.25" strokeLinecap="round"/>
        <path d="M12 11l1.5-1.5L15 11" stroke="#1A1A1A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id:          'see_clearly',
    headline:    'Get visibility into what\'s actually driving your business',
    description: 'Custom dashboards, CRM reporting, marketing attribution, and multi-source analytics.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="2,15 7,9 11,12 17,5" stroke="#1A1A1A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14,5 17,5 17,8" stroke="#1A1A1A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id:          'build_better',
    headline:    'Replace the workarounds with software built for how you work',
    description: 'Client portals, internal tools, booking systems, proposal builders, and custom web apps.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="16" height="16" rx="2" stroke="#1A1A1A" strokeWidth="1.25"/>
        <line x1="2" y1="7" x2="18" y2="7" stroke="#1A1A1A" strokeWidth="1.25"/>
        <line x1="8" y1="2" x2="8" y2="7" stroke="#1A1A1A" strokeWidth="1.25"/>
        <rect x="5" y="10" width="4" height="4" rx="0.5" stroke="#1A1A1A" strokeWidth="1"/>
        <rect x="11" y="10" width="4" height="4" rx="0.5" stroke="#1A1A1A" strokeWidth="1"/>
      </svg>
    ),
  },
]

export function TrackSelector() {
  const { setTrack } = useAuditStore()
  const [hovered, setHovered] = React.useState<Track | null>(null)
  const [selected, setSelected] = React.useState<Track | null>(null)

  const handleSelect = (track: Track) => {
    setSelected(track)
    setTimeout(() => setTrack(track), 220)
  }

  return (
    <div className="audit-fade-up">
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#AEAAA4', marginBottom: '14px', fontFamily: sans }}>
          Step 1 of 2 — Choose your track
        </p>
        <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '10px' }}>
          {"What's the biggest constraint on your growth?"}
        </h2>
        <p style={{ fontSize: '14px', color: '#6B6860', lineHeight: 1.7, fontFamily: sans, fontWeight: 300 }}>
          {"Select the area that maps most closely to where you're feeling the most friction."}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', border: '1px solid #E8E5E0', borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
        {TRACKS.map((track, i) => {
          const isSelected = selected === track.id
          const isHovered  = hovered === track.id
          return (
            <button
              key={track.id}
              onClick={() => handleSelect(track.id)}
              onMouseEnter={() => setHovered(track.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display:         'flex',
                flexDirection:   'column',
                alignItems:      'flex-start',
                padding:         '24px 20px',
                background:      isSelected ? '#F7F6F3' : isHovered ? '#FAFAF9' : '#FFFFFF',
                border:          'none',
                borderLeft:      i > 0 ? '1px solid #E8E5E0' : 'none',
                outline:         isSelected ? '1px solid #1A1A1A' : 'none',
                outlineOffset:   '-1px',
                cursor:          'pointer',
                textAlign:       'left',
                transition:      'all 0.18s cubic-bezier(0.22,1,0.36,1)',
                fontFamily:      sans,
              }}
            >
              <div style={{ marginBottom: '14px', opacity: isSelected ? 1 : 0.7 }}>{track.icon}</div>
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A1A', lineHeight: 1.4, marginBottom: '6px' }}>{track.headline}</p>
              <p style={{ fontSize: '12px', color: '#6B6860', lineHeight: 1.6, fontWeight: 300 }}>{track.description}</p>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => { setSelected('combined'); setTimeout(() => setTrack('combined'), 220) }}
        style={{ background: 'none', border: 'none', color: '#AEAAA4', fontSize: '13px', cursor: 'pointer', fontFamily: sans, textDecoration: 'underline', textUnderlineOffset: '3px', padding: 0 }}
      >
        {"Not sure? Answer a few questions and we'll recommend a track."}
      </button>
    </div>
  )
}

// Need React import for JSX
import React from 'react'
