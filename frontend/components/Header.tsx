import React from 'react';
import { Download, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  onHomeClick: () => void;
}

export default function Header({ onHomeClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-3 cursor-pointer group transition-all duration-300"
            onClick={onHomeClick}
          >
            <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                ALEVIA
              </h1>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Downloader
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-9 h-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
