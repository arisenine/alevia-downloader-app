import React, { useState, useEffect, useMemo } from 'react';
import { Star, Grid3X3, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { Platform } from './AppInner';
import { getUserPreferences, getDownloadHistory } from '../utils/storage';

interface SidebarProps {
  platforms: Platform[];
  currentCategory: Platform | null;
  onPlatformSelect: (platform: Platform) => void;
}

const Sidebar = React.memo<SidebarProps>(({ platforms, currentCategory, onPlatformSelect }) => {
  const [isLoading, setIsLoading] = useState(true);
  const preferences = useMemo(() => getUserPreferences(), []);
  const history = useMemo(() => getDownloadHistory(), []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const platformStats = useMemo(() => {
    const stats: Record<string, { count: number; lastUsed: number }> = {};
    
    history.forEach(item => {
      if (!stats[item.platform]) {
        stats[item.platform] = { count: 0, lastUsed: 0 };
      }
      stats[item.platform].count++;
      stats[item.platform].lastUsed = Math.max(stats[item.platform].lastUsed, item.timestamp);
    });
    
    return stats;
  }, [history]);

  const getRecentlyUsed = useMemo(() => {
    const recentThreshold = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days
    return Object.entries(platformStats)
      .filter(([_, stats]) => stats.lastUsed > recentThreshold)
      .map(([platformId]) => platformId);
  }, [platformStats]);

  if (isLoading) {
    return (
      <aside className="lg:col-span-1">
        <div className="sticky top-28">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-black/5 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                <Grid3X3 className="text-white text-sm" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Platforms</h2>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-28">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-black/5 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Grid3X3 className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Platforms</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Choose your platform</p>
            </div>
          </div>
          
          <nav className="space-y-3">
            {platforms.map((platform) => {
              const isFavorite = preferences.favoritePlatforms.includes(platform.id);
              const isActive = currentCategory?.id === platform.id;
              const isRecentlyUsed = getRecentlyUsed.includes(platform.id);
              const stats = platformStats[platform.id];
              
              return (
                <div
                  key={platform.id}
                  className={`group cursor-pointer p-4 rounded-xl border transition-all duration-200 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 relative overflow-hidden ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 shadow-lg shadow-blue-500/20'
                      : 'bg-white/50 dark:bg-gray-700/50 border-gray-200/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => onPlatformSelect(platform)}
                >
                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {isFavorite && (
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    )}
                    {isRecentlyUsed && !isFavorite && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                        <Clock className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {isActive && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <TrendingUp className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-blue-500/30'
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-blue-500/30'
                    }`}>
                      <i className={`${platform.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white text-base mb-1">
                        {platform.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {platform.description}
                      </div>
                      {stats && (
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {stats.count} download{stats.count !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-all duration-200 ${
                    isActive ? 'bg-blue-500/10' : ''
                  }`}></div>
                </div>
              );
            })}
          </nav>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">Pro Tip</span>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Star your favorite platforms for quick access! Recently used platforms show a clock icon.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
