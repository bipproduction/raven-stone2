// Service worker manual (bukan Workbox) — network-first untuk halaman/API,
// cache-first untuk static asset. Sengaja SKIP semua request non-GET (server
// actions & mutasi auth iron-session lewat POST ke route path yang sama)
// supaya ga pernah ke-intercept/ke-cache.

const STATIC_CACHE = 'raven-stone-static-v1';
const CURRENT_CACHES = [STATIC_CACHE];

const STATIC_PATTERN = /\.(png|jpg|jpeg|svg|webp|woff2?|ico)$/;

function isStaticAsset(pathname) {
  return pathname.startsWith('/_next/static/') || STATIC_PATTERN.test(pathname);
}

self.addEventListener('install', (event) => {
  // Pre-cache halaman offline supaya fallback-nya tersedia sejak awal,
  // bukan cuma setelah user pernah kunjungi /offline saat online.
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.add('/offline'))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !CURRENT_CACHES.includes(key))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Server actions & semua mutasi (POST/PUT/DELETE/...) harus tembus ke network
  // apa adanya — jangan pernah di-intercept.
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Halaman & /api/* — network-first, jangan cache data dashboard/auth.
  event.respondWith(networkFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch (err) {
    // Network gagal (offline) — fallback ke halaman offline untuk navigasi,
    // selain itu biarkan error apa adanya (jangan pura-pura ada data cache).
    if (request.mode === 'navigate') {
      const offline = await caches.match('/offline');
      if (offline) return offline;
      return Response.redirect('/offline');
    }
    throw err;
  }
}
