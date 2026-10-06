import { siteConfig } from '@/config/site';

const siteName = siteConfig.name;
const city = siteConfig.city;
const locality = siteConfig.locality.split(',')[0].trim();

export const categorySeo = {
  sweets: {
    title: `Sweet Shop in ${city}: Mithai & Gift Boxes | ${siteName}`,
    description:
      `Explore traditional Indian sweets from ${locality}, ${city}. ` +
      `Browse mithai, sizes and prices, then order directly on WhatsApp.`,
    heading: `Sweets in ${city}`,
    text:
      `${siteName} brings traditional Indian sweets to customers in ` +
      `${locality}, ${city}. Explore our sweets collection and choose ` +
      `the items and sizes that suit everyday treats, family occasions ` +
      `and gifting. Each product page includes available variants and ` +
      `pricing so you can decide before placing an order. Browse the ` +
      `collection, add your favourites to the cart and send your order ` +
      `through WhatsApp. For availability, special requirements or ` +
      `larger orders, contact the shop directly.`,
  },

  restaurant: {
    title: `Family Restaurant in ${city} | ${siteName}`,
    description:
      `Explore the ${siteName} restaurant menu in ${locality}, ${city}. ` +
      `Browse meals, snacks and drinks, then order directly on WhatsApp.`,
    heading: `Family Restaurant in ${city}`,
    text:
      `Visit the ${siteName} restaurant in ${locality}, ${city}, and ` +
      `browse the current food menu online. Explore individual dishes, ` +
      `check available options and prices, and decide what you would ` +
      `like before contacting the shop. The restaurant section is built ` +
      `for easy browsing on mobile, with direct WhatsApp ordering for ` +
      `convenience. For availability, larger orders or any special ` +
      `request, contact the shop before placing your order.`,
  },

  bakery: {
    title: `Bakery & Cake Shop in ${city} | ${siteName}`,
    description:
      `Browse cakes, pastries, cookies and bakery favourites from ` +
      `${locality}, ${city}. See products and prices and order on WhatsApp.`,
    heading: `Bakery & Cake Shop in ${city}`,
    text:
      `Explore the bakery collection from ${siteName} in ${locality}, ` +
      `${city}. Browse cakes, pastries, cookies and other bakery items, ` +
      `with product details and pricing available on the individual ` +
      `product pages. You can add products to your cart and send your ` +
      `order directly through WhatsApp. For cakes and larger orders, ` +
      `contact the shop in advance to confirm availability and any ` +
      `specific requirements.`,
  },

  namkeen: {
    title: `Namkeen & Snacks Shop in ${city} | ${siteName}`,
    description:
      `Browse namkeen and savoury snacks from ${locality}, ${city}. ` +
      `See products and prices and order directly on WhatsApp.`,
    heading: `Namkeen & Snacks in ${city}`,
    text:
      `Discover namkeen and savoury snacks from ${siteName} in ${locality}, ` +
      `${city}. Browse the collection to find everyday tea-time snacks, ` +
      `savoury favourites and other items available through the shop. ` +
      `Each product page provides the available details and pricing so ` +
      `you can choose with confidence. Add your selections to the cart ` +
      `and send the order through WhatsApp, or contact the shop directly ` +
      `to confirm availability for larger or special orders.`,
  },
} as const;

export type CategorySeoSlug = keyof typeof categorySeo;