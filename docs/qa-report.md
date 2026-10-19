# QA Report — Proximatech Solutions rebuild

- **Date**: 2026-10-19
- **Build**: Next.js 15 production build (`npm run build`) — all routes static; store product pages SSG
- **Unit tests**: `npm test` — 28/28 pass (cart math, storage parsing, formatting, validation incl. expired cards, catalog filtering, data integrity, asset existence)
- **Type check**: `tsc --noEmit` — clean

## Responsive matrix

Automated via `scripts/qa.mjs` against the production server. Every route checked at
**1440 / 1024 / 768 / 390 / 320** px:

| Route | Overflow | Console errors |
|---|---|---|
| `/` | 0px | 0 |
| `/products` | 0px | 0 |
| `/services` | 0px | 0 |
| `/gallery` | 0px | 0 |
| `/store` | 0px | 0 |
| `/store/checkout` | 0px | 0 |
| `/events` | 0px | 0 |
| `/contact` | 0px | 0 |
| `/store/[slug]` (sampled) | 0px | 0 |
| 404 (with `QA_ALLOW_404=1`) | 0px | 0 (expected 404 status) |

One real issue was caught and fixed during QA: the contact info cards overflowed 6px at
1024px due to an unbreakable email address (`min-w-0` + `break-words`).

## End-to-end checks (production build)

| Flow | Result |
|---|---|
| Add to cart → drawer opens, badge = 1 | Pass |
| Cart persists after reload (localStorage) | Pass |
| Cart item subtotal (`₱18,900`) + Subtotal label | Pass |
| Remove item → empty state | Pass |
| Cart drawer at 320px (44px qty controls, no overflow) | Pass |
| Checkout: empty contact blocked inline | Pass |
| Checkout: invalid expiry (`13/28`) blocked | Pass |
| Checkout: expired card (`09/20`) blocked — "Card has expired." | Pass |
| Checkout: masked card (`•••• 1111`) on review | Pass |
| Checkout: order `PX-…` confirmation, cart cleared | Pass |
| Gallery: 11 images, Events filter = 1 | Pass |
| Lightbox: focus inside, ArrowRight 1→2, Escape closes | Pass |
| Events countdown ticks every second | Pass |
| Contact: empty submit blocked, valid submit → success state | Pass |
| Products: 16 cards, Networking filter = 3, search empty state | Pass |
| `prefers-reduced-motion`: 0 running animations, content visible | Pass |
| 404 status 404 + themed page | Pass |
| `sitemap.xml` 13 URLs incl. store items | Pass |
| `robots.txt` with sitemap reference | Pass |
| Unique page titles on all main routes | Pass |
| No dead placeholder links in footer | Pass |

## Final review fix pass

A fresh-context code review of the whole branch was run before shipping. Fixes applied and verified:

- **Expired card validation** (Critical) — `validatePayment` now rejects past expiry dates with
  "Card has expired."; unit test added (`payment rejects expired cards`), E2E verified.
- **Invalid Tailwind tokens** — `border-white/12` (not in the default scale) replaced with
  `border-white/10` across 7 components (borders now render the intended subtle steel).
- **Missing scrim** — services preview gradient used the removed `base` color; now `from-night`.
- **Reduced motion + hydration** — replaced `framer`'s reduced-motion hook with a
  mount-safe `usePrefersReducedMotion` (no SSR/client mismatch), added global
  `prefers-reduced-motion` CSS that disables transitions/animations and forces reveals
  visible, removed forced smooth scroll, and SSR now renders final stat values.
- **Cart drawer at 320px** — quantity controls fixed at 44×44, flex-wrap row, no overflow.
- **Tap targets** — chips, cart button, menu toggle, drawer quantity controls and social links
  raised to 44px minimum.
- **Dead links** — removed placeholder `href="#"` social links; contact phone card now gives
  each number its own `tel:` anchor.
- **Performance** — Framer Motion is now lazy-loaded with the cart drawer (first opened), so
  it no longer ships in any page's initial JS; Lighthouse mobile improved to 93/92.

## Lighthouse (headless Chrome, production build)

| Page | Preset | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` | Mobile (simulated) | **93** | **100** | **100** | **100** | 3.0s | 0 |
| `/store` | Mobile (simulated) | **92** | **100** | **100** | **100** | 2.9s | 0 |
| `/` | Desktop | **100** | **100** | **100** | **100** | 0.6s | 0.002 |
| `/store` | Desktop | **100** | **100** | **100** | **100** | 0.6s | 0.001 |

Notes:
- First-load JS: 103KB shared + page chunks; Framer Motion loads on first cart open only.
- Accessibility brought to 100 by lightening small red text on dark (`signal-light` token),
  fixing social-link accessible names, and adding listing headings.
- CLS brought to 0 by switching display/body fonts to `display: "optional"` (no late swap;
  fonts are preloaded and cached), SSR-final stat values, and the global reduced-motion CSS.
- Mobile LCP is 2.9–3.0s under Lighthouse's simulated Slow 4G. Real-world broadband LCP is
  ~0.6s (see desktop). Further mobile LCP work would need font/runtime streaming — noted as a
  phase-2 nicety, not a blocker.

## Known limitations (by design, phase 1)

- Checkout is a demo — no payment is taken; order confirmation is simulated.
- Contact form simulates delivery (no email backend yet).
- Store prices are illustrative; only 6 of the 16 catalog products are purchasable.
- FASAVA 2027 countdown target (June 2027) is a placeholder until the client confirms dates.
- Stats and testimonial roles were derived from the client's current copy and should be
  confirmed before the domain cutover.
- Client domain remains on the existing WordPress site; this build is for review.
