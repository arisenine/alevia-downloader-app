import React from 'react';
import { Star, Sparkles } from 'lucide-react';
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
        <div className="sticky top-20">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 transition-all duration-300">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-md flex items-center justify-center">
                <Sparkles className="text-white text-xs" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Platforms</h2>
            </div>
            <div className="space-y-2">
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
      <div className="sticky top-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 transition-all duration-300">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-md flex items-center justify-center shadow-sm">
              <Sparkles className="text-white text-xs" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Platforms</h2>
          </div>
          
          <nav className="space-y-2">
            {platforms.map((platform) => {
              const isFavorite = preferences.favoritePlatforms.includes(platform.id);
              const isActive = currentCategory?.id === platform.id;
              
              return (
                <div
                  key={platform.id}
                  className={`group cursor-pointer p-3 rounded-lg border transition-all duration-300 hover:scale-[1.01] hover:shadow-sm relative ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => onPlatformSelect(platform)}
                >
                  {isFavorite && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                      <Star className="w-2 h-2 text-yellow-800 fill-current" />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 shadow-sm ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 shadow-md'
                        : 'bg-gray-200 dark:bg-gray-600 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-500 dark:group-hover:to-purple-500'
                    }`}>
                      <i className={`${platform.icon} text-sm ${
                        isActive
                          ? 'text-white'
                          : 'text-gray-600 dark:text-gray-300 group-hover:text-white'
                      }`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white text-sm transition-colors">
                        {platform.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {platform.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
