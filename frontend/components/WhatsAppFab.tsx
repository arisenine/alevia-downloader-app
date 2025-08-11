import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/6283151573179?text=.menu"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-xl z-50 group"
      title="Hubungi Bot WhatsApp"
    >
      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
    </a>
  );
}
