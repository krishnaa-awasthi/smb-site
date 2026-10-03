import type { Product } from '@/types';
import { sweets } from './sweets';

// Restaurant, bakery and namkeen sample data are added in the data step.
export const products: Product[] = [...sweets];

/** Home page track: bestsellers first, then other featured items, by popularity. */
export function getBestsellers(limit = 8): Product[] {
  return products
    .filter((p) => p.bestseller || p.featured)
    .sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller) || b.popularity - a.popularity)
    .slice(0, limit);
}