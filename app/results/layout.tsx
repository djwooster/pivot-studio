import { Instrument_Serif } from 'next/font/google'
import React from 'react'

const instrumentSerif = Instrument_Serif({
  weight:   '400',
  style:    ['normal', 'italic'],
  subsets:  ['latin'],
  variable: '--font-instrument-serif',
  display:  'swap',
})

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={instrumentSerif.variable}
      style={{ minHeight: '100vh', background: '#FFFFFF', color: '#1A1A1A' }}
    >
      <style>{`
        .audit-fade-in { animation: auditFadeIn 0.4s ease both; }
        @keyframes auditFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .audit-cta-btn       { transition: all 0.2s cubic-bezier(0.22,1,0.36,1); }
        .audit-cta-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        .topbar-book-btn { transition: background 0.18s ease; }
        .topbar-book-btn:hover { background: #333333 !important; }
        .topbar-book-btn:hover .topbar-arrow { animation: arrowBounce 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes arrowBounce {
          0%   { transform: translateX(0); }
          45%  { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }

        .results-layout { display: grid; grid-template-columns: 1fr 400px; gap: 48px; }


        @media (max-width: 860px) {
          .results-layout { grid-template-columns: 1fr; }
          .results-sidebar { display: none; }
        }
      `}</style>
      {children}
    </div>
  )
}
