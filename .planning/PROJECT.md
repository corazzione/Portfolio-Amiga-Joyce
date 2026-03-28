# Portfólio Fotógrafa Joyce

## What This Is

A production-grade photographer/videographer portfolio website for Joyce (brand: Corazón), built with Next.js 14 App Router, Tailwind CSS, and Framer Motion. The site features an editorial luxury aesthetic inspired by the Lumus Framer template — beige background, gold accents, cinematic scroll animations — and serves as the primary professional showcase and contact point for Joyce's photography and videography services.

## Core Value

Visitors feel the quality and aesthetic of Joyce's work through the site itself — every scroll, reveal, and interaction communicates premium visual storytelling before they've seen a single photo.

## Requirements

### Validated

- ✓ Next.js 14 App Router scaffold with TypeScript, Tailwind v3.4, Motion v12 — validated in Phase 1: Foundation
- ✓ Switzer variable font self-hosted via next/font/local (zero FOUT) — validated in Phase 1: Foundation
- ✓ Public Sans via next/font/google — validated in Phase 1: Foundation
- ✓ Tailwind design tokens (bg #EFE8DC, gold #C8973A, dark #1a1a1a, fontFamily.switzer, fontFamily.sans) — validated in Phase 1: Foundation
- ✓ Animation variants (fadeUp, scaleIn, stagger, spring) in lib/animation-variants.ts — validated in Phase 1: Foundation
- ✓ RevealWrapper + StaggerChildren client components in components/motion/ — validated in Phase 1: Foundation
- ✓ Typed static content stubs in lib/data.ts (services, process steps, testimonials, blog posts, FAQ, logos) — validated in Phase 1: Foundation
- ✓ vercel.json with font caching and security headers — validated in Phase 1: Foundation
- ✓ TopNav (transparent→solid scroll) + BottomBar (fixed black, gold pill, AnimatePresence overlay) in components/layout/ — validated in Phase 2: Navigation Shell
- ✓ Full-screen hero with dark gradient bg, video element slot, "MC. // UMA CONTADORA DE HISTÓRIAS VISUAL" tagline, HeroTextSelector (AnimatePresence cycling), gold CTA, staggered page-load entrance — validated in Phase 3: Hero + Animation System
- ✓ RevealWrapper upgraded: variant prop ("fadeUp"|"scaleIn") + useReducedMotion() guard — validated in Phase 3: Hero + Animation System
- ✓ StaggerChildren upgraded: useReducedMotion() guard — validated in Phase 3: Hero + Animation System
- ✓ Vitest test infrastructure (vitest.config.ts, 4 test files, 13 tests green) — validated in Phase 3: Hero + Animation System
- ✓ All 10 homepage sections (PhotoStrip, Manifesto, ProofStrip, Services, Portfolio, Blog, FAQ, CTA, Footer) in components/sections/ — validated in Phase 4: Static Content Sections
- ✓ ServiceCard + PortfolioCard with whileHover scale (ANIM-05), FAQSection useState accordion, 40 Vitest tests green — validated in Phase 4: Static Content Sections
- ✓ ProcessSection: 6 pure CSS sticky stacked cards with alternating rotation, complete Tailwind string literals (no purge), Server Component — validated in Phase 5: Complex Interactive Sections
- ✓ BentoSection: asymmetric CSS Grid trust grid (3-col, left card row-span-2, skill checklist, 4 right sub-cards), Server Component — validated in Phase 5: Complex Interactive Sections
- ✓ TestimonialSection: dark cinematic section, AnimatePresence mode="wait" carousel, 5s auto-advance, dot nav with interval restart, useReducedMotion guard — validated in Phase 5: Complex Interactive Sections
- ✓ 60 Vitest tests green across 17 files, production build passes — validated in Phase 5: Complex Interactive Sections
- ✓ /portfolio page: 5 category sections, 16 PortfolioCards, responsive 3-col grid, Server Component — validated in Phase 6: Additional Pages
- ✓ /contato page: ContactForm ('use client', 4-state Formspree integration, idle/submitting/success/error), two-column layout — validated in Phase 6: Additional Pages
- ✓ /privacidade page: 10 LGPD-compliant sections in Portuguese, Lei n 13.709/2018 reference — validated in Phase 6: Additional Pages
- ✓ 70 Vitest tests green across 20 files, 4 routes (/,/portfolio,/contato,/privacidade) build successfully — validated in Phase 6: Additional Pages

- ✓ All sections mobile-first responsive (grid-cols-1 base, text-2xl sm:text-4xl scaling, flex-col sm:flex-row stacking, overflow-x-hidden) — validated in Phase 7: Mobile Responsive + Performance
- ✓ ProcessSection sm:sticky fallback — cards stack naturally on mobile, sticky only at sm+ breakpoint — validated in Phase 7: Mobile Responsive + Performance
- ✓ TestimonialSection touch swipe (onTouchStart/onTouchEnd, 50px threshold, left=next, right=prev) — validated in Phase 7: Mobile Responsive + Performance
- ✓ Video hosting pattern documented (NEXT_PUBLIC_VIDEO_URL comments), src="" bug removed — validated in Phase 7: Mobile Responsive + Performance
- ✓ vercel.json production-ready (framework, font cache headers, security headers) — validated in Phase 7: Mobile Responsive + Performance
- ✓ 74 Vitest tests green across 20 files, production build exits 0 — validated in Phase 7: Mobile Responsive + Performance

### Active
- [ ] Lighthouse performance ≥ 85 — verify on Vercel after deployment (manual, post-deploy)

### Out of Scope

- CMS / content management system — static content is sufficient for v1
- User authentication / accounts — not needed for a portfolio
- E-commerce / booking system — out of scope, just a contact form
- Blog CMS backend — static blog cards only in v1
- Multi-language support — Portuguese only

## Context

- **Existing mockup:** `index.html` in project root — complete static HTML/CSS/JS reference implementation of the design with all sections, animations, and content in Portuguese. Use as the authoritative visual reference.
- **Design reference:** Lumus Framer template (https://lumus.framer.media/) — the original inspiration for the aesthetic
- **Brand:** "MC." as logo mark, "Corazón" as brand name, "Markus Corazzione" as creator
- **Typography:** Switzer (fontshare) + Public Sans (Google Fonts)
- **Colors:** Background `#EFE8DC` (off-white beige), Accent `#C8973A` (mustard gold), Text `#1a1a1a` (near-black)
- **Repo:** github.com/corazzione/Portfolio-Amiga-Joyce (already exists, has initial mockup commit)
- **Deploy target:** Vercel

## Constraints

- **Tech Stack:** Next.js 14 App Router + Tailwind CSS + Framer Motion — locked, no alternatives
- **Typography:** Switzer + Public Sans only — defines the editorial feel
- **Color palette:** `#EFE8DC`, `#C8973A`, `#1a1a1a` — no deviations
- **Language:** All UI copy in Brazilian Portuguese
- **Motion:** Refined and understated — no exaggerated springiness, premium/cinematic feel
- **Deployment:** Vercel only
- **Animation:** Sticky stacked process cards and testimonial cards over dark video are critical — must work correctly

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 14 App Router | Modern React architecture, SSG/SSR flexibility, Vercel-native | — Pending |
| Tailwind CSS | Rapid styling with design tokens, great with Next.js | — Pending |
| Framer Motion | Best-in-class React animation library, used by original Framer template | — Pending |
| Static content (no CMS) | Photographer site content rarely changes, v1 simplicity | — Pending |
| index.html as reference | Complete visual spec already exists — don't reinvent, translate to React | — Pending |

---
*Last updated: 2026-03-28 after Phase 7: Mobile Responsive + Performance complete — all 7 phases done, v1 ready for Vercel deployment*
