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
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToHome}
          className="bg-white/70 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 hover:shadow-lg transition-all duration-300"
        >
          <Home className="w-4 h-4 mr-2" />
          Beranda
        </Button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-xl p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <i className={`${platform.icon} text-white text-2xl`}></i>
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-800">{platform.name}</h2>
            <p className="text-gray-600">Pilih jenis downloader yang diinginkan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platform.downloaders.map((downloader, index) => (
            <div
              key={downloader.id}
              className="group cursor-pointer p-6 bg-white/50 rounded-2xl border border-gray-200/50 hover:bg-white/80 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              onClick={() => onDownloaderSelect(downloader)}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <i className={`${platform.icon} text-white text-lg`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                    {downloader.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {downloader.instructions}
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                    <span>Pilih Downloader</span>
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
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
