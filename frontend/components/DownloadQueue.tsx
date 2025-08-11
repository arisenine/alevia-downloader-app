import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Clock, Play, Pause, X, ArrowUp, ArrowDown, RotateCcw, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDownloadQueue, updateQueueItem, removeFromQueue, clearQueue, QueueItem } from '../utils/downloadQueue';
import { formatBytes, formatDuration } from '../utils/formatters';
import { useQuery, useMutation } from '@tanstack/react-query';
import backend from '~backend/client';

interface DownloadQueueProps {
  onClose: () => void;
}

const DownloadQueue = React.memo<DownloadQueueProps>(({ onClose }) => {
  const [filter, setFilter] = useState<string>('all');
  const [queue, setQueue] = useState<QueueItem[]>([]);

  // Load queue from storage
  useEffect(() => {
    setQueue(getDownloadQueue());
  }, []);

  // Poll for progress updates
  const { data: progressUpdates } = useQuery({
    queryKey: ['queue-progress'],
    queryFn: async () => {
      const activeItems = queue.filter(item => 
        item.status === 'processing' || item.status === 'queued'
      );
      
      const progressPromises = activeItems.map(async (item) => {
        try {
          const response = await backend.downloader.getProgress({ downloadId: item.downloadId });
          return { downloadId: item.downloadId, progress: response };
        } catch (error) {
          return { downloadId: item.downloadId, progress: null };
        }
      });
      
      return Promise.all(progressPromises);
    },
    refetchInterval: 1000,
    enabled: queue.some(item => item.status === 'processing' || item.status === 'queued')
  });

  // Update queue items with progress
  useEffect(() => {
    if (progressUpdates) {
      progressUpdates.forEach(({ downloadId, progress }) => {
        if (progress) {
          updateQueueItem(downloadId, {
            status: progress.status,
            progress: progress.progress,
            bytesDownloaded: progress.bytesDownloaded,
            speed: progress.speed,
            timeRemaining: progress.timeRemaining,
            error: progress.error
          });
        }
      });
      setQueue(getDownloadQueue());
    }
  }, [progressUpdates]);

  const cancelMutation = useMutation({
    mutationFn: async (downloadId: string) => {
      return backend.downloader.cancelDownload({ downloadId });
    },
    onSuccess: (data, downloadId) => {
      if (data.success) {
        updateQueueItem(downloadId, { status: 'cancelled' });
        setQueue(getDownloadQueue());
      }
    }
  });

  const filteredQueue = useMemo(() => {
    return queue.filter(item => {
      if (filter === 'all') return true;
      return item.status === filter;
    });
  }, [queue, filter]);

  const stats = useMemo(() => ({
    total: queue.length,
    queued: queue.filter(q => q.status === 'queued').length,
    processing: queue.filter(q => q.status === 'processing').length,
    completed: queue.filter(q => q.status === 'completed').length,
    failed: queue.filter(q => q.status === 'failed').length,
    cancelled: queue.filter(q => q.status === 'cancelled').length
  }), [queue]);

  const handlePriorityChange = useCallback((downloadId: string, priority: 'low' | 'normal' | 'high') => {
    updateQueueItem(downloadId, { priority });
    setQueue(getDownloadQueue());
  }, []);

  const handleRemoveItem = useCallback((downloadId: string) => {
    removeFromQueue(downloadId);
    setQueue(getDownloadQueue());
  }, []);

  const handleClearCompleted = useCallback(() => {
    const completedIds = queue
      .filter(item => item.status === 'completed' || item.status === 'failed' || item.status === 'cancelled')
      .map(item => item.downloadId);
    
    completedIds.forEach(id => removeFromQueue(id));
    setQueue(getDownloadQueue());
  }, [queue]);

  const handleCancelDownload = useCallback((downloadId: string) => {
    cancelMutation.mutate(downloadId);
  }, [cancelMutation]);

  const getStatusIcon = useCallback((status: QueueItem['status']) => {
    switch (status) {
      case 'queued':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'cancelled':
        return <X className="w-5 h-5 text-gray-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  }, []);

  const getPriorityColor = useCallback((priority: QueueItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'normal':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Download Queue
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your download queue and priorities
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="w-10 h-10 p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-8 space-y-6">
          {/* Stats and Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 border border-yellow-200 dark:border-yellow-700">
                <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{stats.total}</div>
                <div className="text-xs text-yellow-700 dark:text-yellow-300">Total</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-200 dark:border-blue-700">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.queued}</div>
                <div className="text-xs text-blue-700 dark:text-blue-300">Queued</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 border border-purple-200 dark:border-purple-700">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.processing}</div>
                <div className="text-xs text-purple-700 dark:text-purple-300">Processing</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-200 dark:border-green-700">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
                <div className="text-xs text-green-700 dark:text-green-300">Completed</div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 border border-red-200 dark:border-red-700">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">{stats.failed}</div>
                <div className="text-xs text-red-700 dark:text-red-300">Failed</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/20 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
                <div className="text-lg font-bold text-gray-600 dark:text-gray-400">{stats.cancelled}</div>
                <div className="text-xs text-gray-700 dark:text-gray-300">Cancelled</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40 h-10 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="queued">Queued</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                onClick={handleClearCompleted}
                variant="outline"
                size="sm"
                className="border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl"
              >
                Clear Completed
              </Button>
            </div>
          </div>

          {/* Queue List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredQueue.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl font-medium mb-2">No downloads in queue</p>
                <p className="text-sm">Start downloading to see items here</p>
              </div>
            ) : (
              filteredQueue.map((item) => (
                <div 
                  key={item.downloadId}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    {getStatusIcon(item.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="text-base font-semibold text-gray-900 dark:text-white truncate">
                          {item.title || item.url}
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {item.platform} • {item.downloader}
                      </div>
                      
                      {item.status === 'processing' && (
                        <div className="space-y-2">
                          <Progress value={item.progress || 0} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{item.progress || 0}%</span>
                            <div className="flex space-x-4">
                              {item.speed && <span>{formatBytes(item.speed)}/s</span>}
                              {item.timeRemaining && <span>{formatDuration(item.timeRemaining)} left</span>}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {item.error && (
                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                          {item.error}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.status === 'queued' && (
                      <Select 
                        value={item.priority} 
                        onValueChange={(value: 'low' | 'normal' | 'high') => handlePriorityChange(item.downloadId, value)}
                      >
                        <SelectTrigger className="w-20 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    
                    {(item.status === 'processing' || item.status === 'queued') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancelDownload(item.downloadId)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 w-8 h-8 p-0 rounded-xl"
                        title="Cancel Download"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.downloadId)}
                      className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 w-8 h-8 p-0 rounded-xl"
                      title="Remove from Queue"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={() => clearQueue()}
              disabled={queue.length === 0}
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
            >
              Clear All
            </Button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredQueue.length} of {queue.length} items
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

DownloadQueue.displayName = 'DownloadQueue';

export default DownloadQueue;
