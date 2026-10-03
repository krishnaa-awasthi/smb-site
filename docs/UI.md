# UI Spec: Shiv Mishthan Bhandar Website

> Page layouts, components, states and the exact scroll animations. Tokens, fonts and shapes are in `design.md`; behaviour is in `userflow.md`; code structure is in `trd.md`. Wireframes are ASCII: `▒` = image, `░` = sunburst, `[ ]` = control. Text in `{{ }}` is a placeholder from PRD §7. Draft copy is marked _(draft)_ and lives in `content/copy.ts`.

## 1. Global rules

| Item                | Value                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Breakpoints         | `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536` (mobile first)                                           |
| Container           | max 1320 px; side padding 20 / 32 / 48 px                                                                         |
| Alignment           | Left. No centred headline blocks (see `design.md` §12)                                                            |
| Z-index             | header 40 · mini-cart 44 · floating actions 45 · drawer overlay 60 · drawer 61 · search overlay 70 · toast 80     |
| Header height       | 60 px mobile, 72 px desktop. Page content starts below it except Home hero, which sits under a transparent header |
| Hero/pinned heights | Use `svh`/`dvh`, never `vh`                                                                                       |
| Light theme only    | No dark mode                                                                                                      |

## 2. Base components

**Button** (2 px radius, 44 px min height, Hind 600 15 px, sentence case, no arrows, no icons unless noted)

- `primary`: crimson fill, cream text; hover `--crimson-deep`; pressed scale .98.
- `secondary`: transparent, 1.5 px crimson border, crimson text; hover fills `rgba(179,32,42,.08)`.
- `text`: crimson text, 1 px underline offset 4 px; hover underline thickens.
- `whatsapp`: `--leaf` fill, cream text, WhatsApp glyph left (the only button that carries an icon).
- Disabled: 45% opacity, no pointer. Loading: label replaced by small spinner, width fixed.

**Input / Textarea / Select:** `--ivory` fill, 1 px `--gold` at 60%, 2 px radius, 48 px height (textarea min 120). Label above in Hind 500 14 px (sentence case). Helper text below in `--ink-soft`. Error: border `--error`, message with a small alert icon.

**Chip (variant/filter):** 36 px height, 2 px radius, 1 px gold border; selected = crimson border + `rgba(179,32,42,.08)` fill + crimson text.

**QuantityStepper:** `[ − ]  2  [ + ]`, each button 44 px square, crimson 1.5 px border, count in Hind 600. Width matches the Add button it replaces.

**VegMark:** 14 px square outline with 8 px dot (`--leaf` veg, `--egg` egg).

**Badge:** 2 px radius, cream text on crimson (Bestseller) or on maroon (New, Festive, Seasonal), Hind 600 12 px, sentence case.

**PriceBlock:** `₹450` (Hind 600, ink) then `/ 500 g` (small, ink-soft); if `mrp`: `₹500` struck through (ink-soft) then `10% off` in crimson. Multi-variant listing shows "From ₹X".

**Toast:** bottom-left on desktop, top on mobile under the header; ivory with gold hairline; auto-dismiss 3.5 s; `aria-live="polite"`.

**Sheet:** bottom sheet (mobile) or right drawer (desktop). Backdrop `rgba(43,23,18,.45)`, slides 280 ms `--ease-out`, focus trapped, `Esc` closes.

**Brand pieces:** `Sunburst` (see tokens, absolutely positioned, `pointer-events:none`, `aria-hidden`), `Cartouche` (clip wrapper + gold outline), `ImageArch`, `Ornament`, `ImagePlaceholder` (parchment block, product name in Marcellus, ink-soft).

## 3. Layout components

### 3.1 Header

```
Desktop (72px)
[badge] Sweets  Restaurant  Bakery  Namkeen  About  Contact          [search]  +91 ...  [cart 2]
```

- Left: logo badge (56 px, cartouche-clipped) then nav links (gap 28 px, Hind 500 16 px). Right: search icon button, phone number as `tel:` link, cart button with count.
- Home: transparent over hero with ink text. After 40 px scroll: `--cream` background + bottom 1 px gold hairline (35%).
- Hides on scroll down (after 120 px), returns on scroll up (160 ms).
- Active page link: crimson, 2 px underline offset 6 px.
- Cart count: 18 px circle, crimson, cream numerals; bumps (scale 1.15 → 1, 200 ms) when items are added.
- Mobile: badge left; right: search, cart, menu icons (44 px targets).

