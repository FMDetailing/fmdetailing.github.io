'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SERVICES } from '@/lib/site';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Photo per package — replace with real shots when available. */
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

/**
 * 3D coverflow of the service packages. Replaces the old
 * ServicesCarousel — same interaction, redesigned card.
 */
export default function PackageCoverflow() {
  const [index, setIndex] = useState(3); // centre on the featured package (1-based)

  const cardStyle = (offset: number, featured?: boolean): React.CSSProperties => {
    const abs = Math.abs(offset);
    if (abs > 1) return { display: 'none' };
    const base: React.CSSProperties = {
      position: 'absolute',
      width: 400,
      height: 474,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      background: 'var(--surface)',
      border: `1px solid ${featured ? 'var(--accent-line)' : 'var(--border)'}`,
      transition:
        'transform .55s cubic-bezier(.22,1,.36,1), opacity .55s ease, filter .55s ease',
    };
    if (offset === 0) {
      return { ...base, transform: 'translateX(0) scale(1)', opacity: 1, zIndex: 3, boxShadow: 'var(--shadow-lg)' };
    }
    const dir = offset < 0 ? -1 : 1;
    return {
      ...base,
      transform: `translateX(${dir * 300}px) scale(.82) rotateY(${-dir * 34}deg)`,
      opacity: 0.5,
      filter: 'saturate(.6)',
      zIndex: 1,
    };
  };

  return (
    <>
      <div className="cf-head">
        <div>
          <span className="eyebrow">01 / THE PACKAGES</span>
          <h2 className="section-title">Three ways to reset your car.</h2>
        </div>
        <div className="cf-arrows">
          <button onClick={() => setIndex((i) => Math.max(1, i - 1))} aria-label="Previous">←</button>
          <button onClick={() => setIndex((i) => Math.min(SERVICES.length, i + 1))} aria-label="Next">→</button>
        </div>
      </div>

      <div className="cf-stage">
        {SERVICES.map((s, i) => (
          <div key={s.id} style={cardStyle(i - (index - 1), s.featured)}>
            <div className="cf-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}${IMAGES[s.id]}`} alt="" />
              <div className="cf-scrim" />
              <span className="mono cf-tag">{TAGS[s.id]}</span>
            </div>
            <div className="cf-body">
              <h3>{s.name}</h3>
              <p>{s.blurb}</p>
              <div className="cf-foot">
                <span className="cf-price">
                  ${s.price}
                  {s.oldPrice && <span className="cf-old">${s.oldPrice}</span>}
                </span>
                <span className="mono">{s.duration.replace('~', '~').toUpperCase()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cf-dots">
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            aria-label={s.name}
            onClick={() => setIndex(i + 1)}
            className={index === i + 1 ? 'on' : ''}
          />
        ))}
      </div>

      <style jsx>{`
        .cf-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
        }
        .cf-arrows { display: flex; gap: 10px; padding-bottom: 8px; }
        .cf-arrows button {
          width: 44px; height: 44px;
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-sm);
          background: transparent;
          color: #b2b6ca;
          font-size: 16px;
          cursor: pointer;
          transition: border-color .2s ease, color .2s ease;
        }
        .cf-arrows button:hover { border-color: var(--accent); color: var(--accent-200); }
        .cf-stage {
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1600px;
          overflow: hidden;
          margin-top: 20px;
        }
        .cf-img { position: relative; height: 238px; overflow: hidden; border-bottom: 1px solid var(--border); }
        .cf-img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.85); }
        .cf-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(18,19,31,.1), rgba(22,24,38,.9));
        }
        .cf-tag { position: absolute; top: 16px; left: 18px; color: var(--accent-200); letter-spacing: .24em; }
        .cf-body { padding: 26px 26px 28px; display: flex; flex-direction: column; gap: 14px; flex: 1; }
        .cf-body h3 { font-size: 23px; letter-spacing: -0.025em; }
        .cf-body p { color: var(--text-muted); font-size: 14.5px; line-height: 1.6; }
        .cf-foot {
          margin-top: auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid rgba(233,233,237,.09);
        }
        .cf-price {
          display: flex; align-items: baseline; gap: 9px;
          font-family: var(--font-display);
          font-size: 34px; font-weight: 600; letter-spacing: -0.045em;
        }
        .cf-old { font-size: 15px; font-weight: 400; color: var(--accent-700); text-decoration: line-through; }
        .cf-dots { display: flex; justify-content: center; gap: 8px; margin-top: 8px; }
        .cf-dots button {
          width: 8px; height: 3px;
          border: 0; border-radius: 2px; padding: 0;
          background: rgba(233,233,237,.18);
          cursor: pointer;
          transition: width .3s ease, background .3s ease;
        }
        .cf-dots button.on { width: 26px; background: var(--accent); }
        @media (max-width: 900px) {
          .cf-stage { height: 560px; }
          .cf-arrows { display: none; }
        }
      `}</style>
    </>
  );
}
