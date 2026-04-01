import Anthropic from '@anthropic-ai/sdk'
import type { FinancialImpact, Track } from '@/types/audit'
import { TRACK_LABELS } from './questions'
import { fmtDollar } from './tokens'

const TRACK_FOCUS: Record<Track, string> = {
  automate:     'workflow automation and eliminating manual, repetitive work',
  see_clearly:  'data visibility, reporting automation, and decision intelligence',
  build_better: 'custom AI tooling and embedded intelligence in their core product or service',
  combined:     'end-to-end automation, data intelligence, and custom AI systems',
}

export interface NarrativeSection {
  heading: string
  body:    string
}

export async function generateFinancialNarrative({
  company,
  role,
  track,
  score,
  tier,
  topGap,
  fin,
}: {
  company: string
  role:    string
  track:   Track
  score:   number
  tier:    string
  topGap:  string
  fin:     FinancialImpact
}): Promise<NarrativeSection[]> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const prompt = `You are writing the financial narrative section of a business AI readiness report.

Context:
- Company: ${company}
- Role: ${role}
- Track: ${TRACK_LABELS[track]} (focused on ${TRACK_FOCUS[track]})
- Readiness score: ${score}/100 (${tier})
- Top priority gap: ${topGap}
- Hours of manual work per week: ${fin.hoursWasted}
- Annual hours lost: ${fin.annualHoursLost}
- Labor cost recovered via automation: ${fmtDollar(fin.automationRecovery)} (${fin.annualHoursLost} hrs × $75/hr × recovery rate)
- Revenue unlocked: ${fmtDollar(fin.revenueUnlock)} (from freed capacity and faster conversions)
- Total first-year value: ${fmtDollar(fin.totalFirstYearValue)}
- Monthly run-rate impact: ${fmtDollar(fin.monthlyImpact)}

Return a JSON array of 2–3 sections. Each section has a short bold heading and 1–2 sentences of body copy.

Section 1: Where the numbers come from — explain the labor math in plain terms.
Section 2: How AI gets them there — specific to their track focus, what actually changes.
Section 3 (optional): The compounding effect — what this unlocks beyond year one.

Tone: confident, direct, sophisticated. No hype. No em-dashes.

Return only valid JSON. Example shape:
[{"heading": "...", "body": "..."}]`

  const message = await client.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 500,
    messages:   [{ role: 'user', content: prompt }],
  })

  const block = message.content[0]
  if (block.type !== 'text') return []

  try {
    const json = block.text.trim().replace(/^```json\n?|```$/g, '')
    return JSON.parse(json) as NarrativeSection[]
  } catch {
    return []
  }
}
