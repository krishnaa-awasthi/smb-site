# Design System: Shiv Mishthan Bhandar

> Look, feel and tokens. Layout of each page is in `UI.md`. Read `prd.md` first. Every value here is a decision; do not substitute "similar" colours, fonts or radii.

## 1. Design intent

**Concept: "Sunburst and cartouche."** The logo gives the whole visual language: a pale yellow **sunburst** of rays behind an ornate gold **cartouche** (a frame with scooped, concave corners), crimson brush-script, a flared serif, and saffron sweets. The site uses exactly those elements, sparingly:

- The **sunburst** becomes a slow, quiet backdrop that turns as the visitor scrolls.
- The **cartouche** becomes the signature image frame, used only at a few key moments.
- Everything else is calm: warm cream paper, deep maroon for weight, crimson only where attention is needed.

**Feeling:** walking into an old, well-kept mithai shop that has had a thoughtful renovation. Warm, unhurried, confident. Premium through restraint, not through gold gradients or big type.

**The one memorable thing:** the turning sunburst and the cartouche-framed photograph. Everything around them stays quiet.

## 2. Logo analysis (supplied file)

Elements: square badge. Background of alternating pale-yellow and cream rays. Centre cartouche in cream with a tan-gold outline. "Shiv" in crimson brush script; "Mishthan Bhandar" in dark brown-black flared serif; a small gold flourish; two halved saffron-brown sweets on a dark tray; tagline "Happiness is also Sweet" in crimson calligraphic script below.

Colours sampled from the file: rays `#FDF6B8` and `#FEFADB`, parchment `#F6E9C0`, gold-tan border `#C6AE72` to `#C0855F`, sweet orange to saffron `#FB7213`, script red `#E9270A`, text `#0D0D0D`.

Usage rules

- The file is low resolution (about 290×280). **Never upscale it above 140 px.** Request a vector or transparent version from the client (PRD §9).
- Header: show the logo as a small badge (56 px high), clipped to the cartouche shape. Footer: at most 120 px. Never stretch, recolour, outline or add effects.
- The logo's red is pure and bright. The site uses a **deeper crimson** (below) so large areas feel less loud. The logo itself stays untouched.
- Keep clear space around the logo equal to half its height.

## 3. Colour

Derived from the logo, then calmed. The page is mostly cream and ink; saturated colours are small.

| Token            | Hex       | Name         | Use                                                                                  |
| ---------------- | --------- | ------------ | ------------------------------------------------------------------------------------ |
| `--cream`        | `#FEFADB` | Malai        | Default page background                                                              |
| `--ivory`        | `#FFFDF0` | Ivory        | Raised surfaces: drawer, inputs, sheets                                              |
| `--parchment`    | `#F6E9C0` | Parchment    | Image backdrops, alternate sections, placeholders                                    |
| `--ray`          | `#FDF6B8` | Ray          | Sunburst stripes only                                                                |
| `--crimson`      | `#B3202A` | Shiv crimson | Primary button, prices, active states, links, focus ring                             |
| `--crimson-deep` | `#8F1721` | Deep crimson | Button hover and pressed                                                             |
| `--maroon`       | `#5A1420` | Maroon       | Dark sections (About timeline end, footer), large headings on cream allowed          |
| `--saffron`      | `#E8841C` | Saffron      | Small fills only: badge dots, progress, sunburst accent ray. **Never text on cream** |
| `--gold`         | `#C49A5E` | Antique gold | Hairlines, ornaments, cartouche outline. **Never body text**                         |
| `--gold-light`   | `#E3C48A` | Light gold   | Text and ornaments on maroon                                                         |
| `--ink`          | `#2B1712` | Kajal        | Body and headings on cream                                                           |
| `--ink-soft`     | `#6A4B40` | Soft ink     | Secondary text, captions                                                             |
| `--leaf`         | `#1F7A4D` | Leaf         | Veg mark, WhatsApp button (muted on purpose)                                         |
| `--egg`          | `#9A5B1E` | Egg          | Egg mark                                                                             |
| `--error`        | `#A3261F` | Error        | Validation text (paired with an icon)                                                |

Proportion on any screen: about 65% cream/ivory/parchment, 20% ink text, 10% maroon, under 5% crimson, under 1% saffron.

Contrast (verified targets): ink on cream ≥ 12:1; ink-soft on cream ≥ 6.5:1; crimson on cream ≥ 6:1; cream on crimson ≥ 6:1; cream on maroon ≥ 12:1; gold-light on maroon ≥ 7:1. Gold and saffron never carry text on cream.

Do not introduce any other hues. No blues, purples, teals, gradients between unrelated hues, or neon. Gradients are allowed only as: cream→parchment soft fades, and the sunburst itself.

## 4. Typography

