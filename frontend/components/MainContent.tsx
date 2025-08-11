import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewType, Platform, Downloader } from './AppInner';
import WelcomeView from './views/WelcomeView';
import PlatformListView from './views/PlatformListView';
import DownloaderView from './views/DownloaderView';

interface MainContentProps {
  currentView: ViewType;
  currentCategory: Platform | null;
  currentDownloader: Downloader | null;
  onDownloaderSelect: (downloader: Downloader) => void;
  onBackToHome: () => void;
  onBackToPlatforms: () => void;
}

export default function MainContent({
  currentView,
  currentCategory,
  currentDownloader,
  onDownloaderSelect,
  onBackToHome,
  onBackToPlatforms
}: MainContentProps) {
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <main className="lg:col-span-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="gpu-accelerated"
        >
          {currentView === 'welcome' && <WelcomeView />}
          
          {currentView === 'platformList' && currentCategory && (
            <PlatformListView
              platform={currentCategory}
              onDownloaderSelect={onDownloaderSelect}
              onBackToHome={onBackToHome}
            />
          )}
          
          {currentView === 'downloader' && currentDownloader && currentCategory && (
            <DownloaderView
              downloader={currentDownloader}
              platform={currentCategory}
              onBackToPlatforms={onBackToPlatforms}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
