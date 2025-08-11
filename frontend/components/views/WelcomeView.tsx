import React from 'react';
import { Download, Zap, Shield, Star } from 'lucide-react';

export default function WelcomeView() {
  const features = [
    { icon: Download, title: 'Multi-Platform', desc: 'Support 10+ platform' },
    { icon: Zap, title: 'Super Fast', desc: 'Download dalam hitungan detik' },
    { icon: Shield, title: 'Secure', desc: 'Aman dan terpercaya' },
    { icon: Star, title: 'Free', desc: 'Gratis selamanya' }
  ];

  const platforms = [
    { name: 'TikTok', icon: 'fab fa-tiktok', color: 'text-pink-500' },
    { name: 'Instagram', icon: 'fab fa-instagram', color: 'text-purple-500' },
    { name: 'YouTube', icon: 'fab fa-youtube', color: 'text-red-500' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: 'text-blue-400' },
    { name: 'Facebook', icon: 'fab fa-facebook', color: 'text-blue-600' },
    { name: 'Spotify', icon: 'fab fa-spotify', color: 'text-green-500' },
    { name: 'Pinterest', icon: 'fab fa-pinterest', color: 'text-red-500' },
    { name: 'Threads', icon: 'fab fa-threads', color: 'text-gray-700 dark:text-gray-300' }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 lg:p-8 text-center transition-all duration-300">
        <div className="w-16 h-16 mx-auto mb-6 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
          <Download className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Selamat Datang
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
          Platform downloader terlengkap untuk mengunduh video, audio, dan file dari berbagai platform sosial media. 
          <span className="font-semibold text-blue-600 dark:text-blue-400"> Cepat, mudah, dan gratis!</span>
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-xl mx-auto mb-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-sm transition-all duration-300 hover:scale-105"
            >
              <feature.icon className="w-6 h-6 mx-auto mb-2 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
              <div className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</div>
            </div>
          ))}
        </div>

        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
          <Star className="w-4 h-4" />
          <span>Pilih Platform untuk Memulai</span>
        </div>
      </div>

      {/* Supported Platforms */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 transition-all duration-300">
        <h3 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">Platform yang Didukung</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {platforms.map((platform, index) => (
            <div 
              key={index}
              className="group text-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            >
              <div className="w-10 h-10 mx-auto mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                <i className={`${platform.icon} ${platform.color} text-lg`}></i>
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
}
