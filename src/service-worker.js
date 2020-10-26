const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/index.html',
  '/postfolio-item.html',
  '/css/style.css',
  '/js/index.js',
  '/img/about_me.webp',
  '/img/logo.webp',
  '/img/icons/icon_32x32.png',
  '/img/icons/icon_48x48.png',
  '/img/icons/icon_180x180.png',
  '/img/project_1.webp',
  '/img/section_wallpaper.webp',
  '/img/self.webp',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
  'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;900&display=swap',
  'https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdu3cOWxw.woff2',
  'https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3iu4nwlxdu3cOWxw.woff2',
];

// install event
self.addEventListener('install', (evt) => {
  evt.waitUntil(caches.open(staticCacheName).then((cache) => {
    cache.addAll(assets);
  }));
});

// activate event
self.addEventListener('activate', (evt) => {
  evt.waitUntil(caches.keys().then((keys) => Promise.all(keys
      .filter((key) => key !== staticCacheName)
      .map((key) => caches.delete(key)))));
});

// fetch event
self.addEventListener('fetch', (evt) => {
  evt.respondWith(caches.match(evt.request).then((cacheRes) => {
    return cacheRes || fetch(evt.request);
  }));
});
