// service_worker.ts

// Definir os tipos para o objeto 'self'
declare const self: ServiceWorkerGlobalScope;

// Adicionar evento de instalação do Service Worker
self.addEventListener('install', (event: ExtendableEvent) => {
  // Caching dos recursos estáticos, incluindo a logo
  event.waitUntil(
    caches.open('static-assets').then(cache => {
      return cache.addAll([
        '/src/assets/logo.png',
        '/src/assets/acaifruta2.png',
        '/src/assets/arvoreacai.svg'
      ]);
    })
  );
});

// Adicionar evento fetch para interceptar as solicitações de rede
self.addEventListener('fetch', (event: FetchEvent) => {
  // Verificar se a solicitação está no cache
  event.respondWith(
    caches.match(event.request).then(response => {
      // Se estiver no cache, retorna a resposta do cache
      if (response) {
        return response;
      }

      // Caso contrário, busca a solicitação na rede
      return fetch(event.request);
    })
  );
});
