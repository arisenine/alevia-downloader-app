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
      <div className="sticky top-28">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-th-large text-white text-sm"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Platforms</h2>
          </div>
          
          <nav className="space-y-3">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className={`group cursor-pointer p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                  currentCategory?.id === platform.id
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg'
                    : 'bg-white/50 border-gray-200/50 hover:bg-white/80 hover:border-gray-300/50 hover:shadow-lg'
                }`}
                onClick={() => onPlatformSelect(platform)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    currentCategory?.id === platform.id
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'
                      : 'bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600'
                  }`}>
                    <i className={`${platform.icon} text-lg ${
                      currentCategory?.id === platform.id
                        ? 'text-white'
                        : 'text-gray-600 group-hover:text-white'
                    }`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {platform.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
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
