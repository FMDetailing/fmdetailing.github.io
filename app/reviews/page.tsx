import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { SITE } from '@/lib/site';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

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
    title: 'Lexus IS — driver’s side deep clean',
    before: '/images/reviews/lexus-before.jpg',
    after: '/images/reviews/lexus-after.jpg',
  },
  {
    title: 'Lexus IS — centre console & cup holders',
    before: '/images/reviews/lexus-cup-before.jpg',
    after: '/images/reviews/lexus-cup-after.jpg',
  },
  {
    title: 'Toyota Camry — dash, mats & carpets revived',
    before: '/images/reviews/camry-before.jpg',
    after: '/images/reviews/camry-after.jpg',
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div
      aria-label={`${n} out of 5 stars`}
      style={{ color: 'var(--accent-300)', letterSpacing: '0.32em', fontSize: 13 }}
    >
      {'★'.repeat(n)}
    </div>
  );
}

/** Standalone finished-result shot — same card treatment as the pairs, one full-width image. */
function FinishedShot({ src, title }: { src: string; title: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          position: 'relative',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}${src}`}
          alt={`${title} — finished result`}
          style={{
            width: '100%',
            aspectRatio: '3 / 2',
            objectFit: 'cover',
            objectPosition: 'center 42%',
            display: 'block',
          }}
        />
        <span
          className="mono"
          style={{
            position: 'absolute',
            left: 12,
            bottom: 10,
            fontSize: 9,
            color: 'var(--accent-200)',
          }}
        >
          FINISHED RESULT
        </span>
      </div>
      <strong style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.02em' }}>{title}</strong>
    </div>
  );
}

/** Before/after pair — side by side with a 1px gap, labelled in mono. */
function BeforeAfterPair({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 1,
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', background: 'var(--surface)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}${before}`}
            alt={`${title} — before`}
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <span
            className="mono"
            style={{
              position: 'absolute',
              left: 12,
              bottom: 10,
              fontSize: 9,
              color: 'var(--text-muted)',
            }}
          >
            BEFORE
          </span>
        </div>
        <div style={{ position: 'relative', background: 'var(--surface)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}${after}`}
            alt={`${title} — after`}
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <span
            className="mono"
            style={{
              position: 'absolute',
              left: 12,
              bottom: 10,
              fontSize: 9,
              color: 'var(--accent-200)',
            }}
          >
            AFTER
          </span>
        </div>
      </div>
      <strong style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.02em' }}>{title}</strong>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">01 / Recent Details</span>
            <h2 className="section-title">
              The results speak for <span className="accent-text">themselves</span>
            </h2>
            <p className="section-sub" style={{ marginBottom: 44 }}>
              Real before &amp; after photos from recent clients — interior deep
              cleans on a Lexus IS and a Toyota Camry.
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
                <BeforeAfterPair before={g.before} after={g.after} title={g.title} />
              </Reveal>
            ))}
            <Reveal delay={GALLERY.length * 140}>
              <FinishedShot
                src="/images/reviews/lexus-side-after.jpg"
                title="Lexus IS — passenger side, ready for pickup"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-elevated)', padding: '72px 0' }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">02 / Reviews</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 22, flexWrap: 'wrap' }}>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                What customers say
              </h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span
                  style={{
                    fontSize: 46,
                    fontWeight: 600,
                    letterSpacing: '-0.05em',
                    color: 'var(--accent-200)',
                    lineHeight: 1,
                  }}
                >
                  4.9
                </span>
                <span className="mono" style={{ fontSize: 10, color: 'var(--accent-700)' }}>
                  AVG RATING
                </span>
              </div>
            </div>
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
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                    <strong style={{ fontSize: 14.5, fontWeight: 500 }}>{r.name}</strong>
                    <div className="mono" style={{ fontSize: 9.5, color: 'var(--accent-700)', marginTop: 4 }}>
                      {r.car}
                    </div>
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
