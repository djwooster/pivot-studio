import type { Track } from '@/types/audit'

export const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
export const serif = 'var(--font-instrument-serif), Georgia, serif'

export const fmtDollar = (n: number): string =>
  '$' + (n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + 'M' : n >= 1_000 ? Math.round(n / 1_000) + 'K' : n.toLocaleString())

export function getBookingUrl(track: Track): string {
  const map: Record<Track, string> = {
    automate:     process.env.NEXT_PUBLIC_CAL_AUTOMATE_URL     ?? '#',
    see_clearly:  process.env.NEXT_PUBLIC_CAL_SEE_CLEARLY_URL  ?? '#',
    build_better: process.env.NEXT_PUBLIC_CAL_BUILD_BETTER_URL ?? '#',
    combined:     process.env.NEXT_PUBLIC_CAL_COMBINED_URL     ?? '#',
  }
  return map[track]
}
