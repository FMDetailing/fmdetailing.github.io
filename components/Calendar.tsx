'use client';

import { useState } from 'react';

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Lightweight month-view calendar for picking an appointment date.
 * Past dates are disabled. Availability rules (blocked days, capacity)
 * can be layered in later once there's a backend.
 */
export default function Calendar({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (isoDate: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array.from({ length: firstDow }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const canGoPrev = year > today.getFullYear() || month > today.getMonth();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <button
          type="button"
          onClick={() => canGoPrev && setView(new Date(year, month - 1, 1))}
          disabled={!canGoPrev}
          className="cal-nav"
          aria-label="Previous month"
        >
          ←
        </button>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 17 }}>
          {MONTHS[month]} {year}
        </strong>
        <button
          type="button"
          onClick={() => setView(new Date(year, month + 1, 1))}
          className="cal-nav"
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="cal-grid" role="grid" aria-label="Choose a date">
        {DAY_LABELS.map((d) => (
          <div key={d} className="cal-dow">{d}</div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} />;
          const iso = toISO(d);
          const disabled = d < today;
          const isSelected = selected === iso;
          const isToday = d.getTime() === today.getTime();
          return (
            <button
              type="button"
              key={iso}
              disabled={disabled}
              onClick={() => onSelect(iso)}
              className={`cal-day ${isSelected ? 'cal-day-selected' : ''} ${isToday ? 'cal-day-today' : ''}`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .cal-nav {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-strong);
          color: var(--text);
          width: 36px;
          height: 36px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 15px;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .cal-nav:hover:not(:disabled) {
          background: var(--accent-soft);
          border-color: var(--accent);
        }
        .cal-nav:disabled { opacity: 0.3; cursor: not-allowed; }
        .cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
        }
        .cal-dow {
          text-align: center;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-faint);
          text-transform: uppercase;
          padding: 6px 0;
        }
        .cal-day {
          aspect-ratio: 1;
          border-radius: 10px;
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.03);
          color: var(--text);
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
        }
        .cal-day:hover:not(:disabled) {
          background: var(--accent-soft);
          border-color: var(--accent);
          transform: scale(1.05);
        }
        .cal-day:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }
        .cal-day-today { border-color: var(--border-strong); }
        .cal-day-selected {
          background: var(--accent-gradient) !important;
          color: #051018;
          font-weight: 700;
          border-color: transparent;
        }
      `}</style>
    </div>
  );
}
