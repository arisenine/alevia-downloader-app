import { toast } from '@/components/ui/use-toast';

export interface AppError {
  code: string;
  message: string;
  details?: any;
  retryable?: boolean;
}

export const createError = (code: string, message: string, details?: any, retryable = false): AppError => ({
  code,
  message,
  details,
  retryable
});

export const handleApiError = (error: any): AppError => {
  console.error('API Error:', error);

  if (error?.response?.status === 429) {
    return createError(
      'RATE_LIMIT',
      'Terlalu banyak permintaan. Silakan tunggu sebentar dan coba lagi.',
      error,
      true
    );
  }

  if (error?.response?.status >= 500) {
    return createError(
      'SERVER_ERROR',
      'Server sedang mengalami masalah. Silakan coba lagi nanti.',
      error,
      true
    );
  }

  if (error?.response?.status === 404) {
    return createError(
      'NOT_FOUND',
      'Konten tidak ditemukan atau URL tidak valid.',
      error,
      false
    );
  }

  if (error?.code === 'NETWORK_ERROR' || !navigator.onLine) {
    return createError(
      'NETWORK_ERROR',
      'Tidak ada koneksi internet. Periksa koneksi Anda.',
      error,
      true
    );
  }

  return createError(
    'UNKNOWN_ERROR',
    error?.message || 'Terjadi kesalahan yang tidak diketahui.',
    error,
    true
  );
};

export const showErrorToast = (error: AppError) => {
  toast({
    title: "Error",
    description: error.message,
    variant: "destructive",
  });
};

export const showSuccessToast = (message: string) => {
  toast({
    title: "Berhasil!",
    description: message,
  });
};

export const showInfoToast = (message: string) => {
  toast({
    description: message,
  });
};
