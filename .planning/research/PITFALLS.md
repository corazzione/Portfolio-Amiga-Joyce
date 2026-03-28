# Pitfalls Research

**Domain:** Next.js 14 App Router + Framer Motion + Tailwind CSS photographer portfolio
**Researched:** 2026-03-28
**Confidence:** HIGH (critical pitfalls verified via official docs and community issue trackers)

---

## Critical Pitfalls

### Pitfall 1: Framer Motion Components Without "use client" Directive

**What goes wrong:**
Any component that imports from `framer-motion` crashes at build time or throws a hydration error in production. The error is cryptic: `Error: createContext is not a function` or `window is not defined`. This happens because Framer Motion accesses browser-only APIs (`window`, DOM measurement methods) that don't exist in the Node.js SSR environment.

**Why it happens:**
Next.js 14 App Router renders all components as React Server Components by default. Developers move a component into `app/` and forget that any animation-related code must opt into client rendering. The mistake is especially common when wrapping layout-level elements (e.g., a `motion.div` in `layout.tsx` without the directive).

**How to avoid:**
- Add `"use client"` as the very first line of every file that imports from `framer-motion`
- Create thin wrapper components: keep Server Components for data/structure, extract animated parts into `"use client"` leaf components
- Never put `"use client"` on `layout.tsx` itself — create a `<AnimatedLayout>` client component and render it inside the server layout
- Pattern: `app/layout.tsx` (Server) → renders `<AnimatedLayout>` (Client) → renders `{children}` (Server pages inside a client boundary)

**Warning signs:**
- Build error mentioning `window is not defined`
- Runtime error `createContext` or `useContext` called outside provider
- Animation works in dev but breaks in `next build` production

**Phase to address:**
Foundation phase (project scaffolding). Set up `"use client"` conventions before writing any animation code.

---

### Pitfall 2: AnimatePresence Page Transitions Broken in App Router

**What goes wrong:**
`AnimatePresence` does not work for page transitions in Next.js 14 App Router. The exit animation never plays — the outgoing page unmounts instantly. The root cause is that Next.js wraps `{children}` in multiple internal providers that change identity on navigation, so `AnimatePresence` cannot detect which child is entering vs. exiting.

**Why it happens:**
`AnimatePresence` works by tracking its direct children's keys. In the Pages Router, this was straightforward. In the App Router, Next.js renders pages inside many layers of internal context that change during navigation, breaking the child-tracking mechanism.

**How to avoid:**
- Do not attempt `AnimatePresence`-based page transitions at the `layout.tsx` level
- Use `template.tsx` instead of `layout.tsx` for page-level wrappers — `template.tsx` re-renders on every navigation, giving Framer Motion a fresh component to animate in
- Alternatively, animate sections within pages (scroll reveals, section entrances) — these work perfectly and are more appropriate for this portfolio's aesthetic anyway
- The sticky stacked process cards and scroll-reveal system do NOT need `AnimatePresence` — use `whileInView` and `useScroll` instead

**Warning signs:**
- Exit animation duration set but never visibly plays
- Console warning about `AnimatePresence` having no animated children
- Flicker on navigation where the new page appears instantly

**Phase to address:**
Foundation phase. Decide upfront to use `template.tsx` for any page wrappers, or abandon page transitions in favor of per-section scroll animations.

---

### Pitfall 3: Hero Background Video Does Not Autoplay on iOS Safari

**What goes wrong:**
The full-screen hero video plays correctly on desktop and Android but shows a static black frame or poster image on iOS Safari and some mobile browsers. This breaks the cinematic first impression that is central to the portfolio's value proposition.

**Why it happens:**
iOS Safari requires three attributes simultaneously for autoplay: `autoPlay`, `muted`, and `playsInline`. Missing `playsInline` alone is enough to prevent autoplay on iOS — the browser silently falls back to a non-playing state rather than throwing an error. Additionally, Low Power Mode on iOS can prevent autoplay even when all three attributes are present.

**How to avoid:**
```tsx
// Required: all three attributes must be present
<video
  autoPlay
  muted
  playsInline
  loop
  preload="metadata"
>
```
- Never use `autoplay` as a string attribute in JSX — use the camelCase React props
- Always provide a `poster` image as fallback for when video fails (Low Power Mode)
- Keep hero video file under 5MB. Prefer VP9/WebM with MP4 H.264 fallback
- Test on a real iOS device, not just browser dev tools (Safari DevTools mobile simulation does not replicate autoplay restrictions)
- The testimonial section's looping background video has the same requirement