### 3.2 MobileMenu

Sheet from the left, 86% width, cream. Links in Marcellus 28 px stacked, left-aligned, 20 px gaps. Bottom block: phone, WhatsApp, address, hours. Close icon top-right.

### 3.3 SearchOverlay

Full-width panel sliding from top (ivory). Large input (Marcellus 24 px placeholder "Search sweets, cakes, snacks"). Results list below (max 8): thumbnail 56 px arch, name, category + price. `Enter` opens first result. Empty: "Nothing found for “{q}”. Try a shorter word."

### 3.4 FloatingActions

Fixed bottom-right, 16 px (desktop 24 px) from edges. Two 52 px circles stacked with 12 px gap: **WhatsApp** (`--leaf`, cream glyph, top) and **Call** (`--crimson`, cream phone glyph, below). Desktop hover shows a text tooltip ("Chat on WhatsApp", "Call the shop"). On mobile, when the mini-cart bar is visible, lift by 72 px. Always visible on every page, including `/cart`.

### 3.5 MiniCartBar (mobile only)

Fixed bottom, full width, 56 px + safe-area, `--maroon` bg. Left: "3 items" and subtotal `₹1,940` (cream). Right: `View cart` secondary-on-dark button. Hidden when cart is empty or on `/cart`.

### 3.6 Footer

```
┌───────────────────────────────────────────────────────────────┐ maroon
│ ~ornament                                                       │
│ [logo 120px]            Shop           Visit us                 │
│ Happiness is also       Sweets         {{ADDRESS}}              │
│ Sweet  (script, gold)   Restaurant     {{HOURS}}                │
│                         Bakery         {{CALL_NUMBER}}          │
│ Short brand line        Namkeen        [WhatsApp]  [Call]       │
│                         About · Contact                          │
│ ───────────────────────────────────────────────────────────── │
│ FSSAI {{FSSAI_NO}}                         © {{year}} Shiv Mishthan Bhandar │
└───────────────────────────────────────────────────────────────┘
```

Columns 5 / 3 / 4. Text cream, headings Marcellus 18 px in `--gold-light`. Tagline is script use #1 of 3 (the other two: hero tagline, About signature) per `design.md` §4.

## 4. Catalogue and cart components

### 4.1 ProductCard (listing and carousels)

```
╭───────╮   arch image 4:5, parchment bg
│▒▒▒▒▒▒▒│   [veg mark] top-left (10px inset)
│▒▒▒▒▒▒▒│   [Bestseller] badge bottom-left of image
╰───────╯
Kaju Katli              Marcellus 17, max 2 lines
Silky cashew fudge      Hind 14, ink-soft, 1 line
₹650 / 500 g   ₹700  7% off
(250 g) [500 g] (1 kg)  chips; >3 variants → Select
[ Add to cart ]         secondary button, full width → stepper after add
```

- No border, no shadow, no background box. Whole image + name are one link to the product page; the Add control is separate.
- Desktop hover: image scales 1.04 inside its arch (600 ms). No lift, no shadow.
- Unavailable: image 60% opacity, button replaced by disabled "Currently unavailable".
- Add action: updates cart, bumps header count, shows toast, announces via `aria-live`. Does not open the drawer.

### 4.2 ProductGrid

2 columns (<640), 3 (≥640 up to 1279), 4 (≥1280 when the filter panel is shown, else 4/5). Gap 16 / 24 px. Column gap larger than row gap is not allowed. "Load more" is a `secondary` button, left aligned under the grid, with "Showing 12 of 38" in small text beside it.

### 4.3 FilterPanel (desktop ≥1024) and FilterSheet (mobile)

Desktop: sticky left column 248 px, top 96 px.

```
Filters                     [Clear all]
Type            (subcategories, radio list, with counts)
Price           chips: Under ₹200 · ₹200–500 · ₹500–1,000 · Above ₹1,000
Diet            Veg  /  Eggless  (bakery only shows Eggless)
Availability    [toggle] In stock only
```

