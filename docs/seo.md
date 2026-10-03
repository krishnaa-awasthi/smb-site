# Local SEO Spec: Shiv Mishthan Bhandar (Kanpur)

> Companion to `prd.md`, `trd.md`, `design.md`, `UI.md`, `userflow.md`. This is a **later-phase requirement**, but section 9 lists small hooks that must be built into V1 so nothing has to be redone. Do not invent business facts: use the tokens in section 3.

## 0. Goal and honest expectations

**Goal:** when people in and around Kanpur (roughly a 15 to 20 km radius of the main shop) search for sweets, a bakery or a family restaurant, the shop shows up at or near the top, especially in the **Google Maps "local pack"** (the map and three listings), and then in the normal results.

Be clear with the client:

- **Nobody can guarantee position #1.** Google decides. What we can do is remove every obstacle and build the strongest signals.
- Local ranking depends on three things: **relevance** (does the business match the search), **distance** (how close it is to the person searching), **prominence** (how well known and trusted it is: reviews, mentions, links, brand searches).
- **The website cannot "lock" visibility to a radius.** Distance is mostly decided by the searcher's location, so a shop in Kanpur naturally shows to people near it. We reinforce this with the address, service-area signals and local content, and we avoid targeting other cities.
- The **Google Business Profile (GBP)** is the biggest single lever for "near me" and map results. The website supports it but does not replace it.
- Expect first movement in weeks and stable results in about 3 to 6 months. Competitive terms (for example "sweets shop in Kanpur") are slower than long-tail ones ("kaju katli gift box Kanpur").

## 1. Target searches

| Business line | English queries                                                                                             | Hindi / Hinglish queries                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Sweets        | sweet shop in Kanpur, best mithai shop in Kanpur, kaju katli Kanpur, sweets near me, gift box sweets Kanpur | कानपुर मिठाई की दुकान, kanpur ki mithai, mithai shop near me |
| Bakery        | bakery in Kanpur, cake shop near me, birthday cake Kanpur, eggless cake Kanpur, pastry shop Kanpur          | कानपुर केक शॉप, cake order kanpur                            |
| Restaurant    | family restaurant in Kanpur, veg restaurant Kanpur, chole bhature Kanpur, thali Kanpur                      | कानपुर फैमिली रेस्टोरेंट, veg restaurant near me             |
| Namkeen       | namkeen shop in Kanpur, bhujia Kanpur, snacks shop near me                                                  | कानपुर नमकीन दुकान                                           |
| Brand         | shiv mishthan bhandar, shiv mishthan bhandar kanpur (+ locality)                                            | शिव मिष्ठान भंडार                                            |

Each query type maps to a page: Home (all four lines), `/sweets`, `/bakery`, `/restaurant`, `/namkeen`. Product pages catch long-tail searches.

## 2. What the website can and cannot do

| The website can                                                                                  | The website cannot                                |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| Say clearly, in crawlable text, that the shop is in `{{CITY}}` and name the localities it serves | Force Google to show it above a competitor        |
| Provide structured data (address, hours, geo-coordinates, service radius)                        | Control what appears for searchers outside Kanpur |
| Load fast on mobile, which Google measures                                                       | Replace reviews and a verified Google profile     |
| Give Google one consistent name, address and phone number                                        | Work if the address differs across the web        |

## 3. Inputs needed from the client (tokens)

| Token                                            | Meaning                                                                                                   |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `{{CITY}}`                                       | Kanpur                                                                                                    |
| `{{LOCALITY}}`                                   | The shop's neighbourhood or area name                                                                     |
| `{{FULL_ADDRESS}}`                               | Exact address as printed on the shop's licence and signboard. **Must be identical everywhere**            |
| `{{PINCODE}}`                                    | Postal code                                                                                               |
| `{{LAT}}`, `{{LNG}}`                             | Shop coordinates (from Google Maps)                                                                       |
| `{{SERVICE_RADIUS_KM}}`                          | 15 to 20, whatever the shop really delivers within                                                        |
| `{{SERVED_AREAS}}`                               | List of localities within that radius the client truly serves (confirm each; do not copy from a template) |
| `{{GBP_URL}}`                                    | Link to the verified Google Business Profile                                                              |
| `{{REVIEW_LINK}}`                                | Direct "write a review" link from the GBP                                                                 |
| `{{PHONE}}`, `{{HOURS}}`, `{{ESTABLISHED_YEAR}}` | As in PRD §7                                                                                              |