**Warning signs:**
- Video plays fine in Chrome desktop, broken on iPhone
- Black or white rectangle where video should be
- No JavaScript error — iOS silently refuses to play

**Phase to address:**
Hero section implementation phase. Test on a real iOS device immediately after implementing the video element, not after the whole section is styled.

---

### Pitfall 4: Font Flash (FOUT) with Switzer from Fontshare

**What goes wrong:**
On first load and after hard refresh, the page renders briefly in the system fallback font (usually Arial or Times New Roman) before Switzer loads. This causes a visible layout shift and destroys the editorial luxury feel — headlines jump in size and spacing as the font swaps in.

**Why it happens:**
Fontshare serves fonts from an external CDN (`api.fontshare.com`). Fetching from a third-party domain adds DNS lookup + connection overhead. Next.js `next/font` cannot optimize fonts it does not self-host — it only eliminates network requests for Google Fonts and local files.

**How to avoid:**
- Download the Switzer variable font file (`Switzer-Variable.ttf` or `.woff2`) from Fontshare at build time
- Self-host it using `next/font/local` — this eliminates the external request and enables Next.js's zero-layout-shift optimization:
```ts
import localFont from 'next/font/local'

export const switzer = localFont({
  src: './fonts/Switzer-Variable.woff2',
  variable: '--font-switzer',
  display: 'swap',
  preload: true,
})
```
- Do NOT use a `<link>` tag pointing to `api.fontshare.com` — this bypasses all Next.js font optimization
- Public Sans (Google Fonts) can use `next/font/google` directly with the same zero-layout-shift guarantee

**Warning signs:**
- Lighthouse flags "Eliminate render-blocking resources" pointing to `api.fontshare.com`
- CLS score above 0.1 in Core Web Vitals
- Visible text reflow visible during page load in slow-network simulations

**Phase to address:**
Foundation phase (typography setup). Download and configure fonts before building any sections that rely on them.

---

### Pitfall 5: Tailwind Dynamic Class Names Silently Disappear in Production

**What goes wrong:**
Styles work perfectly in development but vanish in production builds. A card grid renders with correct spacing in dev; in production the spacing classes are missing and everything collapses. No error is thrown.

**Why it happens:**
Tailwind scans source files at build time and only generates CSS for class names it finds as complete, unbroken strings. Dynamically constructed class names like `` `bg-${color}-500` `` or `` `col-span-${count}` `` are never seen by the scanner — it only sees the template literal, not its possible values.

**How to avoid:**
- Never construct Tailwind class names by string interpolation or concatenation
- Use lookup objects for conditional classes:
```ts
// Wrong
const cls = `col-span-${cols}` // Tailwind never generates this

// Correct
const colMap = { 1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4' }
const cls = colMap[cols]
```
- For the 4-column services grid and 3-column portfolio grid, hard-code the grid class on the container rather than deriving it
- If dynamic classes are truly necessary, add them to the `safelist` in `tailwind.config.ts`
- The `content` array in `tailwind.config.ts` must include all file patterns: `["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"]`

**Warning signs:**
- Styles present in dev mode but missing after `next build`
- Running `grep` for a class name in the generated `.css` file and not finding it
- Conditional styles (hover states, responsive variants) that work locally but not in deployment

**Phase to address:**
Foundation phase (Tailwind configuration). Establish the lookup-object pattern as a convention before building sections.

---

### Pitfall 6: Scroll-Linked Animations Janky on Mobile

**What goes wrong:**
The sticky stacked process cards and testimonial scroll effects feel smooth on desktop Chrome but choppy and stuttery on mid-range Android devices and some iPhones. The animation lags noticeably behind the user's finger movement.

**Why it happens:**
Framer Motion's `useScroll` + `useTransform` runs on the main JavaScript thread by default. On mobile, the main thread competes with layout, paint, and touch event processing. Animating CSS properties other than `transform` and `opacity` (e.g., `top`, `height`, `margin`) forces layout recalculation on every frame, which is fatal for mobile performance.

**How to avoid:**
- Only animate `transform` (translateX, translateY, scale, rotate) and `opacity` — these are GPU-composited and do not trigger layout
- For the sticky cards rotation effect, use `rotateZ` via `useTransform`, not margin or top adjustments
- Use Framer Motion's `motionValue` pipeline to avoid React re-renders on scroll: `useScroll` → `useTransform` → pass directly as `style` prop, never setState
- Add `will-change: transform` via Tailwind's `will-change-transform` class on animated elements
- Respect `prefers-reduced-motion`: wrap scroll animations in a check and disable them for users who have enabled reduced motion
- Test scroll performance on a mid-range Android device (not just high-end iPhone) before declaring scroll animations complete

