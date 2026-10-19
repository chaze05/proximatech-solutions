# Proximatech Solutions Rebuild â€” Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild proximatechsolutions.com as a cinematic, fully aligned, fast Next.js site with a working demo store, ready to review and deploy.

**Architecture:** Next.js 15 App Router, all routes statically prerendered from a typed local data layer. A client-side cart (React context + localStorage) powers the demo store; visual polish via Tailwind + Framer Motion; no backend.

**Tech Stack:** Next.js 15, React 19, TypeScript (strict), Tailwind CSS 3.4, Framer Motion 12, `next/font` (Archivo Black + Manrope), `next/image`, Node built-in test runner (`node --test` with type stripping), puppeteer-core QA script.

**Spec:** `docs/superpowers/specs/2026-10-19-proximatech-solutions-design.md`

## Global Constraints

- Node 22+, npm (on Windows use `npm.cmd`); no backend, no CMS, no payments.
- All routes static (`next build` shows `â—‹` for every page).
- Palette: base `#08090C`, panel `#10131A`, elevated `#161A23`, text `#F5F7FA`, secondary `#AEB7C6`, muted `#77808F`, signal red `#E11D2E`, hover red `#FF3B4E`, deep red `#A3121F`, success `#34D399`, warning `#FBBF24`.
- Type: Archivo Black display, Manrope body. Container 1280px, 12-col grid, 24px gutters (16px â‰¤768px), spacing scale 4/8/12/16/24/32/48/64/96/128.
- Page statements (exact, uppercase): home `SECURING YOUR FUTURE.`, products `HARDWARE THAT PERFORMS`, services `SOLUTIONS THAT SCALE`, gallery `INSIDE PROXIMATECH`, events `WHERE WE SHOW UP`, contact `LET'S BUILD SOMETHING GREAT`, 404 `SIGNAL LOST.`
- Demo labeling exact: `Demo checkout â€” no real payment will be taken.`
- Currency: PHP `â‚±1,499` style. Cart storage key `proximatech.cart.v1`.
- Every page: keyboard accessible, focus-visible rings, 44px min tap targets, reduced-motion fallbacks, 0 horizontal overflow at 1440/1024/768/390/320.
- Contact form + checkout: client-side validation; success is simulated. Do not invent events beyond FASAVA 2027.

## Review Focus

1. **Empty results** â€” product search/filters, gallery filters, and the cart must show designed empty states, never a blank or broken grid.
2. **Corrupted/edge cart data** â€” invalid JSON, unknown slugs, qty 0/negative in localStorage must not crash; totals stay correct.
3. **Checkout input edges** â€” whitespace-only names, invalid email/phone, malformed/expired card fields must block submission with inline errors.
4. **Long content on 320px** â€” long product names, â‚±25,000 prices, and the mobile nav must not cause horizontal overflow or clipping.
5. **Reduced motion & keyboard** â€” cart drawer and lightbox must trap focus and close on Escape; `prefers-reduced-motion` must disable transforms.

---

### Task 1: Project scaffold + QA harness

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `scripts/qa.mjs`, `tests/smoke.test.ts`
- Create: `public/images/.gitkeep`

**Interfaces:**
- Produces: npm scripts `dev`, `build`, `start`, `typecheck`, `test` (`node --experimental-strip-types --test "tests/**/*.test.ts"`), `qa` (`node scripts/qa.mjs`). `scripts/qa.mjs <route...>` exits non-zero on console errors or horizontal overflow and writes screenshots to `qa/` (gitignored).

