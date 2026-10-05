import { createCatalogue } from './builders';
import type { Product } from '@/types';

/**
 * Source: the sheet's "Bakery Items" group. All are Open Price, so they show "Price on request".
 * No veg/egg mark is set: the sheet does not say, and cakes or pastries may contain egg.
 */
const c = createCatalogue('bakery');

export const bakery: Product[] = [
  c.onRequest('Cake', 'bakery-items'),
  c.onRequest('Pastry', 'bakery-items'),
  c.onRequest('Biscuits', 'bakery-items'),
  c.onRequest('Namkeen', 'bakery-items'),
  c.onRequest('Juice', 'bakery-items'),
  c.onRequest('Coldrink', 'bakery-items'),
  c.onRequest('Chocolates', 'bakery-items'),
];