import { Platform } from '../components/AppInner';

export const platformData: Platform[] = [
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    icon: 'fab fa-tiktok', 
    color: 'text-pink-500',
    description: 'Video, slide, musik dari TikTok', 
    downloaders: [
      { id: 'tiktok-video', name: 'Video TikTok', apiPath: 'tiktok', inputPlaceholder: 'https://www.tiktok.com/@username/video/...', instructions: 'Salin & tempel URL video TikTok untuk mengunduh tanpa watermark.' },
      { id: 'tiktok-slide', name: 'Slide Foto TikTok', apiPath: 'ttslide', inputPlaceholder: 'https://www.tiktok.com/@username/video/...', instructions: 'Salin & tempel URL slide foto TikTok untuk mengunduh semua gambar.' }
    ]
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: 'fab fa-instagram', 
    color: 'text-purple-500',
    description: 'Postingan, story, dan reels Instagram', 
    downloaders: [
      { id: 'instagram-post', name: 'Postingan', apiPath: 'igdowloader', inputPlaceholder: 'https://www.instagram.com/p/...', instructions: 'Salin & tempel URL postingan Instagram untuk mengunduh foto/video.' },
      { id: 'instagram-story', name: 'Story', apiPath: 'igdowloader', inputPlaceholder: 'https://www.instagram.com/stories/...', instructions: 'Salin & tempel URL story Instagram (profil publik saja).' },
      { id: 'instagram-reels', name: 'Reels', apiPath: 'igdowloader', inputPlaceholder: 'https://www.instagram.com/reel/...', instructions: 'Salin & tempel URL reel Instagram untuk mengunduh video.' }
    ]
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: 'fab fa-youtube', 
    color: 'text-red-500',
    description: 'Video MP4 dan audio MP3 dari YouTube', 
    downloaders: [
      { id: 'youtube-mp4', name: 'Video (MP4)', apiPath: 'ytmp4', inputPlaceholder: 'https://www.youtube.com/watch?v=...', instructions: 'Salin & tempel URL video YouTube untuk mengunduh dalam format MP4.' },
      { id: 'youtube-mp3', name: 'Audio (MP3)', apiPath: 'ytmp3', inputPlaceholder: 'https://www.youtube.com/watch?v=...', instructions: 'Salin & tempel URL video YouTube untuk mengunduh audio dalam format MP3.' },
      { id: 'youtube-mp4-backup', name: 'Video (MP4 Cadangan)', apiPath: 'yt', inputPlaceholder: 'https://www.youtube.com/watch?v=...', instructions: 'Alternatif unduh video YouTube ke MP4 jika server utama bermasalah.' },
      { id: 'youtube-mp3-backup', name: 'Audio (MP3 Cadangan)', apiPath: 'yt', inputPlaceholder: 'https://www.youtube.com/watch?v=...', instructions: 'Alternatif konversi YouTube ke MP3 jika server utama bermasalah.' }
    ]
  },
  { 
    id: 'filehosting', 
    name: 'File Hosting', 
    icon: 'fas fa-cloud-download-alt', 
    color: 'text-blue-500',
    description: 'Mediafire, Sfilemobi, Terabox', 
    downloaders: [
      { id: 'mediafire', name: 'Mediafire', apiPath: 'mediafire', inputPlaceholder: 'https://www.mediafire.com/file/...', instructions: 'Salin & tempel URL file Mediafire untuk mengunduh langsung.' },
      { id: 'sfilemobi', name: 'Sfilemobi', apiPath: 'sfilemobi', inputPlaceholder: 'https://sfilemobi.com/...', instructions: 'Salin & tempel URL Sfilemobi untuk bypass dan unduh.' },
      { id: 'terabox', name: 'Terabox', apiPath: 'terabox', inputPlaceholder: 'https://terabox.com/s/...', instructions: 'Salin & tempel URL berbagi Terabox untuk mengunduh file.' }
    ]
  },
  { 
    id: 'socialmusic', 
    name: 'Sosial & Musik', 
    icon: 'fas fa-music', 
    color: 'text-green-500',
    description: 'Twitter, Facebook, Threads, Pinterest, Spotify', 
    downloaders: [
      { id: 'twitter', name: 'Twitter (X)', apiPath: 'twitter2', inputPlaceholder: 'https://twitter.com/username/status/...', instructions: 'Salin & tempel URL tweet dari Twitter (X) untuk mengunduh media.' },
      { id: 'facebook', name: 'Facebook', apiPath: 'fbdown', inputPlaceholder: 'https://www.facebook.com/watch?v=...', instructions: 'Salin & tempel URL video Facebook untuk mengunduh dalam kualitas HD.' },
      { id: 'threads', name: 'Threads', apiPath: 'threads', inputPlaceholder: 'https://www.threads.net/@username/post/...', instructions: 'Salin & tempel URL postingan Threads untuk mengunduh media.' },
      { id: 'pinterest', name: 'Pinterest', apiPath: 'pinterest', inputPlaceholder: 'https://www.pinterest.com/pin/...', instructions: 'Salin & tempel URL pin Pinterest untuk mengunduh gambar/video.' },
      { id: 'spotify', name: 'Spotify', apiPath: 'spotify', inputPlaceholder: 'https://open.spotify.com/track/...', instructions: 'Salin & tempel URL trek Spotify untuk mengunduh audio.' }
    ]
  }
];
