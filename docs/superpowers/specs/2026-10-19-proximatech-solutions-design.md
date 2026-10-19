# Proximatech Solutions — Next.js Rebuild — Design Spec

- **Date**: 2026-10-19
- **Status**: Draft for client/owner review
- **Repo**: `chaze05/proximatech-solutions` (to be created)
- **Reference style**: Elev8 Media (`elev8media.com.ph`) — cinematic dark, oversized statements
- **Current site**: `proximatechsolutions.com` (WordPress, 2025-era; content and assets are reused)

---

## 1. Context

Proximatech Solutions is a Philippine software startup building workplace-productivity and
enterprise hardware/software solutions (RFID, barcode, asset tracking, event registration,
warehouse and fixed-asset systems, structured cabling, custom apps, web development).
They also resell hardware brands (Acer and others) and exhibit at events (FASAVA 2027).

Their current WordPress site has several problems:

- Stat counters render as `0 +` (broken animation) — no real numbers shown.
- Services page carries default theme placeholder copy.
- Testimonials use a generic placeholder photo for every person.
- Shopping page is completely empty (header/footer only).
- Sections/columns are misaligned at several breakpoints.
- Heavy Elementor/WordPress front end; slow first paint on mobile.

This project rebuilds the site as a fast, cinematic, fully aligned Next.js application in the
Elev8 visual language, **improving on** the reference in usability, accessibility and
performance.

## 2. Goals

1. A cinematic Elev8-style UI that feels premium for a real client review.
2. Perfect alignment: one strict grid and spacing scale applied to every section, row and
   column on every page, at every breakpoint.
3. Every nav page designed and functional: Home, Products, Services, Gallery, Store, Events,
   Contact (+ custom 404).
4. A working demo store (catalog → product page → cart → checkout → confirmation).
5. Fast by default: static pages, optimized images/fonts, no backend calls, Lighthouse targets
   below.
6. Deploy-ready on Vercel the same day; showcased on the owner's portfolio.

## 3. Non-goals (phase 2+)

- Real payments / order fulfillment (Stripe, shipping, tax).
- Real form delivery (email service/CRM) — form validates and simulates success.
- CMS editing for the client (Sanity or similar).
- DNS/domain cutover from their current WordPress site.
- Multi-language.

## 4. Users

- **B2B procurement / operations leads** evaluating RFID, barcode and asset solutions.
- **Event organizers** looking for registration/check-in systems (FASAVA-type).
- **Retail/hardware buyers** browsing products and requesting quotes.
- **Partners** (Acer, hardware brands) checking credibility.

## 5. Information architecture

| Route | Purpose |
|---|---|
| `/` | Cinematic home: positioning, proof, services, products, values, testimonials, CTA |
| `/products` | Filterable catalog of 16 products, quote/store CTAs |
| `/services` | 8 services as alternating editorial rows + process |
| `/gallery` | Filterable photo grid + keyboard lightbox |
| `/store` | Demo store catalog with categories |
| `/store/[slug]` | Static product detail pages |
| `/store/checkout` | 3-step demo checkout + confirmation state |
| `/events` | FASAVA 2027 featured event + countdown + registration CTA |
| `/contact` | Validated contact form (simulated) + contact info/map card |
| `not-found` | Cinematic 404 |

Navigation: Home implicit via logo; Products, Services, Gallery, Store, Events, Contact +
"Get a quote" button + cart icon with live count (store).

## 6. Visual system

- **Palette**
  - Base: obsidian `#08090C`; panels carbon `#10131A`; elevated `#161A23`.
  - Borders: steel `rgba(255,255,255,0.08–0.16)`.
  - Text: off-white `#F5F7FA`; secondary `#AEB7C6`; muted `#77808F`.
  - Signal red `#E11D2E` (logo red), hover glow `#FF3B4E`, deep red `#A3121F`.
  - Semantic: success `#34D399`, warning `#FBBF24` (used sparingly).
- **Typography**: Archivo Black (display statements), Manrope (body/UI), `next/font`
  self-hosted, latin subset, `display: swap`. Display clamp 2.5rem→7rem, tight tracking,
  uppercase for page statements; body 16–18px, line-height 1.6–1.7.
