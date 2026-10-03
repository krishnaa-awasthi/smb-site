/** Money is always whole rupees (integers). No floats, no tax, no delivery maths. */
export const formatINR = (n: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);

export const percentOff = (price: number, mrp?: number): number =>
  mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;