'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExpoScaleEase } from 'gsap/EasePack';

import { homeContent } from '@/content/home';
import { Container } from '@/components/layout/Container';

import styles from './LegacyReveal.module.css';

const { legacy } = homeContent;

const legacyImages = [
  {
    src: '/images/legacy/sweets-display.jpg',
    position: 'center',
  },
  {
    src: '/images/houses/sweets.jpg',
    position: 'center',
  },
  {
    src: '/images/houses/restaurant.jpg',
    position: 'center',
  },
  {
    src: '/images/houses/bakery.jpg',
    position: 'center',
  },
  {
    src: '/images/houses/namkeen.jpg',
    position: 'center',
  },
  {
    src: '/images/legacy/sweets-display.jpg',
    position: 'left center',
  },
  {
    src: '/images/houses/sweets.jpg',
    position: 'right center',
  },
  {
    src: '/images/houses/restaurant.jpg',
    position: 'right center',
  },
] as const;

export function LegacyReveal() {
  const frameRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const gallery = galleryRef.current;

    if (!frame || !gallery) return;

    gsap.registerPlugin(Flip, ScrollTrigger, ExpoScaleEase);

    // Keep the gallery static for users who prefer reduced motion.
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    if (reducedMotion.matches) return;

    let ctx: { revert: () => void } | undefined;
    let resizeTimer: number | undefined;

    const createAnimation = () => {
      // Remove the previous Flip animation before recalculating layout.
      ctx?.revert();
      gallery.classList.remove(styles.galleryFinal);

      const items = Array.from(
        gallery.querySelectorAll<HTMLElement>('[data-bento-item]'),
      );

      ctx = gsap.context(() => {
        // Temporarily apply the final grid layout and capture its positions.
        gallery.classList.add(styles.galleryFinal);
        const finalState = Flip.getState(items);
        gallery.classList.remove(styles.galleryFinal);

        // Animate from the initial Bento layout toward the final layout.
        const flip = Flip.to(finalState, {
          simple: true,
          duration: 1,
          ease: 'expoScale(1, 5)',
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: gallery,
              start: 'center center',
              end: '+=100%',
              scrub: true,
              pin: frame,
              invalidateOnRefresh: true,
            },
          })
          .add(flip);

        return () => {
          gsap.set(items, { clearProps: 'all' });
        };
      }, frame);
    };

    createAnimation();

    // Recalculate Flip's start/end layouts when the viewport changes.
    const handleResize = () => {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        createAnimation();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimer);
      ctx?.revert();
      gallery.classList.remove(styles.galleryFinal);
    };
  }, []);

  return (
    <section className={`${styles.section} bg-cream`}>
      <Container>
        <div
          ref={frameRef}
          className={`${styles.frame} relative isolate bg-maroon shadow-2xl`}
        >
          {/* Scroll-scrubbed Bento gallery */}
          <div
            ref={galleryRef}
            className={styles.gallery}
            aria-hidden="true"
          >
            {legacyImages.map((photo, index) => (
              <div
                key={`${photo.src}-${index}`}
                data-bento-item
                className={styles.galleryItem}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 1320px, 100vw"
                  draggable={false}
                  className="object-cover"
                  style={{ objectPosition: photo.position }}
                />
              </div>
            ))}
          </div>

          {/* Brand overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-maroon/10"
          />

          {/* Additional contrast behind the copy */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] bg-linear-to-r from-maroon/75 via-maroon/45 to-transparent"
          />

          {/* Legacy content stays above the animated photographs */}
          <div
            className="
              relative z-10
              flex min-h-[500px] max-w-2xl
              flex-col items-start justify-center gap-4
              p-8 text-ivory
              md:min-h-[560px] md:p-10
              lg:p-14 xl:p-16
            "
          >
            <span className="text-small font-medium uppercase tracking-widest text-gold-light">
              {legacy.eyebrow}
            </span>

            <h2 className="max-w-[16ch] font-display text-h2 text-ivory">
              {legacy.title}
            </h2>

            <p className="max-w-[52ch] text-body text-parchment/95">
              {legacy.body}
            </p>

            <Link
              href={legacy.ctaHref}
              className="
                mt-2 inline-flex min-h-12
                items-center justify-center
                rounded-ctl bg-gold-light px-6
                text-button font-semibold text-maroon
                transition-all duration-[160ms]
                hover:bg-ivory hover:shadow-lg
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

          {/* Subtle border remains fixed above the animation */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0 z-20
              rounded-soft ring-1 ring-inset ring-ivory/15
            "
          />
        </div>
      </Container>
    </section>
  );
}