'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import type { Track } from '@/types/audit'
import { TRACK_BOOKING_LABELS } from '@/lib/audit/questions'
import { sans, serif, getBookingUrl } from '@/lib/audit/tokens'

interface CTABlockProps {
  track:        Track
  submissionId: string
  company:      string
}

export function CTABlock({ track, submissionId, company }: CTABlockProps) {
  const [visible, setVisible]     = useState(false)
  const [loading, setLoading]     = useState(false)
  const bookingLabel = TRACK_BOOKING_LABELS[track]
  const bookingUrl   = getBookingUrl(track)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard')
  }

  const handleDownload = async () => {
    const toastId = toast.loading('Generating your report…')
    setLoading(true)
    try {
      const res = await fetch(`/api/audit/generate-pdf?id=${submissionId}`)
      if (!res.ok) throw new Error('PDF generation failed')
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `ai-readiness-report-${company.toLowerCase().replace(/\s+/g, '-')}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      toast.dismiss(toastId)
      toast.success('Report downloaded')
    } catch {
      toast.dismiss(toastId)
      toast.error('PDF generation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Dark CTA block */}
      <div style={{
        background:  '#1A1A1A',
        borderRadius:'12px',
        padding:     '32px 28px',
        marginBottom:'24px',
        opacity:     visible ? 1 : 0,
        transform:   visible ? 'translateY(0)' : 'translateY(16px)',
        transition:  'all 0.6s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: sans, marginBottom: '14px' }}>
          Recommended next step
        </div>
        <h3 style={{ fontFamily: serif, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 400, color: '#fff', lineHeight: 1.25, marginBottom: '14px' }}>
          Turn your score into a <em>concrete</em> 90-day roadmap
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: sans, fontWeight: 300, marginBottom: '24px', maxWidth: '480px' }}>
          In a focused 30-minute call, we walk through your exact gaps, identify your two or three highest-ROI opportunities, and give you a prioritized action plan — specific to your business, your stack, and your team.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="audit-cta-btn"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#1A1A1A', textDecoration: 'none', padding: '14px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: 500, fontFamily: sans }}
          >
            {bookingLabel} →
          </a>
          <button
            onClick={handleDownload}
            disabled={loading}
            className="audit-cta-btn"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', padding: '13px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 400, cursor: 'pointer', fontFamily: sans }}
          >
            {loading ? 'Generating…' : 'Download PDF report'}
          </button>
        </div>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '16px', fontFamily: sans }}>
          3 audit spots remaining this week
        </p>
      </div>

      {/* Share button */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <button
          onClick={handleShare}
          style={{ background: 'none', border: '1px solid #E8E5E0', color: '#6B6860', fontSize: '13px', cursor: 'pointer', fontFamily: sans, padding: '9px 20px', borderRadius: '8px', transition: 'all 0.18s' }}
        >
          Share my results
        </button>
      </div>

      {/* Social proof */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {[['500+', 'Businesses audited'], ['4.9 / 5', 'Average rating'], ['$2.4M+', 'ROI documented']].map(([v, l]) => (
          <div key={v} style={{ textAlign: 'center', padding: '14px 8px', background: '#FAFAF9', border: '1px solid #E8E5E0', borderRadius: '8px' }}>
            <div style={{ fontSize: '18px', fontWeight: 400, color: '#1A1A1A', fontFamily: serif }}>{v}</div>
            <div style={{ fontSize: '11px', color: '#AEAAA4', fontFamily: sans, marginTop: '3px', fontWeight: 300 }}>{l}</div>
          </div>
        ))}
      </div>
    </>
  )
}
