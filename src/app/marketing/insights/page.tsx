export default function InsightsPage() {
  const posts = [
    {
      id: 'energy-transition',
      title: 'The Energy Transition Opportunity',
      excerpt: 'Southeast Asia is poised for rapid energy transition. We explore the infrastructure investments needed to support 50% renewable energy penetration by 2030.',
      tags: ['Energy', 'Infrastructure'],
      date: 'May 15, 2026',
      readTime: '5 min read',
    },
    {
      id: 'water-scarcity',
      title: 'Investing in Water Security',
      excerpt: 'Water scarcity affects millions across Southeast Asia. How patient capital can help build sustainable solutions that serve communities and create long-term returns.',
      tags: ['Water', 'Impact'],
      date: 'May 8, 2026',
      readTime: '7 min read',
    },
    {
      id: 'logistics-growth',
      title: 'Logistics Networks as Economic Enablers',
      excerpt: 'Efficient logistics is critical for supply chain resilience. We discuss how infrastructure investment in regional hubs creates multiplier effects across economies.',
      tags: ['Logistics', 'Capital'],
      date: 'April 30, 2026',
      readTime: '6 min read',
    },
    {
      id: 'operations-excellence',
      title: 'Operational Excellence in Infrastructure',
      excerpt: 'Operational improvements can generate returns comparable to greenfield development. Our approach to identifying and executing high-impact operational upgrades.',
      tags: ['Operations', 'Value Creation'],
      date: 'April 22, 2026',
      readTime: '8 min read',
    },
  ];

  return (
    <>
      <section className="lcg-page-hero">
        <div className="lcg-container">
          <h1 className="lcg-page-title">Insights</h1>
          <p className="lcg-page-lede">
            Perspectives on infrastructure investment, capital deployment, and the role of patient capital in building economic resilience across Southeast Asia.
          </p>
        </div>
      </section>

      <section className="lcg-section is-padded">
        <div className="lcg-container">
          <div className="lcg-posts-grid">
            {posts.map((post) => (
              <article key={post.id} className="lcg-post-card">
                <div className="lcg-post-image">📰</div>
                <div className="lcg-post-content">
                  <div className="lcg-post-meta">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="lcg-post-title">{post.title}</h2>
                  <p className="lcg-post-excerpt">{post.excerpt}</p>
                  <div className="lcg-post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="lcg-post-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
