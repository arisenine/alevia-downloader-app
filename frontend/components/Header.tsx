import React from 'react';
import { Moon, Sun, History, BarChart3, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  onHomeClick: () => void;
  onHistoryClick: () => void;
  onQueueClick: () => void;
  onAnalyticsClick: () => void;
}

export default function Header({ onHomeClick, onHistoryClick, onQueueClick, onAnalyticsClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-yellow-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="cursor-pointer group transition-all duration-300 hover:scale-105"
            onClick={onHomeClick}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-all duration-300">
                  LEVTOOLS
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Ultimate Downloader
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onQueueClick}
              className="relative w-11 h-11 p-0 rounded-xl hover:bg-yellow-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              title="Download Queue"
            >
              <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors" />
              <div className="absolute inset-0 rounded-xl bg-yellow-500/0 group-hover:bg-yellow-500/10 transition-all duration-300"></div>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onHistoryClick}
              className="relative w-11 h-11 p-0 rounded-xl hover:bg-yellow-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              title="Download History"
            >
              <History className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors" />
              <div className="absolute inset-0 rounded-xl bg-yellow-500/0 group-hover:bg-yellow-500/10 transition-all duration-300"></div>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onAnalyticsClick}
              className="relative w-11 h-11 p-0 rounded-xl hover:bg-yellow-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              title="Analytics"
            >
              <BarChart3 className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors" />
              <div className="absolute inset-0 rounded-xl bg-yellow-500/0 group-hover:bg-yellow-500/10 transition-all duration-300"></div>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="relative w-11 h-11 p-0 rounded-xl hover:bg-yellow-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors" />
              )}
              <div className="absolute inset-0 rounded-xl bg-yellow-500/0 group-hover:bg-yellow-500/10 transition-all duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
