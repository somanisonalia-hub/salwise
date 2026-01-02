// Performance utilities for SalaryWise.io
import React from 'react';

export interface InputField {
  id: string;
  label: string;
  type: 'number' | 'text' | 'select';
  default: number | string;
  unit?: string;
  options?: string[];
}

// Utility to convert JSON inputs to proper types
export const convertInputs = (jsonInputs: any[]): InputField[] => {
  return jsonInputs.map(input => ({
    ...input,
    type: input.type as 'number' | 'text' | 'select',
  }));
};

export const PERFORMANCE_CONFIG = {
  // Web Vitals thresholds
  vitals: {
    FCP: 1800, // First Contentful Paint (ms)
    LCP: 2500, // Largest Contentful Paint (ms)
    FID: 100,  // First Input Delay (ms)
    CLS: 0.1,  // Cumulative Layout Shift
    TTFB: 800, // Time to First Byte (ms)
  },

  // Bundle size limits
  bundleSize: {
    main: 200 * 1024,      // 200KB
    vendor: 300 * 1024,    // 300KB
    total: 500 * 1024,     // 500KB
  },
};

// Performance monitoring utility
export const logPerformance = (metric: string, value: number, unit: string = 'ms') => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 Performance: ${metric} = ${value}${unit}`);
  }

  // In production, you could send this to analytics
  if (process.env.NODE_ENV === 'production') {
    // Example: sendToAnalytics('performance', { metric, value, unit });
  }
};

// Lazy loading helper with performance tracking
export const lazyLoad = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  componentName: string
) => {
  const startTime = performance.now();

  const LazyComponent = React.lazy(() =>
    importFunc().then((module) => {
      const loadTime = performance.now() - startTime;
      logPerformance(`${componentName} lazy load`, loadTime);
      return module;
    })
  );

  return LazyComponent;
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      usedPercent: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
    };
  }
  return null;
};

// Cache performance helper
export const createCache = <T>(maxSize: number = 100) => {
  const cache = new Map<string, T>();

  return {
    get: (key: string) => {
      if (cache.has(key)) {
        logPerformance(`Cache hit for ${key}`, 0);
        return cache.get(key);
      }
      logPerformance(`Cache miss for ${key}`, 0);
      return undefined;
    },
    set: (key: string, value: T) => {
      if (cache.size >= maxSize) {
        const firstKey = cache.keys().next().value;
        if (firstKey) {
          cache.delete(firstKey);
        }
      }
      cache.set(key, value);
    },
    clear: () => cache.clear(),
    size: () => cache.size,
  };
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  if ('IntersectionObserver' in window) {
    return new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, defaultOptions);
  }

  return null;
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);

  // Preload critical images (if any)
  // const imageLink = document.createElement('link');
  // imageLink.rel = 'preload';
  // imageLink.href = '/critical-image.webp';
  // imageLink.as = 'image';
  // document.head.appendChild(imageLink);
};

// Service Worker registration (for future caching)
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Performance budget checker
export const checkPerformanceBudget = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    resources.forEach((resource) => {
      // Check for large resources
      if (resource.transferSize > 500 * 1024) { // 500KB
        console.warn(`Large resource detected: ${resource.name} (${(resource.transferSize / 1024).toFixed(1)}KB)`);
      }

      // Check for slow resources
      if (resource.responseEnd - resource.requestStart > 2000) { // 2s
        console.warn(`Slow resource: ${resource.name} (${(resource.responseEnd - resource.requestStart).toFixed(0)}ms)`);
      }
    });
  }
};
