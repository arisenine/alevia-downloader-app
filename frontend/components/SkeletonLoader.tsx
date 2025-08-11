import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

export const PlatformCardSkeleton: React.FC = () => (
  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
    <div className="flex items-center space-x-3">
      <Skeleton className="w-8 h-8 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  </div>
);

export const DownloaderCardSkeleton: React.FC = () => (
  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
    <div className="flex items-start space-x-3">
      <Skeleton className="w-10 h-10 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  </div>
);

export const ResultsSkeleton: React.FC = () => (
  <div className="space-y-4">
    <div className="text-center space-y-3">
      <Skeleton className="h-6 w-1/2 mx-auto" />
      <Skeleton className="h-48 w-full max-w-sm mx-auto rounded-lg" />
      <div className="flex justify-center space-x-2">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  </div>
);

export const HistoryItemSkeleton: React.FC = () => (
  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3 flex-1">
        <Skeleton className="w-8 h-8 rounded-md" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="w-6 h-6 rounded" />
    </div>
  </div>
);
