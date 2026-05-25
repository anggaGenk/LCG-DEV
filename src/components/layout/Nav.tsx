'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const NAV_LINKS = [
  {
    id: 'about',
    label: 'About',
    href: '/marketing/about',
    dropdown: [
      { id: 'history', label: 'History', href: '/marketing/about?sub=history' },
      { id: 'vision', label: 'Vision & Mission', href: '/marketing/about?sub=vision' },
      { id: 'organization', label: 'Organization', href: '/marketing/about?sub=organization' },
      { id: 'directors', label: 'Board of Directors', href: '/marketing/about?sub=directors' },
      { id: 'commissioners', label: 'Board of Commissioners', href: '/marketing/about?sub=commissioners' },
    ]
  },
  { id: 'services', label: 'Services', href: '/marketing/services' },
  { id: 'portfolio', label: 'Portfolio', href: '/marketing/portfolio' },
  { id: 'insights', label: 'Insights', href: '/marketing/insights' },
  { id: 'careers', label: 'Careers', href: '/marketing/careers' },
];

export function Nav() {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const openDropdown = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenId(id);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), 140);
  };

  const closeNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenId(null);
  };

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNow();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openId]);

  return (
    <header className="lcg-nav">
      <Link href="/" className="lcg-nav-brand">
        <img src="/assets/lcg-mark-black.png" alt="" className="lcg-nav-mark" />
        <span className="lcg-nav-word">LCG</span>
      </Link>

      <nav className="lcg-nav-links">
        {NAV_LINKS.map((link) =>
          link.dropdown ? (
            <div
              key={link.id}
              className={`lcg-nav-dd ${openId === link.id ? 'is-open' : ''}`}
              onMouseEnter={() => openDropdown(link.id)}
              onMouseLeave={scheduleClose}
            >
              <button
                className={`lcg-nav-link lcg-nav-link--has-dd ${isActive(link.href) ? 'is-active' : ''}`}
                onClick={() => openDropdown(link.id)}
                aria-haspopup="true"
                aria-expanded={openId === link.id}
              >
                {link.label}
                <span className="lcg-nav-dd-caret" aria-hidden="true">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              <div className="lcg-nav-dd-panel" role="menu">
                <div className="lcg-nav-dd-inner">
                  {link.dropdown.map((sub, i) => (
                    <Link
                      key={sub.id}
                      href={sub.href}
                      role="menuitem"
                      style={{ transitionDelay: openId === link.id ? `${60 + i * 35}ms` : '0ms' }}
                      className="lcg-nav-dd-item"
                      onClick={() => closeNow()}
                    >
                      <span className="lcg-nav-dd-label">{sub.label}</span>
                      <span className="lcg-nav-dd-arrow" aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={link.id}
              href={link.href}
              className={`lcg-nav-link ${isActive(link.href) ? 'is-active' : ''}`}
            >
              {link.label}
            </Link>
          )
        )}
      </nav>

      <Link href="/marketing/contact" className="lcg-btn lcg-btn--ink lcg-btn--sm lcg-nav-contact">
        Contact
      </Link>
    </header>
  );
}