- [ ] **Step 1: Create `package.json`** with deps `next ^15.5.4`, `react ^19.1.1`, `react-dom ^19.1.1`, `framer-motion ^12.23.12`; devDeps `typescript ^5.9`, `@types/node ^22`, `@types/react ^19`, `@types/react-dom ^19`, `tailwindcss ^3.4.17`, `postcss ^8.5`, `autoprefixer ^10.4.21`, `eslint ^9`, `eslint-config-next ^15.5.4`, `puppeteer-core ^24`. Scripts as in Interfaces.
- [ ] **Step 2: Create `tests/smoke.test.ts`** asserting `1 + 1 === 2` (verifies the runner works). Run `npm.cmd test`; expected PASS.
- [ ] **Step 3: Create config files.** `tsconfig.json` extends Next defaults with `strict: true`, `allowImportingTsExtensions: true`, path alias `@/* -> src/*`. `tailwind.config.ts` defines the palette, `fontFamily.display/body`, container `1280px`, screens `sm 640 md 768 lg 1024 xl 1280`.
- [ ] **Step 4: Create `src/app/layout.tsx`** with `next/font/google` Archivo Black (weight `400`, variable `--font-display`) + Manrope (weights `400 500 600 700 800`, variable `--font-body`), metadata `title: "Proximatech Solutions â€” Securing Your Future"`, and `src/app/globals.css` (tailwind directives + base background/text/selection/focus styles).
- [ ] **Step 5: Create placeholder `src/app/page.tsx`** (`<main className="p-24"><h1 className="font-display text-6xl">SECURING YOUR FUTURE.</h1></main>`).
- [ ] **Step 6: Create `scripts/qa.mjs`** â€” for each route argument: open `http://localhost:3000<route>`, wait `networkidle0`, at widths `[1440,1024,768,390,320]` assert `scrollWidth <= innerWidth`, collect `pageerror`/console errors, screenshot to `qa/<route>-<width>.jpg`; print summary; exit 1 on any failure. Chrome path `C:/Program Files/Google/Chrome/Application/chrome.exe`.
- [ ] **Step 7: Install + verify.** `npm.cmd install`; `npm.cmd run build` (expect success, `/` static); `npm.cmd run typecheck`; `npm.cmd test`. Commit.

```bash
git add -A && git commit -m "chore: scaffold Next.js app with design tokens and QA harness"
```

---

### Task 2: Content data layer + assets

**Files:**
- Create: `src/data/site.ts`, `src/data/navigation.ts`, `src/data/products.ts`, `src/data/store.ts`, `src/data/services.ts`, `src/data/values.ts`, `src/data/testimonials.ts`, `src/data/events.ts`, `src/data/gallery.ts`
- Create: `public/images/**` (downloaded + renamed assets)
- Create: `tests/data.test.ts`

**Interfaces:**
- Produces: types/exports consumed everywhere:
  - `SITE`: `{ name; shortName; tagline; description; phones: string[]; email; address; socials: { facebook; linkedin; youtube } }`
  - `NAV: { label: string; href: string }[]` = Home `/`, Products `/products`, Services `/services`, Gallery `/gallery`, Store `/store`, Events `/events`, Contact `/contact`
  - `PRODUCT_CATEGORIES: ["Barcode & RFID","Surveillance","Mobility","Terminals","Networking","Accessories"]`
  - `CatalogProduct = { slug; name; brand; category: ProductCategory; blurb; image; storeSlug?: string }`; `PRODUCTS: CatalogProduct[]` (16) â€” `storeSlug` set on the 6 items that exist in `STORE_PRODUCTS`.
  - `StoreProduct = { slug; name; brand; category; price; image; description; specs: string[]; stock: "in"|"low"|"out" }`; `STORE_PRODUCTS: StoreProduct[]` (6); `getStoreProduct(slug)`
  - `Service = { num; slug; title; tagline; description; bullets: string[]; image }`; `SERVICES` (8)
  - `VALUE_CARDS: { title; blurb; icon: "spark"|"scale"|"user"|"bolt"|"puzzle"|"chip" }[]` (6)
  - `TESTIMONIALS: { name; role; quote }[]` (3)
  - `EVENTS: { slug; name; dates; venue; description; image; countdownTo }[]` (1: FASAVA 2027, `countdownTo: "2027-06-01T09:00:00+08:00"`)
  - `GALLERY: { src; alt; category: "Team"|"Vision"|"Events" }[]`
