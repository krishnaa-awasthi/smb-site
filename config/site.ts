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

  locality: '{{LOCALITY}}', // TODO(client)

  fullAddress:
    process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ??
    '',

  pincode: '{{PINCODE}}', // TODO(client)

  geo: {
    lat: '{{LAT}}', // TODO(client)
    lng: '{{LNG}}', // TODO(client)
  },

  mapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ??
    '',

  serviceRadiusKm: 15, // TODO(client): confirm, brief says 15 to 20 km

  servedAreas: [] as string[], // TODO(client)

  // ============================================================
  // BUSINESS DETAILS
  // ============================================================

  establishedYear: '1997',

  hours: '10 AM - 10 PM',

  fssai: 'qwerty123456789',

  

  // ============================================================
  // CONTACT
  // ============================================================

  /**
   * WhatsApp number.
   *
   * Expected format:
   * 919838879168
   */
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
    '',

  /**
   * Public telephone number.
   *
   * Display format can include +91.
   */
  callNumber:
    process.env.NEXT_PUBLIC_CALL_NUMBER ??
    '',

  email:
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL ??
    '',

  // ============================================================
  // SOCIAL MEDIA
  // ============================================================

  social: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
      '',

    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ??
      '',

    youtube: '',
  },

  // ============================================================
  // GOOGLE BUSINESS PROFILE
  // ============================================================

  gbpUrl: '', // TODO(client)

  reviewLink: '', // TODO(client)

  // ============================================================
  // DELIVERY
  // ============================================================

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

  gscVerification: '',

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