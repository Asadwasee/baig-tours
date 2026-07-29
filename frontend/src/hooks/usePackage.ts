// hooks/usePackage.ts
'use client';

import { useState, useEffect } from 'react';
import { getPackageById } from '@/services/packages';
import { Package } from '@/types/package';

export function usePackage(id: string | undefined) {
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('No package ID provided');
      return;
    }

    async function fetchPackage() {
      setLoading(true);
      setError(null);
      try {
        console.log('🔄 Fetching package with ID:', id);
        const data = await getPackageById(id as string);
        console.log('✅ Package data:', data);
        console.log('✅ Price:', data?.price);
        console.log('✅ Title:', data?.title);
        
        setPackageData(data);
      } catch (err: any) {
        console.error('❌ Error fetching package:', err);
        setError(err.message || 'Failed to fetch package details');
        setPackageData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPackage();
  }, [id]);

  return { package: packageData, loading, error };
}