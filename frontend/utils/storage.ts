export interface DownloadHistoryItem {
  id: string;
  url: string;
  platform: string;
  downloader: string;
  timestamp: number;
  success: boolean;
  title?: string;
  fileSize?: string;
  duration?: string;
}

export interface UserPreferences {
  favoritePlatforms: string[];
  theme: 'light' | 'dark';
  batchSize: number;
  autoSaveHistory: boolean;
  maxHistoryItems: number;
}

export interface QuickAccessItem {
  id: string;
  url: string;
  platform: string;
  downloader: string;
  title?: string;
  timestamp: number;
}

const STORAGE_KEYS = {
  DOWNLOAD_HISTORY: 'levtools_download_history',
  USER_PREFERENCES: 'levtools_user_preferences',
  QUICK_ACCESS: 'levtools_quick_access',
} as const;

const DEFAULT_PREFERENCES: UserPreferences = {
  favoritePlatforms: [],
  theme: 'light',
  batchSize: 5,
  autoSaveHistory: true,
  maxHistoryItems: 100,
};

// Download History Management
export const getDownloadHistory = (): DownloadHistoryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DOWNLOAD_HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get download history:', error);
    return [];
  }
};

export const addToDownloadHistory = (item: Omit<DownloadHistoryItem, 'id' | 'timestamp'>) => {
  try {
    const preferences = getUserPreferences();
    if (!preferences.autoSaveHistory) return;

    const history = getDownloadHistory();
    const newItem: DownloadHistoryItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    
    // Remove duplicates based on URL and platform
    const filteredHistory = history.filter(
      h => !(h.url === item.url && h.platform === item.platform)
    );
    
    const updatedHistory = [newItem, ...filteredHistory.slice(0, preferences.maxHistoryItems - 1)];
    localStorage.setItem(STORAGE_KEYS.DOWNLOAD_HISTORY, JSON.stringify(updatedHistory));
    
    // Also add to quick access if successful
    if (item.success) {
      addToQuickAccess({
        url: item.url,
        platform: item.platform,
        downloader: item.downloader,
        title: item.title,
      });
    }
  } catch (error) {
    console.error('Failed to save download history:', error);
  }
};

export const removeFromDownloadHistory = (itemId: string) => {
  try {
    const history = getDownloadHistory();
    const updatedHistory = history.filter(item => item.id !== itemId);
    localStorage.setItem(STORAGE_KEYS.DOWNLOAD_HISTORY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to remove from download history:', error);
  }
};

export const clearDownloadHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.DOWNLOAD_HISTORY);
  } catch (error) {
    console.error('Failed to clear download history:', error);
  }
};

export const getHistoryByPlatform = (platformId: string): DownloadHistoryItem[] => {
  return getDownloadHistory().filter(item => item.platform === platformId);
};

export const getRecentDownloads = (limit: number = 10): DownloadHistoryItem[] => {
  return getDownloadHistory()
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
};

export const getSuccessfulDownloads = (): DownloadHistoryItem[] => {
  return getDownloadHistory().filter(item => item.success);
};

// User Preferences Management
export const getUserPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
  } catch (error) {
    console.error('Failed to get user preferences:', error);
    return DEFAULT_PREFERENCES;
  }
};

export const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
  try {
    const current = getUserPreferences();
    const updated = { ...current, ...preferences };
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save user preferences:', error);
  }
};

export const toggleFavoritePlatform = (platformId: string) => {
  try {
    const preferences = getUserPreferences();
    const favorites = [...preferences.favoritePlatforms];
    const index = favorites.indexOf(platformId);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(platformId);
    }
    
    updateUserPreferences({ favoritePlatforms: favorites });
  } catch (error) {
    console.error('Failed to toggle favorite platform:', error);
  }
};

export const isFavoritePlatform = (platformId: string): boolean => {
  const preferences = getUserPreferences();
  return preferences.favoritePlatforms.includes(platformId);
};

// Quick Access Management
export const getQuickAccess = (): QuickAccessItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.QUICK_ACCESS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get quick access:', error);
    return [];
  }
};

