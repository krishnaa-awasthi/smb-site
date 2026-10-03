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

/**
 * "Four houses of taste": one panel per house with its own photo.
 * - Desktop (1024 px and up, motion allowed): the section pins and vertical scrolling moves the row of
 *   panels sideways. Each photo drifts slightly inside its arch while it passes. A progress line and the
 *   house names at the bottom follow along.
 * - Everything else (phones, tablets, reduced motion): a plain swipeable row with scroll-snap.
 */
export function FourHouses() {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const vp = viewport.current;
        const tr = track.current;
        const barEl = bar.current;
        const progressEl = progress.current;
        const section = root.current;
        if (!vp || !tr || !barEl || !progressEl || !section) return;

        const panels = gsap.utils.toArray<HTMLElement>('[data-house-panel]', tr);
        const navItems = gsap.utils.toArray<HTMLElement>('[data-house-nav]', barEl);

        // Turn the swipe row into a pinned stage while this media query matches.
        vp.style.overflow = 'hidden';
        vp.style.scrollSnapType = 'none';
        barEl.style.display = 'flex';

        const distance = () => Math.max(0, tr.scrollWidth - vp.clientWidth);
        const end = () => `+=${Math.max(1, distance())}`;

        // The container animation that moves the track sideways with the page scroll.
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

        // Photo drifts inside its arch while the panel crosses the screen.
        panels.forEach((panel) => {
          const img = panel.querySelector<HTMLElement>('[data-house-img]');
          if (!img) return;
          gsap.fromTo(
            img,
            { xPercent: -8 },
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

        // Progress line.
        gsap.fromTo(
          progressEl,
          { scaleX: 0 },
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

        // Highlight the house nearest the centre: work out, for each panel, at which scroll
        // progress its centre crosses the middle of the screen.
        let stops: number[] = [];
        const calcStops = () => {
          const d = Math.max(1, distance());
          stops = panels.map((p) =>
            gsap.utils.clamp(0, 1, (p.offsetLeft + p.offsetWidth / 2 - vp.clientWidth / 2) / d),
          );
        };
        const setActive = (p: number) => {
          let best = 0;
          let bestDiff = Infinity;
          stops.forEach((s, i) => {
            const diff = Math.abs(p - s);
            if (diff < bestDiff) {
              bestDiff = diff;
              best = i;
            }
          });
          navItems.forEach((n, i) => n.classList.toggle('is-active', i === best));
        };
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            calcStops();
            setActive(self.progress);
          },
          onUpdate: (self) => setActive(self.progress),
        });

        // Fonts change text widths, so measure again once they are ready.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());

        return () => {
          vp.style.removeProperty('overflow');
          vp.style.removeProperty('scroll-snap-type');
          barEl.style.removeProperty('display');
          navItems.forEach((n) => n.classList.remove('is-active'));
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label={houses.title}
      className="relative bg-surface-lowest py-10 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0 lg:pt-20"
    >
      {/* Heading above the row on phones and tablets */}
      <div className="mx-auto mb-8 w-full max-w-[1320px] px-5 lg:hidden">
        <span className="mb-1 block text-small font-medium uppercase tracking-widest text-egg">
          {houses.eyebrow}
        </span>
        <h2 className="font-display text-h2 text-ink">{houses.title}</h2>
        <p className="mt-2 max-w-sm text-small text-ink-variant">{houses.intro}</p>
      </div>

      <div
        ref={viewport}
        role="region"
        aria-label="The four houses. Scroll sideways to see each one."
        tabIndex={0}
        className="w-full snap-x snap-mandatory overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:pb-0"
      >
        <div
          ref={track}
          className="relative flex w-max items-start gap-5 px-5 lg:items-center lg:gap-12 lg:px-12 lg:pr-[14vw]"
        >
          {/* Intro panel: desktop only (it is the first thing the sideways scroll moves past) */}
          <div className="hidden w-[min(30vw,420px)] shrink-0 flex-col items-start gap-3 lg:flex">
            <span className="text-small font-medium uppercase tracking-widest text-egg">
              {houses.eyebrow}
            </span>
            <h2 className="font-display text-h2 text-ink">{houses.title}</h2>
            <p className="max-w-[34ch] text-body text-ink-variant">{houses.intro}</p>
            <p className="mt-4 flex items-center gap-2 text-small text-ink-soft">
              {houses.scrollHint}
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </p>
          </div>

          {categories.map((c, i) => {
            const item = houseItems[c.slug];
            return (
              <article
                key={c.slug}
                data-house-panel
                className={cn(
                  'w-[78vw] max-w-[340px] shrink-0 snap-start lg:w-auto lg:max-w-none',
                  i % 2 === 1 && 'lg:mt-14',
                )}
              >
                <ImageArch
                  aspect="aspect-[3/4]"
                  className="rounded-b-soft shadow-lg lg:h-[48svh] lg:w-[36svh]"
                >
                  {/* Wider than its frame on desktop so it can drift sideways inside it */}
                  <div
                    data-house-img
                    className="absolute inset-y-0 left-0 w-full lg:-left-[10%] lg:w-[120%]"
                  >
                    {item.imageSrc ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 40svh, 78vw"
                        className="object-cover"
                      />
                    ) : (
                      <ImagePlaceholder name={item.imageAlt} />
                    )}
                  </div>
                </ImageArch>

                <div className="mt-4 flex max-w-[34ch] flex-col items-start gap-1.5">
                  <h3 className="font-display text-h2 text-ink">{c.name}</h3>
                  <p className="text-small text-ink-variant">{c.intro}</p>
                  <ButtonLink href={`/${c.slug}`} variant="text">
                    {item.ctaLabel}
                  </ButtonLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Progress: shown only while the section is pinned (turned on by the animation) */}
      <div
        ref={bar}
        aria-hidden="true"
        className="absolute inset-x-12 bottom-8 hidden items-center gap-6"
      >
        <ul className="flex gap-6 text-small">
          {categories.map((c) => (
            <li
              key={c.slug}
              data-house-nav
              className="text-ink-soft transition-colors duration-[160ms] [&.is-active]:text-primary"
            >
              {c.name}
            </li>
          ))}
        </ul>
        <span className="relative h-0.5 flex-1 bg-gold/40">
          <span ref={progress} className="absolute inset-0 origin-left bg-primary" />
        </span>
      </div>
    </section>
  );
}