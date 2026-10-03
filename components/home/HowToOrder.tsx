'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { homeContent } from '@/content/home';
import { Container } from '@/components/layout/Container';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { howToOrder } = homeContent;

/**
 * Three steps on a timeline that plays as you scroll (GSAP timeline + ScrollTrigger, scrubbed).
 * For each step: its number circle fills in, its text is revealed, and a line grows towards the next
 * step. Desktop: centred columns with a horizontal line. Phones: a left-aligned vertical timeline.
 * With reduced motion everything is simply shown in its final state.
 */
export function HowToOrder() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const listEl = list.current;
      if (!listEl) return;

      const mm = gsap.matchMedia();
      mm.add(
        { isDesktop: '(min-width: 768px)', reduceMotion: '(prefers-reduced-motion: reduce)' },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };
          if (reduceMotion) return;

          const css = (name: string) =>
            getComputedStyle(document.documentElement).getPropertyValue(name).trim();
          const primary = css('--primary');
          const ivory = css('--ivory');
          const gold = css('--gold');

          const dots = gsap.utils.toArray<HTMLElement>('[data-step-dot]', listEl);
          const contents = gsap.utils.toArray<HTMLElement>('[data-step-content]', listEl);
          const fills = gsap.utils.toArray<HTMLElement>('[data-step-fill]', listEl);
          const growAxis = isDesktop ? 'scaleX' : 'scaleY';

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: listEl,
              start: 'top 80%',
              end: 'bottom 55%',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          dots.forEach((dot, i) => {
            const t = i * 1.1; // each step starts 1.1 timeline units after the previous one

            // 1. The number circle fills in.
            tl.fromTo(
              dot,
              { scale: 0.85, backgroundColor: ivory, color: primary, borderColor: gold },
              {
                scale: 1,
                backgroundColor: primary,
                color: ivory,
                borderColor: primary,
                duration: 0.3,
                ease: 'power2.out',
              },
              t,
            );

            // 2. Its text opens from the top and settles into place (a clip, not a fade).
            tl.fromTo(
              contents[i],
              { clipPath: 'inset(0 0 100% 0)', y: 14 },
              { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.5, ease: 'power2.out' },
              t + 0.1,
            );

            // 3. The line grows towards the next step, arriving as the next circle fills.
            if (fills[i]) {
              tl.fromTo(fills[i], { [growAxis]: 0 }, { [growAxis]: 1, duration: 0.8 }, t + 0.3);
            }
          });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-surface-low py-10 lg:py-16">
      <Container>
        <div className="mb-10 md:mx-auto md:max-w-xl md:text-center">
          <span className="mb-1 block text-small font-medium uppercase tracking-widest text-egg">
            {howToOrder.eyebrow}
          </span>
          <h2 className="font-display text-h2 text-ink">{howToOrder.title}</h2>
          <p className="mt-2 text-small text-ink-variant">{howToOrder.intro}</p>
        </div>

        <ol ref={list} className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
          {howToOrder.steps.map((step, i) => (
            <li
              key={step.title}
              className="relative flex gap-5 text-left md:flex-col md:items-center md:gap-4 md:text-center"
            >
              <span
                data-step-dot
                className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary font-display text-xl text-ivory shadow-md md:h-16 md:w-16"
              >
                {i + 1}
              </span>

              {/* Line to the next step: vertical on phones, horizontal from 768 px up */}
              {i < howToOrder.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-7 top-14 h-[calc(100%-1rem)] w-px bg-gold/40 md:left-[calc(50%+2rem)] md:top-8 md:h-px md:w-[calc(100%-1.5rem)]"
                >
                  <span
                    data-step-fill
                    className="absolute inset-0 origin-top bg-primary md:origin-left"
                  />
                </span>
              )}

              <div data-step-content className="flex flex-col gap-2 md:items-center md:gap-3">
                <h3 className="font-display text-h3 text-ink">{step.title}</h3>
                <p className="max-w-[34ch] text-small text-ink-variant">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}