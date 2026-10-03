import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, '');
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/cart', '/api/', '/dev-styleguide'] }],
    sitemap: `${base}/sitemap.xml`,
  };
}