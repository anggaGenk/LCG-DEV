'use client';

import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const prefersReduced = typeof matchMedia === 'function'
      && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    // Create Intersection Observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;

          // Apply animation class if it has a scroll-triggered class
          if (el.classList.contains('lcg-scroll-fade-in')
            || el.classList.contains('lcg-scroll-slide-up')
            || el.classList.contains('lcg-scroll-scale')) {
            el.classList.add('is-visible');
          }

          // Apply animation class if it's an animated element
          if (el.className.includes('-animated')) {
            el.classList.add('is-visible');
          }

          // Handle staggered animations for children
          const animatedChildren = el.querySelectorAll('[class*="-animated"]');
          if (animatedChildren.length > 0) {
            animatedChildren.forEach((child) => {
              child.classList.add('is-visible');
            });
          }

          // Unobserve after animation triggers
          if (observerRef.current) {
            observerRef.current.unobserve(el);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px', // Trigger slightly before entering viewport
    });

    // Observe all scroll-triggered elements
    const scrollElements = document.querySelectorAll(
      '.lcg-scroll-fade-in, .lcg-scroll-slide-up, .lcg-scroll-scale, [class*="-animated"]'
    );

    scrollElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
}
