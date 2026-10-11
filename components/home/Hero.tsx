
'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

import {
  ArrowUpRight,
  Phone,
  Star,
} from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { siteConfig, telUrl } from '@/config/site';
import { homeContent } from '@/content/home';
import { Container } from '@/components/layout/Container';

const { hero } = homeContent;

const hasYear = !siteConfig.establishedYear.startsWith('{{');

const heroVideoUrl =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() ?? '';

const heroPoster = '/images/hero/smb-store-hero.png';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /*
   * Respect the user's reduced-motion preference.
   * When enabled, pause the video and use the poster image instead.
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const syncPlayback = () => {
      if (motionQuery.matches) {
        video.pause();
        return;
      }

      const playback = video.play();
      playback?.catch(() => {
        // Keep the poster visible if playback is unavailable.
      });
    };

    syncPlayback();

    motionQuery.addEventListener('change', syncPlayback);

    return () => {
      motionQuery.removeEventListener('change', syncPlayback);
      video.pause();
    };
  }, []);

  /*
   * GSAP content reveal and background parallax.
   * All former right-side image refs and animations are removed.
   */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const content = contentRef.current;

    if (!section || !background || !content) return;

    gsap.registerPlugin(ScrollTrigger);

    let refreshFrame = 0;

    const ctx = gsap.context(() => {
      const heroItems = Array.from(
        content.querySelectorAll<HTMLElement>(
          '[data-hero-item]',
        ),
      );

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (reduceMotion) {
        gsap.set(heroItems, {
          opacity: 1,
          y: 0,
        });

        gsap.set(background, {
          scale: 1,
          yPercent: 0,
        });

        return;
      }

      // Initial state
      gsap.set(heroItems, {
        opacity: 0,
        y: 30,
      });

      gsap.set(background, {
        scale: 1.06,
        yPercent: 0,
      });

      // Intro animation
      const intro = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      });

      intro
        .to(background, {
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
        })
        .to(
          heroItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          '-=0.9',
        );

      // Video/background parallax
      gsap.to(background, {
        yPercent: 3,
        scale: 1.03,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Subtle content parallax
      gsap.to(content, {
        yPercent: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      refreshFrame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      if (refreshFrame) {
        cancelAnimationFrame(refreshFrame);
      }

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        h-[calc(100svh-72px)]
        min-h-[620px]
        overflow-hidden
        bg-maroon
      "
    >
      {/* ================================================
          VIDEO BACKGROUND
          ================================================ */}

      <div
        ref={backgroundRef}
        className="
          absolute
          inset-[-6%]
          -z-30
          overflow-hidden
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: `url('${heroPoster}')`,
        }}
      >
        {heroVideoUrl && (
          <video
            ref={videoRef}
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroPoster}
            tabIndex={-1}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              motion-reduce:hidden
            "
          >
            <source src={heroVideoUrl} />
          </video>
        )}
      </div>

      {/* ================================================
          MAROON OVERLAY
          Keep existing opacity unchanged.
          ================================================ */}

      <div className="absolute inset-0 -z-20 bg-maroon/10" />

      {/* ================================================
          LEFT READABILITY GRADIENT
          ================================================ */}

      <div
        className="
          absolute
          inset-0
          -z-10
          bg-gradient-to-r
          from-maroon/95
          via-maroon/70
          to-maroon/15
        "
      />

      {/* ================================================
          BOTTOM TRANSITION
          ================================================ */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          -z-10
          h-40
          bg-gradient-to-t
          from-maroon/75
          to-transparent
        "
      />

      {/* ================================================
          HERO CONTENT
          ================================================ */}

      <Container
        className="
          relative
          z-10
          flex
          h-full
          w-full
          max-w-none
          items-center
          px-5
          sm:px-8
          lg:px-14
          xl:px-20
          2xl:px-28
        "
      >
        <div
          ref={contentRef}
          className="
            relative
            z-30
            max-w-[520px]
            pt-14
            sm:pt-18
            lg:max-w-[550px]
            lg:pt-20
            xl:max-w-[600px]
            xl:pt-24
            2xl:pt-28
          "
        >
          {/* Eyebrow */}

          <div
            data-hero-item
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <span className="h-px w-9 bg-gold-light" />

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-gold-light
              "
            >
              Premium Indian Sweets
            </span>

            {hasYear && (
              <>
                <span
                  className="
                    hidden
                    h-1
                    w-1
                    rounded-full
                    bg-gold-light/70
                    sm:block
                  "
                />

                <span
                  className="
                    hidden
                    items-center
                    gap-1
                    text-xs
                    text-ivory/75
                    sm:inline-flex
                  "
                >
                  <Star
                    className="
                      h-3.5
                      w-3.5
                      fill-current
                      text-gold-light
                    "
                    strokeWidth={1.5}
                  />

                  Since {siteConfig.establishedYear}
                </span>
              </>
            )}
          </div>

          {/* Headline */}

          <h1
            data-hero-item
            className="
              max-w-[600px]
              font-display
              text-[clamp(3.3rem,6.5vw,6.5rem)]
              font-medium
              leading-[0.9]
              tracking-[-0.045em]
              text-ivory
            "
          >
            {hero.headline}
          </h1>

          {/* Description */}

          <p
            data-hero-item
            className="
              mt-7
              max-w-[510px]
              text-base
              leading-7
              text-ivory/80
              sm:text-lg
            "
          >
            {hero.subline}
          </p>

          {/* Actions */}

          <div
            data-hero-item
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <a
              href={hero.primaryCta.href}
              className="
                group
                inline-flex
                min-h-12
                items-center
                gap-3
                rounded-xl
                bg-gold-light
                px-6
                text-sm
                font-medium
                text-maroon
                transition-all
                duration-300
                hover:bg-ivory
              "
            >
              {hero.primaryCta.label}

              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-maroon
                  text-gold-light
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                <ArrowUpRight
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </span>
            </a>

            <a
              href={telUrl()}
              className="
                group
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-ivory
                transition-colors
                hover:text-gold-light
              "
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-ivory/30
                  transition-colors
                  group-hover:border-gold-light
                  group-hover:bg-gold-light/10
                "
              >
                <Phone
                  className="h-4 w-4"
                  strokeWidth={1.5}
                />
              </span>

              {hero.callLabel}
            </a>
          </div>

          {/* Brand tagline */}

          
        </div>
      </Container>
    </section>
  );
}
