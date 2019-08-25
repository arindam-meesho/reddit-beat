/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
  );

const precacheManifest = [];

workbox.precaching.precacheAndRoute(precacheManifest);

const filesToCache = [
];



self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', event => {
  console.log('Updated Service worker installed!2')
});

self.addEventListener('activate', event => {
  console.log('Updated Service worker activated!2')
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

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  whitelist: [
    /\/r\/*/,
    /\/mock\/*/,
  ],
  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
});

workbox.routing.registerRoute(
  new RegExp('https://www.reddit.com/r/alternativeart.*'),
  new workbox.strategies.CacheOnly({
    cacheName: 'api-cache',
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

workbox.routing.registerRoute(
  new RegExp('https://www.reddit.com/r/pics.*'),
  new workbox.strategies.NetworkOnly({
    cacheName: 'api-cache',
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

workbox.routing.registerRoute(
  new RegExp('https://www.reddit.com/r/gifs.*'),
  new workbox.strategies.CacheFirst({
    cacheName: 'api-cache',
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

workbox.routing.registerRoute(
  new RegExp('https://www.reddit.com/r/adviceanimals.*'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache',
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

workbox.routing.registerRoute(
  new RegExp('https://www.reddit.com/r/cats.*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-cache',
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
//   new RegExp('/mock/xkcd.json'),
//   new workbox.strategies.NetworkFirst({
//     cacheName: 'stale-revalidate-api-cache',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 50,
//         maxAgeSeconds: 60 * 60, // 60 minutes
//       }),
//       new workbox.cacheableResponse.Plugin({
//         statuses: [0, 200],
//       }),
//     ],
//   }),
// );
