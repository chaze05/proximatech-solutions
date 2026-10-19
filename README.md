# Proximatech Solutions — Website Rebuild

A Next.js rebuild of [proximatechsolutions.com](https://proximatechsolutions.com) in a
cinematic, Elev8-inspired visual language — fully responsive, animated and aligned on every
section, with a working **demo store** (catalog → cart → checkout → confirmation).

## Stack

- **Next.js 15** (App Router) · React 19 · TypeScript (strict)
- **Tailwind CSS 3.4** with a token-based design system
- **Framer Motion** for the cart drawer (lazy, tree-shaken)
- **next/font** — Archivo Black (display) + Manrope (body), self-hosted
- Zero backend: all routes statically prerendered; cart persists in `localStorage`

## Pages

| Route | Description |
|---|---|
| `/` | Cinematic hero, count-up stats, partner marquee, story, services, products, values, testimonials, CTA |
| `/products` | 16-product catalog with category filters + live search |
| `/services` | 8 editorial alternating rows + "one-stop shop" process band |
| `/gallery` | Filterable masonry grid with keyboard-accessible lightbox |
| `/store` | Demo store catalog (6 priced items) |
| `/store/[slug]` | Static product pages with specs + related products |
| `/store/checkout` | 4-step demo checkout with order confirmation |
| `/events` | FASAVA 2027 feature with live countdown |
| `/contact` | Validated contact form (simulated) + info cards + map card |
| `404` | Themed "Signal lost" page |

## Demo scope (phase 1)

This build is a **client-facing prototype**:

- **Store** — cart, checkout and confirmation are fully functional but simulated; no payment
  is taken and prices are illustrative (PHP).
- **Contact form** — validates properly and shows a success state; delivery is simulated.
  Phase 2 wires an email service/CRM.
- **Content** — all copy and imagery sourced from the current WordPress site (assets copied
  into `public/images/`). Stats and testimonial roles should be confirmed with the client.
- **Domain** — the client's current site remains live; this deployment is for review.

## Scripts

```bash
npm run dev        # local dev server
npm run build      # production build (all routes static)
npm run start      # production server
npm run typecheck  # tsc --noEmit
npm test           # node:test unit suite (utilities + data integrity)
node scripts/qa.mjs <routes...>   # responsive/console QA at 5 widths (needs server on :3000)
```

Helper scripts in `scripts/` cover the store, cart, checkout, gallery lightbox, events
countdown, contact form and SEO smoke tests (run them against a running server).

## QA

- Unit tests: cart math, storage parsing, formatting, validation, catalog filtering, data
  integrity, asset existence.
- Responsive QA: every route verified at **1440 / 1024 / 768 / 390 / 320** — 0 horizontal
  overflow, 0 console errors (404 probe run with `QA_ALLOW_404=1`).
- E2E: add-to-cart → persists across reload → cart edit/remove; checkout validation →
  confirmation (order `PX-…`, cart cleared); gallery lightbox focus trap + arrows + Escape;
  contact validation → simulated success; countdown ticking.
- Lighthouse (production, headless Chrome): see `docs/qa-report.md`.

## Notes

- No invented events: the Events page features the client's real FASAVA 2027 congress.
- Testimonial photos were placeholders on the current site; this rebuild uses brand initial
  avatars instead of fake faces.
