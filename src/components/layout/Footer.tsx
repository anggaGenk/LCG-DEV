import Link from 'next/link';
import { NAV_LINKS, SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-[var(--fg-1)] text-white">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-semibold mb-6">{SITE.shortName}</h3>
            <p className="text-sm text-gray-300 mb-4">{SITE.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-widest">Services</h4>
            <ul className="space-y-3">
              <li><a href="#water" className="text-sm text-gray-300 hover:text-white transition-colors">Water</a></li>
              <li><a href="#energy" className="text-sm text-gray-300 hover:text-white transition-colors">Energy</a></li>
              <li><a href="#logistics" className="text-sm text-gray-300 hover:text-white transition-colors">Logistics</a></li>
              <li><a href="#industrial" className="text-sm text-gray-300 hover:text-white transition-colors">Industrial</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-widest">Contact</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <p><a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">{SITE.email}</a></p>
              <p><a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors">{SITE.phone}</a></p>
              <p>{SITE.offices}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex items-center justify-between text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Lasana Cahaya Gemilang. All rights reserved.</p>
          <p>{SITE.offices}</p>
        </div>
      </div>
    </footer>
  );
}
