import type {
  Badge,
  CategorySlug,
  Diet,
  Product,
  Variant,
} from '@/types';

import { getCategory } from '@/data/categories';
import { getProductImages } from './images';

/**
 * "Manchurian (Dry/Gravy)" -> "manchurian-dry-gravy"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface Options {
  /**
   * Shown in the Home favourites row.
   * Pick with the client: nothing in the sheet says what sells best.
   */
  featured?: boolean;

  badges?: Badge[];

  allowNote?: boolean;

  tags?: string[];
}

/**
 * Small helpers so each product remains one readable line
 * inside data/products/*.ts.
 *
 * Product order follows the shop's spreadsheet.
 */
export function createCatalogue(
  category: CategorySlug,
  diet?: Diet,
) {
  const cat = getCategory(category);

  if (!cat) {
    throw new Error(`Unknown category: ${category}`);
  }

  let order = 0;

  function make(
    name: string,
    subcategory: string,
    variants: Variant[],
    extra: Partial<Product> = {},
    options: Options = {},
  ): Product {
    const sub = cat.subcategories.find(
      (s) => s.slug === subcategory,
    );

    if (!sub) {
      throw new Error(
        `Unknown subcategory "${subcategory}" for "${name}" in ${category}`,
      );
    }

    const slug = slugify(name);

    order += 1;

    /*
     * Images are resolved centrally.
     *
     * This means product files stay focused on:
     * - product name
     * - category
     * - price
     * - variants
     *
     * and image management stays inside images.ts.
     */
    const productImages = getProductImages({
      name,
      slug,
    });

    return {
      id: `${category}-${slug}`,

      slug,

      name,

      category,

      subcategory,

      shortDescription: sub.name,

      images: productImages,

      variants,

      diet,

      available: true,

      popularity: 1000 - order,

      /*
       * This date is intentionally fixed.
       *
       * The spreadsheet does not contain product creation dates,
       * so we should not pretend these are actually new products.
       */
      createdAt: '2026-01-01',

      tags: [
        name,
        sub.name,
        ...(options.tags ?? []),
      ].map((tag) => tag.toLowerCase()),

      featured: options.featured,

      badges: options.badges,

      allowNote: options.allowNote,

      ...extra,
    };
  }

  return {
    /**
     * Products priced by kilogram.
     *
     * Pricing rule:
     *
     * 250 g = 1 kg price / 4
     * 500 g = 1 kg price / 2
     * 1 kg  = original price
     */
    perKg(
      name: string,
      subcategory: string,
      kgPrice: number,
      options?: Options,
    ): Product {
      if (kgPrice % 4 !== 0) {
        throw new Error(
          `"${name}": ${kgPrice} per kg does not divide evenly by 4. Decide a rounding rule.`,
        );
      }

      return make(
        name,
        subcategory,
        [
          {
            id: '250g',
            label: '250 g',
            price: kgPrice / 4,
          },
          {
            id: '500g',
            label: '500 g',
            price: kgPrice / 2,
          },
          {
            id: '1kg',
            label: '1 kg',
            price: kgPrice,
          },
        ],
        {},
        options,
      );
    },

    /**
     * Single-price products.
     *
     * Examples:
     * - 1 pc
     * - 1 plate
     * - 1 packet
     * - 1 box
     * - no unit
     */
    single(
      name: string,
      subcategory: string,
      price: number,
      unit = '',
      options?: Options,
    ): Product {
      return make(
        name,
        subcategory,
        [
          {
            id: slugify(unit) || 'standard',
            label: unit,
            price,
          },
        ],
        {},
        options,
      );
    },

    /**
     * Products whose price is not present in the spreadsheet.
     *
     * These display:
     *
     * "Price on request"
     */
    onRequest(
      name: string,
      subcategory: string,
      options?: Options,
    ): Product {
      return make(
        name,
        subcategory,
        [
          {
            id: 'on-request',
            label: '',
            price: 0,
          },
        ],
        {
          priceOnRequest: true,
        },
        options,
      );
    },
  };
}