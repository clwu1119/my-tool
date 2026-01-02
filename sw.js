const CACHE_NAME = 'toolbox-v2'; // 升級版本號，強迫瀏覽器更新快取

const FILES_TO_CACHE = [
  './',
  './index.html',
  './meeting-pro.html',
  './team-calendar.html',
  './wujia.html',
  './expat-flow.html',  // 新增這一行
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // 強制立即啟用新版 SW
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key); // 刪除舊版本快取
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
