'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function MobileMenuDrawer({ isOpen, onClose, links }: { isOpen: boolean; onClose: () => void; links: typeof NAV_LINKS }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="lcg-mobile-overlay"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 98,
          top: '64px',
        }}
      />
      <div
        className="lcg-mobile-drawer"
        style={{
          position: 'fixed',
          left: 0,
          top: '64px',
          bottom: 0,
          width: '100%',
          maxWidth: '280px',
          background: 'var(--bg-default)',
          zIndex: 99,
          overflowY: 'auto',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
          animation: 'slideIn 300ms ease-out',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {links.map((link) => (
            <div key={link.id}>
              <Link
                href={link.href}
                onClick={onClose}
                style={{
                  display: 'block',
                  padding: '16px 20px',
                  color: 'var(--fg-0)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--lcg-line)',
                  fontSize: '15px',
                  fontWeight: '500',
                }}
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <div style={{ background: 'var(--bg-surface)' }}>
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.id}
                      href={sub.href}
                      onClick={onClose}
                      style={{
                        display: 'block',
                        padding: '12px 20px 12px 32px',
                        color: 'var(--fg-1)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        borderBottom: '1px solid var(--lcg-line)',
                      }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/marketing/contact"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 20px',
              margin: '12px 16px',
              background: 'var(--lcg-amber)',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: '600',
              fontSize: '14px',
              minHeight: '44px',
            }}
          >
            Contact
          </Link>
        </nav>
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>,
    document.body
  );
}

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
  // { id: 'careers', label: 'Careers', href: '/marketing/careers' },
];

export function Nav() {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <>
      <header className="lcg-nav">
        <Link href="/" className="lcg-nav-brand">
          <img src="/assets/lcg-mark-black.png" alt="" className="lcg-nav-mark" />
          <span className="lcg-nav-word">LCG</span>
        </Link>

        <button
          className="lcg-nav-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            color: 'var(--fg-0)',
            zIndex: 100,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

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

      <MobileMenuDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
