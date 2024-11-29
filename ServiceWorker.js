const cacheName = "NineHermitsGames-FuriousSkies-1.0";
const contentToCache = [
    "Build/0145c752a950e797e3f5c26444736e72.loader.js",
    "Build/9b3b27f5f63e2d0bdea311fde3c9d436.framework.js",
    "Build/78b0c71e0b9c5a151dad0bc9ffaa64aa.data",
    "Build/40754d805bdebca34ca96a570346ab37.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
