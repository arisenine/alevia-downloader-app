import { Platform } from '../components/AppInner';

export const platformData: Platform[] = [
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    icon: 'fab fa-tiktok', 
    color: 'text-pink-500',
    description: 'Video, slide, musik dari TikTok', 
    downloaders: [
      { id: 'tiktok-video', name: 'Video TikTok', apiPath: 'tiktok', inputPlaceholder: 'URL Video TikTok', instructions: 'Salin & tempel URL video TikTok.' },
      { id: 'tiktok-slide', name: 'Slide Foto TikTok', apiPath: 'ttslide', inputPlaceholder: 'URL Slide TikTok', instructions: 'Salin & tempel URL slide foto TikTok.' }
    ]
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: 'fab fa-instagram', 
    color: 'text-purple-500',
    description: 'Postingan, story, dan reels Instagram', 
    downloaders: [
      { id: 'instagram-post', name: 'Postingan', apiPath: 'igdowloader', inputPlaceholder: 'URL Postingan Instagram', instructions: 'Salin & tempel URL postingan Instagram.' },
      { id: 'instagram-story', name: 'Story', apiPath: 'igdowloader', inputPlaceholder: 'URL Story Instagram', instructions: 'Salin & tempel URL story Instagram (profil publik).' },
      { id: 'instagram-reels', name: 'Reels', apiPath: 'igdowloader', inputPlaceholder: 'URL Reel Instagram', instructions: 'Salin & tempel URL reel Instagram.' }
    ]
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: 'fab fa-youtube', 
    color: 'text-red-500',
    description: 'Video MP4 dan audio MP3 dari YouTube', 
    downloaders: [
      { id: 'youtube-mp4', name: 'Video (MP4)', apiPath: 'ytmp4', inputPlaceholder: 'URL Video YouTube', instructions: 'Salin & tempel URL video YouTube untuk MP4.' },
      { id: 'youtube-mp3', name: 'Audio (MP3)', apiPath: 'ytmp3', inputPlaceholder: 'URL Video YouTube', instructions: 'Salin & tempel URL video YouTube untuk MP3.' },
      { id: 'youtube-mp4-backup', name: 'Video (MP4 Cadangan)', apiPath: 'yt', inputPlaceholder: 'URL Video YouTube', instructions: 'Alternatif unduh video YouTube ke MP4.' },
      { id: 'youtube-mp3-backup', name: 'Audio (MP3 Cadangan)', apiPath: 'yt', inputPlaceholder: 'URL Video YouTube', instructions: 'Alternatif konversi YouTube ke MP3.' }
    ]
  },
  { 
    id: 'filehosting', 
    name: 'File Hosting', 
    icon: 'fas fa-folder-open', 
    color: 'text-blue-500',
    description: 'Mediafire, Sfilemobi, Terabox', 
    downloaders: [
      { id: 'mediafire', name: 'Mediafire', apiPath: 'mediafire', inputPlaceholder: 'URL Mediafire', instructions: 'Salin & tempel URL file Mediafire.' },
      { id: 'sfilemobi', name: 'Sfilemobi', apiPath: 'sfilemobi', inputPlaceholder: 'URL Sfilemobi', instructions: 'Salin & tempel URL Sfilemobi.' },
      { id: 'terabox', name: 'Terabox', apiPath: 'terabox', inputPlaceholder: 'URL Berbagi Terabox', instructions: 'Salin & tempel URL berbagi Terabox.' }
    ]
  },
  { 
    id: 'socialmusic', 
    name: 'Sosial & Musik', 
    icon: 'fas fa-share-alt', 
    color: 'text-green-500',
    description: 'Twitter, Facebook, Threads, Pinterest, Spotify', 
    downloaders: [
      { id: 'twitter', name: 'Twitter (X)', apiPath: 'twitter2', inputPlaceholder: 'URL Tweet (X)', instructions: 'Salin & tempel URL tweet dari Twitter (X).' },
      { id: 'facebook', name: 'Facebook', apiPath: 'fbdown', inputPlaceholder: 'URL Video Facebook', instructions: 'Salin & tempel URL video Facebook.' },
      { id: 'threads', name: 'Threads', apiPath: 'threads', inputPlaceholder: 'URL Postingan Threads', instructions: 'Salin & tempel URL postingan Threads.' },
      { id: 'pinterest', name: 'Pinterest', apiPath: 'pinterest', inputPlaceholder: 'URL Pin Pinterest', instructions: 'Salin & tempel URL pin Pinterest.' },
      { id: 'spotify', name: 'Spotify', apiPath: 'spotify', inputPlaceholder: 'URL Trek Spotify', instructions: 'Salin & tempel URL trek Spotify.' }
    ]
  }
];
