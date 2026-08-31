'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

/* Inline icons — zero external dependencies */
const ChevronLeftIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export interface CarouselItem {
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  /** Optional second image blended in with a diagonal cross-fade (top-left = img, bottom-right = img2). */
  img2?: string;
  price?: number;
  /** Original price shown struck through next to `price` (sale effect). */
  oldPrice?: number;
  priceNote?: string;
  includes?: string[];
  ctaText?: string;
  ctaUrl?: string;
}

export interface CoverFlowCarouselProps {
  items: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  onCtaClick?: (item: CarouselItem) => void;
}

const ACCENT = 'var(--accent, #45c4ff)';
const ACCENT_GRADIENT = 'var(--accent-gradient, linear-gradient(120deg, #45c4ff, #7c8cf8))';

export function CoverFlowCarousel({
  items,
  sectionLabel = 'OUR SERVICES',
  autoplay = true,
  autoplayDelay = 6000,
  onCtaClick,
}: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => setCurrentIndex(((idx % total) + total) % total);

  useEffect(() => {
    if (!autoplay || isHovered || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isHovered, nextSlide, total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 720,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '48px 0',
        userSelect: 'none',
        backgroundColor: 'var(--bg, #07080b)',
        color: 'var(--text, #f2f4f8)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background ambience — blurred current photo */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={items[currentIndex]?.img}
          alt=""
          aria-hidden
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.2) blur(32px)',
            transform: 'scale(1.15)',
            transition: 'opacity 1000ms ease, filter 1000ms ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(7,8,11,0.35) 0%, rgba(7,8,11,0.94) 100%)',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1120,
          margin: '0 auto',
          padding: '0 16px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Eyebrow */}
        {sectionLabel && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
            <span style={{ width: 36, height: 1, background: `linear-gradient(90deg, transparent, ${'#45c4ff'})` }} />
            <h3
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: ACCENT,
                margin: 0,
              }}
            >
              {sectionLabel}
            </h3>
            <span style={{ width: 36, height: 1, background: `linear-gradient(90deg, ${'#45c4ff'}, transparent)` }} />
          </div>
        )}

        {/* 3D coverflow stage */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 540,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
            perspective: 1400,
          }}
        >
          {items.map((item, idx) => {
            // Signed relative offset so small item counts (e.g. 3) still place
            // one card left and one card right of center.
            let rel = ((idx - currentIndex) % total + total) % total;
            if (rel > total / 2) rel -= total;

            let transform = 'translateX(0px) scale(0.4) rotateY(0deg)';
            let opacity = 0;
            let zIndex = 0;
            let filter = 'brightness(0.4) blur(2px)';
            let isCenter = false;

            if (rel === 0) {
              isCenter = true;
              transform = 'translateX(0px) scale(1) rotateY(0deg)';
              opacity = 1;
              zIndex = 30;
              filter = 'brightness(1)';
            } else if (rel === 1) {
              transform = 'translateX(285px) scale(0.84) rotateY(-24deg)';
              opacity = 0.65;
              zIndex = 20;
              filter = 'brightness(0.75)';
            } else if (rel === 2) {
              transform = 'translateX(510px) scale(0.68) rotateY(-38deg)';
              opacity = 0.38;
              zIndex = 10;
              filter = 'brightness(0.55) blur(1px)';
            } else if (rel === -1) {
              transform = 'translateX(-285px) scale(0.84) rotateY(24deg)';
              opacity = 0.65;
              zIndex = 20;
              filter = 'brightness(0.75)';
            } else if (rel === -2) {
              transform = 'translateX(-510px) scale(0.68) rotateY(38deg)';
              opacity = 0.38;
              zIndex = 10;
              filter = 'brightness(0.55) blur(1px)';
            }

            return (
              <div
                key={idx}
                onClick={() => !isCenter && goToSlide(idx)}
                style={{
                  position: 'absolute',
                  width: 340,
                  height: 520,
                  borderRadius: 18,
                  overflow: 'hidden',
                  backgroundColor: '#0c0e13',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: 'center center',
                  transition: 'all 800ms cubic-bezier(0.25, 1, 0.5, 1)',
                  boxShadow: isCenter
                    ? '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(69,196,255,0.22)'
                    : '0 15px 35px rgba(0,0,0,0.5)',
                  cursor: isCenter ? 'default' : 'pointer',
                }}
              >
                {/* Photo (with optional diagonal cross-fade to a second photo) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt={item.titleLine1}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {item.img2 && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.img2}
                    alt=""
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      WebkitMaskImage: 'linear-gradient(155deg, transparent 38%, #000 62%)',
                      maskImage: 'linear-gradient(155deg, transparent 38%, #000 62%)',
                    }}
                  />
                )}

                {/* Dark vignette overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 22%, rgba(0,0,0,0.72) 55%, rgba(0,0,0,0.96) 100%)',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                />

                {/* Content overlay */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    padding: '18px 18px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    zIndex: 20,
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? 'translateY(0px)' : 'translateY(16px)',
                    transition: 'opacity 500ms ease, transform 500ms ease',
                    pointerEvents: isCenter ? 'auto' : 'none',
                  }}
                >
                  {/* Tag */}
                  <div style={{ textAlign: 'right', width: '100%', paddingRight: 4 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        color: 'rgba(255,255,255,0.9)',
                        textShadow: '0 2px 6px rgba(0,0,0,0.8)',
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Body content */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 3,
                      marginTop: 'auto',
                      paddingBottom: 2,
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: 'var(--font-display, inherit)',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: 1.12,
                        textShadow: '0 3px 12px rgba(0,0,0,0.95)',
                      }}
                    >
                      {item.titleLine1}
                    </h2>
                    {item.titleLine2 && (
                      <span
                        style={{
                          fontSize: '1.02rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: '#eef2f8',
                          lineHeight: 1.2,
                          textShadow: '0 3px 10px rgba(0,0,0,0.9)',
                        }}
                      >
                        {item.titleLine2}
                      </span>
                    )}

                    {/* Price */}
                    {item.price !== undefined && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'center',
                          gap: 10,
                          marginTop: 4,
                        }}
                      >
                        {item.oldPrice !== undefined && (
                          <span
                            style={{
                              fontSize: '1.05rem',
                              fontWeight: 600,
                              color: 'rgba(255,255,255,0.55)',
                              textDecoration: 'line-through',
                              textDecorationColor: 'rgba(255,120,120,0.9)',
                              textDecorationThickness: 2,
                              textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                            }}
                          >
                            ${item.oldPrice}
                          </span>
                        )}
                        <span
                          style={{
                            fontFamily: 'var(--font-display, inherit)',
                            fontSize: '1.9rem',
                            fontWeight: 800,
                            color: '#ffffff',
                            textShadow: '0 3px 12px rgba(0,0,0,0.95)',
                            lineHeight: 1,
                          }}
                        >
                          ${item.price}
                        </span>
                        {item.priceNote && (
                          <span
                            style={{
                              fontSize: '0.8rem',
                              color: 'rgba(255,255,255,0.7)',
                              textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                            }}
                          >
                            {item.priceNote}
                          </span>
                        )}
                      </div>
                    )}

                    <div
                      style={{
                        width: 34,
                        height: 2,
                        background: ACCENT_GRADIENT,
                        borderRadius: 2,
                        margin: '7px auto 6px',
                        boxShadow: '0 0 8px rgba(69,196,255,0.7)',
                      }}
                    />

                    {item.desc && (
                      <p
                        style={{
                          fontSize: '0.8rem',
                          fontStyle: 'italic',
                          color: 'rgba(255,255,255,0.9)',
                          maxWidth: 290,
                          margin: '0 0 8px',
                          lineHeight: 1.3,
                          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                        }}
                      >
                        {item.desc}
                      </p>
                    )}

                    {item.includes && item.includes.length > 0 && (
                      <ul
                        style={{
                          listStyle: 'none',
                          margin: '0 0 12px',
                          padding: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 4,
                          textAlign: 'left',
                        }}
                      >
                        {item.includes.map((inc) => (
                          <li
                            key={inc}
                            style={{
                              display: 'flex',
                              gap: 8,
                              fontSize: '0.74rem',
                              lineHeight: 1.35,
                              color: 'rgba(255,255,255,0.88)',
                              textShadow: '0 2px 6px rgba(0,0,0,0.9)',
                            }}
                          >
                            <span aria-hidden style={{ color: ACCENT, fontWeight: 700 }}>
                              ✓
                            </span>
                            {inc}
                          </li>
                        ))}
                      </ul>
                    )}

                    <a
                      href={item.ctaUrl || '#'}
                      onClick={(e) => {
                        if (onCtaClick) {
                          e.preventDefault();
                          onCtaClick(item);
                        }
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '9px 20px',
                        borderRadius: 9999,
                        background: ACCENT_GRADIENT,
                        color: '#051018',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.4), 0 0 15px rgba(69,196,255,0.3)',
                        cursor: 'pointer',
                        transition: 'transform 200ms ease, box-shadow 200ms ease',
                      }}
                    >
                      <span>{item.ctaText || 'Book Now'}</span>
                      <ArrowRightIcon />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous service"
          style={{
            position: 'absolute',
            left: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 46,
            height: 46,
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            zIndex: 40,
            transition: 'all 200ms ease',
          }}
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next service"
          style={{
            position: 'absolute',
            right: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 46,
            height: 46,
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            zIndex: 40,
            transition: 'all 200ms ease',
          }}
        >
          <ChevronRightIcon />
        </button>

        {/* Pagination dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, zIndex: 30 }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                height: 8,
                width: idx === currentIndex ? 28 : 8,
                borderRadius: 9999,
                backgroundColor: idx === currentIndex ? '#45c4ff' : 'rgba(255,255,255,0.25)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: idx === currentIndex ? '0 0 10px rgba(69,196,255,0.7)' : 'none',
                transition: 'all 300ms ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Component = CoverFlowCarousel;
export default CoverFlowCarousel;
