// 簡單的 Service Worker，讓工具箱可以離線開啟
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('toolbox-v1').then((cache) => cache.addAll([
      './',
      './index.html',
      './meeting-pro.html',
      './team-calendar.html',
      './wujia.html'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
