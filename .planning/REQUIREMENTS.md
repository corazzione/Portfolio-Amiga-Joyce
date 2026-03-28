# Requirements: Portfólio Fotógrafa Joyce (Corazón)

**Defined:** 2026-03-28
**Core Value:** Visitors feel the quality and aesthetic of Joyce's work through the site itself — every scroll, reveal, and interaction communicates premium visual storytelling before they've seen a single photo.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Project scaffolds with Next.js 14 App Router, TypeScript, Tailwind CSS v3.4, and Motion v12 (`motion/react`)
- [x] **FOUND-02**: Switzer variable font is self-hosted via `next/font/local` from `app/fonts/Switzer-Variable.woff2` and exposed as a CSS variable in Tailwind config
- [x] **FOUND-03**: Public Sans is loaded via `next/font/google` and exposed as a CSS variable in Tailwind config
- [x] **FOUND-04**: Tailwind config has all custom tokens: `colors.bg` (#EFE8DC), `colors.gold` (#C8973A), `colors.dark` (#1a1a1a), `fontFamily.switzer`, `fontFamily.sans` (Public Sans)
- [x] **FOUND-05**: Global animation variants are defined in `lib/animation-variants.ts` (fade+translateY, stagger, scale-in, spring)
- [x] **FOUND-06**: `RevealWrapper` and `StaggerChildren` client components are created in `components/motion/` and used site-wide for scroll reveals
- [x] **FOUND-07**: Static content data (services, process steps, testimonials, blog posts, FAQ, logos) lives in `lib/data.ts`
- [x] **FOUND-08**: `vercel.json` is configured with appropriate headers and deploy settings

### Navigation

- [x] **NAV-01**: Top navbar shows "MC." logo left and "Uma Contadora de Histórias Visual" tagline, with a "Contato" button right; transparent over hero, solid on scroll
- [x] **NAV-02**: Fixed bottom bar persists on all pages with: "Menu+" gold pill button left, "Corazón" white text center, on black background
- [x] **NAV-03**: Clicking "Menu+" opens a fullscreen dark overlay menu with animated entrance (slide/fade)
- [x] **NAV-04**: Fullscreen menu overlay shows navigation links and closes on link click or close button
- [x] **NAV-05**: Mobile menu overlay covers the full viewport with vertical navigation layout

### Hero

- [x] **HERO-01**: Hero section is full-screen (100vh) with a looping background video (muted, autoplay, playsInline)
- [x] **HERO-02**: Hero displays the "MC. // UMA CONTADORA DE HISTÓRIAS VISUAL" logo/tagline overlay
- [x] **HERO-03**: Hero has a mustard CTA button ("Ver Portfólio" or equivalent) in the top-right area
- [x] **HERO-04**: Hero features an animated vertical text selector cycling through "A Criação / Videografia / Fotografia" — driven by scroll position or auto-advance
- [x] **HERO-05**: Hero text and CTA animate in on page load (not scroll-triggered)

### Sections — Content

- [x] **SECT-01**: Horizontal photo strip with thumbnail images scrolls/reveals below the hero
- [x] **SECT-02**: Centered manifesto/statement text section below the photo strip with scroll-reveal
- [x] **SECT-03**: CTA/proof strip includes: mustard "Meu Portfólio" button, avatar cluster (stacked circular avatars), and client logos (theo, Amsterdam, luminous, MILANO)
- [x] **SECT-04**: "Meus Serviços" section has a heading left + button right layout, followed by a 4-column white card grid with 7 service cards + 1 photo card
- [x] **SECT-05**: Each service card shows a title, short description, and icon/visual; cards stagger-reveal on scroll
- [ ] **SECT-06**: "Trabalhos Selecionados" section shows a 3-column portfolio preview grid with image + caption; items stagger-reveal on scroll
- [ ] **SECT-07**: "Últimas Histórias" section shows 3 blog preview cards with horizontal line separators between them
- [ ] **SECT-08**: FAQ section has "Alguma Dúvida?" title on the left and an accordion on the right with 4 questions in Portuguese; accordion items expand/collapse with animation
- [x] **SECT-09**: Final CTA section shows "Transforme Suas Ideias em Visuais de Outro Nível" heading, "Entre em Contato" button, and a standing model/photographer figure emerging from the bottom
- [x] **SECT-10**: Footer has a white card on beige background containing: "Corazón" brand name, Portuguese tagline, X + Instagram social links, "Explorar" nav links, legal links, "Criado por Markus Corazzione", "MC. © 2026"

### Sections — Complex Interactive

- [x] **COMP-01**: "Um Caminho Claro para Visuais Excepcionais" section shows 6 process steps as sticky stacked cards with paper-like slight rotation; cards stack as user scrolls through the section
- [x] **COMP-02**: Each process card has: step number, step name, circular image, and description (Descoberta, Planejamento, Captação, Edição, Entrega, Otimização)
- [x] **COMP-03**: "Construído na Confiança, Movido pela Qualidade" section is an asymmetric bento grid with: tall photo card left (Visão Personalizada overlay), center beige card (Atenção aos Detalhes + skill checklist), right column (4 sub-cards: equipment, quality polaroids, collaborations with avatars/stats, dark Abordagem Narrativa card)
- [ ] **COMP-04**: Dark cinematic testimonial section has a looping background video with 3 floating white review cards — Danny Rose, David Nguyen, Alisha Moore
- [ ] **COMP-05**: Testimonial cards auto-advance every 5 seconds with dot navigation for manual control
- [ ] **COMP-06**: Testimonial section transition uses AnimatePresence for smooth card enter/exit

### Animation System

- [x] **ANIM-01**: All content sections reveal on scroll using fade-in + translateY (opacity 0→1, y 24→0, duration 0.8s, cubic-bezier(0.22,1,0.36,1))
- [x] **ANIM-02**: Image rows, service cards, portfolio cards, and blog cards stagger-reveal with 0.1s delay between children
- [x] **ANIM-03**: Featured images and cards have subtle scale-in on reveal (scale 0.985→1)
- [x] **ANIM-04**: Buttons have gentle hover state (scale, color, or opacity transition)
- [x] **ANIM-05**: Cards and images have subtle hover elevation/scale on mouse enter
- [x] **ANIM-06**: All animations respect `prefers-reduced-motion` — zero motion in reduced-motion mode

### Responsive

- [ ] **RESP-01**: Layout reflows to single-column vertical stacks on mobile (not just scaled-down desktop)
- [ ] **RESP-02**: Services grid goes from 4-column to 2-column to 1-column on progressively smaller screens
- [ ] **RESP-03**: Bento grid adapts to stacked single-column on mobile
- [ ] **RESP-04**: Hero text selector remains legible and functional on mobile
- [ ] **RESP-05**: Bottom bar and fullscreen menu overlay work correctly on mobile
- [ ] **RESP-06**: Testimonial cards are fully readable on mobile with touch swipe support
- [ ] **RESP-07**: Process cards sticky effect has a graceful mobile fallback (regular stacked cards if sticky scroll is impractical on touch)

### Pages

- [ ] **PAGE-01**: `/` (home) — full single-page portfolio experience with all 12 sections
- [ ] **PAGE-02**: `/portfolio` — portfolio listing page with filterable or categorized work grid
- [ ] **PAGE-03**: `/contato` — contact page with a form (name, email, message, subject) that submits via email service (Formspree or Resend serverless action)
- [ ] **PAGE-04**: `/privacidade` — privacy/cookies policy page with LGPD-compliant content

### Performance & Deployment

- [ ] **PERF-01**: All images use `next/image` with appropriate `sizes` attributes and lazy loading
- [ ] **PERF-02**: Background videos are hosted externally (Vercel Blob or Cloudinary) — no video files committed to git
- [ ] **PERF-03**: Site passes Lighthouse performance score ≥ 85 on deployed Vercel URL
- [ ] **PERF-04**: Site is deployed and publicly accessible on Vercel from the `corazzione/Portfolio-Amiga-Joyce` repo

## v2 Requirements

### CMS & Content Management

- **CMS-01**: Blog posts manageable via headless CMS (Sanity, Contentful)
- **CMS-02**: Portfolio works manageable without code changes
- **CMS-03**: Services and pricing editable via CMS

### Enhanced Interactivity

- **ENH-01**: Smooth scroll via Lenis library
- **ENH-02**: Custom cursor for desktop
- **ENH-03**: Page transition animations between routes
- **ENH-04**: Lightbox for portfolio image viewing
- **ENH-05**: Horizontal scroll section for photo strip

### Booking & E-Commerce

- **BOOK-01**: Online booking/scheduling system integration
- **BOOK-02**: Pricing packages display
- **BOOK-03**: Client gallery delivery portal

### Analytics & SEO

- **SEO-01**: Structured data / JSON-LD for photographer
- **SEO-02**: Analytics integration (Vercel Analytics or GA4)
- **SEO-03**: OG image generation per page

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS backend | Static content is sufficient for v1; adds complexity without immediate value |
| User authentication | Not needed for a portfolio site |
| E-commerce / booking | Out of scope; just a contact form for now |
| Multi-language | Portuguese only; no demand for other languages |
| Custom cursor | Can feel gimmicky; deferred to v2 if specifically requested |
| Page transition animations | AnimatePresence is broken in Next.js 14 App Router at layout level |
| Lenis smooth scroll | Adds JS weight; native scroll + Framer Motion is sufficient |
| Video files in git | Must use external hosting (Vercel Blob / Cloudinary) |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 to FOUND-08 | Phase 1 | Pending |
| NAV-01 to NAV-05 | Phase 2 | Pending |
| HERO-01 to HERO-05 | Phase 3 | Pending |
| ANIM-01 to ANIM-06 | Phase 3 | Pending |
| SECT-01 to SECT-10 | Phase 4 | Pending |
| COMP-01 to COMP-06 | Phase 5 | Pending |
| PAGE-01 to PAGE-04 | Phase 6 | Pending |
| RESP-01 to RESP-07 | Phase 7 | Pending |
| PERF-01 to PERF-04 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 51 total
- Mapped to phases: 51
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-28*
*Last updated: 2026-03-28 after roadmap finalization*
