import { describe, expect, it } from 'vitest';
import { categories } from '@/data/categories';
import { getProduct, products } from './index';

describe('product catalogue', () => {
  it('contains every product from the shop sheet (179)', () => {
    expect(products).toHaveLength(179);
  });

  it('has unique ids and unique slugs inside each category', () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    for (const c of categories) {
      const slugs = products.filter((p) => p.category === c.slug).map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it('only uses subcategories that exist for the category', () => {
    for (const p of products) {
      const cat = categories.find((c) => c.slug === p.category);
      expect(
        cat?.subcategories.some((s) => s.slug === p.subcategory),
        p.name,
      ).toBe(true);
    }
  });

  it('keeps every price a whole number of rupees', () => {
    for (const p of products) {
      expect(p.variants.length, p.name).toBeGreaterThan(0);
      for (const v of p.variants) {
        expect(Number.isInteger(v.price), `${p.name} ${v.label}`).toBe(true);
        expect(v.price).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('shows price on request only for open-price items, and prices everything else', () => {
    for (const p of products) {
      if (p.priceOnRequest)
        expect(
          p.variants.every((v) => v.price === 0),
          p.name,
        ).toBe(true);
      else
        expect(
          p.variants.every((v) => v.price > 0),
          p.name,
        ).toBe(true);
    }
  });

  it('prices per-kg items as 250 g = kg / 4 and 500 g = kg / 2', () => {
    const perKg = products.filter((p) => p.variants.length === 3);
    expect(perKg.length).toBe(51); // 49 per-kg sweets plus Dhokla and Imarti, as in the sheet
    for (const p of perKg) {
      const [q, h, kg] = p.variants;
      expect([q.id, h.id, kg.id]).toEqual(['250g', '500g', '1kg']);
      expect(q.price * 4, p.name).toBe(kg.price);
      expect(h.price * 2, p.name).toBe(kg.price);
    }
  });

  it('matches known examples from the sheet', () => {
    const prices = (cat: string, slug: string) =>
      getProduct(cat, slug)?.variants.map((v) => v.price);
    expect(prices('sweets', 'kaju-katli')).toEqual([300, 600, 1200]);
    expect(prices('sweets', 'besan-laddo')).toEqual([75, 150, 300]);
    expect(prices('sweets', 'rasgulla')).toEqual([20]);
    expect(prices('namkeen', 'dhokla')).toEqual([50, 100, 200]);
    expect(prices('restaurant', 'masala-dosa')).toEqual([140]);
    expect(getProduct('bakery', 'cake')?.priceOnRequest).toBe(true);
  });

  it('never shows a veg mark for bakery items (diet unknown)', () => {
    expect(products.filter((p) => p.category === 'bakery').every((p) => p.diet === undefined)).toBe(
      true,
    );
  });
});