export interface Offer {
  id: string;
  title: string;
  detail: string;
  ctaLabel: string;
  href: string;
}

/**
 * SAMPLE: replace with the shop's real offers (with dates). An empty list hides the offers section.
 * Keep wording factual: what, how much, until when.
 */
export const offers: Offer[] = [
  {
    id: 'festive-gift-boxes',
    title: 'Festive gift boxes',
    detail: 'Flat 10% off on assorted mithai boxes above 1 kg.', // SAMPLE: replace
    ctaLabel: 'View gift boxes',
    href: '/sweets',
  },
];