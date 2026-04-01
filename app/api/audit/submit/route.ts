import { NextRequest, NextResponse } from 'next/server'
import { computeScore, getTier, getTopGap } from '@/lib/audit/scoring'
import { calcFinancialImpact }               from '@/lib/audit/financial'
import { createServiceClient }               from '@/lib/audit/supabase'
import { sendLeadConfirmation, sendAgencyAlert } from '@/lib/audit/email'
import type { Track, AuditLead }             from '@/types/audit'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      answers,
      lead,
      track,
      utmSource,
      utmMedium,
      utmCampaign,
    }: {
      answers:     Record<number, number>
      lead:        AuditLead
      track:       Track
      utmSource?:  string
      utmMedium?:  string
      utmCampaign?:string
    } = body

    // Score
    const { total, cats } = computeScore(answers, track)
    const tier            = getTier(total)
    const topGap          = getTopGap(cats)

    // Financial model
    const fin = calcFinancialImpact(answers, track)

    // Supabase insert
    const supabase = createServiceClient()

    const { data, error } = await supabase
      .from('audit_submissions')
      .insert({
        name:             lead.name,
        email:            lead.email,
        company:          lead.company,
        role:             lead.role,
        track,
        answers,
        score:            total,
        tier:             tier.name,
        cats,
        financial_impact: fin,
        top_gap:          topGap,
        source:           'agency',
        utm_source:       utmSource  ?? null,
        utm_medium:       utmMedium  ?? null,
        utm_campaign:     utmCampaign ?? null,
      })
      .select('id')
      .single()

    if (error || !data) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
    }

    const id           = data.id as string
    const finalResults = `${process.env.NEXT_PUBLIC_APP_URL}/results/${id}`

    // Update with results URL (non-blocking)
    supabase
      .from('audit_submissions')
      .update({ results_url: finalResults })
      .eq('id', id)
      .then(() => {})

    // Send emails (non-blocking — don't fail the submission if emails error)
    Promise.allSettled([
      sendLeadConfirmation({
        name:       lead.name,
        email:      lead.email,
        track,
        score:      total,
        tier,
        topGap,
        resultsUrl: finalResults,
        fin,
      }),
      sendAgencyAlert({
        name:                lead.name,
        email:               lead.email,
        company:             lead.company,
        role:                lead.role,
        track,
        score:               total,
        tier,
        topGap,
        investmentReadiness: answers[8] ?? 1,
        financialImpact:     fin.totalFirstYearValue,
        resultsUrl:          finalResults,
      }),
    ]).catch(console.error)

    // n8n webhook — fire-and-forget, never fail the submission
    if (process.env.N8N_WEBHOOK_URL) {
      fetch(process.env.N8N_WEBHOOK_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          id,
          name:                lead.name,
          email:               lead.email,
          company:             lead.company,
          role:                lead.role,
          track,
          score:               total,
          tier:                tier.name,
          topGap,
          investmentReadiness: answers[8] ?? 1,
          hoursWasted:         answers[2] ?? 10,
          financialImpact:     fin.totalFirstYearValue,
          resultsUrl:          finalResults,
          createdAt:           new Date().toISOString(),
          utmSource:           utmSource  ?? null,
          utmMedium:           utmMedium  ?? null,
          utmCampaign:         utmCampaign ?? null,
        }),
      }).catch(() => {})  // intentionally swallow — never block
    }

    return NextResponse.json({ id })
  } catch (err) {
    console.error('Submit route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
