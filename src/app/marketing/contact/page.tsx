'use client';

import { SITE } from '@/lib/constants';
import { useState, useRef } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      organization: formData.get('organization'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to send message');
        setLoading(false);
        return;
      }

      setSubmitted(true);
      formRef.current?.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
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
                <form className="lcg-form" onSubmit={handleSubmit} ref={formRef}>
                  {error && (
                    <div style={{ padding: '12px 16px', marginBottom: '20px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', color: '#991b1b' }}>
                      {error}
                    </div>
                  )}
                  <div className="lcg-form-grid">
                    <div className="lcg-field">
                      <label htmlFor="name">Name</label>
                      <input id="name" name="name" type="text" placeholder="Your name" required disabled={loading} />
                    </div>

                    <div className="lcg-field">
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" placeholder="your@email.com" required disabled={loading} />
                    </div>

                    <div className="lcg-field lcg-field--full">
                      <label htmlFor="organization">Organization</label>
                      <input id="organization" name="organization" type="text" placeholder="Your company" disabled={loading} />
                    </div>

                    <div className="lcg-field lcg-field--full">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" placeholder="Tell us about your inquiry..." required disabled={loading} />
                    </div>
                  </div>

                  <div className="lcg-form-foot">
                    <button type="submit" className="lcg-btn lcg-btn--amber" disabled={loading}>
                      {loading ? 'Sending...' : 'Send message'}
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
