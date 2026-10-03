import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About us' };

export default function AboutPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1320px] px-5 py-16 lg:px-12">
      <h1 className="font-display text-h2 text-primary">About us</h1>
      <p className="mt-3 max-w-[52ch] text-body text-ink-variant">
        Our story and journey timeline arrive in the About step.
      </p>
    </main>
  );
}