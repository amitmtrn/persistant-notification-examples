self.addEventListener('activate', (event) => {

  setTimeout(() => {
    self.registration.showNotification('notification title', {
      body: 'notification body'
    });
    self.registration.unregister();
  }, 1000);

});