| Role                 | Font                                       | Notes                                                                                                                                          |
| -------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Display and headings | **Marcellus** (Google Fonts)               | Flared Roman serif that echoes "Mishthan Bhandar" in the logo. Single weight (400): create hierarchy with size and spacing, never faux bold    |
| Body and UI          | **Hind** (latin + devanagari), 400/500/600 | Friendly humanist sans, reads well on small phones, supports Devanagari for future Hindi                                                       |
| Script accent        | **Pinyon Script**                          | **Only** for the tagline "Happiness is also Sweet" (footer and one hero moment) and the founder's signature on About. Max three uses site-wide |

Scale (fluid with `clamp`; mobile to desktop)

| Style          | Size                                     | Line height | Tracking | Font                       |
| -------------- | ---------------------------------------- | ----------- | -------- | -------------------------- |
| Hero headline  | `clamp(2.25rem, 1.4rem + 3.4vw, 3.9rem)` | 1.08        | -0.01em  | Marcellus                  |
| H2             | `clamp(1.75rem, 1.2rem + 2vw, 2.75rem)`  | 1.15        | -0.005em | Marcellus                  |
| H3             | `clamp(1.25rem, 1.1rem + 0.8vw, 1.6rem)` | 1.25        | 0        | Marcellus                  |
| Product name   | `1.0625rem`                              | 1.3         | 0        | Marcellus                  |
| Body           | `1.0625rem` (17 px)                      | 1.65        | 0        | Hind 400                   |
| Small, caption | `0.875rem`                               | 1.5         | 0.005em  | Hind 400                   |
| Price          | `1.0625rem`                              | 1           | 0        | Hind 600, tabular numerals |
| Button         | `0.9375rem`                              | 1           | 0.01em   | Hind 600                   |

Rules

- **Left-aligned everywhere.** No centred headline blocks.
- Max line length: 62 characters for body, 22 ch for hero headline column widths via `max-width` in `ch`.
- Sentence case for all headings, buttons, labels and nav. **No all-caps labels, no tracked-out caps.**
- No eyebrow or overline labels above headings.
- Do **not** highlight a single word of a headline in a different colour, italic or bold.
- Numerals: use tabular-lining for prices (`font-variant-numeric: tabular-nums`).
- Indian rupee symbol `₹` rendered from Hind; verify it displays in both fonts.

## 5. Shape language

Three shapes, each with a job. Do not mix in others.

1. **Cartouche** (from the logo frame): rectangle with concave scooped corners. Used for the hero image, the legacy reveal and the header logo badge. Nowhere else.
   ```html
   <svg width="0" height="0">
     <clipPath id="cartouche" clipPathUnits="objectBoundingBox">
       <path
         d="M0.08,0 H0.92 Q0.92,0.08 1,0.08 V0.92 Q0.92,0.92 0.92,1 H0.08 Q0.08,0.92 0,0.92 V0.08 Q0.08,0.08 0.08,0 Z"
       />
     </clipPath>
   </svg>
   ```
   Apply with `clip-path: url(#cartouche)`. Add a 1.5 px `--gold` outline as a sibling absolutely-positioned SVG path of the same shape, inset 10 px, to echo the logo's double border.
2. **Arch** (round top): `border-radius: 999px 999px 0 0` on image frames, for product images, category images, About photos and timeline. A nod to mithai-shop doorways.
3. **Soft-square** for controls: `border-radius: 2px` on buttons, inputs, selects, chips and badges. Crisp, not pill-shaped.

Never use: fully rounded pills, `rounded-2xl` card tiles, circles for anything except the floating action buttons and the cart count.

## 6. Layout principles

- **Grid:** 12 columns, max content width 1320 px, side padding 20 px (mobile), 32 px (tablet), 48 px (desktop). Gutters 16 / 24 / 32.
- **Asymmetry over symmetry.** Prefer 5/7, 4/8 or 3/9 splits, with images bleeding off one edge. Avoid equal three-column feature rows.
- **Alignment:** left. Text blocks sit on the grid's left edge; images and captions offset on the opposite side. Centre alignment is allowed only for icons inside their own buttons.
- **Rhythm:** vertical section spacing alternates, not uniform: 72, 120, 88, 140 px on desktop (48 to 96 px mobile). Sections have different shapes: a full-bleed band, a pinned stage, a two-column spread. Never a stack of identical "title + content + button" blocks.
- **No section separators** except the small gold `Ornament` (logo flourish) used at most twice per page, left-aligned.
- Product listings are **dense and functional** (marketplace convention). Keep the same grid and spacing for every category so it is easy to scan.

## 7. Imagery and texture

Photography is 70% of the premium feel. Brief for the client's photographer, and for selecting placeholders:

- Warm natural light from the side, slightly top-down or 45°. Real brass, copper, steel thalis, banana leaf, terracotta, marble. Hands in frame where natural. Shallow depth of field.
- Consistent colour grade: warm highlights, deep shadows, no blue cast, no heavy HDR.
- Product shots for listings: one consistent backdrop (`--parchment` tone), same camera angle per category, same crop (4:5).
- Shop and history photos: real, slightly imperfect. Black-and-white or sepia originals are welcome in the About timeline.
- No stock photos of unrelated food, no AI-generated food images, no images of people that are not the owners or staff.
- Texture: a 3% opacity paper-grain PNG on `--cream` page background (tileable, under 20 KB). Optional.

## 8. Icons and ornaments

- Line icons from Lucide at 1.5 px stroke, 20 px default, colour `--ink`. No emoji anywhere in the UI.
- WhatsApp and phone glyphs are custom inline SVGs.
- **Ornament:** a small flourish (about 96×24) traced from the logo's gold swirl, in `--gold`. Used as a quiet divider, left-aligned.
- **Veg and egg marks:** standard Indian food-labelling square with a dot (green `--leaf` for veg, brown `--egg` for egg), 14 px, always with `aria-label`.

## 9. Motion language

Purpose: make the site feel **alive but unhurried**, and make scrolling itself pleasurable. The client specifically wants scroll-triggered motion on image cards and sections that goes beyond basic fade-ins.

Principles

1. **Few, meaningful, large.** Seven signature moments (specified in `UI.md` §8). Everything else is still.
2. **Scroll drives it.** Prefer scrubbed or pinned motion tied to scroll position over timed entrance effects.
3. **Masks and clips, not fades.** Reveal things by opening a clip-path or sliding inside an overflow mask. Move images inside their frames (parallax) rather than moving frames.
4. **Slow and soft.** Easing `power3.out` for reveals, `none` (linear) for scrubbed, `power2.inOut` for swaps.
5. **Functional micro-motion** responds to user actions only: add-to-cart confirmation, drawer slide, stepper change, focus. 150 to 250 ms.

Timing tokens

| Token           | Value                       | Use                                |
| --------------- | --------------------------- | ---------------------------------- |
| `--ease-out`    | `cubic-bezier(.22,.7,.2,1)` | CSS transitions                    |
| `--dur-fast`    | 160 ms                      | Hover, press, focus                |
| `--dur-base`    | 280 ms                      | Drawer, sheet, swaps               |
| `--dur-slow`    | 700 to 1100 ms              | Mask reveals                       |
| Scrub smoothing | `scrub: 0.6`                | Soft catch-up on scrubbed triggers |

**Forbidden motion:** generic fade-and-slide-up on every block; staggered fade-in lists; hover lift/shadow on every card; bouncing or shaking; looping pulses on buttons; parallax on text; animated gradients; cursor followers; auto-advancing carousels; scroll-jacking that disables native scroll.

**Reduced motion:** all signature moments render their final state statically; Lenis disabled; no rotation, no pinning.

## 10. Elevation, borders and surfaces

- No heavy shadows. Allowed: drawer and sheet `0 0 0 1px rgba(90,20,32,.06), 0 24px 48px -24px rgba(90,20,32,.28)` (warm maroon-tinted, not grey).
- Dividers and outlines: 1 px `--gold` at 35% opacity.
- Inputs: `--ivory` fill, 1 px `--gold` border at 60%, 2 px radius; focus = 2 px `--crimson` outline.
- Product cards have **no box**. Image arch on top, text underneath, hairline under the row of a grid only when it aids scanning.
- Overlay backdrop: `rgba(43,23,18,.45)`.

## 11. Voice and microcopy

Voice: a warm, proud shopkeeper. Plain, specific, first-person plural ("we"), no hype. Short sentences. Mentions the shop's real craft only when the client has confirmed the fact.

| Situation               | Copy                                                                   |
| ----------------------- | ---------------------------------------------------------------------- |
| Add button              | Add to cart                                                            |
| After add               | Added (button shows stepper) · toast: "Kaju Katli (500 g) added"       |
| Cart empty              | "Your cart is empty. Start with our sweets." plus link "Browse sweets" |
| Drawer primary          | Proceed to checkout                                                    |
| Cart page primary       | Send order on WhatsApp                                                 |
| Delivery note           | Delivery charges, if any, are confirmed by the shop on WhatsApp.       |
| Validation: name        | Please tell us your name so we can address your order.                 |
| Validation: address     | Add a delivery address, or choose Store pickup.                        |
| Contact success         | Thank you. We will call or message you soon.                           |
| Contact error           | We could not send that. Please try again or message us on WhatsApp.    |
| Unavailable             | Currently unavailable                                                  |
| No results              | No items match these filters. Clear filters to see everything.         |
| 404                     | "That page is not on our counter." plus "Go to home"                   |
| Floating actions (aria) | Call the shop · Chat on WhatsApp                                       |

