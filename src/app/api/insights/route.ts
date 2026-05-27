import { NextRequest, NextResponse } from 'next/server';
import FirecrawlApp from 'firecrawl';

// Initialize Firecrawl with API key from environment
const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

interface InsightPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  readTime: string;
  url?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get the source URL from query params (e.g., /api/insights?url=https://...)
    const url = request.nextUrl.searchParams.get('url');

    // If no URL provided, return default insights data
    if (!url) {
      const defaultPosts: InsightPost[] = [
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

      return NextResponse.json({ posts: defaultPosts });
    }

    // Scrape content from the provided URL using Firecrawl
    const crawlResult = await firecrawl.scrapeWebsite(url, {
      formats: ['markdown', 'json'],
    });

    if (!crawlResult.success) {
      return NextResponse.json(
        { error: 'Failed to scrape website', details: crawlResult.error },
        { status: 400 }
      );
    }

    // Parse the scraped content and extract insights
    const content = crawlResult.markdown || crawlResult.json;

    // For now, return a structured response
    // In production, you'd parse the scraped content more intelligently
    const posts: InsightPost[] = [
      {
        id: 'crawled-1',
        title: 'Latest Infrastructure Insights',
        excerpt: content?.substring(0, 200) || 'Fresh insights from our research',
        tags: ['Infrastructure', 'Updates'],
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: '5 min read',
        url,
      },
    ];

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insights', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
