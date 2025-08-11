import { Platform } from '../components/AppInner';

// Memoized platform data to prevent unnecessary re-renders
export const platformData: Platform[] = Object.freeze([
  Object.freeze({ 
    id: 'tiktok', 
    name: 'TikTok', 
    icon: 'fab fa-tiktok', 
    color: 'text-pink-500',
    description: 'Video, slide, musik dari TikTok', 
    downloaders: Object.freeze([
      Object.freeze({ id: 'tiktok-video', name: 'Video TikTok', apiPath: 'tiktok', inputPlaceholder: 'https://www.tiktok.com/@username/video/...', instructions: 'Salin & tempel URL video TikTok untuk mengunduh tanpa watermark.' }),
      Object.freeze({ id: 'tiktok-slide', name: 'Slide Foto TikTok', apiPath: 'ttslide', inputPlaceholder: 'https://www.tiktok.com/@username/video/...', instructions: 'Salin & tempel URL slide foto TikTok untuk mengunduh semua gambar.' })
    ])
  }),
  Object.freeze({ 
    id: 'instagram', 
    name: 'Instagram', 
    icon: 'fab fa-instagram', 
    color: 'text-purple-500',
    description: 'Postingan, story, dan reels Instagram', 
    downloaders: Object.freeze([
      Object.freeze({ id: 'instagram-post', name: 'Postingan', apiPath: 'igdowloader', inputPlaceholder: 'https://www.instagram.com/p/...', instructions: 'Salin & tempel URL postingan Instagram untuk mengunduh foto/video.' }),
      Object.freeze({ id: 'instagram-story', name: 'Story', apiPath: 'igdowloader', inputPlaceholder: 'https://www.instagram.com/stories/...', instructions: 'Salin & tempel URL story Instagram (profil publik saja).' }),
      Object.freeze({ id: 'instagram-reels', name: 'Reels', apiPath: 'igdowloader', inputPlaceholder: 'https://www.instagram.com/reel/...', instructions: 'Salin & tempel URL reel Instagram untuk mengunduh video.' })
    ])
  }),
  Object.freeze({ 
    id: 'youtube', 
    name: 'YouTube', 
    icon: 'fab fa-youtube', 
    color: 'text-red-500',
    description: 'Video MP4 dan audio MP3 dari YouTube', 
    downloaders: Object.freeze([
      Object.freeze({ id: 'youtube-mp4', name: 'Video (MP4)', apiPath: 'ytmp4', inputPlaceholder: 'https://www.youtube.com/watch?v=...', instructions: 'Salin & tempel URL video YouTube untuk mengunduh dalam format MP4.' }),
      Object.freeze({ id: 'youtube-mp3', name: 'Audio (MP3)', apiPath: 'ytmp3', inputPlaceholder: 'https://www.youtube.com/watch?v=...', instructions: 'Salin & tempel URL video YouTube untuk mengunduh audio dalam format MP3.' }),
      Object.freeze({ id: 'youtube-mp4-backup', name: 'Video (MP4 Cadangan)', apiPath: 'yt', inputPlaceholder: 'https://www.youtube.com/watch?v=...', instructions: 'Alternatif unduh video YouTube ke MP4 jika server utama bermasalah.' }),
      Object.freeze({ id: 'youtube-mp3-backup', name: 'Audio (MP3 Cadangan)', apiPath: 'yt', inputPlaceholder: 'https://www.youtube.com/watch?v=...', instructions: 'Alternatif konversi YouTube ke MP3 jika server utama bermasalah.' })
    ])
  }),
  Object.freeze({ 
    id: 'filehosting', 
    name: 'File Hosting', 
    icon: 'fas fa-cloud-download-alt', 
    color: 'text-blue-500',
    description: 'Mediafire, Sfilemobi, Terabox', 
    downloaders: Object.freeze([
      Object.freeze({ id: 'mediafire', name: 'Mediafire', apiPath: 'mediafire', inputPlaceholder: 'https://www.mediafire.com/file/...', instructions: 'Salin & tempel URL file Mediafire untuk mengunduh langsung.' }),
      Object.freeze({ id: 'sfilemobi', name: 'Sfilemobi', apiPath: 'sfilemobi', inputPlaceholder: 'https://sfilemobi.com/...', instructions: 'Salin & tempel URL Sfilemobi untuk bypass dan unduh.' }),
      Object.freeze({ id: 'terabox', name: 'Terabox', apiPath: 'terabox', inputPlaceholder: 'https://terabox.com/s/...', instructions: 'Salin & tempel URL berbagi Terabox untuk mengunduh file.' })
    ])
  }),
  Object.freeze({ 
    id: 'socialmusic', 
    name: 'Sosial & Musik', 
    icon: 'fas fa-music', 
    color: 'text-green-500',
    description: 'Twitter, Facebook, Threads, Pinterest, Spotify', 
    downloaders: Object.freeze([
      Object.freeze({ id: 'twitter', name: 'Twitter (X)', apiPath: 'twitter2', inputPlaceholder: 'https://twitter.com/username/status/...', instructions: 'Salin & tempel URL tweet dari Twitter (X) untuk mengunduh media.' }),
      Object.freeze({ id: 'facebook', name: 'Facebook', apiPath: 'fbdown', inputPlaceholder: 'https://www.facebook.com/watch?v=...', instructions: 'Salin & tempel URL video Facebook untuk mengunduh dalam kualitas HD.' }),
      Object.freeze({ id: 'threads', name: 'Threads', apiPath: 'threads', inputPlaceholder: 'https://www.threads.net/@username/post/...', instructions: 'Salin & tempel URL postingan Threads untuk mengunduh media.' }),
      Object.freeze({ id: 'pinterest', name: 'Pinterest', apiPath: 'pinterest', inputPlaceholder: 'https://www.pinterest.com/pin/...', instructions: 'Salin & tempel URL pin Pinterest untuk mengunduh gambar/video.' }),
      Object.freeze({ id: 'spotify', name: 'Spotify', apiPath: 'spotify', inputPlaceholder: 'https://open.spotify.com/track/...', instructions: 'Salin & tempel URL trek Spotify untuk mengunduh audio.' })
    ])
  })
]);

// Helper functions for platform data
export const getPlatformById = (id: string): Platform | undefined => {
  return platformData.find(platform => platform.id === id);
};

export const getDownloaderById = (platformId: string, downloaderId: string) => {
  const platform = getPlatformById(platformId);
  return platform?.downloaders.find(downloader => downloader.id === downloaderId);
};

export const getAllDownloaders = () => {
  return platformData.flatMap(platform => 
    platform.downloaders.map(downloader => ({
      ...downloader,
      platformId: platform.id,
      platformName: platform.name,
      platformIcon: platform.icon
    }))
  );
};

export const searchPlatforms = (query: string): Platform[] => {
  const lowercaseQuery = query.toLowerCase();
  return platformData.filter(platform => 
    platform.name.toLowerCase().includes(lowercaseQuery) ||
    platform.description.toLowerCase().includes(lowercaseQuery) ||
    platform.downloaders.some(downloader => 
      downloader.name.toLowerCase().includes(lowercaseQuery)
    )
  );
};
