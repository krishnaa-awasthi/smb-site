import { describe, expect, it } from 'vitest';
import { formatINR, percentOff } from './money';

describe('formatINR', () => {
  it('formats whole rupees with Indian grouping', () => {
    expect(formatINR(650).replace(/\s/g, '')).toBe('₹650');
    expect(formatINR(125000).replace(/\s/g, '')).toBe('₹1,25,000');
  });
});

describe('percentOff', () => {
  it('returns 0 without an mrp or when mrp is not higher', () => {
    expect(percentOff(650)).toBe(0);
    expect(percentOff(650, 650)).toBe(0);
    expect(percentOff(650, 600)).toBe(0);
  });
  it('rounds the discount percentage', () => {
    expect(percentOff(650, 700)).toBe(7);
    expect(percentOff(450, 500)).toBe(10);
  });
});