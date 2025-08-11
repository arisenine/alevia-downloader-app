import React, { useState, useMemo } from 'react';
import { History, Trash2, Star, StarOff, ExternalLink, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDownloadHistory, clearDownloadHistory, toggleFavoritePlatform, getUserPreferences } from '../utils/storage';
import { HistoryItemSkeleton } from './SkeletonLoader';
import { platformData } from '../data/platforms';

interface DownloadHistoryProps {
  onClose: () => void;
}

export default function DownloadHistory({ onClose }: DownloadHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const history = getDownloadHistory();
  const preferences = getUserPreferences();

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

  const handleClearHistory = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
    clearDownloadHistory();
    setIsLoading(false);
  };

  const handleToggleFavorite = (platformId: string) => {
    toggleFavoritePlatform(platformId);
  };

  const getPlatformIcon = (platformId: string) => {
    const platform = platformData.find(p => p.id === platformId);
    return platform?.icon || 'fas fa-globe';
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <History className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Riwayat Download
            </h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Cari URL atau judul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-full sm:w-40">
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
              <SelectTrigger className="w-full sm:w-32">
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {history.length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                {history.filter(h => h.success).length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Berhasil</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                {history.filter(h => !h.success).length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Gagal</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {preferences.favoritePlatforms.length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Favorit</div>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <HistoryItemSkeleton key={i} />
              ))
            ) : filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Tidak ada riwayat download ditemukan</p>
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      item.success 
                        ? 'bg-green-100 dark:bg-green-900/20' 
                        : 'bg-red-100 dark:bg-red-900/20'
                    }`}>
                      <i className={`${getPlatformIcon(item.platform)} text-sm ${
                        item.success 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.title || item.url}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(item.timestamp)}</span>
                        <span>•</span>
                        <span className="capitalize">{item.platform}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleFavorite(item.platform)}
                      className="text-gray-400 hover:text-yellow-500"
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
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={handleClearHistory}
              disabled={history.length === 0 || isLoading}
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus Semua
            </Button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Menampilkan {filteredHistory.length} dari {history.length} item
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