Words and phrases to avoid: discover, explore, elevate, curated, crafted with love, indulge, delight your taste buds, experience the magic, tradition meets innovation, world-class, artisanal (unless confirmed), "Shop now" as a generic headline CTA, exclamation marks, emoji.

## 12. Anti-patterns (hard rules for the builder)

The client rejected anything that looks like a generated template. Do **not** produce:

- A centred hero with a huge headline, a subline and two centred buttons.
- Gradient blobs, mesh gradients, glassmorphism, neon glows, purple or blue palettes.
- Identical rounded-corner cards with the same soft grey shadow in a uniform grid (outside the product listing) or three feature cards with icons in a row.
- A row of four count-up statistics.
- A tracked-out all-caps label above each heading, numbered "01 / 02 / 03" markers (except the real timeline and the 3-step order guide), or middle-dot meta strings.
- A single word of a headline coloured differently.
- Arrows appended to button text (for example "Shop now →").
- Fade-up on every section, hover lift on every card, pulsing CTAs.
- Testimonial carousels, newsletter popups, cookie-banner walls, chat widgets.
- Lorem ipsum, generic emoji icons, stock imagery that does not match the shop.
- The terracotta-on-warm-white SaaS look. The brand palette here is yellow-cream, crimson and maroon; keep it that way.

Human cues to include deliberately

- Asymmetric layouts, images overlapping a section boundary by 24 to 48 px.
- Photo captions in small Hind with real details ("Sugar syrup on the kadhai, early morning") when the client supplies them.
- The founder's signature in Pinyon Script on About.
- Real opening hours and address visible in the footer and contact page.

## 13. Accessibility floor

Visible focus ring on everything interactive. Minimum 44 px touch targets. Text never below 14 px. Respect `prefers-reduced-motion` and `prefers-color-scheme` is ignored (light only). Images have meaningful `alt`. Do not convey meaning by colour alone.

## 14. Design tokens (copy into `app/globals.css`)

```css
@import "tailwindcss";

:root {
  --cream: #fefadb;
  --ivory: #fffdf0;
  --parchment: #f6e9c0;
  --ray: #fdf6b8;
  --crimson: #b3202a;
  --crimson-deep: #8f1721;
  --maroon: #5a1420;
  --saffron: #e8841c;
  --gold: #c49a5e;
  --gold-light: #e3c48a;
  --ink: #2b1712;
  --ink-soft: #6a4b40;
  --leaf: #1f7a4d;
  --egg: #9a5b1e;
  --error: #a3261f;

  --ease-out: cubic-bezier(0.22, 0.7, 0.2, 1);
  --dur-fast: 160ms;
  --dur-base: 280ms;
  --dur-slow: 900ms;

  --radius-ctl: 2px;
  --container: 1320px;
}

@theme inline {
  --color-cream: var(--cream);
  --color-ivory: var(--ivory);
  --color-parchment: var(--parchment);
  --color-ray: var(--ray);
  --color-crimson: var(--crimson);
  --color-crimson-deep: var(--crimson-deep);
  --color-maroon: var(--maroon);
  --color-saffron: var(--saffron);
  --color-gold: var(--gold);
  --color-gold-light: var(--gold-light);
  --color-ink: var(--ink);
  --color-ink-soft: var(--ink-soft);
  --color-leaf: var(--leaf);
  --color-egg: var(--egg);
  --color-error: var(--error);
  --font-display: var(--font-marcellus), Georgia, serif;
  --font-body: var(--font-hind), system-ui, sans-serif;
  --font-script: var(--font-pinyon), cursive;
}

html {
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-body);
}
body {
  font-size: 1.0625rem;
  line-height: 1.65;
}
h1,
h2,
h3 {
  font-family: var(--font-display);
  font-weight: 400;
}
:focus-visible {
  outline: 2px solid var(--crimson);
  outline-offset: 2px;
}

/* Sunburst: 24 ray pairs. Rotate this element with GSAP; fade its edges with a mask. */
.sunburst {
  background: repeating-conic-gradient(
    from 0deg at 50% 50%,
    var(--ray) 0 7.5deg,
    var(--cream) 7.5deg 15deg
  );
  -webkit-mask-image: radial-gradient(
    circle at 50% 50%,
    #000 0,
    #000 35%,
    transparent 72%
  );
  mask-image: radial-gradient(
    circle at 50% 50%,
    #000 0,
    #000 35%,
    transparent 72%
  );
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Tailwind usage: `bg-cream text-ink`, `text-crimson`, `bg-maroon text-cream`, `border-gold/35`, `font-display`, `font-script`. Do not use Tailwind's default palette colours anywhere.
