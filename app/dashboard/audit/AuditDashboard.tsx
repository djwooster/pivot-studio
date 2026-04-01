'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { TRACK_LABELS } from '@/lib/audit/questions'
import type { AuditSubmission, Track } from '@/types/audit'

const BarChartInner = dynamic(() => import('@/components/audit/results/BenchmarkChartInner'), {
  ssr:     false,
  loading: () => <div style={{ height: 200 }} />,
})

const sans = 'var(--font-geist-sans), system-ui, sans-serif'

interface AuditDashboardProps { submissions: AuditSubmission[] }

export function AuditDashboard({ submissions }: AuditDashboardProps) {
  const [trackFilter, setTrackFilter] = useState<Track | 'all'>('all')
  const [sortField, setSortField]     = useState<'created_at' | 'score'>('created_at')

  const filtered = useMemo(() => {
    const rows = trackFilter === 'all' ? submissions : submissions.filter(s => s.track === trackFilter)
    return [...rows].sort((a, b) =>
      sortField === 'score'
        ? b.score - a.score
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }, [submissions, trackFilter, sortField])

  // KPIs
  const total       = submissions.length
  const avgScore    = total ? Math.round(submissions.reduce((a, s) => a + s.score, 0) / total) : 0
  const thisMonth   = submissions.filter(s => new Date(s.created_at).getMonth() === new Date().getMonth()).length
  const ctaRate     = total ? Math.round((submissions.filter(s => s.cta_clicked).length / total) * 100) : 0

  // Score distribution
  const bands = [
    { name: '0–25',   you: submissions.filter(s => s.score <= 25).length, avg: 0 },
    { name: '26–50',  you: submissions.filter(s => s.score > 25 && s.score <= 50).length, avg: 0 },
    { name: '51–75',  you: submissions.filter(s => s.score > 50 && s.score <= 75).length, avg: 0 },
    { name: '76–100', you: submissions.filter(s => s.score > 75).length, avg: 0 },
  ]

  // Track breakdown
  const tracks = (['automate','see_clearly','build_better','combined'] as Track[]).map(t => ({
    track: t,
    count: submissions.filter(s => s.track === t).length,
    avg:   Math.round((submissions.filter(s => s.track === t).reduce((a, s) => a + s.score, 0) || 0) / (submissions.filter(s => s.track === t).length || 1)),
  }))

  const handleExportCSV = () => {
    const headers = ['Name','Email','Company','Role','Track','Score','Tier','Top Gap','Investment','CTA Clicked','Date']
    const budgetLabels = ['Under $5K', '$5K–$20K', '$20K–$50K', '$50K+']
    const rows = submissions.map(s => [
      s.name, s.email, s.company, s.role,
      TRACK_LABELS[s.track], s.score, s.tier, s.top_gap ?? '',
      budgetLabels[Math.max(0, (s.answers?.[8] ?? 1) - 1)],
      s.cta_clicked ?? '',
      new Date(s.created_at).toLocaleDateString(),
    ])
    const csv  = [headers, ...rows].map(r => r.map(String).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `audit-submissions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3', fontFamily: sans }}>
      {/* Header */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E5E0', padding: '0 32px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '24px', height: '24px', background: '#1A1A1A', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>Audit Dashboard</span>
        </div>
        <button onClick={handleExportCSV} style={{ border: '1px solid #E8E5E0', background: '#fff', color: '#1A1A1A', fontSize: '13px', padding: '7px 16px', borderRadius: '6px', cursor: 'pointer' }}>
          Export CSV
        </button>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {[
            { label: 'Total submissions',    value: total.toString() },
            { label: 'Avg score',            value: `${avgScore}/100` },
            { label: 'This month',           value: thisMonth.toString() },
            { label: 'CTA conversion',       value: `${ctaRate}%` },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: '#fff', border: '1px solid #E8E5E0', borderRadius: '10px', padding: '20px' }}>
              <p style={{ fontSize: '12px', color: '#AEAAA4', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
              <p style={{ fontSize: '28px', fontWeight: 600, color: '#1A1A1A', margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          {/* Score distribution */}
          <div style={{ background: '#fff', border: '1px solid #E8E5E0', borderRadius: '10px', padding: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A1A', margin: '0 0 16px' }}>Score distribution</p>
            <BarChartInner data={bands} />
          </div>

          {/* Track breakdown */}
          <div style={{ background: '#fff', border: '1px solid #E8E5E0', borderRadius: '10px', padding: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A1A', margin: '0 0 16px' }}>Track breakdown</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E8E5E0' }}>
                  {['Track','Submissions','Avg Score'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '6px 0', fontSize: '11px', color: '#AEAAA4', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tracks.filter(t => t.count > 0).map(t => (
                  <tr key={t.track} style={{ borderBottom: '1px solid #E8E5E0' }}>
                    <td style={{ padding: '10px 0', color: '#1A1A1A' }}>{TRACK_LABELS[t.track]}</td>
                    <td style={{ padding: '10px 0', color: '#6B6860' }}>{t.count}</td>
                    <td style={{ padding: '10px 0', color: '#6B6860' }}>{t.avg}/100</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submissions table */}
        <div style={{ background: '#fff', border: '1px solid #E8E5E0', borderRadius: '10px', overflow: 'hidden' }}>
          {/* Table controls */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E8E5E0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A1A', margin: 0, marginRight: 'auto' }}>
              Submissions ({filtered.length})
            </p>
            <select
              value={trackFilter}
              onChange={e => setTrackFilter(e.target.value as Track | 'all')}
              style={{ border: '1px solid #E8E5E0', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1A1A1A', background: '#fff', cursor: 'pointer' }}
            >
              <option value="all">All tracks</option>
              {(['automate','see_clearly','build_better','combined'] as Track[]).map(t => (
                <option key={t} value={t}>{TRACK_LABELS[t]}</option>
              ))}
            </select>
            <select
              value={sortField}
              onChange={e => setSortField(e.target.value as 'created_at' | 'score')}
              style={{ border: '1px solid #E8E5E0', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1A1A1A', background: '#fff', cursor: 'pointer' }}
            >
              <option value="created_at">Sort by date</option>
              <option value="score">Sort by score</option>
            </select>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E8E5E0', background: '#FAFAF9' }}>
                  {['Name','Company','Track','Score','Tier','Top Gap','Investment','Date','CTA'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: '11px', color: '#AEAAA4', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: '40px 16px', textAlign: 'center', color: '#AEAAA4' }}>No submissions yet</td>
                  </tr>
                ) : filtered.map(s => {
                  const budgetLabel = ['<$5K','$5–20K','$20–50K','$50K+'][Math.max(0, (s.answers?.[8] ?? 1) - 1)]
                  return (
                    <tr key={s.id} style={{ borderBottom: '1px solid #E8E5E0' }}>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <a href={`/results/${s.id}`} target="_blank" rel="noopener noreferrer" style={{ color: '#1A1A1A', textDecoration: 'none', fontWeight: 500 }}>{s.name}</a>
                        <div style={{ fontSize: '11px', color: '#AEAAA4', marginTop: '1px' }}>{s.email}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#6B6860', whiteSpace: 'nowrap' }}>{s.company}</td>
                      <td style={{ padding: '12px 16px', color: '#6B6860', whiteSpace: 'nowrap' }}>{TRACK_LABELS[s.track]}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1A1A1A' }}>{s.score}</td>
                      <td style={{ padding: '12px 16px', color: '#6B6860', whiteSpace: 'nowrap' }}>{s.tier}</td>
                      <td style={{ padding: '12px 16px', color: '#6B6860', whiteSpace: 'nowrap' }}>{s.top_gap ?? '—'}</td>
                      <td style={{ padding: '12px 16px', color: '#6B6860', whiteSpace: 'nowrap' }}>{budgetLabel}</td>
                      <td style={{ padding: '12px 16px', color: '#AEAAA4', whiteSpace: 'nowrap' }}>{new Date(s.created_at).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 16px' }}>
                        {s.cta_clicked
                          ? <span style={{ fontSize: '11px', color: '#2D6A4F', background: '#D8F3DC', padding: '2px 8px', borderRadius: '3px', fontWeight: 500 }}>Yes</span>
                          : <span style={{ fontSize: '11px', color: '#AEAAA4' }}>—</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
