import { Service } from '@/lib/types';

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  const iconMap: Record<string, string> = {
    droplet: '💧',
    zap: '⚡',
    truck: '🚚',
    factory: '🏭',
  };

  return (
    <section className="lcg-section is-padded lcg-services-scroll-container">
      {/* Background parallax shapes */}
      <div className="lcg-services-bg-shape-1" />
      <div className="lcg-services-bg-shape-2" />

      <div className="lcg-container">
        <div className="lcg-section-head lcg-scroll-fade-in">
          <h2 className="lcg-section-title">Our services</h2>
          <p className="lcg-page-lede" style={{ marginTop: 16 }}>
            LCG invests in four core sectors that form the backbone of modern economies.
          </p>
        </div>

        <div className="lcg-svc-grid">
          {services.map((service, i) => (
            <div key={service.id} className="lcg-svc-card lcg-svc-card-animated" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="lcg-svc-icon">
                {iconMap[service.icon] || '•'}
              </div>
              <h3 className="lcg-svc-title">
                {service.title}
              </h3>
              <p className="lcg-svc-body">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
