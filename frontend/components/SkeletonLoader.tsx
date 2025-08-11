import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = React.memo(({ className = '' }) => (
  <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl ${className}`} />
));

Skeleton.displayName = 'Skeleton';

export const PlatformCardSkeleton: React.FC = React.memo(() => (
  <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
    <div className="flex items-center space-x-4">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  </div>
));

PlatformCardSkeleton.displayName = 'PlatformCardSkeleton';

export const DownloaderCardSkeleton: React.FC = React.memo(() => (
  <div className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
    <div className="flex items-start space-x-4">
      <Skeleton className="w-16 h-16 rounded-2xl" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  </div>
));

DownloaderCardSkeleton.displayName = 'DownloaderCardSkeleton';

export const ResultsSkeleton: React.FC = React.memo(() => (
  <div className="space-y-6">
    <div className="text-center space-y-4">
      <Skeleton className="h-8 w-1/2 mx-auto" />
      <Skeleton className="h-64 w-full max-w-md mx-auto rounded-2xl" />
      <div className="flex justify-center space-x-3">
        <Skeleton className="h-12 w-36 rounded-2xl" />
        <Skeleton className="h-12 w-36 rounded-2xl" />
      </div>
    </div>
  </div>
));

ResultsSkeleton.displayName = 'ResultsSkeleton';

export const HistoryItemSkeleton: React.FC = React.memo(() => (
  <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex space-x-2">
        <Skeleton className="w-8 h-8 rounded-xl" />
        <Skeleton className="w-8 h-8 rounded-xl" />
        <Skeleton className="w-8 h-8 rounded-xl" />
      </div>
    </div>
  </div>
));

HistoryItemSkeleton.displayName = 'HistoryItemSkeleton';

export const WelcomeViewSkeleton: React.FC = React.memo(() => (
  <div className="space-y-8">
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-8 lg:p-12 text-center">
      <Skeleton className="w-20 h-20 mx-auto mb-8 rounded-3xl" />
      <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
      <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-4" />
      <Skeleton className="h-6 w-2/3 max-w-3xl mx-auto mb-8" />
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Skeleton className="h-12 w-48 rounded-2xl" />
        <Skeleton className="h-12 w-48 rounded-2xl" />
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 bg-white/80 dark:bg-gray-700/80 rounded-2xl">
            <Skeleton className="w-12 h-12 mx-auto mb-4 rounded-xl" />
            <Skeleton className="h-5 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="text-center p-6 rounded-2xl">
            <Skeleton className="w-10 h-10 mx-auto mb-3 rounded-xl" />
            <Skeleton className="h-6 w-16 mx-auto mb-1" />
            <Skeleton className="h-4 w-20 mx-auto" />
          </div>
        ))}
      </div>
    </div>
    
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-8">
      <div className="text-center mb-8">
        <Skeleton className="h-8 w-64 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 mx-auto" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="text-center p-6 rounded-2xl">
            <Skeleton className="w-14 h-14 mx-auto mb-4 rounded-2xl" />
            <Skeleton className="h-4 w-16 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  </div>
));

WelcomeViewSkeleton.displayName = 'WelcomeViewSkeleton';

export const BatchDownloaderSkeleton: React.FC = React.memo(() => (
  <div className="space-y-6">
    <div className="space-y-4">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-12 w-40 rounded-2xl" />
    </div>
    
    <div className="space-y-6">
      <Skeleton className="h-6 w-64" />
      <div className="space-y-3">
        <Skeleton className="h-3 w-full rounded-full" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <div className="flex space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl border">
            <div className="flex items-center space-x-4 flex-1">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>
            <Skeleton className="w-8 h-8 rounded-xl" />
          </div>
        ))}
      </div>
      
      <Skeleton className="h-14 w-full rounded-2xl" />
    </div>
  </div>
));

BatchDownloaderSkeleton.displayName = 'BatchDownloaderSkeleton';
