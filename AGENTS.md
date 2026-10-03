# AGENTS.md: Shiv Mishthan Bhandar website

You are building a website for **Shiv Mishthan Bhandar**, a legacy sweet shop in Kanpur with four lines of business: Sweets, Restaurant, Bakery and Namkeen. The site is a catalogue plus a cart whose checkout opens WhatsApp with the order pre-written. There are **no online payments** and no user accounts.

## 1. Read the specs first

All specs are in `/docs`. Read them in this order before writing code, and re-read the relevant parts before each task:

1. `docs/prd.md`: what to build and acceptance criteria
2. `docs/userflow.md`: how people move through it, validation rules, exact WhatsApp message
3. `docs/design.md`: colours, fonts, shapes, motion language, anti-patterns
4. `docs/UI.md`: page layouts, components, the seven scroll animations
5. `docs/trd.md`: stack, structure, data models, code, build order
6. `docs/seo.md`: local SEO (Kanpur); only the V1 hooks in §9 for now

If documents disagree, the precedence is **PRD > userflow > TRD > design > UI**; for SEO matters `seo.md` wins. The logo is `docs/logo.png` (copy it to `public/brand/logo.png`).

## 2. Hard rules

- **Do not add** features, pages, sections, libraries or animations that are not in the specs. If something is missing, choose the simplest option, leave `// TODO(client):` or `// TODO(spec):`, and mention it in your report.
- **Never invent business facts** (year founded, ingredients, awards, addresses, phone numbers, prices, "family-run", "fresh every morning"). Use the `{{TOKENS}}` and sample data described in the PRD. Mark sample data with `// SAMPLE: replace`.
- **Stack is fixed:** Next.js (App Router) + TypeScript strict + Tailwind + GSAP/ScrollTrigger + Lenis + Zustand + react-hook-form + zod + nodemailer. No Framer Motion, no component library, no extra state or animation libraries.
- **Design is fixed:** use only the tokens in `design.md` §14. No Tailwind default palette colours. Fonts: Marcellus, Hind, Pinyon Script (script max three uses).
- **Anti-patterns are bugs:** centred hero or headline blocks, big centred CTA buttons, gradient blobs, glassmorphism, identical rounded-card grids outside the product listing, all-caps or tracked labels, eyebrow labels, arrows on buttons, emoji, fade-up on every section, hover lift on every card. Everything is left-aligned (`design.md` §12).
- **Motion:** exactly the seven signature moments in `UI.md` §8, nothing else. Respect `prefers-reduced-motion`. Animate only `transform`, `opacity`, `clip-path`.
- **Money** is whole rupees (integers). The cart stores ids and quantities only; prices are looked up from product data.
- **Accessibility and performance** targets in the PRD are requirements, not polish.

## 3. How to work

- Follow the build order in `trd.md` §17, **one step at a time**. Do not jump ahead.
- Keep each step small and committed separately with a clear message.
- After each step run: `pnpm lint`, `pnpm typecheck` (`tsc --noEmit`), `pnpm test` (when tests exist) and `pnpm build`. Fix problems before reporting.
- Server components by default; `'use client'` only when needed. No `any` (except the `__lenis` window handle). All editable text lives in `content/` or `config/`.
- Do not refactor or restyle things from earlier steps unless a spec requires it.
- If a spec is ambiguous, contradictory or technically impossible, **stop and ask** instead of guessing. List the options and your recommendation.

## 4. Report format after every step

1. What you built (files and components).
2. How to see it (route or command).
3. Checks you ran and their results.
4. What you could **not** verify (for example real-phone scroll behaviour) and what a human should test.
5. Deviations from the specs, if any, and why.
6. TODOs left behind.

## 5. Commands

```
pnpm dev        # local dev server
pnpm build      # production build
pnpm lint
pnpm typecheck  # tsc --noEmit
pnpm test       # vitest
```
