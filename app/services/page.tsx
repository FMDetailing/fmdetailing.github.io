import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { SERVICES, SITE } from '@/lib/site';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: `Services & Pricing — ${SITE.name}`,
  description:
    'Interior deep cleans, exterior detailing, and full car detailing packages with flat, honest pricing.',
};

const IMAGES: Record<string, string> = {
  interior: '/images/interior-detail.jpg',
  exterior: '/images/exterior-wash.jpg',
  full: '/images/polish-headlight.jpg',
};

const TAGS: Record<string, string> = {
  interior: 'INTERIOR',
  exterior: 'EXTERIOR',
  full: 'BEST VALUE',
};

/** Spec-sheet layout: identity column, includes column, spec/price column. */
export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="head">
            <div>
              <span className="eyebrow">SERVICES &amp; PRICING</span>
              <h1 className="page-title">Detailing done right.</h1>
            </div>
            <p className="head-note">
              Every package is a flat price with everything listed up front. Not sure
              which one fits? Call or text{' '}
              <a href={SITE.phoneHref}>{SITE.phone}</a>.
            </p>
          </div>
        </Reveal>

        {SERVICES.map((s, i) => (
          <Reveal key={s.id} delay={i * 100}>
            <article className="pkg">
              <div className="pkg-id">
                <span className="mono pkg-idx">PACKAGE {String(i + 1).padStart(2, '0')}</span>
                <h2>{s.name}</h2>
                <span className={`badge ${s.featured ? 'badge-on' : ''}`}>
                  {s.featured ? 'BEST VALUE' : TAGS[s.id]}
                </span>
                <div className="pkg-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${BASE}${IMAGES[s.id]}`} alt="" />
                  <div className="pkg-scrim" />
                </div>
              </div>

              <div className="pkg-includes">
                <p className="pkg-blurb">{s.blurb}</p>
                <div className="pkg-list">
                  {s.includes.map((inc) => (
                    <div key={inc} className="pkg-item">
                      <span className="tick" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pkg-spec">
                <div className="pkg-price">
                  ${s.price}
                  {s.oldPrice && <span className="pkg-old">${s.oldPrice}</span>}
                </div>
                <div className="pkg-rows">
                  <div className="spec-row"><span>Duration</span><span>{s.duration.toUpperCase()}</span></div>
                  <div className="spec-row"><span>Location</span><span>MOBILE</span></div>
                  <div className="spec-row"><span>Deposit</span><span>NONE</span></div>
                </div>
                <Link
                  href={`/booking/?service=${s.id}`}
                  className={`btn ${s.featured ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Book this
                </Link>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal>
          <div className="card note">
            <h3>Good to know</h3>
            <p>
              We come to you anywhere in the GTA. Heavily soiled vehicles, pet hair, or
              oversized vehicles (trucks, 3-row SUVs) may need extra time — we&apos;ll
              always confirm before starting.
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
        .head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 48px;
          padding-bottom: 36px;
          border-bottom: 1px solid var(--border);
        }
        .page-title { margin: 16px 0 0; font-size: clamp(38px, 5vw, 62px); line-height: 1; }
        .head-note { max-width: 380px; font-size: 15px; line-height: 1.7; color: var(--text-muted); }

        .pkg {
          display: grid;
          grid-template-columns: 300px 1fr 260px;
          gap: 48px;
          padding: 44px 0;
          border-bottom: 1px solid var(--border);
        }
        .pkg-id { display: flex; flex-direction: column; gap: 16px; }
        .pkg-idx { color: var(--accent-700); letter-spacing: .24em; }
        .pkg-id h2 { font-size: 28px; line-height: 1.12; letter-spacing: -0.03em; }
        .badge {
          align-self: flex-start;
          padding: 5px 11px;
          border-radius: 3px;
          border: 1px solid var(--border-strong);
          background: rgba(233,233,237,.05);
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: .2em;
          color: var(--text-muted);
        }
        .badge-on {
          border-color: var(--accent-line);
          background: rgba(123,163,224,.16);
          color: var(--accent-200);
        }
        .pkg-img {
          position: relative;
          height: 150px;
          margin-top: 6px;
          border: 1px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
        }
        .pkg-img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.8); }
        .pkg-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(18,19,31,.15), rgba(22,24,38,.75));
        }

        .pkg-blurb { max-width: 520px; margin-bottom: 22px; font-size: 15.5px; line-height: 1.7; color: #b2b6ca; text-wrap: pretty; }
        .pkg-list { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 28px; }
        .pkg-item { display: flex; gap: 11px; align-items: baseline; }
        .pkg-item span:last-child { font-size: 14px; line-height: 1.55; color: var(--text-muted); }

        .pkg-spec {
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding-left: 32px;
          border-left: 1px solid var(--border);
        }
        .pkg-price {
          display: flex;
          align-items: baseline;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 46px;
          font-weight: 600;
          letter-spacing: -0.05em;
          line-height: 1;
        }
        .pkg-old { font-size: 17px; font-weight: 400; color: var(--accent-700); text-decoration: line-through; }
        .pkg-rows { display: flex; flex-direction: column; gap: 9px; }

        .note { margin: 44px 0 0; padding: 28px 32px; }
        .note h3 { font-size: 17px; letter-spacing: -0.02em; margin-bottom: 8px; }
        .note p { max-width: 680px; font-size: 14.5px; line-height: 1.65; color: var(--text-muted); }

        @media (max-width: 1000px) {
          .head { flex-direction: column; align-items: flex-start; gap: 20px; }
          .pkg { grid-template-columns: 1fr; gap: 28px; }
          .pkg-spec { padding-left: 0; border-left: 0; border-top: 1px solid var(--border); padding-top: 24px; }
          .pkg-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
