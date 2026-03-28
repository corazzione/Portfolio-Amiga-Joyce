# Phase 2: Navigation Shell - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning
**Source:** Auto mode (--auto) — all decisions are recommended defaults

<domain>
## Phase Boundary

Site-wide persistent navigation: TopNav (transparent→solid on scroll), fixed BottomBar (always visible, black bg), and a fullscreen dark overlay menu (AnimatePresence-driven). Navigation is live on all pages and covers all viewport sizes. Hero section, sections, and sub-pages are separate phases.

</domain>

<decisions>
## Implementation Decisions

### TopNav Scroll Behavior
- Transparent (`bg-transparent`) when page is at top (< 80px scroll)
- Transitions to `bg-dark/95 backdrop-blur-sm` with smooth CSS transition at 80px threshold
- Uses `useScrollY` or a scroll event listener with `useState` to toggle the class
- Must be a Client Component (`'use client'`) due to scroll listener
- Positioned `fixed top-0 w-full z-50` to stay above all content
- Shows: "MC." logo left, tagline center/right, "Contato" button right

### BottomBar Layout
- Fixed `bottom-0 w-full z-50` on black background (`bg-dark`)
- Height: `h-[60px]`, `padding-bottom: env(safe-area-inset-bottom)` for iOS home bar
- Left: "Menu+" gold pill button (`bg-gold text-dark rounded-full`) — triggers menu overlay
- Center: "Corazón" white text (`text-white font-switzer`)
- `AnimatePresence` for the menu overlay lives HERE (always mounted) per PITFALLS.md decision
- Body needs `pb-[60px]` globally to prevent content hiding under bottom bar

### Menu Overlay Animation
- Full-screen overlay: `fixed inset-0 z-[100] bg-dark/95`
- AnimatePresence with `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` → `exit={{ opacity: 0, y: 20 }}`
- Duration: 0.4s with `ease: [0.22, 1, 0.36, 1]` (matches project animation curve)
- Close button: top-right "✕" or custom close icon, white
- Menu overlay is NOT inside a separate component that gets unmounted — AnimatePresence wraps from BottomBar

### Menu Overlay Content
- Navigation links: "Início", "Portfólio", "Contato"
- Social links: Instagram, X (Twitter) icons in footer area of overlay
- Link click: closes overlay + navigates (set `isOpen = false` before `router.push`)
- Uses Next.js `<Link>` for navigation (not `<a>`)
- Logo "MC." visible at top of overlay

### Mobile Layout
- Same structural components on all screen sizes — no separate mobile nav
- On mobile (< 809px): nav links in overlay stack vertically with larger text (2xl+)
- On desktop: overlay can also show nav links side-by-side or remain vertical (Claude's discretion)
- BottomBar height and layout consistent across breakpoints
- Touch targets: minimum 44×44px for all interactive elements in overlay

### Global Layout Integration
- `BottomBar` added to `app/layout.tsx` as a persistent child (not per-page)
- `TopNav` added to `app/layout.tsx` as a persistent child
- `body` in `globals.css` gets `padding-bottom: 60px` to offset the fixed BottomBar

### Claude's Discretion
- Exact Framer Motion variant names for the overlay animation
- Whether overlay nav links animate in with stagger after overlay appears
- Desktop overlay max-width centering vs full-width links
- Exact `useScrollY` vs scroll event listener implementation

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` — NAV-01 through NAV-05 define exact acceptance criteria for every navigation component

### Architecture patterns
- `.planning/research/ARCHITECTURE.md` — AnimatePresence menu overlay pattern (Section: "Fullscreen Menu Overlay"), component hierarchy, Server vs Client split

### Critical pitfalls
- `.planning/research/PITFALLS.md` — Pitfall about AnimatePresence: MUST live in always-mounted parent (BottomBar.tsx), NOT inside the overlay component itself; exit animations won't fire otherwise

### Visual reference
- `index.html` — Complete HTML mockup; inspect the `.bottom-bar`, `.menu-overlay`, and `.top-nav` sections for exact visual spec and Portuguese copy

### Foundation (Phase 1 outputs)
- `app/layout.tsx` — Integration point: TopNav and BottomBar must be added here as persistent layout children
- `app/globals.css` — Must add `padding-bottom: 60px` to body for BottomBar offset
- `lib/animation-variants.ts` — Existing easing curve `[0.22, 1, 0.36, 1]` must be reused for overlay animation
- `tailwind.config.ts` — `bg-dark`, `bg-gold`, `text-white`, `font-switzer` tokens already configured

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/animation-variants.ts`: `fadeUp`, `spring` variants — use spring or custom cubic for overlay entrance
- `components/motion/RevealWrapper.tsx`: Pattern for `'use client'` + `motion/react` imports to follow exactly
- `lib/utils.ts`: `cn()` utility for conditional Tailwind class composition (transparent/solid nav toggle)

### Established Patterns
- Motion imports: always `from 'motion/react'` (NOT `from 'framer-motion'`) — established in Phase 1
- Client components: push `'use client'` down to the specific component, keep layout.tsx as Server Component
- Font classes: `font-switzer` and `font-sans` are already on `<html>` — BottomBar and TopNav inherit automatically
- Tailwind tokens: `bg-dark` (#1a1a1a), `bg-gold` (#C8973A), `bg-bg` (#EFE8DC), `text-white` — all available

### Integration Points
- `app/layout.tsx` → add `<TopNav />` and `<BottomBar />` as siblings before `{children}`
- `app/globals.css` → add `pb-[60px]` to `body` layer rule
- `app/page.tsx` → will later contain hero section; TopNav must be transparent over it

</code_context>

<specifics>
## Specific Ideas

- Bottom bar "Menu+" pill must use `bg-gold text-dark` (mustard gold with dark text for contrast)
- "Corazón" brand text in bottom bar must be Switzer font, white, centered
- The overlay must feel cinematic — not a sliding drawer but a true full-screen takeover
- Close button should be visible and easy to tap on mobile (top-right corner of overlay)
- Nav links in overlay should be large and editorial (Switzer, 3xl+ on desktop, 2xl on mobile)

</specifics>

<deferred>
## Deferred Ideas

- Smooth scroll via Lenis — out of scope for v1 (noted in requirements as v2)
- Custom cursor — out of scope for v1
- Page transition animations — AnimatePresence at layout level broken in Next.js 14 App Router (noted in PITFALLS.md)

</deferred>

---

*Phase: 02-navigation-shell*
*Context gathered: 2026-03-28 via auto mode*
