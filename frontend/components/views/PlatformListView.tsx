import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { Platform, Downloader } from '../AppInner';
import { Button } from '@/components/ui/button';

interface PlatformListViewProps {
  platform: Platform;
  onDownloaderSelect: (downloader: Downloader) => void;
  onBackToHome: () => void;
}

export default function PlatformListView({ platform, onDownloaderSelect, onBackToHome }: PlatformListViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToHome}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <Home className="w-4 h-4 mr-2" />
          Beranda
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
            <i className={`${platform.icon} text-white text-xl`}></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{platform.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">Pilih jenis downloader yang diinginkan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platform.downloaders.map((downloader, index) => (
            <div
              key={downloader.id}
              className="group cursor-pointer p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5"
              onClick={() => onDownloaderSelect(downloader)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <i className={`${platform.icon} text-white text-sm`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                    {downloader.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed">
                    {downloader.instructions}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    <span>Pilih Downloader</span>
                    <ArrowLeft className="w-3 h-3 ml-2 rotate-180 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
