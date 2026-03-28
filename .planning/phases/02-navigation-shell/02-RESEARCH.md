# Phase 2: Navigation Shell - Research

**Researched:** 2026-03-28
**Domain:** Next.js 14 App Router — fixed navigation, AnimatePresence overlay, scroll-driven TopNav transparency
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**TopNav Scroll Behavior**
- Transparent (`bg-transparent`) when page is at top (< 80px scroll)
- Transitions to `bg-dark/95 backdrop-blur-sm` with smooth CSS transition at 80px threshold
- Uses `useScrollY` or a scroll event listener with `useState` to toggle the class
- Must be a Client Component (`'use client'`) due to scroll listener
- Positioned `fixed top-0 w-full z-50` to stay above all content
- Shows: "MC." logo left, tagline center/right, "Contato" button right

**BottomBar Layout**
- Fixed `bottom-0 w-full z-50` on black background (`bg-dark`)
- Height: `h-[60px]`, `padding-bottom: env(safe-area-inset-bottom)` for iOS home bar
- Left: "Menu+" gold pill button (`bg-gold text-dark rounded-full`) — triggers menu overlay
- Center: "Corazón" white text (`text-white font-switzer`)
- `AnimatePresence` for the menu overlay lives HERE (always mounted) per PITFALLS.md decision
- Body needs `pb-[60px]` globally to prevent content hiding under bottom bar

**Menu Overlay Animation**
- Full-screen overlay: `fixed inset-0 z-[100] bg-dark/95`
- AnimatePresence with `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` → `exit={{ opacity: 0, y: 20 }}`
- Duration: 0.4s with `ease: [0.22, 1, 0.36, 1]` (matches project animation curve)
- Close button: top-right "✕" or custom close icon, white
- Menu overlay is NOT inside a separate component that gets unmounted — AnimatePresence wraps from BottomBar

**Menu Overlay Content**
- Navigation links: "Início", "Portfólio", "Contato"
- Social links: Instagram, X (Twitter) icons in footer area of overlay
- Link click: closes overlay + navigates (set `isOpen = false` before `router.push`)
- Uses Next.js `<Link>` for navigation (not `<a>`)
- Logo "MC." visible at top of overlay

**Mobile Layout**
- Same structural components on all screen sizes — no separate mobile nav
- On mobile (< 809px): nav links in overlay stack vertically with larger text (2xl+)
- BottomBar height and layout consistent across breakpoints
- Touch targets: minimum 44×44px for all interactive elements in overlay

**Global Layout Integration**
- `BottomBar` added to `app/layout.tsx` as a persistent child (not per-page)
- `TopNav` added to `app/layout.tsx` as a persistent child
- `body` in `globals.css` gets `padding-bottom: 60px` to offset the fixed BottomBar

### Claude's Discretion
- Exact Framer Motion variant names for the overlay animation
- Whether overlay nav links animate in with stagger after overlay appears
- Desktop overlay max-width centering vs full-width links
- Exact `useScrollY` vs scroll event listener implementation

### Deferred Ideas (OUT OF SCOPE)
- Smooth scroll via Lenis — out of scope for v1 (noted in requirements as v2)
- Custom cursor — out of scope for v1
- Page transition animations — AnimatePresence at layout level broken in Next.js 14 App Router (noted in PITFALLS.md)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Top navbar shows "MC." logo left and "Uma Contadora de Histórias Visual" tagline, with a "Contato" button right; transparent over hero, solid on scroll | Scroll listener pattern with `useState`, CSS transition on `bg-dark/95 backdrop-blur-sm`; `'use client'` required |
| NAV-02 | Fixed bottom bar persists on all pages with: "Menu+" gold pill button left, "Corazón" white text center, on black background | `fixed bottom-0 inset-x-0`, `bg-dark`, iOS safe-area padding; `pb-[60px]` on body |
| NAV-03 | Clicking "Menu+" opens a fullscreen dark overlay menu with animated entrance (slide/fade) | AnimatePresence in BottomBar (always-mounted parent), `motion.div` with opacity+y transition |
| NAV-04 | Fullscreen menu overlay shows navigation links and closes on link click or close button | `isOpen = false` before navigation; `<Link>` not `<a>`; close button top-right; scroll lock via `useEffect` |
| NAV-05 | Mobile menu overlay covers the full viewport with vertical navigation layout | `fixed inset-0`, `flex flex-col items-center justify-center`, `clamp(36px,6vw,72px)` font size |
</phase_requirements>

