import Link from 'next/link';
import { Gift } from 'lucide-react';
import { offers } from '@/content/offers';
import { Container } from '@/components/layout/Container';

/** One quiet banner per offer. Hidden when there are no offers. No animation by design. */
export function OfferBanner() {
  if (offers.length === 0) return null;

  return (
    <section className="bg-surface-low py-4">
      <Container className="flex flex-col gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col items-start justify-between gap-4 rounded-ctl bg-cream p-6 shadow-sm md:flex-row md:items-center"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Gift aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <div>
                <h2 className="font-display text-h3 text-ink">{offer.title}</h2>
                <p className="text-small text-ink-variant">{offer.detail}</p>
              </div>
            </div>
            <Link
              href={offer.href}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-ctl bg-secondary px-6 text-button font-semibold text-ivory transition-colors duration-[160ms] hover:bg-primary"
            >
              {offer.ctaLabel}
            </Link>
          </div>
        ))}
      </Container>
    </section>
  );
}