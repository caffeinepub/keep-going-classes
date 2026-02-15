import { useQuery } from '@tanstack/react-query';
import { YOUTUBE_CONFIG } from '../../config/youtube';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  link: string;
}

async function fetchYouTubeFeed(): Promise<YouTubeVideo[]> {
  try {
    const feedUrl = YOUTUBE_CONFIG.getFeedUrl();
    const response = await fetch(feedUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch YouTube feed');
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    const entries = xmlDoc.querySelectorAll('entry');
    const videos: YouTubeVideo[] = [];

    entries.forEach((entry) => {
      const videoId = entry.querySelector('videoId')?.textContent || '';
      const title = entry.querySelector('title')?.textContent || '';
      const published = entry.querySelector('published')?.textContent || '';
      const link = entry.querySelector('link')?.getAttribute('href') || '';
      
      if (videoId && title) {
        videos.push({
          id: videoId,
          title,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          publishedAt: published,
          link: link || `https://www.youtube.com/watch?v=${videoId}`,
        });
      }
    });

    return videos;
  } catch (error) {
    console.error('Error fetching YouTube feed:', error);
    throw error;
  }
}

export function useYouTubeChannelFeed() {
  return useQuery<YouTubeVideo[]>({
    queryKey: ['youtube-feed'],
    queryFn: fetchYouTubeFeed,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
}
