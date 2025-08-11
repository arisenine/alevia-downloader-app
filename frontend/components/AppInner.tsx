import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import WhatsAppFab from './WhatsAppFab';
import { platformData } from '../data/platforms';

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

export default function AppInner() {
  const [currentView, setCurrentView] = useState<ViewType>('welcome');
  const [currentCategory, setCurrentCategory] = useState<Platform | null>(null);
  const [currentDownloader, setCurrentDownloader] = useState<Downloader | null>(null);

  const handlePlatformSelect = (platform: Platform) => {
    setCurrentCategory(platform);
    setCurrentView('platformList');
  };

  const handleDownloaderSelect = (downloader: Downloader) => {
    setCurrentDownloader(downloader);
    setCurrentView('downloader');
  };

  const handleBackToHome = () => {
    setCurrentCategory(null);
    setCurrentDownloader(null);
    setCurrentView('welcome');
  };

  const handleBackToPlatforms = () => {
    setCurrentDownloader(null);
    setCurrentView('platformList');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header onHomeClick={handleBackToHome} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Sidebar 
            platforms={platformData}
            currentCategory={currentCategory}
            onPlatformSelect={handlePlatformSelect}
          />
          
          <MainContent
            currentView={currentView}
            currentCategory={currentCategory}
            currentDownloader={currentDownloader}
            onDownloaderSelect={handleDownloaderSelect}
            onBackToHome={handleBackToHome}
            onBackToPlatforms={handleBackToPlatforms}
          />
        </div>
      </div>

      <WhatsAppFab />
    </div>
  );
}
