import Link from 'next/link';
import { homeContent } from '@/content/home';
import { Sunburst } from '@/components/brand/Sunburst';
import { Container } from '@/components/layout/Container';

const { legacy } = homeContent;

/**
 * Heritage card: old-shop photo behind a maroon overlay with the story on the left (approved design).
 * The scroll-linked reveal is added later (S4).
 */
export function LegacyReveal() {
  return (
    <section className="relative bg-cream py-10 lg:py-16">
      <Container>
        <div className="relative flex min-h-[500px] items-center overflow-hidden rounded-soft bg-maroon shadow-2xl">
          {/* TODO(photos): the old-shop photograph goes here (sepia), under the overlays */}
          <Sunburst className="absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 opacity-20" />
          <div className="absolute inset-0 bg-linear-to-r from-maroon/90 via-maroon/60 to-transparent" />

          <div className="relative z-10 flex max-w-2xl flex-col items-start gap-4 p-8 text-ivory md:p-10">
            <span className="text-small font-medium uppercase tracking-widest text-gold-light">
              {legacy.eyebrow}
            </span>
            <h2 className="font-display text-h2 text-ivory">{legacy.title}</h2>
            <p className="max-w-[52ch] text-body text-parchment/90">{legacy.body}</p>
            <Link
              href={legacy.ctaHref}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-ctl bg-gold-light px-6 text-button font-semibold text-maroon transition-colors duration-[160ms] hover:bg-ivory"
            >
              {legacy.ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}