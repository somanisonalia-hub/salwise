// Service Worker for caching and performance
const CACHE_NAME = 'salarywise-v1';
const STATIC_CACHE = 'salarywise-static-v1';
const DYNAMIC_CACHE = 'salarywise-dynamic-v1';

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll([
        '/',
        '/en',
        '/_next/static/css/app.css',
        '/favicon.ico'
      ]);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(networkResponse => {
        // Don't cache non-successful responses
        if (!networkResponse.ok) return networkResponse;

        // Clone the response for caching
        const responseClone = networkResponse.clone();

        caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(event.request, responseClone);
        });

        return networkResponse;
      }).catch(() => {
        // Return offline fallback if available
        return caches.match('/en');
      });
    })
  );
});
