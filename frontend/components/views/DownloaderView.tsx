import React, { useState } from 'react';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { Platform, Downloader } from '../AppInner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import backend from '~backend/client';
import DownloadResults from '../DownloadResults';

interface DownloaderViewProps {
  downloader: Downloader;
  platform: Platform;
  onBackToPlatforms: () => void;
}

export default function DownloaderView({ downloader, platform, onBackToPlatforms }: DownloaderViewProps) {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const downloadMutation = useMutation({
    mutationFn: async (downloadUrl: string) => {
      const response = await backend.downloader.download({
        url: downloadUrl,
        platform: platform.id,
        type: downloader.id.replace(`${platform.id}`, '').replace(/^-/, '') || 'default'
      });
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        setResults(data.data);
        toast({
          title: "Berhasil!",
          description: "Data berhasil diproses. Silakan unduh file yang tersedia.",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Terjadi kesalahan saat memproses permintaan.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memproses permintaan.",
        variant: "destructive",
      });
    }
  });

  const handleDownload = () => {
    if (!url.trim()) {
      toast({
        title: "URL Diperlukan",
        description: "Silakan masukkan URL yang valid.",
        variant: "destructive",
      });
      return;
    }

    setResults(null);
    downloadMutation.mutate(url.trim());
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToPlatforms}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
            <i className={`${platform.icon} text-white text-xl`}></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{downloader.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{downloader.instructions}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Input
              type="url"
              placeholder={downloader.inputPlaceholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-12 text-base bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:bg-white dark:focus:bg-gray-600 focus:border-blue-300 dark:focus:border-blue-500 transition-all duration-300"
              disabled={downloadMutation.isPending}
            />
            
            <Button
              onClick={handleDownload}
              disabled={downloadMutation.isPending || !url.trim()}
              className="w-full h-12 text-base font-semibold bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
            >
              {downloadMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Unduh Sekarang
                </>
              )}
            </Button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 min-h-[150px] transition-all duration-300">
            {downloadMutation.isPending ? (
              <div className="flex items-center justify-center h-24">
                <div className="text-center">
                  <Loader2 className="w-6 h-6 mx-auto mb-3 animate-spin text-blue-600 dark:text-blue-400" />
                  <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">Memproses permintaan...</p>
                </div>
              </div>
            ) : results ? (
              <DownloadResults 
                results={results} 
                downloaderId={downloader.id}
              />
            ) : (
              <div className="flex items-center justify-center h-24">
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                  Masukkan URL di atas dan klik "Unduh Sekarang" untuk memulai.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
