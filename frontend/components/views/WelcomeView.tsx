import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Zap, Shield, Star, TrendingUp, Users, Clock, Sparkles, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDownloadHistory, getUserPreferences } from '../../utils/storage';

const WelcomeView = React.memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useMemo(() => getDownloadHistory(), []);
  const preferences = useMemo(() => getUserPreferences(), []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const totalDownloads = history.length;
    const successfulDownloads = history.filter(h => h.success).length;
    const successRate = totalDownloads > 0 ? (successfulDownloads / totalDownloads) * 100 : 99.9;
    const favoritePlatforms = preferences.favoritePlatforms.length;

    return {
      users: '50K+',
      downloads: totalDownloads > 0 ? `${totalDownloads}+` : '1M+',
      successRate: `${successRate.toFixed(1)}%`,
      availability: '24/7',
      personalDownloads: totalDownloads,
      personalFavorites: favoritePlatforms
    };
  }, [history, preferences]);

  const features = useMemo(() => [
    { icon: Download, title: 'Multi-Platform', desc: 'Support 10+ popular platforms', color: 'bg-yellow-500', iconColor: 'text-yellow-600' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Download in seconds', color: 'bg-orange-500', iconColor: 'text-orange-600' },
    { icon: Shield, title: 'Secure & Safe', desc: '100% safe and trusted', color: 'bg-green-500', iconColor: 'text-green-600' },
    { icon: Star, title: 'Premium Free', desc: 'Free forever without limits', color: 'bg-purple-500', iconColor: 'text-purple-600' }
  ], []);

  const displayStats = useMemo(() => [
    { icon: Users, value: stats.users, label: 'Happy Users', color: 'bg-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { icon: Download, value: stats.downloads, label: 'Downloads', color: 'bg-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { icon: TrendingUp, value: stats.successRate, label: 'Success Rate', color: 'bg-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: Clock, value: stats.availability, label: 'Available', color: 'bg-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' }
  ], [stats]);

  const platforms = useMemo(() => [
    { name: 'TikTok', icon: 'fab fa-tiktok', color: 'bg-pink-500', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
    { name: 'Instagram', icon: 'fab fa-instagram', color: 'bg-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { name: 'YouTube', icon: 'fab fa-youtube', color: 'bg-red-500', bgColor: 'bg-red-50 dark:bg-red-900/20' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: 'bg-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Facebook', icon: 'fab fa-facebook', color: 'bg-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Spotify', icon: 'fab fa-spotify', color: 'bg-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { name: 'Pinterest', icon: 'fab fa-pinterest', color: 'bg-red-500', bgColor: 'bg-red-50 dark:bg-red-900/20' },
    { name: 'Threads', icon: 'fab fa-threads', color: 'bg-gray-600 dark:bg-gray-300', bgColor: 'bg-gray-50 dark:bg-gray-800/20' }
  ], []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="card-enhanced p-8 lg:p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-8 bg-gray-300 dark:bg-gray-600 rounded-3xl animate-shimmer"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-6 animate-shimmer"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-full max-w-3xl mx-auto mb-4 animate-shimmer"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-2/3 max-w-3xl mx-auto mb-8 animate-shimmer"></div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-2xl w-48 animate-shimmer"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-2xl w-48 animate-shimmer"></div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-2xl glass-effect">
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-300 dark:bg-gray-600 rounded-xl animate-shimmer"></div>
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2 animate-shimmer"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full animate-shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div 
        className="relative card-enhanced p-8 lg:p-12 text-center overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-orange-50/50 to-red-50/50 dark:from-yellow-900/10 dark:via-orange-900/10 dark:to-red-900/10"></div>
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-400/20 to-yellow-600/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="relative z-10">
          <motion.div 
            className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl animate-float"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl lg:text-6xl font-black mb-6 text-gradient-primary leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to LevTools
          </motion.h2>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The most comprehensive downloader platform for downloading videos, audio, and files from various social media platforms.
            <motion.span 
              className="block mt-2 font-bold text-gradient-secondary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Fast, easy, and free forever!
            </motion.span>
          </motion.p>

          {/* Personal Stats */}
          {stats.personalDownloads > 0 && (
            <motion.div 
              className="mb-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200/50 dark:border-yellow-700/50 max-w-md mx-auto glass-effect"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Your Activity</div>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <motion.div 
                    className="text-2xl font-black text-gradient-primary"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stats.personalDownloads}
                  </motion.div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Downloads</div>
                </div>
                <div className="text-center">
                  <motion.div 
                    className="text-2xl font-black text-gradient-secondary"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    {stats.personalFavorites}
                  </motion.div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Favorites</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="btn-primary px-8 py-4 text-lg">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Play className="w-5 h-5 mr-2" />
                </motion.div>
                Start Download
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="btn-secondary px-8 py-4 text-lg">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                </motion.div>
                View Features
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="group p-6 card-glass hover:bg-white/20 dark:hover:bg-black/20 hover:shadow-2xl hover:-translate-y-2 smooth-transition gpu-accelerated"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${feature.color.replace('bg-', 'from-')} to-${feature.color.split('-')[1]}-600 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-125 smooth-transform`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div 
                  className="font-bold text-gray-900 dark:text-white text-lg mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  {feature.title}
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {displayStats.map((stat, index) => (
              <motion.div 
                key={index} 
                className={`text-center p-6 ${stat.bgColor} rounded-2xl border border-white/50 dark:border-gray-600/30 hover:scale-110 smooth-transition shadow-xl hover:shadow-2xl gpu-accelerated`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <motion.div 
                  className={`w-10 h-10 mx-auto mb-3 bg-gradient-to-br ${stat.color.replace('bg-', 'from-')} to-${stat.color.split('-')[1]}-600 rounded-xl flex items-center justify-center shadow-xl`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div 
                  className="text-2xl font-black text-gray-900 dark:text-white mb-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Supported Platforms */}
      <motion.div 
        className="card-enhanced p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.h3 
            className="text-3xl font-bold mb-4 text-gradient-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Supported Platforms
          </motion.h3>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Download from your favorite platforms with one click
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {platforms.map((platform, index) => (
            <motion.div 
              key={index}
              className={`group text-center p-6 ${platform.bgColor} rounded-2xl border border-white/50 dark:border-gray-600/30 hover:scale-110 hover:shadow-2xl smooth-transition cursor-pointer gpu-accelerated`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${platform.color.replace('bg-', 'from-')} to-${platform.color.split('-')[1]}-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-125 smooth-transform`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <i className={`${platform.icon} text-xl text-white`}></i>
              </motion.div>
              <motion.span 
                className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white smooth-transition"
                whileHover={{ scale: 1.05 }}
              >
                {platform.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl smooth-transition"
            whileHover={{ scale: 1.05 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-5 h-5 fill-current" />
            </motion.div>
            <span>And many more coming soon!</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
});

WelcomeView.displayName = 'WelcomeView';

export default WelcomeView;
