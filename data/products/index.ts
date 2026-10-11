
import type { CategorySlug, Product } from '@/types';

import { bakery } from './bakery';
import { namkeen } from './namkeen';
import { restaurant } from './restaurant';
import { sweets } from './sweets';
import { getProductImages } from './images';

/**
 * Raw catalogue data, grouped in the shop's original sheet order.
 * Product definitions remain independent of their image files.
 */
const rawProducts: Product[] = [
  ...sweets,
  ...restaurant,
  ...bakery,
  ...namkeen,
];

/**
 * Apply image resolution centrally to every product.
 *
 * Resolution order is handled by getProductImages():
 * 1. Matching local product image
 * 2. Existing manually selected image
 * 3. Existing category/name fallback
 *
 * Product names, prices, variants and catalogue order remain unchanged.
 */
export const products: Product[] = rawProducts.map((product) => ({
  ...product,
  images: getProductImages(product),
}));

/** Return products belonging to a category, preserving catalogue order. */
export function getProductsByCategory(
  category: CategorySlug,
): Product[] {
  return products.filter((product) => product.category === category);
}

/** Look up a product using its category and slug. */
export function getProduct(
  category: string,
  slug: string,
): Product | undefined {
  return products.find(
    (product) =>
      product.category === category &&
      product.slug === slug,
  );
}

/**
 * Home favourites row: only available products with fixed prices.
 * Ordering behavior is preserved from the existing implementation.
 */
export function getBestsellers(limit = 8): Product[] {
  return products
    .filter(
      (product) =>
        (product.bestseller || product.featured) &&
        product.available &&
        !product.priceOnRequest,
    )
    .sort(
      (a, b) =>
        Number(!!b.bestseller) -
          Number(!!a.bestseller) ||
        b.popularity - a.popularity,
    )
    .slice(0, limit);
}
