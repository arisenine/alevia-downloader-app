import { api, APIError } from "encore.dev/api";

interface DownloadRequest {
  url: string;
  platform: string;
  type: string;
}

interface DownloadResponse {
  success: boolean;
  data: any;
  message?: string;
}

// Downloads content from various platforms
export const download = api<DownloadRequest, DownloadResponse>(
  { expose: true, method: "POST", path: "/download" },
  async (req) => {
    const { url, platform, type } = req;
    
    if (!url || !platform || !type) {
      throw APIError.invalidArgument("URL, platform, and type are required");
    }

    const API_KEY = "beta-arisenine";
    const BASE_API_URL = "https://api.betabotz.eu.org/api/download/";
    
    // Map platform and type to API path
    const apiPathMap: Record<string, string> = {
      'tiktok-video': 'tiktok',
      'tiktok-slide': 'ttslide',
      'instagram-post': 'igdowloader',
      'instagram-story': 'igdowloader',
      'instagram-reels': 'igdowloader',
      'youtube-mp4': 'ytmp4',
      'youtube-mp3': 'ytmp3',
      'youtube-mp4-backup': 'yt',
      'youtube-mp3-backup': 'yt',
      'mediafire': 'mediafire',
      'sfilemobi': 'sfilemobi',
      'terabox': 'terabox',
      'twitter': 'twitter2',
      'facebook': 'fbdown',
      'threads': 'threads',
      'pinterest': 'pinterest',
      'spotify': 'spotify'
    };

    const apiPath = apiPathMap[`${platform}-${type}`];
    if (!apiPath) {
      throw APIError.invalidArgument(`Unsupported platform-type combination: ${platform}-${type}`);
    }

    try {
      const apiUrl = `${BASE_API_URL}${apiPath}?url=${encodeURIComponent(url)}&apikey=${API_KEY}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Download error:', error);
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
);
