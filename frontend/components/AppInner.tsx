import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import WhatsAppFab from './WhatsAppFab';
import DownloadHistory from './DownloadHistory';
import DownloadQueue from './DownloadQueue';
import DownloadAnalytics from './DownloadAnalytics';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import { platformData } from '../data/platforms';
import { getUserPreferences } from '../utils/storage';

export type ViewType = 'welcome' | 'platformList' | 'downloader';

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  downloaders: Downloader[];
}

export interface Downloader {
  id: string;
  name: string;
  apiPath: string;
  inputPlaceholder: string;
  instructions: string;
}

const AppInner = React.memo(() => {
  const [currentView, setCurrentView] = useState<ViewType>('welcome');
  const [currentCategory, setCurrentCategory] = useState<Platform | null>(null);
  const [currentDownloader, setCurrentDownloader] = useState<Downloader | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const preferences = useMemo(() => getUserPreferences(), []);

  const sortedPlatforms = useMemo(() => {
    const favorites = preferences.favoritePlatforms;
    return [...platformData].sort((a, b) => {
      const aIsFavorite = favorites.includes(a.id);
      const bIsFavorite = favorites.includes(b.id);
      
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      return 0;
    });
  }, [preferences.favoritePlatforms]);

  const handlePlatformSelect = useCallback((platform: Platform) => {
    setCurrentCategory(platform);
    setCurrentView('platformList');
  }, []);

  const handleDownloaderSelect = useCallback((downloader: Downloader) => {
    setCurrentDownloader(downloader);
    setCurrentView('downloader');
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentCategory(null);
    setCurrentDownloader(null);
    setCurrentView('welcome');
  }, []);

  const handleBackToPlatforms = useCallback(() => {
    setCurrentDownloader(null);
    setCurrentView('platformList');
  }, []);

  const handleShowHistory = useCallback(() => {
    setShowHistory(true);
  }, []);

  const handleCloseHistory = useCallback(() => {
    setShowHistory(false);
  }, []);

  const handleShowQueue = useCallback(() => {
    setShowQueue(true);
  }, []);

  const handleCloseQueue = useCallback(() => {
    setShowQueue(false);
  }, []);

  const handleShowAnalytics = useCallback(() => {
    setShowAnalytics(true);
  }, []);

  const handleCloseAnalytics = useCallback(() => {
    setShowAnalytics(false);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col smooth-transition">
      <Header 
        onHomeClick={handleBackToHome} 
        onHistoryClick={handleShowHistory}
        onQueueClick={handleShowQueue}
        onAnalyticsClick={handleShowAnalytics}
      />
      
      <motion.div 
        className="flex-1"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ErrorBoundary>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Sidebar 
                  platforms={sortedPlatforms}
                  currentCategory={currentCategory}
                  onPlatformSelect={handlePlatformSelect}
                />
              </motion.div>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <MainContent
                  currentView={currentView}
                  currentCategory={currentCategory}
                  currentDownloader={currentDownloader}
                  onDownloaderSelect={onDownloaderSelect}
                  onBackToHome={handleBackToHome}
                  onBackToPlatforms={handleBackToPlatforms}
                />
              </motion.div>
            </ErrorBoundary>
          </div>
        </div>
      </motion.div>

      <Footer />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <WhatsAppFab />
      </motion.div>
      
      <AnimatePresence>
        {showHistory && (
          <DownloadHistory onClose={handleCloseHistory} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showQueue && (
          <DownloadQueue onClose={handleCloseQueue} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showAnalytics && (
          <DownloadAnalytics onClose={handleCloseAnalytics} />
        )}
      </AnimatePresence>
    </div>
  );
});

AppInner.displayName = 'AppInner';

export default AppInner;
