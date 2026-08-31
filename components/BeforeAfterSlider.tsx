'use client';

import { useCallback, useRef, useState } from 'react';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Draggable before/after comparison. Pass image paths relative to /public
 * (e.g. "/images/before-1.svg"); the GitHub Pages base path is applied here.
 */
export default function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) update(e.clientX);
  };
  const onPointerUp = () => (dragging.current = false);

  return (
    <div
      ref={ref}
      role="slider"
      aria-label={`${alt} — before and after comparison`}
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5));
        if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5));
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        userSelect: 'none',
        touchAction: 'none',
        cursor: 'ew-resize',
        aspectRatio: '8 / 5',
        background: 'var(--surface)',
      }}
    >
      {/* AFTER (base layer) */}
      <img
        src={`${BASE}${after}`}
        alt={`${alt} — after detailing`}
        draggable={false}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* BEFORE (clipped on top) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      >
        <img
          src={`${BASE}${before}`}
          alt={`${alt} — before detailing`}
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      {/* handle */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 2,
          background: 'rgba(255,255,255,0.85)',
          boxShadow: '0 0 12px rgba(69,196,255,0.8)',
          transform: 'translateX(-1px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(10, 12, 16, 0.85)',
            border: '1.5px solid rgba(255,255,255,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            color: '#fff',
            letterSpacing: 1,
            backdropFilter: 'blur(4px)',
          }}
        >
          ⇔
        </div>
      </div>
    </div>
  );
}