---

## Summary

Phase 2 builds the site-wide persistent navigation shell: a transparent-to-solid TopNav, a fixed black BottomBar, and a fullscreen cinematic menu overlay. All three components must be live in `app/layout.tsx` so they persist across every route without re-mounting.

The critical architectural insight is AnimatePresence placement. The overlay's exit animation only fires if `AnimatePresence` lives in a component that remains mounted while the child is exiting. `BottomBar.tsx` is always mounted in the layout and therefore owns `AnimatePresence` — the overlay is a `motion.div` child rendered conditionally inside it, not a separate component with its own AnimatePresence. This is the #1 pitfall for this phase.

TopNav has a secondary subtlety: it must be a Client Component (`'use client'`) to listen to scroll events, even though its markup is otherwise static. The scroll threshold is 80px. The transparent state uses `pointer-events: none` on the container (matching the mockup) with `pointer-events: all` on interactive children, so the hero section is fully clickable through the invisible nav background.

**Primary recommendation:** Build BottomBar first (with overlay working), then TopNav, then wire both into layout.tsx and add the body padding. This order means the most complex piece (AnimatePresence overlay) is validated in isolation before integration.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `motion` | ^12.x | AnimatePresence overlay, motion.div entrance/exit | Project-wide animation library; `motion/react` import; already installed in Phase 1 |
| `next/navigation` | (Next.js 14 built-in) | `useRouter` for programmatic navigation on link click | Required for `router.push` inside the overlay link handler |
| `clsx` + `tailwind-merge` | ^2.x each | `cn()` utility for conditional Tailwind class composition | TopNav transparent/solid toggle; already available via `lib/utils.ts` |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React `useState` | (built-in) | `isOpen` boolean for overlay, `scrolled` boolean for TopNav | All interactivity is local state — no global store needed |
| React `useEffect` | (built-in) | Scroll listener + cleanup, body overflow lock | Both TopNav scroll tracking and overlay scroll lock |
| `next/link` | (Next.js 14 built-in) | Navigation links inside overlay | Required — `<Link>` prefetches routes; `<a>` does not |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `window.scrollY` in scroll listener | Motion `useMotionValueEvent` + `useScroll` | Motion approach is cleaner but adds complexity; `scrollY` with `useState` is simpler and sufficient for a binary transparent/solid toggle |
| Inline `motion.div` overlay in BottomBar | Separate `MenuOverlay.tsx` component | Separate file improves readability but MUST NOT own its own AnimatePresence; if split, AnimatePresence must stay in BottomBar |
| CSS `transition` on nav background | Motion `animate` on nav | CSS transition is perfectly adequate here — no need to add a Motion dependency to TopNav scroll behavior |

**Installation:** No new packages needed. `motion`, `clsx`, `tailwind-merge`, and `next/link` are all already available from Phase 1.

---

## Architecture Patterns

### Recommended Project Structure

```
components/
└── layout/
    ├── TopNav.tsx          # 'use client' — scroll listener, transparent/solid toggle
    ├── BottomBar.tsx       # 'use client' — owns isOpen state + AnimatePresence + overlay markup
    └── (MenuOverlay can be inline in BottomBar OR extracted as a presentational component)
```

The ARCHITECTURE.md recommends `components/layout/` for both. `MenuOverlay.tsx` can be a sub-component but its AnimatePresence wrapper must stay in `BottomBar.tsx`.

### Pattern 1: BottomBar with Inline AnimatePresence Overlay

