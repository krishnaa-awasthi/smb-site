import { siteConfig } from '@/config/site';

export function BusinessJsonLd() {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const locality = siteConfig.locality.split(',')[0].trim();

  const sameAs = [
    siteConfig.gbpUrl,
    siteConfig.social.instagram,
    siteConfig.social.facebook,
  ].filter(Boolean);

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',

    // SMB operates as both a physical store and food establishment.
    '@type': ['Store', 'FoodEstablishment'],

    '@id': `${baseUrl}/#business`,
    name: siteConfig.name,
    url: baseUrl,

    description:
      `Shiv Mishthan Bhandar is a sweets, bakery, namkeen and family ` +
      `restaurant business serving customers in ${siteConfig.city}.`,

    telephone: siteConfig.callNumber || siteConfig.whatsappNumber,

    logo: `${baseUrl}/brand/logo.png`,

    // Use the actual site/brand image that is already deployed.
    image: `${baseUrl}/images/hero/mithai-platter.png`,

    priceRange: '₹₹',

    servesCuisine: ['Indian', 'Sweets', 'Bakery'],

    foundingDate: siteConfig.establishedYear,

    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.fullAddress,
      addressLocality: locality,
      addressRegion: 'Uttar Pradesh',
      postalCode: siteConfig.pincode,
      addressCountry: 'IN',
    },

    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '22:00',
      },
    ],

    ...(siteConfig.mapsUrl
      ? {
          hasMap: siteConfig.mapsUrl,
        }
      : {}),

    ...(sameAs.length > 0
      ? {
          sameAs,
        }
      : {}),
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