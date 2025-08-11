export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateUrl = (url: string): ValidationResult => {
  if (!url || !url.trim()) {
    return { isValid: false, error: 'URL tidak boleh kosong' };
  }

  const trimmedUrl = url.trim();

  try {
    new URL(trimmedUrl);
  } catch {
    return { isValid: false, error: 'Format URL tidak valid' };
  }

  if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
    return { isValid: false, error: 'URL harus dimulai dengan http:// atau https://' };
  }

  return { isValid: true };
};

export const validatePlatformUrl = (url: string, platformId: string): ValidationResult => {
  const baseValidation = validateUrl(url);
  if (!baseValidation.isValid) {
    return baseValidation;
  }

  const platformDomains: Record<string, string[]> = {
    tiktok: ['tiktok.com', 'vm.tiktok.com'],
    instagram: ['instagram.com', 'instagr.am'],
    youtube: ['youtube.com', 'youtu.be', 'm.youtube.com'],
    twitter: ['twitter.com', 'x.com', 't.co'],
    facebook: ['facebook.com', 'fb.watch', 'm.facebook.com'],
    spotify: ['spotify.com', 'open.spotify.com'],
    pinterest: ['pinterest.com', 'pin.it'],
    mediafire: ['mediafire.com'],
    terabox: ['terabox.com', '1024terabox.com'],
    sfilemobi: ['sfilemobi.com']
  };

  const domains = platformDomains[platformId];
  if (domains) {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    const isValidDomain = domains.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );

    if (!isValidDomain) {
      return { 
        isValid: false, 
        error: `URL harus dari domain: ${domains.join(', ')}` 
      };
    }
  }

  return { isValid: true };
};

export const validateBatchUrls = (urls: string[]): { validUrls: string[]; errors: string[] } => {
  const validUrls: string[] = [];
  const errors: string[] = [];

  urls.forEach((url, index) => {
    const validation = validateUrl(url);
    if (validation.isValid) {
      validUrls.push(url.trim());
    } else {
      errors.push(`URL ${index + 1}: ${validation.error}`);
    }
  });

  return { validUrls, errors };
};
