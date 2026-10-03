import type { CategorySlug } from '@/types';

export interface HouseItem {
  ctaLabel: string;
  /** Shown as the placeholder label now and as alt text once a photo exists. */
  imageAlt: string;
  /** Path under /public once the photo is supplied, e.g. '/images/home/houses/sweets.jpg'. */
  imageSrc?: string;
}

/** One photo and one link label per house on the Home "Four houses of taste" scroll section. */
export const houseItems: Record<CategorySlug, HouseItem> = {
  sweets: {
    ctaLabel: 'Browse sweets',
    imageAlt: 'Assorted mithai on a brass thali',
  },
  restaurant: {
    ctaLabel: 'See the menu',
    imageAlt: 'A thali served at the restaurant',
  },
  bakery: {
    ctaLabel: 'Browse the bakery',
    imageAlt: 'Cakes and pastries at the bakery counter',
  },
  namkeen: {
    ctaLabel: 'Browse namkeen',
    imageAlt: 'Namkeen and snacks in jars',
  },
};

/**
 * Editable Home page text (docs/UI.md §5). Wording follows the client-approved design, trimmed of
 * unconfirmed claims. Items marked CONFIRM must be checked with the client before launch.
 */
export const homeContent = {
  hero: {
    headline: 'Sweets, the way they have always been made.', // CONFIRM with client
    subline: 'Sweets, a restaurant, a bakery and namkeen under one roof.',
    primaryCta: { label: 'Browse sweets', href: '/sweets' },
    callLabel: 'Call the shop',
    imageHint: 'Hero photo: sweets on a brass thali',
  },
  houses: {
    eyebrow: 'Our pillars',
    title: 'Four houses of taste',
    intro: 'Four counters under one roof. Pick a section to start.',
    scrollHint: 'Keep scrolling to visit each counter',
  },
  bestsellers: {
    eyebrow: 'Customer favourites',
    title: 'Bestsellers',
    linkLabel: 'See all sweets',
    linkHref: '/sweets',
  },
  legacy: {
    eyebrow: 'Our heritage',
    title: 'A family shop, still run like one.', // CONFIRM with client
    body: 'Read how Shiv Mishthan Bhandar began, how it has grown, and where it is headed.',
    ctaLabel: 'Read our story',
    ctaHref: '/about',
  },
  howToOrder: {
    eyebrow: 'Simple process',
    title: 'How to order',
    intro: 'Order for delivery or pickup. No online payment is needed.',
    steps: [
      {
        title: 'Pick what you like',
        text: 'Browse our sweets, restaurant dishes, bakery items and namkeen, and add them to your cart.',
      },
      {
        title: 'Send your order on WhatsApp',
        text: 'WhatsApp opens with every item, size and your details already written. Just press send.',
      },
      {
        title: 'We confirm and prepare',
        text: 'The shop replies to confirm availability, delivery charges and timing.',
      },
    ],
  },
} as const;