**Warning signs:**
- Chrome DevTools Performance panel shows long frames (>16ms) during scroll
- `useTransform` driving a non-transform CSS property
- `useState` being set in a scroll event handler rather than using `motionValue` directly

**Phase to address:**
Per-section animation implementation. Each scroll-linked feature (sticky cards, testimonial section) should be validated on mobile immediately after implementation.

---

### Pitfall 7: Framer Motion Scroll Offset Bug in Production Build

**What goes wrong:**
`useScroll` animations work correctly in `next dev` but in the production build (`next build && next start`) the `scrollYProgress` value is offset — animations trigger at the wrong scroll position, or `scrollYProgress` reads incorrectly from the start.

**Why it happens:**
This is a known Framer Motion bug (GitHub issue #2452) related to how scroll measurement interacts with Next.js's production SSR output. The issue involves `useLayoutEffect` timing differences between development (React strict mode with double-invocation) and production.

**How to avoid:**
- Always test scroll animations against a production build locally (`next build && next start`), not just `next dev`
- If `scrollYProgress` is offset, pass `layoutEffect: false` as an option to `useScroll`:
```ts
const { scrollYProgress } = useScroll({
  target: containerRef,
  layoutEffect: false, // workaround for production offset bug
})
```
- Ensure container refs are correctly attached before `useScroll` measures them — attach the ref in a `useEffect` if needed

**Warning signs:**
- Animations work perfectly locally but are wrong after Vercel deployment
- Sticky section animates when the user hasn't scrolled to it yet
- `scrollYProgress` starts at a value other than 0 on page load

**Phase to address:**
Sticky cards section implementation. Add production build verification as a required step in the definition of done.

---

### Pitfall 8: whileInView Animations Trigger Twice on Strict Mode

**What goes wrong:**
In development, `whileInView` scroll-reveal animations fire, reset, and fire again when an element enters the viewport. Cards appear to "double-animate" — they fade in, briefly return to their initial state, then fade in again. This is confusing during development and can mask real bugs.

**Why it happens:**
React 18 Strict Mode (enabled by default in Next.js 14 dev mode) double-invokes effects and renders to detect side effects. The `IntersectionObserver` callback fires twice in this context. This behavior does NOT occur in production builds.

**How to avoid:**
- Do not assume this is a production bug — verify in `next build` before investigating further
- Add `viewport={{ once: true }}` to all `whileInView` animations to ensure they only play once after the element enters view:
```tsx
<motion.div
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
/>
```
- The `margin: "-100px"` offset ensures the animation triggers slightly before the element fully enters view, creating a natural feel

**Warning signs:**
- Animations visibly "stutter" or double-play in `next dev` but look correct in production build
- If double-play occurs in production, it is a real bug — investigate component key changes

**Phase to address:**
Scroll-reveal animation implementation phase. Apply `viewport={{ once: true }}` as a default from the start.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Adding `"use client"` to every component | Eliminates SSR errors quickly | Destroys all Server Component benefits, inflates JS bundle | Never — use targeted client boundaries instead |
| Using `<img>` instead of `next/image` | Simpler syntax | Missing lazy loading, size optimization, LCP regression — a photography portfolio with dozens of images will fail Core Web Vitals | Never |
| Linking Switzer from Fontshare CDN directly | Saves one setup step | FOUT on every load, external dependency, blocked by font CDN outages | Never — always self-host |
| Hardcoding inline styles for animations instead of Framer Motion | Avoids "use client" complexity | No exit animations, no gesture support, impossible to maintain | Only for static decorative elements that never animate |
| Putting all components in `page.tsx` | Faster initial build | Unmanageable file, impossible to test sections independently | Only for first proof-of-concept, remove before phase ends |
| Animating `height` or `top` with useTransform | Easier mental model than transform math | Layout thrashing on every frame, kills mobile performance | Never for scroll-linked animations |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Framer Motion + Next.js App Router | Importing motion components in Server Components | Always co-locate `"use client"` with any file importing from `framer-motion` |
| Fontshare + Next.js | Using `<link>` tag in `<head>` pointing to Fontshare CDN | Download font file, use `next/font/local` for self-hosted zero-layout-shift loading |
| `next/image` + photography grid | Setting `width`/`height` to fixed pixel values and breaking aspect ratio | Use `fill` + `object-cover` inside a positioned container, or use `sizes` prop correctly |
| `next/image` + Vercel | Forgetting to set `remotePatterns` for external image domains | Define `remotePatterns` in `next.config.js` for any image served from an external URL |
| Tailwind + Framer Motion | Using Tailwind transition classes (`transition-all`) on elements also controlled by Framer Motion | Let Framer Motion own all animation — remove Tailwind transition utilities from animated elements to avoid conflicts |
| Vercel deployment + video | Committing large video files to git | Serve video from a CDN (Cloudinary, Vercel Blob, or direct S3) — Vercel has a 100MB git repo limit and video bloats it fast |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unoptimized portfolio images | LCP > 4s on mobile, Google PageSpeed score in red | Use `next/image` with `sizes`, `priority` on above-fold images, `placeholder="blur"` | From day 1 on mobile connections |
| Video files in git repository | Slow clone times, Vercel build timeouts, 100MB repo limit hit | Store videos in Vercel Blob or Cloudinary; reference by URL only | When hero + testimonial videos exceed ~30MB combined |
| All animation logic in one `page.tsx` | Single file grows to 800+ lines, impossible to reason about | Extract each section into its own component file from the start | Immediately — this is a velocity trap |
| `useScroll` without a target ref on nested scrollers | `scrollYProgress` reads the entire page scroll instead of the section | Always pass `target: containerRef` when the animated element is inside a section | Any section using scroll-linked effects |
| Framer Motion stagger animations on 50+ items | Visible delay on last items, perceived sluggishness | Cap stagger at 0.05–0.08s max, limit to first visible items only | Services grid (7 cards), portfolio grid (6+ items) |
| Importing all of Framer Motion | Inflated JS bundle (~50KB gzipped) | Use named imports only: `import { motion, useScroll } from 'framer-motion'` — tree-shaking handles the rest | Not a breaking issue but compounds with other bundle weight |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Scroll-reveal animations that play on every scroll direction | Elements re-animate when user scrolls back up, feels broken | Use `viewport={{ once: true }}` — reveal once, stay revealed |
| Testimonial auto-advance too fast | Users can't read the full review before it advances | 5s interval is correct per the spec — do not reduce below 4s; always pause on hover |
| Sticky cards section requiring excessive scroll distance | Users scroll for a long time before content changes, feels stuck | Each card should activate within one viewport-height of scroll distance |
| Mobile menu overlay not trapping focus | Keyboard/screen reader users can tab behind the overlay | Use `inert` attribute or a focus trap library on the background content when overlay is open |
| Contact form with no loading/success state | User submits and sees nothing — submits again | Show a spinner during submission, success message after, error on failure |
| Animation on every single element | Sensory overload, feels cheap not premium | The brief specifies "refined and understated" — animate sections, not every word or pixel |
| Missing `prefers-reduced-motion` support | Users with vestibular disorders experience discomfort | Wrap all non-essential animations with `useReducedMotion()` from Framer Motion and disable or simplify them |

---

## "Looks Done But Isn't" Checklist

- [ ] **Hero video:** Verify `autoPlay muted playsInline loop` all present — test on a real iPhone, not browser DevTools
- [ ] **Font loading:** Confirm Switzer is loaded via `next/font/local`, not a `<link>` to Fontshare CDN — check Network tab for `api.fontshare.com` requests (should be zero)
- [ ] **Production scroll animations:** Run `next build && next start` and verify scroll-linked effects trigger at the correct scroll positions — do not rely on `next dev` alone
- [ ] **whileInView animations:** Confirm `viewport={{ once: true }}` is set on all scroll-reveal variants — scroll up and back down to verify elements do not re-animate
- [ ] **Tailwind production styles:** After `next build`, check that grid classes, color classes, and conditional classes all appear in the generated CSS — run the build locally before deploying
- [ ] **Mobile layout:** Verify each section at 375px (iPhone SE) and 390px (iPhone 14) — sticky cards, testimonial cards, and services grid all need real mobile testing
- [ ] **Reduced motion:** Enable "Reduce Motion" in iOS/macOS settings and verify the site still communicates content without relying on animation
- [ ] **Image alt text:** Every `next/image` in the portfolio grid must have descriptive `alt` text — empty `alt=""` only for purely decorative images
- [ ] **Contact form:** Test form submission with network throttling — verify loading state appears and success/error is communicated
- [ ] **Lighthouse on Vercel:** Run Lighthouse against the deployed Vercel URL (not localhost) — CLS, LCP, and TBT scores may differ significantly from local

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Framer Motion SSR crashes on deploy | LOW | Add `"use client"` to offending files; alternatively wrap with `dynamic(() => import(...), { ssr: false })` as emergency fix |
| Hero video not playing on iOS | LOW | Add `playsInline` attribute; add `poster` fallback image; test immediately |
| Font FOUT after site is live | MEDIUM | Download font file, switch from CDN link to `next/font/local`, redeploy — no design changes needed |
| Tailwind classes missing in production | LOW–MEDIUM | Identify which classes are dynamic, convert to lookup object, add to `safelist` if needed, rebuild |
| Scroll animations broken in production | MEDIUM | Add `layoutEffect: false` to `useScroll` calls; verify target refs are correctly attached; test against prod build locally before deploying |
| AnimatePresence page transitions not working | MEDIUM | Switch from `layout.tsx`-based AnimatePresence to `template.tsx` + per-section `whileInView` approach |
| Video files bloating repository | HIGH | Use `git filter-repo` to remove video from git history; move to Vercel Blob or Cloudinary; update references |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Framer Motion "use client" requirement | Phase 1: Foundation & scaffolding | Build succeeds without SSR errors; no `window is not defined` in `next build` output |
| Font FOUT / Switzer from CDN | Phase 1: Foundation & typography | Network tab shows zero requests to `api.fontshare.com`; CLS is 0 in Lighthouse |
| Tailwind dynamic class purging | Phase 1: Foundation & Tailwind config | Production build generates all expected CSS classes; no missing styles after deployment |
| AnimatePresence page transitions | Phase 1: Architecture decision | Decision documented: use `template.tsx` + `whileInView`, not `AnimatePresence` for page transitions |
| Hero video autoplay on iOS | Phase 2: Hero section | Tested on real iPhone before phase is marked done |
| whileInView double-trigger in dev | Phase 3: Scroll-reveal system | `viewport={{ once: true }}` applied to all reveal variants |
| Scroll animation production offset | Phase 4: Sticky cards / scroll sections | Verified against `next build && next start` locally before merging |
| Mobile scroll jank | Phase 4: Sticky cards / scroll sections | Tested on mid-range Android device; Chrome DevTools shows no long frames during scroll |
| Testimonial background video on iOS | Phase 5: Testimonial section | Same iOS video test repeated; poster fallback confirmed |
| Missing reduced motion support | Phase 6: Polish & accessibility | Verified with macOS/iOS "Reduce Motion" setting enabled |

---

## Sources

- [Resolving Framer Motion Compatibility in Next.js 14: The 'use client' Workaround](https://medium.com/@dolce-emmy/resolving-framer-motion-compatibility-in-next-js-14-the-use-client-workaround-1ec82e5a0c75)
- [Next.js Hydration Error Docs](https://nextjs.org/docs/messages/react-hydration-error)
- [Next.js Discussion: How to make Page Transitions in Next.js 14 App Dir](https://github.com/vercel/next.js/discussions/59349)
- [App router issue with Framer Motion shared layout animations · vercel/next.js #49279](https://github.com/vercel/next.js/issues/49279)
- [Solving Framer Motion Page Transitions in Next.js App Router](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router)
- [Framer Motion useScroll in Next.js 14 App Router · Framer Community](https://www.framer.community/c/developers/can-t-get-usescroll-scrolly-to-work-in-next-js-14-app-router)
- [BUG: useScroll doesn't work correctly in production build · framer/motion #2452](https://github.com/framer/motion/issues/2452)
- [New video Policies for iOS · WebKit Blog](https://webkit.org/blog/6784/new-video-policies-for-ios/)
- [Autoplay guide for media and Web Audio APIs · MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)
- [Next.js Font Optimization — Optimizing: Fonts](https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts)
- [How to avoid FOUC/FOUT in Next.js 14 · vercel/next.js Discussion #62912](https://github.com/vercel/next.js/discussions/62912)
- [Dynamic generation of classes will not work with JIT · tailwindlabs/tailwindcss #6763](https://github.com/tailwindlabs/tailwindcss/discussions/6763)
- [Animation Performance Guide · Motion](https://motion.dev/docs/performance)
- [Framer Motion useInView docs · Motion](https://motion.dev/docs/react-use-in-view)
- [BUG: conditional rendering and whileInView · framer/motion #2314](https://github.com/framer/motion/issues/2314)
- [Build a Smooth Scroll Cards Parallax with Framer Motion and Next.js](https://blog.olivierlarose.com/tutorials/cards-parallax)
- [Optimizing Core Web Vitals in 2024 · Vercel Knowledge Base](https://vercel.com/kb/guide/optimizing-core-web-vitals-in-2024)

---
*Pitfalls research for: Next.js 14 App Router + Framer Motion + Tailwind CSS photographer portfolio*
*Researched: 2026-03-28*
