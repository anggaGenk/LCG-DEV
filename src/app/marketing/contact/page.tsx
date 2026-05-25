'use client';

import { SITE } from '@/lib/constants';
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section className="lcg-page-hero">
        <div className="lcg-container">
          <h1 className="lcg-page-title">Get in touch</h1>
          <p className="lcg-page-lede">
            Whether you have a question about our services, want to explore an investment opportunity, or simply want to say hello — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="lcg-section is-padded">
        <div className="lcg-container">
          <div className="lcg-contact-grid">
            <div className="lcg-contact-info">
              <div className="lcg-contact-block">
                <h3>Email</h3>
                <p>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </p>
              </div>

              <div className="lcg-contact-block">
                <h3>Phone</h3>
                <p>
                  <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
                </p>
              </div>

              <div className="lcg-contact-block">
                <h3>Head Office</h3>
                <p>Jakarta, Indonesia</p>
              </div>

              <div className="lcg-contact-block">
                <h3>Regional Operations</h3>
                <p>Medan, Indonesia</p>
              </div>

              <div className="lcg-contact-block">
                <h3>Investment Hub</h3>
                <p>Singapore</p>
              </div>

              <div className="lcg-contact-block">
                <h3>Business Hours</h3>
                <p>Monday – Friday<br />09:00 – 18:00 WIB</p>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="lcg-form" style={{ background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                    <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>Message sent successfully!</p>
                    <p style={{ color: 'var(--fg-2)' }}>Thank you for reaching out. We'll get back to you soon.</p>
                  </div>
                </div>
              ) : (
                <form className="lcg-form" onSubmit={handleSubmit}>
                  <div className="lcg-form-grid">
                    <div className="lcg-field">
                      <label>Name</label>
                      <input type="text" placeholder="Your name" required />
                    </div>

                    <div className="lcg-field">
                      <label>Email</label>
                      <input type="email" placeholder="your@email.com" required />
                    </div>

                    <div className="lcg-field lcg-field--full">
                      <label>Organization</label>
                      <input type="text" placeholder="Your company" />
                    </div>

                    <div className="lcg-field lcg-field--full">
                      <label>Message</label>
                      <textarea placeholder="Tell us about your inquiry..." required />
                    </div>
                  </div>

                  <div className="lcg-form-foot">
                    <button type="submit" className="lcg-btn lcg-btn--amber">
                      Send message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
