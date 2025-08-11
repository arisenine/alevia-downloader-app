import React, { useState, useCallback } from 'react';
import { ArrowLeft, Download, Loader2, Users, AlertCircle, RefreshCw } from 'lucide-react';
import { Platform, Downloader } from '../AppInner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import backend from '~backend/client';
import DownloadResults from '../DownloadResults';
import BatchDownloader from '../BatchDownloader';
import { validatePlatformUrl } from '../../utils/validation';
import { handleApiError, showErrorToast, showSuccessToast } from '../../utils/errorHandler';
import { addToDownloadHistory } from '../../utils/storage';
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
  const { toast } = useToast();

  const downloadMutation = useMutation({
    mutationFn: async (downloadUrl: string) => {
      const response = await backend.downloader.download({
        url: downloadUrl,
        platform: platform.id,
        type: downloader.id.replace(`${platform.id}`, '').replace(/^-/, '') || 'default'
      });
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        setResults(data.data);
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToPlatforms}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowBatch(true)}
          className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
        >
          <Users className="w-4 h-4 mr-2" />
          Batch Download
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center">
            <i className={`${platform.icon} text-white text-xl`}></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{downloader.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{downloader.instructions}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <Input
                type="url"
                placeholder={downloader.inputPlaceholder}
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`h-12 text-base bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:bg-white dark:focus:bg-gray-600 ${
                  validationError ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-500' : 'focus:border-blue-300 dark:focus:border-blue-500'
                }`}
                disabled={downloadMutation.isPending}
              />
              
              {validationError && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={handleDownload}
                disabled={downloadMutation.isPending || !url.trim() || !!validationError}
                className="flex-1 h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
              >
                {downloadMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Unduh Sekarang
                  </>
                )}
              </Button>
              
              {downloadMutation.isError && (
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  size="sm"
                  className="px-3 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 min-h-[150px]">
            {downloadMutation.isPending ? (
              <ResultsSkeleton />
            ) : results ? (
              <DownloadResults 
                results={results} 
                downloaderId={downloader.id}
              />
            ) : (
              <div className="flex items-center justify-center h-24">
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                  Masukkan URL di atas dan klik "Unduh Sekarang" untuk memulai.
                </p>
              </div>
            )}
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
