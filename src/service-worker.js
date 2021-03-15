const VERSION = SERVICE_WORKER_VERSION || '00000';
const STATIC_CACHE_NAME = 'site-static-v' + VERSION;
const DYNAMIC_CACHE_NAME = 'site-dynamic-v' + VERSION;
const CACHE_MAX_SIZE = 25;
const ASSETS = [
  '/',
  '/index.html',
  '/robots.txt',
  '/sitemap-file.xml',
  '/manifest.webmanifest',
  '/img/icons/favicon-196.png',
  '/img/icons/favicon-whitebg-196.png',
  '/img/icons/apple-icon-180.png',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
  'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;700:900&display=swap',
  '/css/style.css',
  '/img/icons/manifest-icon-192.png',
  '/img/icons/manifest-whitebg-192.png',
  '/img/icons/contact-icon-256.png',
  '/img/icons/contact-icon-512.png',
  '/img/icons/work-icon-256.png',
  '/img/icons/work-icon-512.png',
  '/img/self.webp',
  '/img/code.webp',
  // '/img/about-me.webp',
  // '/img/concert.webp',
  // '/img/business-coffee-shop.webp',
  // '/img/telecom.webp',
  // '/img/capital.webp',
  // '/img/code-two-screens.webp',
  // '/img/circuit-board.webp',
  // '/img/contact.webp',
  '/__/firebase/8.3.0/firebase-app.js',
  '/__/firebase/8.3.0/firebase-firestore.js',
  '/js/helpers.js',
  '/js/renderers.js',
  '/js/index.js',
];

// cache size limit function
const limitCacheSize = async (name, size) => {
  const cache = await caches.open(name);

  cache.keys().then((keys) => {
    if (keys.length > size) {
      cache.delete(keys[0]).then(limitCacheSize(name, size));
    }
  });
};

// install event
self.addEventListener('install', (evt) => {
  evt.waitUntil(
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(ASSETS);
      }),
  );
});

// activate event
self.addEventListener('activate', (evt) => {
  evt.waitUntil(async () => {
    const keys = await caches.keys();

    return keys.filter((key) => key !== STATIC_CACHE_NAME &&
      key !== DYNAMIC_CACHE_NAME).map((key) => caches.delete(key));
  });
});

// fetch event
self.addEventListener('fetch', (evt) => {
  if (evt.request.url.indexOf('firestore.googleapis.com') === -1 &&
    evt.request.url.indexOf('google.firestore') === -1) {
    evt.respondWith((async () => {
      const cachedResponse = await caches.match(evt.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      const response = await fetch(evt.request);

      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      await cache.put(evt.request, response.clone());
      limitCacheSize(DYNAMIC_CACHE_NAME, CACHE_MAX_SIZE);

      return response;
    })());
  }
});