**What:** BottomBar is a single Client Component that owns `isOpen` state, renders the fixed bar, and wraps the overlay in `AnimatePresence`. The overlay `motion.div` is a direct child of AnimatePresence — conditionally rendered by `isOpen`.

**When to use:** Always — this is the mandatory pattern for this phase per PITFALLS.md.

**Example:**
```tsx
// components/layout/BottomBar.tsx
'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Contato', href: '/contato' },
]

export function BottomBar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // Scroll lock when overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  function handleLinkClick(href: string) {
    setIsOpen(false)
    router.push(href)
  }

  return (
    <>
      {/* Fixed bottom bar */}
      <div
        className="fixed bottom-0 inset-x-0 z-[200] bg-dark flex items-center justify-center"
        style={{
          height: '60px',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="absolute left-0 top-0 h-full px-6 bg-gold text-dark font-switzer font-bold text-xs tracking-widest uppercase flex items-center gap-2"
          aria-label="Abrir menu"
        >
          Menu <span className="text-base font-light">+</span>
        </button>
        <span className="font-switzer font-bold text-xs tracking-widest uppercase text-white">
          Corazón
        </span>
      </div>

      {/* Fullscreen overlay — AnimatePresence MUST live here in BottomBar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[300] bg-dark flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-8 text-white text-3xl leading-none"
              aria-label="Fechar menu"
            >
              ✕
            </button>

            {/* Logo at top */}
            <span className="absolute top-6 left-8 font-switzer font-bold text-white text-sm tracking-widest uppercase">
              MC.
            </span>

            <nav className="flex flex-col items-center gap-10">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => handleLinkClick(href)}
                  className="font-switzer font-bold text-white hover:text-gold transition-colors"
                  style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-0.02em' }}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Social links footer area */}
            <div className="absolute bottom-8 left-8 flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors text-sm font-switzer tracking-widest uppercase">
                Instagram
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors text-sm font-switzer tracking-widest uppercase">
                X
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

### Pattern 2: TopNav Scroll Transparency

**What:** `TopNav` is a Client Component that listens to `window.scroll` to toggle a `scrolled` boolean. Tailwind classes swap from transparent to `bg-dark/95 backdrop-blur-sm`. A CSS `transition` handles the visual smoothness — no Motion needed here.

**When to use:** Always for the TopNav — binary transparent/solid is all that's needed.

**Example:**
```tsx
// components/layout/TopNav.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const SCROLL_THRESHOLD = 80

export function TopNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-[200] flex items-center justify-between px-8 py-5',
        'pointer-events-none transition-all duration-300',
        scrolled
          ? 'bg-dark/95 backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      {/* All children need pointer-events-auto to be clickable */}
      <Link href="/" className="pointer-events-auto flex items-center gap-2 font-switzer font-bold text-[13px] tracking-wider uppercase text-dark no-underline">
        <span>MC.</span>
        <span className="text-dark/40 font-normal mx-1">//</span>
        <span className="font-normal text-[12px] tracking-[0.1em] text-dark/60">
          UMA CONTADORA DE HISTÓRIAS VISUAL
        </span>
      </Link>
      <Link
        href="/contato"
        className="pointer-events-auto bg-gold text-white px-5 py-2 rounded font-switzer font-bold text-[11px] tracking-widest uppercase hover:opacity-90 transition-opacity"
      >
        Contato
      </Link>
    </nav>
  )
}
```

**Note on text color when scrolled:** The mockup shows dark text on a transparent nav (over the beige hero placeholder). When `scrolled` the nav becomes `bg-dark/95` — text should switch to `text-white`. Add `scrolled ? 'text-white' : 'text-dark'` on the brand link for correctness.

### Pattern 3: layout.tsx Integration

**What:** Both `TopNav` and `BottomBar` are added as persistent children in the root layout, before `{children}`. The layout stays a Server Component because the nav components themselves carry the `'use client'` directive internally.

**Example:**
```tsx
// app/layout.tsx — UPDATED
import type { Metadata } from 'next'
import { switzer, publicSans } from './fonts'
import './globals.css'
import { TopNav } from '@/components/layout/TopNav'
import { BottomBar } from '@/components/layout/BottomBar'

