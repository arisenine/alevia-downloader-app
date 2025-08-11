import React from 'react';
import { Heart, Github, Mail, Globe, Sparkles, Star } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-yellow-200 dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                LEVTOOLS
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The most comprehensive downloader platform for downloading videos, audio, and files from various social media platforms. 
              <span className="font-semibold text-yellow-600 dark:text-yellow-400"> Fast, easy, and free forever!</span>
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-yellow-500 dark:hover:bg-yellow-500 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@levtools.com"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-green-500 dark:hover:bg-green-500 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://levtools.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-purple-500 dark:hover:bg-purple-500 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                title="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Key Features</span>
            </h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Download videos without watermark</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Support 10+ popular platforms</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Batch download for efficiency</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Automatic download history</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Responsive & modern interface</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Free forever</span>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Supported Platforms</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'TikTok', color: 'bg-pink-500' },
                { name: 'Instagram', color: 'bg-purple-500' },
                { name: 'YouTube', color: 'bg-red-500' },
                { name: 'Twitter/X', color: 'bg-blue-500' },
                { name: 'Facebook', color: 'bg-blue-600' },
                { name: 'Spotify', color: 'bg-green-500' },
                { name: 'Pinterest', color: 'bg-red-500' },
                { name: 'Threads', color: 'bg-gray-600' },
                { name: 'Mediafire', color: 'bg-blue-500' },
                { name: 'Terabox', color: 'bg-purple-500' }
              ].map((platform, index) => (
                <div key={index} className={`px-3 py-2 ${platform.color} rounded-xl text-white text-sm font-semibold text-center shadow-lg hover:scale-105 transition-transform duration-300`}>
                  {platform.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>© {currentYear} LEVTOOLS. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>by</span>
              <span className="font-bold text-yellow-600 dark:text-yellow-400">
                Levi Setiadi
              </span>
            </div>
            <div className="flex items-center space-x-8 text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium">
                Terms of Service
              </a>
              <a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
