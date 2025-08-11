import React from 'react';
import { Platform } from './AppInner';

interface SidebarProps {
  platforms: Platform[];
  currentCategory: Platform | null;
  onPlatformSelect: (platform: Platform) => void;
}

export default function Sidebar({ platforms, currentCategory, onPlatformSelect }: SidebarProps) {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 transition-all duration-300">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-md flex items-center justify-center">
              <i className="fas fa-th-large text-white text-xs"></i>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Platforms</h2>
          </div>
          
          <nav className="space-y-2">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className={`group cursor-pointer p-3 rounded-lg border transition-all duration-300 hover:scale-[1.01] ${
                  currentCategory?.id === platform.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => onPlatformSelect(platform)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 ${
                    currentCategory?.id === platform.id
                      ? 'bg-blue-600 dark:bg-blue-500 shadow-sm'
                      : 'bg-gray-200 dark:bg-gray-600 group-hover:bg-blue-600 dark:group-hover:bg-blue-500'
                  }`}>
                    <i className={`${platform.icon} text-sm ${
                      currentCategory?.id === platform.id
                        ? 'text-white'
                        : 'text-gray-600 dark:text-gray-300 group-hover:text-white'
                    }`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white text-sm transition-colors">
                      {platform.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {platform.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
