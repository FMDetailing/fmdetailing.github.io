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
                  width: 64, height: 64,
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  background: 'rgba(74, 222, 128, 0.12)',
                  border: '1px solid rgba(74, 222, 128, 0.4)',
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
                <a href={SITE.phoneHref} style={{ color: 'var(--accent)' }}>{SITE.phone}</a>.
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
            Book your <span className="gradient-text">detail</span>
          </h2>
          <p className="section-sub" style={{ marginBottom: 40 }}>
            Three quick steps — we&apos;ll confirm your appointment by text.
            Prefer to talk? Call or text{' '}
            <a href={SITE.phoneHref} style={{ color: 'var(--accent)', fontWeight: 600 }}>
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
                        background: active ? 'var(--accent-soft)' : 'rgba(255,255,255,0.03)',
                        border: active
                          ? '1.5px solid var(--accent)'
                          : '1px solid var(--border-strong)',
                        color: 'var(--text)',
                        transition: 'border-color 0.2s ease, background 0.2s ease',
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{s.name}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span className="gradient-text" style={{ fontWeight: 700, fontSize: 20, fontFamily: 'var(--font-display)' }}>
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
                <Calendar selected={date} onSelect={(d) => { setDate(d); setSlot(null); }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
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
                            padding: '12px 8px',
                            borderRadius: 'var(--radius-sm)',
                            cursor: date ? 'pointer' : 'not-allowed',
                            opacity: date ? 1 : 0.4,
                            fontSize: 14,
                            fontWeight: 600,
                            background: active ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.03)',
                            color: active ? '#051018' : 'var(--text)',
                            border: active ? '1px solid transparent' : '1px solid var(--border-strong)',
                            transition: 'background 0.2s ease, border-color 0.2s ease',
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
            <div className="card" style={{ padding: 'clamp(22px, 4vw, 34px)' }}>
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
              }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: 14.5 }}>
                {service && date && slot ? (
                  <>
                    <strong style={{ color: 'var(--text)' }}>{service.name}</strong>{' '}
                    · {formatDate(date)} · {slot} ·{' '}
                    <span className="gradient-text" style={{ fontWeight: 700 }}>${service.price}</span>
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
      </div>
    </section>
  );
}

function StepLabel({ n, title, done }: { n: number; title: string; done: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span
        style={{
          width: 30, height: 30,
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 700,
          background: done ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.06)',
          color: done ? '#051018' : 'var(--text-muted)',
          border: done ? 'none' : '1px solid var(--border-strong)',
          transition: 'background 0.3s ease',
        }}
      >
        {done ? '✓' : n}
      </span>
      <h3 style={{ fontSize: 18 }}>{title}</h3>
    </div>
  );
}