Group headings Marcellus 18 px. Options as custom radios (crimson dot). Selecting updates the URL and results instantly.
Mobile: sticky bar below header: `Filter` and `Sort` buttons (split 50/50, outlined) with "38 items" on the left; Filter opens a bottom sheet (85 dvh) with the same groups and a footer button "Show 38 items"; Sort opens a short sheet with radio list.

### 4.4 CartDrawer (right, 420 px; full-width bottom sheet on mobile)

```
Your cart (3)                                   [close]
────────────────────────────────────
[img] Kaju Katli                        ₹1,300
      500 g · ₹650          [− 2 +]      remove
[img] Chocolate Truffle Cake            ₹850
      1 kg · note: Happy Birthday Riya  [− 1 +]
────────────────────────────────────
Subtotal                                 ₹2,150
Delivery charges, if any, are confirmed by the shop on WhatsApp.
[ Proceed to checkout ]   (primary, full width)
View full cart            (text link)
```

Scrollable middle with `data-lenis-prevent`. Empty state: "Your cart is empty. Start with our sweets." + `Browse sweets` button.

### 4.5 CheckoutPanel (on `/cart`)

Fields in this order: Name* · Order type* (two large radio rows: Home delivery / Store pickup) · Address* (textarea, shown only for delivery) · Preferred date and time (text, placeholder "Today, 6 PM") · Notes for the shop. Below: subtotal, delivery note, primary button **Send order on WhatsApp**. Under the button, small text: "This opens WhatsApp with your order already written. Nothing is charged online."
After click: confirmation block "WhatsApp is open with your order. Send the message there to finish." with `Clear cart` text button and `Back to shop` link.

## 5. Home page

Section order: **H1 Hero → H2 Four houses → H3 Bestsellers → H4 Offers → H5 Legacy reveal → H6 How to order → Footer.** Animations referenced as S1–S7 are defined in §8.

### H1 Hero (S1)

```
┌────────────────────────────────────────────────────────────────┐ min-height 100svh
│ ░░░░░░░░░░░░░░░░░░ sunburst, large, centred behind photo ░░░░░░ │
│                                         ╭──────────────╮        │
│  Sweets, the way they have              │▒▒▒▒▒▒▒▒▒▒▒▒▒▒│        │
│  always been made.                      │▒▒ cartouche ▒│        │
│  Since {{ESTABLISHED_YEAR}}.            │▒▒ photo 4:5 ▒│        │
│                                         │▒▒▒▒▒▒▒▒▒▒▒▒▒▒│        │
│  Sweets, a restaurant, a bakery         ╰──────────────╯        │
│  and namkeen under one roof.        Happiness is also Sweet     │
│                                       (script, below frame)     │
│  [Browse sweets]   Call the shop                                │
└────────────────────────────────────────────────────────────────┘
```

- Grid: text cols 1 to 5, bottom-aligned (not vertically centred); cartouche cols 7 to 12, bleeding 24 px past the right container edge. Sunburst diameter ≈ 130 vw, centred on the cartouche (not on the page).
- Headline _(draft)_ Marcellus hero size, max 14 ch per line via explicit line wrappers (needed for S1). Subline Hind 17 px, max 38 ch.
- Actions: one `primary` ("Browse sweets") and one `text` link ("Call the shop"), left aligned, 44 px high. Not full-width, not centred.
- Mobile: image first (cartouche 78% width, left aligned), sunburst behind it, then headline, subline, actions. Header transparent with ink text over cream.

### H2 Four houses: category swap (S2)

```
┌────────────────────────────────────────────────────────────────┐ pinned 100dvh
│                                                ░░░░░░            │
│  ─ Sweets                         ╭───────────╮░                │
│    Mithai for gifting and         │▒▒▒▒▒▒▒▒▒▒▒│░                │
│    for every day.                 │▒▒ arch ▒▒▒│                  │
│    Restaurant                     │▒▒ image  ▒│                  │
│    Bakery                         │▒▒ 4:5   ▒▒│                  │
│    Namkeen                        └───────────┘                  │
└────────────────────────────────────────────────────────────────┘
```

