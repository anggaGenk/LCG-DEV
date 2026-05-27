import Link from 'next/link';
import { SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="lcg-footer">
      <div className="lcg-container">
        <div className="lcg-footer-top">
          <div>
            <img src="/assets/lcg-mark-white.png" alt="LCG" className="lcg-footer-logo" />
            <p className="lcg-footer-tag">{SITE.description}</p>
          </div>

          <div className="lcg-footer-cols">
            <div>
              <div className="lcg-footer-col-h">Navigation</div>
              <Link href="/marketing/about">About</Link>
              <Link href="/marketing/services">Services</Link>
              {/* <Link href="/marketing/portfolio">Portfolio</Link> */}
              <Link href="/marketing/contact">Contact</Link>
            </div>

            <div>
              <div className="lcg-footer-col-h">Sectors</div>
              <a href="#water">Water</a>
              <a href="#energy">Energy</a>
              <a href="#logistics">Logistics</a>
              <a href="#industrial">Industrial</a>
            </div>

            <div>
              <div className="lcg-footer-col-h">Contact</div>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
              <p style={{ padding: '6px 0', color: 'rgba(255,255,255,0.85)' }}>{SITE.offices}</p>
            </div>
          </div>
        </div>

        <div className="lcg-footer-bot">
          <p>&copy; {new Date().getFullYear()} Lasana Cahaya Gemilang. All rights reserved.</p>
          <p>{SITE.offices}</p>
        </div>
      </div>
    </footer>
  );
}
