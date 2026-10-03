import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1320px] px-5 py-16 lg:px-12">
      <h1 className="font-display text-h2 text-primary">Contact</h1>
      <p className="mt-3 max-w-[52ch] text-body text-ink-variant">
        The contact form and shop details arrive in the contact step.
      </p>
    </main>
  );
}