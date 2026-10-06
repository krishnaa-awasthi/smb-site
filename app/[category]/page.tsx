import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { categories, getCategory } from '@/data/categories';
import { siteConfig } from '@/config/site';
import { categorySeo, type CategorySeoSlug } from '@/content/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';

// Only the four real categories exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

type Props = {
  params: Promise<{ category: string }>;
};

function isCategorySeoSlug(value: string): value is CategorySeoSlug {
  return value in categorySeo;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category } = await params;
  const currentCategory = getCategory(category);

  if (!currentCategory || !isCategorySeoSlug(category)) {
    return {};
  }

  const seo = categorySeo[category];
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}/${category}`;

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: seo.title,
      description: seo.description,
      siteName: siteConfig.name,
      locale: 'en_IN',
    },

    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const currentCategory = getCategory(category);

  if (!currentCategory || !isCategorySeoSlug(category)) {
    notFound();
  }

  const seo = categorySeo[category];

  return (
    <>
      <BreadcrumbJsonLd
        categoryName={currentCategory.name}
        categorySlug={currentCategory.slug}
      />

      <main
        id="main"
        className="mx-auto w-full max-w-[1320px] px-5 py-16 lg:px-12"
      >
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-small text-ink-soft"
        >
          <a
            href="/"
            className="transition-colors hover:text-primary"
          >
            Home
          </a>

          <span aria-hidden="true" className="mx-2">
            /
          </span>

          <span aria-current="page">
            {currentCategory.name}
          </span>
        </nav>

        <header>
          <p className="text-small text-ink-soft">
            {siteConfig.name} · {siteConfig.locality}
          </p>

          <h1 className="mt-2 font-display text-h2 text-primary">
            {seo.heading}
          </h1>

          <p className="mt-3 max-w-[58ch] text-body text-ink-variant">
            {currentCategory.intro}
          </p>
        </header>

        {/* Existing catalogue/grid should sit here. */}
        <section
          aria-labelledby="category-products"
          className="mt-12"
        >
          <h2
            id="category-products"
            className="sr-only"
          >
            {currentCategory.name} products
          </h2>

          {/* Keep your existing product catalogue component here. */}
        </section>

        <section
          className="mt-16 max-w-[68ch]"
          aria-labelledby="category-about"
        >
          <h2
            id="category-about"
            className="font-display text-h3 text-primary"
          >
            About our {currentCategory.name.toLowerCase()}
          </h2>

          <p className="mt-5 text-body leading-7 text-ink-variant">
            {seo.text}
          </p>
        </section>
      </main>
    </>
  );
}