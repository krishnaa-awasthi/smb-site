import type { Product } from '@/types';

type ProductImage = {
  src: string;
  alt: string;
};

/**
 * Pexels-hosted images.
 *
 * These are temporary catalogue images until SMB provides
 * its own product photography.
 *
 * IMPORTANT:
 * These photographs are representative catalogue imagery,
 * not photographs of SMB's actual products.
 */
function pexels(
  id: number,
  alt: string,
  orientation: 'portrait' | 'landscape' = 'portrait',
): ProductImage {
  const width = orientation === 'portrait' ? 1200 : 1400;

  return {
    src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`,
    alt,
  };
}

/* -------------------------------------------------------------------------- */
/* Sweets                                                                     */
/* -------------------------------------------------------------------------- */

const sweets = {
  kaju: pexels(
    10514163,
    'Traditional Kaju Katli Indian sweets arranged on a plate',
  ),

  gulabJamun: pexels(
    18488298,
    'Traditional Indian Gulab Jamun sweets',
  ),

  rasgulla: pexels(
    39959153,
    'Fresh Rasgulla Indian sweets garnished with saffron',
    'landscape',
  ),

  rasmalai: pexels(
    39973385,
    'Traditional Indian Rasmalai garnished with nuts',
  ),

  laddoo: pexels(
    39959317,
    'Traditional Indian laddoos arranged on a serving tray',
  ),

  yellowLaddoo: pexels(
    40000006,
    'Golden Indian ladoo sweets on a rustic plate',
    'landscape',
  ),

  barfi: pexels(
    18488299,
    'Traditional Indian barfi sweets garnished with almonds',
  ),

  coconutLaddoo: pexels(
    34153206,
    'Traditional coconut laddoo Indian sweet',
  ),

  assorted: pexels(
    5878321,
    'Assorted traditional Indian sweets in a festive setting',
  ),

  sweetsDisplay: pexels(
    5864767,
    'Traditional Indian sweets including milk cake, barfi and ladoo',
    'landscape',
  ),
} satisfies Record<string, ProductImage>;

/* -------------------------------------------------------------------------- */
/* Restaurant                                                                 */
/* -------------------------------------------------------------------------- */

const restaurant = {
  dosa: pexels(
    32229637,
    'Traditional South Indian masala dosa served with chutney and sambar',
  ),

  dosaLandscape: pexels(
    20422123,
    'South Indian dosa meal served with chutneys and sambar',
    'landscape',
  ),

  northIndian: pexels(
    20422123,
    'Traditional Indian meal served with accompaniments',
    'landscape',
  ),

  noodles: pexels(
    19709548,
    'Asian-style noodles served as part of a restaurant meal',
    'landscape',
  ),

  pizza: pexels(
    36067437,
    'Fresh pizza served as part of a restaurant meal',
  ),

  burger: pexels(
    36067437,
    'Restaurant-style burger served with pizza and sides',
  ),

  sandwich: pexels(
    19709548,
    'Fresh sandwich served with other restaurant dishes',
    'landscape',
  ),

  snacks: pexels(
    28075291,
    'Crispy Indian samosas served on a plate',
    'landscape',
  ),

  coffee: pexels(
    19709548,
    'Restaurant meal and beverages served on a table',
    'landscape',
  ),

  drinks: pexels(
    19709548,
    'Refreshing restaurant beverages served with food',
    'landscape',
  ),

  mocktails: pexels(
    19709548,
    'Refreshing colourful beverage served in a restaurant setting',
    'landscape',
  ),
} satisfies Record<string, ProductImage>;

/* -------------------------------------------------------------------------- */
/* Namkeen                                                                    */
/* -------------------------------------------------------------------------- */

const namkeen = {
  samosa: pexels(
    28075291,
    'Crispy Indian samosas served on a plate',
    'landscape',
  ),

  samosaPortrait: pexels(
    36470473,
    'Freshly fried Indian samosas',
  ),

  chaat: pexels(
    8992923,
    'Indian samosas and savoury street food served with chutney',
  ),

  snacks: pexels(
    5031949,
    'Indian savoury snacks served on a plate',
  ),

  dryFruits: pexels(
    5878321,
    'Assorted Indian snacks and food arranged for serving',
  ),
} satisfies Record<string, ProductImage>;

/* -------------------------------------------------------------------------- */
/* Bakery                                                                     */
/* -------------------------------------------------------------------------- */

const bakery = {
  cake: pexels(
    7421265,
    'Fresh decorated vanilla cake served on a bakery table',
  ),

  pastry: pexels(
    1453465,
    'Fresh pastry displayed on a cake stand',
  ),

  biscuits: pexels(
    6280042,
    'Freshly baked biscuits arranged on a baking tray',
  ),

  assorted: pexels(
    13920948,
    'Assorted pastries and biscuits displayed in a bakery',
    'landscape',
  ),

  chocolate: pexels(
    8212187,
    'Assorted chocolate cakes and desserts displayed in a bakery',
  ),
} satisfies Record<string, ProductImage>;

/* -------------------------------------------------------------------------- */
/* Exact overrides                                                            */
/* -------------------------------------------------------------------------- */

const exact: Record<string, ProductImage> = {
  /* Sweets */

  'kaju-katli': sweets.kaju,

  rasgulla: sweets.rasgulla,

  rasmalai: sweets.rasmalai,

  'gulab-jamun': sweets.gulabJamun,

  'besan-laddo': sweets.yellowLaddoo,

  'motichoor-laddo': sweets.laddoo,

  'desi-ghee-motichoor-laddo': sweets.laddoo,

  'coconut-mewa-laddo': sweets.coconutLaddoo,

  /* Restaurant */

  'masala-dosa': restaurant.dosa,

  'mix-dosa': restaurant.dosa,

  'paneer-dosa': restaurant.dosa,

  'paper-dosa': restaurant.dosa,

  'butter-masala-dosa': restaurant.dosa,

  'butter-paneer-dosa': restaurant.dosa,

  'veg-uttapam': restaurant.dosa,

  'onion-uttapam': restaurant.dosa,

  'paneer-uttapam': restaurant.dosa,

  'chole-bhature': restaurant.northIndian,

  'pav-bhaji': restaurant.northIndian,

  'paneer-pakoda': restaurant.snacks,

  noodles: restaurant.noodles,

  'paneer-noodles': restaurant.noodles,

  'hakka-noodles': restaurant.noodles,

  'chilli-garlic-noodles': restaurant.noodles,

  'schezwan-noodles': restaurant.noodles,

  'singapuri-noodles': restaurant.noodles,

  'fried-rice': restaurant.noodles,

  'paneer-fried-rice': restaurant.noodles,

  'manchurian-rice': restaurant.noodles,

  'chilli-garlic-rice': restaurant.noodles,

  'schezwan-rice': restaurant.noodles,

  'manchurian-dry-gravy': restaurant.noodles,

  'paneer-manchurian-dry-gravy': restaurant.noodles,

  'chilli-paneer-dry-gravy': restaurant.noodles,

  'steamed-momos-8-pcs': restaurant.noodles,

  'fried-momos-8-pcs': restaurant.noodles,

  'gravy-momos-6-pcs': restaurant.noodles,

  'chilly-potato': restaurant.noodles,

  'honey-chilli-potato': restaurant.noodles,

  'capsicum-pizza': restaurant.pizza,

  'onion-pizza': restaurant.pizza,

  'tomato-pizza': restaurant.pizza,

  'golden-corn-pizza': restaurant.pizza,

  'paneer-capsicum-pizza': restaurant.pizza,

  'mushroom-cheese-pizza': restaurant.pizza,

  'double-cheese-pizza': restaurant.pizza,

  'veg-loaded-pizza': restaurant.pizza,

  'paneer-tandoori-pizza': restaurant.pizza,

  'smb-special-pizza': restaurant.pizza,

  'veg-sandwich': restaurant.sandwich,

  'tandoori-sandwich': restaurant.sandwich,

  'paneer-sandwich': restaurant.sandwich,

  'cheese-sandwich': restaurant.sandwich,

  'veg-burger': restaurant.burger,

  'tandoori-burger': restaurant.burger,

  'cheese-burger': restaurant.burger,

  'double-cheese-burger': restaurant.burger,

  'paneer-burger': restaurant.burger,

  'paneer-cheese-burger': restaurant.burger,

  'samosa-2-pcs': restaurant.snacks,

  'chola-samosa-2-pcs': restaurant.snacks,

  'crispy-corn': restaurant.snacks,

  

  'french-fries': restaurant.snacks,

  'peri-peri-fries': restaurant.snacks,

  'cold-coffee-classic': restaurant.coffee,

  'cold-coffee-hazelnut': restaurant.coffee,

  'cold-coffee-caramel': restaurant.coffee,

  'chocolate-cold-coffee': restaurant.coffee,

  'hot-coffee': restaurant.coffee,

  'chocolate-hot-coffee': restaurant.coffee,

  'cold-drink': restaurant.drinks,

  'masala-cold-drink': restaurant.drinks,

  'kulhad-lassi': restaurant.drinks,

  'mineral-water': restaurant.drinks,

  'chocolate-shake': restaurant.drinks,

  'vanilla-shake': restaurant.drinks,

  'mango-shake-pulp': restaurant.drinks,

  'strawberry-shake': restaurant.drinks,

  'oreo-shake': restaurant.drinks,

  'kit-kat-shake': restaurant.drinks,

  'bourbon-shake': restaurant.drinks,

  'caramel-shake': restaurant.drinks,

  'belgium-shake': restaurant.drinks,

  'virgin-mojito': restaurant.mocktails,

  'mint-blast': restaurant.mocktails,

  'green-apple': restaurant.mocktails,

  'blue-margarita': restaurant.mocktails,

  'blueberry-collar': restaurant.mocktails,

  'fruit-punch': restaurant.mocktails,

  'orange-malt': restaurant.mocktails,

  'personal-combo': restaurant.northIndian,

  'personal-combo-with-shake-nachos-fries': restaurant.northIndian,

  'burger-combo': restaurant.burger,

  'sandwich-combo': restaurant.sandwich,

  'chinese-combo': restaurant.noodles,

  'pizza-combo': restaurant.pizza,

  /* Namkeen */

  samosa: namkeen.samosaPortrait,

  dhokla: namkeen.snacks,

  khasta: namkeen.snacks,

  imarti: sweets.yellowLaddoo,

  

  'dahi-bada': namkeen.chaat,

  golgappe: namkeen.chaat,

  'dahi-golgappe': namkeen.chaat,

  'raj-kachori': namkeen.chaat,

  makhana: namkeen.dryFruits,

  kaju: namkeen.dryFruits,

  'masala-kaju': namkeen.dryFruits,

  pista: namkeen.dryFruits,

  anjeer: namkeen.dryFruits,

  walnut: namkeen.dryFruits,

  raisins: namkeen.dryFruits,

  dates: namkeen.dryFruits,

  /* Bakery */

  cake: bakery.cake,

  pastry: bakery.pastry,

  biscuits: bakery.biscuits,

  'bakery-namkeen': bakery.assorted,

  juice: restaurant.drinks,

  coldrink: restaurant.drinks,

  chocolates: bakery.chocolate,
};

/* -------------------------------------------------------------------------- */
/* Category-aware fallback rules                                              */
/* -------------------------------------------------------------------------- */

function getSweetImage(name: string): ProductImage {
  if (name.includes('kaju') || name.includes('cashew')) {
    return sweets.kaju;
  }

  if (name.includes('rasmalai')) {
    return sweets.rasmalai;
  }

  if (name.includes('gulab jamun')) {
    return sweets.gulabJamun;
  }

  if (
    name.includes('rasgulla') ||
    name.includes('rasbari')
  ) {
    return sweets.rasgulla;
  }

  if (
    name.includes('laddo') ||
    name.includes('ladoo')
  ) {
    return sweets.laddoo;
  }

  if (name.includes('coconut')) {
    return sweets.coconutLaddoo;
  }

  if (
    name.includes('barfi') ||
    name.includes('gilori') ||
    name.includes('kheerkadam')
  ) {
    return sweets.barfi;
  }

  if (
    name.includes('peda') ||
    name.includes('milk') ||
    name.includes('rabri') ||
    name.includes('cheena') ||
    name.includes('chumchum')
  ) {
    return sweets.sweetsDisplay;
  }

  return sweets.assorted;
}

function getRestaurantImage(name: string): ProductImage {
  if (
    name.includes('dosa') ||
    name.includes('uttapam')
  ) {
    return restaurant.dosa;
  }

  if (
    name.includes('noodle') ||
    name.includes('rice') ||
    name.includes('manchurian') ||
    name.includes('momos') ||
    name.includes('potato')
  ) {
    return restaurant.noodles;
  }

  if (name.includes('pizza')) {
    return restaurant.pizza;
  }

  if (name.includes('burger')) {
    return restaurant.burger;
  }

  if (name.includes('sandwich')) {
    return restaurant.sandwich;
  }

  if (
    name.includes('coffee') ||
    name.includes('shake')
  ) {
    return restaurant.coffee;
  }

  if (
    name.includes('drink') ||
    name.includes('lassi') ||
    name.includes('water')
  ) {
    return restaurant.drinks;
  }

  if (
    name.includes('mojito') ||
    name.includes('margarita') ||
    name.includes('blast') ||
    name.includes('punch') ||
    name.includes('malt')
  ) {
    return restaurant.mocktails;
  }

  if (
    name.includes('samosa') ||
    name.includes('tikki') ||
    name.includes('fries') ||
    name.includes('pakoda') ||
    name.includes('corn')
  ) {
    return restaurant.snacks;
  }

  return restaurant.northIndian;
}

function getNamkeenImage(name: string): ProductImage {
  if (name.includes('samosa')) {
    return namkeen.samosaPortrait;
  }

  if (
    name.includes('golgappe') ||
    name.includes('kachori') ||
    name.includes('tikki') ||
    name.includes('dahi')
  ) {
    return namkeen.chaat;
  }

  if (
    name.includes('kaju') ||
    name.includes('pista') ||
    name.includes('anjeer') ||
    name.includes('walnut') ||
    name.includes('raisin') ||
    name.includes('dates') ||
    name.includes('makhana')
  ) {
    return namkeen.dryFruits;
  }

  return namkeen.snacks;
}

function getBakeryImage(name: string): ProductImage {
  if (name.includes('cake')) {
    return bakery.cake;
  }

  if (name.includes('pastry')) {
    return bakery.pastry;
  }

  if (name.includes('biscuit')) {
    return bakery.biscuits;
  }

  if (name.includes('chocolate')) {
    return bakery.chocolate;
  }

  return bakery.assorted;
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

export function getProductImage(
  product: Pick<Product, 'name' | 'slug' | 'category'>,
): ProductImage {
  const exactImage = exact[product.slug];

  if (exactImage) {
    return exactImage;
  }

  const name = product.name.toLowerCase();

  switch (product.category) {
    case 'sweets':
      return getSweetImage(name);

    case 'restaurant':
      return getRestaurantImage(name);

    case 'namkeen':
      return getNamkeenImage(name);

    case 'bakery':
      return getBakeryImage(name);

    default:
      return sweets.assorted;
  }
}

export function getProductImages(
  product: Pick<Product, 'name' | 'slug' | 'category'>,
): ProductImage[] {
  return [getProductImage(product)];
}