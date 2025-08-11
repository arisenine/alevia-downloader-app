import { api } from "encore.dev/api";

interface ProgressRequest {
  downloadId: string;
}

interface ProgressResponse {
  downloadId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress: number; // 0-100
  bytesDownloaded?: number;
  totalBytes?: number;
  speed?: number; // bytes per second
  timeRemaining?: number; // seconds
  error?: string;
}

// Mock progress tracking - in a real implementation, this would track actual download progress
const progressStore = new Map<string, ProgressResponse>();

// Get download progress
export const getProgress = api<ProgressRequest, ProgressResponse>(
  { expose: true, method: "GET", path: "/download/:downloadId/progress" },
  async (req) => {
    const progress = progressStore.get(req.downloadId);
    
    if (!progress) {
      return {
        downloadId: req.downloadId,
        status: 'failed',
        progress: 0,
        error: 'Download not found'
      };
    }

    return progress;
  }
);

// Cancel download
export const cancelDownload = api<ProgressRequest, { success: boolean; message: string }>(
  { expose: true, method: "POST", path: "/download/:downloadId/cancel" },
  async (req) => {
    const progress = progressStore.get(req.downloadId);
    
    if (!progress) {
      return {
        success: false,
        message: 'Download not found'
      };
    }

    if (progress.status === 'completed') {
      return {
        success: false,
        message: 'Cannot cancel completed download'
      };
    }

    progressStore.set(req.downloadId, {
      ...progress,
      status: 'cancelled',
      progress: 0
    });

    return {
      success: true,
      message: 'Download cancelled successfully'
    };
  }
);

// Simulate progress updates (in real implementation, this would be handled by the download process)
export const updateProgress = (downloadId: string, update: Partial<ProgressResponse>) => {
  const current = progressStore.get(downloadId) || {
    downloadId,
    status: 'queued' as const,
    progress: 0
  };
  
  progressStore.set(downloadId, { ...current, ...update });
};

// Initialize progress tracking for a new download
export const initializeProgress = (downloadId: string, totalBytes?: number) => {
  progressStore.set(downloadId, {
    downloadId,
    status: 'queued',
    progress: 0,
    totalBytes,
    bytesDownloaded: 0,
    speed: 0
  });
};
