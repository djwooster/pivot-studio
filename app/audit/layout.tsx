import { Instrument_Serif } from 'next/font/google'
import React from 'react'

const instrumentSerif = Instrument_Serif({
  weight:   '400',
  style:    ['normal', 'italic'],
  subsets:  ['latin'],
  variable: '--font-instrument-serif',
  display:  'swap',
})

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={instrumentSerif.variable}
      style={{ minHeight: '100vh', background: '#FFFFFF', color: '#1A1A1A' }}
    >
      <style>{`
        .audit-fade-up  { animation: auditFadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .audit-fade-in  { animation: auditFadeIn 0.4s ease both; }
        @keyframes auditFadeUp  { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes auditFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        .audit-stagger-1 { animation-delay: 0.05s; }
        .audit-stagger-2 { animation-delay: 0.10s; }
        .audit-stagger-3 { animation-delay: 0.15s; }
        .audit-stagger-4 { animation-delay: 0.20s; }
        .audit-stagger-5 { animation-delay: 0.25s; }
        .audit-stagger-6 { animation-delay: 0.30s; }
        .audit-opt-btn:hover  { background: #F0EDE8 !important; border-color: #AEAAA4 !important; }
        .audit-cta-btn        { transition: all 0.2s cubic-bezier(0.22,1,0.36,1); }
        .audit-cta-btn:hover  { opacity: 0.88; transform: translateY(-1px); }
        .audit-range {
          -webkit-appearance: none; width: 100%; height: 4px;
          background: #E8E5E0; border-radius: 99px; outline: none; cursor: pointer;
        }
        .audit-range::-webkit-slider-thumb {
          -webkit-appearance: none; width: 20px; height: 20px;
          border-radius: 50%; background: #1A1A1A; border: 3px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2); cursor: pointer; transition: transform 0.15s;
        }
        .audit-range::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .audit-inline-input::placeholder { color: #AEAAA4; }
      `}</style>
      {children}
    </div>
  )
}
