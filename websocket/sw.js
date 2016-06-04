self.addEventListener('activate', (event) => {
    const socket = new WebSocket('ws://localhost:3000');

    event.waitUntil(new Promise((resolve, reject) => {

        socket.onopen = (event) => {
            socket.onmessage = (event) => {
                self.registration.showNotification(event.data);
            }
        };

    }));

});
