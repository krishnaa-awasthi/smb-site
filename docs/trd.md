# TRD: Shiv Mishthan Bhandar Website

> Technical source of truth. Read `prd.md` first. Where this file is silent, choose the simplest maintainable option and do not add dependencies beyond section 1.

## 1. Stack (fixed)

| Concern          | Choice                                                                                | Notes                                                |
| ---------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Framework        | **Next.js** (latest stable, App Router) + **React** + **TypeScript** (`strict: true`) | Static-first. Server code only for `/api/contact`    |
| Styling          | **Tailwind CSS** with design tokens as CSS variables (see `design.md` §14)            | No component library (no shadcn, MUI, etc.)          |
| Scroll animation | **GSAP** + **ScrollTrigger** + `@gsap/react` (`useGSAP`)                              | GSAP is free including plugins                       |
| Smooth scroll    | **Lenis** (`lenis` package)                                                           | Desktop wheel only; native touch scrolling on phones |
| UI micro-motion  | CSS transitions. Do **not** add Framer Motion                                         | One animation system avoids conflicts                |
| State            | **Zustand** with `persist`                                                            | Cart and remembered checkout details                 |
| Forms            | `react-hook-form` + `zod`                                                             | Shared schemas for client and server                 |
| Email            | `nodemailer` with SMTP env vars                                                       | Works with Gmail app password; no vendor lock-in     |
| Icons            | `lucide-react` plus custom inline SVG for WhatsApp glyph and logo ornaments           |                                                      |
| Fonts            | `next/font/google`: **Marcellus**, **Hind** (latin + devanagari), **Pinyon Script**   | See `design.md` §4                                   |
| Images           | `next/image`, AVIF/WebP, explicit `sizes`, fixed aspect ratios                        |                                                      |
| Hosting          | Vercel (free tier)                                                                    |                                                      |
| Lint and format  | ESLint (next config) + Prettier                                                       |                                                      |
| Package manager  | pnpm (npm acceptable)                                                                 |                                                      |

No database in V1. Catalogue is typed static data.

## 2. Project structure

```
/
├─ app/
│  ├─ layout.tsx                 # fonts, providers, header, footer, floating actions, cart drawer
│  ├─ page.tsx                   # Home
│  ├─ [category]/page.tsx        # listing (validate slug against CATEGORIES; else notFound())
│  ├─ [category]/[slug]/page.tsx # product detail
│  ├─ cart/page.tsx
│  ├─ about/page.tsx
│  ├─ contact/page.tsx
│  ├─ api/contact/route.ts
│  ├─ not-found.tsx
│  ├─ sitemap.ts
│  ├─ robots.ts
│  └─ globals.css                # tokens, base, utilities
├─ components/
│  ├─ layout/    Header, MobileMenu, Footer, FloatingActions, MiniCartBar, SearchOverlay
│  ├─ catalogue/ ProductCard, ProductGrid, FilterPanel, FilterSheet, SortSelect, VariantSelect, VegMark, PriceBlock, Gallery
│  ├─ cart/      CartDrawer, CartLine, QuantityStepper, CheckoutPanel, CartSummary
│  ├─ home/      Hero, CategorySwap, FeaturedTrack, Offers, LegacyReveal, HowToOrder
│  ├─ about/     Intro, JourneyTimeline, Promises, FounderNote
│  ├─ contact/   ContactForm, ShopDetails
│  ├─ brand/     Cartouche, Sunburst, Ornament, ImageArch, ImagePlaceholder, Logo
│  ├─ motion/    SmoothScroll, Reveal (image mask reveal), useReducedMotion
│  └─ ui/        Button, Input, Textarea, Select, Sheet, Toast
├─ data/
│  ├─ categories.ts
│  └─ products/ sweets.ts restaurant.ts bakery.ts namkeen.ts index.ts
├─ content/    journey.ts offers.ts promises.ts copy.ts      # all editable text lives here
├─ config/     site.ts                                        # phone, address, hours, tokens from PRD §7
├─ lib/        cart-store.ts money.ts whatsapp.ts filters.ts search.ts analytics.ts order-id.ts
├─ types/      index.ts
└─ public/
   ├─ brand/logo.png
   └─ images/ {products,shop,journey}/
```

## 3. Config and environment

`config/site.ts` exports one typed `siteConfig` object (name, tagline, established year, phone numbers, address, hours, social, delivery note, FSSAI). Values come from env where noted.

`.env.example`

```
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
NEXT_PUBLIC_CALL_NUMBER=+91XXXXXXXXXX
NEXT_PUBLIC_GA_ID=
CONTACT_TO_EMAIL=owner@example.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
```

## 4. Data models (`types/index.ts`)

