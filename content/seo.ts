import { siteConfig } from '@/config/site';

const siteName = siteConfig.name;
const city = siteConfig.city;
const locality = siteConfig.locality.split(',')[0].trim();

export const categorySeo = {
  sweets: {
    title: `Sweet Shop in ${city}: Mithai & Gift Boxes | ${siteName}`,
    description:
      `Explore Indian sweets from ${locality}, ${city}. ` +
      `Browse mithai, sizes and prices, then order directly on WhatsApp.`,

    heading: `Sweets in ${city}`,

    text:
      `${siteName} offers a selection of Indian sweets for customers in ` +
      `${locality}, ${city}. Browse the sweets collection to explore ` +
      `available products, sizes and prices for everyday treats, family ` +
      `occasions and gifting. Product pages show the available variants ` +
      `so you can choose what suits your order. Add your favourites to ` +
      `the cart and send the order directly through WhatsApp. For ` +
      `availability, special requirements or larger orders, contact the ` +
      `shop directly before placing your order.`,
  },

  restaurant: {
    title: `Family Restaurant in ${city} | ${siteName}`,
    description:
      `Explore the ${siteName} restaurant menu in ${locality}, ${city}. ` +
      `Browse meals, snacks and drinks, then order on WhatsApp.`,

    heading: `Family Restaurant in ${city}`,

    text:
      `Explore the restaurant menu at ${siteName} in ${locality}, ` +
      `${city}. Browse available meals, snacks and drinks, check the ` +
      `listed details and prices, and choose what you would like before ` +
      `ordering. Products can be added to the cart and sent directly ` +
      `through WhatsApp for a convenient ordering experience. For ` +
      `availability, larger orders or specific requirements, contact the ` +
      `shop directly before placing your order.`,
  },

  bakery: {
    title: `Bakery & Cake Shop in ${city} | ${siteName}`,
    description:
      `Browse bakery items and cakes from ${locality}, ${city}. ` +
      `See products and prices and order directly on WhatsApp.`,

    heading: `Bakery & Cake Shop in ${city}`,

    text:
      `Explore bakery items from ${siteName} in ${locality}, ${city}. ` +
      `Browse cakes, pastries, cookies and other bakery products, with ` +
      `available details and pricing shown on the product pages. Add ` +
      `your selected items to the cart and send the order through ` +
      `WhatsApp. For cakes, larger orders or specific requirements, ` +
      `contact the shop in advance to confirm availability.`,
  },

  namkeen: {
    title: `Namkeen & Snacks Shop in ${city} | ${siteName}`,
    description:
      `Browse namkeen and savoury snacks from ${locality}, ${city}. ` +
      `See products and prices and order directly on WhatsApp.`,

    heading: `Namkeen & Snacks in ${city}`,

    text:
      `Discover namkeen and savoury snacks from ${siteName} in ` +
      `${locality}, ${city}. Browse the collection to explore available ` +
      `snacks, product details and prices. Add your selections to the ` +
      `cart and send your order directly through WhatsApp. For larger ` +
      `orders, availability questions or specific requirements, contact ` +
      `the shop directly before placing your order.`,
  },
} as const;

export type CategorySeoSlug = keyof typeof categorySeo;