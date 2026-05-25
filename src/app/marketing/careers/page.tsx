export default function CareersPage() {
  const jobs = [
    {
      id: 'senior-engineer',
      title: 'Senior Infrastructure Engineer',
      team: 'Operations',
      location: 'Jakarta',
      description: 'Lead technical projects across our water and energy portfolio. 5+ years experience required.',
    },
    {
      id: 'investment-analyst',
      title: 'Investment Analyst',
      team: 'Capital Markets',
      location: 'Jakarta',
      description: 'Identify and evaluate infrastructure investment opportunities across Southeast Asia.',
    },
    {
      id: 'operations-manager',
      title: 'Operations Manager',
      team: 'Portfolio',
      location: 'Multi-location',
      description: 'Support operational improvements across portfolio companies. Based in regional hub.',
    },
    {
      id: 'financial-controller',
      title: 'Financial Controller',
      team: 'Finance',
      location: 'Jakarta',
      description: 'Oversee consolidated financial reporting for our holding company portfolio.',
    },
    {
      id: 'project-director',
      title: 'Project Director',
      team: 'Development',
      location: 'Jakarta',
      description: 'Lead development and construction of new infrastructure projects from inception to close.',
    },
  ];

  return (
    <>
      <section className="lcg-page-hero">
        <div className="lcg-container">
          <h1 className="lcg-page-title">Careers</h1>
          <p className="lcg-page-lede">
            Join us in building critical infrastructure across Southeast Asia. We&apos;re looking for talented professionals who are passionate about long-term impact and operational excellence.
          </p>
        </div>
      </section>

      <section className="lcg-section is-padded">
        <div className="lcg-container">
          <div className="lcg-jobs-grid">
            {jobs.map((job) => (
              <div key={job.id} className="lcg-job-card">
                <div className="lcg-job-info">
                  <h3>{job.title}</h3>
                  <p className="lcg-job-team">{job.team}</p>
                  <p className="lcg-job-details">
                    <span className="lcg-job-detail">
                      <span className="lcg-job-detail-label">Location</span>
                      {job.location}
                    </span>
                  </p>
                  <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--fg-2)' }}>
                    {job.description}
                  </p>
                </div>
                <div className="lcg-job-cta">
                  <button className="lcg-btn lcg-btn--amber">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
