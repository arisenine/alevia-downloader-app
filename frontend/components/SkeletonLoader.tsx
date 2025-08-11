import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl ${className}`} />
);

export const PlatformCardSkeleton: React.FC = () => (
  <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
    <div className="flex items-center space-x-4">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  </div>
);

export const DownloaderCardSkeleton: React.FC = () => (
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
);

export const ResultsSkeleton: React.FC = () => (
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
);

export const HistoryItemSkeleton: React.FC = () => (
  <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="w-8 h-8 rounded-xl" />
    </div>
  </div>
);
