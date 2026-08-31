import Link from 'next/link';
import type { Service } from '@/lib/site';

export default function ServiceCard({
  service,
  compact = false,
}: {
  service: Service;
  compact?: boolean;
}) {
  return (
    <div
      className="card"
      style={{
        position: 'relative',
        padding: compact ? '28px 26px' : '34px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        height: '100%',
        overflow: 'hidden',
        border: service.featured
          ? '1px solid rgba(69, 196, 255, 0.45)'
          : undefined,
        boxShadow: service.featured
          ? 'var(--shadow-card), var(--shadow-glow)'
          : undefined,
      }}
    >
      {service.featured && (
        <span
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '5px 12px',
            borderRadius: 999,
            background: 'var(--accent-gradient)',
            color: '#051018',
          }}
        >
          Best value
        </span>
      )}

      <h3 style={{ fontSize: compact ? 20 : 22, paddingRight: service.featured ? 96 : 0 }}>
        {service.name}
      </h3>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span
          className="gradient-text"
          style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700 }}
        >
          ${service.price}
        </span>
        <span style={{ color: 'var(--text-faint)', fontSize: 14 }}>
          {service.duration}
        </span>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>{service.blurb}</p>

      {!compact && (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginTop: 4 }}>
          {service.includes.map((item) => (
            <li key={item} style={{ display: 'flex', gap: 10, fontSize: 14.5, color: 'var(--text-muted)' }}>
              <span aria-hidden style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 'auto', paddingTop: 12 }}>
        <Link href={`/booking/?service=${service.id}`} className="btn btn-ghost" style={{ width: '100%' }}>
          Book this service
        </Link>
      </div>
    </div>
  );
}
