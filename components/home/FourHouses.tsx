'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { cn } from '@/lib/cn';
import { categories } from '@/data/categories';
import { homeContent, houseItems } from '@/content/home';
import { ImageArch } from '@/components/brand/ImageArch';
import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder';
import { ButtonLink } from '@/components/ui/Button';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { houses } = homeContent;

/* ================================================================
   HOUSE IMAGES
   ----------------------------------------------------------------
   All production images are stored locally inside:

   public/images/houses/

   Browser paths:

   /images/houses/sweets.jpg
   /images/houses/restaurant.jpg
   /images/houses/bakery.jpg
   /images/houses/namkeen.jpg
================================================================ */

const HOUSE_IMAGES: Record<
  string,
  {
    src: string;
    alt: string;
  }
> = {
  sweets: {
    src: '/images/houses/sweets.jpg',
    alt: 'Traditional Indian sweets displayed at a sweet shop',
  },

  restaurant: {
    src: '/images/houses/restaurant.jpg',
    alt: 'Crispy dosa served with chutney and sambar',
  },

  bakery: {
    src: '/images/houses/bakery.jpg',
    alt: 'Assorted cakes displayed in a bakery',
  },

  namkeen: {
    src: '/images/houses/namkeen.jpg',
    alt: 'Assorted Indian savory snacks',
  },
};

/* ================================================================
   FOUR HOUSES
================================================================ */

