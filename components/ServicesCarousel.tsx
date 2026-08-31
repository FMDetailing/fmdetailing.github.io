'use client';

/**
 * Bridges the service catalog in lib/site.ts to the 3D coverflow carousel.
 * Photos live in public/images/ — swap the paths here to change card art.
 */
import CoverFlowCarousel, { type CarouselItem } from '@/components/ui/3-d-coverflow-carousel';
import { SERVICES } from '@/lib/site';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Per-service presentation: split title, tag, and background photo(s). */
const PRESENTATION: Record<
  string,
  { tag: string; titleLine1: string; titleLine2: string; img: string; img2?: string }
> = {
  interior: {
    tag: '#Interior',
    titleLine1: 'INTERIOR',
    titleLine2: '– FULL DEEP CLEAN',
    img: `${BASE}/images/interior-detail.jpg`,
  },
  exterior: {
    tag: '#Exterior',
    titleLine1: 'EXTERIOR',
    titleLine2: '– DEEP CLEAN & DETAIL',
    img: `${BASE}/images/exterior-wash.jpg`,
  },
  full: {
    tag: '#BestValue',
    titleLine1: 'FULL DETAILING',
    titleLine2: '– INTERIOR + EXTERIOR',
    // Diagonal cross-fade: exterior polish on top, interior below.
    img: `${BASE}/images/polish-hood.jpg`,
    img2: `${BASE}/images/interior-detail.jpg`,
  },
};

const ITEMS: CarouselItem[] = SERVICES.map((s) => {
  const p = PRESENTATION[s.id];
  return {
    tag: p?.tag,
    titleLine1: p?.titleLine1 ?? s.name.toUpperCase(),
    titleLine2: p?.titleLine2,
    desc: s.blurb,
    img: p?.img ?? `${BASE}/images/hero-audi.jpg`,
    img2: p?.img2,
    price: s.price,
    oldPrice: s.oldPrice,
    priceNote: s.duration,
    includes: s.includes,
    ctaText: 'Book This Service',
    ctaUrl: `${BASE}/booking/?service=${s.id}`,
  };
});

export default function ServicesCarousel({ sectionLabel = 'OUR SERVICES' }: { sectionLabel?: string }) {
  return <CoverFlowCarousel items={ITEMS} sectionLabel={sectionLabel} />;
}