- Consumes: nothing.

- [ ] **Step 1: Download assets** with `Invoke-WebRequest` from `https://proximatechsolutions.com/wp-content/uploads/...` into `public/images/`: logo (`2025/12/snapedit_1765246313064.png` â†’ `logo.png`); products `2025/12/1.avif`â€¦`9.avif`, `11.avif`, `13.avif`â€“`18.avif` (16 files); services (8: `RFID-Solutions.avif`, `Barcode-Solutions.avif`, `Customized-Apps.avif`, `Event-Registration-System.avif`, `Warehouse-Management-System.avif`, `Fixed-Asset-Management-System.avif`, `Structured-Cabling.avif`, `2026/05/website_development_590x646.png`); gallery (3 feature images + 6 `2026/05/blurred_faces_image_*.jpg`); event (`2026/03/Screenshot-2026-03-14-211009.webp`). Rename to kebab-case (`rfid-solutions.avif`, â€¦).
- [ ] **Step 2: Write `tests/data.test.ts`** (node:test): `PRODUCTS.length === 16`, `STORE_PRODUCTS.length === 6`, all slugs unique across both arrays, every `storeSlug` exists in `STORE_PRODUCTS`, all prices are integers 1500â€“25000, `SERVICES.length === 8`, `VALUE_CARDS.length === 6`, `TESTIMONIALS.length === 3`, `EVENTS.length === 1`, every gallery `src` starts with `/images/`. Run `npm.cmd test`; expect FAIL (modules missing).
- [ ] **Step 3: Implement the data files** with the interfaces above. Use the site's real content: product blurbs verbatim from the current catalog; service taglines (`Total Control Over Every Asset, Every Time.` etc.); values with the six copy paragraphs; testimonials (Mark James Dela Cruz, Jane Arevalo, Benjamin Santos) with short roles (`Operations Lead`, `Finance Manager`, `IT Head` â€” mark as demo roles); contact info from `SITE`.
- [ ] **Step 4: Run tests**; expect PASS. Fix any mismatches. Commit.

```bash
git add -A && git commit -m "feat: add typed content data layer and optimized image assets"
```

---

### Task 3: Pure utilities (cart math, formatting, validation, catalog filter)

**Files:**
- Create: `src/lib/cart.ts`, `src/lib/format.ts`, `src/lib/validation.ts`, `src/lib/catalog.ts`
- Create: `tests/cart.test.ts`, `tests/format.test.ts`, `tests/validation.test.ts`, `tests/catalog.test.ts`

**Interfaces:**
- Produces (exact signatures; consumed by Tasks 9â€“13):
  - `type CartLine = { slug: string; qty: number }`
  - `parseStoredCart(raw: string | null, validSlugs: string[]): CartLine[]` â€” tolerant: invalid JSON â†’ `[]`; drops unknown slugs/`qty <= 0`; merges duplicates; `qty` clamped to integer â‰¥ 1.
  - `addToCart(lines, slug, qty = 1): CartLine[]`, `setQty(lines, slug, qty): CartLine[]` (â‰¤0 removes), `removeFromCart(lines, slug): CartLine[]`, `cartCount(lines): number`, `cartSubtotal(lines, products: StoreProduct[]): number`
  - `formatPeso(value: number): string` â†’ `â‚±1,499` (no decimals), `formatCountdown(ms: number): string` â†’ `245d 12h 06m 22s`, zero-leading units trimmed (`22h 05m 01s`), clamps at 0 â†’ `Started`
  - `validateContact(input: ContactInput): Partial<Record<keyof ContactInput, string>>` and same shape for `validateShipping(ShippingInput)` / `validatePayment(PaymentInput)` â€” empty object when valid. Rules: names â‰¥ 2 chars after trim; email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; PH phone accepts `+63`/`0` prefix, 10â€“13 digits ignoring spaces/dashes; subject/message â‰¥ 4/10 chars; postal code 4 digits; card number 13â€“19 digits; expiry `MM/YY` with month 01â€“12; CVC 3â€“4 digits.
  - `filterProducts(items: CatalogProduct[], query: string, category: string | null): CatalogProduct[]` â€” case-insensitive match across name/brand/blurb; `category = null` means all.
