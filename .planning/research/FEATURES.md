# Feature Research

**Domain:** Premium photographer/videographer portfolio website — editorial luxury aesthetic
**Researched:** 2026-03-28
**Confidence:** HIGH (based on existing mockup as authoritative spec + web research on current patterns)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist on any professional photographer site. Missing these = visitor leaves or loses trust.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Full-screen hero with strong headline | First impression; sets tone in <3s | LOW | Already implemented: animated text selector cycling A Criação / Videografia / Fotografia |
| Portfolio/work gallery | Core reason visitors come | MEDIUM | 3-column grid with 3:4 aspect ratio cards; hover zoom 1.06 |
| Service listing | Visitors need to know what you offer | LOW | 4-column white card grid; 7 services + 1 photo slot |
| Contact page | Primary conversion goal for any portfolio | MEDIUM | /contato page with form; field strategy matters (see below) |
| Mobile-responsive layout | >60% of portfolio visits are mobile | HIGH | Requires genuine redesign per breakpoint, not just shrink — already spec'd |
| Social media links | Expected on every creative portfolio | LOW | Instagram, TikTok, etc.; footer social circles |
| Basic navigation | Users need to orient and jump to sections | LOW | Dual-nav pattern: top bar + fixed bottom bar with fullscreen overlay |
| Brand identity visible | Logo, name, consistent aesthetic throughout | LOW | MC. mark + Corazón brand + beige/gold palette |
| Fast image loading | Slow sites kill luxury perception immediately | MEDIUM | Next.js Image component with lazy load, blur placeholder, proper sizing |
| Privacy policy page | Legal requirement in Brazil (LGPD) | LOW | /privacidade static page |
| Testimonials / social proof | Visitors need trust signals before contacting | MEDIUM | Dark cinematic section with floating review cards |

### Differentiators (Competitive Advantage)

Features that elevate this site above typical photographer portfolios. These are where the "editorial luxury" perception is won or lost.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Animated hero text selector | Communicates three service pillars dynamically; feels alive vs static hero | MEDIUM | Active item large (clamp 40px→88px), inactive items small/muted; click or auto-cycle |
| Sticky stacked process cards with rotation | Premium storytelling pattern; makes the 6-step process feel tactile and cinematic | HIGH | `position: sticky` with progressive `top` values; paper-like rotation on each card; critical section per PROJECT.md |
| Dark cinematic testimonial section with looping video background | Contrast against beige sections creates dramatic rhythm; video background makes testimonials feel like a film scene | HIGH | Full-viewport dark section; looping bg video at 35% opacity overlay; floating white card auto-advances every 5s with dot nav |
| Fixed bottom navigation bar | Unexpected pattern; premium and distinctive; always-accessible menu | MEDIUM | Black bar with gold "Menu+" pill left; "Corazón" centered; fullscreen dark overlay menu on open |
| Asymmetric bento trust grid | Modern layout pattern signals design sophistication; breaks grid monotony | MEDIUM | 3-col grid with vision cell spanning 2 rows; mixed bg colors (sage green, warm beige, dark brown) |
| Scroll-reveal animation system | Creates sense of pages "breathing" as content enters; premium cinematic feel | MEDIUM | opacity 0→1, y 24→0, 0.8s cubic-bezier(0.22,1,0.36,1); applied uniformly across all sections |
| Staggered children animations | Prevents simultaneous pop-in; feels choreographed not mechanical | MEDIUM | transition-delay increments (.1s, .2s, .3s) for image rows, card grids, blog cards |
| Subtle scale-in on featured images | Draws eye; reinforces quality without distracting | LOW | scale 0.985→1 on entry; used for hero and featured portfolio items |
| Horizontal thumbnail strip with featured center | Gallery-within-landing pattern common in high-end fashion/editorial sites; shows range without a full gallery page | MEDIUM | 5 photos; center one featured (larger, white border, shadow); side ones dimmed |
| Manifesto/statement text block | Gives photographer a voice and editorial identity beyond just photos | LOW | Large Switzer bold quote centered; acts as brand thesis |
| Avatar cluster + star rating social proof | Micro-conversion accelerator; "X clients, 5 stars" pattern trusted from SaaS but effective for creative services | LOW | Overlapping avatars, gold stars, short stats label |
| Client brand logos strip | Name recognition transfers trust from known brands to the photographer | LOW | Muted logos, subtle; hover to full opacity |
| CTA figure emerging from bottom | Cinematic visual punctuation; model figure appearing from below the fold is a signature pattern in fashion editorial sites | MEDIUM | Standing model image, 480px height, `object-position: bottom`; requires real photo asset |
| Footer white card on beige | Contained footer feels like a final editorial spread; luxury periodical aesthetic | LOW | border-radius 20px 20px 0 0; white on beige contrast; photographer figure ghosted behind content |
| Custom scrollbar | Small but appreciated detail; gold thumb on beige track signals care | LOW | 3px width, gold `#C8973A` thumb; webkit only |
| Blog preview section (static) | Shows activity and expertise; SEO value; editorial credibility | LOW | 3 static cards with horizontal border separators; no CMS in v1 |
| FAQ accordion (two-column layout) | Reduces pre-contact friction; handles objections before they become reasons not to book | LOW | Left: large heading; right: accordion items; rotating + icon |
| Gentle hover states everywhere | Luxury sites reward exploration; every interactive element should feel responsive | LOW | Cards lift (-3px), images zoom (1.04–1.06), buttons darken + rise (-2px), logo items opacity |

