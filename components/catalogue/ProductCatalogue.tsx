'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';

import type { Product, PriceBand } from '@/types';

interface ProductCatalogueProps {
  products: Product[];
  priceBands: PriceBand[];
  subcategories: {
    slug: string;
    name: string;
  }[];
  basePath: string;
}

type SortOption =
  | 'recommended'
  | 'price-low'
  | 'price-high'
  | 'name';

const formatINR = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

function getDefaultPrice(product: Product): number {
  return product.variants[0]?.price ?? 0;
}

function ProductCard({
  product,
  basePath,
}: {
  product: Product;
  basePath: string;
}) {
  const image = product.images[0];
  const variant = product.variants[0];

  return (
    <Link
      href={`${basePath}/${product.slug}`}
      className="group block"
    >
      <article>
        <div className="relative aspect-square overflow-hidden rounded-ctl bg-surface-mid">
          {image?.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="
                (max-width: 640px) 50vw,
                (max-width: 1024px) 33vw,
                (max-width: 1280px) 25vw,
                20vw
              "
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-ink-soft">
              Image coming soon
            </div>
          )}

          {product.diet && (
            <span
              className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-full border border-green-700 bg-ivory"
              title="Vegetarian"
              aria-label="Vegetarian"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-green-700" />
            </span>
          )}

          {product.badges?.includes('new') && (
            <span className="absolute left-2 top-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ivory">
              New
            </span>
          )}

          {product.badges?.includes('festive') && (
            <span className="absolute left-2 top-2 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
              Festive
            </span>
          )}
        </div>

        <div className="pt-3">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-ink-soft">
            {product.shortDescription}
          </p>

          <h3 className="min-h-[3rem] font-display text-lg leading-6 text-ink transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          <div className="mt-2">
            {product.priceOnRequest ? (
              <span className="text-sm font-medium text-primary">
                Price on request
              </span>
            ) : (
              <span className="text-sm font-semibold text-ink">
                {formatINR(variant.price)}

                {variant.label && (
                  <span className="ml-1 font-normal text-ink-soft">
                    / {variant.label}
                  </span>
                )}
              </span>
            )}
          </div>

          {!product.priceOnRequest &&
            product.variants.length > 1 && (
              <p className="mt-1 text-xs text-ink-soft">
                {product.variants.length} sizes available
              </p>
            )}
        </div>
      </article>
    </Link>
  );
}

