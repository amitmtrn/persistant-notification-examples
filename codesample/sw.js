self.addEventListener('activate', (event) => {
    setTimeout(() => {
      self.registration.showNotification('hello');
    }, 2000);
});

self.addEventListener('notificationclick', (event) => {
    clients.openWindow('http://localhost:8080/codesample');
});
