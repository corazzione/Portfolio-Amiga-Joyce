# Roadmap: Portfólio Fotógrafa Joyce (Corazón)

## Overview

Seven phases build the Corazón portfolio from infrastructure outward. Phase 1 establishes the unbreakable foundation — fonts, Tailwind tokens, animation variants — so every subsequent phase builds on a stable base. Phases 2 and 3 deliver the persistent navigation shell and the full-screen hero, which together set the site's aesthetic tone. Phase 4 populates the homepage with all static content sections (including the FAQ accordion). Phase 5 tackles the two highest-complexity interactive sections (sticky process cards and cinematic testimonial carousel) in isolation. Phase 6 builds the additional pages (/portfolio, /contato, /privacidade). Phase 7 is a dedicated mobile-responsive and performance pass, treating mobile as a genuine redesign rather than a shrink.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Scaffold Next.js 14 with locked design system, fonts, Tailwind tokens, animation primitives, and Vercel deployment (completed 2026-03-28)
- [x] **Phase 2: Navigation Shell** - Top navbar, fixed bottom bar, and fullscreen menu overlay across all pages (completed 2026-03-28)
- [x] **Phase 3: Hero + Animation System** - Full-screen hero section and reusable scroll-reveal primitives consumed by every subsequent section (completed 2026-03-28)
- [x] **Phase 4: Static Content Sections** - All homepage sections including FAQ, CTA, and footer (completed 2026-03-28)
- [x] **Phase 5: Complex Interactive Sections** - Sticky stacked process cards and dark cinematic testimonial carousel (completed 2026-03-28)
- [ ] **Phase 6: Additional Pages** - Sub-pages /portfolio, /contato, and /privacidade
- [ ] **Phase 7: Mobile Responsive + Performance** - Genuine mobile redesign at all breakpoints and Lighthouse performance pass

## Phase Details