- Left (cols 1 to 6): four category names stacked, Marcellus 44 to 64 px (clamp), ink-soft; the active one is ink with a 28 px gold line before it and its one-line descriptor shown below _(draft in `content/copy.ts`)_. Each name links to its page.
- Right (cols 8 to 12): arch frame, aspect 4/5, with the four category images stacked.
- Mobile: arch image on top (45 dvh, left aligned), names beneath as a list; same pinned behaviour; names remain tappable.
- No numbering (the four are not a sequence).

### H3 Bestsellers and featured (S3)

```
Bestsellers                                          See all sweets
────────────────────────────────────────────────────────────────
╭────╮      ╭────╮         ╭────╮      ╭────╮
│▒▒▒▒│      │▒▒▒▒│ ← 48px  │▒▒▒▒│      │▒▒▒▒│ ← 48px lower
│▒▒▒▒│      │▒▒▒▒│  lower  │▒▒▒▒│      │▒▒▒▒│
╰────╯      ╰────╯         ╰────╯      ╰────╯
Name  ₹     Name  ₹        Name  ₹     Name  ₹   (+ Add)
━━━━━━━━━━━━━━━────────────────────  progress line
```

- Heading "Bestsellers" (H2) left, `text` link right. 6 to 8 products from `bestseller || featured`, bestseller first.
- Cards: 300 px wide, arch image 3:4, name, price, small Add button. Even-indexed cards sit 48 px lower (static CSS offset) so the row has a hand-set rhythm.
- A 2 px gold line below shows scroll progress, filled with crimson.
- Mobile and tablet: native horizontal scroll-snap (card width 72 vw), no pin, no GSAP.

### H4 Offers (quiet, no animation)

```
Offers                       Festive gift boxes                        View gift boxes
{{one line}}                 Flat 10% off on boxes above 1 kg. Until {{date}}.
                             ─────────────────────────────────────────────────
                             Combo breakfast ...
```

- Left cols 1 to 4: H2 + one-line note. Right cols 6 to 12: up to 3 offer rows from `content/offers.ts` (title H3, one line detail, validity in small ink-soft, `text` link). Gold hairlines between rows. If no offers: hide the section entirely.
- Copy is factual: what, how much, until when. No exclamation marks.

### H5 Legacy reveal (S4)

```
scroll start                      scroll end (full-bleed)
      ╭────────╮                  ┌─────────────────────────────┐
      │▒ photo ▒│       →         │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
      ╰────────╯                  │▒ A family shop, still run    │
                                  │▒ like one.   Read our story  │
                                  └─────────────────────────────┘
```

- Full-width section with the old-shop photograph (client-supplied; sepia welcome). Starts as a small cartouche-shaped window and opens to full bleed as the user scrolls.
- Text _(draft)_ bottom-left over a maroon-to-transparent overlay (left 45%): H2 in cream, one sentence, `text` link "Read our story" (cream). Max 34 ch wide.

### H6 How to order (S7)

```
How to order                   │ ● Pick what you like
Order from home, or            │   Browse the four sections and add to your cart.
walk in whenever you like.     │ ● Send your order on WhatsApp
                               │   We write the message for you, with every item and size.
Prefer to talk?                │ ● We confirm and prepare
Call {{CALL_NUMBER}}           │   The shop replies to confirm availability, charges and timing.
```

- Left cols 1 to 5: H2 + short line + phone as a `text` link. Right cols 7 to 12: three steps along a vertical hairline that draws in crimson as you scroll; the dot of each step fills crimson when reached. The steps **are** a sequence, so numbering by dots (or 1, 2, 3) is allowed.

## 6. Listing and product pages

### 6.1 Category listing `/[category]`

```
Home / Sweets                                         (breadcrumb, small)
┌──────────────────────────────────────────────────────────────┐ header band 280px (220 mobile)
│ ░░░                                         ╭─────────╮       │
│ Sweets                                      │▒ arch ▒▒│       │
│ Mithai made fresh every morning *(draft)*   ╰─────────╯       │
└──────────────────────────────────────────────────────────────┘
38 items                                         Sort: Popularity ▾
┌ Filters ┐  ┌────┐ ┌────┐ ┌────┐ ┌────┐
│         │  │card│ │card│ │card│ │card│
│  ...    │  └────┘ └────┘ └────┘ └────┘
└─────────┘  ... [ Load more ]  Showing 12 of 38
```