```ts
export type CategorySlug = "sweets" | "restaurant" | "bakery" | "namkeen";
export type Diet = "veg" | "egg"; // no non-veg in this business
export type Badge = "bestseller" | "new" | "festive" | "seasonal";

export interface Variant {
  id: string; // unique within product, e.g. "500g"
  label: string; // "500 g", "Half", "1 kg"
  price: number; // whole rupees
  mrp?: number; // whole rupees, only if a real strike-through price exists
}

export interface Product {
  id: string;
  slug: string; // unique per category
  name: string;
  category: CategorySlug;
  subcategory: string; // must exist in categories.ts for that category
  shortDescription: string; // one line, max ~60 chars
  description: string;
  images: { src: string; alt: string }[]; // 1 to 5
  variants: Variant[]; // at least 1; first is default
  diet: Diet;
  badges?: Badge[];
  featured?: boolean; // home featured track
  bestseller?: boolean;
  available: boolean;
  allowNote?: boolean; // e.g. message on cake
  ingredients?: string[];
  shelfLife?: string;
  popularity: number; // higher = earlier in default sort
  createdAt: string; // ISO date, for "Newest"
  tags?: string[]; // search only
}

export interface CartLine {
  key: string; // `${productId}:${variantId}`
  productId: string;
  variantId: string;
  qty: number; // 1..20
  note?: string; // only if product.allowNote
}
```

Cart lines store **ids only**, not prices. Prices are always resolved from product data at render time so stale carts never show wrong prices. If a product or variant no longer exists, drop that line on hydrate.

## 5. Cart state (`lib/cart-store.ts`)

Zustand store with `persist` (`name: 'smb-cart-v1'`, `version: 1`).

```ts
interface CartState {
  lines: CartLine[];
  orderNote: string;
  customer: {
    name: string;
    orderType: "delivery" | "pickup";
    address: string;
    when: string;
  };
  drawerOpen: boolean;
  add(productId: string, variantId: string, qty?: number, note?: string): void;
  setQty(key: string, qty: number): void; // qty < 1 removes
  setNote(key: string, note: string): void;
  remove(key: string): void;
  clear(): void;
  setOrderNote(v: string): void;
  setCustomer(patch: Partial<CartState["customer"]>): void;
  openDrawer(): void;
  closeDrawer(): void;
}
```

**Hydration:** use `skipHydration: true` and call `useCartStore.persist.rehydrate()` once in a client provider's `useEffect`; expose `useCartHydrated()` so any count or total renders a neutral skeleton until hydrated. No hydration-mismatch warnings allowed.

Selectors (`lib/cart-selectors.ts`): `useResolvedLines()` returns lines joined with product and variant; `useSubtotal()`; `useItemCount()`.

## 6. Money (`lib/money.ts`)

```ts
export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
export const percentOff = (price: number, mrp?: number) =>
  mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
```

Integers only. No floats, no tax logic, no delivery calculation.

## 7. WhatsApp order builder (`lib/whatsapp.ts`)

```ts
export function buildOrderMessage(input: {
  orderId: string;
  lines: {
    name: string;
    variantLabel: string;
    qty: number;
    lineTotal: number;
    note?: string;
  }[];
  subtotal: number;
  customer: {
    name: string;
    orderType: "delivery" | "pickup";
    address?: string;
    when?: string;
  };
  orderNote?: string;
}): string;

export function buildWhatsAppUrl(
  message: string,
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!,
): {
  url: string;
  tooLong: boolean; // encoded URL length > 1800
};
```

Message layout (WhatsApp bold uses `*text*`; line breaks are `\n`):

```
*New order: Shiv Mishthan Bhandar*
Order ID: SMB-300926-4F2K

*Items*
1. Kaju Katli (500 g) x 2 = ₹1,300
2. Chocolate Truffle Cake (1 kg) x 1 = ₹850
   Message on cake: Happy Birthday Riya

*Subtotal: ₹2,150*
Delivery charges, if any, to be confirmed.

*Customer*
Name: Aman
Order type: Home delivery
Address: ...
Preferred time: Today, 6 PM
Notes: ...
```

Rules

- Omit empty optional lines entirely.
- Order ID = `SMB-${DDMMYY}-${4 random chars from A-Z2-9}` from `lib/order-id.ts`.
- Item lines are numbered because they are a real sequence.
- `encodeURIComponent` the whole message once. Never double-encode.
- If `tooLong`: copy raw message to clipboard (`navigator.clipboard.writeText`), open `https://wa.me/{phone}` and show a toast: "Your order is long. We copied it, paste it in the chat and send."
- Open with `window.open(url, '_blank', 'noopener')`; if blocked, fall back to `location.href = url`.
- Fire analytics `begin_checkout` before opening.
- Plain chat link (floating button, no cart): `https://wa.me/{phone}?text=${encodeURIComponent('Hello, I would like to place an order.')}`.

