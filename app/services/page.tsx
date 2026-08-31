import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import ServiceCard from '@/components/ServiceCard';
import { SERVICES, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `Services & Pricing — ${SITE.name}`,
  description:
    'Interior deep cleans, exterior detailing, and full car detailing packages with flat, honest pricing.',
};

export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Services &amp; Pricing</span>
          <h2 className="section-title">
            Detailing done <span className="gradient-text">right</span>
          </h2>
          <p className="section-sub" style={{ marginBottom: 48 }}>
            Every package is a flat price with everything listed up front.
            Not sure which one fits? Call or text{' '}
            <a href={SITE.phoneHref} style={{ color: 'var(--accent)', fontWeight: 600 }}>
              {SITE.phone}
            </a>{' '}
            and we&apos;ll point you the right way.
          </p>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 130}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div
            className="card"
            style={{
              marginTop: 40,
              padding: '26px 30px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ fontSize: 18, marginBottom: 4 }}>Good to know</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14.5, maxWidth: 640 }}>
                We come to you anywhere in the GTA. Heavily soiled vehicles,
                pet hair, or oversized vehicles (trucks, 3-row SUVs) may need
                extra time — we&apos;ll always confirm before starting.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
