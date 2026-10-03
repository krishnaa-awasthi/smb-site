# PRD: Shiv Mishthan Bhandar Website

> **For the AI building this site.** This document set is the complete brief. Read in this order: `prd.md` → `userflow.md` → `design.md` → `UI.md` → `trd.md`.
> If two documents disagree, precedence is: **PRD > userflow > TRD > design > UI**.
> Do not add features, pages, sections, libraries or copy claims that are not written in these files. If something is missing, choose the simplest option that fits the brand and leave a `// TODO(client):` comment. Never invent facts about the business (year founded, ingredients, awards, addresses, prices). Use the placeholder tokens in section 7.

---

## 1. Project summary

|                     |                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Client              | Shiv Mishthan Bhandar, a legacy sweet shop with a restaurant, bakery and namkeen counter                          |
| Tagline (from logo) | _Happiness is also Sweet_                                                                                         |
| Type of site        | Marketing site plus browsable catalogue plus cart that checks out through WhatsApp                                |
| Payments            | **None.** No payment gateway. Orders are sent to the owner as a pre-written WhatsApp message and settled manually |
| Logo                | `/public/brand/logo.png` (supplied; see `design.md` §2)                                                           |
| Primary device      | Mobile (assume 75%+ of visitors), then desktop                                                                    |

## 2. Brand positioning

- **Legacy, not new.** The site must feel like an established house with decades of history. The About page carries this (journey, future goals, authenticity, identity).
- **Luxury yet affordable.** Premium in restraint, photography and craft. Prices are shown plainly and honestly, with no "cheap deal" shouting.
- **Quality over price.** Copy never leads with discounts. Offers exist but sit quietly.
- **Not loud.** Low saturation, generous space, slow motion, no flashing banners.
- **Human.** It should feel designed by a person who has been inside the shop. See the anti-pattern list in `design.md` §12.

## 3. Audience

1. **Families and regulars** ordering sweets and gift boxes for festivals and occasions. Mostly on phones. Want to see prices and weights quickly.
2. **Cake and bakery buyers** who need size options and a message on the cake.
3. **Hungry walk-in or delivery customers** browsing the restaurant menu.
4. **People who just want to call.** One tap to dial must always be available.

## 4. Goals and non-goals

**Goals**

- G1. A visitor can go from landing to a finished WhatsApp order in under 2 minutes.
- G2. Scrolling is a pleasure: a small number of deliberate, scroll-linked moments (not scattered fade-ins).
- G3. Brand reads as heritage plus quality.
- G4. Owner receives complete, readable orders with no payment-gateway cost.
- G5. Site is fast on mid-range Android phones over 4G.

**Non-goals (V1)**
User accounts or login · online payments · order tracking · admin dashboard or CMS · reviews or ratings · blog · multi-language toggle · dark mode · loyalty or coupon codes · live stock or inventory.

## 3a. Site map

```
/                      Home
/sweets                Category listing
/restaurant            Category listing
/bakery                Category listing
/namkeen               Category listing
/[category]/[slug]     Product detail
/cart                  Full cart and order details
/about                 Brand story
/contact               Contact form and shop details
/not-found             404
```

Persistent on every page: header, footer, floating call and WhatsApp buttons, cart drawer, search overlay, mobile mini-cart bar.

## 5. Functional requirements

Each item has an ID and acceptance criteria (AC). All must pass.

### FR-1 Catalogue and category pages

- Four categories: **Sweets, Restaurant, Bakery, Namkeen**. Each has its own page at `/{category}`.
- Listing behaves like a marketplace (Amazon/Flipkart style): grid of product cards, filters, sort, result count, "Load more".
- AC
  - Card shows: image, veg/egg mark, name, one-line descriptor, price (from-price if multiple variants), strike-through MRP and % off when `mrp` exists, badge if any, variant selector, Add button that becomes a quantity stepper.
  - Filters: subcategory, price band, diet (veg / eggless), in-stock only. Sort: Popularity (default), Price low to high, Price high to low, Newest.
  - Filter, sort and search state lives in the URL query string and survives refresh and sharing.
  - Grid is 2 columns on mobile, 3 on tablet and laptop, 4 on wide desktop.
  - Empty result state explains what happened and offers "Clear filters".
  - 12 products load initially; "Load more" adds 12.

### FR-2 Product detail page

- Route `/{category}/{slug}`. Gallery (up to 5 images), name, diet mark, price block, variant selector, quantity, Add to cart, optional note field (for cakes), description, ingredients, shelf life, "Order this on WhatsApp" quick link, related products (same subcategory).
- AC: unavailable products show "Currently unavailable" and disable Add. The WhatsApp quick link sends that single item using the same message builder.

### FR-3 Cart