### Anti-Features (Deliberately NOT in v1)

Features that seem appealing but add cost, complexity, or dilute the experience without clear return.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| CMS / content management | "I'll want to update photos myself" | Adds backend, hosting complexity, auth, and maintenance overhead; v1 content won't change often | Static content in code; update via git when needed |
| Online booking / calendar integration | "Clients can book directly" | Booking systems (Calendly embed, custom) add visual noise and break the luxury feel; requires availability management | Contact form + email response flow; keeps control and allows qualifying conversations |
| E-commerce / print sales | "I can sell prints" | Completely different product category; distracts from portfolio goal; requires payment infrastructure | Link to external print service if needed later |
| Lightbox / full-screen photo viewer | "Visitors want to see photos bigger" | Without real photos loaded, placeholder lightbox adds complexity; real photos aren't in v1 | Portfolio grid with hover zoom is sufficient; /portfolio page can expand later |
| Parallax background effects | "Looks impressive" | Parallax is GPU-intensive, causes jank on mobile, and can feel dated vs. the cleaner reveal-based approach already spec'd | Scroll-reveal with cubic-bezier easing achieves cinematic feel with less risk |
| Heavy cursor effects (trailing cursors, magnetic buttons) | "Premium sites have cursor effects" | Performance cost, breaks on touch devices (50%+ of traffic), can feel gimmicky rather than editorial | Subtle hover states on all elements achieve the same "site reacts to you" feeling |
| Video autoplay in hero | "High-end sites have video heroes" | Large file size; mobile browsers block autoplay; real video content not available in v1 | Animated text selector + still background achieves cinematic hero without video dependency |
| Multi-language support | "International clients" | Doubles content maintenance; unnecessary for Portuguese-speaking market target | Portuguese only; clear brand copy is more important than translated copy |
| Blog CMS / dynamic posts | "I'll write regularly" | CMS infrastructure is disproportionate to 3 static blog cards | Static blog preview cards with links; CMS is v2 if content volume justifies it |
| User accounts / client galleries | "Deliver photos to clients through the site" | Entirely different product; requires auth, storage, delivery pipeline | External services (Pixieset, Google Drive, WeTransfer) for client delivery |
| Infinite scroll on portfolio | "Show more work" | Loses editorial curation feel; premium portfolios are edited, not exhaustive | 3-column preview on home + /portfolio page with curated selection |

---

## Section-by-Section Feature Specification

Covers all 12+ sections defined in PROJECT.md with interaction details.