export const addToQuickAccess = (item: Omit<QuickAccessItem, 'id' | 'timestamp'>) => {
  try {
    const quickAccess = getQuickAccess();
    const newItem: QuickAccessItem = {
      ...item,
      id: `qa-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    
    // Remove duplicates and keep only recent 20 items
    const filteredAccess = quickAccess.filter(
      qa => !(qa.url === item.url && qa.platform === item.platform)
    );
    
    const updatedAccess = [newItem, ...filteredAccess.slice(0, 19)];
    localStorage.setItem(STORAGE_KEYS.QUICK_ACCESS, JSON.stringify(updatedAccess));
  } catch (error) {
    console.error('Failed to save quick access:', error);
  }
};

export const removeFromQuickAccess = (itemId: string) => {
  try {
    const quickAccess = getQuickAccess();
    const updatedAccess = quickAccess.filter(item => item.id !== itemId);
    localStorage.setItem(STORAGE_KEYS.QUICK_ACCESS, JSON.stringify(updatedAccess));
  } catch (error) {
    console.error('Failed to remove from quick access:', error);
  }
};

export const clearQuickAccess = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.QUICK_ACCESS);
  } catch (error) {
    console.error('Failed to clear quick access:', error);
  }
};

// Analytics and Statistics
export const getDownloadStats = () => {
  const history = getDownloadHistory();
  const total = history.length;
  const successful = history.filter(h => h.success).length;
  const failed = total - successful;
  const successRate = total > 0 ? (successful / total) * 100 : 0;
  
  // Platform usage statistics
  const platformStats: Record<string, { total: number; successful: number }> = {};
  history.forEach(item => {
    if (!platformStats[item.platform]) {
      platformStats[item.platform] = { total: 0, successful: 0 };
    }
    platformStats[item.platform].total++;
    if (item.success) {
      platformStats[item.platform].successful++;
    }
  });
  
  // Most used platforms
  const mostUsedPlatforms = Object.entries(platformStats)
    .sort(([, a], [, b]) => b.total - a.total)
    .slice(0, 5);
  
  // Recent activity (last 7 days)
  const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  const recentActivity = history.filter(item => item.timestamp > weekAgo);
  
  return {
    total,
    successful,
    failed,
    successRate,
    platformStats,
    mostUsedPlatforms,
    recentActivity: recentActivity.length,
    averagePerDay: recentActivity.length / 7,
  };
};

// Data Export/Import
export const exportUserData = () => {
  try {
    const data = {
      history: getDownloadHistory(),
      preferences: getUserPreferences(),
      quickAccess: getQuickAccess(),
      exportDate: new Date().toISOString(),
      version: '1.0',
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `levtools-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export user data:', error);
    throw new Error('Failed to export data');
  }
};

export const importUserData = (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.history) {
          localStorage.setItem(STORAGE_KEYS.DOWNLOAD_HISTORY, JSON.stringify(data.history));
        }
        if (data.preferences) {
          localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(data.preferences));
        }
        if (data.quickAccess) {
          localStorage.setItem(STORAGE_KEYS.QUICK_ACCESS, JSON.stringify(data.quickAccess));
        }
        
        resolve();
      } catch (error) {
        reject(new Error('Invalid file format'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

// Storage cleanup
export const cleanupOldData = () => {
  try {
    const preferences = getUserPreferences();
    const history = getDownloadHistory();
    
    // Remove old history items beyond max limit
    if (history.length > preferences.maxHistoryItems) {
      const trimmedHistory = history
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, preferences.maxHistoryItems);
      localStorage.setItem(STORAGE_KEYS.DOWNLOAD_HISTORY, JSON.stringify(trimmedHistory));
    }
    
    // Remove old quick access items (keep only 30 days)
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const quickAccess = getQuickAccess();
    const recentQuickAccess = quickAccess.filter(item => item.timestamp > thirtyDaysAgo);
    localStorage.setItem(STORAGE_KEYS.QUICK_ACCESS, JSON.stringify(recentQuickAccess));
  } catch (error) {
    console.error('Failed to cleanup old data:', error);
  }
};

// Initialize cleanup on app start
if (typeof window !== 'undefined') {
  // Run cleanup once per day
  const lastCleanup = localStorage.getItem('levtools_last_cleanup');
  const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
  
  if (!lastCleanup || parseInt(lastCleanup) < oneDayAgo) {
    cleanupOldData();
    localStorage.setItem('levtools_last_cleanup', Date.now().toString());
  }
}
