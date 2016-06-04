self.addEventListener('push', function(event) {
    event.waitUntil(
        self.registration.showNotification('push notification!', {
            body: 'hello all'
        })
    );
});
