importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
// const { loadModule } = workbox;

workbox.loadModule('workbox-background-sync');

const { precacheAndRoute } = workbox.precaching;

precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

const networkFirstPaths = ['/api/auth/renew', '/api/events'];

// registerRoute((wea)=> {
//   console.log('wea', wea);
//   return false
// }, new NetworkFirst)

registerRoute(({ request, url }) => {
  // console.log({ request, url });
  if (networkFirstPaths.includes(url.pathname)) return true;
  return false;
}, new NetworkFirst());

// registerRoute(
//   new RegExp('http://localhost:4000/api/auth/renew'),
//   new NetworkFirst()
// );
// registerRoute(
//   new RegExp('http://localhost:4000/api/events'),
//   new NetworkFirst()
// );
const cacheFirstPaths = [
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css',
];

registerRoute(({ request, url }) => {
  if (cacheFirstPaths.includes(url.href)) return true;
  return false;
}, new CacheFirst());

// registerRoute(
//   new RegExp(
//     'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'
//   ),
//   new CacheFirst()
// );
// registerRoute(
//   new RegExp(
//     'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
//   ),
//   new CacheFirst()
// );

// offline post

const bgSyncPlugin = new BackgroundSyncPlugin('posts', {
  maxRetentionTime: 24 * 60,
});

registerRoute(
  new RegExp('api/events'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

registerRoute(
  new RegExp('api/events'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'DELETE'
);

registerRoute(
  new RegExp('api/events'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'PUT'
);
