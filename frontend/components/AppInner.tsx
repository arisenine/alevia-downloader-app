import React, { useState, useMemo, useCallback } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import WhatsAppFab from './WhatsAppFab';
import DownloadHistory from './DownloadHistory';
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

  const preferences = getUserPreferences();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex flex-col">
      <Header 
        onHomeClick={handleBackToHome} 
        onHistoryClick={handleShowHistory}
      />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ErrorBoundary>
              <Sidebar 
                platforms={sortedPlatforms}
                currentCategory={currentCategory}
                onPlatformSelect={handlePlatformSelect}
              />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <MainContent
                currentView={currentView}
                currentCategory={currentCategory}
                currentDownloader={currentDownloader}
                onDownloaderSelect={handleDownloaderSelect}
                onBackToHome={handleBackToHome}
                onBackToPlatforms={handleBackToPlatforms}
              />
            </ErrorBoundary>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFab />
      
      {showHistory && (
        <DownloadHistory onClose={handleCloseHistory} />
      )}
    </div>
  );
});

AppInner.displayName = 'AppInner';

export default AppInner;