## 4. On-site SEO

### 4.1 Page titles and meta descriptions (templates, in `content/seo.ts`)

Keep titles around 60 characters and descriptions around 150. Natural wording, one city mention, no keyword lists.

| Page       | Title                                                        | Description            |
| ---------- | ------------------------------------------------------------ | ---------------------- |
| Home       | `Sweets, Bakery & Family Restaurant in {{CITY}}              | Shiv Mishthan Bhandar` | `{{LEGACY_LINE}} Order mithai, cakes, namkeen and meals in {{CITY}}. Chat on WhatsApp to order.`                         |
| Sweets     | `Sweet Shop in {{CITY}}: Mithai & Gift Boxes                 | Shiv Mishthan Bhandar` | `Kaju katli, ladoo, rasgulla and gift boxes from {{LOCALITY}}, {{CITY}}. See sizes and prices and order on WhatsApp.`    |
| Bakery     | `Bakery & Cake Shop in {{CITY}}                              | Shiv Mishthan Bhandar` | `Cakes, pastries, cookies and brownies in {{CITY}}. Eggless options available. Order on WhatsApp.` _(only if confirmed)_ |
| Restaurant | `Family Restaurant in {{CITY}}                               | Shiv Mishthan Bhandar` | `Veg meals, thali, chaat and chai at {{LOCALITY}}, {{CITY}}. See the menu and order on WhatsApp.`                        |
| Namkeen    | `Namkeen & Snacks Shop in {{CITY}}                           | Shiv Mishthan Bhandar` | `Bhujia, mixtures, chips and tea-time snacks by weight in {{CITY}}. Order on WhatsApp.`                                  |
| Product    | `{{Product}} in {{CITY}}                                     | Shiv Mishthan Bhandar` | One honest sentence about the item plus price and sizes                                                                  |
| About      | `Our Story: A {{CITY}} Sweet Shop Since {{ESTABLISHED_YEAR}} | Shiv Mishthan Bhandar` | Short history line                                                                                                       |
| Contact    | `Contact & Location, {{LOCALITY}}, {{CITY}}                  | Shiv Mishthan Bhandar` | `Address, hours, phone and WhatsApp for Shiv Mishthan Bhandar, {{LOCALITY}}, {{CITY}}.`                                  |

### 4.2 Headings and visible text

- One `h1` per page. Home `h1` stays the brand headline from `UI.md` (it does not need the city), but the **first visible paragraph** (hero subline) must mention the city: "Sweets, a restaurant, a bakery and namkeen in {{LOCALITY}}, {{CITY}}."
- **Category SEO text block** under the product grid on each category page: 80 to 150 words, left-aligned, max 62 characters per line, written like a person (what the section offers, what the shop is known for **if the client confirms it**, where it is, how to order). Visible in the page, not hidden behind tabs or white text.
- **Address block in text** (never only inside an image) in the footer and on `/contact`: name, `{{FULL_ADDRESS}}`, phone, hours.
- About page: state the founding year, the city, and the neighbourhood history in real sentences.
- Product descriptions: unique per product, 25 to 60 words, no copied manufacturer text.

### 4.3 Local content (small, useful, real)

- `/contact` includes "Areas we deliver to" listing `{{SERVED_AREAS}}` and the radius, plus an "Open in Maps" link, directions in plain words ("opposite {{LANDMARK}}") and parking or landmark notes if any.
- Optional later page `/delivery-areas` with the same list and delivery timings. **One** real page, not one page per locality (thin pages like "sweets in X", "sweets in Y" with the same text are doorway pages and can hurt).
- Seasonal pages once a year, updated not recreated: Diwali gift boxes, Rakhi sweets, Holi gujiya, wedding and bulk orders, birthday cakes. URL example: `/festive/diwali-gift-boxes`.
- Short FAQ block on Home or contact: delivery area, minimum order, how to order on WhatsApp, how far in advance for cakes, eggless options. Real answers only.

### 4.4 Images

- Descriptive file names (`kaju-katli-500g-kanpur.jpg`), real `alt` text ("Box of kaju katli at Shiv Mishthan Bhandar"), no stuffing.
- Include original photos of the shop front, counter, kitchen and team (they also feed the GBP and build trust).

