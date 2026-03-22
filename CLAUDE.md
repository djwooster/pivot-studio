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

### CSS (continued)
- `transform: scale()` creates a new containing block — `position: fixed` children are trapped inside and won't escape to the viewport
- `position: fixed` with both `inset-y-0` and an explicit `height` (e.g. `h-svh`): top + height win, bottom is ignored. If the height is shorter than the container, a gap appears at the bottom. Fix with `height: 100%` scoped via a CSS override.
- `min-height` is not a definite height — flex children using `h-full` inside a `min-h-svh` parent will collapse. Use an explicit `height: 100%` on the chain.

### shadcn / Base UI Portals
- All portal-based components (Sheet, Drawer, DropdownMenu, Select) default to portaling into `document.body` — they will escape any scaled/clipped container
- Pattern to scope portals: create a React Context that holds the container `Element | null`, provide it at the wrapper div using a callback ref (`useState`, not `useRef` — so the ref is available on first render), then consume it in each `*Content` component and pass as `container` prop to the `Portal`
- Callback ref: use `const [el, setEl] = useState<HTMLDivElement | null>(null)` + `ref={setEl}` so the element is available synchronously after mount (unlike `useRef` which stays `null` during the first render pass)

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
