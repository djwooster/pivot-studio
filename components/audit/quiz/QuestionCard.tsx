'use client'

import { useState, useEffect } from 'react'
import { ProgressDots } from '@/components/audit/ui/ProgressDots'
import { Tag } from '@/components/audit/ui/Tag'
import type { Question } from '@/types/audit'

const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

interface QuestionCardProps {
  q:        Question
  value:    number | undefined
  onChange: (val: number) => void
  onNext:   () => void
  onBack:   () => void
  step:     number  // 1-based display step (1–8)
  total:    number  // total trackable steps (10)
}

export function QuestionCard({ q, value, onChange, onNext, onBack, step, total }: QuestionCardProps) {
  const [animKey, setAnimKey] = useState(0)
  useEffect(() => { setAnimKey(k => k + 1) }, [q.id])

  const sliderVal = value ?? Math.round((q.min ?? 0) + ((q.max ?? 50) - (q.min ?? 0)) * 0.2)
  const band      = q.type === 'slider' ? q.bands?.find(b => sliderVal <= b.max) : null

  return (
    <div key={animKey} className="audit-fade-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <ProgressDots current={step} total={total} />
        <Tag>{q.label}</Tag>
      </div>

      <h2 style={{ fontFamily: sans, fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.25, marginBottom: '8px', letterSpacing: '-0.015em' }}>
        {q.question}
      </h2>
      <p style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', color: '#848484', fontFamily: sans, fontWeight: 400, marginBottom: '32px', lineHeight: 1.5 }}>
        {q.subtext}
      </p>

      {q.type === 'single' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {q.options?.map((opt) => {
            const sel = value === opt.value
            return (
              <button
                key={opt.value}
                className="audit-opt-btn"
                onClick={() => { onChange(opt.value); setTimeout(onNext, 280) }}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '14px',
                  padding:      '14px 16px',
                  background:   sel ? '#F0EDE8' : '#FFFFFF',
                  border:       `1px solid ${sel ? '#6B6860' : '#E8E5E0'}`,
                  borderRadius: '8px',
                  cursor:       'pointer',
                  textAlign:    'left',
                  fontFamily:   sans,
                  width:        '100%',
                  transition:   'all 0.18s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <div style={{
                  width:        '20px',
                  height:       '20px',
                  borderRadius: '50%',
                  flexShrink:   0,
                  border:       `1.5px solid ${sel ? '#1A1A1A' : '#D4D0C8'}`,
                  background:   sel ? '#1A1A1A' : 'transparent',
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent: 'center',
                  transition:   'all 0.15s',
                }}>
                  {sel && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#fff' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '2px' }}>{opt.label}</div>
                  <div style={{ fontSize: '14px', color: '#6B6860', fontWeight: 400 }}>{opt.sub}</div>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {q.type === 'slider' && (
        <div>
          <div style={{ background: '#FAFAF9', border: '1px solid #E8E5E0', borderRadius: '10px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
              <span style={{ fontSize: '52px', fontWeight: 400, fontFamily: serif, color: '#1A1A1A', lineHeight: 1 }}>
                {sliderVal}
              </span>
              <span style={{ fontSize: '16px', color: '#6B6860', fontFamily: sans, fontWeight: 300 }}>{q.unit}</span>
            </div>
            {band && (
              <div style={{ fontSize: '14px', color: '#6B6860', fontFamily: sans, marginBottom: '16px', fontStyle: 'italic' }}>
                {`"${band.label}"`}
              </div>
            )}
            <input
              type="range"
              min={q.min}
              max={q.max}
              step={q.step}
              value={sliderVal}
              onChange={e => onChange(Number(e.target.value))}
              className="audit-range"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#AEAAA4', fontFamily: sans, marginTop: '8px' }}>
              <span>0 hrs</span><span>25 hrs</span><span>50+ hrs</span>
            </div>
          </div>
          <button
            className="audit-cta-btn"
            onClick={onNext}
            style={{ width: '100%', padding: '13px', borderRadius: '8px', background: '#1A1A1A', color: '#fff', border: 'none', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: sans }}
          >
            Continue →
          </button>
        </div>
      )}

      <button
        onClick={onBack}
        style={{ marginTop: '20px', background: 'none', border: 'none', color: '#AEAAA4', fontSize: 'clamp(15px, 1.2vw, 18px)', cursor: 'pointer', fontFamily: sans, display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        ← Back
      </button>
    </div>
  )
}
