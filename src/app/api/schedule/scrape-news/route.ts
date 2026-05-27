import { NextRequest, NextResponse } from 'next/server';
import FirecrawlApp from 'firecrawl';
import { put } from '@vercel/blob';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  categories: string[];
  source: string;
  url: string;
}

async function scrapeNews(): Promise<NewsItem[]> {
  try {
    if (!process.env.FIRECRAWL_API_KEY) {
      console.error('[Scraper] Missing FIRECRAWL_API_KEY');
      return [];
    }

    const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

    const scrapeResult = await app.scrapeUrl('https://www.energyconnects.com/news/', {
      formats: ['markdown', 'html'],
      waitFor: 5000,
    });

    if (!scrapeResult || !scrapeResult.markdown) {
      console.error('[Scraper] Scrape failed:', scrapeResult);
      return [];
    }

    const newsItems: NewsItem[] = [];
    const content = (scrapeResult as any).markdown;

    // Parse news items from the scraped content
    // Looking for patterns like: ## Title followed by content
    const sections = content.split(/^##\s+/m).slice(1);

    for (let i = 0; i < Math.min(sections.length, 4); i++) {
      const section = sections[i];
      const lines = section.split('\n').filter((l: string) => l.trim());

      if (lines.length === 0) continue;

      const title = lines[0].trim();
      const excerpt = lines.slice(1, 3).join(' ').trim().slice(0, 200) || title;

      // Extract URL if present
      const urlMatch = content.match(/https:\/\/www\.energyconnects\.com\/news\/[^\s\)]+/);
      const url = urlMatch ? urlMatch[0] : `https://www.energyconnects.com/news/`;

      newsItems.push({
        id: `news-${i + 1}`,
        title,
        excerpt: excerpt || `Latest news from Energy Connects`,
        image: `https://picsum.photos/600/400?random=${i + 1}`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        categories: ['Energy', 'News'],
        source: 'Energy Connects',
        url,
      });
    }

    // If parsing didn't yield results, return empty to keep existing data
    if (newsItems.length === 0) {
      console.warn('[Scraper] No news items parsed, keeping existing data');
      return [];
    }

    return newsItems;
  } catch (error) {
    console.error('[Scraper] Error:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  // Verify this is from Vercel's cron service
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const newsData = await scrapeNews();

    // If scraping succeeded, store the data
    if (newsData.length > 0) {
      await put('news-data.json', JSON.stringify({ news: newsData }), {
        access: 'public',
      });

      console.log(`[Scraper] Successfully scraped and stored ${newsData.length} news items`);

      return NextResponse.json(
        {
          success: true,
          itemsScraped: newsData.length,
          message: 'News data updated successfully'
        },
        { status: 200 }
      );
    } else {
      console.log('[Scraper] No new items to store, using fallback');
      return NextResponse.json(
        {
          success: false,
          message: 'No items scraped, keeping existing data'
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('[Scraper Endpoint Error]', error);
    return NextResponse.json(
      { error: 'Failed to scrape news', success: false },
      { status: 500 }
    );
  }
}
