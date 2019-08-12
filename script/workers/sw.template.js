/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
  );
  
  const precacheManifest = [];
  
  workbox.precaching.precacheAndRoute(precacheManifest);
  
  const filesToCache = [
    'https://s3-ap-southeast-1.amazonaws.com/meesho-static-test/reseller-logo/icons-category/Animals/Animals-01.svg',
    'https://s3-ap-southeast-1.amazonaws.com/meesho-static-test/reseller-logo/icons-category/Animals/Animals-02.svg',
    'https://s3-ap-southeast-1.amazonaws.com/meesho-static-test/reseller-logo/icons-category/Animals/Animals-03.svg',
  ];
  
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('images').then(cache => cache.addAll(filesToCache)),
    );
  });
  
  workbox.routing.registerRoute(
    // Match common image extensions.
    new RegExp('\\.(?:png|gif|jpg|jpeg|svg)$'),
    // Use a cache-first strategy with the following config:
    new workbox.strategies.CacheFirst({ 
      // You need to provide a cache name when using expiration.
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          // Keep at most 50 entries.
          maxEntries: 50,
          // Don't keep any entries for more than 30 days.
          maxAgeSeconds: 30 * 24 * 60 * 60,
          // Automatically cleanup if quota is exceeded.
          purgeOnQuotaError: true,
        }),
      ],
    }),
  );
  
  workbox.routing.registerRoute(
    // Match common image extensions.
    new RegExp('\\.(?:woff|eot|woff2|ttf)$'),
    // Use a cache-first strategy with the following config:
    new workbox.strategies.CacheFirst({
      // You need to provide a cache name when using expiration.
      cacheName: 'fonts',
      plugins: [
        new workbox.expiration.Plugin({
          // Keep at most 50 entries.
          maxEntries: 50,
          // Don't keep any entries for more than 30 days.
          maxAgeSeconds: 30 * 24 * 60 * 60,
          // Automatically cleanup if quota is exceeded.
          purgeOnQuotaError: true,
        }),
      ],
    }),
  );
  
  self.addEventListener('install', event => {
    self.skipWaiting();
  });
  
  workbox.routing.registerRoute(
    'https://cdn.polyfill.io/v3/polyfill.min.js',
    new workbox.strategies.CacheFirst({
      cacheName: 'polyfill',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // 60 minutes
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
      ],
    }),
  );
  
  // workbox.routing.registerRoute(
  //   new RegExp('/api/1.0/logo-config'),
  //   new workbox.strategies.StaleWhileRevalidate({
  //     cacheName: 'api-cache',
  //     plugins: [
  //       new workbox.cacheableResponse.Plugin({
  //         statuses: [0, 200],
  //       }),
  //     ],
  //   }),
  // );
  
  workbox.routing.registerRoute(
    new RegExp('^https://supply-dev6.meeshoapi.com/api/1.0/user-profile'),
    new workbox.strategies.CacheFirst({
      cacheName: 'api-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 2,
          maxAgeSeconds: 0.5 * 60, // 60 minutes
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200, 204],
        }),
      ],
    }),
    'GET',
  );
  
  workbox.routing.registerRoute(
    new RegExp('https://supply-dev6.meeshoapi.com/api/1.0/logo-config/fetch'),
    new workbox.strategies.CacheFirst({
      cacheName: 'api-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 2,
          maxAgeSeconds: 0.5 * 60, // 60 minutes
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200, 204],
        }),
      ],
    }),
  );
  
  workbox.routing.registerRoute(
    new RegExp('/logo/*'),
    new workbox.strategies.CacheFirst({
      cacheName: 'page-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 10,
          maxAgeSeconds: 60 * 60, // 60 minutes
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200, 204],
        }),
      ],
    }),
  );
  
  // workbox.routing.registerRoute(
  //   // This matchCallback will only be true if the request
  //   // has an X-Source header set to 'fetch':
  //   ({ event }) =>
  //     // console.log(event.request.method);
  //     event.request.headers.get('X-Source') === 'fetch',
  //   new workbox.strategies.NetworkOnly(),
  // );