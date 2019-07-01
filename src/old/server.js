'use strict';
var url = require('url');
var http = require('http');
console.log('Static root dir: ' + global);
var server = http.createServer(function (request, response) {
	var urlParts = url.parse(request.url);
	if (urlParts.path === '/hello') {
		response.writeHead(200, {
			'Content-Type': 'text/html'
		});
		response.write('Hello!');
		response.end();
	} else if (urlParts.path === '/bye') {
		response.writeHead(200, {
			'Content-Type': 'text/html'
		});
		response.write('Bye!');
		response.end();
	} else {
		response.writeHead(404, {
			'Content-Type': 'text/html'
		});
		response.write('NOT FOUND');
		response.end();
	}

});
server.listen(8080);
console.log('Server is running on port 8080');