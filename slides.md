# persistent notifications

![persistent](http://josecantu.com/wp-content/uploads/2015/07/Persistence-and-Determination.jpg)

---

> A [persistent notification](https://notifications.spec.whatwg.org/#persistent-notification) is a notification with an associated service worker registration.

---

## notifications

![notify](http://ww1.prweb.com/prfiles/2015/06/29/12820105/mass-notification.jpg)

<iframe src="http://localhost:8080/notifications/permissions.html"></iframe>

----

### requestPermission

```js
Notification.requestPermission()
  .then((result) => {

  });
```

----

### party

![party](http://i.giphy.com/5B6MWZsS1iZby.gif)

----

```js
const options = {
    body: 'this is the body of the notification',
    icon: 'icon.png'
}
const n =
  new Notification('the title of the notification', options);
```

----

```js
n.onclick = function(event) {
  event.preventDefault();
  window.open('http://www.mozilla.org', '_blank');
}
```

----

![sad ie](http://ci.memecdn.com/851/2002851.jpg)

---

## web workers

![web worker](https://media.giphy.com/media/xTiTnqYF9rfRp2xqww/giphy.gif)

----

```js
const myWorker = new Worker("worker.js");
```

----

### worker scope != window

> workers run in another global context that is different from the current window.

[Functions and classes available to Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers)

----

### communicating

![communication](http://m.c.lnkd.licdn.com/mpr/mpr/p/7/005/05a/2b0/1e837a1.jpg)

----

#### from client to worker

```js
// client
myWorker.postMessage();
```

```js
// worker
onmessage = (e) => {

}
```

----

#### from worker to client

```js
// client
myWorker.onmessage = (e) => {

}
```

```js
// worker
self.postMessage();
```

----

### terminate worker

![terminator](http://screencrush.com/442/files/2014/10/terminator-52.jpg?w=720&cdnnode=1)

----

#### from client

```js
myWorker.terminate();
```

----

#### from worker

```js
close();
```

----

[primes example](https://html.spec.whatwg.org/demos/workers/primes/page.html)

index.html
```js
var worker = new Worker('worker.js');
worker.onmessage = function (event) {
  document.getElementById('result').textContent = event.data;
};
```

worker.js
```js
var n = 1;
search: while (true) {
  n += 1;
  for (var i = 2; i <= Math.sqrt(n); i += 1)
    if (n % i == 0)
     continue search;
  // found a prime!
  postMessage(n);
}
```

---


### Types of Web Workers

* Dedicated worker
* Shared worker
* Service worker
* Audio worker

---

### service workers

![](https://media.giphy.com/media/R0rtU62SKV0ty/giphy.gif)


----

>Service workers essentially act as proxy servers that sit between web applications, and the browser and network (when available). They are intended to (amongst other things) enable the creation of effective offline experiences, intercepting network requests and taking appropriate action based on whether the network is available and updated assets reside on the server. They will also allow access to push notifications and background sync APIs.

----

![service worker in chromium](https://www.igvita.com/posts/14/serviceworker.png)

----

<img src="https://developers.google.com/web/fundamentals/primers/service-worker/images/sw-lifecycle.png" width="500" />

----

```js
navigator.serviceWorker.register('sw.js');
```

---

## notifications in service worker

----

```js
self.registration.showNotification();
```

```js
self.addEventListener('activate', (event) => {});
```


----

### settimeout

```js
setTimeout(() => {
  self.registration.showNotification('notification title', {
    body: 'notification body'
  });

}, 1000);
```

----

```js
self.addEventListener('notificationclick', (event) => {
  event.waitUntil(clients.openWindow(url));
});
```

----

### websocket


```js
socket.onopen = (event) => {
  socket.onmessage = (event) => {
    self.registration.showNotification(event.data);
  }
};
```

----

>The user agent may terminate service workers at any time it has no event to handle or detects abnormal operation such as infinite loops and tasks exceeding imposed time limits, if any, while handling the events.

---

### push notifications

<img src="https://www.w3.org/TR/push-api/sequence_diagram.png" width="500" />

----

```js
registration.pushManager.getSubscription();
```

```js
registration.pushManager.subscribe({
    userVisibleOnly: true
});
```

```js
.then((subscription) => {
  subscription.endpoint;
})
```

----

https://console.cloud.google.com/home/dashboard