- Consumes: `StoreProduct`, `CatalogProduct` from Task 2.

- [ ] **Step 1: Write failing tests** covering: `parseStoredCart` with `null`, `"not json"`, `[{slug:"ghost",qty:1}]`, `[{slug:"<valid>",qty:0}]`, duplicate lines; `setQty(...,"slug",0)` removes; `cartSubtotal` math with qty 2/3; `formatPeso(1499)` â†’ `"â‚±1,499"`, `formatPeso(25000)` â†’ `"â‚±25,000"`; `formatCountdown(90061000)` (24h+) and same-day trim; `validateContact` with empty, whitespace-only name, bad email `a@b`, valid input; `validatePayment` bad expiry `13/28`, good `09/29`; `filterProducts` no-match â†’ `[]`, category filter, query matching brand. Run `npm.cmd test`; expect FAIL.
- [ ] **Step 2: Implement the four modules** exactly to the interfaces (no React imports).
- [ ] **Step 3: Run tests**; expect PASS. Commit.

```bash
git add src/lib tests && git commit -m "feat: add cart, formatting, validation and catalog utilities with tests"
```

---

### Task 4: Design-system primitives + layout shell

**Files:**
- Create: `src/components/ui/Button.tsx`, `Chip.tsx`, `SectionHeader.tsx`, `Stat.tsx`, `Marquee.tsx`, `Field.tsx` (label+input+error), `Reveal.tsx` (IntersectionObserver reveal), `Breadcrumbs.tsx`
- Create: `src/components/layout/Header.tsx`, `Footer.tsx`, `MobileNav.tsx`
- Modify: `src/app/layout.tsx` (render Header/Footer + skip link), `src/app/page.tsx`
- Test: `scripts/qa.mjs /`

**Interfaces:**
- Produces:
  - `Button({ href?, onClick?, variant: "solid"|"ghost", children, className? })` â€” 44px min height, red solid, steel ghost.
  - `Chip({ active, children, onClick })`; `SectionHeader({ index, eyebrow, title, lede?, align? })` â€” renders `index` as `01 â€”` mono label.
  - `Stat({ value, label, suffix?, animate? })` â€” count-up on first view; static under reduced motion.
  - `Marquee({ children, speed? })` â€” duplicated track, hover-pause, CSS animation.
  - `Field({ label, name, type, value, onChange, error?, placeholder?, required?, as?: "input"|"textarea" })` â€” sets `aria-invalid` + error text.
  - `Reveal({ children, delay?, className? })` â€” opacity/translate reveal, no-op under reduced motion.
  - `PageHero({ eyebrow?, title, lede?, crumb? })` â€” shared page-hero pattern (breadcrumb, eyebrow, giant uppercase statement with one red segment, lede); used by Tasks 6â€“13.
  - `Header()` â€” sticky glass with shadow + compact padding on scroll; nav from `NAV`; "Get a quote" â†’ `/contact`; a plain cart icon link to `/store` (upgraded to `CartButton` in Task 10); mobile menu (aria-expanded, Escape close).
  - `Footer()` â€” logo/blurb, 4 columns, contact, socials, copyright.
- Consumes: `NAV`, `SITE` (Task 2); tailwind tokens (Task 1).

- [ ] **Step 1: Implement primitives + Header/Footer** per interfaces. Use `next/image` for the logo (`/images/logo.png`, width 160Ã—40).
- [ ] **Step 2: Verify.** `npm.cmd run build` passes; run `npm.cmd run dev` and `node scripts/qa.mjs /` â†’ 0 overflow, 0 console errors at all widths; review the 5 screenshots in `qa/` (header aligned, mobile menu usable). Commit.

