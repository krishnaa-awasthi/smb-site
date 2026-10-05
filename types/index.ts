export type CategorySlug = 'sweets' | 'restaurant' | 'bakery' | 'namkeen';
export type Diet = 'veg' | 'egg'; // no non-veg in this business
export type Badge = 'bestseller' | 'new' | 'festive' | 'seasonal';

export interface Variant {
  id: string; // unique within product, e.g. "500g"
  label: string; // "500 g", "1 plate", "1 pc". Empty string for single-size items with no unit
  price: number; // whole rupees
  mrp?: number; // whole rupees, only if a real strike-through price exists
}

export interface Product {
  id: string;
  slug: string; // unique per category
  name: string;
  category: CategorySlug;
  subcategory: string; // subcategory slug, must exist in data/categories.ts for that category
  shortDescription: string; // one line, max ~60 chars
  description?: string; // optional: shown only when the shop supplies one
  images: { src: string; alt: string }[]; // 1 to 5
  variants: Variant[]; // at least 1; first is the default
  /** Undefined = not declared: no veg/egg mark is shown (the mark is a food-labelling declaration). */
  diet?: Diet;
  /** Open-price items: no fixed price. Shown as "Price on request"; customers ask on WhatsApp. Variants hold one entry with price 0. */
  priceOnRequest?: boolean;
  badges?: Badge[];
  featured?: boolean; // home featured track
  bestseller?: boolean;
  available: boolean;
  allowNote?: boolean; // e.g. message on cake
  ingredients?: string[];
  shelfLife?: string;
  popularity: number; // higher = earlier in default sort
  createdAt: string; // ISO date, for "Newest"
  tags?: string[]; // search only
}

export interface CartLine {
  key: string; // `${productId}:${variantId}`
  productId: string;
  variantId: string;
  qty: number; // 1..20
  note?: string; // only if product.allowNote
}

export interface Subcategory {
  slug: string;
  name: string;
}

export interface PriceBand {
  id: string;
  label: string;
  min: number; // inclusive, rupees
  max?: number; // exclusive; undefined = no upper limit
}

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Draft intro line, replace with client-confirmed copy (content/copy.ts later). */
  intro: string;
  subcategories: Subcategory[];
  priceBands: PriceBand[];
}