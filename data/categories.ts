import type { Category, CategorySlug, PriceBand } from '@/types';

const genericBands: PriceBand[] = [
  { id: 'u200', label: 'Under ₹200', min: 0, max: 200 },
  { id: '200-500', label: '₹200 – ₹500', min: 200, max: 500 },
  { id: '500-1000', label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { id: '1000p', label: 'Above ₹1,000', min: 1000 },
];

/**
 * Subcategories and price bands. Sweets follow the client-approved listing design.
 * Intro lines are DRAFT copy: replace with client-confirmed text (never publish unconfirmed claims).
 */
export const categories: Category[] = [
  {
    slug: 'sweets',
    name: 'Sweets',
    intro: 'Mithai for gifting and for every day.',
    subcategories: [
      { slug: 'ghee-mithai', name: 'Ghee mithai' },
      { slug: 'khoya-specials', name: 'Khoya specials' },
      { slug: 'dry-fruit-sweets', name: 'Dry fruit sweets' },
      { slug: 'bengali-sweets', name: 'Bengali sweets' },
    ],
    priceBands: [
      { id: 'u300', label: 'Under ₹300', min: 0, max: 300 },
      { id: '300-600', label: '₹300 – ₹600', min: 300, max: 600 },
      { id: '600p', label: '₹600 and above', min: 600 },
    ],
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    intro: 'Hot meals, chai and chaat, served through the day.',
    subcategories: [
      { slug: 'breakfast', name: 'Breakfast' },
      { slug: 'snacks-chaat', name: 'Snacks and chaat' },
      { slug: 'main-course', name: 'Main course' },
      { slug: 'thali', name: 'Thali' },
      { slug: 'beverages', name: 'Beverages' },
      { slug: 'desserts', name: 'Desserts' },
    ],
    priceBands: genericBands,
  },
  {
    slug: 'bakery',
    name: 'Bakery',
    intro: 'Cakes, pastries and biscuits baked fresh.',
    subcategories: [
      { slug: 'cakes', name: 'Cakes' },
      { slug: 'pastries', name: 'Pastries' },
      { slug: 'cookies-biscuits', name: 'Cookies and biscuits' },
      { slug: 'brownies', name: 'Brownies' },
      { slug: 'breads-puffs', name: 'Breads and puffs' },
    ],
    priceBands: genericBands,
  },
  {
    slug: 'namkeen',
    name: 'Namkeen',
    intro: 'Crisp snacks by the kilo for tea time.',
    subcategories: [
      { slug: 'sev-bhujia', name: 'Sev and bhujia' },
      { slug: 'mixtures', name: 'Mixtures' },
      { slug: 'chips-wafers', name: 'Chips and wafers' },
      { slug: 'tea-time-snacks', name: 'Tea-time snacks' },
      { slug: 'papad-sides', name: 'Papad and sides' },
    ],
    priceBands: genericBands,
  },
];

export const categorySlugs = categories.map((c) => c.slug) as CategorySlug[];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}