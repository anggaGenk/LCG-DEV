import { NextRequest, NextResponse } from 'next/server';
import { FirecrawlClient } from 'firecrawl';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  categories: string[];
  source: string;
}

const firecrawlKey = process.env.FIRECRAWL_API_KEY;

export async function GET(request: NextRequest) {
  try {
    if (!firecrawlKey) {
      return NextResponse.json(
        { error: 'Firecrawl API key not configured' },
        { status: 500 }
      );
    }

    const app = new FirecrawlClient({ apiKey: firecrawlKey });

    // Scrape energy news from energyconnects.com
    const scrapeResult = await app.scrapeUrl('https://www.energyconnects.com/news/', {
      formats: ['markdown', 'html'],
      onlyMainContent: true,
    });

    if (!scrapeResult.html) {
      return NextResponse.json(
        { error: 'Failed to scrape news', details: 'No content returned' },
        { status: 500 }
      );
    }

    // Parse the scraped content to extract news items
    const html = scrapeResult.html;
    const markdown = scrapeResult.markdown || '';

    // Simple regex-based parsing for news items
    const newsRegex = /<article[^>]*>[\s\S]*?<\/article>/g;
    const articles = html.match(newsRegex) || [];

    const newsItems: NewsItem[] = [];

    articles.slice(0, 4).forEach((article, index) => {
      // Extract title
      const titleMatch = article.match(/<h[2-3][^>]*>([^<]+)<\/h[2-3]>/);
      const title = titleMatch ? titleMatch[1].trim() : `News ${index + 1}`;

      // Extract date
      const dateMatch = article.match(/(\d{1,2}\s+\w+\s+\d{4}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec\s+\d{1,2},?\s+\d{4})/);
      const date = dateMatch ? dateMatch[0] : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      // Extract image
      const imgMatch = article.match(/<img[^>]+src=["']([^"']+)["']/);
      const image = imgMatch ? imgMatch[1] : '/news-placeholder.jpg';

      // Extract excerpt
      const excerptMatch = article.match(/<p[^>]*>([^<]{20,200})<\/p>/);
      const excerpt = excerptMatch ? excerptMatch[1].trim() : 'Energy and infrastructure news';

      // Extract categories from text
      const categories: string[] = [];
      if (article.toLowerCase().includes('energy') || article.toLowerCase().includes('oil') || article.toLowerCase().includes('renewable')) {
        categories.push('Energy');
      }
      if (article.toLowerCase().includes('water') || article.toLowerCase().includes('utility')) {
        categories.push('Water');
      }
      if (article.toLowerCase().includes('renewable') || article.toLowerCase().includes('solar') || article.toLowerCase().includes('wind')) {
        categories.push('Renewables');
      }
      if (article.toLowerCase().includes('oil') || article.toLowerCase().includes('gas')) {
        categories.push('Oil & Gas');
      }
      if (article.toLowerCase().includes('infrastructure')) {
        categories.push('Infrastructure');
      }

      if (categories.length === 0) {
        categories.push('Energy');
      }

      newsItems.push({
        id: `news-${index}`,
        title,
        excerpt,
        image,
        date,
        categories: [...new Set(categories)],
        source: 'Energy Connects',
      });
    });

    // Return news items
    return NextResponse.json({ news: newsItems });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insights', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
