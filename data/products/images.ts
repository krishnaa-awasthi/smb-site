import type { Product } from '@/types';

type ProductImage = {
  src: string;
  alt: string;
};

/**
 * Pexels-hosted images.
 *
 * These are temporary catalogue images until SMB provides
 * its own product photography.
 *
 * IMPORTANT:
 * Do not treat these photographs as exact representations
 * of SMB's products.
 */
function pexels(
  id: number,
  alt: string,
  orientation: 'portrait' | 'landscape' = 'portrait',
): ProductImage {
  const width = orientation === 'portrait' ? 1200 : 1400;

  return {
    src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`,
    alt,
  };
}

/*
 * Product-family images.
 *
 * We deliberately reuse an appropriate photograph for related
 * products instead of pretending that an unrelated photograph
 * is the exact product.
 */
const images = {
  kaju: pexels(
    10514163,
    'Traditional Kaju Katli Indian sweets arranged on a plate',
  ),

  gulabJamun: pexels(
    18488298,
    'Traditional Indian Gulab Jamun sweets',
  ),

  rasgulla: pexels(
    39959153,
    'Fresh Rasgulla Indian sweets garnished with saffron',
    'landscape',
  ),

  rasmalai: pexels(
    39973385,
    'Traditional Indian Rasmalai garnished with nuts',
  ),

  laddoo: pexels(
    39959317,
    'Traditional Indian laddoos arranged on a serving tray',
  ),

  yellowLaddoo: pexels(
    40000006,
    'Golden Indian ladoo sweets on a rustic plate',
    'landscape',
  ),

  barfi: pexels(
    18488299,
    'Traditional Indian barfi sweets garnished with almonds',
  ),

  coconutLaddoo: pexels(
    34153206,
    'Traditional coconut laddoo Indian sweet',
  ),

  assorted: pexels(
    5878321,
    'Assorted traditional Indian sweets in a festive setting',
  ),

  sweetsDisplay: pexels(
    5864767,
    'Traditional Indian sweets including milk cake, barfi and ladoo',
    'landscape',
  ),
} satisfies Record<string, ProductImage>;

/**
 * Exact overrides.
 *
 * When SMB eventually supplies its own photographs, these are
 * the only mappings that need to be replaced.
 */
const exact: Record<string, ProductImage> = {
  'kaju-katli': images.kaju,

  'rasgulla': images.rasgulla,

  'rasmalai': images.rasmalai,

  'gulab-jamun': images.gulabJamun,

  'besan-laddo': images.yellowLaddoo,

  'motichoor-laddo': images.laddoo,

  'desi-ghee-motichoor-laddo': images.laddoo,

  'coconut-mewa-laddo': images.coconutLaddoo,
};

/**
 * Select the closest appropriate photograph for a product.
 *
 * This keeps the actual product data clean. We don't need to
 * add image URLs to all 57 sweet records manually.
 */
export function getProductImage(product: Pick<Product, 'name' | 'slug'>): ProductImage {
  const exactImage = exact[product.slug];

  if (exactImage) {
    return exactImage;
  }

  const name = product.name.toLowerCase();

  // Kaju / cashew based sweets
  if (
    name.includes('kaju') ||
    name.includes('cashew')
  ) {
    return images.kaju;
  }

  // Rasmalai must be checked before generic Bengali sweets.
  if (name.includes('rasmalai')) {
    return images.rasmalai;
  }

  // Gulab Jamun
  if (name.includes('gulab jamun')) {
    return images.gulabJamun;
  }

  // Rasgulla / Rasbari
  if (
    name.includes('rasgulla') ||
    name.includes('rasbari')
  ) {
    return images.rasgulla;
  }

  // Laddoo family
  if (
    name.includes('laddo') ||
    name.includes('ladoo')
  ) {
    return images.laddoo;
  }

  // Coconut sweets
  if (name.includes('coconut')) {
    return images.coconutLaddoo;
  }

  // Barfi family
  if (
    name.includes('barfi') ||
    name.includes('gilori') ||
    name.includes('kheerkadam')
  ) {
    return images.barfi;
  }

  // Bengali / milk-based sweets
  if (
    name.includes('cheena') ||
    name.includes('chumchum') ||
    name.includes('milk') ||
    name.includes('peda') ||
    name.includes('rabri')
  ) {
    return images.sweetsDisplay;
  }

  // Gifting / miscellaneous sweets
  return images.assorted;
}

/**
 * Convenience helper for the catalogue builder.
 */
export function getProductImages(
  product: Pick<Product, 'name' | 'slug'>,
): ProductImage[] {
  return [getProductImage(product)];
}