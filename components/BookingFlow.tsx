'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Calendar from '@/components/Calendar';
import Reveal from '@/components/Reveal';
import { SERVICES, SITE } from '@/lib/site';
import {
  TIME_SLOTS,
  submitBookingRequest,
  type BookingRequest,
} from '@/lib/booking';

type Contact = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  notes: string;
};

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Horizontal strip of the next 14 days — the mobile stand-in for the month grid. */
function WeekStrip({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (isoDate: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
  return (
    <div className="weekstrip" role="listbox" aria-label="Choose a date">
      {days.map((d) => {
        const iso = toISO(d);
        const active = selected === iso;
        return (
          <button
            type="button"
            key={iso}
            role="option"
            aria-selected={active}
            onClick={() => onSelect(iso)}
            className={`weekstrip-day ${active ? 'weekstrip-day-active' : ''}`}
          >
            <span className="mono" style={{ fontSize: 9, color: active ? 'var(--accent-200)' : 'var(--accent-700)' }}>
              {WEEKDAYS[d.getDay()]}
            </span>
            <span style={{ fontSize: 16, fontWeight: 500 }}>{d.getDate()}</span>
          </button>
        );
      })}
      <style jsx>{`
        .weekstrip {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 6px;
          -webkit-overflow-scrolling: touch;
        }
        .weekstrip-day {
          flex: 0 0 52px;
          width: 52px;
          height: 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          border-radius: var(--radius-sm);
          background: rgba(233, 233, 237, 0.03);
          border: 1px solid rgba(233, 233, 237, 0.1);
          color: var(--text);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .weekstrip-day:hover { border-color: var(--accent); }
        .weekstrip-day-active {
          background: var(--accent-soft);
          border-color: var(--accent-line);
        }
      `}</style>
    </div>
  );
}

function formatDateShort(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d)
    .toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })
    .toUpperCase();
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-CA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BookingFlow() {
  const params = useSearchParams();
  const preselect = params.get('service');

  const [serviceId, setServiceId] = useState<string | null>(
    SERVICES.some((s) => s.id === preselect) ? preselect : null
  );
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [contact, setContact] = useState<Contact>({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const service = useMemo(
    () => SERVICES.find((s) => s.id === serviceId) ?? null,
    [serviceId]
  );

  const canSubmit =
    !!service && !!date && !!slot && contact.name.trim() && contact.phone.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !service || !date || !slot) return;
    setSubmitting(true);
    const req: BookingRequest = {
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      date,
      timeSlot: slot,
      name: contact.name.trim(),
      phone: contact.phone.trim(),
      email: contact.email.trim(),
      vehicle: contact.vehicle.trim(),
      notes: contact.notes.trim(),
    };
    const result = await submitBookingRequest(req);
    setSubmitting(false);
    if (result.ok) setDone(result.message);
  }

  /* ---------- success screen ---------- */
  if (done && service && date && slot) {
    return (
      <section className="section" style={{ minHeight: '70vh' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <Reveal>
            <div className="card" style={{ padding: 'clamp(32px, 5vw, 52px)', textAlign: 'center' }}>
              <div
                style={{
                  width: 28, height: 28,
                  borderRadius: 'var(--radius-sm)',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  background: 'var(--accent)',
                  color: '#161826',
                }}
              >
                ✓
              </div>
              <h2 style={{ fontSize: 28, marginBottom: 10 }}>Request sent!</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>{done}</p>
              <div
                className="card"
                style={{
                  padding: '18px 22px',
                  textAlign: 'left',
                  fontSize: 15,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                <div><strong>{service.name}</strong> — ${service.price}</div>
                <div style={{ color: 'var(--text-muted)' }}>{formatDate(date)} · {slot}</div>
                <div style={{ color: 'var(--text-muted)' }}>{contact.name} · {contact.phone}</div>
              </div>
              <p style={{ color: 'var(--text-faint)', fontSize: 13.5, marginTop: 22 }}>
                Note: online booking is in preview — to lock in this time right
                away, call or text{' '}
                <a href={SITE.phoneHref} style={{ color: 'var(--accent-300)' }}>{SITE.phone}</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ---------- booking form ---------- */
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 880 }}>
        <Reveal>
          <span className="eyebrow">Booking</span>
          <h2 className="section-title">
            Book your <span className="accent-text">detail</span>
          </h2>
          <p className="section-sub" style={{ marginBottom: 40 }}>
            Three quick steps — we&apos;ll confirm your appointment by text.
            Prefer to talk? Call or text{' '}
            <a href={SITE.phoneHref} style={{ color: 'var(--accent-300)', fontWeight: 600 }}>
              {SITE.phone}
            </a>.
          </p>
        </Reveal>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* STEP 1 — service */}
          <Reveal>
            <div className="card" style={{ padding: 'clamp(22px, 4vw, 34px)' }}>
              <StepLabel n={1} title="Choose a service" done={!!service} />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 14,
                  marginTop: 18,
                }}
              >
                {SERVICES.map((s) => {
                  const active = serviceId === s.id;
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setServiceId(s.id)}
                      style={{
                        textAlign: 'left',
                        padding: '18px 18px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        background: active ? 'var(--accent-soft)' : 'rgba(233,233,237,0.03)',
                        border: active
                          ? '1px solid var(--accent)'
                          : '1px solid rgba(233,233,237,0.12)',
                        color: 'var(--text)',
                        transition: 'border-color 0.2s ease, background 0.2s ease',
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{s.name}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ color: 'var(--accent-200)', fontWeight: 600, fontSize: 24, letterSpacing: '-0.04em' }}>
                          ${s.price}
                        </span>
                        <span style={{ color: 'var(--text-faint)', fontSize: 13 }}>{s.duration}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* STEP 2 — date & time */}
          <Reveal delay={80}>
            <div className="card" style={{ padding: 'clamp(22px, 4vw, 34px)' }}>
              <StepLabel n={2} title="Pick a date & time" done={!!date && !!slot} />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 30,
                  marginTop: 18,
                }}
              >
                <div>
                  <div className="cal-desktop">
                    <Calendar selected={date} onSelect={(d) => { setDate(d); setSlot(null); }} />
                  </div>
                  <div className="cal-mobile">
                    <WeekStrip selected={date} onSelect={(d) => { setDate(d); setSlot(null); }} />
                  </div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, marginBottom: 12 }}>
                    {date ? `Times for ${formatDate(date)}` : 'Select a date first'}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 10 }}>
                    {TIME_SLOTS.map((t) => {
                      const active = slot === t;
                      return (
                        <button
                          type="button"
                          key={t}
                          disabled={!date}
                          onClick={() => setSlot(t)}
                          style={{
                            height: 36,
                            padding: '0 8px',
                            borderRadius: 'var(--radius-sm)',
                            cursor: date ? 'pointer' : 'not-allowed',
                            fontSize: 13.5,
                            fontWeight: 500,
                            background: date
                              ? active ? 'var(--accent)' : 'rgba(233,233,237,0.03)'
                              : 'transparent',
                            color: date
                              ? active ? '#161826' : 'var(--text)'
                              : '#3f424d',
                            border: active
                              ? '1px solid var(--accent)'
                              : date
                                ? '1px solid rgba(233,233,237,0.1)'
                                : '1px solid transparent',
                            transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  <p style={{ color: 'var(--text-faint)', fontSize: 13, marginTop: 16 }}>
                    All times shown are approximate start times. We&apos;ll
                    confirm the exact window by text.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* STEP 3 — contact */}
          <Reveal delay={120}>
            <div className="card" id="bk-details" style={{ padding: 'clamp(22px, 4vw, 34px)' }}>
              <StepLabel n={3} title="Your details" done={!!(contact.name && contact.phone)} />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 18,
                  marginTop: 18,
                }}
              >
                <div className="field">
                  <label htmlFor="bk-name">Name *</label>
                  <input
                    id="bk-name"
                    required
                    placeholder="Your name"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="bk-phone">Phone *</label>
                  <input
                    id="bk-phone"
                    required
                    type="tel"
                    placeholder="(555) 555-5555"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="bk-email">Email</label>
                  <input
                    id="bk-email"
                    type="email"
                    placeholder="you@example.com"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="bk-vehicle">Vehicle</label>
                  <input
                    id="bk-vehicle"
                    placeholder="e.g. 2021 Honda Civic"
                    value={contact.vehicle}
                    onChange={(e) => setContact({ ...contact, vehicle: e.target.value })}
                  />
                </div>
                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="bk-notes">Notes</label>
                  <textarea
                    id="bk-notes"
                    rows={3}
                    placeholder="Anything we should know? (pet hair, stains, parking details…)"
                    value={contact.notes}
                    onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* submit */}
          <Reveal delay={140}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 18,
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '18px 22px',
              }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: 14.5 }}>
                {service && date && slot ? (
                  <>
                    <strong style={{ color: 'var(--text)' }}>{service.name}</strong>{' '}
                    · {formatDate(date)} · {slot} ·{' '}
                    <span style={{ color: 'var(--accent-200)', fontWeight: 600, letterSpacing: '-0.04em' }}>${service.price}</span>
                  </>
                ) : (
                  'Complete the steps above to request your appointment.'
                )}
              </div>
              <button type="submit" className="btn btn-primary" disabled={!canSubmit || submitting}>
                {submitting ? 'Sending…' : 'Request appointment'}
              </button>
            </div>
          </Reveal>
        </form>

        {/* Mobile summary bar — pinned above the bottom edge under 700px */}
        {service && date && slot && (
          <div className="bk-mobilebar">
            <div style={{ minWidth: 0 }}>
              <div className="mono" style={{ fontSize: 9, color: 'var(--accent-700)', marginBottom: 2, whiteSpace: 'nowrap' }}>
                {formatDateShort(date)} · {slot}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--accent-200)' }}>
                ${service.price}
              </div>
            </div>
            <a href="#bk-details" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              Continue to details
            </a>
          </div>
        )}

        <style jsx>{`
          .cal-mobile { display: none; }
          .bk-mobilebar { display: none; }
          @media (max-width: 700px) {
            .cal-desktop { display: none; }
            .cal-mobile { display: block; }
            .bk-mobilebar {
              position: fixed;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 50;
              display: flex;
              align-items: center;
              gap: 16px;
              padding: 12px 20px calc(12px + env(safe-area-inset-bottom));
              background: rgba(18, 19, 31, 0.92);
              backdrop-filter: blur(16px);
              border-top: 1px solid var(--border-strong);
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function StepLabel({ n, title, done }: { n: number; title: string; done: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span
        style={{
          width: 28, height: 28,
          borderRadius: 'var(--radius-sm)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 600,
          background: done ? 'var(--accent)' : 'rgba(233,233,237,0.05)',
          color: done ? '#161826' : 'var(--text-muted)',
          border: done ? 'none' : '1px solid rgba(233,233,237,0.14)',
          transition: 'background 0.3s ease',
        }}
      >
        {done ? '✓' : n}
      </span>
      <h3 style={{ fontSize: 18 }}>{title}</h3>
    </div>
  );
}
