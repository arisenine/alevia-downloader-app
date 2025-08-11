import React from 'react';
import { motion } from 'framer-motion';
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
    <motion.header 
      className="sticky top-0 z-50 glass-effect dark:glass-effect-dark border-b border-white/20 dark:border-white/10 shadow-2xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            className="cursor-pointer group smooth-transform hover:scale-105"
            onClick={onHomeClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl smooth-transition animate-pulse-glow"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <motion.h1 
                  className="text-2xl font-black text-gradient-primary group-hover:text-gradient-secondary smooth-transition"
                  whileHover={{ scale: 1.05 }}
                >
                  LEVTOOLS
                </motion.h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Ultimate Downloader
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={onQueueClick}
                className="relative w-11 h-11 p-0 rounded-xl glass-effect hover:bg-yellow-100/50 dark:hover:bg-gray-800/50 smooth-transition group"
                title="Download Queue"
              >
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 smooth-transition" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/10 group-hover:to-orange-500/10 smooth-transition"></div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={onHistoryClick}
                className="relative w-11 h-11 p-0 rounded-xl glass-effect hover:bg-yellow-100/50 dark:hover:bg-gray-800/50 smooth-transition group"
                title="Download History"
              >
                <History className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 smooth-transition" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/10 group-hover:to-orange-500/10 smooth-transition"></div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={onAnalyticsClick}
                className="relative w-11 h-11 p-0 rounded-xl glass-effect hover:bg-yellow-100/50 dark:hover:bg-gray-800/50 smooth-transition group"
                title="Analytics"
              >
                <BarChart3 className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 smooth-transition" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/10 group-hover:to-orange-500/10 smooth-transition"></div>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="relative w-11 h-11 p-0 rounded-xl glass-effect hover:bg-yellow-100/50 dark:hover:bg-gray-800/50 smooth-transition group"
                title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'light' ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 smooth-transition" />
                  ) : (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 smooth-transition" />
                  )}
                </motion.div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/10 group-hover:to-orange-500/10 smooth-transition"></div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
