let dataCacheName = 'countries';
let staticCacheName = 'converter-v7';
let filesToCache = [
    '/',
    './index.html',
    './js/autoRequest.js',
    './js/workwithdb.js',
    './js/idb.js',
    './images/download.jpg',
    './css/style.css',
    './images/close.png',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'https://fonts.googleapis.com/css?family=Poppins%7CRoboto',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
];


//yes
self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});




self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(

                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('converter-v7') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    console.log('[ServiceWorker] Removing old cache', cacheName);
                    return caches.delete(cacheName);
                })

            );
        })
    );
});


self.addEventListener('fetch', function(event) {
    var requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            event.respondWith(caches.match('./index.html'));
            return;
        }
        return

    }
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;     // if valid response is found in cache return it
                } else {
                    return fetch(event.request)     //fetch from internet
                        .then(function(res) {
                            return caches.open(staticCacheName)
                                .then(function(cache) {
                                    cache.put(event.request.url, res.clone());    //save the response for future
                                    return res;   // return the fetched data
                                })
                        })
                        .catch(function(err) {       // fallback mechanism
                            return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                                .then(function(cache) {
                                    return cache.match('/index.html');
                                });
                        });
                }
            })
    );
});

//
// self.addEventListener('fetch', function(event) {
//     var requestUrl = new URL(event.request.url);
//     if (requestUrl.origin === location.origin) {
//         if (requestUrl.pathname === '/') {
//             event.respondWith(caches.match('/'));
//             return;
//         }
//         return
//
//     }
//
//
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             console.log ('trying to match');
//             return response || fetch(event.request);
//         })
//     );
// });





self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});