### 1. Hero Section
- Full-viewport height (`min-height: 100vh`)
- Animated text selector: 3 items (A Criação / Videografia / Fotografia), one active (large, dark), two inactive (small, muted 30% opacity)
- Click or auto-advance (every ~3s) cycles active item with smooth size transition (0.4s ease)
- Gold CTA button ("Fale Comigo") — links to /contato
- No background video in v1 (placeholder bg color); real video is v1.x when asset is available
- Top nav: brand left ("MC. / Corazão"), "Contato" button right (gold, uppercase)

### 2. Fixed Bottom Navigation Bar
- `position: fixed; bottom: 0; z-index: 200`
- Black background, 52px height
- Left: gold "Menu +" pill button — triggers fullscreen overlay
- Center: "Corazón" in white Switzer uppercase
- Fullscreen overlay: black bg, large nav links (clamp 36px→72px), gold on hover, close button top-right, social links bottom-left
- Overlay transition: `opacity 0→1` over 0.4s

### 3. Photo Strip + Manifesto
- Horizontal strip: 5 photos (4 small at 220x300px, 1 featured at 280x360px)
- Featured: white border 8px, elevated shadow, centered
- Hover on any: `transform: scale(1.04)` on inner image
- Manifesto block below: centered Switzer bold, clamp 22px→38px, max-width 860px

### 4. Proof / CTA Strip
- Gold "Reservar Sessão" button + avatar cluster + star rating + stats label
- Client brand logos: 4 names (theo, Amsterdam, luminous, MILANO), muted, hover to full opacity

### 5. Services Section ("Meus Serviços")
- Section header: title left, subtitle right (responsive: stacks on mobile)
- Grid row 1: 4 columns (service cards 1–4 + photo slot)
- Grid row 2: 3 columns (service cards 5–7)
- Each card: numbered tag (black square), service name (Switzer 18px bold), description (muted 13px)
- Card hover: `box-shadow` lift + `translateY(-3px)`
- Staggered reveal animation on scroll entry

### 6. Process Section ("Um Caminho Claro...")
- Centered section: label, title, 6 stacked cards
- Cards: white, border-radius 16px, centered text, circular image (180x180px), step number, description
- CRITICAL ANIMATION: sticky stacked with progressive top offset — each card sticks as user scrolls, creating paper stack effect
- Implementation: Framer Motion `useScroll` + `useTransform` per card; each card gets slight rotation (-2deg to +2deg alternating)
- Fallback: if sticky complex for mobile, switch to vertical reveal stack

### 7. Bento Trust Grid ("Construído na Confiança...")
- 3-column CSS Grid, 2 rows
- Cell 1 (col 1, rows 1-2): "Visão Personalizada" — full-height photo with text overlay, min-height 500px
- Cell 2 (col 2, row 1): "Atenção ao Detalhe" — warm beige `#E8E0D2`, skill checklist with gold checkmarks
- Cell 3 (col 3, row 1): "Equipamento Profissional" — sage green `#C5CEC8`, bottom-aligned heading
- Cell 4 (col 2, row 2): "Qualidade Consistente" — white card, polaroid stack illustration (CSS)
- Cell 5 (col 3, row 2): "Colaboração Fluida" — white card, mini avatar cluster
- Cell 6 (span): "Narrativa Visual" — dark brown `#4a2820`, white text, subtitle
- Tablet: collapses to 2 columns

### 8. Selected Works ("Trabalhos Selecionados")
- 3-column grid, 3:4 aspect ratio cards
- Card: image top, caption below (white card bg, title, category)
- Hover: `scale(1.02)` on card + `scale(1.06)` on inner image
- "Ver Portfólio" link — navigates to /portfolio page
- Staggered reveal (3 cards, delays .1s/.2s/.3s)

### 9. Testimonials Section
- Full dark section (`#1a1a18`), full viewport height per slide
- 3 slides, background: full-bleed photo per slide with `rgba(0,0,0,0.35)` overlay
- Floating white card (340px wide): stars, reviewer number, author avatar + name + role, large quote (Switzer bold 18–24px)
- Auto-advance: 5s interval
- Dot navigation: bottom-right, white dot = active
- Card entry: fade in (opacity) when slide becomes active
- Mobile: card full-width with padding

