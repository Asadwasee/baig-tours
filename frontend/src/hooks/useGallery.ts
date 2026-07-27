// hooks/useGallery.ts
'use client';

import { useState, useEffect } from 'react';
import { getGalleryMedia, getGalleryStats, GalleryMedia, GalleryStats } from '@/services/gallery';

interface UseGalleryOptions {
  category?: 'domestic' | 'international' | 'customer-memories';
  mediaType?: 'image' | 'video';
  limit?: number;
  autoFetch?: boolean;
}

export function useGallery(options: UseGalleryOptions = {}) {
  const { category, mediaType, limit = 12, autoFetch = true } = options;
  
  const [media, setMedia] = useState<GalleryMedia[]>([]);
  const [stats, setStats] = useState<GalleryStats | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Fetching gallery with:', { category, mediaType, limit });
      
      const [mediaData, statsData] = await Promise.all([
        getGalleryMedia({ category, mediaType, limit }),
        getGalleryStats()
      ]);
      
      console.log('✅ Gallery media received:', mediaData);
      console.log('✅ Gallery stats received:', statsData);
      
      setMedia(Array.isArray(mediaData) ? mediaData : []);
      setStats(statsData);
    } catch (err: any) {
      console.error('❌ Error fetching gallery:', err);
      setError(err.message || 'Failed to fetch gallery');
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchGallery();
    }
  }, [category, mediaType, limit]);

  return { media, stats, loading, error, refetch: fetchGallery };
}