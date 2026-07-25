// src/hooks/useSettings.ts
'use client';

import { useState, useEffect } from 'react';
import { getSettings, SettingsData } from '@/services/settings';

export function useSettings() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSettings();
        console.log('✅ Settings loaded:', data);
        setSettings(data);
      } catch (err: any) {
        console.error('❌ Error fetching settings:', err);
        setError(err.message || 'Failed to fetch settings');
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  return { settings, loading, error };
}