### 4.5 Internal links

Home → each category; categories → products and back; product → related products; footer repeats the four categories, About and Contact; Contact and About link to WhatsApp and call actions.

## 5. Structured data (JSON-LD)

Render on Home (and reuse the business entity on Contact). Use the shop's real values only.

```json
{
  "@context": "https://schema.org",
  "@type": ["Store", "FoodEstablishment"],
  "@id": "{{SITE_URL}}/#business",
  "name": "Shiv Mishthan Bhandar",
  "url": "{{SITE_URL}}",
  "logo": "{{SITE_URL}}/brand/logo.png",
  "image": ["{{SITE_URL}}/images/shop/front.jpg"],
  "description": "Sweets, bakery, namkeen and family restaurant in {{CITY}}.",
  "telephone": "{{PHONE}}",
  "priceRange": "₹₹",
  "servesCuisine": ["Indian", "Sweets", "Bakery"],
  "foundingDate": "{{ESTABLISHED_YEAR}}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{FULL_ADDRESS}}",
    "addressLocality": "{{CITY}}",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "{{PINCODE}}",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{{LAT}}",
    "longitude": "{{LNG}}"
  },
  "hasMap": "{{MAPS_URL}}",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "{{LAT}}",
      "longitude": "{{LNG}}"
    },
    "geoRadius": "{{SERVICE_RADIUS_KM}}000"
  },
  "openingHoursSpecification": [/* fill from {{HOURS}} */],
  "sameAs": ["{{GBP_URL}}", "{{INSTAGRAM}}", "{{FACEBOOK}}"]
}
```

Also add: `BreadcrumbList` on category and product pages; `Product` + `Offer` on product pages (already in `trd.md` §13); `Menu` data for the restaurant is optional. Validate with Google's Rich Results Test and Schema.org validator. Hours and phone in JSON-LD must match the website text and the GBP exactly.

## 6. Technical SEO checklist

- Statically generated pages with all product and text content in the HTML (already the plan in `trd.md` §8). Category pages must render the first 12 products on the server, not only after JavaScript runs.
- `<html lang="en-IN">`. Canonical URL on every page. Filtered URLs (`?sub=`, `?sort=`) use `rel="canonical"` to the clean category URL, and `noindex` for parameter combinations.
- `sitemap.xml` includes all categories, products, About, Contact (and festive pages). `robots.txt` allows everything except `/cart` and `/api`. `/cart` is `noindex`.
- HTTPS, one domain version (no duplicate `www` and non-`www`), permanent redirects.
- Core Web Vitals targets from the PRD (LCP under 2.5 s, CLS under 0.05). Test on a mid-range Android on 4G.
- Heavy scroll animations must not hide content from crawlers: all text exists in the DOM at load; pinned sections never replace real markup.
- Social previews: Open Graph and Twitter tags with the logo-based image.
- Register the site in **Google Search Console** and **Bing Webmaster Tools**, submit the sitemap.

## 7. Google Business Profile (highest-impact, done by the client with our help)

Check the current rules in Google's own guidelines before each step, since categories and policies change.

1. **Claim and verify** the profile (video or postcard verification can take days). Use the real shop address; never a virtual office or fake address.
2. **Name** exactly as on the signboard: "Shiv Mishthan Bhandar". No keywords added.
3. **Categories:** one primary category that best matches the main business (for example a sweet shop), plus secondary ones that genuinely apply (bakery, family restaurant, snack or namkeen shop). Confirm which exist at setup time.
4. **Hours** including festival and special hours; keep updated.
5. **Phone, website** (the `/` home URL, with a UTM tag so GBP traffic is measurable), and attributes such as takeaway, delivery, dine-in, vegetarian options.
6. **Description:** 750 characters, written like a person: what the shop is, when it started, what it sells, where it is. No promotional links or phone numbers inside it.
7. **Products and services:** add key items or categories with photos and prices.
8. **Photos:** shop front, interior, counter, kitchen, products, team; add new ones monthly. Photos are among the strongest engagement signals.
9. **Posts:** weekly or on each festival or offer.
10. **Q&A and messaging:** answer questions; keep messaging aligned with WhatsApp support.
11. **Reviews:** see section 8.

If the restaurant, bakery and sweets are separate counters within one premises, discuss with the client whether one profile or separate profiles is allowed under Google's current rules before creating more than one.

