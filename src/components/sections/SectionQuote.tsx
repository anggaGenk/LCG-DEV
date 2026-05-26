export function SectionQuote() {
  return (
    <section className="lcg-section is-padded lcg-bg-surface lcg-quote-scroll-container">
      {/* Background parallax shape */}
      <div className="lcg-quote-bg-shape" />

      <div className="lcg-container">
        <blockquote className="lcg-pullquote lcg-scroll-fade-in">
          <p className="lcg-quote-text">&quot;We build for the asset&apos;s service life — twenty, thirty, fifty years. The quarter is noise.&quot;</p>
          <footer className="lcg-quote-footer">
            <div>
              <span className="lcg-pq-name">Randika Galih Gemilang</span>
              <span className="lcg-pq-role">Chief Executive Officer</span>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
