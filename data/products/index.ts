import type { CategorySlug, Product } from '@/types';
import { bakery } from './bakery';
import { namkeen } from './namkeen';
import { restaurant } from './restaurant';
import { sweets } from './sweets';

/** Every product, grouped by category (each file keeps the shop sheet's order). */
export const products: Product[] = [...sweets, ...restaurant, ...bakery, ...namkeen];

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProduct(category: string, slug: string): Product | undefined {
  return products.find((p) => p.category === category && p.slug === slug);
}

/** Home favourites row: marked items that have a fixed price, by the sheet's order. */
export function getBestsellers(limit = 8): Product[] {
  return products
    .filter((p) => (p.bestseller || p.featured) && p.available && !p.priceOnRequest)
    .sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller) || b.popularity - a.popularity)
    .slice(0, limit);
}