export const metadata: Metadata = { ... }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${switzer.variable} ${publicSans.variable}`}>
      <body>
        <TopNav />
        {children}
        <BottomBar />
      </body>
    </html>
  )
}
```

### Pattern 4: Body Padding for BottomBar Offset

**What:** Add `padding-bottom: 60px` to the `body` rule in `globals.css` so no page content hides behind the fixed 60px BottomBar.

**Example:**
```css
/* app/globals.css */
@layer base {
  body {
    @apply bg-bg text-dark font-sans antialiased;
    padding-bottom: 60px; /* offset for fixed BottomBar height */
  }
}
```

### Anti-Patterns to Avoid

- **AnimatePresence inside MenuOverlay.tsx:** If you extract the overlay to its own component and put `AnimatePresence` inside it, exit animations will never fire. AnimatePresence must be in `BottomBar.tsx` (always mounted).
- **Making layout.tsx a Client Component:** Do not add `'use client'` to `app/layout.tsx` to avoid prop errors. Keep layout as Server Component; `TopNav` and `BottomBar` self-declare `'use client'`.
- **Using `<a>` instead of `<Link>` in overlay:** `<a>` tags cause full page reload. Use Next.js `<Link>` or `useRouter().push()` for soft navigation.
- **Scroll listener without `passive: true`:** Omitting `{ passive: true }` means the browser cannot optimize scroll performance. Always pass `passive: true` on scroll event listeners.
- **Not cleaning up scroll listener:** Missing the `return () => removeEventListener(...)` in `useEffect` causes a memory leak when components unmount.
- **TopNav `pointer-events-none` forgotten:** Without this on the container, the invisible transparent nav background blocks clicks on the hero content beneath it. The mockup uses this pattern — container is `pointer-events: none`, children are `pointer-events: all`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Overlay exit animation | Manual CSS class toggling with `setTimeout` | `AnimatePresence` from `motion/react` | CSS class removal triggers immediately; you'd need to delay unmount manually — that's exactly what AnimatePresence does |
| Conditional Tailwind classes | String concatenation (`"bg-dark " + (scrolled ? "..." : "")`) | `cn()` from `lib/utils.ts` | Already available; handles conflicts via tailwind-merge; string concat breaks with Tailwind's purge |
| iOS safe-area padding | Custom JS to detect iOS | `env(safe-area-inset-bottom)` CSS | Native browser API; no JS needed; works in all modern browsers |
| Focus trap in overlay | Custom tab-index management | `inert` attribute on background content | Modern browsers support `inert`; simpler than a JS focus trap library for this scope |

**Key insight:** The scroll listener pattern for TopNav is 10 lines of React — do not reach for a library. The AnimatePresence pattern for the overlay is also already in the project stack. Both problems are solved without new dependencies.

---

## Common Pitfalls

### Pitfall 1: AnimatePresence in the Wrong Component
**What goes wrong:** The overlay component is extracted to `MenuOverlay.tsx` and `AnimatePresence` is placed inside it. When `isOpen` becomes false, React unmounts `MenuOverlay` — but `AnimatePresence` is gone before it can run the exit animation. The overlay disappears instantly.
**Why it happens:** Developers naturally group related code; it feels right to put AnimatePresence near the overlay markup.
**How to avoid:** `AnimatePresence` must live in `BottomBar.tsx`. If `MenuOverlay` is extracted as a separate file, it receives `isOpen` as a prop and renders nothing when false — it does NOT own its AnimatePresence.
**Warning signs:** Close button works but overlay disappears without animation.