Unit-test `buildOrderMessage` (vitest) for: 1 line, many lines, note on line, pickup without address, special characters and Hindi in names.

## 8. Routing and rendering

- All pages are statically generated. Product pages use `generateStaticParams` from `data/products`.
- Invalid `[category]` or `[slug]` calls `notFound()`.
- `listing` page is a server component that passes the category's products to a client `ProductGrid` which does filtering, sorting and "Load more" client-side. Filter state is read and written with `useSearchParams` + `router.replace(..., { scroll: false })`.
- `cart` page is a client page (store-driven).
- Metadata: `generateMetadata` per page. Titles: `{Page} | Shiv Mishthan Bhandar`.

## 9. Listing logic (`lib/filters.ts`)

Pure functions, unit-tested.

```ts
interface ListingQuery { sub?: string; diet?: 'veg' | 'egg'; price?: 'u200'|'200-500'|'500-1000'|'1000p'; stock?: '1'; sort?: 'popular'|'plh'|'phl'|'new'; page?: number; q?: string }
applyQuery(products: Product[], q: ListingQuery): { items: Product[]; total: number }
```

- Price band uses the product's **lowest variant price**.
- "Eggless" means `diet === 'veg'` for bakery. Label it "Eggless" only in the Bakery category; elsewhere "Veg".
- Default sort: `popularity` desc.
- Global search (`lib/search.ts`): lowercase contains-match across name, tags, subcategory; rank name-prefix matches first; max 8 results.

## 10. Contact API (`app/api/contact/route.ts`)

- `POST` JSON. Validate with the same zod schema as the client (`name`, `phone`, `email?`, `type`, `message`, hidden `website` honeypot, `t` timestamp of form render).
- Reject (return success silently) if honeypot is filled or if `Date.now() - t < 3000`.
- Basic rate limit: in-memory map by IP, 5 requests per 10 minutes (note: best-effort on serverless).
- Send via nodemailer to `CONTACT_TO_EMAIL` with plain-text body and `replyTo` = customer email if given.
- Responses: `200 { ok: true }`, `400 { ok:false, errors }`, `500 { ok:false, message }`. Never leak SMTP errors to the client.

## 11. Animation architecture

### 11.1 Setup

- Register once in a client module: `gsap.registerPlugin(ScrollTrigger)`.
- Use `useGSAP(() => {...}, { scope: ref })` in every animated component so triggers are reverted on unmount.
- Use `gsap.matchMedia()` for breakpoint and reduced-motion variants:
  - `(min-width: 1024px) and (prefers-reduced-motion: no-preference)` → full pinned and scrubbed version
  - `(max-width: 1023px) and (prefers-reduced-motion: no-preference)` → lighter mobile version
  - `(prefers-reduced-motion: reduce)` → no animation; final state rendered in CSS
- Use `ScrollTrigger.config({ ignoreMobileResize: true })`. Use `svh`/`dvh`, not `vh`, for pinned heights.
- Animate only `transform`, `opacity`, `clip-path`. Never animate `top/left/width/height/margin`.
- Give every animated image a fixed aspect-ratio box so nothing shifts. Call `ScrollTrigger.refresh()` after fonts and above-the-fold images load.
- `will-change: transform` only on elements currently animating, not globally.

