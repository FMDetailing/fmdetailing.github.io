'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services/', label: 'Services' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/contact/', label: 'Contact' },
];

/** The wordmark — "1a": FM, a skewed accent bar, DETAILING in light weight.
 *  No box, no gradient chip. Reused in the footer at 19px. */
export function Wordmark({ size = 21 }: { size?: number }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: size * 0.52 }}>
      <span style={{ font: `600 ${size}px/1 var(--font-display)`, letterSpacing: '-0.045em', color: 'var(--text)' }}>
        FM
      </span>
      <span
        style={{
          width: 2,
          height: size * 0.86,
          background: 'var(--accent)',
          transform: 'skewX(-16deg)',
        }}
      />
      <span style={{ font: `300 ${size}px/1 var(--font-display)`, letterSpacing: '-0.03em', color: '#b2b6ca' }}>
        DETAILING
      </span>
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" aria-label={`${SITE.name} home`}>
          <Wordmark />
        </Link>

        <nav className={`nav-links ${open ? 'nav-links-open' : ''}`}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link ${isActive(l.href) ? 'nav-link-active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <span className="nav-sep" />
          <a href={SITE.phoneHref} className="nav-phone">
            647 787 1811
          </a>
          <Link href="/booking/" className="nav-cta">
            Book
          </Link>
        </nav>

        <button
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <style jsx global>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          height: var(--nav-height);
          display: flex;
          align-items: center;
          background: rgba(18, 19, 31, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 34px;
        }
        .nav-link {
          position: relative;
          padding: 6px 0;
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: color 0.2s ease;
        }
        .nav-link:hover { color: var(--text); }
        .nav-link-active {
          color: var(--text);
          box-shadow: inset 0 -2px 0 var(--accent);
        }
        .nav-sep {
          width: 1px;
          height: 22px;
          background: rgba(233, 233, 237, 0.14);
        }
        .nav-phone {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: var(--text-muted);
        }
        .nav-phone:hover { color: var(--text); }
        .nav-cta {
          padding: 11px 22px;
          border: 1px solid var(--accent);
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-200);
          transition: background 0.2s ease;
        }
        .nav-cta:hover { background: var(--accent-soft); }
        .nav-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: 0;
          cursor: pointer;
          padding: 8px;
        }
        .nav-burger span {
          width: 22px; height: 2px;
          background: var(--text);
        }

        @media (max-width: 900px) {
          .nav-inner { padding: 0 20px; }
          .nav-burger { display: flex; }
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0; right: 0;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            padding: 8px 20px 24px;
            background: #0f1019;
            border-bottom: 1px solid var(--border);
            transform: translateY(-8px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease, transform 0.25s ease;
          }
          .nav-links-open { opacity: 1; transform: none; pointer-events: auto; }
          .nav-link {
            padding: 18px 0;
            border-bottom: 1px solid var(--border);
            font-size: 14px;
          }
          .nav-link-active { box-shadow: inset 3px 0 0 var(--accent); padding-left: 14px; }
          .nav-sep { display: none; }
          .nav-phone { padding: 18px 0; }
          .nav-cta { margin-top: 12px; text-align: center; }
        }
      `}</style>
    </header>
  );
}