### Pitfall 2: TopNav Text Invisible on Solid Background
**What goes wrong:** TopNav text is dark (correct over hero) but remains dark after scroll makes the nav `bg-dark/95`. Black text on near-black background is unreadable.
**Why it happens:** Only the background class is toggled; text color is hardcoded.
**How to avoid:** Toggle text color alongside background: `scrolled ? 'text-white' : 'text-dark'`. The "Contato" button already uses `bg-gold text-white` so it's fine — only the brand link text needs to swap.
**Warning signs:** Logo becomes invisible when scrolling down on any non-hero page.

### Pitfall 3: Overlay Does Not Lock Body Scroll
**What goes wrong:** When the fullscreen overlay is open, users can still scroll the page behind it. The overlay content may also scroll unexpectedly on mobile.
**Why it happens:** `overflow: hidden` is not applied to `document.body` when the overlay opens.
**How to avoid:** `useEffect` watching `isOpen` — set `document.body.style.overflow = isOpen ? 'hidden' : ''`. Always clean up in the effect return.
**Warning signs:** Page scrolls behind the overlay; overlay feels "sticky" on mobile scroll.

### Pitfall 4: iOS Home Bar Overlapping BottomBar
**What goes wrong:** On iPhone models with a home indicator (iPhone X and newer), the bottom bar sits at the very bottom edge and the home indicator overlays the "Menu+" button, making it partially untappable.
**Why it happens:** `h-[60px]` is a fixed height that doesn't account for the safe area.
**How to avoid:** Use `style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}` on the BottomBar container. This adds the safe-area height on top of the 60px, pushing content above the home indicator.
**Warning signs:** Bottom bar looks fine in browser devtools but buttons are hard to tap on real iPhones.

### Pitfall 5: `useRouter` Called Outside of Navigation Context
**What goes wrong:** `useRouter` from `next/navigation` throws "invariant: attempted to hard navigate" or causes unexpected full page reloads if used incorrectly.
**Why it happens:** Calling `router.push` synchronously inside an event handler before closing the overlay can cause a race condition.
**How to avoid:** Set `setIsOpen(false)` first, then call `router.push(href)`. The overlay begins its exit animation while navigation starts — visually smooth.
**Warning signs:** Console error about navigation; overlay flashes open then the page changes.

### Pitfall 6: Scroll Listener Fires on Every Pixel
**What goes wrong:** `handleScroll` calls `setScrolled(window.scrollY > 80)` on every scroll event, causing excessive React re-renders even when the `scrolled` value hasn't changed (e.g., scrolling from y=100 to y=150 both satisfy > 80 but still trigger setState).
**Why it happens:** `setState` is called unconditionally.
**How to avoid:** Check current state before calling setState, or use a functional update:
```ts
setScrolled(prev => {
  const shouldBeScrolled = window.scrollY > SCROLL_THRESHOLD
  return prev === shouldBeScrolled ? prev : shouldBeScrolled
})
```
This returns the same reference when value hasn't changed, preventing a re-render.
**Warning signs:** React DevTools shows TopNav re-rendering dozens of times per scroll gesture.

---

## Code Examples

Verified patterns from project research and existing codebase:

### Existing `cn()` utility (from `lib/utils.ts`)
```typescript
// Source: E:/Fotógrafo/lib/utils.ts — already exists
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Existing animation easing curve (from `lib/animation-variants.ts`)
```typescript
// Source: E:/Fotógrafo/lib/animation-variants.ts — already exists
// Reuse this exact easing for the overlay transition:
ease: [0.22, 1, 0.36, 1]  // duration: 0.4 for overlay entrance
```

### Existing RevealWrapper pattern (from `components/motion/RevealWrapper.tsx`)
```typescript
// Source: E:/Fotógrafo/components/motion/RevealWrapper.tsx
// Follow this exact import style for all new Client Components:
'use client'
import { motion, useInView } from 'motion/react'   // NOT 'framer-motion'
```

### Passive scroll listener pattern
```typescript
// Correct scroll listener with passive flag and cleanup
useEffect(() => {
  function handleScroll() {
    setScrolled(window.scrollY > SCROLL_THRESHOLD)
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // check initial scroll position (user may have refreshed mid-page)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

### Body scroll lock pattern
```typescript
// Correct scroll lock with cleanup
useEffect(() => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  return () => { document.body.style.overflow = '' }
}, [isOpen])
```

### iOS safe-area CSS
```tsx
// Inline style required — Tailwind has no env() support for safe-area
<div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
```

### Mockup reference: exact nav HTML structure
```html
<!-- From index.html lines 895-930 -->
<nav class="top-nav">
  <a href="#" class="nav-brand">
    <span>MC.</span>
    <span class="slash">//</span>
    <span class="sub">UMA CONTADORA DE HISTÓRIAS VISUAL</span>
  </a>
  <a href="#faq" class="btn-contact">Contato</a>
</nav>

<div class="bottom-bar">
  <div class="bottom-bar-menu">
    <button class="btn-menu">Menu<span class="plus">+</span></button>
  </div>
  <span class="bottom-name">Corazón</span>
</div>

<div class="menu-overlay">
  <button class="menu-close">✕</button>
  <a>Sobre</a>
  <a>Portfólio</a>
  <a>Blog</a>
  <a>Contato</a>
  <div class="menu-overlay-bottom">
    <a>Termos</a>
    <a>Privacidade</a>
  </div>
</div>
```

**Note:** The CONTEXT.md specifies nav links as "Início", "Portfólio", "Contato" — three links. The mockup has four ("Sobre", "Portfólio", "Blog", "Contato") plus bottom legal links. Use the CONTEXT.md specification as the authority for link content.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import { motion } from 'framer-motion'` | `import { motion } from 'motion/react'` | Late 2024 (Motion v12) | Breaking change — old import still works but `motion/react` is canonical going forward |
| `AnimatePresence` for page transitions in layout | Not supported in App Router; use `template.tsx` per-section reveals | Next.js 14 App Router (2023) | Page transitions are simply not available at layout level |
| `{ passive: false }` scroll listeners | `{ passive: true }` | Modern browsers | Passive listeners allow browser to optimize scroll performance |
| `document.body.className` toggle for overflow lock | `document.body.style.overflow` direct assignment | Always preferred | More predictable; doesn't conflict with other className-based utilities |

**Deprecated/outdated:**
- `framer-motion` package name: superseded by `motion` — project has already adopted `motion/react` imports in Phase 1
- `useMotionValue` + `useTransform` for a simple binary scroll toggle: overkill; `useState` with a scroll listener is correct for on/off behavior

---

## Open Questions

1. **Nav link text color on scroll: dark or light?**
   - What we know: mockup uses dark text on transparent nav (over beige background); on scroll nav becomes `bg-dark/95`
   - What's unclear: CONTEXT.md doesn't explicitly specify the scrolled text color
   - Recommendation: Switch to `text-white` when `scrolled` is true — standard pattern for dark nav backgrounds; Claude's discretion permits this

2. **Desktop overlay: full-width links or max-width centered?**
   - What we know: CONTEXT.md marks this as Claude's discretion
   - What's unclear: No desktop-specific mockup for the overlay
   - Recommendation: Center links in a `max-w-sm` container on desktop — cleaner editorial feel than edge-to-edge text; matches the "cinematic" intent

3. **Stagger on overlay nav links?**
   - What we know: CONTEXT.md marks this as Claude's discretion
   - What's unclear: Whether to use `staggerContainer` from `lib/animation-variants.ts` for the nav links
   - Recommendation: Yes, add a 0.05s stagger delay per link after the overlay opacity+y animation completes (delay: 0.2 offset on first link). Adds polish without complexity.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — no test files or config found in Phase 1 output |
| Config file | Wave 0 gap — needs creation |
| Quick run command | N/A until framework installed |
| Full suite command | N/A until framework installed |

**Note:** Phase 1 delivered the foundation scaffold without a test framework. Navigation components are UI-heavy Client Components with `useEffect` and animation — standard unit testing requires a DOM environment (Jest + jsdom or Playwright for E2E). Given the visual nature of this phase, smoke tests verifying component mount + basic interaction are more valuable than unit tests for animation values.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | TopNav renders and mounts without error | smoke | `npx jest --testPathPattern=TopNav` | ❌ Wave 0 |
| NAV-01 | TopNav applies transparent class at scroll 0 | unit | `npx jest --testPathPattern=TopNav` | ❌ Wave 0 |
| NAV-01 | TopNav applies solid class after scroll > 80 | unit | `npx jest --testPathPattern=TopNav` | ❌ Wave 0 |
| NAV-02 | BottomBar renders fixed bar with correct text | smoke | `npx jest --testPathPattern=BottomBar` | ❌ Wave 0 |
| NAV-03 | Menu opens when "Menu+" is clicked | unit | `npx jest --testPathPattern=BottomBar` | ❌ Wave 0 |
| NAV-04 | Menu closes when close button is clicked | unit | `npx jest --testPathPattern=BottomBar` | ❌ Wave 0 |
| NAV-04 | Body overflow: hidden when menu is open | unit | `npx jest --testPathPattern=BottomBar` | ❌ Wave 0 |
| NAV-05 | Overlay covers full viewport on mobile | manual | Visual check at 375px viewport | manual-only |

**Manual-only justification (NAV-05):** Full-viewport overlay coverage requires a real browser render; jsdom does not implement CSS layout. Verify manually at 375px (iPhone SE) and 390px (iPhone 14) viewports.

### Sampling Rate
- **Per task commit:** `npx jest --testPathPattern="TopNav|BottomBar" --passWithNoTests`
- **Per wave merge:** Full test suite (once framework installed)
- **Phase gate:** Visual verification at mobile + desktop viewports; overlay animation plays and exits correctly; TopNav scroll toggle works

### Wave 0 Gaps
- [ ] `__tests__/components/layout/TopNav.test.tsx` — covers NAV-01 scroll toggle behavior
- [ ] `__tests__/components/layout/BottomBar.test.tsx` — covers NAV-02, NAV-03, NAV-04 open/close and scroll lock
- [ ] `jest.config.js` — base Jest config with jsdom environment
- [ ] `jest.setup.ts` — `@testing-library/jest-dom` import
- [ ] Framework install: `npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest` — if no test infrastructure exists

---

## Sources

### Primary (HIGH confidence)
- `E:/Fotógrafo/.planning/research/ARCHITECTURE.md` — Pattern 5 (BottomBar + AnimatePresence), Anti-Pattern 4 (AnimatePresence nesting), build order
- `E:/Fotógrafo/.planning/research/PITFALLS.md` — Pitfall 1 (use client), Pitfall 2 (AnimatePresence page transitions)
- `E:/Fotógrafo/.planning/phases/02-navigation-shell/02-CONTEXT.md` — All locked decisions for this phase
- `E:/Fotógrafo/index.html` — Visual reference mockup; exact CSS and HTML for `.top-nav`, `.bottom-bar`, `.menu-overlay`
- `E:/Fotógrafo/lib/animation-variants.ts` — Confirmed easing curve `[0.22, 1, 0.36, 1]`
- `E:/Fotógrafo/components/motion/RevealWrapper.tsx` — Confirmed `motion/react` import pattern and `'use client'` convention

### Secondary (MEDIUM confidence)
- `.planning/research/STACK.md` — Motion v12 `motion/react` import convention, `cn()` utility pattern
- `E:/Fotógrafo/app/layout.tsx` (Phase 1 output) — Confirmed layout is a Server Component; integration point confirmed

### Tertiary (LOW confidence)
- None — all findings verified against project files and official architecture docs

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already installed; no new dependencies
- Architecture: HIGH — Pattern 5 in ARCHITECTURE.md documents this exact pattern with code; backed by official Motion docs on AnimatePresence
- Pitfalls: HIGH — AnimatePresence placement verified against project PITFALLS.md; scroll listener patterns are standard React

**Research date:** 2026-03-28
**Valid until:** 2026-06-28 (stable domain — Next.js 14 + Motion v12 API unlikely to change)
