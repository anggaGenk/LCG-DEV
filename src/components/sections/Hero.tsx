'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  cta1: string;
  cta2: string;
}

export function Hero({ title, subtitle, description, cta1, cta2 }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--lcg-amber)]">
            Lasana Cahaya Gemilang
          </p>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
            {mounted ? (
              title.split(' ').map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.25em',
                    animation: `lcg-merge-in 600ms cubic-bezier(0.34, 1.4, 0.5, 1) forwards`,
                    '--tx': `${i % 2 === 0 ? '-' : ''}12px`,
                    '--ty': `${i % 2 === 0 ? '8' : '-8'}px`,
                    animationDelay: `${i * 70}ms`,
                  } as React.CSSProperties}
                >
                  {word}
                </span>
              ))
            ) : null}
          </h1>

          <p className="text-lg text-[var(--fg-2)] mb-8">
            {description}
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary">
              {cta1}
            </button>
            <Link href="/portfolio" className="btn btn-secondary">
              {cta2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
