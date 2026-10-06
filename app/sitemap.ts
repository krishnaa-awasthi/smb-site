import type { MetadataRoute } from 'next';

import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');

  // ---------------------------------------------------------------------------
  // Main website pages
  // ---------------------------------------------------------------------------

  const staticRoutes = [
    '',
    ...categories.map((category) => `/${category.slug}`),
    '/about',
    '/contact',
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  // ---------------------------------------------------------------------------
  // Product pages
  // ---------------------------------------------------------------------------

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/${product.category}/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: 'monthly',
    priority: product.featured || product.bestseller ? 0.8 : 0.6,
  }));

  return [...staticPages, ...productPages];
}