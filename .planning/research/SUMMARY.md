# Project Research Summary

**Project:** Portfólio Fotógrafa Joyce — Corazón Brand
**Domain:** Premium photographer/videographer portfolio website (editorial luxury aesthetic)
**Researched:** 2026-03-28
**Confidence:** HIGH

## Executive Summary

This is a static, animation-heavy photographer portfolio built on Next.js 14 App Router with a locked design system (beige/gold palette, Switzer + Public Sans typography, cinematic editorial aesthetic). The recommended approach is to treat this as a Server Component-first site with targeted "use client" islands only where interactivity or animation is required — keeping the JS bundle minimal while delivering a choreographed, premium visual experience. The stack is non-negotiable: Next.js 14, TypeScript, Tailwind CSS v3.4 (not v4), and `motion` v12 (the rebranded framer-motion package). No CMS, no backend, no external APIs in v1 — all content is typed static data in `lib/data/*.ts`.

The competitive differentiation of this portfolio lives in three elements that require the most implementation care: (1) the sticky stacked process cards using `useScroll` + `useTransform`, (2) the dark cinematic testimonial carousel with AnimatePresence and video backgrounds, and (3) the fixed bottom navigation bar with fullscreen overlay — a pattern uncommon in photographer portfolios that signals intentional design craft. All other sections follow well-documented patterns and can be built efficiently once the foundation layer (animation variants, font loading, Tailwind config) is established correctly.

The primary risks are all front-loaded in setup: Framer Motion server-side crashes if `"use client"` conventions are not established before writing animation code, font layout shift if Switzer is loaded from the Fontshare CDN instead of self-hosted, Tailwind class purging if dynamic class names are constructed via string interpolation, and scroll animation production offset bugs if `useScroll` is never tested against a `next build` output. All of these are avoidable with early, deliberate decisions in Phase 1. Post-foundation, the main ongoing risk is mobile scroll performance — animations must only drive `transform` and `opacity`, never layout-triggering properties.

## Key Findings

### Recommended Stack