export function ProductCatalogue({
  products,
  priceBands,
  subcategories,
  basePath,
}: ProductCatalogueProps) {
  const [search, setSearch] = useState('');
  const [subcategory, setSubcategory] = useState('all');
  const [priceBand, setPriceBand] = useState('all');
  const [sort, setSort] =
    useState<SortOption>('recommended');
  const [filtersOpen, setFiltersOpen] = useState(false);

  /*
   * Convert the supplied base path into a readable
   * catalogue name.
   *
   * Examples:
   * /sweets     -> sweets
   * /restaurant -> restaurant
   * /namkeen    -> namkeen
   * /bakery     -> bakery
   */
  const catalogueName =
    basePath
      .split('/')
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, ' ') ?? 'products';

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = products.filter((product) => {
      /*
       * Search across:
       * - product name
       * - subcategory
       * - tags
       */
      if (query) {
        const searchable = [
          product.name,
          product.shortDescription,
          ...product.tags,
        ]
          .join(' ')
          .toLowerCase();

        if (!searchable.includes(query)) {
          return false;
        }
      }

      /*
       * Subcategory filter
       */
      if (
        subcategory !== 'all' &&
        product.subcategory !== subcategory
      ) {
        return false;
      }

      /*
       * Price filter
       */
      if (priceBand !== 'all') {
        const band = priceBands.find(
          (item) => item.id === priceBand,
        );

        if (band) {
          const price = getDefaultPrice(product);

          if (price < band.min) {
            return false;
          }

          if (
            band.max !== undefined &&
            price >= band.max
          ) {
            return false;
          }
        }
      }

      return true;
    });

    /*
     * Sorting
     */
    result.sort((a, b) => {
      switch (sort) {
        case 'price-low':
          return (
            getDefaultPrice(a) -
            getDefaultPrice(b)
          );

        case 'price-high':
          return (
            getDefaultPrice(b) -
            getDefaultPrice(a)
          );

        case 'name':
          return a.name.localeCompare(b.name);

        case 'recommended':
        default:
          return b.popularity - a.popularity;
      }
    });

    return result;
  }, [
    products,
    priceBands,
    search,
    subcategory,
    priceBand,
    sort,
  ]);

  const hasActiveFilters =
    search.length > 0 ||
    subcategory !== 'all' ||
    priceBand !== 'all';

  function clearFilters() {
    setSearch('');
    setSubcategory('all');
    setPriceBand('all');
  }

  return (
    <div>
      {/* Category navigation */}
      <div className="mb-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2">
          <button
            type="button"
            onClick={() => setSubcategory('all')}
            className={[
              'rounded-full border px-4 py-2 text-sm transition-colors',
              subcategory === 'all'
                ? 'border-primary bg-primary font-medium text-ivory'
                : 'border-ink/15 bg-ivory text-ink hover:border-primary hover:text-primary',
            ].join(' ')}
          >
            All {catalogueName}
          </button>

          {subcategories.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() =>
                setSubcategory(item.slug)
              }
              className={[
                'rounded-full border px-4 py-2 text-sm transition-colors',
                subcategory === item.slug
                  ? 'border-primary bg-primary font-medium text-ivory'
                  : 'border-ink/15 bg-ivory text-ink hover:border-primary hover:text-primary',
              ].join(' ')}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-8 border-y border-ink/10 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-sm">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              strokeWidth={1.5}
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder={`Search ${catalogueName}...`}
              aria-label={`Search ${catalogueName}`}
              className="h-11 w-full rounded-ctl border border-ink/15 bg-ivory pl-9 pr-10 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-primary"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-ink-soft hover:text-ink"
              >
                <X
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.5}
                />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            {/* Mobile filters */}
            <button
              type="button"
              onClick={() =>
                setFiltersOpen(!filtersOpen)
              }
              className="inline-flex h-11 items-center gap-2 rounded-ctl border border-ink/15 bg-ivory px-4 text-sm text-ink lg:hidden"
            >
              <SlidersHorizontal
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.5}
              />

              Filters

              {hasActiveFilters && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-ivory">
                  !
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target.value as SortOption,
                  )
                }
                aria-label="Sort products"
                className="h-11 appearance-none rounded-ctl border border-ink/15 bg-ivory py-2 pl-4 pr-10 text-sm text-ink outline-none focus:border-primary"
              >
                <option value="recommended">
                  Recommended
                </option>

                <option value="price-low">
                  Price: Low to high
                </option>

                <option value="price-high">
                  Price: High to low
                </option>

                <option value="name">
                  Name: A to Z
                </option>
              </select>

              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          className={[
            'mt-4 grid gap-4 border-t border-ink/10 pt-4',
            filtersOpen
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'hidden lg:grid lg:grid-cols-2',
          ].join(' ')}
        >
          {/* Subcategory */}
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-soft">
              Category
            </span>

            <div className="relative">
              <select
                value={subcategory}
                onChange={(event) =>
                  setSubcategory(event.target.value)
                }
                className="h-11 w-full appearance-none rounded-ctl border border-ink/15 bg-ivory px-4 pr-10 text-sm text-ink outline-none focus:border-primary"
              >
                <option value="all">
                  All categories
                </option>

                {subcategories.map((item) => (
                  <option
                    key={item.slug}
                    value={item.slug}
                  >
                    {item.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
                strokeWidth={1.5}
              />
            </div>
          </label>

          {/* Price */}
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-soft">
              Price
            </span>

            <div className="relative">
              <select
                value={priceBand}
                onChange={(event) =>
                  setPriceBand(event.target.value)
                }
                className="h-11 w-full appearance-none rounded-ctl border border-ink/15 bg-ivory px-4 pr-10 text-sm text-ink outline-none focus:border-primary"
              >
                <option value="all">
                  All prices
                </option>

                {priceBands.map((band) => (
                  <option
                    key={band.id}
                    value={band.id}
                  >
                    {band.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
                strokeWidth={1.5}
              />
            </div>
          </label>
        </div>

        {/* Active filters */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-ink-soft">
              Showing {filteredProducts.length} of{' '}
              {products.length}
            </span>

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              basePath={basePath}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-ctl border border-dashed border-ink/15 bg-ivory px-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream">
            <Search
              aria-hidden="true"
              className="h-5 w-5 text-ink-soft"
              strokeWidth={1.5}
            />
          </div>

          <h3 className="font-display text-2xl text-ink">
            No {catalogueName} found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-ink-soft">
            Try another search or remove one of the
            filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-ctl bg-primary px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-primary/90"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Result count */}
      {filteredProducts.length > 0 && (
        <p className="mt-10 text-center text-xs text-ink-soft">
          Showing {filteredProducts.length} of{' '}
          {products.length} {catalogueName}
        </p>
      )}
    </div>
  );
}