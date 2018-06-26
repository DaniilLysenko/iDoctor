self.addEventListener('push', function(event) {
    let notificationData = {};
    console.log(event.data);
    try {
        notificationData = event.data.json();
    } catch (e) {
        notificationData = {
            title: 'Default title',
            body: 'Default message',
            icon: '/default-icon.png'
        };
    }
    event.waitUntil(
        self.registration.showNotification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const examplePage = 'http://localhost:8080/card';
    const promiseChain = clients.openWindow(examplePage);
    event.waitUntil(promiseChain);
});