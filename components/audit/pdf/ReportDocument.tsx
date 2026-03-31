import React from 'react'
import {
  Document, Page, Text, View, StyleSheet, renderToBuffer,
} from '@react-pdf/renderer'
import type { AuditSubmission } from '@/types/audit'
import { TRACK_LABELS, DIMENSION_LABELS } from '@/lib/audit/questions'

const fmtDollar = (n: number) =>
  '$' + (n >= 1_000_000 ? (n/1_000_000).toFixed(1) + 'M' : n >= 1_000 ? Math.round(n/1_000) + 'K' : n.toLocaleString())

const styles = StyleSheet.create({
  page:        { padding: 48, fontFamily: 'Helvetica', backgroundColor: '#FFFFFF', color: '#1A1A1A' },
  header:      { marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid #E8E5E0' },
  eyebrow:     { fontSize: 9, color: '#AEAAA4', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  h1:          { fontSize: 26, fontFamily: 'Helvetica-Bold', color: '#1A1A1A', marginBottom: 4, letterSpacing: -0.5 },
  h2:          { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#1A1A1A', marginBottom: 8 },
  body:        { fontSize: 10, color: '#6B6860', lineHeight: 1.6 },
  label:       { fontSize: 9, color: '#AEAAA4', fontFamily: 'Helvetica-Bold', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 },
  section:     { marginBottom: 24 },
  row:         { flexDirection: 'row', borderBottom: '1px solid #E8E5E0', paddingVertical: 8 },
  rowLabel:    { width: 160, fontSize: 10, color: '#AEAAA4' },
  rowValue:    { flex: 1, fontSize: 10, color: '#1A1A1A', fontFamily: 'Helvetica-Bold' },
  scoreCard:   { backgroundColor: '#FAFAF9', border: '1px solid #E8E5E0', padding: 20, marginBottom: 20 },
  metricGrid:  { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  metricCard:  { width: '47%', padding: 14, border: '1px solid #E8E5E0', backgroundColor: '#F7F6F3' },
  metricLabel: { fontSize: 8, color: '#6B6860', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  metricValue: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#1A1A1A' },
  metricSub:   { fontSize: 8, color: '#AEAAA4', marginTop: 2 },
  insightRow:  { padding: 12, borderBottom: '1px solid #E8E5E0', backgroundColor: '#FFFFFF' },
  insightHead: { flexDirection: 'row', marginBottom: 6, alignItems: 'center' },
  tag:         { fontSize: 8, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5, textTransform: 'uppercase', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 3, marginLeft: 8 },
  dimText:     { fontSize: 9, color: '#AEAAA4', letterSpacing: 0.5, textTransform: 'uppercase' },
  footer:      { marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #E8E5E0' },
  footerText:  { fontSize: 8, color: '#AEAAA4' },
})

const STATUS_CONFIG = {
  strength:    { label: 'Strength',    color: '#2D6A4F', bg: '#D8F3DC' },
  opportunity: { label: 'Opportunity', color: '#7D4E00', bg: '#FFF3CD' },
  gap:         { label: 'Gap',         color: '#6B1E1E', bg: '#FDECEA' },
}

const INSIGHT_COPY: Record<string, string[]> = {
  current_state: [
    'Your business is in the pre-automation phase. The highest-ROI first step is identifying the top 3 processes consuming the most human hours.',
    'You\'ve started building a foundation, but disconnected tools are creating data silos. Connect what you have before adding more complexity.',
    'Your automation instincts are strong. The next layer is intelligence — moving from task automation to decision automation.',
    'You\'re operating at a level most businesses never reach. Your edge now is speed of iteration and custom AI no off-the-shelf tool can replicate.',
  ],
  pain_intensity: [
    'Even 5 hours saved weekly compounds to 260 hours annually — enough for a major strategic initiative.',
    'You\'re losing 2+ full workdays per month. A single automation workflow could recover this in the first week.',
    'That\'s over $50K in annual labor on tasks a system could handle — one of the fastest ROI opportunities available.',
    'This is a six-figure drain. At this volume you\'re not just losing money — you\'re losing the ability to scale.',
  ],
  growth_trajectory: [
    'Automation is your fastest path to control. When systems handle the routine, your team can focus on stabilizing the core.',
    'The ceiling on steady growth is almost always operational — the same team doing the same tasks can only output so much.',
    'Operational strain during scale is the #1 reason good businesses plateau. Build the systems now that support your next level.',
    'At this velocity, every week you delay an automation build costs you compounding opportunity.',
  ],
  ai_awareness: [
    'Starting fresh is an advantage — we can architect your AI stack correctly from day one.',
    'ChatGPT fluency is a solid starting point. The leap to embedded AI workflows is where business value compounds.',
    'You\'re in the top 20% of AI adoption. Operationalizing your tools is a system design question — that\'s what we build.',
    'You\'re already thinking at the level most businesses won\'t reach for 3 more years. Build your durable competitive edge now.',
  ],
}

function ReportDocument({ s }: { s: AuditSubmission }) {
  const fin        = s.financial_impact
  const tierColors: Record<string, string> = {
    'Operational Novice':        '#8B8B8B',
    'Emerging Optimizer':        '#B07D3A',
    'Scaling Operator':          '#2D6A8F',
    'High-Performance Operator': '#2D6A4F',
  }
  const tierColor = tierColors[s.tier] ?? '#8B8B8B'
  const budgetLabel = ['Under $5K', '$5K–$20K', '$20K–$50K', '$50K+'][Math.max(0, (s.answers?.[5] ?? 1) - 1)]

  const insights = ['current_state', 'pain_intensity', 'growth_trajectory', 'ai_awareness'].map(cat => {
    const score  = s.cats[cat] ?? 50
    const text   = INSIGHT_COPY[cat]?.[Math.min(3, Math.floor(score / 25))] ?? ''
    const status = score >= 75 ? 'strength' : score >= 50 ? 'opportunity' : 'gap'
    return { cat, score, text, dim: DIMENSION_LABELS[cat], status: status as 'strength' | 'opportunity' | 'gap' }
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>AI Readiness Report · {TRACK_LABELS[s.track]}</Text>
          <Text style={styles.h1}>AI Readiness Audit</Text>
          <Text style={[styles.body, { marginTop: 4 }]}>{s.company} · {new Date(s.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
        </View>

        {/* Score */}
        <View style={styles.scoreCard}>
          <Text style={[styles.label, { marginBottom: 8 }]}>Readiness Score</Text>
          <Text style={{ fontSize: 48, fontFamily: 'Helvetica-Bold', color: tierColor, lineHeight: 1 }}>{s.score}<Text style={{ fontSize: 18, color: '#AEAAA4' }}>/100</Text></Text>
          <Text style={[styles.body, { marginTop: 6 }]}>{s.tier} · {s.cats ? Object.keys(s.cats).length : 0} dimensions assessed · {budgetLabel} investment range</Text>
        </View>

        {/* Report Summary */}
        <View style={styles.section}>
          <Text style={styles.h2}>Report Summary</Text>
          {[
            ['Name',             s.name],
            ['Company',          s.company],
            ['Role',             s.role],
            ['Track',            TRACK_LABELS[s.track]],
            ['Top Priority Gap', s.top_gap ?? 'N/A'],
          ].map(([label, value]) => (
            <View key={label} style={styles.row}>
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Financial Impact */}
        {fin && (
          <View style={styles.section}>
            <Text style={styles.h2}>Financial Impact Model</Text>
            <View style={styles.metricGrid}>
              {[
                { label: 'Labor Cost Recovered',  value: fmtDollar(fin.automationRecovery),   sub: `${fin.annualHoursLost} hrs/yr at $75/hr` },
                { label: 'Revenue Unlocked',       value: fmtDollar(fin.revenueUnlock),         sub: 'New capacity × conversion' },
                { label: 'Total First-Year Value', value: fmtDollar(fin.totalFirstYearValue),   sub: 'Conservative estimate' },
                { label: 'Monthly Impact',         value: fmtDollar(fin.monthlyImpact),          sub: 'Post-implementation run-rate' },
              ].map(({ label, value, sub }) => (
                <View key={label} style={styles.metricCard}>
                  <Text style={styles.metricLabel}>{label}</Text>
                  <Text style={styles.metricValue}>{value}</Text>
                  <Text style={styles.metricSub}>{sub}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Key Insights */}
        <View style={styles.section}>
          <Text style={styles.h2}>Key Insights</Text>
          <View style={{ border: '1px solid #E8E5E0', borderRadius: 8, overflow: 'hidden' }}>
            {insights.map(({ dim, status, score, text }) => {
              const cfg = STATUS_CONFIG[status]
              return (
                <View key={dim} style={styles.insightRow}>
                  <View style={styles.insightHead}>
                    <Text style={styles.dimText}>{dim}</Text>
                    <Text style={[styles.tag, { color: cfg.color, backgroundColor: cfg.bg }]}>{cfg.label}</Text>
                    <Text style={[styles.body, { marginLeft: 'auto' }]}>{score}%</Text>
                  </View>
                  <Text style={styles.body}>{text}</Text>
                </View>
              )
            })}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated by Pivot Studio · AI Readiness Audit · pivoting.studio</Text>
        </View>
      </Page>
    </Document>
  )
}

export async function generatePdfBuffer(submission: AuditSubmission): Promise<Buffer> {
  const buffer = await renderToBuffer(<ReportDocument s={submission} />)
  return Buffer.from(buffer)
}
