'use client';

import { useEffect } from 'react';

// Simplified performance monitoring
export const PerformanceMonitor = () => {
  useEffect(() => {
    // Basic performance logging
    const logPerformance = () => {
      if (process.env.NODE_ENV === 'development') {
        // Log basic navigation timing
        if ('performance' in window && 'timing' in performance) {
          const timing = performance.timing;
          const loadTime = timing.loadEventEnd - timing.navigationStart;
          const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;

          console.log('🚀 Page Load Performance:', {
            'Total Load Time': `${loadTime}ms`,
            'DOM Ready': `${domReady}ms`,
            'Time to First Byte': `${timing.responseStart - timing.requestStart}ms`,
          });
        }
      }
    };

    // Log performance on page load
    if (document.readyState === 'complete') {
      logPerformance();
    } else {
      window.addEventListener('load', logPerformance);
      return () => window.removeEventListener('load', logPerformance);
    }
  }, []);

  return null; // This component doesn't render anything
};