import type { Metadata } from 'next';

// The cart is personal and has no search value: keep it out of search results.
export const metadata: Metadata = { title: 'Your cart', robots: { index: false, follow: false } };

export default function CartPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1320px] px-5 py-16 lg:px-12">
      <h1 className="font-display text-h2 text-primary">Your cart</h1>
      <p className="mt-3 max-w-[52ch] text-body text-ink-variant">
        The cart and WhatsApp checkout arrive in the cart step.
      </p>
    </main>
  );
}