```bash
git add -A && git commit -m "feat: add design-system primitives, header, footer and mobile nav"
```

---

### Task 5: Home page

**Files:**
- Create: `src/components/home/Hero.tsx`, `StatsBand.tsx`, `PartnerMarquee.tsx`, `StorySection.tsx`, `ServicesPreview.tsx`, `ProductsPreview.tsx`, `CommitmentGrid.tsx`, `TestimonialsBand.tsx`, `CtaBand.tsx`
- Modify: `src/app/page.tsx`
- Test: `scripts/qa.mjs /`

**Interfaces:**
- Consumes: `Button`, `SectionHeader`, `Stat`, `Marquee`, `Reveal`, `SITE`, `SERVICES`, `PRODUCTS`, `VALUE_CARDS`, `TESTIMONIALS`.
- Produces: section components rendered by `page.tsx` in spec order: Hero â†’ StatsBand â†’ PartnerMarquee â†’ StorySection â†’ ServicesPreview (4 links to `/services`) â†’ ProductsPreview (4 links to `/products`) â†’ CommitmentGrid (6) â†’ TestimonialsBand â†’ CtaBand.

- [ ] **Step 1: Hero** â€” `100svh`, circuit-grid CSS background + red orbs (respect reduced motion), eyebrow `PROXIMATECH SOLUTIONS`, H1 `SECURING YOUR FUTURE.` (period; `FUTURE` in red), lede from `SITE.description`, CTAs `Explore products` â†’ `/products` and `Book a consultation` â†’ `/contact`, scroll cue.
- [ ] **Step 2: Stats** â€” values `100+`, `50+`, `24/7`, `2.0Ã—` with labels `Projects delivered`, `Clients served`, `Support available`, `Productivity lift`; count-up (non-numeric `24/7` renders static).
- [ ] **Step 3: Remaining sections** â€” partner marquee (text items `Acer`, `Zebra`, `Epson`, `Honeywell`, `Ubiquiti`, `HID`); story split with gallery office image + red frame accent; services/products previews use `SectionHeader` and strict 12-col grids; commitment 3Ã—2 from `VALUE_CARDS`; testimonials marquee with initial avatars (no photos); CTA band with phone/email.
- [ ] **Step 4: Verify** â€” build passes; `node scripts/qa.mjs /`; review all 5 screenshots for alignment and spacing. Commit.

```bash
git add -A && git commit -m "feat: build cinematic home page"
```

---

### Task 6: Products page

**Files:**
- Create: `src/app/products/page.tsx`, `src/components/products/ProductExplorer.tsx`, `ProductCard.tsx`
- Test: `scripts/qa.mjs /products`

**Interfaces:**
- Consumes: `PRODUCTS`, `PRODUCT_CATEGORIES`, `filterProducts`, `Chip`, `SectionHeader`, `PageHero`, `Reveal`.
- Produces: `ProductExplorer` client component with search input + category chips (single select, `null = All`), rendering a strict 3-col grid (2 @768, 1 @â‰¤640). Cards link to `/store/<storeSlug>` when `storeSlug` is set, otherwise to `/contact`.

- [ ] **Step 1: Page hero** â€” `PageHero` with `HARDWARE THAT PERFORMS` + lede + breadcrumb.
- [ ] **Step 2: Explorer** â€” search + chips + grid + empty state (`No products match your search.` with reset button).
- [ ] **Step 3: Verify** â€” `npm.cmd test` (catalog tests still pass), build, `node scripts/qa.mjs /products`, review screenshots at 320/768; puppeteer one-liner: type a nonsense query â†’ assert the empty-state text is visible; clear â†’ 16 cards. Commit.

```bash
git add -A && git commit -m "feat: add filterable products catalog"
```

---

### Task 7: Services page

**Files:**
- Create: `src/app/services/page.tsx`, `src/components/services/ServiceRow.tsx`, `ProcessBand.tsx`
- Test: `scripts/qa.mjs /services`

