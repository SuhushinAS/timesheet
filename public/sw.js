const cacheName = 'cache_v1';
const urlList = [];

/**
 * Привязать событие.
 * @param el Елемент.
 * @param event Событие.
 * @param handler Обработчик.
 */
function attachEvent(el, event, handler) {
  el.removeEventListener(event, handler);
  el.addEventListener(event, handler);
}

/**
 * Обработать установку сервис-воркера.
 */
function onInstall() {
  caches.open(cacheName).then(cache => {
    cache.addAll(urlList);
  });
}

/**
 * Кеширование.
 * @param request Запрос.
 * @return Результат кеширования.
 */
function cacheLite(request) {
  return new Promise(resolve => {
    fetch(request)
      .then(response => {
        caches.open(cacheName).then(cache => {
          cache.put(request, response);
        });

        resolve(response.clone());
      })
      .catch(() => {
        caches.match(request).then(response => {
          if (response) {
            resolve(response);
          }

          resolve(caches.match('/'));
        });
      });
  });
}

/**
 * Обработать отправку запроса.
 * @param event Событие
 */
function onFetch(event) {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin === location.origin) {
    event.respondWith(cacheLite(request));
  }
}

attachEvent(self, 'install', onInstall);
attachEvent(self, 'fetch', onFetch);
