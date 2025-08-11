import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToPlatforms}
            className="glass-effect hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-xl smooth-transition rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBatch(true)}
            className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200/50 dark:border-yellow-700/50 text-yellow-700 dark:text-yellow-300 hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30 hover:shadow-xl smooth-transition rounded-xl glass-effect"
          >
            <Users className="w-4 h-4 mr-2" />
            Batch Download
          </Button>
        </motion.div>
      </div>

      <motion.div 
        className="relative card-enhanced p-8 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Background */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-red-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="relative z-10">
          <motion.div 
            className="flex items-center space-x-6 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl animate-float"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <i className={`${platform.icon} text-white text-3xl`}></i>
            </motion.div>
            <div>
              <motion.h2 
                className="text-4xl font-black mb-2 text-gradient-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {downloader.name}
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {downloader.instructions}
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="space-y-4">
              <div className="space-y-3">
                <motion.label 
                  className="text-lg font-semibold text-gray-900 dark:text-white block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1 }}
                >
                  Enter {platform.name} URL
                </motion.label>
                
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                >
                  <Input
                    type="url"
                    placeholder={downloader.inputPlaceholder}
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`input-enhanced h-16 text-lg pr-12 shadow-xl ${
                      validationError 
                        ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-500 animate-pulse-glow' 
                        : 'border-gray-200/50 dark:border-gray-600/50 focus:border-yellow-500 dark:focus:border-yellow-400'
                    }`}
                    disabled={downloadMutation.isPending}
                  />
                  <motion.div
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePasteFromClipboard}
                      className="w-10 h-10 p-0 rounded-xl glass-effect hover:bg-yellow-100/50 dark:hover:bg-yellow-900/30 smooth-transition"
                      title="Paste from Clipboard"
                    >
                      <Copy className="w-4 h-4 text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400 smooth-transition" />
                    </Button>
                  </motion.div>
                </motion.div>
                
                <AnimatePresence>
                  {validationError && (
                  <motion.div 
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200/50 dark:border-red-700/50 rounded-2xl glass-effect"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <span className="text-red-700 dark:text-red-300 font-medium">{validationError}</span>
                  </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.div 
                className="flex space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.4 }}
              >
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: downloadMutation.isPending || !url.trim() || !!validationError ? 1 : 1.02 }}
                  whileTap={{ scale: downloadMutation.isPending || !url.trim() || !!validationError ? 1 : 0.98 }}
                >
                  <Button
                    onClick={handleDownload}
                    disabled={downloadMutation.isPending || !url.trim() || !!validationError}
                    className="w-full h-16 text-lg font-bold btn-warning shadow-2xl hover:shadow-3xl disabled:hover:scale-100"
                  >
                    {downloadMutation.isPending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="w-5 h-5 mr-3" />
                        </motion.div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Download className="w-5 h-5 mr-3" />
                        </motion.div>
                        Download Now
                      </>
                    )}
                  </Button>
                </motion.div>
                
                <AnimatePresence>
                  {downloadMutation.isError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleRetry}
                      variant="outline"
                      size="sm"
                      className="px-6 h-16 border-2 border-yellow-200/50 dark:border-yellow-700/50 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/20 rounded-2xl smooth-transition glass-effect"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw className="w-5 h-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Progress Bar */}
              <AnimatePresence>
                {downloadMutation.isPending && progressData && (
                <motion.div 
                  className="space-y-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200/50 dark:border-yellow-700/50 glass-effect"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                      Download Progress
                    </span>
                    <motion.span 
                      className="text-sm text-yellow-600 dark:text-yellow-400 font-bold"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {progressData.progress || 0}%
                    </motion.span>
                  </div>
                  <Progress value={progressData.progress || 0} className="h-3" />
                  {progressData.timeRemaining && (
                    <div className="flex items-center space-x-2 text-xs text-yellow-600 dark:text-yellow-400">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock className="w-4 h-4" />
                      </motion.div>
                      <span>{Math.ceil(progressData.timeRemaining)} seconds remaining</span>
                    </div>
                  )}
                </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div 
              className="card-glass p-6 min-h-[200px] shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              {downloadMutation.isPending ? (
                <ResultsSkeleton />
              ) : results ? (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 font-semibold">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </motion.div>
                    <span>Download processed successfully!</span>
                  </div>
                  <DownloadResults 
                    results={results} 
                    downloaderId={downloader.id}
                  />
                </motion.div>
              ) : (
                <motion.div 
                  className="flex flex-col items-center justify-center h-32 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
                  </motion.div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                    Enter URL above and click "Download Now" to start
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                    Download process usually takes a few seconds
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Pro Tip */}
          <motion.div 
            className="mt-8 p-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 rounded-2xl border border-yellow-200/50 dark:border-yellow-700/50 shadow-xl glass-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </motion.div>
              <span className="text-lg font-bold text-yellow-900 dark:text-yellow-100">Tips & Tricks</span>
            </div>
            <ul className="text-yellow-700 dark:text-yellow-300 space-y-2 text-sm leading-relaxed">
              <li>• Make sure the URL you enter is publicly accessible</li>
              <li>• For private videos, ensure your account has access to view them</li>
              <li>• Use Batch Download feature to download multiple files at once</li>
              <li>• Downloaded file quality depends on the original quality from the platform</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showBatch && (
          <BatchDownloader
            platform={platform.id}
            downloaderType={downloader.id.replace(`${platform.id}`, '').replace(/^-/, '') || 'default'}
            onClose={() => setShowBatch(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

DownloaderView.displayName = 'DownloaderView';

export default DownloaderView;
