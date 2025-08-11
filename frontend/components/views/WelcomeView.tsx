import React from 'react';
import { Download, Zap, Shield, Star, Sparkles, TrendingUp, Users, Clock } from 'lucide-react';

const WelcomeView = React.memo(() => {
  const features = [
    { icon: Download, title: 'Multi-Platform', desc: 'Support 10+ platform', color: 'text-blue-500' },
    { icon: Zap, title: 'Super Fast', desc: 'Download dalam hitungan detik', color: 'text-yellow-500' },
    { icon: Shield, title: 'Secure', desc: 'Aman dan terpercaya', color: 'text-green-500' },
    { icon: Star, title: 'Free', desc: 'Gratis selamanya', color: 'text-purple-500' }
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Pengguna Aktif', color: 'text-blue-500' },
    { icon: Download, value: '100K+', label: 'File Diunduh', color: 'text-green-500' },
    { icon: TrendingUp, value: '99.9%', label: 'Tingkat Keberhasilan', color: 'text-purple-500' },
    { icon: Clock, value: '24/7', label: 'Tersedia', color: 'text-orange-500' }
  ];

  const platforms = [
    { name: 'TikTok', icon: 'fab fa-tiktok', color: 'text-pink-500', gradient: 'from-pink-500 to-red-500' },
    { name: 'Instagram', icon: 'fab fa-instagram', color: 'text-purple-500', gradient: 'from-purple-500 to-pink-500' },
    { name: 'YouTube', icon: 'fab fa-youtube', color: 'text-red-500', gradient: 'from-red-500 to-red-600' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: 'text-blue-400', gradient: 'from-blue-400 to-blue-500' },
    { name: 'Facebook', icon: 'fab fa-facebook', color: 'text-blue-600', gradient: 'from-blue-600 to-blue-700' },
    { name: 'Spotify', icon: 'fab fa-spotify', color: 'text-green-500', gradient: 'from-green-500 to-green-600' },
    { name: 'Pinterest', icon: 'fab fa-pinterest', color: 'text-red-500', gradient: 'from-red-500 to-pink-500' },
    { name: 'Threads', icon: 'fab fa-threads', color: 'text-gray-700 dark:text-gray-300', gradient: 'from-gray-600 to-gray-700' }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 lg:p-8 text-center transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-50"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg relative">
            <Download className="w-8 h-8 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse">
              <Sparkles className="w-2 h-2 text-white absolute top-1 left-1" />
            </div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Selamat Datang di Alevia
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Platform downloader terlengkap untuk mengunduh video, audio, dan file dari berbagai platform sosial media. 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> Cepat, mudah, dan gratis!</span>
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <feature.icon className={`w-6 h-6 mx-auto mb-2 ${feature.color} group-hover:scale-110 transition-transform`} />
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                <div className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Star className="w-4 h-4" />
            <span>Pilih Platform untuk Memulai</span>
          </div>
        </div>
      </div>

      {/* Supported Platforms */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 transition-all duration-300">
        <h3 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white flex items-center justify-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Platform yang Didukung</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {platforms.map((platform, index) => (
            <div 
              key={index}
              className="group text-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            >
              <div className={`w-10 h-10 mx-auto mb-2 bg-gradient-to-br ${platform.gradient} rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300`}>
                <i className={`${platform.icon} text-white text-lg`}></i>
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

WelcomeView.displayName = 'WelcomeView';

export default WelcomeView;
