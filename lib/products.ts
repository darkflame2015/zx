export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  details: string[];
  badge?: string;
}

export const products: Product[] = [
  {
    id: 'trinity-cross',
    name: 'Trinity Cross Pendant',
    price: 4999,
    originalPrice: 6499,
    image: '/product-1.jpeg',
    category: 'Pendants',
    description: 'Three interlocked fleur-de-lis crosses in oxidized sterling silver on a box chain. A powerful trinity symbol representing faith, hope, and the eternal dark.',
    details: ['925 Sterling Silver', 'Oxidized antique finish', 'Box chain included', 'Pendant size: 40mm'],
    badge: 'Sale',
  },
  {
    id: 'rosary-cross',
    name: 'Rosary Shield Cross',
    price: 5999,
    image: '/product-2.jpeg',
    category: 'Pendants',
    description: 'An ornate rosary-style chain with floral medallion links leading to a bold shield cross pendant with gothic engravings.',
    details: ['925 Sterling Silver', 'Floral medallion chain', 'Hand-engraved details', 'Chain length: 22 inches'],
  },
  {
    id: 'reaper-pendant',
    name: 'Grim Reaper Pendant',
    price: 7499,
    image: '/product-3.jpeg',
    category: 'Pendants',
    description: 'A stunning sculptural reaper figure wielding twin scythes, cast in heavy sterling silver with intricate cloak detailing and a dark mirror finish.',
    details: ['Heavy 925 Sterling Silver', 'Sculptural 3D casting', 'Mirror-black oxidized finish', 'Pendant size: 55mm'],
    badge: 'Bestseller',
  },
  {
    id: 'gothic-cross',
    name: 'Gothic Flame Cross',
    price: 5499,
    originalPrice: 6999,
    image: '/product-4.jpeg',
    category: 'Pendants',
    description: 'An elaborate gothic cross pendant with pointed spires, skull bail, and filigree flame detailing. Carries the weight of centuries of dark artistry.',
    details: ['925 Sterling Silver', 'Skull bail detail', 'Gothic filigree work', 'Box chain: 24 inches'],
    badge: 'Sale',
  },
  {
    id: 'seraphim-cross',
    name: 'Seraphim Winged Cross',
    price: 8999,
    image: '/product-5.png',
    category: 'Pendants',
    description: 'Majestic winged cross with six fully articulated angel wings, ornate filigree body, and a commanding presence. Our most detailed piece.',
    details: ['Premium 925 Sterling Silver', 'Six detailed wing feathers', 'Articulated design', 'Pendant size: 65mm'],
    badge: 'Premium',
  },
  {
    id: 'tribal-cross',
    name: 'Tribal Fire Cross',
    price: 3999,
    image: '/product-6.jpeg',
    category: 'Pendants',
    description: 'A bold tribal-style cross with flowing flame motifs in polished sterling silver. Clean lines meet raw power in this modern gothic classic.',
    details: ['Polished 925 Silver', 'Tribal flame design', 'Lightweight comfort', 'Box chain: 20 inches'],
    badge: 'New',
  },
];

export const categories = ['All', 'Pendants'];
