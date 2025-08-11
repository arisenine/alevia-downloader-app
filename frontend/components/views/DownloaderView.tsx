import React, { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, Download, Loader2, Users, AlertCircle, RefreshCw, Sparkles, CheckCircle, Copy, Clock } from 'lucide-react';
import { Platform, Downloader } from '../AppInner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import backend from '~backend/client';
import DownloadResults from '../DownloadResults';
import BatchDownloader from '../BatchDownloader';
import { validatePlatformUrl } from '../../utils/validation';
import { handleApiError, showErrorToast, showSuccessToast } from '../../utils/errorHandler';
import { addToDownloadHistory } from '../../utils/storage';
import { addToQueue } from '../../utils/downloadQueue';
import { ResultsSkeleton } from '../SkeletonLoader';

interface DownloaderViewProps {
  downloader: Downloader;
  platform: Platform;
  onBackToPlatforms: () => void;
}

const DownloaderView = React.memo<DownloaderViewProps>(({ downloader, platform, onBackToPlatforms }) => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<any>(null);
  const [showBatch, setShowBatch] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [currentDownloadId, setCurrentDownloadId] = useState<string | null>(null);
  const { toast } = useToast();

  const downloadMutation = useMutation({
    mutationFn: async (downloadUrl: string) => {
      const response = await backend.downloader.download({
        url: downloadUrl,
        platform: platform.id,
        type: downloader.id.replace(`${platform.id}`, '').replace(/^-/, '') || 'default',
        priority: 'normal'
      });
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        setResults(data.data);
        setCurrentDownloadId(data.downloadId || null);
        
        // Add to queue for tracking
        if (data.downloadId) {
          addToQueue({
            downloadId: data.downloadId,
            url,
            platform: platform.id,
            downloader: downloader.id,
            title: data.data?.result?.title || data.data?.result?.filename,
            status: 'completed',
            priority: 'normal',
            progress: 100,
            estimatedSize: data.estimatedSize,
            quality: data.quality
          });
        }
        
        addToDownloadHistory({
          url,
          platform: platform.id,
          downloader: downloader.id,
          success: true,
          title: data.data?.result?.title || data.data?.result?.filename
        });
        showSuccessToast("Data berhasil diproses. Silakan unduh file yang tersedia.");
      } else {
        const error = handleApiError({ message: data.message });
        showErrorToast(error);
        
        if (data.downloadId) {
          addToQueue({
            downloadId: data.downloadId,
            url,
            platform: platform.id,
            downloader: downloader.id,
            status: 'failed',
            priority: 'normal',
            progress: 0,
            error: data.message
          });
        }
        
        addToDownloadHistory({
          url,
          platform: platform.id,
          downloader: downloader.id,
          success: false
        });
      }
    },
    onError: (error) => {
      console.error('Download error:', error);
      const appError = handleApiError(error);
      showErrorToast(appError);
      addToDownloadHistory({
        url,
        platform: platform.id,
        downloader: downloader.id,
        success: false
      });
    }
  });

  // Poll for download progress
  const { data: progressData } = useQuery({
    queryKey: ['download-progress', currentDownloadId],
    queryFn: async () => {
      if (!currentDownloadId) return null;
      try {
        return await backend.downloader.getProgress({ downloadId: currentDownloadId });
      } catch (error) {
        return null;
      }
    },
    refetchInterval: 1000,
    enabled: !!currentDownloadId && downloadMutation.isPending
  });

  const handleUrlChange = useCallback((value: string) => {
    setUrl(value);
    if (validationError) {
      setValidationError('');
    }
  }, [validationError]);

  const handleDownload = useCallback(() => {
    const validation = validatePlatformUrl(url.trim(), platform.id);
    
    if (!validation.isValid) {
      setValidationError(validation.error || 'URL tidak valid');
      return;
    }

    setValidationError('');
    setResults(null);
    setCurrentDownloadId(null);
    downloadMutation.mutate(url.trim());
  }, [url, platform.id, downloadMutation]);

  const handleRetry = useCallback(() => {
    if (url.trim()) {
      handleDownload();
    }
  }, [url, handleDownload]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !downloadMutation.isPending) {
      handleDownload();
    }
  }, [handleDownload, downloadMutation.isPending]);

  const handlePasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      if (validationError) {
        setValidationError('');
      }
      toast({
        description: "URL berhasil ditempel dari clipboard",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengakses clipboard",
        variant: "destructive",
      });
    }
  }, [validationError, toast]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToPlatforms}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowBatch(true)}
          className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:shadow-lg transition-all duration-300 rounded-xl"
        >
          <Users className="w-4 h-4 mr-2" />
          Batch Download
        </Button>
      </div>

      <div className="relative bg-white dark:bg-gray-800 rounded-3xl border border-yellow-200 dark:border-gray-700 shadow-2xl p-8 overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <i className={`${platform.icon} text-white text-3xl`}></i>
            </div>
            <div>
              <h2 className="text-4xl font-black mb-2 text-gray-900 dark:text-white">
                {downloader.name}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                {downloader.instructions}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-lg font-semibold text-gray-900 dark:text-white block">
                  Enter {platform.name} URL
                </label>
                
                <div className="relative">
                  <Input
                    type="url"
                    placeholder={downloader.inputPlaceholder}
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`h-16 text-lg bg-white dark:bg-gray-700 border-2 rounded-2xl pr-12 shadow-lg transition-all duration-300 ${
                      validationError 
                        ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-yellow-500 dark:focus:border-yellow-400'
                    }`}
                    disabled={downloadMutation.isPending}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePasteFromClipboard}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 p-0 rounded-xl hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all duration-300"
                    title="Paste from Clipboard"
                  >
                    <Copy className="w-4 h-4 text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400" />
                  </Button>
                </div>
                
                {validationError && (
                  <div className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-2xl">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <span className="text-red-700 dark:text-red-300 font-medium">{validationError}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={handleDownload}
                  disabled={downloadMutation.isPending || !url.trim() || !!validationError}
                  className="flex-1 h-16 text-lg font-bold bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                >
                  {downloadMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-3" />
                      Download Now
                    </>
                  )}
                </Button>
                
                {downloadMutation.isError && (
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    size="sm"
                    className="px-6 h-16 border-2 border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-2xl transition-all duration-300"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                )}
              </div>

              {/* Progress Bar */}
              {downloadMutation.isPending && progressData && (
                <div className="space-y-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                      Download Progress
                    </span>
                    <span className="text-sm text-yellow-600 dark:text-yellow-400">
                      {progressData.progress || 0}%
                    </span>
                  </div>
                  <Progress value={progressData.progress || 0} className="h-3" />
                  {progressData.timeRemaining && (
                    <div className="flex items-center space-x-2 text-xs text-yellow-600 dark:text-yellow-400">
                      <Clock className="w-4 h-4" />
                      <span>{Math.ceil(progressData.timeRemaining)} seconds remaining</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 p-6 min-h-[200px] shadow-lg">
              {downloadMutation.isPending ? (
                <ResultsSkeleton />
              ) : results ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Download processed successfully!</span>
                  </div>
                  <DownloadResults 
                    results={results} 
                    downloaderId={downloader.id}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <Sparkles className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                    Enter URL above and click "Download Now" to start
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                    Download process usually takes a few seconds
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pro Tip */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-700 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              <span className="text-lg font-bold text-yellow-900 dark:text-yellow-100">Tips & Tricks</span>
            </div>
            <ul className="text-yellow-700 dark:text-yellow-300 space-y-2 text-sm leading-relaxed">
              <li>• Make sure the URL you enter is publicly accessible</li>
              <li>• For private videos, ensure your account has access to view them</li>
              <li>• Use Batch Download feature to download multiple files at once</li>
              <li>• Downloaded file quality depends on the original quality from the platform</li>
            </ul>
          </div>
        </div>
      </div>

      {showBatch && (
        <BatchDownloader
          platform={platform.id}
          downloaderType={downloader.id.replace(`${platform.id}`, '').replace(/^-/, '') || 'default'}
          onClose={() => setShowBatch(false)}
        />
      )}
    </div>
  );
});

DownloaderView.displayName = 'DownloaderView';

export default DownloaderView;
