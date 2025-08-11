import React from 'react';
import { Moon, Sun, History, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  onHomeClick: () => void;
  onHistoryClick: () => void;
}

export default function Header({ onHomeClick, onHistoryClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="cursor-pointer group transition-all duration-300 hover:scale-105"
            onClick={onHomeClick}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
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
              onClick={onHistoryClick}
              className="relative w-11 h-11 p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              title="Riwayat Download"
            >
              <History className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300"></div>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="relative w-11 h-11 p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              title={theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors" />
              )}
              <div className="absolute inset-0 rounded-xl bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-all duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
