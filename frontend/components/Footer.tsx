import React from 'react';
import { Heart, Github, Mail, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">LEVTOOLS</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Platform downloader terlengkap untuk mengunduh video, audio, dan file dari berbagai platform sosial media. Cepat, mudah, dan gratis!
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@levtools.com"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://levtools.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Fitur Utama</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Download video tanpa watermark</li>
              <li>• Support 10+ platform populer</li>
              <li>• Batch download untuk efisiensi</li>
              <li>• Riwayat download otomatis</li>
              <li>• Interface responsif & modern</li>
              <li>• Gratis selamanya</li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Platform Didukung</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div>TikTok</div>
              <div>Instagram</div>
              <div>YouTube</div>
              <div>Twitter/X</div>
              <div>Facebook</div>
              <div>Spotify</div>
              <div>Pinterest</div>
              <div>Threads</div>
              <div>Mediafire</div>
              <div>Terabox</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear} LEVTOOLS. Dibuat dengan</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>oleh Levi Setiadi</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Syarat Layanan
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
