// Estrategia Cache First: Significa que la aplicación busca primero los recursos en la memoria caché antes de hacer la petición a la red. En el caso de MediCare, que es una app médica, conviene usarla para los archivos estáticos de la interfaz, así el personal administrativo puede cargar la plataforma súper rápido en emergencias o si el internet de la clínica está fallando.

var CACHE_NAME = 'medicare-cache-v1'
var archivosAGuardar = [
  '/',
  '/index.html',
  '/vite.svg'
]

self.addEventListener('install', function (evento) {
  evento.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(archivosAGuardar)
    })
  )
})

self.addEventListener('fetch', function (evento) {
  evento.respondWith(
    caches.match(evento.request).then(function (respuestaCache) {
      if (respuestaCache) {
        return respuestaCache
      }
      return fetch(evento.request)
    })
  )
})
