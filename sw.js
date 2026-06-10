
const CACHE_NAME = 'travelnest-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/destinations.html',
    '/budget.html',
    '/generator.html',
    '/mood.html',
    '/feedback.html',
    '/css/style.css',
    '/js/data.js',
    '/js/main.js',
    '/js/destinations.js',
    '/js/budget.js',
    '/js/generator.js',
    '/js/mood.js',
    '/js/feedback.js'

];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});