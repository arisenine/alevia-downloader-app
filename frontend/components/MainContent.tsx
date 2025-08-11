import React from 'react';
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
  return (
    <main className="lg:col-span-3">
      <div className="animate-in fade-in duration-500">
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
      </div>
    </main>
  );
}
