import React, { useState, useCallback } from 'react';
import { Plus, X, Download, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
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
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const progress = batchItems.length > 0 ? (currentIndex / batchItems.length) * 100 : 0;
  const completedItems = batchItems.filter(item => item.status === 'completed').length;
  const failedItems = batchItems.filter(item => item.status === 'failed').length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Batch Download
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tambah URL (satu per baris)
            </label>
            <Textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="https://example.com/video1&#10;https://example.com/video2&#10;https://example.com/video3"
              className="min-h-[100px]"
              disabled={isProcessing}
            />
            <Button 
              onClick={handleAddUrls} 
              disabled={!urls.trim() || isProcessing}
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah ke Batch
            </Button>
          </div>

          {batchItems.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Items dalam Batch ({batchItems.length})
                </h4>
                {isProcessing && (
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {currentIndex + 1} / {batchItems.length}
                  </div>
                )}
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Progress: {Math.round(progress)}%</span>
                    <span>✓ {completedItems} | ✗ {failedItems}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {batchItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      item.status === 'processing' 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {getStatusIcon(item.status)}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.url}
                        </div>
                        {item.error && (
                          <div className="text-xs text-red-600 dark:text-red-400 mt-1">
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
                        className="text-red-600 hover:text-red-700"
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
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses Batch...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
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
