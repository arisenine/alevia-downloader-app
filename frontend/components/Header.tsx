import React from 'react';
import { Download, Moon, Sun, History, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  onHomeClick: () => void;
  onHistoryClick: () => void;
}

export default function Header({ onHomeClick, onHistoryClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-3 cursor-pointer group transition-all duration-300"
            onClick={onHomeClick}
          >
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Download className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse">
                <Sparkles className="w-2 h-2 text-white absolute top-0.5 left-0.5" />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent transition-all duration-300">
                ALEVIA
              </h1>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Smart Downloader
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onHistoryClick}
              className="w-9 h-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 relative group"
              title="Riwayat Download"
            >
              <History className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              title={theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              ) : (
                <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
