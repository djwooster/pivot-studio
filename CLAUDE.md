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

## Design Tokens
- Primary bg: `#ffffff`, text: `#0a0a0a`
- Dark/contrast sections: `#0a0a0a` bg, white text (HowItWorks, ROIMath, CTA)
- Border radius: `0` everywhere
- No images — SVG only
- No gradients (minor exceptions: fade overlays)
