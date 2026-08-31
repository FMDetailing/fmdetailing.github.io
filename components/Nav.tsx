'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services/', label: 'Services' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/booking/', label: 'Book Now' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link href="/" className="nav-brand" aria-label={`${SITE.name} home`}>
          <span className="nav-logo">FM</span>
          <span className="nav-brand-text">Detailing</span>
        </Link>

        <nav className={`nav-links ${open ? 'nav-links-open' : ''}`}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link ${isActive(l.href) ? 'nav-link-active' : ''} ${
                l.href === '/booking/' ? 'nav-link-cta' : ''
              }`}
            >
              {l.label}
            </Link>
          ))}
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

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          height: var(--nav-height);
          display: flex;
          align-items: center;
          transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
          border-bottom: 1px solid transparent;
        }
        .nav-scrolled {
          background: rgba(7, 8, 11, 0.82);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom-color: var(--border);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 19px;
          letter-spacing: -0.01em;
        }
        .nav-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: 11px;
          background: var(--accent-gradient);
          color: #051018;
          font-size: 15px;
          font-weight: 800;
          box-shadow: 0 2px 16px rgba(69, 196, 255, 0.4);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav-link {
          padding: 9px 16px;
          border-radius: 999px;
          font-size: 14.5px;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 0.2s ease, background 0.2s ease;
        }
        .nav-link:hover { color: var(--text); background: rgba(255,255,255,0.05); }
        .nav-link-active { color: var(--text); background: rgba(255,255,255,0.07); }
        .nav-link-cta {
          background: var(--accent-gradient);
          color: #051018 !important;
          font-weight: 600;
          margin-left: 8px;
          box-shadow: 0 2px 14px rgba(69, 196, 255, 0.35);
        }
        .nav-link-cta:hover { filter: brightness(1.08); }
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
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        @media (max-width: 768px) {
          .nav-burger { display: flex; }
          .nav-links {
            position: fixed;
            top: var(--nav-height);
            left: 0; right: 0;
            flex-direction: column;
            align-items: stretch;
            padding: 16px 24px 24px;
            background: rgba(7, 8, 11, 0.97);
            backdrop-filter: blur(14px);
            border-bottom: 1px solid var(--border);
            transform: translateY(-8px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease, transform 0.25s ease;
          }
          .nav-links-open {
            opacity: 1;
            transform: none;
            pointer-events: auto;
          }
          .nav-link { padding: 13px 16px; font-size: 16px; }
          .nav-link-cta { margin-left: 0; margin-top: 6px; text-align: center; }
        }
      `}</style>
    </header>
  );
}
