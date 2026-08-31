'use client';

import { useRef, useState } from 'react';
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

/** Display order: interior left, full (featured) centre, exterior right. */
const DISPLAY_ORDER = ['interior', 'full', 'exterior'];
const ORDERED = DISPLAY_ORDER.map((id) => SERVICES.find((s) => s.id === id)!).filter(Boolean);

/**
 * 3D coverflow of the service packages.
 * Navigation: arrows, dots, clicking a side card, and touch swipe.
 * Index is 1-based; defaults to the centre (featured Full package).
 */
export default function PackageCoverflow() {
  const [index, setIndex] = useState(2); // 1-based; 2 = Full Car Detailing centred
  const touchStartX = useRef<number | null>(null);

  const prev = () => setIndex((i) => Math.max(1, i - 1));
  const next = () => setIndex((i) => Math.min(ORDERED.length, i + 1));

  const posClass = (offset: number) => {
    if (offset === 0) return 'cf-card cf-center';
    if (offset === -1) return 'cf-card cf-side cf-left';
    if (offset === 1) return 'cf-card cf-side cf-right';
    return 'cf-card cf-hidden';
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(diff) > 45) {
      if (diff < 0) next();
      else prev();
    }
  };

  return (
    <>
      <div className="cf-head">
        <div>
          <span className="eyebrow">01 / THE PACKAGES</span>
          <h2 className="section-title">Three ways to reset your car.</h2>
        </div>
        <div className="cf-arrows">
          <button onClick={prev} aria-label="Previous">←</button>
          <button onClick={next} aria-label="Next">→</button>
        </div>
      </div>

      <div className="cf-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {ORDERED.map((s, i) => {
          const offset = i - (index - 1);
          const isSide = Math.abs(offset) === 1;
          return (
            <div
              key={s.id}
              className={`${posClass(offset)} ${s.featured ? 'cf-feat' : ''}`}
              onClick={isSide ? () => setIndex(i + 1) : undefined}
              role={isSide ? 'button' : undefined}
              tabIndex={isSide ? 0 : undefined}
              aria-label={isSide ? `Show ${s.name}` : undefined}
              onKeyDown={
                isSide
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIndex(i + 1);
                      }
                    }
                  : undefined
              }
            >
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
                  <span className="mono">{s.duration.toUpperCase()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cf-dots">
        {ORDERED.map((s, i) => (
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
          --cf-shift: 300px;
          position: relative;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1600px;
          overflow: hidden;
          margin-top: 20px;
          touch-action: pan-y;
        }
        .cf-card {
          position: absolute;
          width: 400px;
          height: 474px;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--surface);
          border: 1px solid var(--border);
          transition: transform .55s cubic-bezier(.22,1,.36,1), opacity .55s ease, filter .55s ease;
        }
        .cf-feat { border-color: var(--accent-line); }
        .cf-center {
          transform: translateX(0) scale(1);
          opacity: 1;
          z-index: 3;
          box-shadow: var(--shadow-lg);
        }
        .cf-side {
          opacity: .5;
          filter: saturate(.6);
          z-index: 1;
          cursor: pointer;
        }
        .cf-side:hover { opacity: .7; }
        .cf-side:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        .cf-left { transform: translateX(calc(-1 * var(--cf-shift))) scale(.82) rotateY(34deg); }
        .cf-right { transform: translateX(var(--cf-shift)) scale(.82) rotateY(-34deg); }
        .cf-hidden { display: none; }
        .cf-img { position: relative; height: 238px; overflow: hidden; border-bottom: 1px solid var(--border); flex-shrink: 0; }
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
          .cf-stage { --cf-shift: 72vw; height: 560px; }
          .cf-card { width: min(400px, 80vw); }
          .cf-arrows { display: none; }
        }
      `}</style>
    </>
  );
}