- **Grid**: container 1280px, 12 columns, 24px gutters (16px mobile), strict spacing scale
  (4/8/12/16/24/32/48/64/96/128). Sections use consistent vertical rhythm
  (mobile 64px → desktop 128px), and every multi-column block snaps to the same 12-col grid.
- **Texture**: CSS-only circuit grid (subtle, slowly panning), red radial glows, 1px noise
  overlay, full-bleed image bands with dark gradients. No heavy background videos.
- **Components**: solid/ghost buttons (44px min height), filter chips, pills, stat blocks,
  marquee, sticky glass header, section headers with eyebrow counters (`01 —`), cards with
  hover lift + red edge glow, inputs with red focus ring, breadcrumbs.

## 7. Page designs

### Home
1. **Header** — sticky glass; logo, nav, Get a quote (red pill), cart button with count,
   hamburger < 1024px.
2. **Hero** — 100svh cinematic: circuit grid + red orbs, eyebrow `PROXIMATECH SOLUTIONS`,
   giant `SECURING YOUR FUTURE.` (red accent), lede, CTAs (Explore products / Book a
   consultation), scroll cue.
3. **Stats band** — 4 count-up stats: `100+` projects, `50+` clients, `24/7` support,
   `2.0×` productivity lift.
4. **Partner marquee** — brand names strip (Acer, etc.), continuous, pauses on hover.
5. **Our Story** — editorial split: copy + office/team image collage with red frame accents.
6. **What we do** — 4 featured service cards → `/services`.
7. **Featured products** — 4 hardware cards → `/products` and `/store`.
8. **Commitment** — 6 value cards (Innovative, Scalable, User-Centric, Efficient, Tailored,
   Cutting-Edge) in 3×2 strict grid.
9. **Testimonials** — marquee of 3 real quotes with initial avatars (replaces placeholders).
10. **CTA band** — full-bleed red glow: "Let's build something great together" + phone/email.
11. **Footer** — logo/blurb, 4 link columns, contact block, socials, copyright.

### Products
- Page hero `HARDWARE THAT PERFORMS` + lede.
- Filter chips by category (Barcode & RFID, Surveillance, Mobility, Terminals, Networking,
  Accessories) + live search.
- 16 product cards (image, brand, name, blurb, category). Store-eligible items link to
  `/store/[slug]`; others link to `/contact` "Request a quote".

### Services
- Page hero `SOLUTIONS THAT SCALE` + rewritten intro (replace theme placeholder text).
- 8 alternating full-bleed rows: image, row number (`01 —`), title, their tagline, 2–3
  outcome bullets, CTA. Content: RFID, Barcode, Customized Apps, Event Registration,
  Warehouse Management, Fixed Asset Management, Structured Cabling, Website Development.
- Process band: `One-stop shop` — Consult → Design → Build → Deploy → Support.

### Gallery
- Page hero `INSIDE PROXIMATECH`.
- Filter tabs (All / Team / Vision / Events) + justified grid of their real photos.
- Lightbox: keyboard arrows/escape, caption, focus trap.
- Empty-safe: hides filters with no results.

### Store (demo)
- Page hero + category filters; product grid with ₱ prices, stock badge, quick add.
- Store carries **6 demo-priced hardware items** (barcode scanners, label printer, mobile
  computer, access point, biometric terminal, RFID reader) in the ₱1,500–₱25,000 range;
  the remaining products stay quote-only from `/products`.
- `/store/[slug]`: image, description, specs list, quantity selector, add to cart, related
  products; fully static (`generateStaticParams`).
- **Cart drawer** (right spring panel): items, qty ±, remove, subtotal, checkout CTA;
  persisted in `localStorage`; header count badge; accessible focus trap.
- **Checkout** (`/store/checkout`): steps — Contact → Shipping → Payment (demo card form:
  name on card, number, expiry, CVC — format validation only) → Review → Confirmation with
  order number. Clear `Demo checkout — no real payment will be taken` labeling throughout.
- Empty states for cart and checkout.

### Events
- Page hero `WHERE WE SHOW UP`.
- FASAVA 2027 Congress feature: image, dates/location, live countdown, description, CTA
  "Register interest" → `/contact`.
- Tie-in note for their Event Registration System service. No invented events.

