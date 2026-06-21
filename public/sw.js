self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Pass-through fetch handler to satisfy Chrome PWA install criteria
  event.respondWith(fetch(event.request));
});
