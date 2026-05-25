
export default function PortfolioPage() {
  const portfolioData = [
    { name: 'Cilegon CCGT', sector: 'Energy', stake: '23%', capacity: '660 MW', status: 'Operational', location: 'West Java' },
    { name: 'Wayang Windu', sector: 'Energy', stake: '18%', capacity: '227 MW', status: 'Operational', location: 'West Java' },
    { name: 'Bengkulu Solar', sector: 'Energy', stake: '40%', capacity: '100 MW', status: 'Operational', location: 'Bengkulu' },
    { name: 'Tanjung Priok Terminal', sector: 'Logistics', stake: '25%', capacity: '4.5M TEU', status: 'Operational', location: 'Jakarta' },
    { name: 'Surabaya Cold Chain', sector: 'Industrial', stake: '35%', capacity: '50K tons', status: 'Construction', location: 'East Java' },
    { name: 'LCG Field Services', sector: 'Industrial', stake: '100%', capacity: '2,400 staff', status: 'Operational', location: 'Multi-location' },
  ];

  const stats = [
    { value: '6', label: 'Portfolio companies' },
    { value: '$2.4B', label: 'Assets under management' },
    { value: '1,820 MW', label: 'Total energy capacity' },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'is-operational';
      case 'Construction':
        return 'is-construction';
      case 'Planned':
        return 'is-planned';
      default:
        return '';
    }
  };

  return (
    <>
      <section className="lcg-page-hero">
        <div className="lcg-container">
          <h1 className="lcg-page-title">Our Portfolio</h1>
          <p className="lcg-page-lede">
            We&apos;ve assembled a diverse portfolio of infrastructure and industrial businesses that serve critical needs across Southeast Asia.
          </p>
        </div>
      </section>

      <section className="lcg-section is-padded">
        <div className="lcg-container">
          <div style={{ overflowX: 'auto', marginBottom: '64px' }}>
            <table className="lcg-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Sector</th>
                  <th>Stake</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((company) => (
                  <tr key={company.name}>
                    <td className="font-medium">{company.name}</td>
                    <td>
                      <span className="lcg-pill">{company.sector}</span>
                    </td>
                    <td>{company.stake}</td>
                    <td>{company.capacity}</td>
                    <td>
                      <span className={`lcg-status-dot ${getStatusClass(company.status)}`}>
                        {company.status}
                      </span>
                    </td>
                    <td>{company.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lcg-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="lcg-stat">
                <div className="lcg-stat-n">{stat.value}</div>
                <div className="lcg-stat-l">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
