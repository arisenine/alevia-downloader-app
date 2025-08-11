import React, { useState, useMemo, useCallback } from 'react';
import { History, Trash2, Star, StarOff, ExternalLink, Calendar, Filter, X, Download, Sparkles, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDownloadHistory, clearDownloadHistory, toggleFavoritePlatform, getUserPreferences, removeFromDownloadHistory } from '../utils/storage';
import { HistoryItemSkeleton } from './SkeletonLoader';
import { platformData } from '../data/platforms';
import { useMutation } from '@tanstack/react-query';
import backend from '~backend/client';
import { handleApiError, showErrorToast, showSuccessToast } from '../utils/errorHandler';

interface DownloadHistoryProps {
  onClose: () => void;
}

const DownloadHistory = React.memo<DownloadHistoryProps>(({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const history = getDownloadHistory();
  const preferences = getUserPreferences();

  const redownloadMutation = useMutation({
    mutationFn: async ({ url, platform, downloader }: { url: string; platform: string; downloader: string }) => {
      const response = await backend.downloader.download({
        url,
        platform,
        type: downloader.replace(`${platform}`, '').replace(/^-/, '') || 'default'
      });
      return response;
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        showSuccessToast("File berhasil diunduh ulang!");
      } else {
        const error = handleApiError({ message: data.message });
        showErrorToast(error);
      }
    },
    onError: (error) => {
      console.error('Redownload error:', error);
      const appError = handleApiError(error);
      showErrorToast(appError);
    }
  });

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const matchesSearch = item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.title?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesPlatform = filterPlatform === 'all' || item.platform === filterPlatform;
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'success' && item.success) ||
                           (filterStatus === 'failed' && !item.success);
      
      return matchesSearch && matchesPlatform && matchesStatus;
    });
  }, [history, searchTerm, filterPlatform, filterStatus]);

  const stats = useMemo(() => ({
    total: history.length,
    successful: history.filter(h => h.success).length,
    failed: history.filter(h => !h.success).length,
    favorites: preferences.favoritePlatforms.length
  }), [history, preferences.favoritePlatforms]);

  const handleClearHistory = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    clearDownloadHistory();
    setIsLoading(false);
    showSuccessToast("Riwayat berhasil dihapus");
  }, []);

  const handleToggleFavorite = useCallback((platformId: string) => {
    toggleFavoritePlatform(platformId);
  }, []);

  const handleRedownload = useCallback((item: any) => {
    redownloadMutation.mutate({
      url: item.url,
      platform: item.platform,
      downloader: item.downloader
    });
  }, [redownloadMutation]);

  const handleRemoveItem = useCallback((itemId: string) => {
    removeFromDownloadHistory(itemId);
    showSuccessToast("Item berhasil dihapus dari riwayat");
  }, []);

  const getPlatformIcon = useCallback((platformId: string) => {
    const platform = platformData.find(p => p.id === platformId);
    return platform?.icon || 'fas fa-globe';
  }, []);

  const formatDate = useCallback((timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const getStatusIcon = useCallback((success: boolean) => {
    return success ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-8 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Riwayat Download
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Kelola dan lihat riwayat download Anda
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="w-10 h-10 p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-8 space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari URL atau judul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-base"
              />
            </div>
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-full sm:w-48 h-12 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Platform</SelectItem>
                {platformData.map(platform => (
                  <SelectItem key={platform.id} value={platform.id}>
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40 h-12 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="success">Berhasil</SelectItem>
                <SelectItem value="failed">Gagal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 text-center border border-blue-200/50 dark:border-blue-700/50">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {stats.total}
              </div>
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Total</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 text-center border border-green-200/50 dark:border-green-700/50">
              <div className="text-2xl font-black text-green-600 dark:text-green-400">
                {stats.successful}
              </div>
              <div className="text-sm font-medium text-green-700 dark:text-green-300">Berhasil</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 text-center border border-red-200/50 dark:border-red-700/50">
              <div className="text-2xl font-black text-red-600 dark:text-red-400">
                {stats.failed}
              </div>
              <div className="text-sm font-medium text-red-700 dark:text-red-300">Gagal</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4 text-center border border-purple-200/50 dark:border-purple-700/50">
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
                {stats.favorites}
              </div>
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Favorit</div>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <HistoryItemSkeleton key={i} />
              ))
            ) : filteredHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl font-medium mb-2">Tidak ada riwayat download ditemukan</p>
                <p className="text-sm">Mulai download untuk melihat riwayat di sini</p>
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                      item.success 
                        ? 'bg-green-600 shadow-green-500/30' 
                        : 'bg-red-600 shadow-red-500/30'
                    }`}>
                      <i className={`${getPlatformIcon(item.platform)} text-lg text-white`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="text-base font-semibold text-gray-900 dark:text-white truncate">
                          {item.title || item.url}
                        </div>
                        {getStatusIcon(item.success)}
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.timestamp)}</span>
                        <span>•</span>
                        <span className="capitalize font-medium">{item.platform}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRedownload(item)}
                      disabled={redownloadMutation.isPending}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 w-10 h-10 p-0 rounded-xl"
                      title="Unduh Ulang"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleFavorite(item.platform)}
                      className="text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 w-10 h-10 p-0 rounded-xl"
                      title="Toggle Favorit"
                    >
                      {preferences.favoritePlatforms.includes(item.platform) ? (
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                      ) : (
                        <StarOff className="w-4 h-4" />
                      )}
                    </Button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      title="Buka URL"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 w-10 h-10 p-0 rounded-xl"
                      title="Hapus dari Riwayat"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <Button
              variant="outline"
              onClick={handleClearHistory}
              disabled={history.length === 0 || isLoading}
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl px-6 py-3 font-semibold"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus Semua
            </Button>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Menampilkan {filteredHistory.length} dari {history.length} item
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

DownloadHistory.displayName = 'DownloadHistory';

export default DownloadHistory;
