const SW_VERSION = "V1.2.2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  clients.claim();
});

self.addEventListener("push", (e) => {
  const data = e.data.json();
  //   console.log("SW Push Received: ", data);

  const title = data.title || "Notification";
  const body = data.body || "Stay organized, be productive.";

  const options = {
    body,
    icon: "/icons/android-chrome-192x192.png",
    badge: "/icons/badge.png",
    data: {
      url: data.url || "https://yawmly.vercel.app/",
    },
  };

  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (e) => {
  //   console.log("Notification clicked:", e.notification);
  e.notification.close();
  const urlToOpen = e.notification.data?.url || "https://yawmly.vercel.app/";

  e.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        // ✅ Match exact production homepage URL
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }

      // ✅ Open a new window if no matching client
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