**Interfaces:**
- Consumes: `SERVICES`, `PageHero`, `SectionHeader`, `Reveal`, `Button`.
- Produces: 8 alternating full-bleed rows (`even` rows image right, `odd` image left; single column â‰¤1024 with image first) showing `num â€”`, `title`, `tagline`, `description`, bullets, CTA to `/contact`. `ProcessBand` steps: `Consult`, `Design`, `Build`, `Deploy`, `Support`.

- [ ] **Step 1: Implement page + rows + process band** with exact service content.
- [ ] **Step 2: Verify** â€” build, `node scripts/qa.mjs /services`, review screenshots (alternation, alignment). Commit.

```bash
git add -A && git commit -m "feat: add editorial services page with process band"
```

---

### Task 8: Gallery page

**Files:**
- Create: `src/app/gallery/page.tsx`, `src/components/gallery/GalleryGrid.tsx`, `Lightbox.tsx`
- Test: `scripts/qa.mjs /gallery`

**Interfaces:**
- Consumes: `GALLERY`, `PageHero`, `Chip`, `SectionHeader`.
- Produces: `GalleryGrid` client component: category tabs (`All`, `Team`, `Vision`, `Events`), justified grid (`next/image` with `sizes`), per-category empty state; `Lightbox({ images, index, onClose, onNav })` â€” fixed overlay, focus trap (first focusable on open, restore on close), Escape/arrows, caption, body scroll lock.

- [ ] **Step 1: Implement grid + lightbox** (alt text from data; keyboard accessible).
- [ ] **Step 2: Verify** â€” build, `node scripts/qa.mjs /gallery`, review screenshots; puppeteer: click `Events` category â†’ assert grid updates, open lightbox â†’ Tab stays inside overlay, Escape closes. Commit.

```bash
git add -A && git commit -m "feat: add filterable gallery with accessible lightbox"
```

---

### Task 9: Store catalog + product detail pages

**Files:**
- Create: `src/app/store/page.tsx`, `src/app/store/[slug]/page.tsx`, `src/components/store/StoreCard.tsx`
- Test: `scripts/qa.mjs /store /store/<first-slug>`

**Interfaces:**
- Consumes: `STORE_PRODUCTS`, `getStoreProduct`, `formatPeso`, `PageHero`, `SectionHeader`, `Chip`.
- Produces: `/store` grid with category chips + `StoreCard` (image, name, brand, `formatPeso(price)`, stock badge); `/store/[slug]` statically generated via `generateStaticParams()` from `STORE_PRODUCTS`, with specs list and related products (same category, max 3). `AddToCart` on the detail page lands in Task 10.

- [ ] **Step 1: Implement store catalog** (hero `PROXIMATECH STORE`, chips, grid, empty state).
- [ ] **Step 2: Implement product detail pages** (`generateStaticParams`, `generateMetadata`, specs `<dl>`, related products).
- [ ] **Step 3: Verify** â€” build shows all 7 store routes static; `node scripts/qa.mjs /store /store/<first-slug>`; review screenshots. Commit.

```bash
git add -A && git commit -m "feat: add static store catalog and product pages"
```

---

### Task 10: Cart provider + drawer + add-to-cart

**Files:**
- Create: `src/components/store/CartProvider.tsx`, `CartDrawer.tsx`, `CartButton.tsx`, `src/components/store/AddToCart.tsx`
- Modify: `src/components/layout/Header.tsx` (replace placeholder cart with `CartButton`), `src/app/store/[slug]/page.tsx` (mount `AddToCart`)
- Test: `tests/cart.test.ts` (already covers pure logic) + `scripts/qa.mjs /store/<first-slug>`

