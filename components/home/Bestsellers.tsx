'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { homeContent } from '@/content/home';
import type { Product } from '@/types';
import { Container } from '@/components/layout/Container';
import { BestsellerCard } from './BestsellerCard';

const { bestsellers } = homeContent;

const arrowClass =
  'absolute top-[40%] z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-ctl border border-gold/60 bg-ivory text-primary shadow-md ' +
  'transition-colors duration-[160ms] hover:bg-primary hover:text-ivory disabled:pointer-events-none disabled:opacity-40 md:flex';

/**
 * Row of favourites.
 * - Phones: normal swipe scrolling with snapping.
 * - From 768 px up: previous and next buttons on the left and right edges scroll the row by a few cards.
 */
export function Bestsellers({ products }: { products: Product[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ atStart: true, atEnd: false });

  // Keep the buttons' enabled state in step with the scroll position and the row's size.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const update = () => {
      const atStart = el.scrollLeft <= 4;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      setEdge((prev) =>
        prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd },
      );
    };

    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update); // also runs once when observing starts
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  const scrollByCards = useCallback((direction: 1 | -1) => {
    const el = scroller.current;
    const firstCard = el?.firstElementChild as HTMLElement | null | undefined;
    if (!el || !firstCard) return;

    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = firstCard.offsetWidth + gap;
    const visible = Math.max(1, Math.floor((el.clientWidth + gap) / step));
    const cards = Math.max(1, visible - 1); // keep one card in view for context
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    el.scrollBy({ left: direction * cards * step, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="bg-cream py-10 lg:py-16">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="mb-1 block text-small font-medium uppercase tracking-widest text-egg">
              {bestsellers.eyebrow}
            </span>
            <h2 data-split className="font-display text-h2 text-ink">
              {bestsellers.title}
            </h2>
          </div>
          <Link
            href={bestsellers.linkHref}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-button text-primary underline-offset-4 hover:underline"
          >
            {bestsellers.linkLabel}
            <ArrowRight aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Show previous bestsellers"
            onClick={() => scrollByCards(-1)}
            disabled={edge.atStart}
            className={`${arrowClass} -left-2 lg:-left-5`}
          >
            <ChevronLeft aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Show more bestsellers"
            onClick={() => scrollByCards(1)}
            disabled={edge.atEnd}
            className={`${arrowClass} -right-2 lg:-right-5`}
          >
            <ChevronRight aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
          </button>

          <div
            ref={scroller}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product, i) => (
              <BestsellerCard key={product.id} product={product} offset={i % 2 === 1} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}