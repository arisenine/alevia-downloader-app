import React from 'react';
import { ArrowLeft, Home, Zap, Shield, Star, Sparkles, ArrowRight, Download } from 'lucide-react';
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
    { icon: Zap, text: 'Lightning Fast', color: 'text-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { icon: Shield, text: 'Secure & Safe', color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { icon: Star, text: 'Premium Quality', color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToHome}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-300 rounded-xl"
        >
          <Home className="w-4 h-4 mr-2" />
          Beranda
        </Button>
      </div>

      <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-black/10 p-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
              <i className={`${platform.icon} text-white text-3xl`}></i>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {platform.name}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                Pilih jenis downloader yang diinginkan
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className={`flex items-center space-x-3 px-6 py-3 ${feature.bgColor} rounded-2xl border border-white/50 dark:border-gray-600/30 shadow-lg hover:scale-105 transition-all duration-300`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-gray-700 dark:text-gray-300 font-semibold">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              Array.from({ length: platform.downloaders.length }).map((_, i) => (
                <DownloaderCardSkeleton key={i} />
              ))
            ) : (
              platform.downloaders.map((downloader, index) => (
                <div
                  key={downloader.id}
                  className="group cursor-pointer p-6 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-700 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
                  onClick={() => onDownloaderSelect(downloader)}
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-blue-50/50 group-hover:via-purple-50/30 group-hover:to-pink-50/50 dark:group-hover:from-blue-900/20 dark:group-hover:via-purple-900/10 dark:group-hover:to-pink-900/20 transition-all duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-300">
                        <i className={`${platform.icon} text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {downloader.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                          {downloader.instructions}
                        </p>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          <Download className="w-4 h-4 mr-2" />
                          <span>Pilih Downloader</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pro Tip */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-bold text-blue-900 dark:text-blue-100">Pro Tips</span>
            </div>
            <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
              Untuk hasil terbaik, pastikan URL yang Anda masukkan adalah URL asli dari platform {platform.name}. 
              Hindari menggunakan URL yang sudah dipersingkat atau dari pihak ketiga.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

PlatformListView.displayName = 'PlatformListView';

export default PlatformListView;
