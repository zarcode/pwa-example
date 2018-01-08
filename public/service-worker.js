importScripts('workbox-sw.prod.v2.1.2.js');
importScripts('/src/js/idb.js');
importScripts('/src/js/utility.js');

const workboxSW = new self.WorkboxSW();

workboxSW.router.registerRoute(/.*(?:googleapis|gstatic)\.com.*$/,
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: "google-fonts",
        cacheExpiration: {
            maxEntries: 3,
            maxAgeSeconds: 60*60*24*30
        }
    }) // cache than network
)

workboxSW.router.registerRoute("https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: "material-css"
    }) // cache than network
)

workboxSW.router.registerRoute(/.*(?:firebasestorage\.googleapis)\.com.*$/,
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: "post-images"
    }) // cache than network
)

workboxSW.router.registerRoute("https://pwagram-3ce94.firebaseio.com/posts.json", function(args){
    return fetch(args.event.request)
        .then(function (res) {
            var clonedRes = res.clone();
            clearAllData('posts')
                .then(function () {
                    return clonedRes.json();
                })
                .then(function (data) {
                    for (var key in data) {
                        writeData('posts', data[key])
                    }
                });
            return res;
        })
})

workboxSW.precache([
  {
    "url": "404.html",
    "revision": "0a27a4163254fc8fce870c8cc3a3f94f"
  },
  {
    "url": "favicon.ico",
    "revision": "2cab47d9e04d664d93c8d91aec59e812"
  },
  {
    "url": "index.html",
    "revision": "33236229df7c621d12f704e9dbf08b78"
  },
  {
    "url": "manifest.json",
    "revision": "d11c7965f5cfba711c8e74afa6c703d7"
  },
  {
    "url": "offline.html",
    "revision": "45352e71a80a5c75d25e226e7330871b"
  },
  {
    "url": "service-worker.js",
    "revision": "9e150294cbdb3a5d25e44857bf2f5fca"
  },
  {
    "url": "src/css/app.css",
    "revision": "f27b4d5a6a99f7b6ed6d06f6583b73fa"
  },
  {
    "url": "src/css/feed.css",
    "revision": "edb6851fd7f76aec67d4ca36a09b166d"
  },
  {
    "url": "src/css/help.css",
    "revision": "1c6d81b27c9d423bece9869b07a7bd73"
  },
  {
    "url": "src/js/app.js",
    "revision": "5dd22b5d86f068bfe127eedfa25c3be4"
  },
  {
    "url": "src/js/feed.js",
    "revision": "7cc21173bcd260cac221003e965d703d"
  },
  {
    "url": "src/js/fetch.js",
    "revision": "6b82fbb55ae19be4935964ae8c338e92"
  },
  {
    "url": "src/js/idb.js",
    "revision": "017ced36d82bea1e08b08393361e354d"
  },
  {
    "url": "src/js/material.min.js",
    "revision": "713af0c6ce93dbbce2f00bf0a98d0541"
  },
  {
    "url": "src/js/promise.js",
    "revision": "10c2238dcd105eb23f703ee53067417f"
  },
  {
    "url": "src/js/utility.js",
    "revision": "e71f4998d23e48b260a4b92f50ee3e04"
  },
  {
    "url": "sw-base.js",
    "revision": "11fc03f0137599660ae826699f0c5a79"
  },
  {
    "url": "sw.js",
    "revision": "f8b538dbfa6ab4ec0a722c145cb5d087"
  },
  {
    "url": "workbox-sw.prod.v2.1.2.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  },
  {
    "url": "src/images/main-image-lg.jpg",
    "revision": "31b19bffae4ea13ca0f2178ddb639403"
  },
  {
    "url": "src/images/main-image-sm.jpg",
    "revision": "c6bb733c2f39c60e3c139f814d2d14bb"
  },
  {
    "url": "src/images/main-image.jpg",
    "revision": "5c66d091b0dc200e8e89e56c589821fb"
  },
  {
    "url": "src/images/sf-boat.jpg",
    "revision": "0f282d64b0fb306daf12050e812d6a19"
  }
]);