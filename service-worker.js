const FILES_TO_CACHE = [
    // Root Files
    "/index.html",
    "/createRecord.html",
    "/updateRecord.html",

    //Asset Files
    "/assets/favicon.png",

    //Dist Files
    "/dist/create.bundle.js",
    "/dist/icon_72x72.png",
    "/dist/icon_96x96.png",
    "/dist/icon_128x128.png",
    "/dist/icon_144x144.png",
    "/dist/icon_152x152.png",
    "/dist/icon_192x192.png",
    "/dist/icon_384x384.png",
    "/dist/icon_512x512.png",
    "/dist/index.bundle.js",
    "/dist/manifest.json",
    "/dist/update.bundle.js",

    // Script Files
    "/scripts/index.js",
    "/scripts/apiFunctions.js",
    "/scripts/createRecord.js",
    "/scripts/crudFunctions.js",
    "/scripts/domMethods.js",
    "/scripts/modalFunctions.js",
    "/scripts/rolodexFunctions.js",
    "/scripts/updateRecord.js",

    // Style Files
    "/styles/style.css"
]

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// install
self.addEventListener("install", (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Your files were pre-cached successfully!");
            return cache.addAll(FILES_TO_CACHE);
        })
            .catch(err => console.log(err))
    );
    self.skipWaiting()
});

// activate
self.addEventListener("activate", (evt) => {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Removing old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
})

// fetch
self.addEventListener("fetch", (evt) => {
    console.log('Handling fetch event for', evt.request.url)
    // cache successful requests to the API
    if (evt.request.url.includes("jsonplaceholder")) {
        evt.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
                return fetch(evt.request)
                    .then(response => {
                        // If the response was good, clone it and store it in the cache.
                        if (response.status === 200) {
                            cache.put(evt.request.url, response.clone());
                        }

                        return response;
                    })
                    .catch(err => {
                        // Network request failed, try to get it from the cache.
                        return cache.match(evt.request);
                    });
            }).catch(err => console.log(err))
        );

        return;
    }

    // if the request is not for the API, serve static assets using "offline-first" approach.
    // see https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
    evt.respondWith(
        caches.match(evt.request).then(function (response) {
            return response || fetch(evt.request);
        })
    );
});
