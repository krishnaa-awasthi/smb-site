import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getCategory } from '@/data/categories';

// Only the four real categories exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

type Props = { params: Promise<{ category: string }> };

// TODO(step 9): titles and descriptions come from content/seo.ts (docs/seo.md §4.1)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return { title: c.name, description: c.intro };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  return (
    <main id="main" className="mx-auto w-full max-w-[1320px] px-5 py-16 lg:px-12">
      <h1 className="font-display text-h2 text-primary">{c.name}</h1>
      <p className="mt-3 max-w-[52ch] text-body text-ink-variant">{c.intro}</p>
      <p className="mt-8 text-small text-ink-soft">
        Product listing arrives in the catalogue step.
      </p>
    </main>
  );
}