const CACHE_NAME = 'md-editor-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  'https://cdn.jsdelivr.net/npm/turndown@7.1.2/dist/turndown.js',
  'https://cdn.jsdelivr.net/npm/turndown-plugin-gfm@1.0.2/dist/turndown-plugin-gfm.js',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js',
  'https://cdn.jsdelivr.net/npm/mermaid@10.4.0/dist/mermaid.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css',
  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
  'https://cdn-icons-png.flaticon.com/512/337/337946.png'
];

// Instalar y guardar en caché
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Fuerza a la nueva versión a activarse
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activar y limpiar cachés antiguas si cambias la versión
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Responder desde la caché si no hay internet
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
