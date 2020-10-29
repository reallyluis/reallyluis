const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const CACHE_MAX_SIZE = 25;
const assets = [
  '/',
  '/index.html',
  '/fallback.html',
  '/css/style.css',
  '/js/firebase.js',
  '/js/index.js',
  '/img/about_me.webp',
  '/img/logo.webp',
  '/img/icons/icon_32x32.png',
  '/img/icons/icon_48x48.png',
  '/img/icons/icon_180x180.png',
  // '/img/concert.webp',
  // '/img/business-coffee-shop.webp',
  // '/img/telecom.webp',
  // '/img/capital.webp',
  // '/img/code-two-screens.webp',
  // '/img/circuit-board.webp',
  '/img/code.webp',
  '/img/section_wallpaper.webp',
  '/img/self.webp',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
  'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;900&display=swap',
  'https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdu3cOWxw.woff2',
  'https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3iu4nwlxdu3cOWxw.woff2',
  // 'https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js',
  // 'https://www.gstatic.com/firebasejs/8.0.0/firebase-firestore.js',
  // 'https://www.gstatic.com/firebasejs/8.0.0/firebase-analytics.js',
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
  if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
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
      if (evt.request.url.indexOf('.html') > -1) {
        return caches.match('/fallback.html');
      }
      // TODO: add fallback for other file types

      return null;
    }));
  }
});
