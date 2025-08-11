import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/6283151573179?text=.menu"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-3xl z-50 group"
      title="Hubungi Bot WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
    </a>
  );
}
