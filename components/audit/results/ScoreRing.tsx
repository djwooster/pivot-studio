'use client'

import { useState, useEffect } from 'react'
import type { Tier } from '@/types/audit'
import { sans, serif } from '@/lib/audit/tokens'

interface ScoreRingProps {
  score: number
  tier:  Tier
  size?: number
}

export function ScoreRing({ score, tier, size = 120 }: ScoreRingProps) {
  const r    = (size / 2) - 10
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const step = score / 60
    let cur = 0
    const iv = setInterval(() => {
      cur = Math.min(score, cur + step)
      setDisplay(Math.round(cur))
      if (cur >= score) clearInterval(iv)
    }, 16)
    return () => clearInterval(iv)
  }, [score])

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E8E5E0" strokeWidth="6" />
        <circle
          cx={size/2} cy={size/2} r={r}
          fill="none"
          stroke={tier.color}
          strokeWidth="6"
          strokeDasharray={`${circ}`}
          strokeDashoffset={circ - dash}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '28px', fontWeight: 600, fontFamily: serif, color: '#1A1A1A', lineHeight: 1 }}>{display}</span>
        <span style={{ fontSize: '10px', color: '#AEAAA4', letterSpacing: '0.05em', marginTop: '2px', fontFamily: sans }}>/ 100</span>
      </div>
    </div>
  )
}