### Contact
- Page hero `LET'S BUILD SOMETHING GREAT`.
- Split: validated form (first/last name, email, phone, subject, message; inline errors;
  simulated success state) | info cards (phones `+63 976 339 4297` / `0284040644`, email
  `info@proximatechsolutions.com`, address `B6 L10 Garden Villas 3, Phase 8, Sta. Rosa City,
  Laguna`) + dark styled map card + 24/7 support card.

### 404
- Cinematic statement `SIGNAL LOST.` + back-home/products CTAs.

## 8. Motion system

- Scroll reveals (opacity + translate, staggered per section) via IntersectionObserver/CSS.
- Count-up stats on first view.
- Marquee bands (CSS, hover-pause).
- Hover choreography: card lift + red edge glow, image scale, arrow slide.
- Header condense on scroll; active-section nav indicator.
- Cart drawer spring; lightbox fade/scale; checkout step transitions.
- `prefers-reduced-motion`: all transforms/animations disabled, content instantly visible.

## 9. Content & assets

- All content sourced from their current site (products, services, gallery, event, contact,
  testimonials, logo), with copy fixes: proper punctuation/casing, rewritten Services intro,
  fixed "Email Adress" typo, real stat values (100+ projects, 50+ clients, 24/7, 2.0× —
  derived from their existing copy, to be confirmed with the client).
- Testimonials keep their names/quotes; placeholder photos replaced with branded initial
  avatars (no fake faces).
- Images: download the site's product/service/gallery images + logo, optimize to
  AVIF/WebP with sensible sizes into `public/images/`; alt text written for each.
- Logo: keep their PNG mark; derive favicon set from it.

## 10. Technical architecture

- **Stack**: Next.js 15 (App Router), TypeScript (strict), Tailwind CSS, Framer Motion
  (lazy/limited), `next/font` (Archivo Black + Manrope), `next/image`.
- **Data layer** (`src/data/`): `site.ts` (contact, socials), `navigation.ts`,
  `products.ts` (16), `services.ts` (8), `values.ts` (6), `testimonials.ts` (3),
  `events.ts` (1), `gallery.ts`, `store.ts` (priced items, categories).
  All typed; components read from data — CMS/commerce can replace this layer later.
- **State**: `CartProvider` (React context) with localStorage persistence; derived
  subtotal/count; no external state lib.
- **Components**: layout (header/footer/cart-drawer), ui (button, chip, section-header,
  stat, marquee, input, breadcrumbs), sections, store components.
- **SEO**: per-route metadata, Open Graph, `sitemap.ts`, `robots.ts`, icons.
- **A11y**: semantic landmarks, skip link, focus-visible rings, focus-trapped drawer/lightbox,
  aria labels, contrast-checked palette, reduced-motion support, 44px tap targets.
- **Performance budget**: all routes static; first-load JS ≈ ≤150KB gz; images lazy below the
  fold with explicit sizes; LCP < 2.5s on 4G; Lighthouse ≥ 90 mobile / ≥ 95 desktop for
  performance, accessibility, best practices, SEO.

## 11. QA & acceptance

- `next build` + typecheck clean; lint clean.
- Screenshot every page at 1440 / 1024 / 768 / 390 / 320; verify alignment on every
  section/column/row and 0px horizontal overflow.
- Store flow: add → qty → remove → cart persists after reload → checkout validation →
  confirmation; demo labeling visible.
- Products: filters + search; Services rows; Gallery filters + lightbox keyboard nav;
  Events countdown ticks; Contact validation + simulated success; 404.
- 0 console errors on all pages; Lighthouse captures attached to the PR/report.
- Deployed to Vercel, live URL verified after deploy.

## 12. Delivery

- Repo `chaze05/proximatech-solutions` (public), `main` branch.
- Vercel project → production URL shared with the client for review.
- Portfolio: new card added (View All, unless promotion requested) with live link + stack
  tags; screenshot captured from the live site.
- Client's existing WordPress site and domain remain untouched until they approve a cutover.

## 13. Risks / notes

- Product names/brands shown as on their current site; confirm no trademark misuse issues.
- Demo store prices are illustrative (PHP) and labeled demo.
- Only one real event exists; the Events page is designed to scale to more entries.
- Form delivery and payments are explicitly phase 2.
- Nav label "Shopping" changes to "Store" for clarity (can revert to "Shopping" if the
  client prefers).
- Stat values are derived from their existing copy; confirm exact figures with the client.
