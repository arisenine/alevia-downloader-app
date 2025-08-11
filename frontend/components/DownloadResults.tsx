import React from 'react';
import { Download, Image, Video, Music, File, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgressiveImage from './ProgressiveImage';

interface DownloadResultsProps {
  results: any;
  downloaderId: string;
}

const DownloadResults = React.memo<DownloadResultsProps>(({ results, downloaderId }) => {
  if (!results) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
        <p className="text-lg font-medium">Tidak ada hasil untuk ditampilkan.</p>
      </div>
    );
  }

  const renderDownloadLink = (url: string, filename: string, type: 'video' | 'audio' | 'image' | 'file' = 'file', index?: number) => {
    const icons = {
      video: Video,
      audio: Music,
      image: Image,
      file: File
    };
    
    const colors = {
      video: 'from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-red-500/30 hover:shadow-red-500/40',
      audio: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-500/30 hover:shadow-green-500/40',
      image: 'from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/30 hover:shadow-blue-500/40',
      file: 'from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-purple-500/30 hover:shadow-purple-500/40'
    };
    
    const Icon = icons[type];
    const displayName = index !== undefined ? `${filename} ${index + 1}` : filename;

    return (
      <Button
        key={`${url}-${index}`}
        asChild
        className={`bg-gradient-to-r ${colors[type]} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-3 mr-3 rounded-2xl px-6 py-3 font-semibold`}
      >
        <a href={url} target="_blank" rel="noopener noreferrer" download={filename}>
          <Icon className="w-4 h-4 mr-2" />
          {displayName}
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </Button>
    );
  };

  const renderThumbnail = (src: string, alt: string) => (
    <div className="relative group">
      <ProgressiveImage 
        src={src} 
        alt={alt} 
        className="w-full max-w-md mx-auto rounded-2xl shadow-xl border-2 border-white/50 dark:border-gray-600/50 mb-4 group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  const renderTitle = (title: string) => (
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
      {title}
    </h3>
  );

  const renderMetadata = (label: string, value: string) => (
    <div className="flex items-center justify-center space-x-2 mb-3">
      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
        {label}:
      </span>
      <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}</span>
    </div>
  );

  // Handle TikTok with new API structure
  if (downloaderId.includes('tiktok')) {
    if (downloaderId.includes('slide')) {
      if (results.result?.images) {
        return (
          <div className="space-y-6 text-center">
            {results.result.title && renderTitle(results.result.title)}
            {results.result.author && renderMetadata('Author', results.result.author)}
            <div className="flex flex-wrap justify-center">
              {results.result.images.map((imageUrl: string, index: number) =>
                renderDownloadLink(imageUrl, `tiktok_slide_${index + 1}.jpg`, 'image', index)
              )}
              {results.result.audio && renderDownloadLink(results.result.audio, 'tiktok_audio.mp3', 'audio')}
            </div>
          </div>
        );
      }
    } else {
      if (results.result) {
        const { title, video, wm, audio, author } = results.result;
        return (
          <div className="space-y-6 text-center">
            {title && renderTitle(title)}
            {author && renderMetadata('Author', author)}
            <div className="flex flex-wrap justify-center">
              {video && renderDownloadLink(video, 'Video TikTok (No Watermark).mp4', 'video')}
              {wm && renderDownloadLink(wm, 'Video TikTok (Watermark).mp4', 'video')}
              {audio && renderDownloadLink(audio, 'Audio TikTok.mp3', 'audio')}
            </div>
          </div>
        );
      }
    }
  }

  if (downloaderId.includes('instagram')) {
    if (results.message && Array.isArray(results.message)) {
      return (
        <div className="space-y-6">
          {results.message.map((item: any, index: number) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-600 pb-6 last:border-b-0 text-center">
              {item.thumbnail && renderThumbnail(item.thumbnail, `Instagram Media ${index + 1}`)}
              {item._url && (
                <div className="flex justify-center">
                  {renderDownloadLink(
                    item._url,
                    item.filename || `instagram_media_${index + 1}.${item._url.includes('.mp4') ? 'mp4' : 'jpg'}`,
                    item._url.includes('.mp4') ? 'video' : 'image'
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
  }

  if (downloaderId.includes('youtube')) {
    if (results.result) {
      const { title, thumb, mp4, mp3 } = results.result;
      return (
        <div className="space-y-6 text-center">
          {title && renderTitle(title)}
          {thumb && renderThumbnail(thumb, 'YouTube Thumbnail')}
          <div className="flex flex-wrap justify-center">
            {mp4 && renderDownloadLink(mp4, `${title || 'youtube_video'}.mp4`, 'video')}
            {mp3 && renderDownloadLink(mp3, `${title || 'youtube_audio'}.mp3`, 'audio')}
          </div>
        </div>
      );
    }
  }

  if (downloaderId.includes('mediafire')) {
    if (results.result?.url) {
      const { filename, url, filesizeH } = results.result;
      return (
        <div className="space-y-6 text-center">
          {filename && renderTitle(filename)}
          {filesizeH && renderMetadata('Ukuran File', filesizeH)}
          <div className="flex justify-center">
            {renderDownloadLink(url, filename || 'mediafire_file', 'file')}
          </div>
        </div>
      );
    }
  }

  if (downloaderId.includes('spotify')) {
    if (results.result?.data) {
      const { title, artist, duration, thumbnail, url } = results.result.data;
      return (
        <div className="space-y-6 text-center">
          {title && renderTitle(title)}
          {artist?.name && renderMetadata('Artis', artist.name)}
          {duration && renderMetadata('Durasi', duration)}
          {thumbnail && renderThumbnail(thumbnail, 'Album Cover')}
          <div className="flex justify-center">
            {url && renderDownloadLink(url, `${title || 'spotify_track'}.mp3`, 'audio')}
          </div>
        </div>
      );
    }
  }

  if (downloaderId.includes('twitter')) {
    if (results.result?.media_extended) {
      const { text, user_name, user_screen_name, media_extended } = results.result;
      return (
        <div className="space-y-6 text-center">
          {text && renderTitle(text)}
          {user_name && renderMetadata('Oleh', `${user_name} (@${user_screen_name})`)}
          <div className="flex flex-wrap justify-center">
            {media_extended.map((item: any, index: number) => {
              if (item.thumbnail_url) {
                return (
                  <div key={index} className="w-full mb-6">
                    {renderThumbnail(item.thumbnail_url, `Twitter Media ${index + 1}`)}
                    <div className="flex justify-center">
                      {renderDownloadLink(
                        item.url,
                        `twitter_${item.type}_${index + 1}.${item.type === 'video' ? 'mp4' : 'jpg'}`,
                        item.type === 'video' ? 'video' : 'image',
                        index
                      )}
                    </div>
                  </div>
                );
              }
              return (
                <div key={index} className="flex justify-center">
                  {renderDownloadLink(
                    item.url,
                    `twitter_${item.type}_${index + 1}.${item.type === 'video' ? 'mp4' : 'jpg'}`,
                    item.type === 'video' ? 'video' : 'image',
                    index
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  if (downloaderId.includes('facebook')) {
    if (results.result && Array.isArray(results.result)) {
      const videoItem = results.result.find((item: any) => 
        item.resolution?.toLowerCase().includes('hd')
      ) || results.result[0];
      
      if (videoItem?._url) {
        return (
          <div className="space-y-6 text-center">
            {videoItem.thumbnail && renderThumbnail(videoItem.thumbnail, 'Facebook Video')}
            <div className="flex justify-center">
              {renderDownloadLink(
                videoItem._url,
                videoItem.filename || 'facebook_video.mp4',
                'video'
              )}
            </div>
          </div>
        );
      }
    }
  }

  if (downloaderId.includes('threads')) {
    if (results.result) {
      const { image_urls, video_urls } = results.result;
      return (
        <div className="space-y-6 text-center">
          <div className="flex flex-wrap justify-center">
            {image_urls?.map((url: string, index: number) =>
              renderDownloadLink(url, `threads_image_${index + 1}.jpg`, 'image', index)
            )}
            {video_urls?.map((url: string, index: number) =>
              renderDownloadLink(url, `threads_video_${index + 1}.mp4`, 'video', index)
            )}
          </div>
        </div>
      );
    }
  }

  if (downloaderId.includes('pinterest')) {
    if (results.result?.data) {
      const pin = results.result.data;
      let downloadUrl = '';
      let filename = (pin.title || 'pinterest_media').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      let type: 'video' | 'image' = 'image';

      if (pin.media_type === 'video' && pin.videos?.video_list) {
        const videoDetails = pin.videos.video_list.V_720P || 
                           pin.videos.video_list.V_480P || 
                           Object.values(pin.videos.video_list)[0] as any;
        if (videoDetails?.url) {
          downloadUrl = videoDetails.url;
          filename += '.mp4';
          type = 'video';
        }
      } else if (pin.image) {
        downloadUrl = pin.image;
        filename += '.jpg';
        type = 'image';
      }

      return (
        <div className="space-y-6 text-center">
          {pin.title && renderTitle(pin.title)}
          {pin.image && renderThumbnail(pin.image, 'Pinterest Media')}
          <div className="flex justify-center">
            {downloadUrl && renderDownloadLink(downloadUrl, filename, type)}
          </div>
        </div>
      );
    }
  }

  if (downloaderId.includes('terabox')) {
    if (results.result && Array.isArray(results.result)) {
      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            File Ditemukan:
          </h3>
          {results.result.map((item: any, index: number) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 shadow-lg">
              {item.files?.map((file: any, fileIndex: number) => (
                <div key={fileIndex} className="mb-4 last:mb-0 text-center">
                  <h4 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{file.filename || item.name}</h4>
                  {file.size && renderMetadata('Ukuran', `${(parseInt(file.size) / (1024*1024)).toFixed(2)} MB`)}
                  <div className="mt-4 flex justify-center">
                    {renderDownloadLink(file.url, file.filename || item.name, 'file')}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }
  }

  if (downloaderId.includes('sfilemobi')) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <File className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
        <p className="text-lg font-medium mb-2">API Sfilemobi tidak tersedia</p>
        <p className="text-sm">Silakan coba platform lain atau hubungi support.</p>
      </div>
    );
  }

  // Fallback for unknown result structure
  return (
    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
      <File className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
      <p className="text-lg font-medium mb-2">Tidak ada tautan unduhan valid ditemukan</p>
      <p className="text-sm mb-4">Silakan periksa URL atau coba lagi nanti.</p>
      <details className="mt-4 text-left max-w-md mx-auto">
        <summary className="cursor-pointer text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          Debug Info (untuk developer)
        </summary>
        <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded-xl overflow-auto border border-gray-200 dark:border-gray-700">
          {JSON.stringify(results, null, 2)}
        </pre>
      </details>
    </div>
  );
});

DownloadResults.displayName = 'DownloadResults';

export default DownloadResults;