The stack is locked by the existing mockup (`index.html`) and project constraints. The critical decisions that differentiate a working implementation from a broken one are: use `motion` (not `framer-motion`) with `"motion/react"` imports, use Tailwind CSS v3.4 (v4's CSS-first config breaks the `next/font` CSS variable integration pattern), and self-host Switzer via `next/font/local` (the Fontshare CDN cannot be used with `next/font`). Supporting utilities (`plaiceholder` for blur placeholders, `clsx`+`tailwind-merge` for safe class composition, `@vercel/analytics` for zero-config analytics) are all low-complexity additions. See `.planning/research/STACK.md` for full version matrix and installation commands.

**Core technologies:**
- **Next.js 14.2.x**: App Router, SSG output, Vercel-native image CDN and font optimization — zero config deployment
- **TypeScript ^5.x**: Standard `create-next-app` default; catches prop mismatches in animation components early
- **Tailwind CSS 3.4.x**: Utility-first styling with locked color palette and font vars; v3 required for `next/font` compatibility
- **Motion ^12.x** (`motion/react` imports): Scroll animations, `useScroll`/`useTransform` for sticky cards, AnimatePresence for carousel and menu overlay
- **sharp + plaiceholder**: Build-time blur placeholder generation for portfolio grid images — eliminates content jump on load
- **`next/font/local` for Switzer**: Download `Switzer-Variable.woff2` from Fontshare; self-host to eliminate FOUT and external requests

### Expected Features

The mockup in `index.html` is the authoritative spec — research validated it against current best practices and confirmed all sections are appropriate for the editorial luxury target. See `.planning/research/FEATURES.md` for full section-by-section interaction specs.

**Must have (table stakes):**
- Full-screen hero with animated text selector (A Criação / Videografia / Fotografia) — first impression
- Fixed bottom navigation bar with fullscreen overlay — signature differentiator, must ship at launch
- Services grid (4+3 layout), process section, bento trust grid, selected works — core content
- Dark cinematic testimonial section (3 slides, auto-advance, video backgrounds) — emotional trust signal
- FAQ accordion, final CTA, footer with social links — conversion layer
- Scroll-reveal animation system (`opacity 0→1, y 24→0, cubic-bezier(0.22,1,0.36,1)`) — applied uniformly across all sections
- /contato page with working form (Formspree or Resend, no backend) — primary conversion endpoint
- /portfolio page (basic grid with category filtering) — expected destination for portfolio CTA link
- /privacidade static page — LGPD legal requirement in Brazil
- Full mobile-responsive layout — genuine vertical redesign, not a shrink

**Should have (competitive differentiators):**
- Sticky stacked process cards with scroll-driven rotation — highest craft signal in the entire site
- Photo strip with featured center card and horizontal manifesto block
- Avatar cluster + star rating proof strip + client brand logos
- Blog preview section (3 static cards, no CMS) — SEO and editorial credibility
- Staggered child animations on card grids, custom scrollbar (gold thumb)
- Placeholder backgrounds ready to swap for real photo/video assets when supplied

**Defer to v1.x (requires real assets):**
- Background video for testimonial section — triggers when video asset is available
- Background video for hero section — triggers when short cinematic clip is available
- Real photography assets replacing placeholder gradients

**Defer to v2+:**
- CMS integration (Sanity/Contentful) — defer until update frequency justifies it
- Online booking / calendar — defer until contact form creates scheduling bottleneck
- Client delivery galleries — separate product, use Pixieset/Google Drive externally
- Multi-language support, e-commerce/print sales

**Confirmed anti-features (never build):**
- Parallax background effects (GPU-intensive, janky on mobile, dated vs. reveal-based approach)
- Heavy cursor effects (breaks on touch devices, gimmicky not editorial)
- Infinite scroll on portfolio (loses editorial curation feel)
- CSS-in-JS libraries (conflicts with RSC, runtime overhead — Tailwind only)

### Architecture Approach

The architecture follows a Server Component shell + Client island pattern throughout. Every page file and section component is a Server Component by default; interactivity or animation is pushed down to thin `"use client"` leaf components in `components/islands/`. Reusable animation wrappers (`RevealWrapper`, `StaggerChildren`) live in `components/ui/` and can wrap Server-rendered content without converting the host component to a client. All motion variant objects are centralized in `lib/animation-variants.ts` to ensure timing consistency. Static content lives in `lib/data/*.ts` typed objects — no async server components, no CMS, no API calls in v1. See `.planning/research/ARCHITECTURE.md` for full component map, build order, and pattern code examples.

**Major components:**
1. **`app/layout.tsx`** (Server) + **`BottomBar.tsx`** (Client) — root layout with fixed nav; BottomBar owns `isOpen` state + scroll lock + AnimatePresence overlay
2. **`components/sections/`** — one Server Component per homepage section; passes data to client islands as serializable props
3. **`components/islands/`** — all `"use client"` interactive components: `HeroSelector`, `ProcessCards`, `TestimonialCarousel`, `FAQAccordion`
4. **`components/ui/RevealWrapper` + `StaggerChildren`** — reusable Client wrappers for scroll-reveal without converting section shells
5. **`lib/animation-variants.ts`** — single source of truth for all motion variant objects (`fadeUp`, `scaleIn`, `staggerContainer`)
6. **`lib/data/*.ts`** — typed static content for services, testimonials, process steps, blog posts, FAQ

### Critical Pitfalls

All eight pitfalls researched are documented with prevention strategies and recovery costs in `.planning/research/PITFALLS.md`. The five highest-impact ones:

1. **Framer Motion components without `"use client"`** — crashes build with cryptic `window is not defined` or `createContext` errors. Prevention: establish the Client island pattern in Phase 1 before any animation code is written; never add `"use client"` to section shells.

2. **Switzer font loaded from Fontshare CDN** — causes FOUT on every load and CLS violations. Prevention: download `Switzer-Variable.woff2` in Phase 1 and configure via `next/font/local` with `preload: true`.

3. **Tailwind dynamic class name purging** — styles present in dev, silently missing in production. Prevention: never construct class names via string interpolation; use lookup objects; configure `content` array in `tailwind.config.ts` before building sections.

4. **`useScroll` production offset bug** — scroll-linked animations trigger at wrong positions in `next build` output but appear correct in `next dev`. Prevention: add `layoutEffect: false` to `useScroll` calls; always verify sticky cards against a production build locally.

5. **Hero/testimonial video not autoplaying on iOS** — requires `autoPlay muted playsInline` simultaneously; missing `playsInline` alone silently breaks iOS. Prevention: always set all three attributes and a `poster` fallback; test on a real iPhone immediately after video implementation.

## Implications for Roadmap

Research strongly supports a sequential build order from infrastructure outward. The architecture's build order (documented in ARCHITECTURE.md) maps directly to phase structure: nothing looks right until the design tokens are in place, nothing animates correctly until the animation variants are in place, and the most complex animations (sticky cards, testimonial carousel) should be isolated and validated before integration.

### Phase 1: Foundation and Infrastructure
**Rationale:** All downstream phases depend on correct font loading, Tailwind config, animation variant library, and `"use client"` conventions being in place. Getting any of these wrong propagates errors across every section. This phase has the highest pitfall density — solving them here costs minutes; solving them after 10 sections are built costs hours.
**Delivers:** Working Next.js 14 scaffold with Switzer + Public Sans (zero FOUT), Tailwind v3.4 with locked palette, `lib/animation-variants.ts`, `lib/data/*.ts` typed stubs, root layout with body padding for bottom bar, Vercel deployment connected.
**Addresses:** Hero section preconditions, font-dependent typography across all sections
**Avoids:** Font FOUT (Pitfall 4), Tailwind purging (Pitfall 5), `"use client"` propagation errors (Pitfall 1), AnimatePresence page transition footgun (Pitfall 2)

### Phase 2: Navigation Shell (Top Nav + Bottom Bar + Menu Overlay)
**Rationale:** Navigation persists across all pages and all scroll states. It must be built and validated before any section is built, because `body { padding-bottom: 60px }` affects every section's layout, and the bottom bar's z-index sits above all section content. Testing menu open/close before building sections confirms the AnimatePresence pattern works correctly.
**Delivers:** TopNav (Server), BottomBar (Client with scroll lock), fullscreen MenuOverlay with AnimatePresence, correct body padding on all pages
**Implements:** BottomBar + MenuOverlay island pattern (ARCHITECTURE.md Pattern 5)
**Avoids:** AnimatePresence nesting anti-pattern (AnimatePresence must live in BottomBar, never inside MenuOverlay itself)

### Phase 3: Hero Section + Animation Primitives
**Rationale:** The hero is the first visible content and sets the aesthetic tone for all subsequent work. The `RevealWrapper` and `StaggerChildren` primitives built here are consumed by every remaining section — building them here lets each subsequent phase use them immediately. The animated text selector confirms the Motion client island pattern works end-to-end.
**Delivers:** Full-viewport hero with HeroSelector island (animated text cycling), gold CTA button, `RevealWrapper` and `StaggerChildren` UI primitives, confirmed animation feel against reference mockup
**Addresses:** Hero animated text selector (P1 feature), scroll-reveal system foundation
**Avoids:** Inline variant objects anti-pattern (all variants centralized before section work begins)

### Phase 4: Static Content Sections (Services, Photo Strip, Manifesto, Proof Strip, Bento Grid, Works)
**Rationale:** These sections share a common pattern: Server Component shell + RevealWrapper/StaggerChildren wrapping static content. No complex interactivity. Building them in sequence populates the page with real content fast, confirms the grid layouts at multiple breakpoints, and establishes mobile responsive patterns before tackling complex animations.
**Delivers:** ServicesSection (4+3 grid), PhotoStrip + manifesto, ProofSection (avatar cluster + logos), WhySection (bento grid), WorksSection (3-card portfolio preview) — all with scroll-reveal
**Uses:** Tailwind grid system, `plaiceholder` blur placeholders, `RevealWrapper`/`StaggerChildren` primitives
**Avoids:** Converting section shells to Client Components for hover animations (use RevealWrapper wrappers instead)

### Phase 5: Complex Interactive Sections (Process Cards + Testimonial Carousel)
**Rationale:** These two sections are the highest-complexity implementations in the site and must be isolated builds. ProcessCards requires `useScroll` + `useTransform` with a single shared ref across all 6 cards — the most common mistake (multiple `useScroll` refs per card) must be explicitly avoided. TestimonialCarousel requires AnimatePresence + video autoplay + auto-advance interval. Both sections need mobile validation immediately after implementation, not at the end.
**Delivers:** ProcessSection with sticky stacked cards + scroll-driven rotation, TestimonialsSection with AnimatePresence crossfade, auto-advance, video backgrounds, dot nav
**Implements:** ARCHITECTURE.md Pattern 4 (sticky stacked) and Pattern 6 (testimonial carousel)
**Avoids:** Multiple `useScroll` refs anti-pattern (Pitfall 7), iOS video autoplay (Pitfall 3), scroll jank from non-transform animations (Pitfall 6)

### Phase 6: Remaining Sections + Additional Pages
**Rationale:** Blog preview, FAQ accordion, CTA section, and footer are straightforward — static content with simple interactions (FAQ open/close) or no interactivity at all. The additional pages (/portfolio, /contato, /privacidade) follow identical patterns to the homepage sections. Contact form email service decision (Formspree vs. Resend) is the only external dependency.
**Delivers:** BlogSection (3 static cards), FAQSection + FAQAccordion island, CTASection, Footer; /portfolio page with category filtering; /contato page with working form + success/error states; /privacidade static page
**Addresses:** All P1 and P2 features from FEATURES.md MVP list; LGPD compliance

### Phase 7: Mobile Responsive Polish + Performance Pass
**Rationale:** Mobile responsiveness requires a genuine vertical redesign per breakpoint, not just shrinking. Treating it as a polish phase rather than retrofitting each section during build prevents constant context-switching. The performance pass (Lighthouse audit on deployed Vercel URL, Core Web Vitals, reduced motion support) catches issues that only appear in production.
**Delivers:** Verified mobile layouts at 375px and 390px for all sections; sticky cards mobile fallback; `prefers-reduced-motion` support via `useReducedMotion()`; Lighthouse CLS/LCP/TBT passing; image alt text audit; contact form loading/success states
**Avoids:** `prefers-reduced-motion` gap (Pitfall UX layer), mobile scroll jank final verification, production Lighthouse vs. localhost discrepancy

### Phase Ordering Rationale

- **Foundation before sections:** Tailwind config, fonts, and animation variants must be stable before any section work — errors here contaminate every component built afterward.
- **Navigation before content:** `body { padding-bottom: 60px }` is a global layout constraint; it must be correct before section heights are validated at any breakpoint.
- **Simple sections before complex animations:** Phases 4 before 5 lets the team develop velocity and confirm the layout system at scale before investing time in the two highest-complexity animations.
- **Process and Testimonials isolated in Phase 5:** Both require non-trivial debugging cycles (production build verification for `useScroll`, iOS device testing for video). Isolating them prevents blocking the rest of the site.
- **Mobile polish as dedicated phase:** The spec is explicit that mobile requires a genuine redesign. Treating it as a final pass rather than per-section ensures consistency and prevents scope creep during section builds.

### Research Flags

Phases needing deeper research or careful implementation review:
- **Phase 5 (Sticky Process Cards):** The `useScroll` production offset bug (GitHub framer/motion #2452) requires `layoutEffect: false` and local production build verification as a mandatory step. No standard tutorial covers this production-vs-dev discrepancy.
- **Phase 5 (Testimonial Carousel):** Video autoplay behavior in AnimatePresence crossfade (whether to remount `<video>` elements or keep them mounted) needs to be validated empirically — behavior differs between browsers.
- **Phase 6 (Contact Form):** Email service choice (Formspree vs. Resend) has no single right answer. Formspree requires no backend; Resend requires a serverless `app/api/contact/route.ts` but gives more control. Decide based on whether spam filtering matters at launch.

Phases with standard, well-documented patterns (no additional research needed):
- **Phase 1:** `create-next-app@14`, `next/font/local`, Tailwind v3 config — all officially documented.
- **Phase 2:** BottomBar + AnimatePresence pattern is fully specified in ARCHITECTURE.md with working code.
- **Phase 3:** `whileInView` + `useInView` patterns are stable and well-documented in Motion official docs.
- **Phase 4:** Server Component + RevealWrapper pattern is the core App Router pattern — no novel territory.
- **Phase 6:** FAQAccordion and static pages are standard patterns with no unusual dependencies.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core library versions verified against official docs; Tailwind v3 vs v4 decision corroborated by multiple real-world reports |
| Features | HIGH | Authoritative spec exists in `index.html` mockup; research validated against current editorial portfolio best practices |
| Architecture | HIGH | Server/Client island pattern is official Next.js recommendation; all patterns include working code examples from official docs and verified tutorials |
| Pitfalls | HIGH | Critical pitfalls verified via official Next.js GitHub issues and official docs; production offset bug is a documented GitHub issue with confirmed workaround |

**Overall confidence:** HIGH

### Gaps to Address

- **Real photo and video assets:** v1 ships with placeholder backgrounds. The entire cinematic feel of the hero, testimonial section, and CTA figure depends on real photography. Placeholders are coded as drop-in replacements, but the visual impression of the live site cannot be fully evaluated until Joyce provides assets. Flag this with the client early.
- **Email service selection (Formspree vs. Resend):** Either works technically. Decision depends on whether a no-backend approach (Formspree) is acceptable or whether custom email templates and spam control justify adding a serverless function (Resend). Decide before starting Phase 6.
- **Video hosting strategy:** If hero and testimonial background videos are committed to git, the repository will approach Vercel's 100MB limit quickly. Plan to use Vercel Blob or Cloudinary for video assets before video work begins in v1.x.
- **Sticky cards mobile fallback:** The spec notes "if sticky complex for mobile, switch to vertical reveal stack." The threshold for triggering this fallback needs to be decided during Phase 5 implementation, not during mobile polish.

## Sources

### Primary (HIGH confidence)
- https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts — `next/font/local` API, CSS variable integration
- https://nextjs.org/docs/app/getting-started/server-and-client-components — Server/Client component model
- https://motion.dev/docs/react-installation — Motion v12, `motion/react` import paths
- https://motion.dev/docs/react-use-scroll — `useScroll`, `useTransform`, target ref pattern
- https://nextjs.org/docs/14/app/building-your-application/optimizing/images — `next/image` priority, fill, placeholder="blur"
- https://github.com/vercel/next.js/issues/49279 — AnimatePresence page transition breakage in App Router (confirmed)
- https://github.com/framer/motion/issues/2452 — `useScroll` production offset bug with confirmed `layoutEffect: false` workaround
- https://webkit.org/blog/6784/new-video-policies-for-ios/ — iOS Safari autoplay requirements (`autoPlay muted playsInline`)

### Secondary (MEDIUM confidence)
- https://blog.olivierlarose.com/tutorials/cards-parallax — Sticky stacked cards with Framer Motion and Next.js
- https://tailwindcss.com/blog/tailwindcss-v4 — v4 CSS-first config, confirmed `tailwind.config.js` removal
- https://medium.com/@pradeepgudipati/downgrading-from-tailwind-css-v4-to-v3 — Real-world Tailwind v4 → v3 friction on Next.js (single author, corroborated)
- https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router — `template.tsx` workaround for AnimatePresence

### Authoritative project reference
- `index.html` in project root — existing mockup implementation; treated as highest-confidence source for feature spec and design intent

---
*Research completed: 2026-03-28*
*Ready for roadmap: yes*
