import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Mail, Globe, Sparkles, Star } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-yellow-200/50 dark:border-gray-700/50 mt-16 glass-effect"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
              <motion.h3 
                className="text-2xl font-black text-gradient-primary"
                whileHover={{ scale: 1.05 }}
              >
                LEVTOOLS
              </motion.h3>
            </div>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              The most comprehensive downloader platform for downloading videos, audio, and files from various social media platforms. 
              <motion.span 
                className="font-semibold text-gradient-secondary"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Fast, easy, and free forever!
              </motion.span>
            </motion.p>
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-yellow-400 hover:to-orange-500 dark:hover:from-yellow-500 dark:hover:to-orange-500 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white smooth-transition hover:scale-110 shadow-xl"
                title="GitHub"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:contact@levtools.com"
                className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-green-400 hover:to-emerald-500 dark:hover:from-green-500 dark:hover:to-emerald-500 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white smooth-transition hover:scale-110 shadow-xl"
                title="Email"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://levtools.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-purple-400 hover:to-indigo-500 dark:hover:from-purple-500 dark:hover:to-indigo-500 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white smooth-transition hover:scale-110 shadow-xl"
                title="Website"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.h4 
              className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-yellow-500" />
              </motion.div>
              <span>Key Features</span>
            </motion.h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              {[
                "Download videos without watermark",
                "Support 10+ popular platforms", 
                "Batch download for efficiency",
                "Automatic download history",
                "Responsive & modern interface",
                "Free forever"
              ].map((feature, index) => (
              <motion.li 
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                <span>Download videos without watermark</span>
              </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <motion.h4 
              className="text-xl font-bold text-gray-900 dark:text-white"
              whileHover={{ scale: 1.05 }}
            >
              Supported Platforms
            </motion.h4>
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
                <motion.div 
                  key={index} 
                  className={`px-3 py-2 bg-gradient-to-r ${platform.color.replace('bg-', 'from-')} to-${platform.color.split('-')[1]}-600 rounded-xl text-white text-sm font-semibold text-center shadow-xl hover:scale-110 smooth-transition gpu-accelerated`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {platform.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-200/50 dark:border-gray-700/50 mt-12 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>© {currentYear} LEVTOOLS. Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>by</span>
              <motion.span 
                className="font-bold text-gradient-primary"
                whileHover={{ scale: 1.05 }}
              >
                Levi Setiadi
              </motion.span>
            </div>
            <div className="flex items-center space-x-8 text-gray-600 dark:text-gray-400">
              <motion.a 
                href="#" 
                className="hover:text-yellow-600 dark:hover:text-yellow-400 smooth-transition font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-yellow-600 dark:hover:text-yellow-400 smooth-transition font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                Terms of Service
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-yellow-600 dark:hover:text-yellow-400 smooth-transition font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                FAQ
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
