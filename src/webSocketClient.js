'use strict';
var WebSocket = require('ws');
var webSocketClient = new WebSocket('ws://localhost:3000/test');
webSocketClient.on('open', function() {
    console.log(`[CLIENT] open()`);
    webSocketClient.send('Open!');
});

var count = 0;
webSocketClient.on('message', function (message) {
    console.log('[CLIENT] Received: ' + message);
    count++;
    if (count > 3) {
        webSocketClient.send('Goodbye!');
        webSocketClient.close();
    } else {
        setTimeout(() => {
            webSocketClient.send(`Hello, I'm Mr No.${count}!`);
        }, 1000);
    }
});