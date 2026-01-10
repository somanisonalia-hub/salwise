'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    webVitals?: any;
    gtag?: (...args: any[]) => void;
  }
}

export const PerformanceMonitor = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Basic performance monitoring without web-vitals for now
    // Navigation timing for page load performance
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation && window.gtag) {
            window.gtag('event', 'page_load_complete', {
              value: Math.round(navigation.loadEventEnd - navigation.fetchStart),
              event_category: 'Performance',
              non_interaction: true,
            });
          }
        }, 0);
      });
    }
  }, []);

  // Only render on client-side to avoid hydration issues
  if (!isClient) {
    return null;
  }

  return null; // This component doesn't render anything visible
};