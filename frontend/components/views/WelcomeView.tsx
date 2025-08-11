import React from 'react';
import { Download, Sparkles, Zap, Shield } from 'lucide-react';

export default function WelcomeView() {
  const features = [
    { icon: Download, title: 'Multi-Platform', desc: 'Support 10+ platform' },
    { icon: Zap, title: 'Super Fast', desc: 'Download dalam hitungan detik' },
    { icon: Shield, title: 'Secure', desc: 'Aman dan terpercaya' },
    { icon: Sparkles, title: 'Free', desc: 'Gratis selamanya' }
  ];

  const platforms = [
    { name: 'TikTok', icon: 'fab fa-tiktok', color: 'from-pink-500 to-red-500' },
    { name: 'Instagram', icon: 'fab fa-instagram', color: 'from-purple-500 to-pink-500' },
    { name: 'YouTube', icon: 'fab fa-youtube', color: 'from-red-500 to-red-600' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: 'from-blue-400 to-blue-500' },
    { name: 'Facebook', icon: 'fab fa-facebook', color: 'from-blue-600 to-blue-700' },
    { name: 'Spotify', icon: 'fab fa-spotify', color: 'from-green-500 to-green-600' },
    { name: 'Pinterest', icon: 'fab fa-pinterest', color: 'from-red-500 to-pink-500' },
    { name: 'Threads', icon: 'fas fa-at', color: 'from-gray-700 to-gray-800' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl p-8 lg:p-12 text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-indigo-50/50 rounded-3xl"></div>
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <Download className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Selamat Datang
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Platform downloader terlengkap untuk mengunduh video, audio, dan file dari berbagai platform sosial media. 
            <span className="font-semibold text-purple-600"> Cepat, mudah, dan gratis!</span>
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-4 bg-white/50 rounded-xl border border-gray-200/50 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <feature.icon className="w-8 h-8 mx-auto mb-2 text-purple-600 group-hover:text-purple-700 transition-colors" />
                <div className="font-bold text-gray-800 text-sm">{feature.title}</div>
                <div className="text-xs text-gray-500">{feature.desc}</div>
              </div>
            ))}
          </div>

          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Sparkles className="w-5 h-5" />
            <span>Pilih Platform untuk Memulai</span>
          </div>
        </div>
      </div>

      {/* Supported Platforms */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Platform yang Didukung</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {platforms.map((platform, index) => (
            <div 
              key={index}
              className="group text-center p-4 rounded-xl hover:bg-white/50 transition-all duration-300 hover:scale-110"
            >
              <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <i className={`${platform.icon} text-white text-lg`}></i>
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
