const version = 28;
const staticCacheName = 'site-static-v' + version;
const dynamicCacheName = 'site-dynamic-v' + version;
const CACHE_MAX_SIZE = 20;
const assets = [
  '/',
  '/index.html',
  '/robots.txt',
  '/sitemap-file.xml',
  '/css/style.css',
  '/img/icons/icon_144x144.png',
  '/img/photos/self.webp',
  '/img/code.webp',
  '/__/firebase/8.2.1/firebase-app.js',
  '/__/firebase/8.2.1/firebase-analytics.js',
  '/__/firebase/8.2.1/firebase-firestore.js',
  '/__/firebase/init.js',
  '/js/index.js',
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(open).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', (evt) => {
  evt.waitUntil(caches.open(staticCacheName).then((cache) => {
    cache.addAll(assets);
  }));
});

// activate event
self.addEventListener('activate', (evt) => {
  evt.waitUntil(caches.keys().then((keys) => Promise.all(keys
      .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
      .map((key) => caches.delete(key)))));
});

// fetch event
self.addEventListener('fetch', (evt) => {
  if (evt.request.url.indexOf('firestore.googleapis.com') === -1 &&
    evt.request.url.indexOf('www.google-analytics.com') === -1 &&
    evt.request.url.indexOf('google.firestore') === -1) {
    evt.respondWith(caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request).then((fetchRes) => {
        return caches.open(dynamicCacheName).then((cache) => {
          cache.put(evt.request.url, fetchRes.clone());
          limitCacheSize(dynamicCacheName, CACHE_MAX_SIZE);
          return fetchRes;
        });
      });
    }).catch(() => {
      // fallback for html
      // if (evt.request.url.indexOf('.html') > -1) {
      //   return caches.match('/fallback.html');
      // }
      // TODO: add fallback for other file types

      return null;
    }));
  }
});