### 10. Blog Preview ("Últimas Histórias")
- Section header row + 3-column grid
- Cards separated by horizontal lines (border-right on non-last, border-top on all)
- Each card: title (Switzer 16px bold), 4:3 image
- Hover: `opacity 0.7` (understated)
- No CMS; static content only in v1
- Mobile: single column, border-right removed

### 11. FAQ Section ("Alguma Dúvida?")
- 2-column layout: large title left (clamp 32px→56px), accordion list right
- 4 questions in Brazilian Portuguese
- Accordion: border-bottom separator, question button full-width, + icon rotates 45deg when open
- Answer: `max-height 0→200px` transition (CSS only, no JS library needed)
- Active state: icon rotates, answer slides down

### 12. Final CTA Section
- Centered headline (clamp 32px→64px), subtitle, gold button
- Standing model figure (480px height) emerging from bottom — `object-position: bottom`
- Placeholder gradient for v1 until real photo asset supplied

### 13. Footer
- Beige background container; white card inner (`border-radius: 20px 20px 0 0`)
- 3-column grid: brand+tagline+socials, navigation links, legal links
- Photographer figure ghosted behind content (absolute positioned, pointer-events none)
- Bottom bar: copyright left, legal links right
- Social circles: black → gold on hover

### 14. Scroll Animation System (Cross-Cutting)
- IntersectionObserver (or Framer Motion `whileInView`) on all `.reveal` elements
- Entry: `opacity: 0, y: 24px` → `opacity: 1, y: 0`, duration 0.8s, `cubic-bezier(0.22, 1, 0.36, 1)`
- Stagger delays for sibling groups: 0.1s / 0.2s / 0.3s
- Scale-in for featured images: `scale: 0.985 → 1`
- Once: true (animate only on first entry, not on scroll back up)

### 15. Contact Page (/contato)
- Matches main site aesthetic (same beige, gold, typography)
- Fields: Nome, Email, Telefone (optional), Tipo de Serviço (dropdown), Data Prevista (optional), Mensagem (textarea)
- One qualifying question: "Como você nos encontrou?" — helps understand marketing channels
- Submit: no backend in v1; use Resend or Formspree for email delivery
- Success state: inline confirmation message (not redirect) preserving page context
- Gold submit button with hover state consistent with site

### 16. Portfolio Page (/portfolio)
- Larger grid (3-column masonry or uniform grid)
- Filterable by category (Fotografia / Videografia / Eventos) — CSS only toggle, no JS library
- Each item: image + category tag + hover reveal title
- "Agendar Sessão" CTA at bottom

---

## Feature Dependencies

```
Scroll Animation System
    └──required by──> All Sections (hero, services, process, bento, works, blog, FAQ, CTA, footer)

Fixed Bottom Bar
    └──requires──> Fullscreen Overlay Menu
                       └──requires──> Body padding-bottom: 60px (space for bar)

Process Section (Sticky Cards)
    └──requires──> Framer Motion useScroll + useTransform
                       └──requires──> Framer Motion installed

Testimonial Section (Auto-advance)
    └──requires──> setTimeout / setInterval in React useEffect
    └──enhances──> Background image assets (real photos per slide)

Portfolio Page
    └──enhances──> Selected Works section (links to it)

Contact Page
    └──enhances──> All CTA buttons site-wide (all link to /contato)
    └──requires──> Email delivery service (Resend or Formspree)

Blog Preview Section
    └──conflicts──> CMS (static in v1; CMS would require full rebuild of this section)

Real Photo Assets
    └──enhances──> Hero, Photo Strip, Portfolio Grid, Testimonial Slides, Bento Vision, CTA Figure, Footer Figure
    └──note──> v1 ships with placeholder bg colors; real assets drop in without code changes
```

### Dependency Notes

