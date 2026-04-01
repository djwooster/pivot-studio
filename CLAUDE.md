# Pivot Studio — CLAUDE.md

## Working Style
- Make the code work first, refine later
- Keep solutions simple — don't over-engineer
- Do NOT commit or push after edits unless explicitly asked

## Tech Stack
- Next.js 15 (App Router), TypeScript, Tailwind v4, shadcn/ui, Framer Motion

## Lessons Learned

### CSS
- `overflow-x: hidden` on a parent **breaks `position: sticky`** — use `overflow-x: clip` instead
- Sticky requires all ancestors to have `overflow: visible` (the default)
- Always add `self-start` (or `align-self: start`) to a sticky element inside a grid

### Framer Motion
- Elements with active `transform` (x, y, scale, etc.) break `position: sticky` — keep sticky on a plain wrapper div with no motion props
- Ease cubic bezier arrays must be typed as `[number, number, number, number]` — `number[]` causes a TS error
- Prefer a shared `const EASE: [number, number, number, number] = [...]` over inline arrays

### Next.js
- Always use `<Link href="...">` from `next/link` for internal navigation — never `<a href="...">` (Next.js will throw a build error)
- `<motion.a>` on an internal link is also invalid — wrap content in `<motion.div variants={...}>` and put `<Link>` inside
- External links (e.g. `cal.com`) can still use `<a target="_blank" rel="noopener noreferrer">` or the `ArrowButton` component with `external` prop

### File Editing
- Never use `sed` to edit files — it can zero out files on macOS (`sed -i ''` with certain patterns)
- Always use the Edit tool for targeted changes

### Audit Tool
- Question IDs are coupled across three files — when renumbering questions, always update `QUESTION_MAP` in `lib/audit/scoring.ts` AND all answer index references in `lib/audit/financial.ts` and `app/api/audit/submit/route.ts` together
- Unused `const` vars (e.g. `serif`, unused imports) are ESLint errors in the Next.js build and will break Vercel deployments — clean them up before pushing
- `whiteSpace: 'nowrap'` on an inline `<span>` forces the text onto one line and breaks paragraph flow — use CSS `text-decoration` with `textDecorationStyle` for underlines that need to span line breaks
- Duplicate property keys in inline style objects (e.g. two `height` entries) cause a TypeScript error — use a single property or `borderTop` trick for dashed line visuals

## Design Tokens
- Primary bg: `#ffffff`, text: `#0a0a0a`
- Dark/contrast sections: `#0a0a0a` bg, white text (HowItWorks, ROIMath, CTA)
- Border radius: `0` everywhere
- Hero uses `roi-dashboard.png` (not SVG) — "no images" rule has this exception
- No gradients (minor exceptions: fade overlays)
- Audit palette: `#1A1A1A` text, `#E8E5E0` borders, `#FAFAF9` subtle bg, `#6B6860` secondary text, `#AEAAA4` muted text, `#4a9e6b` / `#2D6A4F` green accents
