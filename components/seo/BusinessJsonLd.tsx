import { siteConfig } from '@/config/site';

export function BusinessJsonLd() {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const locality = siteConfig.locality.split(',')[0].trim();

  const sameAs = [
    siteConfig.gbpUrl,
    siteConfig.social.instagram,
    siteConfig.social.facebook,
  ].filter(Boolean);

  const primaryPhone =
    siteConfig.callNumber || siteConfig.whatsappNumber;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',

    '@type': ['Store', 'FoodEstablishment'],

    '@id': `${baseUrl}/#business`,

    name: siteConfig.name,
    url: baseUrl,

    description:
      `${siteConfig.name} is a sweets, bakery, namkeen and family ` +
      `restaurant business serving customers in ${siteConfig.city}.`,

    logo: `${baseUrl}/brand/logo.png`,

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

    ...(primaryPhone
      ? {
          telephone: primaryPhone,
        }
      : {}),

    ...(siteConfig.email
      ? {
          email: siteConfig.email,
        }
      : {}),

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