import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '48px 0 40px',
        marginTop: 40,
        background: 'var(--bg-elevated)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 6,
            }}
          >
            FM <span className="gradient-text">Detailing</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            {SITE.serviceArea}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 22, fontSize: 14.5, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
          <Link href="/services/">Services</Link>
          <Link href="/reviews/">Reviews</Link>
          <Link href="/booking/">Book Now</Link>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </div>
      </div>
      <div
        className="container"
        style={{ marginTop: 28, color: 'var(--text-faint)', fontSize: 13 }}
      >
        © {new Date().getFullYear()} {SITE.name} · {SITE.owner}
      </div>
    </footer>
  );
}
