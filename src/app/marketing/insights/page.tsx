'use client';

import { useEffect, useState } from 'react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  categories: string[];
  source: string;
}

export default function InsightsPage() {
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/insights');
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        setPosts(data.news || []);
      } catch (err) {
        setError('Failed to load news');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <section className="lcg-page-hero">
        <div className="lcg-container">
          <h1 className="lcg-page-title">Insights</h1>
          <p className="lcg-page-lede">
            Latest news and developments in energy, water, and infrastructure sectors across Southeast Asia.
          </p>
        </div>
      </section>

      <section className="lcg-section is-padded">
        <div className="lcg-container">
          {loading && <p style={{ textAlign: 'center', padding: '40px' }}>Loading latest news...</p>}
          {error && <p style={{ textAlign: 'center', color: '#d32f2f', padding: '40px' }}>{error}</p>}
          {!loading && !error && (
            <div className="lcg-posts-grid">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <article key={post.id} className="lcg-post-card">
                    <div
                      className="lcg-post-image"
                      style={{
                        position: 'relative',
                        height: '200px',
                        overflow: 'hidden',
                        background: '#f0f0f0',
                      }}
                    >
                      {post.image && post.image !== '/news-placeholder.jpg' ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) parent.textContent = '📰';
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            fontSize: '48px',
                          }}
                        >
                          📰
                        </div>
                      )}
                    </div>
                    <div className="lcg-post-content">
                      <div className="lcg-post-meta">
                        <span>{post.date}</span>
                        <span style={{ fontSize: '12px', color: '#999' }}>{post.source}</span>
                      </div>
                      <h2 className="lcg-post-title">{post.title}</h2>
                      <p className="lcg-post-excerpt">{post.excerpt}</p>
                      <div className="lcg-post-tags">
                        {post.categories.map((cat) => (
                          <span key={cat} className="lcg-post-tag">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                  No news items available at this time.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
