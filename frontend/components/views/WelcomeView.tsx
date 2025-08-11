import React from 'react';
import { Download, Zap, Shield, Star, TrendingUp, Users, Clock, Sparkles, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WelcomeView = React.memo(() => {
  const features = [
    { icon: Download, title: 'Multi-Platform', desc: 'Support 10+ platform populer', color: 'from-blue-500 to-cyan-500', iconColor: 'text-blue-600' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Download dalam hitungan detik', color: 'from-yellow-500 to-orange-500', iconColor: 'text-yellow-600' },
    { icon: Shield, title: 'Secure & Safe', desc: 'Aman dan terpercaya 100%', color: 'from-green-500 to-emerald-500', iconColor: 'text-green-600' },
    { icon: Star, title: 'Premium Free', desc: 'Gratis selamanya tanpa batas', color: 'from-purple-500 to-pink-500', iconColor: 'text-purple-600' }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Users', color: 'from-blue-500 to-cyan-500', bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' },
    { icon: Download, value: '1M+', label: 'Downloads', color: 'from-green-500 to-emerald-500', bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' },
    { icon: TrendingUp, value: '99.9%', label: 'Success Rate', color: 'from-purple-500 to-pink-500', bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' },
    { icon: Clock, value: '24/7', label: 'Available', color: 'from-orange-500 to-red-500', bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20' }
  ];

  const platforms = [
    { name: 'TikTok', icon: 'fab fa-tiktok', color: 'from-pink-500 to-rose-500', bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20' },
    { name: 'Instagram', icon: 'fab fa-instagram', color: 'from-purple-500 to-pink-500', bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' },
    { name: 'YouTube', icon: 'fab fa-youtube', color: 'from-red-500 to-orange-500', bgColor: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: 'from-blue-400 to-cyan-400', bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' },
    { name: 'Facebook', icon: 'fab fa-facebook', color: 'from-blue-600 to-indigo-600', bgColor: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' },
    { name: 'Spotify', icon: 'fab fa-spotify', color: 'from-green-500 to-emerald-500', bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' },
    { name: 'Pinterest', icon: 'fab fa-pinterest', color: 'from-red-500 to-pink-500', bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20' },
    { name: 'Threads', icon: 'fab fa-threads', color: 'from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100', bgColor: 'from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-black/10 p-8 lg:p-12 text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.05),transparent_50%)]"></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight">
            Welcome to LevTools
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            Platform downloader terlengkap untuk mengunduh video, audio, dan file dari berbagai platform sosial media.
            <span className="block mt-2 font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Cepat, mudah, dan gratis selamanya!
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
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
                <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-gray-900 dark:text-white text-lg mb-2">{feature.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center p-6 bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-600/30 hover:scale-105 transition-all duration-300 shadow-lg`}>
                <div className={`w-10 h-10 mx-auto mb-3 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
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
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
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
              className={`group text-center p-6 bg-gradient-to-br ${platform.bgColor} rounded-2xl border border-white/50 dark:border-gray-600/30 hover:scale-105 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 cursor-pointer`}
            >
              <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <i className={`${platform.icon} text-xl text-white`}></i>
              </div>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold shadow-lg shadow-green-500/30">
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
