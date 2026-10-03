/**
 * Single source of truth for business details (prd.md §7, seo.md §3).
 * Anything marked TODO(client) is a placeholder: never invent real values.
 * Tokens like {{LOCALITY}} are shown as-is until the client confirms the real value.
 */
export const siteConfig = {
  name: 'Shiv Mishthan Bhandar',
  tagline: 'Happiness is also Sweet',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  city: 'Kanpur',
  locality: '{{LOCALITY}}', // TODO(client)
  fullAddress: '{{FULL_ADDRESS}}', // TODO(client): must match signboard, GBP and directories exactly
  pincode: '{{PINCODE}}', // TODO(client)
  geo: { lat: '{{LAT}}', lng: '{{LNG}}' }, // TODO(client)
  mapsUrl: '{{MAPS_URL}}', // TODO(client)
  serviceRadiusKm: 15, // TODO(client): confirm, brief says 15 to 20 km
  servedAreas: [] as string[], // TODO(client): localities within the radius they really serve

  establishedYear: '{{ESTABLISHED_YEAR}}', // TODO(client)
  hours: '{{HOURS}}', // TODO(client)
  fssai: '{{FSSAI_NO}}', // TODO(client)
  founderName: '{{FOUNDER_NAME}}', // TODO(client)

  /** Digits with country code, no plus sign. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '91XXXXXXXXXX',
  callNumber: process.env.NEXT_PUBLIC_CALL_NUMBER ?? '+91XXXXXXXXXX',

  social: {
    instagram: '', // TODO(client)
    facebook: '', // TODO(client)
    youtube: '', // TODO(client)
  },

  gbpUrl: '', // TODO(client): Google Business Profile link
  reviewLink: '', // TODO(client)

  delivery: {
    note: 'Delivery charges, if any, are confirmed by the shop on WhatsApp.',
  },

  gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? '',
} as const;

export const navLinks = [
  { href: '/sweets', label: 'Sweets' },
  { href: '/restaurant', label: 'Restaurant' },
  { href: '/bakery', label: 'Bakery' },
  { href: '/namkeen', label: 'Namkeen' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export function whatsappChatUrl(text = 'Hello, I would like to place an order.'): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function telUrl(): string {
  return `tel:${siteConfig.callNumber}`;
}