### 11.2 Lenis + ScrollTrigger sync (`components/motion/SmoothScroll.tsx`)

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true }); // touch stays native
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as any).__lenis = lenis; // used by drawers: lenis.stop() / lenis.start()
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
```

- When a drawer, sheet or overlay opens call `lenis.stop()` and add `overflow: hidden` to `body`; restore on close. Scrollable panels inside them get `data-lenis-prevent`.

### 11.3 The seven signature moments

Exact triggers, distances and behaviour are specified in `UI.md` §8. Implement each as its own component with its own `useGSAP`, using only the GSAP features listed there. No other scroll animations may be added.

### 11.4 Product grid reveal

Use `ScrollTrigger.batch('.product-media', { start: 'top 88%', once: true, onEnter: batch => gsap.fromTo(batch, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: .7, stagger: .06, ease: 'power3.out' }) })`. Images inside scale from 1.08 to 1. On "Load more", only animate newly added nodes. On filter change, skip animation entirely (instant) so filtering feels responsive.

## 12. Images and performance

- Export product images at 1200 px long edge (AVIF/WebP via next/image), hero at 1920 px. Every `<Image>` has `sizes` (for example cards: `(min-width:1280px) 22vw, (min-width:1024px) 30vw, 46vw`).
- Above-the-fold hero image `priority`; all others lazy.
- Product and card images use a low-quality blur placeholder coloured `--parchment`.
- Fonts: `display: 'swap'`, subset, preload only Marcellus and Hind 400/600. Pinyon Script loads with `display: 'swap'` and is used only in two places.
- Load GSAP and ScrollTrigger only in client components that need them (dynamic import for `Home` signature sections below the hero is acceptable).
- No autoplay video in V1.

## 13. SEO

> Local SEO for Kanpur (title templates, JSON-LD with `areaServed`, canonical and `noindex` rules, Google Business Profile plan) is specified in `seo.md`. Build the V1 hooks in `seo.md` §9. Where this section and `seo.md` differ, `seo.md` wins.

- `app/layout.tsx` sets `metadataBase`, default title template, description, Open Graph (logo-based 1200×630 image), theme colour `#FEFADB`.
- JSON-LD on Home: `LocalBusiness` (also `FoodEstablishment`) with name, url, telephone, address, openingHours, `servesCuisine: 'Indian'`, `sameAs` socials. JSON-LD `Product` with `Offer` on product pages (price from default variant, `availability`).
- `sitemap.ts` lists all routes and products. `robots.ts` allows all and points to the sitemap. `/cart` is `noindex`.

## 14. Accessibility

- Landmarks: `header`, `nav`, `main`, `footer`. One `h1` per page.
- Drawer, sheet and overlay: focus trap, `Esc` closes, return focus to trigger, `aria-modal`, labelled.
- Quantity steppers: buttons have `aria-label`s ("Decrease quantity of Kaju Katli"); count announced in a polite `aria-live` region ("Kaju Katli added, 3 items in cart").
- Focus ring: 2 px `--crimson` outline with 2 px offset on every interactive element. Never `outline: none` without replacement.
- Colour is never the only signal (veg mark uses shape plus colour; errors have icon plus text).
- Pinned sections: content remains readable and in DOM order; reduced-motion shows a normal stacked layout.
- Tap targets at least 44×44 px.

## 15. Analytics (`lib/analytics.ts`)

`track(event, params)` wrapper that no-ops when `NEXT_PUBLIC_GA_ID` is empty. Load GA with `next/script` `afterInteractive` only when the ID exists.

## 16. Deployment

- Vercel project, production branch `main`, preview deployments per PR.
- Set all env vars in Vercel. Add the custom domain. Enable image optimisation defaults.
- Add `vercel.json` only if needed (not expected).

## 17. Build order (follow this sequence)

1. **Foundation:** create app, Tailwind tokens from `design.md` §14, fonts, `config/site.ts`, types, `ImagePlaceholder`, `Button`/`Input`, `Sheet`, `Toast`.
2. **Layout shell:** Header, MobileMenu, Footer, FloatingActions, SmoothScroll provider.
3. **Data:** categories and 8 to 12 sample products per category from PRD Appendix A.
4. **Catalogue:** `ProductCard`, `ProductGrid`, filters, sort, Load more, listing pages, product detail.
5. **Cart:** store, selectors, drawer, cart page, `CheckoutPanel`, WhatsApp builder plus tests, MiniCartBar.
6. **Search overlay** and **Contact** (form plus API route).
7. **Home** sections with the signature scroll moments, one at a time, verifying each on a real phone.
8. **About** with the journey timeline.
9. SEO, analytics, accessibility pass, performance pass, reduced-motion pass.
10. Final QA against PRD section 10.

## 18. QA checklist

- [ ] Add, change quantity, remove, reload: cart persists, totals match across drawer, `/cart`, mini bar, message.
- [ ] Cake with note appears correctly in message. Pickup omits address. Delivery without address is blocked with a clear error.
- [ ] 15-line cart triggers the clipboard fallback when URL is too long.
- [ ] Filters and sort work together and survive refresh. Back button restores state.
- [ ] Contact form: valid, invalid, honeypot, server failure states.
- [ ] Lenis does not break drawers, sheets or form scrolling. Anchor and Tab focus scrolling still works.
- [ ] Pinned sections: no jump on iOS Safari URL-bar resize; no blank space after unpin.
- [ ] Reduced-motion: no pinning, no scrub, no rotation.
- [ ] Keyboard-only flow from landing to sending an order.
- [ ] Lighthouse targets from the PRD.

## 19. Code conventions

- Server components by default; add `'use client'` only when needed.
- No `any` (except the single `__lenis` window handle). No default exports except Next.js special files.
- Text content lives in `content/` or `config/`, not buried in JSX, so the owner can edit it.
- Comments: explain why, not what. Mark unknown client data with `// TODO(client):`.
- Commit in small steps matching section 17.
