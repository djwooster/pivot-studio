import { Resend } from 'resend'
import type { Track, Tier, FinancialImpact } from '@/types/audit'
import { TRACK_LABELS, TRACK_BOOKING_LABELS } from './questions'

// Lazy — only instantiated when an email function is actually called (not at build time)
function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const fmtDollar = (n: number) =>
  '$' + (n >= 1_000_000
    ? (n / 1_000_000).toFixed(1) + 'M'
    : n >= 1_000
    ? Math.round(n / 1_000) + 'K'
    : n.toLocaleString())

const baseStyle = `font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #ffffff; color: #1A1A1A;`

function getBookingUrl(track: Track): string {
  const map: Record<Track, string> = {
    automate:     process.env.NEXT_PUBLIC_CAL_AUTOMATE_URL    ?? '#',
    see_clearly:  process.env.NEXT_PUBLIC_CAL_SEE_CLEARLY_URL ?? '#',
    build_better: process.env.NEXT_PUBLIC_CAL_BUILD_BETTER_URL ?? '#',
    combined:     process.env.NEXT_PUBLIC_CAL_COMBINED_URL    ?? '#',
  }
  return map[track]
}

export async function sendLeadConfirmation({
  name,
  email,
  track,
  score,
  tier,
  topGap,
  resultsUrl,
  fin,
}: {
  name:       string
  email:      string
  track:      Track
  score:      number
  tier:       Tier
  topGap:     string
  resultsUrl: string
  fin:        FinancialImpact
}) {
  const firstName    = name.split(' ')[0]
  const trackLabel   = TRACK_LABELS[track]
  const bookingLabel = TRACK_BOOKING_LABELS[track]
  const bookingUrl   = getBookingUrl(track)

  await getResend().emails.send({
    from:    process.env.RESEND_FROM_EMAIL!,
    to:      email,
    subject: `Your ${trackLabel} Readiness Score: ${score}/100 — ${tier.name}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="${baseStyle} margin:0; padding:0;">
  <div style="max-width:600px; margin:0 auto; padding:40px 24px;">
    <p style="font-size:13px; color:#AEAAA4; margin:0 0 32px;">AI Readiness Audit · ${trackLabel}</p>

    <div style="background:#FAFAF9; border:1px solid #E8E5E0; border-radius:8px; padding:24px; margin-bottom:32px; text-align:center;">
      <p style="font-size:11px; font-weight:500; letter-spacing:0.06em; text-transform:uppercase; color:#AEAAA4; margin:0 0 8px;">Your Score</p>
      <p style="font-size:52px; font-weight:600; color:#1A1A1A; margin:0; line-height:1;">${score}<span style="font-size:20px; color:#AEAAA4;">/100</span></p>
      <span style="display:inline-block; font-size:12px; font-weight:500; color:${tier.color}; background:${tier.soft}; padding:4px 12px; border-radius:4px; margin-top:12px; letter-spacing:0.04em;">
        ${tier.name} · ${tier.percentile}
      </span>
    </div>

    <h2 style="font-size:20px; font-weight:600; color:#1A1A1A; margin:0 0 8px; letter-spacing:-0.01em;">Hi ${firstName}, here's your summary.</h2>
    <p style="font-size:14px; color:#6B6860; line-height:1.7; margin:0 0 24px;">
      Your top priority gap is <strong>${topGap}</strong>. The estimated first-year impact of addressing your key bottlenecks is <strong>${fmtDollar(fin.totalFirstYearValue)}</strong>.
    </p>

    <a href="${resultsUrl}" style="display:block; background:#1A1A1A; color:#fff; text-decoration:none; padding:14px 24px; border-radius:8px; font-size:14px; font-weight:500; text-align:center; margin-bottom:24px;">
      View my full results →
    </a>

    <div style="border-top:1px solid #E8E5E0; padding-top:24px; margin-top:8px;">
      <p style="font-size:13px; color:#6B6860; margin:0 0 16px; line-height:1.6;">
        Ready to turn your score into a 90-day action plan? Book a free call — we'll walk through your exact gaps and highest-ROI opportunities.
      </p>
      <a href="${bookingUrl}" style="display:inline-block; border:1px solid #E8E5E0; color:#1A1A1A; text-decoration:none; padding:11px 20px; border-radius:8px; font-size:13px; font-weight:500;">
        ${bookingLabel}
      </a>
    </div>

    <p style="font-size:12px; color:#AEAAA4; margin:32px 0 0; line-height:1.5;">
      Pivot Studio · You received this because you completed the AI Readiness Audit.
    </p>
  </div>
</body>
</html>`,
  })
}

export async function sendAgencyAlert({
  name,
  email,
  company,
  role,
  track,
  score,
  tier,
  topGap,
  investmentReadiness,
  financialImpact,
  resultsUrl,
}: {
  name:                string
  email:               string
  company:             string
  role:                string
  track:               Track
  score:               number
  tier:                Tier
  topGap:              string
  investmentReadiness: number
  financialImpact:     number
  resultsUrl:          string
}) {
  const budgetLabels = ['Under $5K', '$5K–$20K', '$20K–$50K', '$50K+']
  const budget       = budgetLabels[Math.max(0, investmentReadiness - 1)]

  await getResend().emails.send({
    from:    process.env.RESEND_FROM_EMAIL!,
    to:      process.env.AGENCY_ALERT_EMAIL!,
    subject: `New lead: ${name} @ ${company} — ${TRACK_LABELS[track]} score ${score} (${tier.name})`,
    html: `
<!DOCTYPE html>
<html>
<body style="${baseStyle} margin:0; padding:0;">
  <div style="max-width:600px; margin:0 auto; padding:40px 24px;">
    <h2 style="font-size:18px; font-weight:600; color:#1A1A1A; margin:0 0 24px;">New audit submission</h2>

    <table style="width:100%; border-collapse:collapse; font-size:13px;">
      ${[
        ['Name',             name],
        ['Email',            email],
        ['Company',          company],
        ['Role',             role],
        ['Track',            TRACK_LABELS[track]],
        ['Score',            `${score}/100`],
        ['Tier',             tier.name],
        ['Top Gap',          topGap],
        ['Investment Range', budget],
        ['Est. Impact',      fmtDollar(financialImpact)],
      ].map(([label, value]) => `
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid #E8E5E0; color:#AEAAA4; width:160px; vertical-align:top;">${label}</td>
          <td style="padding:10px 0; border-bottom:1px solid #E8E5E0; color:#1A1A1A; font-weight:500;">${value}</td>
        </tr>`).join('')}
    </table>

    <a href="${resultsUrl}" style="display:inline-block; background:#1A1A1A; color:#fff; text-decoration:none; padding:13px 24px; border-radius:8px; font-size:14px; font-weight:500; margin-top:28px;">
      View Full Results →
    </a>
  </div>
</body>
</html>`,
  })
}
