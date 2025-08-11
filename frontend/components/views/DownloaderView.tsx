import React, { useState, useCallback } from 'react';
import { ArrowLeft, Download, Loader2, Users, AlertCircle, RefreshCw, Sparkles, CheckCircle, Copy } from 'lucide-react';
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
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-300 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowBatch(true)}
          className="bg-blue-50 dark:bg-blue-900/20 border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:shadow-lg transition-all duration-300 rounded-xl"
        >
          <Users className="w-4 h-4 mr-2" />
          Batch Download
        </Button>
      </div>

      <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-black/10 p-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-slate-50/30 dark:bg-slate-900/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
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
                  Masukkan URL {platform.name}
                </label>
                
                <div className="relative">
                  <Input
                    type="url"
                    placeholder={downloader.inputPlaceholder}
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`h-16 text-lg bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 rounded-2xl pr-12 shadow-lg transition-all duration-300 ${
                      validationError 
                        ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-500 shadow-red-500/20' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 shadow-blue-500/10 focus:shadow-blue-500/20'
                    }`}
                    disabled={downloadMutation.isPending}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePasteFromClipboard}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 p-0 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300"
                    title="Tempel dari Clipboard"
                  >
                    <Copy className="w-4 h-4 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" />
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
                  className="flex-1 h-16 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                >
                  {downloadMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-3" />
                      Unduh Sekarang
                    </>
                  )}
                </Button>
                
                {downloadMutation.isError && (
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    size="sm"
                    className="px-6 h-16 border-2 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all duration-300"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50 p-6 min-h-[200px] shadow-lg">
              {downloadMutation.isPending ? (
                <ResultsSkeleton />
              ) : results ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Download berhasil diproses!</span>
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
                    Masukkan URL di atas dan klik "Unduh Sekarang" untuk memulai
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                    Proses download biasanya memakan waktu beberapa detik
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pro Tip */}
          <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200/50 dark:border-green-700/50 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
              <span className="text-lg font-bold text-green-900 dark:text-green-100">Tips & Tricks</span>
            </div>
            <ul className="text-green-700 dark:text-green-300 space-y-2 text-sm leading-relaxed">
              <li>• Pastikan URL yang Anda masukkan dapat diakses secara publik</li>
              <li>• Untuk video privat, pastikan akun Anda memiliki akses untuk melihatnya</li>
              <li>• Gunakan fitur Batch Download untuk mengunduh multiple file sekaligus</li>
              <li>• Kualitas file yang diunduh tergantung pada kualitas asli dari platform</li>
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