**Interfaces:**
- Produces: `CartProvider` client context; `useCart()` â†’ `{ lines, count, subtotal, isOpen, add(slug, qty?), remove(slug), setQty(slug, qty), clear(), open(), close() }`; hydrates from `localStorage[proximatech.cart.v1]` via `parseStoredCart(raw, STORE_PRODUCTS.map(p => p.slug))`, persists on every change; `CartButton` shows count badge; `CartDrawer` right slide-over (spring), focus trap, Escape/overlay close, empty state `Your cart is empty.` + `Browse products` link, line items with qty Â±/remove, subtotal, `/store/checkout` CTA.

- [ ] **Step 1: Implement provider + drawer + button** per interfaces.
- [ ] **Step 2: Wire `AddToCart`** on product pages (qty selector, `Add to cart`, opens drawer).
- [ ] **Step 3: Verify** â€” build; `node scripts/qa.mjs /store/<first-slug>` 0 errors; puppeteer end-to-end: add item â†’ badge updates â†’ reload â†’ badge persists; open drawer with no items â†’ assert `Your cart is empty.` and the `Browse products` link. Commit.

```bash
git add -A && git commit -m "feat: add persistent cart drawer and add-to-cart flow"
```

---

### Task 11: Demo checkout flow

**Files:**
- Create: `src/app/store/checkout/page.tsx`, `src/components/store/CheckoutFlow.tsx`, `Steps.tsx`, `DemoNotice.tsx`
- Test: `scripts/qa.mjs /store/checkout`

**Interfaces:**
- Consumes: `useCart`, `validateContact`, `validateShipping`, `validatePayment`, `formatPeso`, `Field`, `Button`.
- Produces: 4-step client wizard `Contact â†’ Shipping â†’ Payment â†’ Review` ending in a confirmation panel with order number `PX-<base36 timestamp upper>`, itemized summary, and `Demo checkout â€” no real payment will be taken.` banner on every step + confirmation. Empty-cart state â†’ `Your cart is empty` + link to `/store`. Step navigation blocked while current step has validation errors; back button available.

- [ ] **Step 1: Implement wizard** (state machine in component; localStorage cart is cleared only after confirmation).
- [ ] **Step 2: Implement confirmation** (order number, totals, demo notice, `Continue shopping` â†’ `/store`).
- [ ] **Step 3: Verify** â€” build; `node scripts/qa.mjs /store/checkout`; puppeteer end-to-end: add item â†’ checkout â†’ fill steps â†’ confirm â†’ reload store shows reset badge. Commit.

```bash
git add -A && git commit -m "feat: add demo checkout wizard with confirmation"
```

---

### Task 12: Events page

**Files:**
- Create: `src/app/events/page.tsx`, `src/components/events/EventHero.tsx`, `Countdown.tsx`
- Test: `tests/format.test.ts` (countdown) + `scripts/qa.mjs /events`

**Interfaces:**
- Consumes: `EVENTS`, `formatCountdown`, `PageHero`, `SectionHeader`, `Button`, `Reveal`, `next/image`.
- Produces: `Countdown({ to })` client component ticking every second, rendering `formatCountdown`, `Ended` when â‰¤ 0; page hero `WHERE WE SHOW UP`, featured FASAVA card (image, dates/venue, description, countdown, `Register interest` â†’ `/contact`), tie-in card for the Event Registration System service.

- [ ] **Step 1: Implement page + countdown** (interval cleanup on unmount; static first paint uses empty string until mounted to avoid hydration mismatch).
- [ ] **Step 2: Verify** â€” build; `node scripts/qa.mjs /events`; countdown text changes between two reads 1.2s apart. Commit.

```bash
git add -A && git commit -m "feat: add events page with live countdown"
```

---

### Task 13: Contact page

**Files:**
- Create: `src/app/contact/page.tsx`, `src/components/contact/ContactForm.tsx`, `InfoCards.tsx`, `MapCard.tsx`
- Test: `tests/validation.test.ts` (already) + `scripts/qa.mjs /contact`

