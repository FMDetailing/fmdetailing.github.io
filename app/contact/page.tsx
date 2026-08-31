import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { SITE } from '@/lib/site';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: `Contact — ${SITE.name}`,
  description:
    'Call or text FM Detailing, see our hours, and check whether we cover your part of the GTA.',
};

const ROWS = [
  { k: 'CALL / TEXT', v: SITE.phone, sub: 'Text is fastest — usually a reply within the hour.' },
  { k: 'HOURS', v: 'Mon–Sun · 8:00 – 20:00', sub: 'Later slots available on request during summer.' },
  { k: 'SERVICE AREA', v: 'Greater Toronto Area', sub: 'Fully mobile — we bring water, power and products.' },
  { k: 'OWNER', v: SITE.owner, sub: 'Every detail is done by hand, by the owner.' },
];

const AREAS = [
  'Toronto', 'North York', 'Scarborough', 'Etobicoke', 'Mississauga', 'Brampton',
  'Vaughan', 'Markham', 'Richmond Hill', 'Oakville', 'Ajax', 'Pickering',
];

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container grid">
        <Reveal>
          <div>
            <span className="eyebrow">CONTACT</span>
            <h1 className="page-title">Call, text, or just book.</h1>
            <p className="lede">
              Fastest way to reach us is a text — we usually reply within the hour
              during working hours.
            </p>

            <div className="rows">
              {ROWS.map((r) => (
                <div key={r.k} className="row">
                  <span className="mono row-k">{r.k}</span>
                  <div>
                    <div className="row-v">{r.v}</div>
                    <div className="row-sub">{r.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cta">
              <a href={`sms:${SITE.phoneHref.replace('tel:', '')}`} className="btn btn-primary">
                Text us <span className="dot" />
              </a>
              <Link href="/booking/" className="btn btn-ghost">Book online</Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <aside className="area">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE}/images/polish-hood.jpg`} alt="" className="area-img" />
            <div className="area-scrim" />
            <div className="area-body">
              <span className="eyebrow eyebrow-accent">SERVICE AREA</span>
              <h3>Anywhere in the GTA, at your door.</h3>
              <div className="chips">
                {AREAS.map((a) => <span key={a} className="chip">{a}</span>)}
              </div>
              <p className="area-note">
                Outside these areas? Text us the postal code — if we can get there, we will.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>

      <style>{`
        .grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 72px; align-items: start; }
        .page-title { margin: 16px 0 18px; font-size: clamp(38px, 5vw, 62px); line-height: 1; }
        .lede { max-width: 440px; margin-bottom: 40px; font-size: 15.5px; line-height: 1.7; color: var(--text-muted); }

        .rows { display: flex; flex-direction: column; }
        .row {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 24px;
          align-items: baseline;
          padding: 22px 0;
          border-top: 1px solid var(--border);
        }
        .row-k { color: var(--accent-700); letter-spacing: .22em; }
        .row-v { font-size: 20px; font-weight: 500; letter-spacing: -0.02em; line-height: 1.3; }
        .row-sub { margin-top: 5px; font-size: 14px; line-height: 1.55; color: var(--text-muted); }
        .cta { display: flex; gap: 12px; margin-top: 36px; flex-wrap: wrap; }

        .area {
          position: relative;
          min-height: 560px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--surface);
        }
        .area-img { width: 100%; height: 340px; object-fit: cover; filter: saturate(.8); }
        .area-scrim {
          position: absolute; top: 0; left: 0; right: 0; height: 340px;
          background: linear-gradient(180deg, rgba(18,19,31,.2), var(--surface));
        }
        .area-body { position: relative; margin-top: -70px; padding: 0 32px 32px; }
        .area-body h3 { margin: 14px 0 18px; font-size: 26px; line-height: 1.2; letter-spacing: -0.03em; }
        .chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip {
          padding: 7px 13px;
          border: 1px solid rgba(233,233,237,.14);
          border-radius: 999px;
          font-size: 12.5px;
          color: #b2b6ca;
        }
        .area-note { margin-top: 22px; font-size: 13.5px; line-height: 1.65; color: var(--text-faint); }

        @media (max-width: 1000px) {
          .grid { grid-template-columns: 1fr; gap: 40px; }
          .area { min-height: 0; }
        }
      `}</style>
    </section>
  );
}