- Header band on `--cream` with a sunburst fragment behind the right image (S5). H1 is the category name (H2 scale on mobile). One 1-sentence description max 60 ch.
- Result count left, Sort select right (desktop). Mobile uses the sticky Filter/Sort bar.
- The grid is functional and calm: only the S5 image reveal; no hover lift.
- **SEO text block** below "Load more": H2 (for example "Sweets in {{CITY}}"), then 80 to 150 words in Hind 17 px, left-aligned, max 62 characters per line, from `content/seo.ts`. Plain text in the DOM (never collapsed or hidden). Written in the shop's voice, not a keyword list (see `seo.md` §4.2).

### 6.2 Product detail `/[category]/[slug]`

```
Home / Sweets / Kaju Katli
┌──────────────────────────────┬────────────────────────────┐
│ [thumb]  ╭────────────╮      │ Kaju Katli                  │
│ [thumb]  │▒▒ main arch │      │ [veg]  [Bestseller]        │
│ [thumb]  │▒▒ 4:5      │      │ ₹650 / 500 g  ₹700  7% off  │
│          ╰────────────╯      │ Silky cashew fudge.          │
│                              │ Size  (250 g) [500 g] (1 kg) │
│                              │ [− 1 +]  [ Add to cart ]     │
│                              │ [WA] Order this on WhatsApp  │
│                              │ Message on cake (if allowed) │
│                              │ About · Ingredients · Shelf life (plain sections)
└──────────────────────────────┴────────────────────────────┘
More from Milk sweets   → horizontal ProductCard row
```

- Columns 7 / 5, left aligned. Gallery: thumbnails vertical on desktop, a swipe strip with dots on mobile. Main image arch 4:5.
- Mobile: sticky bottom bar with price and `Add to cart` (replaces mini-cart bar on this page).
- "Order this on WhatsApp" is a `whatsapp` button using the single-item message (TRD §7).

## 7. Cart, About, Contact, 404

### 7.1 Cart `/cart`

```
Your cart                                             (H1)
┌───────────────────────────────────┬──────────────────────┐
│ line (img, name, variant, stepper,│ Order details         │
│ line total, remove)               │ Name*                 │
│ line ...                          │ Order type* ( ) ( )   │
│ Note for the whole order [.....]  │ Address*              │
│                                   │ Preferred time        │
│                                   │ Subtotal  ₹2,150      │
│                                   │ Delivery note         │
│                                   │ [Send order on WhatsApp]
└───────────────────────────────────┴──────────────────────┘
```

Right column sticky (top 96 px). Mobile: lines, order note, details, then summary; the primary button is a sticky bottom bar.

### 7.2 About `/about`

Sections in order:

