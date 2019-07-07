'use strict';
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var webSocketServer = new WebSocketServer({
	port: 3000
});

webSocketServer.on('connection', function(ws){
	console.log('[SERVER] connection()');
	ws.on('message', function(message){
		console.log('[SERVER] received message: ' + message);
		ws.send('ECHO: ' + message, function (err) {
			if (err) {
				console.log('[SERVER] error: ' + err);
			}
		});
	});
});

console.log('ws server started at port 3000...');