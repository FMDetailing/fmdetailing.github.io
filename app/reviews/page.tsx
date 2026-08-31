import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `Reviews & Results — ${SITE.name}`,
  description:
    'Before & after results and reviews from FM Detailing customers across the GTA.',
};

/**
 * Placeholder testimonials — swap in real customer reviews as they come in.
 */
const REVIEWS = [
  {
    name: 'Placeholder Review',
    car: 'Sedan · Full Detail',
    stars: 5,
    text: 'Real customer reviews will live here soon. This card shows how a five-star review will look once the first happy customers roll in.',
  },
  {
    name: 'Placeholder Review',
    car: 'SUV · Interior Deep Clean',
    stars: 5,
    text: 'Another spot reserved for a glowing review. Coffee stains, crumbs, pet hair — before and after photos will do the talking.',
  },
  {
    name: 'Placeholder Review',
    car: 'Coupe · Exterior Detail',
    stars: 5,
    text: 'Swap this out with real feedback after the first bookings. Ask customers for a quick line and a photo of their car!',
  },
];

const GALLERY = [
  {
    title: 'Exterior gloss restored',
    before: '/images/before-1.svg',
    after: '/images/after-1.svg',
  },
  {
    title: 'Full detail transformation',
    before: '/images/before-2.svg',
    after: '/images/after-2.svg',
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div aria-label={`${n} out of 5 stars`} style={{ color: '#ffd166', letterSpacing: 3, fontSize: 15 }}>
      {'★'.repeat(n)}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Before &amp; After</span>
            <h2 className="section-title">
              The results speak for <span className="gradient-text">themselves</span>
            </h2>
            <p className="section-sub" style={{ marginBottom: 44 }}>
              Drag the slider to compare. Real photos coming soon — these are
              placeholders until the first details are in the books.
            </p>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 28,
            }}
          >
            {GALLERY.map((g, i) => (
              <Reveal key={g.title} delay={i * 140}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <BeforeAfterSlider before={g.before} after={g.after} alt={g.title} />
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>
                    {g.title}
                  </strong>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-elevated)', paddingTop: 72 }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Reviews</span>
            <h2 className="section-title">What customers say</h2>
          </Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 22,
              marginTop: 36,
            }}
          >
            {REVIEWS.map((r, i) => (
              <Reveal key={i} delay={i * 130}>
                <div
                  className="card"
                  style={{
                    padding: '26px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    height: '100%',
                  }}
                >
                  <Stars n={r.stars} />
                  <p style={{ color: 'var(--text-muted)', fontSize: 15, flex: 1 }}>
                    “{r.text}”
                  </p>
                  <div>
                    <strong style={{ fontSize: 15 }}>{r.name}</strong>
                    <div style={{ color: 'var(--text-faint)', fontSize: 13.5 }}>{r.car}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