- Add, remove, change quantity, change variant (by removing and re-adding is acceptable), per-line note where `allowNote` is true, order-level note.
- Cart shows per line: image, name, variant label, unit price, quantity stepper, line total, remove. Shows item count and subtotal. Shows this fixed text: _"Delivery charges, if any, are confirmed by the shop on WhatsApp."_
- Persists in `localStorage` across reloads and visits. Quantity limits: min 1, max 20 per line.
- Surfaces: slide-in drawer (from any page) and full `/cart` page.
- AC: totals are always consistent between drawer, cart page, mini-cart bar and the WhatsApp message. Money is computed in whole rupees (integers).

### FR-4 WhatsApp checkout (the unique feature)

- On `/cart`, the customer fills a short panel: **name** (required), **order type** (Home delivery or Store pickup, required), **address** (required only for delivery), **preferred date and time** (optional free text), **notes** (optional).
- Button **"Send order on WhatsApp"** opens `https://wa.me/{number}?text={encoded message}` in a new tab or app with the full order pre-written in the chat box. The drawer's primary button is **"Proceed to checkout"** and goes to `/cart`.
- Message format is defined in `trd.md` §7 and the example in `userflow.md` §6. Must include an order ID, itemised lines, quantities, variant labels, line totals, subtotal and customer details.
- On success the cart is **not** cleared automatically (the user may not have sent the message). Show a quiet confirmation with a "Clear cart" action.
- AC: if the URL would exceed 1,800 characters, fall back to copying the message to the clipboard and opening the plain chat (`wa.me/{number}`) with a toast explaining to paste it.

### FR-5 Contact

- `/contact` has a form: name, phone (required), email (optional), enquiry type (General, Bulk or festive order, Feedback), message. On submit, the server emails the owner.
- Also shows address, opening hours, phone, WhatsApp, "Open in Maps" link.
- AC: client and server validation, honeypot spam field, success and error states with plain-language messages, no page reload.

### FR-6 Direct order channels

- **Call icon** (`tel:`) and **WhatsApp icon** (`wa.me` without prefilled cart) are visible on every page via floating actions. The header also shows the phone number on desktop.
- AC: both are reachable by keyboard and have accessible names ("Call the shop", "Chat on WhatsApp").

### FR-7 Home page

Sections in order: hero, four categories (scroll-swap), featured and bestselling products, offers, legacy teaser, how to order, footer. Full specs in `UI.md` §5.

- Featured and bestsellers come from products flagged `featured` or `bestseller`. Offers come from `content/offers.ts`.

### FR-8 About page

- Must show: the all-time **journey** (timeline from founding to today), **future goals**, **authenticity** (how the food is made and who makes it) and **identity** (what the name and brand stand for). Legacy feel is mandatory: real photographs, founding year, family or founder note.
- AC: timeline is data-driven from `content/journey.ts`; last entries can be flagged `future: true` for goals.

### FR-9 Search

- Header search opens an overlay with instant results across all categories (name and tags, client-side).

### FR-10 Scroll experience

- The client insists on memorable scroll-triggered animation beyond basic fade-ins, especially for image cards and sections. Implement the seven **signature moments** in `UI.md` §8, nothing more. Everything else is still.
- AC: all animation respects `prefers-reduced-motion`; no layout shift; 60fps on a mid-range phone; pinned sections never trap the user (there is always a way to keep scrolling).

### FR-11 Local SEO for Kanpur (hooks in V1, full programme later)

- The shop serves customers within about 15 to 20 km of its main shop in Kanpur. The site and the shop's Google Business Profile should rank locally for searches such as sweet shop, bakery and family restaurant in Kanpur.
- Full spec in `seo.md`. In V1 the builder implements only the hooks in `seo.md` §9 (config tokens, metadata, structured data, category SEO text block, address in text, sitemap, `lang="en-IN"`).
- AC: every page has a unique title and description from `content/seo.ts`; Home has valid `LocalBusiness` JSON-LD; category pages render products and the SEO text on the server; the address, phone and hours match exactly across the footer, contact page and JSON-LD.

## 6. Non-functional requirements

| Area          | Requirement                                                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Performance   | LCP under 2.5 s on 4G mid-range Android; CLS under 0.05; route JS under ~180 KB gzip excluding GSAP (load GSAP only where used)              |
| Accessibility | WCAG 2.2 AA colour contrast, visible focus, keyboard operable drawers and sheets, semantic landmarks, alt text, `aria-live` for cart updates |
| SEO           | Per-page metadata, Open Graph image, JSON-LD `LocalBusiness`, sitemap, robots, clean URLs                                                    |
| Browsers      | Last 2 versions of Chrome, Safari (iOS 16+), Edge, Firefox, Samsung Internet                                                                 |
| Privacy       | No accounts. Customer details are only placed into the WhatsApp message and optionally remembered in `localStorage` on that device           |
| Legal         | Footer shows FSSAI licence number `{{FSSAI_NO}}` and copyright                                                                               |

