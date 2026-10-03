import Link from 'next/link';
import { categories } from '@/data/categories';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1320px] px-5 py-20 lg:px-12">
      <h1 className="max-w-[18ch] font-display text-h2 text-primary">
        That page is not on our counter.
      </h1>
      <p className="mt-3 max-w-[48ch] text-body text-ink-variant">
        The link may be old or mistyped. Start from home, or go straight to a section.
      </p>
      <div className="mt-8">
        <ButtonLink href="/">Go to home</ButtonLink>
      </div>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${c.slug}`}
              className="text-primary underline underline-offset-4 hover:decoration-2"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}