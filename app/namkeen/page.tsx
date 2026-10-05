import type { Metadata } from 'next';
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
}