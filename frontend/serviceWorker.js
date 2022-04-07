const CACHE_NAME = "simple-cache-v1";
const urlsToCache = ["/"];

self.addEventListener("install", event => {
    // console.log('.......install')
    const preLoaded = caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    event.waitUntil(preLoaded);
});

self.addEventListener('fetch', function(event) {
    // console.log('...........1')
    event.respondWith(
      caches.open('simple-cache-v1').then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });