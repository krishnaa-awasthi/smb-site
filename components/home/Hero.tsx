'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import { ArrowUpRight, Phone, Star } from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { siteConfig, telUrl } from '@/config/site';
import { homeContent } from '@/content/home';
import { Container } from '@/components/layout/Container';

const { hero } = homeContent;

const hasYear = !siteConfig.establishedYear.startsWith('{{');

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Existing hero images
  const platterRef = useRef<HTMLDivElement>(null);
  const ladooRef = useRef<HTMLDivElement>(null);
  const dosaRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);
  const gulabJamunRef = useRef<HTMLDivElement>(null);

  // New hero images
  const strawberryCakeRef = useRef<HTMLDivElement>(null);
  const premiumSweetsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const content = contentRef.current;

    const platter = platterRef.current;
    const ladoo = ladooRef.current;
    const dosa = dosaRef.current;
    const cake = cakeRef.current;
    const gulabJamun = gulabJamunRef.current;

    const strawberryCake = strawberryCakeRef.current;
    const premiumSweets = premiumSweetsRef.current;

    if (!section || !background || !content) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /*
       * =======================================================
       * HERO CONTENT REVEAL
       * =======================================================
       */

      const heroItems = Array.from(
        content.querySelectorAll<HTMLElement>('[data-hero-item]'),
      );

      /*
       * =======================================================
       * REDUCED MOTION
       * =======================================================
       */

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
        });

        gsap.set(
          [
            platter,
            ladoo,
            dosa,
            cake,
            gulabJamun,
            strawberryCake,
            premiumSweets,
          ].filter(Boolean),
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
          },
        );

        return;
      }

      gsap.set(heroItems, {
        opacity: 0,
        y: 30,
      });

      /*
       * =======================================================
       * BACKGROUND INITIAL STATE
       * =======================================================
       */

      gsap.set(background, {
        scale: 1.06,
      });

      /*
       * =======================================================
       * SWEETS INITIAL STATE
       * =======================================================
       */

      if (platter) {
        gsap.set(platter, {
          opacity: 0,
          scale: 0.85,
          y: -30,
        });
      }

      if (ladoo) {
        gsap.set(ladoo, {
          opacity: 0,
          x: -50,
          y: -25,
          rotation: -8,
        });
      }

      if (dosa) {
        gsap.set(dosa, {
          opacity: 0,
          x: 60,
          y: -20,
          rotation: 7,
        });
      }

      if (cake) {
        gsap.set(cake, {
          opacity: 0,
          x: -50,
          y: 45,
          rotation: -6,
        });
      }

      if (gulabJamun) {
        gsap.set(gulabJamun, {
          opacity: 0,
          x: 60,
          y: 45,
          rotation: 6,
        });
      }

      /*
       * =======================================================
       * NEW IMAGE INITIAL STATE
       * =======================================================
       */

      if (strawberryCake) {
        gsap.set(strawberryCake, {
          opacity: 0,
          x: 70,
          y: -40,
          scale: 0.82,
          rotation: 8,
        });
      }

      if (premiumSweets) {
        gsap.set(premiumSweets, {
          opacity: 0,
          x: -70,
          y: 35,
          scale: 0.82,
          rotation: -8,
        });
      }

      /*
       * =======================================================
       * INTRO TIMELINE
       * =======================================================
       */

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

      /*
       * =======================================================
       * PENTAGON IMAGE REVEAL
       * =======================================================
       */

      if (platter) {
        intro.to(
          platter,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'back.out(1.4)',
          },
          '-=0.55',
        );
      }

      if (ladoo) {
        intro.to(
          ladoo,
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.65',
        );
      }

      if (dosa) {
        intro.to(
          dosa,
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.7',
        );
      }

      if (cake) {
        intro.to(
          cake,
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.7',
        );
      }

      if (gulabJamun) {
        intro.to(
          gulabJamun,
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.7',
        );
      }

      /*
       * =======================================================
       * NEW IMAGE REVEAL
       * =======================================================
       */

      if (strawberryCake) {
        intro.to(
          strawberryCake,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.95,
            ease: 'back.out(1.6)',
          },
          '-=0.5',
        );
      }

      if (premiumSweets) {
        intro.to(
          premiumSweets,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.95,
            ease: 'back.out(1.6)',
          },
          '-=0.65',
        );
      }

      /*
       * =======================================================
       * BACKGROUND PARALLAX
       * =======================================================
       */

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

      /*
       * =======================================================
       * CONTENT PARALLAX
       * =======================================================
       */

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

      /*
       * =======================================================
       * PENTAGON PARALLAX
       * =======================================================
       */

      if (platter) {
        gsap.to(platter, {
          y: -14,
          rotation: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3,
          },
        });
      }

      if (ladoo) {
        gsap.to(ladoo, {
          y: -22,
          rotation: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      }

      if (dosa) {
        gsap.to(dosa, {
          y: 18,
          rotation: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      if (cake) {
        gsap.to(cake, {
          y: -12,
          rotation: -2,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      }

      if (gulabJamun) {
        gsap.to(gulabJamun, {
          y: 20,
          rotation: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      /*
       * =======================================================
       * NEW IMAGE SCROLL PARALLAX
       * =======================================================
       */

      if (strawberryCake) {
        gsap.to(strawberryCake, {
          y: -24,
          rotation: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      if (premiumSweets) {
        gsap.to(premiumSweets, {
          y: 26,
          rotation: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      /*
       * =======================================================
       * NEW IMAGE FLOATING ANIMATION
       * =======================================================
       *
       * The floating animation is applied to the inner <img>,
       * while scroll parallax is applied to the outer wrapper.
       * This prevents the two GSAP animations from fighting
       * over the same transform.
       * =======================================================
       */

      if (strawberryCake) {
        const image = strawberryCake.querySelector('img');

        if (image) {
          gsap.to(image, {
            y: -9,
            rotation: -1.8,
            duration: 2.7,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        }
      }

      if (premiumSweets) {
        const image = premiumSweets.querySelector('img');

        if (image) {
          gsap.to(image, {
            y: 11,
            rotation: 1.8,
            duration: 3.1,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        }
      }

      /*
       * =======================================================
       * REFRESH
       * =======================================================
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[620px] h-[calc(100svh-72px)] overflow-hidden bg-maroon"
    >
      {/* =====================================================
          BACKGROUND IMAGE
          ===================================================== */}

      <div
        ref={backgroundRef}
        className="absolute inset-[-6%] -z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/hero/smb-store-hero.png')",
        }}
      />

      {/* =====================================================
          MAROON OVERLAY
          ===================================================== */}

      <div className="absolute inset-0 -z-20 bg-maroon/55" />

      {/* =====================================================
          LEFT READABILITY GRADIENT
          ===================================================== */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-maroon/95 via-maroon/70 to-maroon/15" />

      {/* =====================================================
          BOTTOM TRANSITION
          ===================================================== */}

      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-maroon/75 to-transparent" />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <Container className="relative z-10 flex h-full w-full max-w-none items-center px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        {/* ===================================================
            LEFT SIDE
            =================================================== */}

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
          {/* =================================================
              EYEBROW
              ================================================= */}

          <div
            data-hero-item
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-9 bg-gold-light" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-light">
              Premium Indian Sweets
            </span>

            {hasYear && (
              <>
                <span className="hidden h-1 w-1 rounded-full bg-gold-light/70 sm:block" />

                <span className="hidden items-center gap-1 text-xs text-ivory/75 sm:inline-flex">
                  <Star
                    className="h-3.5 w-3.5 fill-current text-gold-light"
                    strokeWidth={1.5}
                  />

                  Since {siteConfig.establishedYear}
                </span>
              </>
            )}
          </div>

          {/* =================================================
              MAIN HEADLINE
              ================================================= */}

          <h1
            data-hero-item
            className="max-w-[600px] font-display text-[clamp(3.3rem,6.5vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.045em] text-ivory"
          >
            {hero.headline}
          </h1>

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <p
            data-hero-item
            className="mt-7 max-w-[510px] text-base leading-7 text-ivory/80 sm:text-lg"
          >
            {hero.subline}
          </p>

          {/* =================================================
              ACTIONS
              ================================================= */}

          <div
            data-hero-item
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <a
              href={hero.primaryCta.href}
              className="group inline-flex min-h-12 items-center gap-3 rounded-xl bg-gold-light px-6 text-sm font-medium text-maroon transition-all duration-300 hover:bg-ivory"
            >
              {hero.primaryCta.label}

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-maroon text-gold-light transition-transform duration-300 group-hover:translate-x-1">
                <ArrowUpRight
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </span>
            </a>

            <a
              href={telUrl()}
              className="group inline-flex items-center gap-2 text-sm font-medium text-ivory transition-colors hover:text-gold-light"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 transition-colors group-hover:border-gold-light group-hover:bg-gold-light/10">
                <Phone
                  className="h-4 w-4"
                  strokeWidth={1.5}
                />
              </span>

              {hero.callLabel}
            </a>
          </div>

          {/* =================================================
              BRAND TAGLINE
              ================================================= */}

          <p
            data-hero-item
            className="mt-12 font-script text-3xl text-gold-light sm:text-4xl"
          >
            {siteConfig.tagline}
          </p>
        </div>

        {/* ===================================================
            IMAGE COMPOSITION
            =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            right-[-55px]
            top-1/2
            hidden
            h-[590px]
            w-[590px]
            -translate-y-1/2
            lg:block
            xl:right-[-10px]
            2xl:right-12
          "
        >
          {/* =================================================
              STRAWBERRY CREAM CAKE
              ================================================= */}

          <div
            ref={strawberryCakeRef}
            className="
              absolute
              right-[15px]
              top-[35px]
              z-10
              w-[135px]
              xl:right-[20px]
              xl:w-[160px]
            "                                                           
          >
            <Image
              src="/images/hero/hero-strawberry-cake.png"
              alt="Fresh cream cake topped with strawberries"
              width={600}
              height={430}
              sizes="180px"
              className="h-auto w-full drop-shadow-[0_22px_30px_rgba(0,0,0,0.42)]"
            />
          </div>

          {/* =================================================
              PREMIUM SWEETS
              ================================================= */}

          <div
            ref={premiumSweetsRef}
            className="
              absolute
              bottom-[18px]
              left-[-95px]
              z-5
              w-[155px]
              xl:left-[-95px]
              xl:w-[175px]
            "
          >
            <Image
              src="/images/hero/hero-premium-sweets.png"
              alt="Assorted Indian sweets on a serving plate"
              width={600}
              height={450}
              sizes="205px"
              className="h-auto w-full drop-shadow-[0_22px_30px_rgba(0,0,0,0.42)]"
            />
          </div>

          {/* =================================================
              TOP — MITHAI PLATTER
              ================================================= */}

          <div
            ref={platterRef}
            className="
              absolute
              left-1/2
              top-[-20px]
              z-30
              w-[205px]
              -translate-x-1/2
              xl:w-[235px]
            "
          >
            <Image
              src="/images/hero/mithai-platter.png"
              alt="Assorted Indian sweets"
              width={560}
              height={560}
              priority
              sizes="235px"
              className="h-auto w-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)]"
            />
          </div>

          {/* =================================================
              TOP LEFT — LADOO
              ================================================= */}

          <div
            ref={ladooRef}
            className="
              absolute
              left-[-15px]
              top-[125px]
              z-20
              w-[220px]
              xl:left-[-5px]
              xl:w-[245px]
            "
          >
            <Image
              src="/images/hero/ladoo.png"
              alt="Indian ladoos"
              width={653}
              height={420}
              priority
              sizes="245px"
              className="h-auto w-full drop-shadow-[0_20px_26px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* =================================================
              TOP RIGHT — DOSA
              ================================================= */}

          <div
            ref={dosaRef}
            className="
              absolute
              right-[-20px]
              top-[130px]
              z-20
              w-[250px]
              xl:right-[-5px]
              xl:w-[280px]
            "
          >
            <Image
              src="/images/hero/dosa.png"
              alt="South Indian dosa with chutney and sambar"
              width={560}
              height={560}
              priority
              sizes="280px"
              className="h-auto w-full drop-shadow-[0_20px_26px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* =================================================
              BOTTOM LEFT — EXISTING CAKE
              ================================================= */}

          <div
            ref={cakeRef}
            className="
              absolute
              bottom-[15px]
              left-[10px]
              z-10
              w-[235px]
              xl:left-[20px]
              xl:w-[260px]
            "
          >
            <Image
              src="/images/hero/cake.png"
              alt="Slice of cake"
              width={560}
              height={560}
              priority
              sizes="260px"
              className="h-auto w-full drop-shadow-[0_22px_28px_rgba(0,0,0,0.42)]"
            />
          </div>

          {/* =================================================
              BOTTOM RIGHT — GULAB JAMUN
              ================================================= */}

          <div
            ref={gulabJamunRef}
            className="
              absolute
              bottom-[-10px]
              right-[-5px]
              z-10
              w-[235px]
              xl:right-[5px]
              xl:w-[270px]
            "
          >
            <Image
              src="/images/hero/gulab-jamun.png"
              alt="Gulab jamun"
              width={507}
              height={507}
              priority
              sizes="270px"
              className="h-auto w-full drop-shadow-[0_25px_30px_rgba(0,0,0,0.42)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}