**Interfaces:**
- Consumes: `validateContact`, `Field`, `Button`, `PageHero`, `SITE`, `Reveal`.
- Produces: hero `LET'S BUILD SOMETHING GREAT`, split layout (form | info): form fields firstName/lastName/email/phone/subject/message with inline errors, disabled-while-submitting state, simulated 900ms success panel `Thanks â€” we'll be in touch.` + reset option. Info cards with `SITE.phones`, `SITE.email`, `SITE.address`, plus `24/7 support` card; map card styled (dark grid + pin + address, no external iframe).

- [ ] **Step 1: Implement form + info + map card.**
- [ ] **Step 2: Verify** â€” build; `node scripts/qa.mjs /contact`; puppeteer: submit empty â†’ inline errors appear; fill valid â†’ success panel. Commit.

```bash
git add -A && git commit -m "feat: add validated contact page with simulated submit"
```

---

### Task 14: 404 + SEO + accessibility polish

**Files:**
- Create: `src/app/not-found.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/icon.png` (favicon from logo)
- Modify: `src/app/layout.tsx` (default OG metadata, `metadataBase`), page files (per-route `metadata` exports where missing)
- Test: `scripts/qa.mjs / /products /services /gallery /store /events /contact`

**Interfaces:**
- Produces: 404 page with `SIGNAL LOST.` statement + links; sitemap listing all static routes incl. store products; robots allowing all; favicon; every route has unique `title` + `description`.

- [ ] **Step 1: Implement 404/SEO files** (store product metadata already from Task 9).
- [ ] **Step 2: Verify** â€” build; run QA on all routes; check `curl`-style fetches of `/sitemap.xml`, `/robots.txt` return 200 in dev. Commit.

```bash
git add -A && git commit -m "feat: add 404, sitemap, robots and per-page metadata"
```

---

### Task 15: Full QA, deploy and portfolio card

**Files:**
- Create: `README.md` (project overview, scripts, demo-store notice, deployment notes)
- Test: no new files; run full matrix.

**Interfaces:**
- Consumes: all previous tasks.

- [ ] **Step 1: Full QA.** `npm.cmd run build` (all routes static; assert each route's first-load JS â‰¤ 150KB gz from build output), `npm.cmd test`, `npm.cmd run typecheck`; start prod server and run `node scripts/qa.mjs` with all 12 routes; verify store E2E (add â†’ checkout â†’ confirm), contact E2E, gallery lightbox keyboard, mobile nav, reduced-motion emulation (`page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}])` â†’ no transform animations), 0 console errors; collect Lighthouse (`npx.cmd --yes lighthouse <url> --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json`) for `/` and `/store` â€” record scores in README.
- [ ] **Step 2: Commit + push** repo `chaze05/proximatech-solutions` (`main`); create repo via GitHub API (public); push.
- [ ] **Step 3: Deploy to Vercel** (`npx.cmd vercel link --project proximatech-solutions`, `vercel deploy --prod --yes`); verify live URL: all routes 200, store E2E passes on production, screenshots.
- [ ] **Step 4: Portfolio card** â€” add `Proximatech Solutions` to `ranimrubillos` `repositories` (non-featured, live Vercel link, screenshot `/projects/proximatech.jpg` captured from the live hero), rebuild + push portfolio, verify deploy success.
- [ ] **Step 5: Report** â€” live URL, repo URL, QA/Lighthouse summary, demo caveats (payments/forms/domain phase 2).

```bash
git add -A && git commit -m "docs: add README with QA and deployment notes"
```

---

## Self-Review Notes

- Spec coverage: all routes (Tasks 5â€“14), store demo (9â€“11), live data/content (2), design system/motion (1, 4), QA/performance (15), deployment/portfolio (15).
- Deliberate simplification: Tasks 9 and 10 share one verification window (add-to-cart depends on cart provider); `AddToCart` lands in Task 10.
- Copy for invented-but-required UI strings (empty states, success message, button labels) is fixed in the task that renders it.
- Event dates: countdown target `2027-06-01T09:00:00+08:00` is a placeholder â€” confirm with client; UI renders correctly regardless.

