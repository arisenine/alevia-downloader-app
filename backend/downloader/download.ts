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

    // Handle TikTok with custom API
    if (platform === 'tiktok') {
      try {
        const host = 'https://www.tikwm.com/';
        const response = await fetch(host + 'api/', {
          method: 'POST',
          headers: {
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
          },
          body: new URLSearchParams({
            url: url,
            count: '12',
            cursor: '0',
            web: '1',
            hd: '1'
          })
        });

        const data = await response.json();
        
        if (type === 'slide') {
          return {
            success: true,
            data: {
              status: true,
              result: {
                images: data.data.images,
                audio: host + data.data.music,
                author: data.data.author.nickname,
                title: data.data.title
              }
            }
          };
        } else {
          return {
            success: true,
            data: {
              status: true,
              result: {
                wm: host + data.data.wmplay,
                audio: host + data.data.music,
                video: host + data.data.play,
                author: data.data.author.nickname,
                title: data.data.title
              }
            }
          };
        }
      } catch (error) {
        console.error('TikTok API error:', error);
        return {
          success: false,
          data: null,
          message: error instanceof Error ? error.message : 'TikTok API error'
        };
      }
    }

    // Handle other platforms with existing API
    const API_KEY = "beta-arisenine";
    const BASE_API_URL = "https://api.betabotz.eu.org/api/download/";
    
    const apiPathMap: Record<string, string> = {
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
