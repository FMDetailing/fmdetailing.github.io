import Link from 'next/link';
import Reveal from '@/components/Reveal';
import PackageCoverflow from '@/components/PackageCoverflow';
import { SITE } from '@/lib/site';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

const STATS = [
  { v: '400+', k: 'CARS DETAILED' },
  { v: '4.9', k: 'AVERAGE RATING' },
  { v: '0', k: 'DEPOSIT REQUIRED' },
  { v: 'GTA', k: 'WE COME TO YOU' },
];

const STEPS = [
  { n: '01', title: 'Book online', body: 'Pick your service and a time that works. We confirm by text within the hour.' },
  { n: '02', title: 'We come to you', body: 'Home or work, anywhere in the GTA — we arrive with everything needed.' },
  { n: '03', title: 'Drive it like new', body: 'Walk around your freshly detailed car and enjoy that first-day feeling again.' },
];

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero">
        <div aria-hidden className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE}/images/hero-audi.jpg`} alt="" />
          <div className="hero-scrim-x" />
          <div className="hero-scrim-y" />
        </div>
        <div className="container hero-inner">
          <Reveal>
            <span className="eyebrow eyebrow-accent kicker-rule">EST. 2023 · {SITE.owner.toUpperCase()} · GTA</span>
            <h1 className="hero-title">
              Showroom shine,<br />
              <span className="accent-text">delivered</span> to your driveway.
            </h1>
            <p className="hero-sub">
              Premium mobile detailing across the Greater Toronto Area. Meticulous
              interior and exterior work, flat honest prices, and no shortcuts — we
              detail every car like it&apos;s our own.
            </p>
            <div className="hero-cta">
              <Link href="/booking/" className="btn btn-primary">
                Book an appointment <span className="dot" />
              </Link>
              <Link href="/services/" className="btn btn-ghost">View services</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ STAT BAND ============ */}
      <div className="stats">
        {STATS.map((s) => (
          <div key={s.k} className="stat">
            <span className="stat-v">{s.v}</span>
            <span className="mono">{s.k}</span>
          </div>
        ))}
      </div>

      {/* ============ PACKAGES ============ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <PackageCoverflow />
          </Reveal>
          <div className="center">
            <Link href="/services/" className="btn btn-ghost">Full service details</Link>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="section">
        <div className="container process">
          <Reveal>
            <div>
              <span className="eyebrow">02 / HOW IT WORKS</span>
              <h2 className="section-title">Booked in a minute. Detailed in an afternoon.</h2>
              <p className="section-sub" style={{ maxWidth: 400, marginTop: 20 }}>
                We arrive fully self-contained — water, power, products — so all you
                need to do is hand over the keys.
              </p>
            </div>
          </Reveal>
          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <div className="step">
                  <span className="step-n">{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BAND — the one saturated field ============ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="band">
              <div className="band-glow" aria-hidden />
              <div className="band-inner">
                <div>
                  <span className="eyebrow eyebrow-accent">READY WHEN YOU ARE</span>
                  <h2 className="band-title">That first-day feeling, without leaving home.</h2>
                </div>
                <Link href="/booking/" className="btn band-btn">Book your detail →</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .hero {
          position: relative;
          height: 660px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center 58%; }
        .hero-scrim-x {
          position: absolute; inset: 0;
          background: linear-gradient(96deg, var(--bg) 0%, rgba(18,19,31,.82) 42%, rgba(18,19,31,.25) 100%);
        }
        .hero-scrim-y {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(18,19,31,.55) 0%, rgba(18,19,31,0) 38%, var(--bg) 100%);
        }
        .hero-inner { position: relative; z-index: 1; padding-bottom: 84px; }
        .hero-title {
          margin: 26px 0 0;
          max-width: 760px;
          font-size: clamp(44px, 6vw, 82px);
          line-height: .94;
          text-wrap: balance;
        }
        .hero-sub {
          margin: 26px 0 0;
          max-width: 520px;
          font-size: 17px;
          line-height: 1.65;
          color: #b2b6ca;
          text-wrap: pretty;
        }
        .hero-cta { display: flex; gap: 14px; margin-top: 36px; flex-wrap: wrap; }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--surface);
        }
        .stat {
          padding: 26px 44px;
          border-right: 1px solid rgba(233,233,237,.07);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stat-v {
          font-family: var(--font-display);
          font-size: 30px;
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .center { display: flex; justify-content: center; margin-top: 40px; }

        .process {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 80px;
          align-items: start;
        }
        .steps { display: flex; flex-direction: column; }
        .step {
          display: grid;
          grid-template-columns: 78px 1fr;
          gap: 24px;
          padding: 26px 0;
          border-top: 1px solid var(--border);
        }
        .step-n {
          font-family: var(--font-display);
          font-size: 34px;
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--accent-800);
        }
        .step h3 { font-size: 19px; letter-spacing: -0.02em; margin-bottom: 8px; }
        .step p { color: var(--text-muted); font-size: 14.5px; line-height: 1.65; }

        .band {
          position: relative;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          background: linear-gradient(150deg, var(--section), var(--section-2) 62%, var(--surface));
        }
        .band-glow {
          position: absolute;
          width: 420px; height: 420px;
          top: -220px; right: 80px;
          border-radius: 50%;
          background: var(--section-glow);
          filter: blur(90px);
          animation: drift 14s ease-in-out infinite;
        }
        .band-inner {
          position: relative;
          padding: 76px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          flex-wrap: wrap;
        }
        .band-title {
          margin: 16px 0 0;
          max-width: 520px;
          font-size: clamp(28px, 3.4vw, 40px);
          color: #f3f5fe;
        }
        .band-btn { border-color: var(--accent-300); color: #f3f5fe; }
        .band-btn:hover { background: rgba(166,198,251,.16); }

        @media (max-width: 900px) {
          .hero { height: 560px; }
          .hero-inner { padding-bottom: 48px; }
          .stats { grid-template-columns: 1fr 1fr; }
          .stat { padding: 18px 20px; }
          .process { grid-template-columns: 1fr; gap: 36px; }
          .band-inner { padding: 40px 24px; }
        }
      `}</style>
    </>
  );
}
