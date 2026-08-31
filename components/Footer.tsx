import Link from 'next/link';
import { Wordmark } from '@/components/Nav';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-top">
          <div className="foot-brand">
            <Wordmark size={19} />
            <span className="mono">MOBILE · GREATER TORONTO AREA</span>
          </div>
          <nav className="foot-links">
            <Link href="/services/">Services</Link>
            <Link href="/reviews/">Reviews</Link>
            <Link href="/contact/">Contact</Link>
            <Link href="/booking/">Book Now</Link>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </nav>
        </div>
        <div className="foot-legal">
          © {new Date().getFullYear()} {SITE.name} · {SITE.owner}
        </div>
      </div>

      <style>{`
        .foot {
          margin-top: 110px;
          padding: 52px 0 40px;
          border-top: 1px solid var(--border);
          background: var(--bg-elevated);
        }
        .foot-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }
        .foot-brand { display: flex; flex-direction: column; gap: 8px; }
        .foot-brand :global(.mono) { color: var(--accent-700); letter-spacing: .24em; }
        .foot-links { display: flex; gap: 40px; flex-wrap: wrap; font-size: 14px; }
        .foot-links :global(a) { color: var(--text-muted); }
        .foot-links :global(a:hover) { color: var(--text); }
        .foot-legal {
          margin-top: 34px;
          padding-top: 22px;
          border-top: 1px solid rgba(233,233,237,.07);
          font-size: 12.5px;
          color: var(--text-dim);
        }
        @media (max-width: 700px) {
          .foot-links { gap: 20px; }
        }
      `}</style>
    </footer>
  );
}
