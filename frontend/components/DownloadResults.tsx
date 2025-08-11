import React from 'react';
import { Download, Image, Video, Music, File, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgressiveImage from './ProgressiveImage';

interface DownloadResultsProps {
  results: any;
  downloaderId: string;
}

const DownloadResults = React.memo<DownloadResultsProps>(({ results, downloaderId }) => {
  if (!results) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        Tidak ada hasil untuk ditampilkan.
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
    
    const Icon = icons[type];
    const displayName = index !== undefined ? `${filename} ${index + 1}` : filename;

    return (
      <Button
        key={`${url}-${index}`}
        asChild
        size="sm"
        className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white shadow-sm hover:shadow-md transition-all duration-200 mb-2 mr-2"
      >
        <a href={url} target="_blank" rel="noopener noreferrer" download={filename}>
          <Icon className="w-3 h-3 mr-2" />
          {displayName}
          <ExternalLink className="w-3 h-3 ml-2" />
        </a>
      </Button>
    );
  };

  const renderThumbnail = (src: string, alt: string) => (
    <ProgressiveImage 
      src={src} 
      alt={alt} 
      className="w-full max-w-sm mx-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 mb-3"
    />
  );

  const renderTitle = (title: string) => (
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">{title}</h3>
  );

  const renderMetadata = (label: string, value: string) => (
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
      <span className="font-medium">{label}:</span> {value}
    </p>
  );

  // Handle TikTok with new API structure
  if (downloaderId.includes('tiktok')) {
    if (downloaderId.includes('slide')) {
      if (results.result?.images) {
        return (
          <div className="space-y-3">
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
          <div className="space-y-3">
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
        <div className="space-y-3">
          {results.message.map((item: any, index: number) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-b-0">
              {item.thumbnail && renderThumbnail(item.thumbnail, `Instagram Media ${index + 1}`)}
              {item._url && (
                <div className="text-center">
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
        <div className="space-y-3">
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
        <div className="space-y-3 text-center">
          {filename && renderTitle(filename)}
          {filesizeH && renderMetadata('Ukuran File', filesizeH)}
          {renderDownloadLink(url, filename || 'mediafire_file', 'file')}
        </div>
      );
    }
  }

  if (downloaderId.includes('spotify')) {
    if (results.result?.data) {
      const { title, artist, duration, thumbnail, url } = results.result.data;
      return (
        <div className="space-y-3">
          {title && renderTitle(title)}
          {artist?.name && renderMetadata('Artis', artist.name)}
          {duration && renderMetadata('Durasi', duration)}
          {thumbnail && renderThumbnail(thumbnail, 'Album Cover')}
          <div className="text-center">
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
        <div className="space-y-3">
          {text && renderTitle(text)}
          {user_name && renderMetadata('Oleh', `${user_name} (@${user_screen_name})`)}
          <div className="flex flex-wrap justify-center">
            {media_extended.map((item: any, index: number) => {
              if (item.thumbnail_url) {
                return (
                  <div key={index} className="w-full mb-3">
                    {renderThumbnail(item.thumbnail_url, `Twitter Media ${index + 1}`)}
                    {renderDownloadLink(
                      item.url,
                      `twitter_${item.type}_${index + 1}.${item.type === 'video' ? 'mp4' : 'jpg'}`,
                      item.type === 'video' ? 'video' : 'image',
                      index
                    )}
                  </div>
                );
              }
              return renderDownloadLink(
                item.url,
                `twitter_${item.type}_${index + 1}.${item.type === 'video' ? 'mp4' : 'jpg'}`,
                item.type === 'video' ? 'video' : 'image',
                index
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
          <div className="space-y-3">
            {videoItem.thumbnail && renderThumbnail(videoItem.thumbnail, 'Facebook Video')}
            <div className="text-center">
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
        <div className="space-y-3">
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
        <div className="space-y-3">
          {pin.title && renderTitle(pin.title)}
          {pin.image && renderThumbnail(pin.image, 'Pinterest Media')}
          <div className="text-center">
            {downloadUrl && renderDownloadLink(downloadUrl, filename, type)}
          </div>
        </div>
      );
    }
  }

  if (downloaderId.includes('terabox')) {
    if (results.result && Array.isArray(results.result)) {
      return (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">File Ditemukan:</h3>
          {results.result.map((item: any, index: number) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
              {item.files?.map((file: any, fileIndex: number) => (
                <div key={fileIndex} className="mb-3 last:mb-0">
                  <h4 className="font-medium text-base mb-1 text-gray-900 dark:text-white">{file.filename || item.name}</h4>
                  {file.size && renderMetadata('Ukuran', `${(parseInt(file.size) / (1024*1024)).toFixed(2)} MB`)}
                  <div className="mt-2">
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
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        <File className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
        <p>API Sfilemobi tidak menyediakan tautan langsung saat ini.</p>
      </div>
    );
  }

  // Fallback for unknown result structure
  return (
    <div className="text-center py-6 text-gray-500 dark:text-gray-400">
      <File className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
      <p>Tidak ada tautan unduhan valid ditemukan.</p>
      <details className="mt-3 text-left">
        <summary className="cursor-pointer text-sm text-gray-400 dark:text-gray-500">Debug Info</summary>
        <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto">
          {JSON.stringify(results, null, 2)}
        </pre>
      </details>
    </div>
  );
});

DownloadResults.displayName = 'DownloadResults';

export default DownloadResults;