- **Scroll Animation System requires consistent markup:** Every animatable element needs `.reveal` class (or Framer Motion `motion.div` with `whileInView`). Decision must be made early — mixing IntersectionObserver CSS and Framer Motion `whileInView` creates inconsistency. Recommendation: use Framer Motion `whileInView` uniformly since it's already a project dependency.
- **Process sticky cards require scroll tracking per card:** Each of the 6 cards needs its own `useScroll` reference with `offset` tuned to its position in the stack. This is the most animation-complex section.
- **Contact page requires email service decision:** Formspree works with no backend (free tier sufficient for v1). Resend requires a serverless function but gives more control. Both need environment variable for API key.
- **Bottom bar padding:** `body { padding-bottom: 60px }` must be set globally or every section will be obscured at scroll end.

---

## MVP Definition

### Launch With (v1)

These are required for the site to feel complete and professional. All are already spec'd in PROJECT.md.

- [ ] Hero with animated text selector and gold CTA — first impression is non-negotiable
- [ ] Fixed bottom navigation bar with fullscreen overlay — signature interaction pattern
- [ ] Services grid (4+3 layout) — answers "what do you offer"
- [ ] Process section with sticky stacked cards — key differentiator, high craft signal
- [ ] Bento trust grid — social proof without a wall of text
- [ ] Selected works grid (3 cards) — the actual portfolio preview
- [ ] Dark cinematic testimonial section (3 slides, auto-advance) — emotional trust signal
- [ ] FAQ accordion — pre-contact objection handling
- [ ] Final CTA section — conversion endpoint
- [ ] Footer with social links and legal links
- [ ] Scroll-reveal animation system across all sections
- [ ] /contato page with working form (Formspree or Resend)
- [ ] /portfolio page (basic grid)
- [ ] /privacidade page (LGPD compliance)
- [ ] Mobile-responsive layout (genuine vertical redesign, not just shrink)
- [ ] Vercel deployment config

### Add After Validation (v1.x)

Add when real client interest is confirmed and content assets exist.

- [ ] Real photography/videography assets replacing placeholders — triggers when Joyce provides photos
- [ ] Background video for testimonial section — triggers when video asset is available
- [ ] Background video for hero — triggers when short cinematic clip is available
- [ ] Blog posts with real content — triggers when Joyce has stories to tell
- [ ] Portfolio category filtering — triggers when portfolio grows beyond 9 items

### Future Consideration (v2+)

Defer until site is validated and business is scaling.

- [ ] CMS integration (Sanity, Contentful) — defer until update frequency justifies it
- [ ] Client delivery galleries — defer until volume makes email delivery insufficient
- [ ] Online booking / calendar — defer until contact form creates scheduling bottleneck
- [ ] Multi-region SEO — defer until international inquiries appear
- [ ] Print sales — defer until explicitly requested by clients

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero animated text selector | HIGH | MEDIUM | P1 |
| Fixed bottom bar + overlay menu | HIGH | MEDIUM | P1 |
| Scroll-reveal system | HIGH | MEDIUM | P1 |
| Services grid | HIGH | LOW | P1 |
| Sticky stacked process cards | HIGH | HIGH | P1 |
| Bento trust grid | MEDIUM | MEDIUM | P1 |
| Selected works grid | HIGH | LOW | P1 |
| Dark testimonial section | HIGH | HIGH | P1 |
| FAQ accordion | MEDIUM | LOW | P1 |
| Final CTA + figure | MEDIUM | LOW | P1 |
| Footer | HIGH | LOW | P1 |
| Contact page + working form | HIGH | MEDIUM | P1 |
| Portfolio page | MEDIUM | MEDIUM | P1 |
| Privacy page | LOW | LOW | P1 |
| Mobile responsive layout | HIGH | HIGH | P1 |
| Photo strip + manifesto | MEDIUM | LOW | P2 |
| Proof strip (avatars, logos) | MEDIUM | LOW | P2 |
| Blog preview section | LOW | LOW | P2 |
| Staggered child animations | MEDIUM | LOW | P2 |
| Custom scrollbar | LOW | LOW | P2 |
| Real video backgrounds | HIGH | LOW | P3 |
| Portfolio category filtering | MEDIUM | MEDIUM | P3 |
| CMS integration | MEDIUM | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## What Makes It Feel "Editorial Luxury" — Design Principles

