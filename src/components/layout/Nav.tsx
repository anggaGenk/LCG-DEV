'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, SITE } from '@/lib/constants';

export function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-[var(--lcg-line)]" style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <img src="/assets/lcg-logo.png" alt="LCG" className="h-8" />
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium ${isActive(link.href) ? 'active text-[var(--lcg-amber-500)]' : 'text-[var(--fg-1)]'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button className="btn btn-primary hidden md:flex">
            Get in touch
          </button>
        </div>
      </div>
    </nav>
  );
}
