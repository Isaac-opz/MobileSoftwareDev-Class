const CACHE_NAME = "contacts-pwa-cache-v1";
const DYNAMIC_CACHE_NAME = "contacts-pwa-dynamic-v1";

const APP_SHELL = [
    "/",
    "/index.html",
    "/manifest.json",
    "/pwa-icon.png",
    "/vite.svg"
];

// Install Event: Cache App Shell
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Caching App Shell");
            return cache.addAll(APP_SHELL);
        })
    );
    self.skipWaiting();
});

// Activate Event: Clean Old Caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
                        console.log("[Service Worker] Removing old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event: Hybrid Strategy
self.addEventListener("fetch", (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // 1. APIs: Network First
    if (url.pathname.startsWith("/api/") || request.headers.get("accept").includes("application/json")) {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
        return;
    }

    // 2. HTML: Network First (to avoid old versions)
    if (request.headers.get("accept").includes("text/html")) {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
        return;
    }

    // 3. JS / CSS: Cache First (because of the Vite HASH)
    if (request.destination === "script" || request.destination === "style") {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(request).then((networkResponse) => {
                    return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
        return;
    }

    // 4. Images: Cache First - Stale While Revalidate (for performance)
    if (request.destination === "image") {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                const fetchPromise = fetch(request).then((networkResponse) => {
                    return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                });

                return cachedResponse || fetchPromise;
            })
        );
        return;
    }

    // Default fallback for any other requests
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            return cachedResponse || fetch(request);
        })
    );
});
