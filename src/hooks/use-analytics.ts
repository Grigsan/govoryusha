"use client";

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'govoryusha_analytics';

export function useAnalytics() {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setStats(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse analytics', e);
      }
    }
  }, []);

  const trackClick = (id: string) => {
    const updated = { ...stats, [id]: (stats[id] || 0) + 1 };
    setStats(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const getFrequentIds = (limit = 5) => {
    return Object.entries(stats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([id]) => id);
  };

  return { stats, trackClick, getFrequentIds };
}



