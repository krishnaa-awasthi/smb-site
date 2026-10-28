/*import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { ProductCatalogue } from '@/components/catalogue/ProductCatalogue';
import { categories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';

export const metadata: Metadata = {
  title: 'Namkeen | Shiv Mishthan Bhandar',
  description:
    'Explore namkeen and savoury snacks from Shiv Mishthan Bhandar, including traditional snacks, chaat items and dry-fruit namkeen.',
};

export default function NamkeenPage() {
  const category = categories.find(
    (item) => item.slug === 'namkeen',
  );

  if (!category) {
    return null;
  }

  const products = getProductsByCategory('namkeen');

  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-ink/10 bg-primary py-14 text-ivory lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-3 text-small font-medium uppercase tracking-[0.22em] text-gold">
              Shiv Mishthan Bhandar
            </p>

            <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Namkeen
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-ivory/75 sm:text-lg">
              {category.intro}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-sm text-ink-soft"
          >
            <Link
              href="/"
              className="transition-colors hover:text-primary"
            >
              Home
            </Link>

            <span className="mx-2">/</span>

            <span className="text-ink">
              Namkeen
            </span>
          </nav>

          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-small font-medium uppercase tracking-widest text-egg">
                Our collection
              </p>

              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Namkeen &amp; Savoury Snacks
              </h2>
            </div>

            <p className="text-sm text-ink-soft">
              {products.length} products
            </p>
          </div>

          <ProductCatalogue
            products={products}
            priceBands={category.priceBands}
            subcategories={category.subcategories}
            basePath="/namkeen"
          />

          <div className="mt-16 border-t border-ink/10 pt-8 text-center">
            <p className="text-sm text-ink-soft">
              Looking for a particular namkeen or custom
              quantity?
            </p>

            <p className="mt-1 text-xs text-ink-soft">
              Contact Shiv Mishthan Bhandar directly for
              availability and custom orders.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}*/

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        {/* Error code */}
        <h1
          className="
            select-none font-serif
            text-[clamp(8rem,22vw,17rem)]
            font-normal leading-[0.9]
            tracking-tight text-white
            [text-shadow:0_0_18px_rgba(255,255,255,0.2),0_0_50px_rgba(255,255,255,0.08)]
          "
        >
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-8 font-serif text-3xl font-normal tracking-tight sm:text-5xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Home button */}
        <Link
          href="/"
          className="
            group mt-10 inline-flex min-h-[56px]
            items-center justify-center gap-4
            rounded-full border border-white/80
            px-8 py-3 text-sm font-medium text-white
            transition-all duration-300
            hover:border-white hover:bg-white hover:text-black
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-white
            focus-visible:ring-offset-4
            focus-visible:ring-offset-black
          "
        >
          <ArrowLeft
            size={21}
            strokeWidth={1.6}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Go Back Home</span>
        </Link>
      </div>
    </main>
  );
}
