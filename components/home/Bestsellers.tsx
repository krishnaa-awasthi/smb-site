import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { homeContent } from '@/content/home';
import type { Product } from '@/types';
import { Container } from '@/components/layout/Container';
import { BestsellerCard } from './BestsellerCard';

const { bestsellers } = homeContent;

/**
 * Horizontal row of favourites. Native swipe/scroll for now; pinned horizontal scroll on desktop is
 * added later (S3).
 */
export function Bestsellers({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-cream py-10 lg:py-16">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="mb-1 block text-small font-medium uppercase tracking-widest text-egg">
              {bestsellers.eyebrow}
            </span>
            <h2 className="font-display text-h2 text-ink">{bestsellers.title}</h2>
          </div>
          <Link
            href={bestsellers.linkHref}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-button text-primary underline-offset-4 hover:underline"
          >
            {bestsellers.linkLabel}
            <ArrowRight aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((product, i) => (
            <BestsellerCard key={product.id} product={product} offset={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}