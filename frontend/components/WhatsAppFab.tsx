import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function WhatsAppFab() {
  return (
    <motion.a
      href="https://wa.me/6283151573179?text=.menu"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 rounded-2xl shadow-2xl flex items-center justify-center text-white smooth-transition hover:scale-110 z-50 group gpu-accelerated"
      title="Contact WhatsApp Bot"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5
      }}
      whileHover={{ 
        scale: 1.1,
        rotate: 5,
        boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 smooth-transform" />
      </motion.div>
      
      <motion.div 
        className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 360]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-3 h-3 text-white" />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/0 to-emerald-500/0 group-hover:from-green-400/20 group-hover:to-emerald-500/20 smooth-transition"
        whileHover={{
          background: "linear-gradient(45deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))"
        }}
      />
      
      {/* Floating Animation */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ y: [0, -3, 0] }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.a>
  );
}
