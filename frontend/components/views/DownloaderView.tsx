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
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToPlatforms}
          className="bg-white/70 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 hover:shadow-lg transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-xl p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <i className={`${platform.icon} text-white text-2xl`}></i>
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-800">{downloader.name}</h2>
            <p className="text-gray-600">{downloader.instructions}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <Input
              type="url"
              placeholder={downloader.inputPlaceholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-14 text-lg bg-white/50 border-gray-200/50 focus:bg-white/80 focus:border-purple-300 transition-all duration-300"
              disabled={downloadMutation.isPending}
            />
            
            <Button
              onClick={handleDownload}
              disabled={downloadMutation.isPending || !url.trim()}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {downloadMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-3" />
                  Unduh Sekarang
                </>
              )}
            </Button>
          </div>

          <div className="bg-white/50 rounded-2xl border border-gray-200/50 p-6 min-h-[200px]">
            {downloadMutation.isPending ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-purple-600" />
                  <p className="text-gray-600 font-medium">Memproses permintaan...</p>
                </div>
              </div>
            ) : results ? (
              <DownloadResults 
                results={results} 
                downloaderId={downloader.id}
              />
            ) : (
              <div className="flex items-center justify-center h-32">
                <p className="text-gray-500 text-center">
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