These are not individual features but pervasive decisions that determine whether the site reads as premium or generic.

**Restraint over abundance.** Premium editorial sites show less to signal confidence. 3 portfolio cards, not 12. 4 FAQ items, not 10. Each element earns its place.

**Motion is choreographed, not decorative.** Every animation has a direction and duration that communicates something: sections rise to meet the visitor (y 24→0), images breathe in on entry (scale 0.985→1), the process cards layer like a physical stack. No animations exist just to show off.

**Contrast creates rhythm.** The alternation between beige/light sections and the full-dark testimonial section is essential. Without the dark section, the page reads as monotonous. With it, the light sections feel warmer and the dark section feels cinematic.

**Typography as design element.** Switzer at display sizes (clamp 40px→88px for the hero) with tight tracking (-0.03em) creates the editorial masthead quality. Public Sans at body size provides legibility contrast. No decorative fonts needed.

**Gold is used sparingly.** The mustard gold `#C8973A` appears on: CTAs, the bottom bar pill, the menu hover state, star ratings, skill check icons, the custom scrollbar, and social circle hover. It is never used as a background color. Scarcity is what makes it feel like an accent rather than a brand color.

**The bottom bar is the signature move.** No standard photographer portfolio has a fixed bottom nav bar with a "Menu+" pill. This single element signals that the designer made intentional, unexpected decisions — which by inference means the photographer also makes intentional, unexpected decisions.

---

## Competitor Feature Analysis

| Feature | Generic Pixieset/Format Portfolio | Mid-tier Custom Site | This Site (Target) |
|---------|----------------------------------|---------------------|---------------------|
| Navigation | Top bar only | Top bar + hamburger | Dual: top bar + fixed bottom bar with overlay |
| Hero | Static photo | Slideshow or video | Animated text selector cycling service types |
| Process section | None | Numbered list | Sticky stacked physical-paper cards |
| Trust section | Maybe a quote | Testimonials list | Dark cinematic video bg + floating cards auto-advance |
| Layout rhythm | Consistent monotone | 2 alternating tones | 3 tones: beige / white cards / dark cinema |
| Animations | CSS transitions only | Some scroll reveals | Full choreographed system with cubic-bezier easing |
| Portfolio grid | Masonry or grid | Grid with hover | 3:4 cards with scale+zoom compound hover |
| Mobile | Responsive shrink | Responsive redesign | True vertical-first redesign with mobile menu overlay |
| Footer | Standard | Standard | White card on beige, photographer figure behind content |

---

## Sources

- [The Best Editorial Photography Portfolio Examples 2026 — Format](https://www.format.com/online-portfolio-website/editorial-photography/best)
- [33 Best Photography Website Designs — Colorlib](https://colorlib.com/wp/photography-websites/)
- [18 Best Scrolling Websites — HTMLBurger](https://htmlburger.com/blog/best-scrolling-websites/)
- [Top Web Design Trends 2026 — Figma](https://www.figma.com/resource-library/web-design-trends/)
- [Scroll-driven Animations: Stacking Cards (CSS)](https://scroll-driven-animations.style/demos/stacking-cards/css/)
- [Stacking Cards on Scroll in Framer — Framer University](https://framer.university/resources/stacking-cards-on-scroll-in-framer)
- [Photography Contact Form Best Practices — HoneyBook](https://www.honeybook.com/blog/how-to-create-an-effective-contact-form-for-photographers)
- [5 Top Photography Booking Pages — YouCanBook.me](https://youcanbook.me/blog/photography-booking-page-examples)
- [Bento Grid Design 2025 — MukeshK Designs](https://mukeshkdesigns.com/blogs/bento-grid-design-inspiration/)
- `index.html` in project root — authoritative visual reference implementation

---
*Feature research for: Premium photographer/videographer portfolio — Corazón / Joyce*
*Researched: 2026-03-28*
