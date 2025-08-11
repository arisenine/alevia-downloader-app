import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home, Zap, Shield, Star, Sparkles, ArrowRight, Download, Clock } from 'lucide-react';
import { Platform, Downloader } from '../AppInner';
import { Button } from '@/components/ui/button';
import { getDownloadHistory } from '../../utils/storage';

interface PlatformListViewProps {
  platform: Platform;
  onDownloaderSelect: (downloader: Downloader) => void;
  onBackToHome: () => void;
}

const PlatformListView = React.memo<PlatformListViewProps>(({ platform, onDownloaderSelect, onBackToHome }) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useMemo(() => getDownloadHistory(), []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
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

  const features = useMemo(() => [
    { icon: Zap, text: 'Lightning Fast', color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
    { icon: Shield, text: 'Secure & Safe', color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { icon: Star, text: 'Premium Quality', color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' }
  ], []);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToHome}
            className="glass-effect hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-xl smooth-transition rounded-xl"
          >
            <Home className="w-4 h-4 mr-2" />
            Beranda
          </Button>
        </motion.div>
      </div>

      <motion.div 
        className="relative card-enhanced p-8 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Pattern */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-blue-50/20 to-purple-50/20 dark:from-slate-900/10 dark:via-blue-900/10 dark:to-purple-900/10"
          animate={{ 
            background: [
              "linear-gradient(135deg, rgba(248, 250, 252, 0.3), rgba(219, 234, 254, 0.2), rgba(237, 233, 254, 0.2))",
              "linear-gradient(135deg, rgba(219, 234, 254, 0.3), rgba(237, 233, 254, 0.2), rgba(254, 240, 138, 0.2))",
              "linear-gradient(135deg, rgba(237, 233, 254, 0.3), rgba(254, 240, 138, 0.2), rgba(248, 250, 252, 0.2))"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
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
        
        <div className="relative z-10">
          <motion.div 
            className="flex items-center space-x-6 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <i className={`${platform.icon} text-white text-3xl`}></i>
            </motion.div>
            <div className="flex-1">
              <motion.h2 
                className="text-4xl font-black mb-2 text-gradient-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {platform.name}
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Pilih jenis downloader yang diinginkan
              </motion.p>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className={`flex items-center space-x-3 px-6 py-3 ${feature.bgColor} rounded-2xl border border-white/50 dark:border-gray-600/30 shadow-xl hover:scale-110 smooth-transition gpu-accelerated`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300 font-semibold">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {isLoading ? (
              Array.from({ length: platform.downloaders.length }).map((_, i) => (
                <motion.div 
                  key={i} 
                  className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50 animate-shimmer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-2xl"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <AnimatePresence>
              platform.downloaders.map((downloader) => {
                const stats = downloaderStats[downloader.id];
                const isRecentlyUsed = stats && (Date.now() - stats.lastUsed) < (7 * 24 * 60 * 60 * 1000);
                
                return (
                  <motion.div
                    key={downloader.id}
                    className="group cursor-pointer p-6 card-glass hover:bg-white/90 dark:hover:bg-gray-700/90 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2 smooth-transition overflow-hidden relative gpu-accelerated"
                    onClick={() => onDownloaderSelect(downloader)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background Gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-blue-50/50 group-hover:via-purple-50/30 group-hover:to-pink-50/50 dark:group-hover:from-blue-900/20 dark:group-hover:via-purple-900/10 dark:group-hover:to-pink-900/20 smooth-transition"
                      whileHover={{
                        background: "linear-gradient(135deg, rgba(219, 234, 254, 0.5), rgba(237, 233, 254, 0.3), rgba(252, 231, 243, 0.5))"
                      }}
                    />
                    
                    {/* Recently Used Badge */}
                    {isRecentlyUsed && (
                      <motion.div 
                        className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Clock className="w-3 h-3" />
                        </motion.div>
                        <span>Recent</span>
                      </motion.div>
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-4">
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-blue-500/40 smooth-transition"
                          whileHover={{ rotate: 10, scale: 1.25 }}
                          transition={{ duration: 0.3 }}
                        >
                          <i className={`${platform.icon} text-xl`}></i>
                        </motion.div>
                        <div className="flex-1">
                          <motion.h3 
                            className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 smooth-transition"
                            whileHover={{ scale: 1.05 }}
                          >
                            {downloader.name}
                          </motion.h3>
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
                            <motion.div
                              animate={{ y: [0, -2, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Download className="w-4 h-4 mr-2" />
                            </motion.div>
                            <span>Pilih Downloader</span>
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 smooth-transform" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
              </AnimatePresence>
            )}
          </motion.div>

          {/* Pro Tip */}
          <motion.div 
            className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50 shadow-xl glass-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <span className="text-lg font-bold text-blue-900 dark:text-blue-100">Pro Tips</span>
            </div>
            <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
              Untuk hasil terbaik, pastikan URL yang Anda masukkan adalah URL asli dari platform {platform.name}. 
              Hindari menggunakan URL yang sudah dipersingkat atau dari pihak ketiga.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

PlatformListView.displayName = 'PlatformListView';

export default PlatformListView;