## 8. Reviews, citations and off-site signals

- **Reviews (prominence):** ask happy customers to review via `{{REVIEW_LINK}}`. Put a QR code on the counter and bills, and a "Review us on Google" link on the WhatsApp order confirmation message. Reply to every review, politely, including the bad ones. **Never** buy reviews, offer rewards for reviews, or review gate (asking only happy customers); it breaks Google's rules and can suspend the profile.
- **Citations (consistency):** list the shop with the **identical name, address and phone** on Bing Places, Apple Business Connect, Justdial, Sulekha, Facebook and Instagram, Zomato and Swiggy (if the restaurant is listed), and relevant Kanpur directories. One mismatch dilutes trust.
- **Local links and mentions:** Kanpur food bloggers, local news and event pages, college and society events, wedding planners, and festival gift lists. Real relationships, not link farms.
- **Brand demand:** consistent signage, QR codes in the shop, Instagram activity. People searching the shop name directly is a prominence signal.

## 9. What to build into V1 now (so SEO does not require a rewrite)

1. Add `{{CITY}}`, `{{LOCALITY}}`, `{{FULL_ADDRESS}}`, `{{PINCODE}}`, `{{LAT}}`, `{{LNG}}`, `{{SERVICE_RADIUS_KM}}`, `{{SERVED_AREAS}}`, `{{GBP_URL}}`, `{{REVIEW_LINK}}` to `config/site.ts`.
2. Create `content/seo.ts` holding every title and description from §4.1 and the category SEO text blocks from §4.2.
3. Implement `generateMetadata` per page from `content/seo.ts`; `lang="en-IN"`; canonical URLs; `noindex` on `/cart` and filtered URL combinations.
4. Render the Home `LocalBusiness` JSON-LD from §5 (values from config), `BreadcrumbList` on category and product pages.
5. Add the **category SEO text block** to listing pages (see `UI.md` §6.1) and the **Areas we deliver to** block to `/contact`.
6. Put the address as selectable text in the footer and contact page; include the city in the hero subline.
7. Add `sitemap.ts` entries for all products; keep the `robots.ts` rules in §6.
8. Keep `NEXT_PUBLIC_GA_ID` and add Search Console verification meta via env (`NEXT_PUBLIC_GSC_VERIFICATION`).
9. Use UTM on the GBP website link: `?utm_source=google&utm_medium=organic&utm_campaign=gbp`.

## 10. Roadmap

| Phase             | When                | Work                                                                                                                                                              |
| ----------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. Foundations    | During the build    | Section 9 hooks, real copy, real photos                                                                                                                           |
| B. Launch week    | Right after go-live | Search Console, Bing, sitemap submitted; GBP claimed, verified, filled; first citations; QR review cards printed                                                  |
| C. First 3 months | Monthly             | New GBP photos and posts; review requests and replies; 2 to 4 local mentions or links; festival page updates; fix any Search Console issues                       |
| D. Growth         | After 3 to 6 months | Review rankings for the target queries; consider a Hindi version of key pages and GBP description; `delivery-areas` page; optional paid local ads as a supplement |

## 11. Measurement

- **Google Search Console:** impressions, clicks, average position for queries containing "kanpur"; pages performance; index coverage.
- **GBP performance:** searches that showed the profile, calls, direction requests, website clicks, messages.
- **Website analytics:** `call_click`, `whatsapp_click`, `begin_checkout` events (already in `userflow.md` §8), split by landing page.
- **Rank checks:** manually from different spots in Kanpur (incognito, phone, location on) for the five target queries, once a month. Paid local-grid tools are optional.
- **Targets (12 weeks, adjust with the client):** profile fully completed; 25+ genuine reviews with a 4.3+ average; GBP and website indexed with no errors; top 10 for the brand search and for at least a few long-tail product queries.

## 12. Do not

- Do not stuff cities and keywords into text, titles, alt text or footers.
- Do not create dozens of near-duplicate locality pages.
- Do not use a fake address, a PO box or a virtual office on the profile.
- Do not hide text, buy links or reviews, or incentivise reviews.
- Do not claim awards, years or "best in Kanpur" unless true and provable.
- Do not let the address, phone or hours differ between the website, GBP and directories.
- Do not target other cities. The business is local to Kanpur and its surroundings.
