'use client';

import { useEffect, useState } from 'react';

interface StatData {
  prefix?: string;
  target: number;
  suffix?: string;
  decimals?: number;
  useComma?: boolean;
  l: string;
}

interface StatsProps {
  stats: StatData[];
}

function useCountUp(target: number, { duration = 1600, delay = 0, decimals = 0 } = {}) {
  const prefersReduced = typeof matchMedia === 'function'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [value, setValue] = useState(prefersReduced ? target : 0);
  useEffect(() => {
    if (prefersReduced) return;
    let raf: number;
    let start: number | null = null;
    const timeout = setTimeout(() => {
      const tick = (t: number) => {
        if (start == null) start = t;
        const elapsed = t - start;
        const k = Math.min(1, elapsed / duration);
        const eased = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        const v = +(target * eased).toFixed(decimals);
        setValue(v);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [target, duration, delay, decimals, prefersReduced]);
  return value;
}

function AnimatedStat({ prefix = '', target, suffix = '', decimals = 0, useComma = false, delay }: Omit<StatData, 'l'> & { delay: number }) {
  const v = useCountUp(target, { duration: 1700, delay, decimals });
  const display = useComma
    ? v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : v.toFixed(decimals);
  return (
    <span className="lcg-stat-n-inner">
      <span className="lcg-stat-prefix">{prefix}</span>
      <span className="lcg-stat-num">{display}</span>
      <span className="lcg-stat-suffix">{suffix}</span>
    </span>
  );
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="lcg-stats lcg-stats-scroll-container">
      {/* Background parallax shape */}
      <div className="lcg-stats-bg-shape" />

      <div className="lcg-container">
        <div className="lcg-stats-grid lcg-scroll-slide-up">
          {stats.map((s, i) => (
            <div key={i} className="lcg-stat lcg-stat-card">
              <div className="lcg-stat-n">
                <AnimatedStat {...s} delay={120 + i * 80} />
              </div>
              <div className="lcg-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
