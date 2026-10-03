import type { MetadataRoute } from 'next';
import { categories } from '@/data/categories';
import { siteConfig } from '@/config/site';

// TODO(step 4): add every product page once the catalogue exists.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const routes = ['', ...categories.map((c) => `/${c.slug}`), '/about', '/contact'];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}