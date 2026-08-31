import Link from 'next/link';
import Reveal from '@/components/Reveal';
import ServiceCard from '@/components/ServiceCard';
import { SERVICES, SITE } from '@/lib/site';

const STEPS = [
  {
    n: '01',
    title: 'Book online',
    body: 'Pick your service and a time that works. We confirm by text within the hour.',
  },
  {
    n: '02',
    title: 'We come to you',
    body: 'Home or work, anywhere in the GTA — we arrive with everything needed.',
  },
  {
    n: '03',
    title: 'Drive it like new',
    body: 'Walk around your freshly detailed car and enjoy that first-day feeling again.',
  },
];

const WHY = [
  {
    title: 'Meticulous by nature',
    body: 'Every seam, vent, and panel gets attention. We detail like it’s our own car — because that’s how it started.',
  },
  {
    title: 'Honest, simple pricing',
    body: 'Three packages, flat prices, no upsell games. What you see is what you pay.',
  },
  {
    title: 'Products that protect',
    body: 'Quality washes, sealants, and conditioners that keep your finish and interior protected long after we leave.',
  },
];

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '110px 0 120px',
          minHeight: 'calc(92vh - var(--nav-height))',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="glow-orb"
          style={{
            width: 520, height: 520,
            top: -140, right: -120,
            background: 'rgba(69, 196, 255, 0.14)',
            animation: 'drift 14s ease-in-out infinite',
          }}
        />
        <div
          className="glow-orb"
          style={{
            width: 420, height: 420,
            bottom: -180, left: -140,
            background: 'rgba(124, 140, 248, 0.12)',
            animation: 'drift 18s ease-in-out infinite reverse',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <span className="eyebrow">{SITE.serviceArea}</span>
          </Reveal>
          <Reveal delay={100}>
            <h1
              style={{
                fontSize: 'clamp(42px, 7vw, 76px)',
                margin: '20px 0 22px',
                maxWidth: 760,
              }}
            >
              Showroom shine,
              <br />
              <span className="gradient-text shine-wrap">delivered.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: 'clamp(16px, 2vw, 19px)',
                maxWidth: 540,
                marginBottom: 36,
              }}
            >
              Professional interior &amp; exterior car detailing across the
              Greater Toronto Area. Meticulous work, honest prices, and a
              finish you can see your reflection in.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/booking/" className="btn btn-primary">
                Book an appointment
              </Link>
              <Link href="/services/" className="btn btn-ghost">
                View services
              </Link>
            </div>
          </Reveal>
          <Reveal delay={420}>
            <p style={{ marginTop: 28, color: 'var(--text-faint)', fontSize: 14.5 }}>
              Or call / text{' '}
              <a href={SITE.phoneHref} style={{ color: 'var(--accent)', fontWeight: 600 }}>
                {SITE.phone}
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <hr className="divider-glow" />

      {/* ============ ABOUT ============ */}
      <section className="section" id="about">
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 48,
            alignItems: 'start',
          }}
        >
          <div>
            <Reveal>
              <span className="eyebrow">About FM Detailing</span>
              <h2 className="section-title">
                Care in every <span className="gradient-text">detail</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="section-sub" style={{ marginBottom: 18 }}>
                FM Detailing was started by {SITE.owner} with a simple idea:
                treat every car like it&apos;s the only one that matters. What
                began as a passion for spotless finishes is now a growing
                detailing service trusted across the GTA.
              </p>
              <p className="section-sub">
                No shortcuts, no rushed jobs — just careful, thorough work and
                a result that speaks for itself.
              </p>
            </Reveal>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 120}>
                <div className="card" style={{ padding: '22px 24px' }}>
                  <h3 style={{ fontSize: 17, marginBottom: 6 }}>
                    <span className="gradient-text" style={{ marginRight: 10 }}>—</span>
                    {w.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14.5 }}>{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES PREVIEW ============ */}
      <section className="section" style={{ background: 'var(--bg-elevated)' }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Services</span>
            <h2 className="section-title">Pick your package</h2>
            <p className="section-sub" style={{ marginBottom: 44 }}>
              Flat, honest pricing — no surprises when we&apos;re done.
            </p>
          </Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 22,
            }}
          >
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 130}>
                <ServiceCard service={s} compact />
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/services/" className="btn btn-ghost">
                See full service details →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">How it works</span>
            <h2 className="section-title">Three easy steps</h2>
          </Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 22,
              marginTop: 40,
            }}
          >
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 140}>
                <div style={{ padding: '8px 4px' }}>
                  <div
                    className="gradient-text"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 44,
                      fontWeight: 700,
                      opacity: 0.9,
                    }}
                  >
                    {s.n}
                  </div>
                  <h3 style={{ fontSize: 19, margin: '10px 0 8px' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div
              className="card"
              style={{
                padding: 'clamp(36px, 6vw, 64px)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                className="glow-orb"
                style={{
                  width: 380, height: 380,
                  top: -200, left: '50%',
                  marginLeft: -190,
                  background: 'rgba(69, 196, 255, 0.16)',
                }}
              />
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', marginBottom: 12, position: 'relative' }}>
                Ready for that <span className="gradient-text">new-car feeling</span>?
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 28, position: 'relative' }}>
                Book in minutes — we&apos;ll confirm your appointment by text.
              </p>
              <Link href="/booking/" className="btn btn-primary" style={{ position: 'relative' }}>
                Book your detail
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
