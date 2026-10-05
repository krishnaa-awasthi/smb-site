import Link from 'next/link';
import { Gift } from 'lucide-react';

import { offers } from '@/content/offers';
import { Container } from '@/components/layout/Container';

/**
 * Offer banner
 *
 * Uses the provided Diwali promotional artwork as the background.
 *
 * The artwork is intentionally used as a CSS background rather
 * than an <Image /> element so the existing banner dimensions,
 * content layout, and CTA button remain unchanged.
 */
export function OfferBanner() {
  if (offers.length === 0) return null;

  return (
    <section className="bg-surface-low py-4">
      <Container className="flex flex-col gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="
              relative
              flex
              flex-col
              items-start
              justify-between
              gap-4
              overflow-hidden
              rounded-ctl
              bg-[#4B006E]
              bg-cover
              bg-center
              bg-no-repeat
              p-6
              shadow-sm

              md:flex-row
              md:items-center
            "
            style={{
              backgroundImage:
                "url('/images/offers/diwali-offer-banner.png')",
            }}
          >
            {/* =====================================================
                CONTENT
                -----------------------------------------------------
                Kept exactly in the existing banner structure.
            ===================================================== */}

            <div className="relative z-10 flex items-center gap-4">
              {/* Gift icon */}

              <span
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary/10
                  text-primary
                "
              >
                <Gift
                  aria-hidden="true"
                  className="h-6 w-6"
                  strokeWidth={1.5}
                />
              </span>

              {/* Offer information */}

              <div>
                <h2
                  className="
                    font-display
                    text-h3
                    text-ivory
                  "
                >
                  {offer.title}
                </h2>

                <p
                  className="
                    text-small
                    text-parchment
                  "
                >
                  {offer.detail}
                </p>
              </div>
            </div>

            {/* =====================================================
                CTA BUTTON
                -----------------------------------------------------
                Same size and structure as the original.
            ===================================================== */}

            <Link
              href={offer.href}
              className="
                relative
                z-10
                inline-flex
                min-h-11
                shrink-0
                items-center
                justify-center
                rounded-ctl
                bg-secondary
                px-6
                text-button
                font-semibold
                text-ivory
                transition-colors
                duration-[160ms]
                hover:bg-primary
              "
            >
              {offer.ctaLabel}
            </Link>
          </div>
        ))}
      </Container>
    </section>
  );
}