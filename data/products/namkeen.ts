import { createCatalogue } from './builders';
import type { Product } from '@/types';

/**
 * Source: the sheet's SNACKS category (Snacks, Chaat, Dry fruits), in the sheet's order. Per-kg items get
 * 250 g / 500 g / 1 kg. Dry fruits are priced per packet or per box (the sheet gives no weights).
 * CONFIRM with the client: vegetarian marks.
 */
const c = createCatalogue('namkeen', 'veg');

export const namkeen: Product[] = [
  c.single('Samosa', 'snacks', 10, '1 pc'),
  c.perKg('Dhokla', 'snacks', 200),
  c.single('Khasta', 'snacks', 30, '1 pc'),
  c.perKg('Imarti', 'snacks', 360),
  c.single('Aloo Tikki', 'chaat', 60, '1 plate'),
  c.single('Dahi Bada', 'chaat', 50, '1 plate'),
  c.single('Golgappe', 'chaat', 20, '1 plate'),
  c.single('Dahi Golgappe', 'chaat', 50, '1 plate'),
  c.single('Raj Kachori', 'chaat', 100, '1 plate'),
  c.single('Makhana', 'dry-fruits', 320, '1 packet'),
  c.single('Kaju', 'dry-fruits', 300, '1 box'),
  c.single('Masala Kaju', 'dry-fruits', 350, '1 box'),
  c.single('Pista', 'dry-fruits', 350, '1 packet'),
  c.single('Anjeer', 'dry-fruits', 300, '1 box'),
  c.single('Walnut', 'dry-fruits', 300, '1 box'),
  c.single('Raisins', 'dry-fruits', 150, '1 packet'),
  c.single('Dates', 'dry-fruits', 120, '1 packet'),
];