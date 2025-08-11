export interface QueueItem {
  downloadId: string;
  url: string;
  platform: string;
  downloader: string;
  title?: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
  priority: 'low' | 'normal' | 'high';
  progress?: number;
  bytesDownloaded?: number;
  totalBytes?: number;
  speed?: number;
  timeRemaining?: number;
  error?: string;
  timestamp: number;
  estimatedSize?: number;
  quality?: string;
}

const QUEUE_STORAGE_KEY = 'levtools_download_queue';

export const getDownloadQueue = (): QueueItem[] => {
  try {
    const stored = localStorage.getItem(QUEUE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get download queue:', error);
    return [];
  }
};

export const addToQueue = (item: Omit<QueueItem, 'timestamp'>) => {
  try {
    const queue = getDownloadQueue();
    const newItem: QueueItem = {
      ...item,
      timestamp: Date.now()
    };
    
    // Remove any existing item with the same downloadId
    const filteredQueue = queue.filter(q => q.downloadId !== item.downloadId);
    
    // Add new item and sort by priority and timestamp
    const updatedQueue = [...filteredQueue, newItem].sort((a, b) => {
      const priorityOrder = { high: 3, normal: 2, low: 1 };
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority; // Higher priority first
      }
      
      return a.timestamp - b.timestamp; // Earlier timestamp first for same priority
    });
    
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(updatedQueue));
  } catch (error) {
    console.error('Failed to add to download queue:', error);
  }
};

export const updateQueueItem = (downloadId: string, updates: Partial<QueueItem>) => {
  try {
    const queue = getDownloadQueue();
    const updatedQueue = queue.map(item => 
      item.downloadId === downloadId 
        ? { ...item, ...updates }
        : item
    );
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(updatedQueue));
  } catch (error) {
    console.error('Failed to update queue item:', error);
  }
};

export const removeFromQueue = (downloadId: string) => {
  try {
    const queue = getDownloadQueue();
    const updatedQueue = queue.filter(item => item.downloadId !== downloadId);
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(updatedQueue));
  } catch (error) {
    console.error('Failed to remove from queue:', error);
  }
};

export const clearQueue = () => {
  try {
    localStorage.removeItem(QUEUE_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear queue:', error);
  }
};

export const getQueueByStatus = (status: QueueItem['status']): QueueItem[] => {
  return getDownloadQueue().filter(item => item.status === status);
};

export const getQueueByPriority = (priority: QueueItem['priority']): QueueItem[] => {
  return getDownloadQueue().filter(item => item.priority === priority);
};