- **A1 Intro.** Left cols 1 to 6: H1 "A family shop since {{ESTABLISHED_YEAR}}" _(draft)_ + two short paragraphs. Right cols 8 to 12: tall arch photo (founder or shop) with a second smaller photo overlapping its lower-left corner by 32 px.
- **A2 Journey (S6).** Pinned timeline from founding to today to future goals (below).
- **A3 What we stand for.** Three to four rows from `content/promises.ts`; each row = short H3 + one paragraph (max 56 ch) on the left, small arch photo on the right, alternating sides. Not cards. Only client-confirmed claims.
- **A4 Founder note.** Short first-person note from `{{FOUNDER_NAME}}`, ending with a signature in Pinyon Script (script use #3). Photo in a small arch at left.
- **A5 Visit and order.** Address, hours, two buttons (`whatsapp`, `secondary` call). Left aligned.

Timeline stage:

```
┌──────────────────────────────────────────────────────────────┐ pinned 100dvh
│ ● │  1974                                    ╭───────────╮     │
│ │ │  The first counter                       │▒▒ arch ▒▒▒│     │
│ │ │  Two or three sentences about            │▒▒ photo ▒▒│     │
│ ● │  that year.                              ╰───────────╯     │
│ ○ │                                                             │
└──────────────────────────────────────────────────────────────┘
```

- Left rail: 2 px vertical line with a node per milestone; the line fills crimson as you progress. Year in Marcellus 72 to 144 px (maroon), title H3, body (max 50 ch). Right: arch photo.
- The last one or two entries (`future: true`) are the **future goals**: the whole stage background eases from `--cream` to `--maroon`, text turns cream, year turns `--gold-light`, and the line turns gold.
- Content: 5 to 8 entries from `content/journey.ts`: `{ year, title, text, image, future? }`.

### 7.3 Contact `/contact`

```
Contact                                         (H1)
┌───────────────────────────────┬─────────────────────────────┐
│ Name*                          │ ~ornament                    │
│ Phone*                         │ {{ADDRESS}}                  │
│ Email                          │ {{HOURS}}                    │
│ Enquiry type  (General ▾)      │ {{CALL_NUMBER}}              │
│ Message*                       │ [WhatsApp]  [Call]           │
│ [ Send message ]               │ Open in Maps (text link)     │
└───────────────────────────────┴─────────────────────────────┘
```

Columns 7 / 5. Below the details column add **Areas we deliver to**: a short plain-text list of `{{SERVED_AREAS}}` and the line "We deliver within about {{SERVICE_RADIUS_KM}} km of the shop in {{CITY}}." (local SEO, see `seo.md` §4.3). Address and phone are real selectable text, not images. Success replaces the form in place: "Thank you. We will call or message you soon." + `Send another` text button. Error: inline message above the button with WhatsApp link. No map iframe in V1.

### 7.4 404

Left-aligned H1 "That page is not on our counter.", one line, `Go to home` button, small row of the four category links.

## 8. Scroll animation spec (the seven signature moments)

Build exactly these. Each lives in its own component with `useGSAP` and `gsap.matchMedia()` as in TRD §11. All values below are starting points; keep the structure, tune by feel on a real phone.

Shared defaults: `ScrollTrigger` with `invalidateOnRefresh: true`; animate only `transform`, `opacity`, `clip-path`; masks via `overflow:hidden` wrappers.

| #   | Name                              | Where         | Pinned      | Scrub                     |
| --- | --------------------------------- | ------------- | ----------- | ------------------------- |
| S1  | Hero opening and turning sunburst | Home H1       | No          | Yes (after load sequence) |
| S2  | Four houses swap                  | Home H2       | Yes         | Yes + snap                |
| S3  | Bestsellers track                 | Home H3       | Yes (≥1024) | Yes                       |
| S4  | Legacy reveal                     | Home H5       | Yes         | Yes                       |
| S5  | Category header and image reveals | Listing pages | No          | Header yes; grid once     |
| S6  | Journey timeline                  | About A2      | Yes         | Yes                       |
| S7  | Order steps line                  | Home H6       | No          | Yes                       |

### S1 Hero opening and turning sunburst

- **Load (once, about 1.6 s total):** (a) `.sunburst` wrapper clip-path `circle(0% at 70% 50%)` → `circle(75% at 70% 50%)`, 1.4 s `power3.out`. (b) Cartouche inner image `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)`, 1.1 s `power3.out`, delay .2. (c) Each headline line sits in an `overflow:hidden` wrapper; inner `yPercent: 105 → 0`, 0.9 s `power3.out`, stagger .12, delay .3. (d) Subline, actions and tagline fade in (opacity only), 0.6 s, delay 1.0.
- **Scroll:** trigger hero, `start: 'top top'`, `end: 'bottom top'`, `scrub: 0.6`. `.sunburst` `rotation: 0 → 30` (ease none). Image inner element `yPercent: 0 → 12` with fixed `scale: 1.15` (parallax inside the frame). **Text does not move.**
- **Mobile:** identical, rotation 0 → 20.
- **Reduced motion:** everything in final state, sunburst static.

### S2 Four houses swap

- **Structure:** stage `height: 100dvh`; four stacked image layers (index 0 visible); names list; descriptor slots (one visible).
- **Trigger:** `trigger: stage`, `start: 'top top'`, `end: '+=280%'`, `pin: true`, `scrub: 0.5`, `anticipatePin: 1`, `snap: { snapTo: 1/3, duration: 0.4, ease: 'power2.inOut' }`.
- **Timeline (3 steps, each 1 unit):** for step i → i+1: image i+1 `clip-path: inset(100% 0 0 0)` → `inset(0 0 0 0)` (wipes upward over the previous image, which scales 1 → 1.06); previous name loses active styling (ink → ink-soft, gold line width 28 → 0 px), next name gains it; descriptors slide inside masks (out up, in from below, `yPercent`); `.sunburst` `rotation += 7.5`.
- **Mobile:** same, `end: '+=240%'`. Names remain tappable links.
- **Reduced motion:** no pin; render four stacked rows (image + name + descriptor) normally.

### S3 Bestsellers track

- **Desktop ≥1024 only:** pin the section; the track moves horizontally with scroll.
  - Trigger: `start: 'top top+=80'`, `end: () => '+=' + (track.scrollWidth - window.innerWidth + 80)`, `pin: true`, `scrub: 0.6`, `anticipatePin: 1`.
  - Tween: `x: () => -(track.scrollWidth - window.innerWidth + 80)`, `ease: 'none'` (keep the returned tween as `containerAnimation`).
  - Per card: image inner `xPercent: -8 → 8` using `containerAnimation`, `start: 'left right'`, `end: 'right left'`, `scrub: true`.
  - Progress line: `scaleX: 0 → 1` (transform-origin left) along the same scroll.
- **Below 1024:** plain CSS `overflow-x:auto; scroll-snap-type:x mandatory`, cards `scroll-snap-align:start`. No GSAP.
- **Reduced motion:** use the CSS scroll-snap version at every width.

### S4 Legacy reveal

- **Structure:** section `100dvh`; image wrapper clipped with a cartouche `path()`; inner image; overlay; text in an `overflow:hidden` wrapper.
- **Clip path helper** (px, recomputed on refresh):
  `cartouchePath(x0,y0,x1,y1,n) = path('M x0+n,y0 H x1-n Q x1-n,y0+n x1,y0+n V y1-n Q x1-n,y1-n x1-n,y1 H x0+n Q x0+n,y1-n x0,y1-n V y0+n Q x0+n,y0+n x0+n,y0 Z')`
  Start: centred window 36% × 56% of the section, `n = 0.08 × window width`. End: full bleed (0,0,W,H), `n = 0`. Same command structure, so GSAP can interpolate the numbers. If a browser fails to interpolate `path()`, fall back to `inset(22% 32% round 0)` → `inset(0)`.
- **Trigger:** `start: 'top top'`, `end: '+=120%'`, `pin: true`, `scrub: 0.6`.
- **Timeline:** 0 → 1: clip-path expands; inner image `scale 1.25 → 1`. 0.5 → 0.8: overlay `opacity 0 → 1`. 0.6 → 0.9: text `yPercent 100 → 0`. The gold outline path fades `opacity 1 → 0` by 0.3.
- **Mobile:** same with `end: '+=100%'`; start window 60% × 44%.
- **Reduced motion:** no pin; show full-bleed image with text overlay.

### S5 Category header and image reveals

- **Header band:** `.sunburst` fragment `rotation: 0 → 20` with `scrub: 0.6` from `start: 'top top'` to `end: 'bottom top'`; arch image inner `yPercent: 0 → 10`. Text static.
- **Grid images:** implemented in TRD §11.4 (`ScrollTrigger.batch`, bottom-to-top clip reveal, stagger 0.06, once). Not applied after filter changes.
- **Reduced motion:** static.

### S6 Journey timeline

- **Structure:** stage `100dvh`, left rail + text block + right image. All entries are stacked layers (text and image) with only the first visible.
- **Trigger:** `start: 'top top'`, `end: () => '+=' + entries.length * 85 + '%'`, `pin: true`, `scrub: 0.6`, `snap: 1 / (entries.length - 1)`.
- **Per step:** (a) year digits roll vertically inside a masked line (`yPercent: 100 → 0`, previous `0 → -100`); (b) title and text slide in masks; (c) image `clip-path: inset(100% 0 0 0)` → `inset(0)`, previous scales 1 → 1.05; (d) rail line `scaleY` fills proportionally; node dot fills crimson.
- **Future entries:** across the last past → first future step, tween stage background `--cream` → `--maroon`, text → cream, year → `--gold-light`, rail → gold, over one step's duration.
- **Mobile:** image on top (40 dvh, arch), text below; same pin and snap; year 64 px.
- **Reduced motion:** unpinned vertical list; each entry stacked (year, title, text, image); future entries on a maroon band.

### S7 Order steps line

- SVG vertical path beside the three steps. Set `strokeDasharray = length`, `strokeDashoffset = length`. Tween `strokeDashoffset → 0`, `ease: 'none'`, trigger `start: 'top 70%'`, `end: 'bottom 60%'`, `scrub: true`.
- Each step's dot: `ScrollTrigger.create({ trigger: step, start: 'top 65%', toggleClass: { targets: dot, className: 'is-on' } })`; `.is-on` = crimson fill.
- **Reduced motion:** line fully drawn, all dots on.

## 9. States

| Context                           | State                     | Treatment                                                   |
| --------------------------------- | ------------------------- | ----------------------------------------------------------- |
| Cart count/total before hydration | loading                   | Neutral dash placeholder; no flash of "0"                   |
| Product grid first paint          | loading                   | 8 parchment arch skeletons (no shimmer; static)             |
| Image failed                      | error                     | `ImagePlaceholder` with product name                        |
| Search no results                 | empty                     | Message in §3.3                                             |
| Filters no results                | empty                     | "No items match these filters." + `Clear filters`           |
| Cart empty                        | empty                     | Copy in `design.md` §11                                     |
| Unavailable product               | disabled                  | Image dimmed, "Currently unavailable"                       |
| Contact submit                    | loading / success / error | Button spinner; success block; inline error + WhatsApp link |
| WhatsApp message too long         | warning                   | Toast with copy-and-paste instruction (TRD §7)              |

## 10. Draft copy deck (`content/copy.ts`; replace with client-confirmed text)

- Hero headline: "Sweets, the way they have always been made." / "Since {{ESTABLISHED_YEAR}}."
- Hero subline: "Sweets, a restaurant, a bakery and namkeen under one roof."
- Category descriptors: Sweets "Mithai for gifting and for every day." · Restaurant "Hot meals, chai and chaat, served through the day." · Bakery "Cakes, pastries and biscuits baked fresh." · Namkeen "Crisp snacks by the kilo for tea time."
- Legacy: "A family shop, still run like one." / "Read our story".
- How to order: steps as in H6.
- Footer line: "Sweets, food and baked goods from one family counter."

All of the above are placeholders for tone. Do not publish claims such as "fresh every morning" or "family-run" until the client confirms them (PRD §7).

## 11. Responsive summary

| Area             | Mobile (<640)             | Tablet (640 to 1023) | Desktop (≥1024)                 |
| ---------------- | ------------------------- | -------------------- | ------------------------------- |
| Header           | Icons only + menu sheet   | Icons + menu sheet   | Full nav + phone                |
| Hero             | Image first, then text    | Two columns          | Two columns, image bleeds right |
| S2               | Pinned, image above names | Pinned, two columns  | Pinned, two columns             |
| S3               | Native snap carousel      | Native snap carousel | Pinned horizontal track         |
| Listing grid     | 2 cols, filter sheet      | 3 cols, filter sheet | 3 to 4 cols, side panel         |
| Cart             | Stacked + sticky CTA      | Stacked              | Two columns, sticky summary     |
| Floating actions | Above mini-cart bar       | Bottom-right         | Bottom-right with tooltips      |

## 12. Final UI checklist

- [ ] No centred headline blocks; all text left-aligned.
- [ ] No all-caps labels, eyebrows, arrows on buttons, emoji, or single-word headline highlights.
- [ ] Only three uses of the script font.
- [ ] Cartouche only on hero image, S4 reveal and header badge.
- [ ] Only seven scroll moments exist; everything else is still.
- [ ] Every interactive control shows a visible focus ring and is ≥44 px.
- [ ] Reduced-motion layout verified for S1 to S7.
