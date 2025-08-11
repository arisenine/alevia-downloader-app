import React from 'react';
import { ArrowLeft, Home, Zap, Shield, Star } from 'lucide-react';
import { Platform, Downloader } from '../AppInner';
import { Button } from '@/components/ui/button';
import { DownloaderCardSkeleton } from '../SkeletonLoader';

interface PlatformListViewProps {
  platform: Platform;
  onDownloaderSelect: (downloader: Downloader) => void;
  onBackToHome: () => void;
}

const PlatformListView = React.memo<PlatformListViewProps>(({ platform, onDownloaderSelect, onBackToHome }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: Zap, text: 'Cepat & Efisien', color: 'text-yellow-500' },
    { icon: Shield, text: 'Aman & Terpercaya', color: 'text-green-500' },
    { icon: Star, text: 'Kualitas Terbaik', color: 'text-purple-500' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToHome}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Home className="w-4 h-4 mr-2" />
          Beranda
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center">
            <i className={`${platform.icon} text-white text-xl`}></i>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{platform.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">Pilih jenis downloader yang diinginkan</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 rounded-full text-sm">
              <feature.icon className={`w-4 h-4 ${feature.color}`} />
              <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            Array.from({ length: platform.downloaders.length }).map((_, i) => (
              <DownloaderCardSkeleton key={i} />
            ))
          ) : (
            platform.downloaders.map((downloader, index) => (
              <div
                key={downloader.id}
                className="group cursor-pointer p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-lg transition-all duration-200"
                onClick={() => onDownloaderSelect(downloader)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center text-white">
                    <i className={`${platform.icon} text-sm`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {downloader.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed">
                      {downloader.instructions}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                      <span>Pilih Downloader</span>
                      <ArrowLeft className="w-3 h-3 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
});

PlatformListView.displayName = 'PlatformListView';

export default PlatformListView;
