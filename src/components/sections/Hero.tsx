'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  cta1: string;
  cta2: string;
}

export function Hero({ title, subtitle, description, cta1, cta2 }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Use a ref to ensure we're targeting the correct section
    if (!heroRef.current) return;

    // Small delay to ensure DOM is fully rendered and styles are applied
    // This fixes timing issues on Windows Chrome
    const timeoutId = setTimeout(() => {
      const words = heroRef.current?.querySelectorAll('.lcg-merge-word');
      if (words && words.length > 0) {
        words.forEach((word, index) => {
          // Use requestAnimationFrame for better browser synchronization
          requestAnimationFrame(() => {
            const element = word as HTMLElement;
            // Add a data attribute with the index for alternative styling if needed
            element.setAttribute('data-index', index.toString());
            // Trigger reflow to ensure CSS variables/transitions are computed
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            element.offsetHeight;
            // Now add the animation class
            element.classList.add('is-animating');
          });
        });
      }
    }, 50); // 50ms delay for safer rendering

    return () => clearTimeout(timeoutId);
  }, []);

  const splitWords = (text: string, className: string) =>
    text.split(' ').map((w, i, arr) => (
      <span key={i} data-word-index={i}>
        <span
          className={className}
          style={{
            animationDelay: `${i * 70}ms`,
            // Explicit animation properties for Windows Chrome compatibility
            animationFillMode: 'forwards',
          }}
        >
          {w}
        </span>
        {i < arr.length - 1 ? ' ' : null}
      </span>
    ));

  return (
    <section className="lcg-hero" ref={heroRef}>
      {/* Floating parallax background shapes */}
      <div className="lcg-hero-bg-shape lcg-hero-bg-shape-1" />
      <div className="lcg-hero-bg-shape lcg-hero-bg-shape-2" />

      <div className="lcg-hero-inner">
        <div className="lcg-hero-eyebrow lcg-merge-in">
          <span className="lcg-overline" style={{color:'#111111'}}>
            {splitWords(subtitle, 'lcg-merge-word lcg-merge-word--eyebrow')}
          </span>
        </div>
        <h1 className="lcg-hero-title lcg-merge-in lcg-hero-title-glow">
          {splitWords(title, 'lcg-merge-word')}
        </h1>
        <p className="lcg-hero-sub">
          {description}
        </p>
        <div className="lcg-hero-cta">
          <Link href="/marketing/contact" className="lcg-btn lcg-btn--ink lcg-btn-hover-lift">
            {cta1}
          </Link>
          {/* TODO: Portfolio page not built yet — temporarily points to Services. Revert to /marketing/portfolio once the portfolio page exists. */}
          <Link href="/marketing/services" className="lcg-btn lcg-btn--outline lcg-btn-hover-lift">
            {cta2} &nbsp;→
          </Link>
        </div>
      </div>
    </section>
  );
}
