import { siteConfig } from '@/config/site';

type BreadcrumbJsonLdProps = {
  categoryName: string;
  categorySlug: string;
};

export function BreadcrumbJsonLd({
  categoryName,
  categorySlug,
}: BreadcrumbJsonLdProps) {
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: `${baseUrl}/${categorySlug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}