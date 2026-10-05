import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Check,
  MessageCircle,
} from 'lucide-react';

import { ProductPurchase } from '@/components/product/ProductPurchase';
import { Container } from '@/components/layout/Container';
import {
  getProduct,
  getProductsByCategory,
} from '@/data/products';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getProductsByCategory('namkeen').map(
    (product) => ({
      slug: product.slug,
    }),
  );
}

async function getPageProduct(slug: string) {
  return getProduct('namkeen', slug);
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPageProduct(slug);

  if (!product) {
    return {
      title: 'Product not found | Shiv Mishthan Bhandar',
    };
  }

  return {
    title: `${product.name} | Shiv Mishthan Bhandar`,
    description: `${product.name} from Shiv Mishthan Bhandar. View available quantities and pricing.`,
  };
}

export default async function NamkeenProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getPageProduct(slug);

  if (!product) {
    notFound();
  }

  const image = product.images[0];

  return (
    <main className="min-h-screen bg-cream">
      <section className="py-8 lg:py-12">
        <Container>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-ink-soft"
          >
            <Link
              href="/"
              className="hover:text-primary"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/namkeen"
              className="hover:text-primary"
            >
              Namkeen
            </Link>

            <span>/</span>

            <span className="text-ink">
              {product.name}
            </span>
          </nav>

          {/* Product */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-ctl bg-surface-mid">
                {image?.src ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-ink-soft">
                    Image coming soon
                  </div>
                )}

                {product.diet && (
                  <span
                    className="absolute bottom-4 left-4 flex h-7 w-7 items-center justify-center rounded-full border border-green-700 bg-ivory"
                    title="Vegetarian"
                    aria-label="Vegetarian"
                  >
                    <span className="h-3 w-3 rounded-full bg-green-700" />
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs leading-5 text-ink-soft">
                Product photograph shown for illustration.
                Actual appearance may vary.
              </p>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <p className="text-small font-medium uppercase tracking-[0.2em] text-egg">
                {product.shortDescription}
              </p>

              <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                {product.name}
              </h1>

              {product.description && (
                <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft">
                  {product.description}
                </p>
              )}

              <ProductPurchase product={product} />

              {/* Availability */}
              <div className="mt-6 flex items-center gap-2 text-sm text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Check
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    strokeWidth={2}
                  />
                </span>

                {product.available
                  ? 'Available'
                  : 'Currently unavailable'}
              </div>

              {/* Actions */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {product.priceOnRequest ? (
                  <a
                    href="https://wa.me/"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-ctl bg-primary px-6 text-sm font-medium text-ivory transition-colors hover:bg-primary/90"
                  >
                    <MessageCircle
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.5}
                    />

                    Ask on WhatsApp
                  </a>
                ) : (
                  <button
                    type="button"
                    className="min-h-12 flex-1 rounded-ctl bg-primary px-6 text-sm font-medium text-ivory transition-colors hover:bg-primary/90"
                  >
                    Add to cart
                  </button>
                )}

                <Link
                  href="/namkeen"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-ctl border border-ink/15 bg-ivory px-6 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.5}
                  />

                  Back to namkeen
                </Link>
              </div>

              {/* Product information */}
              <div className="mt-10 space-y-5 border-t border-ink/10 pt-7">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                    Category
                  </p>

                  <p className="mt-1 text-sm text-ink">
                    {product.shortDescription}
                  </p>
                </div>

                {product.ingredients &&
                  product.ingredients.length > 0 && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                        Ingredients
                      </p>

                      <p className="mt-1 text-sm leading-6 text-ink">
                        {product.ingredients.join(', ')}
                      </p>
                    </div>
                  )}

                {product.shelfLife && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                      Shelf life
                    </p>

                    <p className="mt-1 text-sm text-ink">
                      {product.shelfLife}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                    Product information
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink-soft">
                    Availability and pricing may change.
                    Please confirm before placing large
                    or special orders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}