const CACHE = "icache-v1"
const ASSETS = ["/", "/agent", "/ngo", "/admin", "/id/new"]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)))
})

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url)
  if (url.origin.includes("api.maptiler.com") || ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached
        return fetch(event.request)
          .then((res) => {
            const resClone = res.clone()
            caches.open(CACHE).then((cache) => cache.put(event.request, resClone))
            return res
          })
          .catch(() => cached)
      })
    )
  }
})
