import React from 'react';
import { Star, Grid3X3, Sparkles, TrendingUp } from 'lucide-react';
import { Platform } from './AppInner';
import { getUserPreferences } from '../utils/storage';
import { PlatformCardSkeleton } from './SkeletonLoader';

interface SidebarProps {
  platforms: Platform[];
  currentCategory: Platform | null;
  onPlatformSelect: (platform: Platform) => void;
}

const Sidebar = React.memo<SidebarProps>(({ platforms, currentCategory, onPlatformSelect }) => {
  const preferences = getUserPreferences();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <aside className="lg:col-span-1">
        <div className="sticky top-28">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-black/5 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Grid3X3 className="text-white text-sm" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Platforms</h2>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <PlatformCardSkeleton key={i} />
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
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
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
              
              return (
                <div
                  key={platform.id}
                  className={`group cursor-pointer p-4 rounded-xl border transition-all duration-300 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-200 dark:border-blue-700 shadow-lg shadow-blue-500/20'
                      : 'bg-white/50 dark:bg-gray-700/50 border-gray-200/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => onPlatformSelect(platform)}
                >
                  {isFavorite && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30 animate-pulse">
                      <Star className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}
                  
                  {isActive && (
                    <div className="absolute top-2 right-2">
                      <TrendingUp className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-blue-500/30'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 text-gray-600 dark:text-gray-300 group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:shadow-blue-500/30'
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
                    </div>
                  </div>
                  
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 ${
                    isActive ? 'from-blue-500/10 to-purple-500/10' : ''
                  }`}></div>
                </div>
              );
            })}
          </nav>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">Pro Tip</span>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Star your favorite platforms for quick access!
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