### Phase 1: Foundation
**Goal**: The project scaffold runs, looks right, and deploys — all design constraints are wired in before any feature code is written
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08
**Success Criteria** (what must be TRUE):
  1. `npm run dev` serves a page at localhost:3000 using the beige (#EFE8DC) background and gold (#C8973A) accent with no Tailwind class purging in production build
  2. Switzer variable font renders on the page with zero flash of unstyled text (FOUT) — verified by disabling network throttling
  3. `lib/animation-variants.ts` exports `fadeUp`, `stagger`, `scaleIn`, and spring variants; `RevealWrapper` and `StaggerChildren` components exist and can wrap any element
  4. `lib/data.ts` exports typed static content stubs for all sections (services, process steps, testimonials, blog posts, FAQ)
  5. Site deploys successfully to Vercel from the `corazzione/Portfolio-Amiga-Joyce` repo and is publicly accessible at a Vercel URL
**Plans:** 2/2 plans complete

Plans:
- [ ] 01-01-PLAN.md — Scaffold Next.js 14, install dependencies, configure Tailwind tokens and fonts
- [ ] 01-02-PLAN.md — Create animation variants, motion wrapper components, static data stubs, and Vercel config

### Phase 2: Navigation Shell
**Goal**: Site-wide persistent navigation is live and functional on all pages — visitors can open the menu, navigate, and close it at any scroll position
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05
**Success Criteria** (what must be TRUE):
  1. Top navbar is transparent over the hero and transitions to a solid background on scroll — visible on every page
  2. Fixed bottom bar persists across all scroll positions on all pages with "Menu+" gold pill left and "Corazón" white text center on black background
  3. Clicking "Menu+" opens a fullscreen dark overlay menu with a smooth animated entrance (slide or fade via AnimatePresence)
  4. Clicking a navigation link inside the overlay closes the menu and navigates to the correct page
  5. The fullscreen menu overlay covers the full viewport on mobile with vertical navigation layout
**Plans:** 2/2 plans complete

Plans:
- [x] 02-01-PLAN.md — Create TopNav and BottomBar components with scroll toggle and AnimatePresence overlay
- [x] 02-02-PLAN.md — Wire nav components into root layout, add body padding, visual verification

### Phase 3: Hero + Animation System
**Goal**: The first impression works — visitors see and feel the editorial luxury aesthetic immediately, and the animation primitives are ready for every subsequent section
**Depends on**: Phase 2
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-06
**Success Criteria** (what must be TRUE):
  1. Hero is full-screen (100vh) with a looping muted background video (or placeholder gradient) — no layout shift on load
  2. "MC. // UMA CONTADORA DE HISTÓRIAS VISUAL" overlay and gold CTA button animate in on page load without scroll trigger
  3. The text selector cycles through "A Criação / Videografia / Fotografia" with smooth animated transitions driven by scroll or auto-advance
  4. Any element wrapped in `RevealWrapper` fades in from y=24 to y=0 at 0.8s cubic-bezier(0.22,1,0.36,1) when it enters the viewport; elements wrapped in `StaggerChildren` stagger at 0.1s intervals
  5. All animations produce zero motion when `prefers-reduced-motion` is enabled in the OS
**Plans:** 2/2 plans complete

Plans:
- [ ] 03-01-PLAN.md — Install Vitest, upgrade RevealWrapper + StaggerChildren with variant prop and reduced-motion guard, create HeroTextSelector
- [ ] 03-02-PLAN.md — Create HeroSection with video bg, overlay text, gold CTA, entrance animations; wire into page.tsx

### Phase 4: Static Content Sections
**Goal**: The complete homepage is populated — every section from photo strip through footer is present, scrollable, and animated
**Depends on**: Phase 3
**Requirements**: SECT-01, SECT-02, SECT-03, SECT-04, SECT-05, SECT-06, SECT-07, SECT-08, SECT-09, SECT-10, ANIM-05
**Success Criteria** (what must be TRUE):
  1. Scrolling past the hero reveals a horizontal photo strip, then a centered manifesto/statement text block — both animate in on scroll
  2. The proof strip shows a "Meu Portfólio" button, stacked avatar cluster, and four client brand logos (theo, Amsterdam, luminous, MILANO)
  3. "Meus Serviços" displays a 4-column white card grid with 7 service cards + 1 photo card; cards stagger-reveal on scroll; "Trabalhos Selecionados" shows a 3-column portfolio preview grid; "Últimas Histórias" shows 3 blog cards with horizontal separators
  4. FAQ section shows "Alguma Dúvida?" title left and an accordion right with 4 Portuguese questions that expand and collapse with animation
  5. Final CTA section shows the heading and "Entre em Contato" button; footer renders with Corazón brand, social links, and "MC. © 2026" — the homepage is complete end-to-end
**Plans:** 3/3 plans complete

Plans:
- [x] 04-01-PLAN.md — Wave 0 test stubs + PhotoStrip, Manifesto, ProofStrip, Services sections
- [x] 04-02-PLAN.md — Portfolio, Blog, FAQ sections
- [x] 04-03-PLAN.md — CTA, Footer sections + page.tsx integration + build verification

### Phase 5: Complex Interactive Sections
**Goal**: The two highest-craft sections work correctly in production — sticky process cards stack on scroll and the cinematic testimonial carousel auto-advances with a dark video background
**Depends on**: Phase 4
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06
**Success Criteria** (what must be TRUE):
  1. Scrolling through the process section stacks 6 cards with paper-like slight rotation — each card stays visible (stacked) as the next card scrolls in; verified against `next build` output, not just dev server
  2. Each process card shows step number, name, circular image placeholder, and description (Descoberta through Otimização)
  3. The bento trust grid renders with a tall photo card left, center content card with skill checklist, and right column of 4 sub-cards — asymmetric layout intact
  4. The testimonial section shows a dark cinematic background with 3 floating white review cards (Danny Rose, David Nguyen, Alisha Moore)
  5. Testimonial cards auto-advance every 5 seconds; clicking dot navigation manually selects a card; transitions use AnimatePresence for smooth enter/exit
**Plans:** 2/2 plans complete

Plans:
- [ ] 05-01-PLAN.md — Wave 0 test stubs + ProcessSection (sticky cards) + BentoSection (trust grid)
- [ ] 05-02-PLAN.md — TestimonialSection (carousel) + page.tsx integration + build verification

### Phase 6: Additional Pages
**Goal**: All sub-pages exist and are functional — visitors can browse the portfolio, submit a contact request, and read the privacy policy
**Depends on**: Phase 5
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04
**Success Criteria** (what must be TRUE):
  1. `/` home page assembles all sections into a complete single-page experience with no missing sections or broken layout
  2. `/portfolio` page loads and displays a grid of portfolio work (placeholder images with category labels)
  3. `/contato` page shows a form with name, email, subject, and message fields; submitting the form sends an email and displays a success or error state to the user
  4. `/privacidade` page renders LGPD-compliant privacy policy content in Portuguese
**Plans:** 2 plans

Plans:
- [ ] 06-01-PLAN.md — Wave 0 test stubs + ContactForm component + portfolio page + contact page
- [ ] 06-02-PLAN.md — Privacy policy page + full build verification + PAGE-01 confirmation

### Phase 7: Mobile Responsive + Performance
**Goal**: The site delivers the premium experience on mobile and passes Lighthouse — no layout breakage, no janky animations, no slow loads in production
**Depends on**: Phase 6
**Requirements**: RESP-01, RESP-02, RESP-03, RESP-04, RESP-05, RESP-06, RESP-07, PERF-01, PERF-02, PERF-03, PERF-04
**Success Criteria** (what must be TRUE):
  1. At 375px viewport, all sections reflow to single-column vertical stacks — no horizontal overflow, no text cut off, no overlapping elements
  2. Services grid transitions from 4-column to 2-column to 1-column at appropriate breakpoints; bento grid collapses to single-column on mobile
  3. The testimonial section is fully readable on mobile with touch swipe support; process cards have a graceful fallback (regular stacked reveal) if sticky scroll is impractical on touch
  4. All images use `next/image` with correct `sizes` attributes; background videos are hosted externally (not in git); no video or image files cause Vercel repo size issues
  5. The deployed Vercel site scores Lighthouse performance >= 85 on mobile and is publicly accessible at the canonical URL
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete   | 2026-03-28 |
| 2. Navigation Shell | 2/2 | Complete   | 2026-03-28 |
| 3. Hero + Animation System | 2/2 | Complete   | 2026-03-28 |
| 4. Static Content Sections | 3/3 | Complete   | 2026-03-28 |
| 5. Complex Interactive Sections | 2/2 | Complete   | 2026-03-28 |
| 6. Additional Pages | 0/2 | Planned | - |
| 7. Mobile Responsive + Performance | 0/TBD | Not started | - |
