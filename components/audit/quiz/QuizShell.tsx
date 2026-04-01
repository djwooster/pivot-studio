'use client'

import { useRouter } from 'next/navigation'
import { useAuditStore } from '@/lib/audit/store'
import { getQuestionsForTrack } from '@/lib/audit/questions'
// import { TrackSelector } from './TrackSelector'
import { QuestionCard }  from './QuestionCard'
import { MidHook }       from './MidHook'
import { LeadCapture }   from './LeadCapture'
import type { AuditLead } from '@/types/audit'

const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

// ── Landing screen ────────────────────────────────────────────────────────────
function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="audit-fade-in">
      <div style={{ paddingBottom: '40px', borderBottom: '1px solid #E8E5E0', marginBottom: '40px' }}>
        <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6860', background: '#F0EDE8', padding: '3px 10px', borderRadius: '4px', marginBottom: '24px', fontFamily: sans }}>
          Free Assessment · 4 minutes
        </span>
        <h1 style={{ fontFamily: sans, fontSize: 'clamp(24px, 2.5vw, 80px)', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.02em' }}>
          Most businesses are losing 15+ hours per week to work AI could handle.
<br />
          {/* <em>One of our clients cut their lead response time from 2 days to 10 minutes. Take the free 4-minute audit and find out exactly where automation could do the same for you.</em> */}
        </h1>
        <p style={{ fontSize: 'clamp(18px, 1.2vw, 24px)', color: 'rgba(10,10,10,0.5)', lineHeight: 1.7, maxWidth: '100%', marginBottom: '36px', fontFamily: sans, fontWeight: 300 }}>
          {"One of our clients "}
          <span style={{ textDecoration: 'underline', textDecorationStyle: 'solid', textDecorationColor: 'rgba(74, 158, 107, 0.7)', textDecorationThickness: '1.5px', textUnderlineOffset: '3px' }}>
            cut their lead response time from <strong style={{ color: '#1A1A1A', fontWeight: 600 }}>2 days</strong> to <strong style={{ color: '#1A1A1A', fontWeight: 600 }}>10 minutes</strong>
          </span>
          {". Take the free 4-minute audit and find out exactly where automation could do the same for you."}
        </p>
        <button
          className="audit-cta-btn"
          onClick={onStart}
          style={{ background: '#1A1A1A', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', fontFamily: sans, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          Begin the audit <span style={{ fontSize: '18px' }}>→</span>
        </button>
      </div>

      <div>
        <p style={{ fontSize: '16px', fontWeight: 600, color: '#1A1A1A', marginBottom: '20px', fontFamily: sans }}>
          {"What's included in your report"}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '36px' }}>
          {[
            ['Readiness Score (0–100)',   'Your score across 8 business dimensions, with a percentile ranking.'],
            ['Financial Impact Model',    'A personalized estimate of what AI and automation could recover — in dollars.'],
            ['Capability Radar',          'Visual breakdown of your strongest and weakest dimensions.'],
            ['Industry Benchmark',        'Side-by-side comparison vs. businesses at your stage.'],
            ['Key Insights',             '4 business-specific findings with clear, actionable context.'],
            ['Downloadable PDF Report',  'A structured report you can share with your leadership team today.'],
          ].map(([title, desc], i) => (
            <div key={i} className={`audit-fade-up audit-stagger-${i + 1}`} style={{ padding: '16px', background: '#FAFAF9', border: '1px solid #E8E5E0', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A1A', marginBottom: '5px', fontFamily: sans }}>{title}</div>
              <div style={{ fontSize: '12px', color: '#6B6860', lineHeight: 1.6, fontFamily: sans, fontWeight: 300 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '32px', paddingTop: '28px', borderTop: '1px solid #E8E5E0' }}>
          {[['500+', 'audits completed'], ['4.9 / 5', 'average rating'], ['$2.4M+', 'ROI documented']].map(([v, l]) => (
            <div key={v}>
              <div style={{ fontSize: '22px', fontWeight: 400, color: '#1A1A1A', fontFamily: serif }}>{v}</div>
              <div style={{ fontSize: '12px', color: '#AEAAA4', fontFamily: sans, marginTop: '2px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Top bar ───────────────────────────────────────────────────────────────────
function TopBar({ showProgress, step, totalSteps }: { showProgress: boolean; step: number; totalSteps: number }) {
  return (
    <div style={{
      background:    '#FFFFFF',
      borderBottom:  '1px solid #E8E5E0',
      padding:       '0 24px',
      height:        '52px',
      display:       'flex',
      alignItems:    'center',
      justifyContent:'space-between',
      position:      'sticky',
      top:           0,
      zIndex:        100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '24px', height: '24px', background: '#1A1A1A', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A', letterSpacing: '-0.01em', fontFamily: sans }}>
          AI Readiness Audit
        </span>
      </div>
      {showProgress && (
        <span style={{ fontSize: '12px', color: '#AEAAA4', fontFamily: sans }}>
          {step} / {totalSteps}
        </span>
      )}
    </div>
  )
}

// ── Shell ─────────────────────────────────────────────────────────────────────
export function QuizShell() {
  const router = useRouter()
  const { stage, track, questionIndex, answers, setStage, setTrack, setAnswer, setLead, setSubmissionId, nextQuestion, prevQuestion } = useAuditStore()
  const questions = getQuestionsForTrack(track)
  const currentQ  = questions[questionIndex]

  // Step number for progress display (1-based, includes track_select and mid_hook)
  // Steps: track(1), Q1-Q4(2-5), mid_hook(6), Q5-Q8(7-10), capture(10)
  const displayStep = stage === 'track_select' ? 0
    : stage === 'quiz'     ? questionIndex < 4 ? questionIndex + 1 : questionIndex + 2  // +2 to skip mid_hook slot
    : stage === 'mid_hook' ? 5
    : stage === 'capture'  ? 10
    : 0

  const showProgress = stage !== 'landing'

  const handleContinueFromMidHook = () => {
    nextQuestion()
  }

  const handleLeadSubmit = async (lead: AuditLead) => {
    setLead(lead)
    const res = await fetch('/api/audit/submit', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        answers,
        lead,
        track: track ?? 'combined',
        utmSource:   new URLSearchParams(window.location.search).get('utm_source'),
        utmMedium:   new URLSearchParams(window.location.search).get('utm_medium'),
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      }),
    })
    if (!res.ok) throw new Error('Submission failed')
    const { id } = await res.json()
    setSubmissionId(id)
    setStage('submitted')
    router.push(`/results/${id}`)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: sans }}>
      <TopBar showProgress={showProgress} step={displayStep} totalSteps={10} />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: 'clamp(28px, 5vw, 52px) 20px 80px' }}>
        {stage === 'landing' && (
          <Landing onStart={() => setTrack('automate')} />
        )}

        {/* track_select step commented out — skipping directly to quiz
        {stage === 'track_select' && (
          <TrackSelector />
        )} */}

        {stage === 'quiz' && currentQ && (
          <QuestionCard
            q={currentQ}
            value={answers[currentQ.id]}
            onChange={val => setAnswer(currentQ.id, val)}
            onNext={nextQuestion}
            onBack={prevQuestion}
            step={displayStep}
            total={10}
          />
        )}

        {stage === 'mid_hook' && (
          <MidHook onContinue={handleContinueFromMidHook} onBack={prevQuestion} />
        )}

        {stage === 'capture' && (
          <LeadCapture onSubmit={handleLeadSubmit} onBack={prevQuestion} />
        )}
      </div>
    </div>
  )
}
