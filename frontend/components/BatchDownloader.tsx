import React, { useState, useCallback } from 'react';
import { Plus, X, Download, Loader2, CheckCircle, XCircle, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { validateBatchUrls } from '../utils/validation';
import { handleApiError, showErrorToast, showSuccessToast } from '../utils/errorHandler';
import { addToDownloadHistory } from '../utils/storage';
import backend from '~backend/client';

interface BatchItem {
  id: string;
  url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
}

interface BatchDownloaderProps {
  platform: string;
  downloaderType: string;
  onClose: () => void;
}

export default function BatchDownloader({ platform, downloaderType, onClose }: BatchDownloaderProps) {
  const [urls, setUrls] = useState<string>('');
  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddUrls = useCallback(() => {
    const urlList = urls.split('\n').filter(url => url.trim());
    const { validUrls, errors } = validateBatchUrls(urlList);

    if (errors.length > 0) {
      showErrorToast({
        code: 'VALIDATION_ERROR',
        message: `Ditemukan ${errors.length} URL yang tidak valid`,
        details: errors
      });
      return;
    }

    const newItems: BatchItem[] = validUrls.map(url => ({
      id: Date.now().toString() + Math.random(),
      url: url.trim(),
      status: 'pending'
    }));

    setBatchItems(prev => [...prev, ...newItems]);
    setUrls('');
  }, [urls]);

  const removeItem = useCallback((id: string) => {
    setBatchItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const processBatch = useCallback(async () => {
    if (batchItems.length === 0) return;

    setIsProcessing(true);
    setCurrentIndex(0);

    for (let i = 0; i < batchItems.length; i++) {
      const item = batchItems[i];
      setCurrentIndex(i);

      setBatchItems(prev => prev.map(prevItem => 
        prevItem.id === item.id 
          ? { ...prevItem, status: 'processing' }
          : prevItem
      ));

      try {
        const response = await backend.downloader.download({
          url: item.url,
          platform,
          type: downloaderType
        });

        setBatchItems(prev => prev.map(prevItem => 
          prevItem.id === item.id 
            ? { 
                ...prevItem, 
                status: response.success ? 'completed' : 'failed',
                result: response.data,
                error: response.success ? undefined : response.message
              }
            : prevItem
        ));

        addToDownloadHistory({
          url: item.url,
          platform,
          downloader: downloaderType,
          success: response.success,
          title: response.data?.result?.title || response.data?.result?.filename
        });

        // Add delay between requests to avoid rate limiting
        if (i < batchItems.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        const appError = handleApiError(error);
        setBatchItems(prev => prev.map(prevItem => 
          prevItem.id === item.id 
            ? { ...prevItem, status: 'failed', error: appError.message }
            : prevItem
        ));
      }
    }

    setIsProcessing(false);
    const completedCount = batchItems.filter(item => item.status === 'completed').length;
    showSuccessToast(`Batch selesai: ${completedCount}/${batchItems.length} berhasil`);
  }, [batchItems, platform, downloaderType]);

  const getStatusIcon = (status: BatchItem['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const progress = batchItems.length > 0 ? (currentIndex / batchItems.length) * 100 : 0;
  const completedItems = batchItems.filter(item => item.status === 'completed').length;
  const failedItems = batchItems.filter(item => item.status === 'failed').length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-8 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Batch Download
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Download multiple files at once
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="w-10 h-10 p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-4">
            <label className="text-lg font-semibold text-gray-900 dark:text-white block">
              Tambah URL (satu per baris)
            </label>
            <Textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="https://example.com/video1&#10;https://example.com/video2&#10;https://example.com/video3"
              className="min-h-[120px] bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-base"
              disabled={isProcessing}
            />
            <Button 
              onClick={handleAddUrls} 
              disabled={!urls.trim() || isProcessing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-6 py-3 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah ke Batch
            </Button>
          </div>

          {batchItems.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  Items dalam Batch ({batchItems.length})
                </h4>
                {isProcessing && (
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {currentIndex + 1} / {batchItems.length}
                  </div>
                )}
              </div>

              {isProcessing && (
                <div className="space-y-3">
                  <Progress value={progress} className="h-3 rounded-full" />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Progress: {Math.round(progress)}%</span>
                    <div className="flex space-x-4">
                      <span className="text-green-600 dark:text-green-400 font-medium">✓ {completedItems}</span>
                      <span className="text-red-600 dark:text-red-400 font-medium">✗ {failedItems}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {batchItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                      item.status === 'processing' 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700 shadow-lg shadow-blue-500/20'
                        : 'bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      {getStatusIcon(item.status)}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {item.url}
                        </div>
                        {item.error && (
                          <div className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
                            {item.error}
                          </div>
                        )}
                      </div>
                    </div>
                    {!isProcessing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 w-8 h-8 p-0 rounded-xl"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button
                onClick={processBatch}
                disabled={isProcessing || batchItems.length === 0}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Memproses Batch...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-3" />
                    Mulai Batch Download ({batchItems.length} items)
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
