import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/6283151573179?text=.menu"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-2xl shadow-2xl shadow-green-500/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-3xl hover:shadow-green-500/50 z-50 group"
      title="Hubungi Bot WhatsApp"
    >
      <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-pulse">
        <Sparkles className="w-3 h-3 text-white" />
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/0 to-emerald-500/0 group-hover:from-green-400/20 group-hover:to-emerald-500/20 transition-all duration-300"></div>
    </a>
  );
}