export function FourHouses() {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /*
       * Desktop + normal motion only.
       *
       * Mobile/tablet use native horizontal scrolling.
       * Reduced-motion users get the non-pinned layout.
       */
      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          const vp = viewport.current;
          const tr = track.current;
          const barEl = bar.current;
          const progressEl = progress.current;
          const section = root.current;

          if (
            !vp ||
            !tr ||
            !barEl ||
            !progressEl ||
            !section
          ) {
            return;
          }

          /* -------------------------------------------------------
             Panels and navigation items
          ------------------------------------------------------- */

          const panels = gsap.utils.toArray<HTMLElement>(
            '[data-house-panel]',
            tr,
          );

          const navItems = gsap.utils.toArray<HTMLElement>(
            '[data-house-nav]',
            barEl,
          );

          /* -------------------------------------------------------
             Convert the native horizontal row into a pinned
             GSAP horizontal scrolling stage.
          ------------------------------------------------------- */

          vp.style.overflow = 'hidden';
          vp.style.scrollSnapType = 'none';
          barEl.style.display = 'flex';

          /* -------------------------------------------------------
             Horizontal distance
          ------------------------------------------------------- */

          const distance = () =>
            Math.max(
              0,
              tr.scrollWidth - vp.clientWidth,
            );

          const end = () =>
            `+=${Math.max(1, distance())}`;

          /* -------------------------------------------------------
             Main horizontal movement
          ------------------------------------------------------- */

          const move = gsap.to(tr, {
            x: () => -distance(),
            ease: 'none',

            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          /* -------------------------------------------------------
             Image drift
             -------------------------------------------------------
             Each image is wider than its frame on desktop.
             As the card moves horizontally, the image subtly
             shifts in the opposite direction.
          ------------------------------------------------------- */

          panels.forEach((panel) => {
            const img =
              panel.querySelector<HTMLElement>(
                '[data-house-img]',
              );

            if (!img) {
              return;
            }

            gsap.fromTo(
              img,
              {
                xPercent: -8,
              },
              {
                xPercent: 8,
                ease: 'none',

                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: move,
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                },
              },
            );
          });

          /* -------------------------------------------------------
             Bottom progress line
          ------------------------------------------------------- */

          gsap.fromTo(
            progressEl,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: 'none',

              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end,
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );

          /* -------------------------------------------------------
             Calculate where each card becomes active
          ------------------------------------------------------- */

          let stops: number[] = [];

          const calcStops = () => {
            const d = Math.max(1, distance());

            stops = panels.map((panel) =>
              gsap.utils.clamp(
                0,
                1,
                (
                  panel.offsetLeft +
                  panel.offsetWidth / 2 -
                  vp.clientWidth / 2
                ) / d,
              ),
            );
          };

          /* -------------------------------------------------------
             Set active navigation item
          ------------------------------------------------------- */

          const setActive = (
            progressValue: number,
          ) => {
            let best = 0;
            let bestDiff = Infinity;

            stops.forEach((stop, index) => {
              const diff = Math.abs(
                progressValue - stop,
              );

              if (diff < bestDiff) {
                bestDiff = diff;
                best = index;
              }
            });

            navItems.forEach(
              (navItem, index) => {
                navItem.classList.toggle(
                  'is-active',
                  index === best,
                );
              },
            );
          };

          /* -------------------------------------------------------
             Navigation ScrollTrigger
          ------------------------------------------------------- */

          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end,
            invalidateOnRefresh: true,

            onRefresh: (self) => {
              calcStops();
              setActive(self.progress);
            },

            onUpdate: (self) => {
              setActive(self.progress);
            },
          });

          /* -------------------------------------------------------
             Refresh after fonts are ready.

             Font loading can change text widths and therefore
             change the horizontal distance.
          ------------------------------------------------------- */

          document.fonts?.ready.then(() => {
            ScrollTrigger.refresh();
          });

          /* -------------------------------------------------------
             Cleanup
          ------------------------------------------------------- */

          return () => {
            vp.style.removeProperty('overflow');
            vp.style.removeProperty(
              'scroll-snap-type',
            );

            barEl.style.removeProperty('display');

            navItems.forEach((navItem) => {
              navItem.classList.remove(
                'is-active',
              );
            });
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    {
      scope: root,
    },
  );

  return (
    <section
      ref={root}
      aria-label={houses.title}
      className="
        relative
        bg-surface-lowest
        py-10

        lg:flex
        lg:h-svh
        lg:flex-col
        lg:justify-center
        lg:py-0
        lg:pt-20
      "
    >
      {/* ==========================================================
          MOBILE / TABLET HEADING
      ========================================================== */}

      <div
        className="
          mx-auto
          mb-8
          w-full
          max-w-[1320px]
          px-5
          lg:hidden
        "
      >
        <span
          className="
            mb-1
            block
            text-small
            font-medium
            uppercase
            tracking-widest
            text-egg
          "
        >
          {houses.eyebrow}
        </span>

        <h2
          className="
            font-display
            text-h2
            text-ink
          "
        >
          {houses.title}
        </h2>

        <p
          className="
            mt-2
            max-w-sm
            text-small
            text-ink-variant
          "
        >
          {houses.intro}
        </p>
      </div>

      {/* ==========================================================
          HORIZONTAL VIEWPORT
      ========================================================== */}

      <div
        ref={viewport}
        role="region"
        aria-label="The four houses. Scroll sideways to see each one."
        tabIndex={0}
        className="
          w-full
          snap-x
          snap-mandatory
          overflow-x-auto
          pb-6

          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          lg:pb-0
        "
      >
        {/* ========================================================
            HORIZONTAL TRACK
        ======================================================== */}

        <div
          ref={track}
          className="
            relative
            flex
            w-max
            items-start
            gap-5
            px-5

            lg:items-center
            lg:gap-12
            lg:px-12
            lg:pr-[14vw]
          "
        >
          {/* ======================================================
              INTRO PANEL — DESKTOP ONLY
          ====================================================== */}

          <div
            className="
              hidden
              w-[min(30vw,420px)]
              shrink-0
              flex-col
              items-start
              gap-3

              lg:flex
            "
          >
            <span
              className="
                text-small
                font-medium
                uppercase
                tracking-widest
                text-egg
              "
            >
              {houses.eyebrow}
            </span>

            <h2
              className="
                font-display
                text-h2
                text-ink
              "
            >
              {houses.title}
            </h2>

            <p
              className="
                max-w-[34ch]
                text-body
                text-ink-variant
              "
            >
              {houses.intro}
            </p>

            <p
              className="
                mt-4
                flex
                items-center
                gap-2
                text-small
                text-ink-soft
              "
            >
              {houses.scrollHint}

              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            </p>
          </div>

          {/* ======================================================
              HOUSE CARDS
          ====================================================== */}

          {categories.map(
            (category, index) => {
              const item =
                houseItems[category.slug];

              /*
               * Prefer local production images.
               *
               * If a category isn't configured in HOUSE_IMAGES,
               * fall back to the image defined in houseItems.
               */
              const houseImage =
                HOUSE_IMAGES[category.slug];

              return (
                <article
                  key={category.slug}
                  data-house-panel
                  className={cn(
                    `
                      w-[78vw]
                      max-w-[340px]
                      shrink-0
                      snap-start

                      lg:w-auto
                      lg:max-w-none
                    `,
                    index % 2 === 1 &&
                      'lg:mt-14',
                  )}
                >
                  {/* =================================================
                      IMAGE ARCH
                  ================================================= */}

                  <ImageArch
                    aspect="aspect-[3/4]"
                    className="
                      group
                      rounded-b-soft
                      shadow-lg

                      lg:h-[48svh]
                      lg:w-[36svh]
                    "
                  >
                    {/*
                     * The image wrapper is intentionally wider than
                     * the arch on desktop so GSAP can move the image
                     * horizontally during the scroll.
                     */}

                    <div
                      data-house-img
                      className="
                        absolute
                        inset-y-0
                        left-0
                        w-full

                        lg:-left-[10%]
                        lg:w-[120%]
                      "
                    >
                      {houseImage ? (
                        <Image
                          src={houseImage.src}
                          alt={houseImage.alt}
                          fill
                          /*
                           * The first image is the first visual
                           * candidate in this section, so load it
                           * eagerly. The remaining house images
                           * stay lazy-loaded.
                           */
                          loading={
                            index === 0
                              ? 'eager'
                              : 'lazy'
                          }
                          fetchPriority={
                            index === 0
                              ? 'high'
                              : 'auto'
                          }
                          sizes="(min-width: 1280px) 36svh, (min-width: 1024px) 40svh, 78vw"
                          className="
                            object-cover
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-[1.04]
                          "
                        />
                      ) : item.imageSrc ? (
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          fill
                          loading="lazy"
                          sizes="(min-width: 1280px) 36svh, (min-width: 1024px) 40svh, 78vw"
                          className="
                            object-cover
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-[1.04]
                          "
                        />
                      ) : (
                        <ImagePlaceholder
                          name={item.imageAlt}
                        />
                      )}
                    </div>
                  </ImageArch>

                  {/* =================================================
                      HOUSE INFORMATION
                  ================================================= */}

                  <div
                    className="
                      mt-4
                      flex
                      max-w-[34ch]
                      flex-col
                      items-start
                      gap-1.5
                    "
                  >
                    <h3
                      className="
                        font-display
                        text-h2
                        text-ink
                      "
                    >
                      {category.name}
                    </h3>

                    <p
                      className="
                        text-small
                        text-ink-variant
                      "
                    >
                      {category.intro}
                    </p>

                    <ButtonLink
                      href={`/${category.slug}`}
                      variant="text"
                    >
                      {item.ctaLabel}
                    </ButtonLink>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>

      {/* ==========================================================
          DESKTOP PROGRESS / NAVIGATION
      ========================================================== */}

      <div
        ref={bar}
        aria-hidden="true"
        className="
          absolute
          inset-x-12
          bottom-8
          hidden
          items-center
          gap-6
        "
      >
        {/* House names */}

        <ul
          className="
            flex
            gap-6
            text-small
          "
        >
          {categories.map(
            (category) => (
              <li
                key={category.slug}
                data-house-nav
                className="
                  text-ink-soft
                  transition-colors
                  duration-[160ms]

                  [&.is-active]:text-primary
                "
              >
                {category.name}
              </li>
            ),
          )}
        </ul>

        {/* Progress line */}

        <span
          className="
            relative
            h-0.5
            flex-1
            bg-gold/40
          "
        >
          <span
            ref={progress}
            className="
              absolute
              inset-0
              origin-left
              bg-primary
            "
          />
        </span>
      </div>
    </section>
  );
}