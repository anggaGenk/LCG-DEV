'use client';

import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  cta1: string;
  cta2: string;
}

export function Hero({ title, subtitle, description, cta1, cta2 }: HeroProps) {
  const splitWords = (text: string, className: string) =>
    text.split(' ').map((w, i, arr) => (
      <span key={i}>
        <span className={className} style={{ animationDelay: `${i * 70}ms` }}>{w}</span>
        {i < arr.length - 1 ? ' ' : null}
      </span>
    ));

  return (
    <section className="lcg-hero">
      <div className="lcg-hero-inner">
        <div className="lcg-hero-eyebrow lcg-merge-in">
          <span className="lcg-overline" style={{color:'#111111'}}>
            {splitWords(subtitle, 'lcg-merge-word lcg-merge-word--eyebrow')}
          </span>
        </div>
        <h1 className="lcg-hero-title lcg-merge-in">
          {splitWords(title, 'lcg-merge-word')}
        </h1>
        <p className="lcg-hero-sub">
          {description}
        </p>
        <div className="lcg-hero-cta">
          <Link href="/marketing/contact" className="lcg-btn lcg-btn--ink">
            {cta1}
          </Link>
          <Link href="/marketing/portfolio" className="lcg-btn lcg-btn--outline">
            {cta2} &nbsp;→
          </Link>
        </div>
      </div>
    </section>
  );
}
