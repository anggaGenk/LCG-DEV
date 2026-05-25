import { SERVICES } from '@/lib/constants';

export default function ServicesPage() {
  const waterSegments = [
    {
      title: 'Drinking Water',
      desc: 'Treatment, distribution, and management of clean water supply for municipal and industrial customers.',
      points: ['Municipal treatment plants', 'Distribution networks', 'Quality monitoring'],
    },
    {
      title: 'Mine Water',
      desc: 'Specialized treatment of water from mining operations, ensuring environmental compliance and reuse.',
      points: ['Acid mine drainage treatment', 'Tailings management', 'Water recycling'],
    },
    {
      title: 'Non-Revenue Water',
      desc: 'Reducing water loss in distribution networks through leak detection and infrastructure improvement.',
      points: ['Leak identification', 'Infrastructure upgrade', 'Loss reduction'],
    },
  ];

  const waterStats = [
    { value: '2.4M', label: 'People served' },
    { value: '1,200+', label: 'km of distribution' },
    { value: '98%', label: 'Water quality compliance' },
    { value: '85%', label: 'Network efficiency' },
  ];

  const engagementSteps = [
    {
      title: 'Discover',
      desc: 'We conduct thorough due diligence to understand the asset, its market, and operational challenges.',
    },
    {
      title: 'Develop',
      desc: 'We work with management to create a detailed improvement plan and operational roadmap.',
    },
    {
      title: 'Deploy',
      desc: 'We execute improvements, optimize operations, and build organizational capabilities.',
    },
    {
      title: 'Deliver',
      desc: 'We create sustainable value and position the asset for long-term growth and impact.',
    },
  ];

  return (
    <>
      <section className="lcg-page-hero">
        <div className="lcg-container">
          <h1 className="lcg-page-title">How We Operate</h1>
          <p className="lcg-page-lede">
            Our patient-capital approach combines strategic expertise, operational excellence, and long-term commitment to build and scale world-class infrastructure businesses.
          </p>
        </div>
      </section>

      <section className="lcg-section is-padded">
        <div className="lcg-container">
          <div className="lcg-section-head">
            <h2 className="lcg-section-title">Our Sectors</h2>
          </div>
          <div className="lcg-svc-grid">
            {SERVICES.map((service) => (
              <div key={service.id} className="lcg-svc-card">
                <h3 className="lcg-svc-title">{service.title}</h3>
                <p className="lcg-svc-body">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lcg-section is-padded lcg-bg-surface">
        <div className="lcg-container">
          <div className="lcg-section-head">
            <h2 className="lcg-section-title">Water Infrastructure</h2>
            <p className="lcg-page-lede" style={{ marginBottom: 0 }}>
              We operate critical water infrastructure across multiple segments, serving millions of people and businesses.
            </p>
          </div>

          <div className="lcg-water-segments">
            {waterSegments.map((seg) => (
              <div key={seg.title} className="lcg-water-card">
                <h3 className="lcg-water-title">{seg.title}</h3>
                <p className="lcg-water-desc">{seg.desc}</p>
                <ul className="lcg-water-list">
                  {seg.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '64px' }}>
            <h3 className="lcg-section-title" style={{ marginBottom: '32px' }}>Water Metrics</h3>
            <div className="lcg-stats-grid">
              {waterStats.map((stat) => (
                <div key={stat.label} className="lcg-stat">
                  <div className="lcg-stat-n">{stat.value}</div>
                  <div className="lcg-stat-l">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="lcg-section is-padded">
        <div className="lcg-container">
          <div className="lcg-section-head">
            <h2 className="lcg-section-title">Our Engagement Model</h2>
            <p className="lcg-page-lede" style={{ marginBottom: 0 }}>
              A four-step process that ensures alignment from discovery through delivery, creating lasting value.
            </p>
          </div>

          <div className="lcg-steps">
            {engagementSteps.map((step) => (
              <div key={step.title} className="lcg-step">
                <h3 className="lcg-step-title">{step.title}</h3>
                <p className="lcg-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
