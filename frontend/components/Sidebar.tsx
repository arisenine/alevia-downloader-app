import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
          <div className="card-enhanced p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Grid3X3 className="text-white text-sm" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Platforms</h2>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div 
                  key={i} 
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 animate-shimmer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                    </div>
                  </div>
                </motion.div>
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
        <motion.div 
          className="card-enhanced p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <motion.div 
              className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Grid3X3 className="text-white text-sm" />
            </motion.div>
            <div>
              <h2 className="text-xl font-bold text-gradient-primary">Platforms</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Choose your platform</p>
            </div>
          </div>
          
          <nav className="space-y-3">
            <AnimatePresence>
            {platforms.map((platform, index) => {
              const isFavorite = preferences.favoritePlatforms.includes(platform.id);
              const isActive = currentCategory?.id === platform.id;
              const isRecentlyUsed = getRecentlyUsed.includes(platform.id);
              const stats = platformStats[platform.id];
              
              return (
                <motion.div
                  key={platform.id}
                  className={`group cursor-pointer p-4 rounded-xl border smooth-transition hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden gpu-accelerated ${
                    isActive
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 border-yellow-300 dark:border-yellow-700 shadow-xl animate-pulse-glow'
                      : 'bg-white/50 dark:bg-gray-700/50 border-gray-200/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-600 hover:border-yellow-300 dark:hover:border-yellow-600 glass-effect'
                  }`}
                  onClick={() => onPlatformSelect(platform)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {isFavorite && (
                      <motion.div 
                        className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Star className="w-3 h-3 text-white fill-current" />
                      </motion.div>
                    )}
                    {isRecentlyUsed && !isFavorite && (
                      <motion.div 
                        className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Clock className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                    {isActive && (
                      <motion.div 
                        className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <TrendingUp className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center smooth-transition shadow-xl ${
                      isActive
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 text-gray-600 dark:text-gray-300 group-hover:from-yellow-400 group-hover:to-orange-500 group-hover:text-white'
                    }`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className={`${platform.icon} text-lg`}></i>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <motion.div 
                        className="font-bold text-gray-900 dark:text-white text-base mb-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        {platform.name}
                      </motion.div>
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
                  
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/10 group-hover:to-orange-500/10 smooth-transition ${
                    isActive ? 'from-yellow-500/20 to-orange-500/20' : ''
                  }`}></div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </nav>
          
          <motion.div 
            className="mt-6 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50 glass-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </motion.div>
              <span className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">Pro Tip</span>
            </div>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              Star your favorite platforms for quick access! Recently used platforms show a clock icon.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
