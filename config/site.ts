/**
 * Single source of truth for business details.
 *
 * Public business information is loaded from .env.local.
 * Do not hardcode client-specific values here when they are
 * available through environment variables.
 *
 * Anything marked TODO(client) is intentionally left unresolved.
 * Never invent real business information.
 */

export const siteConfig = {
  // ============================================================
  // BRAND
  // ============================================================

  name:
    process.env.NEXT_PUBLIC_BUSINESS_NAME ??
    'Shiv Mishthan Bhandar',

  tagline: 'Happiness is also Sweet',

  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000',

  // ============================================================
  // LOCATION
  // ============================================================

  city:
    process.env.NEXT_PUBLIC_BUSINESS_CITY ??
    'Kanpur',

  locality: 'Kalyanpur, Kanpur Nagar', // TODO(client)

  fullAddress:
    process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ??
    '',

  pincode: '208017', // TODO(client)

  geo: {
    lat: '{{LAT}}', // TODO(client)
    lng: '{{LNG}}', // TODO(client)
  },

  mapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ??
    '',

  serviceRadiusKm: 25,
  servedAreas: [] as string[],
  establishedYear: '1997',
  hours: '10 AM - 10 PM',
  fssai: 'qwerty123456789',
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
    '',
  callNumber:
    process.env.NEXT_PUBLIC_CALL_NUMBER ??
    '',

  email:
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL ??
    '',
  social: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
      '',

    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ??
      '',

    youtube: '',
  },

  gbpUrl: '', // TODO(client)

  reviewLink: '', // TODO(client)


  delivery: {
    note:
      'Delivery charges, if any, are confirmed by the shop on WhatsApp.',
  },

  // ============================================================
  // ANALYTICS
  // ============================================================

  gaId:
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ??
    '',

  gscVerification:
  process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION ?? '',

} as const;


// ============================================================
// NAVIGATION
// ============================================================

export const navLinks = [
  { href: '/sweets', label: 'Sweets' },
  { href: '/restaurant', label: 'Restaurant' },
  { href: '/bakery', label: 'Bakery' },
  { href: '/namkeen', label: 'Namkeen' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;


// ============================================================
// WHATSAPP
// ============================================================

export function whatsappChatUrl(
  text = 'Hello, I would like to place an order.',
): string {
  const phone = siteConfig.whatsappNumber.replace(/\D/g, '');

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}


// ============================================================
// TELEPHONE
// ============================================================

export function telUrl(): string {
  const phone = siteConfig.callNumber.replace(/\D/g, '');

  return `tel:${phone}`;
}