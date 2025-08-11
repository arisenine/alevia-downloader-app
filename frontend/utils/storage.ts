export interface DownloadHistoryItem {
  id: string;
  url: string;
  platform: string;
  downloader: string;
  timestamp: number;
  success: boolean;
  title?: string;
}

export interface UserPreferences {
  favoritePlatforms: string[];
  theme: 'light' | 'dark';
  batchSize: number;
}

const STORAGE_KEYS = {
  DOWNLOAD_HISTORY: 'alevia_download_history',
  USER_PREFERENCES: 'alevia_user_preferences',
} as const;

export const getDownloadHistory = (): DownloadHistoryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DOWNLOAD_HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addToDownloadHistory = (item: Omit<DownloadHistoryItem, 'id' | 'timestamp'>) => {
  try {
    const history = getDownloadHistory();
    const newItem: DownloadHistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    
    const updatedHistory = [newItem, ...history.slice(0, 99)]; // Keep last 100 items
    localStorage.setItem(STORAGE_KEYS.DOWNLOAD_HISTORY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to save download history:', error);
  }
};

export const clearDownloadHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.DOWNLOAD_HISTORY);
  } catch (error) {
    console.error('Failed to clear download history:', error);
  }
};

export const getUserPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return stored ? JSON.parse(stored) : {
      favoritePlatforms: [],
      theme: 'light',
      batchSize: 5,
    };
  } catch {
    return {
      favoritePlatforms: [],
      theme: 'light',
      batchSize: 5,
    };
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
  const preferences = getUserPreferences();
  const favorites = preferences.favoritePlatforms;
  const index = favorites.indexOf(platformId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(platformId);
  }
  
  updateUserPreferences({ favoritePlatforms: favorites });
};
