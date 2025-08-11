import React, { useState, useEffect, useMemo } from 'react';
import { Download, Zap, Shield, Star, TrendingUp, Users, Clock, Sparkles, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDownloadHistory, getUserPreferences } from '../../utils/storage';
import { WelcomeViewSkeleton } from '../SkeletonLoader';

const WelcomeView = React.memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const history = getDownloadHistory();
  const preferences = getUserPreferences();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const totalDownloads = history.length;
    const successfulDownloads = history.filter(h => h.success).length;
    const successRate = totalDownloads > 0 ? (successfulDownloads / totalDownloads) * 100 : 99.9;
    const favoritePlatforms = preferences.favoritePlatforms.length;

    return {
      users: '50K+',
      downloads: totalDownloads > 0 ? `${totalDownloads}+` : '1M+',
      successRate: `${successRate.toFixed(1)}%`,
      availability: '24/7',
      personalDownloads: totalDownloads,
      personalFavorites: favoritePlatforms
    };
  }, [history, preferences]);

  const features = [
    { icon: Download, title: 'Multi-Platform', desc: 'Support 10+ platform populer', color: 'bg-blue-600', iconColor: 'text-blue-600' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Download dalam hitungan detik', color: 'bg-orange-500', iconColor: 'text-orange-600' },
    { icon: Shield, title: 'Secure & Safe', desc: 'Aman dan terpercaya 100%', color: 'bg-green-600', iconColor: 'text-green-600' },
    { icon: Star, title: 'Premium Free', desc: 'Gratis selamanya tanpa batas', color: 'bg-purple-600', iconColor: 'text-purple-600' }
  ];

  const displayStats = [
    { icon: Users, value: stats.users, label: 'Happy Users', color: 'bg-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: Download, value: stats.downloads, label: 'Downloads', color: 'bg-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { icon: TrendingUp, value: stats.successRate, label: 'Success Rate', color: 'bg-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: Clock, value: stats.availability, label: 'Available', color: 'bg-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-900/20' }
  ];

  const platforms = [
    { name: 'TikTok', icon: 'fab fa-tiktok', color: 'bg-pink-600', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
    { name: 'Instagram', icon: 'fab fa-instagram', color: 'bg-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { name: 'YouTube', icon: 'fab fa-youtube', color: 'bg-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: 'bg-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Facebook', icon: 'fab fa-facebook', color: 'bg-blue-700', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Spotify', icon: 'fab fa-spotify', color: 'bg-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { name: 'Pinterest', icon: 'fab fa-pinterest', color: 'bg-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20' },
    { name: 'Threads', icon: 'fab fa-threads', color: 'bg-gray-700 dark:bg-gray-300', bgColor: 'bg-gray-50 dark:bg-gray-800/20' }
  ];

  if (isLoading) {
    return <WelcomeViewSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-black/10 p-8 lg:p-12 text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-900/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.05),transparent_50%)]"></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto mb-8 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-tight">
            Welcome to LevTools
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            Platform downloader terlengkap untuk mengunduh video, audio, dan file dari berbagai platform sosial media.
            <span className="block mt-2 font-bold text-blue-600 dark:text-blue-400">
              Cepat, mudah, dan gratis selamanya!
            </span>
          </p>

          {/* Personal Stats */}
          {stats.personalDownloads > 0 && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50 max-w-md mx-auto">
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Your Activity</div>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{stats.personalDownloads}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{stats.personalFavorites}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Favorites</div>
                </div>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
              <Play className="w-5 h-5 mr-2" />
              Mulai Download
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
              <Sparkles className="w-5 h-5 mr-2" />
              Lihat Fitur
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 mx-auto mb-4 ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-gray-900 dark:text-white text-lg mb-2">{feature.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {displayStats.map((stat, index) => (
              <div key={index} className={`text-center p-6 ${stat.bgColor} backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-600/30 hover:scale-105 transition-all duration-300 shadow-lg`}>
                <div className={`w-10 h-10 mx-auto mb-3 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supported Platforms */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-black/5 p-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Platform yang Didukung
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Download dari platform favorit Anda dengan satu klik
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {platforms.map((platform, index) => (
            <div 
              key={index}
              className={`group text-center p-6 ${platform.bgColor} rounded-2xl border border-white/50 dark:border-gray-600/30 hover:scale-105 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 cursor-pointer`}
            >
              <div className={`w-14 h-14 mx-auto mb-4 ${platform.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <i className={`${platform.icon} text-xl text-white`}></i>
              </div>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-2xl font-semibold shadow-lg shadow-green-500/30">
            <Star className="w-5 h-5 fill-current" />
            <span>Dan masih banyak lagi yang akan datang!</span>
          </div>
        </div>
      </div>
    </div>
  );
});

WelcomeView.displayName = 'WelcomeView';

export default WelcomeView;
