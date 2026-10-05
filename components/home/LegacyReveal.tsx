import Image from 'next/image';
import Link from 'next/link';

import { homeContent } from '@/content/home';
import { Container } from '@/components/layout/Container';

const { legacy } = homeContent;

/**
 * Heritage / Legacy section.
 *
 * The provided traditional Indian mithai-shop photograph is used
 * as the full background image, with a subtle maroon overlay to
 * preserve SMB's brand palette and maintain text readability.
 */
export function LegacyReveal() {
  return (
    <section className="relative bg-cream py-10 lg:py-16">
      <Container>
        <div
          className="
            group
            relative
            min-h-[500px]
            overflow-hidden
            rounded-soft
            bg-maroon
            shadow-2xl

            lg:min-h-[560px]
          "
        >
          {/* =====================================================
              BACKGROUND IMAGE
          ===================================================== */}

          <Image
            src="/images/legacy/sweets-display.jpg"
            alt="Traditional Indian sweets displayed in a heritage mithai shop"
            fill
            priority
            sizes="(min-width: 1024px) 1320px, 100vw"
            className="
              object-cover
              object-center
              transition-transform
              duration-[1400ms]
              ease-out
              group-hover:scale-[1.025]
            "
          />

          {/* =====================================================
              BRAND OVERLAY
              -----------------------------------------------------
              Solid/semi-transparent maroon instead of the old
              gradient. This keeps the photograph visible while
              preserving the SMB colour palette.
          ===================================================== */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-maroon/60
            "
          />

          {/* =====================================================
              LEFT-SIDE READABILITY OVERLAY
              -----------------------------------------------------
              Slightly stronger maroon on the text side without
              using the old full gradient treatment.
          ===================================================== */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-linear-to-r
              from-maroon/75
              via-maroon/45
              to-transparent
            "
          />

          {/* =====================================================
              SUBTLE IMAGE FRAME
          ===================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-soft
              ring-1
              ring-inset
              ring-ivory/15
            "
          />

          {/* =====================================================
              CONTENT
          ===================================================== */}

          <div
            className="
              relative
              z-10
              flex
              min-h-[500px]
              max-w-2xl
              flex-col
              items-start
              justify-center
              gap-4
              p-8
              text-ivory

              md:min-h-[560px]
              md:p-10

              lg:p-14
              xl:p-16
            "
          >
            {/* Eyebrow */}

            <span
              className="
                text-small
                font-medium
                uppercase
                tracking-widest
                text-gold-light
              "
            >
              {legacy.eyebrow}
            </span>

            {/* Heading */}

            <h2
              className="
                max-w-[16ch]
                font-display
                text-h2
                text-ivory
              "
            >
              {legacy.title}
            </h2>

            {/* Story */}

            <p
              className="
                max-w-[52ch]
                text-body
                text-parchment/95
              "
            >
              {legacy.body}
            </p>

            {/* CTA */}

            <Link
              href={legacy.ctaHref}
              className="
                mt-2
                inline-flex
                min-h-12
                items-center
                justify-center
                rounded-ctl
                bg-gold-light
                px-6
                text-button
                font-semibold
                text-maroon
                transition-all
                duration-[160ms]

                hover:bg-ivory
                hover:shadow-lg

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-gold-light
                focus-visible:ring-offset-2
                focus-visible:ring-offset-maroon
              "
            >
              {legacy.ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}