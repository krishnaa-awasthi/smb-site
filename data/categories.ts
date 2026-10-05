import type { Category, CategorySlug } from '@/types';

/**
 * Subcategories follow the shop's own product sheet (docs/reference/products-smb-site.csv).
 * Price bands compare against each product's default (smallest) variant price.
 * Intro lines are DRAFT copy: replace with client-confirmed text (never publish unconfirmed claims).
 */
export const categories: Category[] = [
  {
    slug: 'sweets',
    name: 'Sweets',
    intro: 'Mithai for gifting and for every day.',
    subcategories: [
      { slug: 'dry-fruits-sweets', name: 'Dry fruits sweets' },
      { slug: 'desi-ghee-sweets', name: 'Desi ghee sweets' },
      { slug: 'bengali-sweets', name: 'Bengali sweets' },
      { slug: 'khoya-sweets', name: 'Khoya sweets' },
      { slug: 'laddo', name: 'Laddo' },
      { slug: 'gifting', name: 'Gifting' },
    ],
    priceBands: [
      { id: 'u100', label: 'Under ₹100', min: 0, max: 100 },
      { id: '100-199', label: '₹100 to ₹199', min: 100, max: 200 },
      { id: '200-299', label: '₹200 to ₹299', min: 200, max: 300 },
      { id: '300p', label: '₹300 and above', min: 300 },
    ],
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    intro: 'Hot meals, chai and chaat, served through the day.',
    subcategories: [
      { slug: 'south-indian', name: 'South Indian' },
      { slug: 'north-indian', name: 'North Indian' },
      { slug: 'chinese', name: 'Chinese' },
      { slug: 'pizza', name: 'Pizza' },
      { slug: 'sandwich', name: 'Sandwich' },
      { slug: 'burger', name: 'Burger' },
      { slug: 'snacks', name: 'Snacks' },
      { slug: 'sweets', name: 'Sweets' },
      { slug: 'coffee', name: 'Coffee' },
      { slug: 'drinks', name: 'Drinks' },
      { slug: 'shakes', name: 'Shakes' },
      { slug: 'mocktails', name: 'Mocktails' },
      { slug: 'combo', name: 'Combo' },
    ],
    priceBands: [
      { id: 'u50', label: 'Under ₹50', min: 0, max: 50 },
      { id: '50-99', label: '₹50 to ₹99', min: 50, max: 100 },
      { id: '100-149', label: '₹100 to ₹149', min: 100, max: 150 },
      { id: '150-199', label: '₹150 to ₹199', min: 150, max: 200 },
      { id: '200p', label: '₹200 and above', min: 200 },
    ],
  },
  {
    slug: 'bakery',
    name: 'Bakery',
    intro: 'Cakes, pastries and biscuits baked fresh.',
    subcategories: [{ slug: 'bakery-items', name: 'Bakery items' }],
    // Every bakery item is price on request for now, so there is nothing to filter by price.
    priceBands: [],
  },
  {
    slug: 'namkeen',
    name: 'Namkeen',
    intro: 'Crisp snacks by the kilo for tea time.',
    subcategories: [
      { slug: 'snacks', name: 'Snacks' },
      { slug: 'chaat', name: 'Chaat' },
      { slug: 'dry-fruits', name: 'Dry fruits' },
    ],
    priceBands: [
      { id: 'u50', label: 'Under ₹50', min: 0, max: 50 },
      { id: '50-99', label: '₹50 to ₹99', min: 50, max: 100 },
      { id: '100-199', label: '₹100 to ₹199', min: 100, max: 200 },
      { id: '200p', label: '₹200 and above', min: 200 },
    ],
  },
];

export const categorySlugs = categories.map((c) => c.slug) as CategorySlug[];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}