import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Home, Zap, Shield, Star, Sparkles, ArrowRight, Download, Clock } from 'lucide-react';
import { Platform, Downloader } from '../AppInner';
import { Button } from '@/components/ui/button';
import { DownloaderCardSkeleton } from '../SkeletonLoader';
import { getDownloadHistory } from '../../utils/storage';

interface PlatformListViewProps {
  platform: Platform;
  onDownloaderSelect: (downloader: Downloader) => void;
  onBackToHome: () => void;
}

const PlatformListView = React.memo<PlatformListViewProps>(({ platform, onDownloaderSelect, onBackToHome }) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = getDownloadHistory();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const downloaderStats = useMemo(() => {
    const stats: Record<string, { count: number; lastUsed: number }> = {};
    
    history
      .filter(item => item.platform === platform.id)
      .forEach(item => {
        if (!stats[item.downloader]) {
          stats[item.downloader] = { count: 0, lastUsed: 0 };
        }
        stats[item.downloader].count++;
        stats[item.downloader].lastUsed = Math.max(stats[item.downloader].lastUsed, item.timestamp);
      });
    
    return stats;
  }, [history, platform.id]);

  const features = [
    { icon: Zap, text: 'Lightning Fast', color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
    { icon: Shield, text: 'Secure & Safe', color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { icon: Star, text: 'Premium Quality', color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToHome}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-300 rounded-xl"
        >
          <Home className="w-4 h-4 mr-2" />
          Beranda
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
            <div className="flex-1">
              <h2 className="text-4xl font-black mb-2 text-gray-900 dark:text-white">
                {platform.name}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                Pilih jenis downloader yang diinginkan
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className={`flex items-center space-x-3 px-6 py-3 ${feature.bgColor} rounded-2xl border border-white/50 dark:border-gray-600/30 shadow-lg hover:scale-105 transition-all duration-300`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-gray-700 dark:text-gray-300 font-semibold">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              Array.from({ length: platform.downloaders.length }).map((_, i) => (
                <DownloaderCardSkeleton key={i} />
              ))
            ) : (
              platform.downloaders.map((downloader, index) => {
                const stats = downloaderStats[downloader.id];
                const isRecentlyUsed = stats && (Date.now() - stats.lastUsed) < (7 * 24 * 60 * 60 * 1000);
                
                return (
                  <div
                    key={downloader.id}
                    className="group cursor-pointer p-6 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-700 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
                    onClick={() => onDownloaderSelect(downloader)}
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/20 transition-all duration-300"></div>
                    
                    {/* Recently Used Badge */}
                    {isRecentlyUsed && (
                      <div className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                        <Clock className="w-3 h-3" />
                        <span>Recent</span>
                      </div>
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-300">
                          <i className={`${platform.icon} text-xl`}></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {downloader.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                            {downloader.instructions}
                          </p>
                          
                          {/* Usage Stats */}
                          {stats && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                              Digunakan {stats.count} kali
                            </div>
                          )}
                          
                          <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            <Download className="w-4 h-4 mr-2" />
                            <span>Pilih Downloader</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pro Tip */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-bold text-blue-900 dark:text-blue-100">Pro Tips</span>
            </div>
            <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
              Untuk hasil terbaik, pastikan URL yang Anda masukkan adalah URL asli dari platform {platform.name}. 
              Hindari menggunakan URL yang sudah dipersingkat atau dari pihak ketiga.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

PlatformListView.displayName = 'PlatformListView';

export default PlatformListView;
