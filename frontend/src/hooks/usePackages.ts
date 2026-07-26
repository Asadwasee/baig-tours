// hooks/usePackages.ts
'use client';

import { useState, useEffect } from 'react';
import { getPackages } from '@/services/packages';
import { Package } from '@/types/package';

interface UsePackagesOptions {
  featured?: boolean;
  upcoming?: boolean;
  destination?: string;
  category?: string;
  limit?: number;
  autoFetch?: boolean;
}

export function usePackages(options: UsePackagesOptions = {}) {
  const { 
    featured, 
    upcoming, 
    destination, 
    category, 
    limit = 6,
    autoFetch = true 
  } = options;

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      if (featured) queryParams.append('isFeatured', 'true');
      if (upcoming) queryParams.append('isUpcoming', 'true');
      if (destination) queryParams.append('destination', destination);
      if (category) queryParams.append('category', category);
      if (limit) queryParams.append('limit', String(limit));
      
      const query = queryParams.toString();
      const data = await getPackages(query ? `?${query}` : '');
      setPackages(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch packages');
      console.error('Error fetching packages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchPackages();
    }
  }, [featured, upcoming, destination, category, limit]);

  return { packages, loading, error, refetch: fetchPackages };
}