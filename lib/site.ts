/**
 * Central place for business info & service catalog.
 * Edit here — every page reads from this file.
 */

export const SITE = {
  name: 'FM Detailing',
  tagline: 'Showroom shine, delivered.',
  owner: 'Fehaan Malik',
  phone: '+1 (647) 787-1811',
  phoneHref: 'tel:+16477871811',
  serviceArea: 'Serving the Greater Toronto Area (GTA), Ontario',
};

export type Service = {
  id: string;
  name: string;
  price: number;
  /** Original price — when set, shown struck through next to `price` (sale). */
  oldPrice?: number;
  duration: string;
  blurb: string;
  includes: string[];
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: 'interior',
    name: 'Full Interior Deep Clean',
    price: 100,
    duration: '~2 hours',
    blurb:
      'A complete top-to-bottom reset of your cabin — every surface cleaned, conditioned, and refreshed.',
    includes: [
      'Full vacuum: seats, carpets, mats & trunk',
      'Steam clean & shampoo of upholstery and carpets',
      'Leather & vinyl cleaned and conditioned',
      'Dashboard, console & door panels detailed',
      'Interior glass cleaned streak-free',
      'Deodorizing finish',
    ],
  },
  {
    id: 'exterior',
    name: 'Exterior Deep Clean & Detail',
    price: 100,
    duration: '~2 hours',
    blurb:
      'A meticulous hand wash and exterior detail that brings back that fresh-off-the-lot gloss.',
    includes: [
      'Two-bucket hand wash & foam pre-soak',
      'Wheel, tire & wheel-well deep clean',
      'Bug & tar removal',
      'Hand-applied wax / sealant protection',
      'Tire shine & trim dressing',
      'Exterior glass polished',
    ],
  },
  {
    id: 'full',
    name: 'Full Car Detailing',
    price: 150,
    oldPrice: 200,
    duration: '~4 hours',
    blurb:
      'The complete package — interior and exterior, done in one visit. Our best value.',
    includes: [
      'Everything in the Interior Deep Clean',
      'Everything in the Exterior Deep Clean',
      'Door jambs & sills detailed',
      'Final walkaround & finishing touches',
    ],
    featured: true,
  },
];
