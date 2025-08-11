import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from './components/ThemeProvider';
import AppInner from './components/AppInner';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppInner />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
