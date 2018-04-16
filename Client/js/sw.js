const staticCache = "res";

const assets = [
    "/",
    "/index.html",
    "/restaurant.html",
    "/css/styles.css",
<<<<<<< HEAD
    "/js/main.js",
    "/js/custom.js",    
    "/js/dbhelper.js",
    "/js/restaurant_info.js",
    "/js/idb.js",
=======
>>>>>>> Fixed IndexedDB issue
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/5.jpg",
    "/img/5.jpg",
    "/img/6.jpg",
    "/img/7.jpg",
    "/img/8.jpg",
    "/img/9.jpg",
    "/img/10.jpg",
<<<<<<< HEAD
    "/manifest.json"
    
=======
    "/js/main.js",
    "/js/custom.js",    
    "/js/dbhelper.js",
    "/js/restaurant_info.js",
    "/manifest.json"
>>>>>>> Fixed IndexedDB issue
];

// Installing resources for offline use 
self.addEventListener('install', e => {
    console.log("Installing assets")
    e.waitUntil(
        caches.open(staticCache)
              .then(cache => cache.addAll(assets))
              .catch(error => console.error("Error Occured", error))
            );
});

<<<<<<< HEAD


/**
 * Activate event
 */
self.addEventListener("activate", event => {
    console.info("activate");
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.filter(cacheName => cacheName.startsWith("restaurant-") &&
                        !staticCache.includes(cacheName))
                        .map(cacheName => caches.delete(cacheName))
                );
            })
            .catch(error => console.error("Something happened", error))
    );
});

/**
 * Fetch from network event
 */
self.addEventListener("fetch", event => {
    console.info("fetch", event.request.url);
    //const requestUrl = new URL(event.request.url);

    //if (requestUrl.origin === location.origin) {
=======
// // Match in cache and fetch
// self.addEventListener('fetch', function (event) {
//     if(event.request.url.includes('restaurant.html?id=')){
//         const strippedurl = event.request.url.split('?')[0];

//         event.respondWith(
//             caches.match(strippedurl).then(function(response){
//                 return response || fetch(event.response);
//             })
//         );
//         return;
//     }

//     event.respondWith(
//         caches.match(event.request).then(function(response){
//             return response || fetch(event.request);
//         })
//     );
// });


self.addEventListener("fetch", event => {
    console.info("fetch", event.request.url);

    if(event.request.url.includes('restaurant.html?id=')){
                const strippedurl = event.request.url.split('?')[0];
        
                event.respondWith(
                    caches.match(strippedurl).then(function(response){
                        return response || fetch(event.response);
                    })
                );
                return;
            }
>>>>>>> Fixed IndexedDB issue
    event.respondWith(serveResource(event.request));
    //}
});

const serveResource = request => {
    return caches.open(staticCache)
        .then(cache => {
            return cache.match(request)
                .then(response => {
                    console.log(`Matching request ${request.url}`);
                    if (response) {
                        console.info("returning from cache");
                        return response;
                    }

                    return fetch(request)
                        .then(networkResponse => {
                            console.log(`Fetching ${request.url} from network`);
                            cache.put(request, networkResponse.clone())
                                .then(() => console.info("Caching succeed"))
                                .catch(error => console.error("Caching failed", error));
                            return networkResponse;
                        });
                });
        })
        .catch(error => console.error("Something happened", error));
};

<<<<<<< HEAD












// // Match in cache and fetch
// self.addEventListener('fetch', function (event) {

//     /* for restaurant info urls */ 
//     if(event.request.url.includes('restaurant.html?id=')){
//         const strippedurl = event.request.url.split('?')[0];

//         event.respondWith(
//             caches.match(strippedurl).then(function(response){
//                 return response || fetch(event.response);
//             })
//         );
//         return;
//     }
//     /* for all other urls */
//     event.respondWith(
//         caches.match(event.request).then(function(response){
//             return response || fetch(event.request);
//         })
//     );
// });

function createAndUpdateDB() {
    'use strict';
  
    //check for support
    if (!window.indexedDB) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }
  
    function createDB(){
    var dbPromise = idb.open('restaurant-reviews', 1, function (upgradeDb) {
      if (!upgradeDb.objectStoreNames.contains('restaurants')) {
        upgradeDb.createObjectStore('restaurants', {
          keyPath: 'id'
        });
      }
    });
    dbPromise.then(function (db) {
      var tx = db.transaction('restaurants', 'readwrite');
      var store = tx.objectStore('restaurants');
      console.log("Items " + items)
      items.forEach(item => {
        store.put(item);
      });
      return tx.complete;
    }).then(function () {
      console.log('Store Updated');
    });
  }
  
    var items;
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        console.log(error);
      } else {
        items =  restaurants;
        createDB();
      }
    });

  
}

self.addEventListener('activate', function(event) {
    event.waitUntil(
      createAndUpdateDB()
    );
});
=======
>>>>>>> Fixed IndexedDB issue