## 7. Content and placeholders

The builder must **not** invent business facts. Use these tokens in `config/site.ts` and `content/*.ts` so the owner can fill them later. Build the UI so it looks correct with realistic sample text.

| Token                                      | Meaning                                                |
| ------------------------------------------ | ------------------------------------------------------ |
| `{{ESTABLISHED_YEAR}}`                     | Year the shop was founded                              |
| `{{WHATSAPP_NUMBER}}`                      | Digits with country code, no `+` (e.g. `91XXXXXXXXXX`) |
| `{{CALL_NUMBER}}`                          | Phone number for `tel:`                                |
| `{{ADDRESS}}`, `{{MAPS_URL}}`, `{{HOURS}}` | Shop address, Google Maps link, opening hours          |
| `{{FSSAI_NO}}`                             | Food licence number                                    |
| `{{OWNER_EMAIL}}`                          | Where contact-form emails go                           |
| `{{FOUNDER_NAME}}`                         | Founder or family name for the About note              |
| `{{SOCIAL_*}}`                             | Instagram, Facebook, YouTube, optional                 |

Product data, prices and photos are **sample content** until replaced. Every sample record carries a `// SAMPLE: replace` comment. Sample products for each category are listed in Appendix A.

Assets supplied by the client, still pending: high-resolution logo (vector or transparent PNG), product photographs, shop and history photographs, founder photo. Until they arrive, use the `ImagePlaceholder` component (warm parchment block with the product name), never stock-looking generic images.

## 8. Analytics (optional, env-gated)

If `NEXT_PUBLIC_GA_ID` is set, load GA4 and send events: `add_to_cart`, `begin_checkout` (when WhatsApp opens), `call_click`, `whatsapp_click`, `contact_submit`, `search`.

## 9. Open items to confirm with the client

1. WhatsApp and call numbers. 2. Year founded and the real journey milestones. 3. Delivery areas, charges, minimum order, timings. 4. Real product list, sizes and prices. 5. Which items are eggless or egg-containing. 6. High-res logo (vector or transparent). 7. Photography plan (see `design.md` §7). 8. FSSAI number, address and hours. 9. Owner email for the contact form. 10. Domain name.

## 10. Definition of done

- All FR items pass their AC on iPhone-size (390 px), tablet and desktop.
- Lighthouse mobile: Performance 85+, Accessibility 95+, SEO 95+.
- Cart to WhatsApp flow tested with: 1 item, 15 items, a cake with a note, pickup, delivery, and an unavailable item.
- Reduced-motion mode shows a complete, static, correct site.
- No Lorem ipsum, no broken images, no console errors, no hydration warnings.
- Zero use of the anti-patterns in `design.md` §12.

---

## Appendix A: Categories, subcategories and sample products

All names below are sample data to seed the catalogue; prices are placeholders the client will correct.

**Sweets** (all veg) · subcategories: Milk sweets, Ladoo, Bengali sweets, Dry fruit sweets, Fried and syrup sweets, Gift boxes
Sample: Kaju Katli, Motichoor Ladoo, Besan Ladoo, Gulab Jamun, Rasgulla, Rasmalai, Kalakand, Milk Cake, Peda, Soan Papdi, Balushahi, Jalebi, Assorted Gift Box.
Variants: 250 g, 500 g, 1 kg (gift boxes: Small, Medium, Large).

**Restaurant** · subcategories: Breakfast, Snacks and chaat, Main course, Thali, Beverages, Desserts
Sample: Chole Bhature, Aloo Paratha, Samosa, Paneer Butter Masala, Dal Makhani, Veg Thali, Masala Dosa, Masala Chai, Sweet Lassi, Cold Coffee, Kulhad Doodh.
Variants: Half, Full (or single size). `available` can be false outside kitchen hours.

**Bakery** · subcategories: Cakes, Pastries, Cookies and biscuits, Brownies, Breads and puffs
Sample: Chocolate Truffle Cake, Black Forest, Butterscotch Cake, Pineapple Cake, Eggless Chocolate Cake, Pastry (assorted), Jeera Cookies, Atta Biscuits, Fudge Brownie, Veg Puff.
Variants: cakes 500 g, 1 kg, 2 kg with `allowNote: true` (message on cake); others by piece or pack.

**Namkeen** (all veg) · subcategories: Sev and bhujia, Mixtures, Chips and wafers, Tea-time snacks, Papad and sides
Sample: Aloo Bhujia, Moong Dal, Khatta Meetha Mixture, Sev, Masala Chips, Banana Chips, Mathri, Namak Pare, Chakli, Papad.
Variants: 200 g, 500 g, 1 kg.

## Appendix B: Phase 2 (out of scope, do not build)

Admin panel to edit products and prices · online payments (UPI, Razorpay) · order history · festival landing pages · Hindi language toggle · gift-box builder · loyalty.
