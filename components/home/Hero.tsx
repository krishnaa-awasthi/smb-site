import { Phone, Star } from 'lucide-react';
import { siteConfig, telUrl } from '@/config/site';
import { homeContent } from '@/content/home';
import { ImageArch } from '@/components/brand/ImageArch';
import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder';
import { Sunburst } from '@/components/brand/Sunburst';
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';

const { hero } = homeContent;
// Show the heritage pill only once the real founding year is in config (never a placeholder).
const hasYear = !siteConfig.establishedYear.startsWith('{{');

/** Home hero: text left, arch photo right (as in the approved design). Scroll animation is added later (S1). */
export function Hero() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-cream py-10 lg:py-16">
      <Sunburst className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full opacity-70" />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col items-start gap-4 lg:col-span-6">
          {hasYear && (
            <span className="inline-flex items-center gap-1.5 rounded-ctl bg-surface-high px-2.5 py-1 text-small text-primary">
              <Star aria-hidden="true" className="h-4 w-4 fill-current" strokeWidth={1.5} />
              Heritage mithai and dining since {siteConfig.establishedYear}
            </span>
          )}
          <h1 className="font-display text-hero text-ink">{hero.headline}</h1>
          <p className="max-w-lg text-body text-ink-variant">{hero.subline}</p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={telUrl()}
              variant="text"
              leadingIcon={<Phone aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />}
            >
              {hero.callLabel}
            </ButtonLink>
          </div>
        </div>

        <div className="relative flex flex-col items-start justify-center lg:col-span-6 lg:items-end">
          {/* TODO(photos): replace the placeholder with next/image and add the maroon fade from the approved design */}
          <ImageArch aspect="aspect-[4/5]" className="max-w-[460px] rounded-b-soft shadow-xl">
            <ImagePlaceholder name={hero.imageHint} />
          </ImageArch>
          {/* Script font use: hero tagline (2 of 3) */}
          <span className="mt-4 font-script text-h2 text-primary lg:text-right">
            {siteConfig.tagline}
          </span>
        </div>
      </Container>
    </section>
  );
}