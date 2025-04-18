const webPush = require("web-push");
const vapidKeys = webPush.generateVAPIDKeys();

console.log("PUBLIC VAPID KEY: ", vapidKeys.publicKey);
console.log("PRIVATE VAPID KEY: ", vapidKeys.privateKey);
