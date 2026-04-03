// Service Worker — cache-first with version-based invalidation.
// When the CACHE_VERSION changes (tied to git commit), the old
// cache is deleted and all assets are re-fetched. Users on the
// home screen or with stale browser tabs get the new build on
// next visit without a manual hard-refresh.

const CACHE_VERSION = 'fm3d-112aade';

const PRECACHE = [
  './',
  './index.html',
  './style.css',
  './mandala3d.js',
  './ontology.js',
  './genesis.js',
  './gyroParallaxSubsystem.js',
  './manifest.json',
  './favicon.svg',
];

self.addEventListener('install', e => {
  // Don't wait — activate immediately
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_VERSION).then(c => c.addAll(PRECACHE))
  );
});

self.addEventListener('activate', e => {
  // Delete all caches that don't match current version
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE_VERSION)
        .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network-first for HTML (always get latest), cache-first for assets
  const url = new URL(e.request.url);
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});
