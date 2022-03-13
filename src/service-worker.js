/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, NetworkOnly } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

precacheAndRoute(self.__WB_MANIFEST);

const networkFirstPaths = ['/api/auth/renew', '/api/events'];
const cacheFirstPaths = [
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css',
];

registerRoute(({ url }) => {
  if (networkFirstPaths.includes(url.pathname)) return true;
  return false;
}, new NetworkFirst());

registerRoute(({ url }) => {
  if (cacheFirstPaths.includes(url.href)) return true;
  return false;
}, new CacheFirst());

// offline post
const bgSyncPlugin = new BackgroundSyncPlugin('posts', {
  maxRetentionTime: 24 * 60,
});

['POST', 'DELETE', 'PUT'].forEach(method => {
  registerRoute(
    ({ url }) => {
      if (url.pathname.includes('api/events')) return true;
      return false;
    },
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    method
  );
})

// registerRoute(
//   ({ url }) => {
//     if (url.pathname.includes('api/events')) return true;
//     return false;
//   },
//   new NetworkOnly({
//     plugins: [bgSyncPlugin],
//   }),
//   'POST'
// );

// registerRoute(
//   ({ url }) => {
//     if (url.pathname.includes('api/events')) return true;
//     return false;
//   },
//   new NetworkOnly({
//     plugins: [bgSyncPlugin],
//   }),
//   'DELETE'
// );

// registerRoute(
//   ({ url }) => {
//     if (url.pathname.includes('api/events')) return true;
//     return false;
//   },
//   new NetworkOnly({
//     plugins: [bgSyncPlugin],
//   }),
//   'PUT'
// );
