import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/blob';

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

const fallbackNewsData: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Southeast Asia Leads Global Renewable Energy Expansion',
    excerpt: 'Southeast Asia is experiencing rapid growth in renewable energy capacity, with investment reaching record levels. Solar and wind projects are transforming the energy landscape across the region.',
    image: 'https://picsum.photos/600/400?random=1',
    date: 'May 24, 2026',
    categories: ['Energy', 'Renewables'],
    source: 'Energy Connects',
    url: 'https://www.energyconnects.com/news/southeast-asia-renewable-energy',
  },
  {
    id: 'news-2',
    title: 'Water Crisis Solutions Attract Major Investment',
    excerpt: 'Billions in capital are being deployed to address water scarcity in Southeast Asia. New infrastructure projects are bringing clean water access to millions of underserved communities.',
    image: 'https://picsum.photos/600/400?random=2',
    date: 'May 22, 2026',
    categories: ['Water', 'Infrastructure'],
    source: 'Energy Connects',
    url: 'https://www.energyconnects.com/news/water-crisis-investment',
  },
  {
    id: 'news-3',
    title: 'Oil and Gas Transition Accelerates in Indonesia',
    excerpt: 'Indonesia announces ambitious transition plan to shift from fossil fuels to renewable sources. Major oil companies pledge support for energy transition initiatives and infrastructure modernization.',
    image: 'https://picsum.photos/600/400?random=3',
    date: 'May 20, 2026',
    categories: ['Oil & Gas', 'Energy'],
    source: 'Energy Connects',
    url: 'https://www.energyconnects.com/news/indonesia-energy-transition',
  },
  {
    id: 'news-4',
    title: 'Smart Grid Technology Transforms Regional Energy Markets',
    excerpt: 'Advanced grid technology is enabling better energy distribution across Southeast Asia. Smart systems improve efficiency and reduce costs while supporting renewable integration at scale.',
    image: 'https://picsum.photos/600/400?random=4',
    date: 'May 18, 2026',
    categories: ['Energy', 'Technology'],
    source: 'Energy Connects',
    url: 'https://www.energyconnects.com/news/smart-grid-technology',
  },
];

async function getNewsData(): Promise<NewsItem[]> {
  try {
    const response = await get('news-data.json', { access: 'public' });

    if (response && response.stream) {
      const reader = response.stream.getReader();
      const chunks: Uint8Array[] = [];

      let done = false;
      while (!done) {
        const { done: streamDone, value } = await reader.read();
        done = streamDone;
        if (value) chunks.push(value);
      }

      const buffer = Buffer.concat(chunks.map(chunk => Buffer.from(chunk)));
      const text = buffer.toString('utf-8');
      const data = JSON.parse(text);

      if (data.news && Array.isArray(data.news) && data.news.length > 0) {
        console.log('[Insights] Loaded news from blob storage');
        return data.news;
      }
    }
  } catch (error) {
    console.log('[Insights] Blob storage not available or empty, using fallback data');
  }

  return fallbackNewsData;
}

export async function GET(request: NextRequest) {
  try {
    const newsData = await getNewsData();
    return NextResponse.json({ news: newsData }, { status: 200 });
  } catch (error) {
    console.error('[Insights API Error]', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', news: fallbackNewsData },
      { status: 200 }
    );
  }
}
