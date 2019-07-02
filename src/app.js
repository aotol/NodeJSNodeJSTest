/**
 * Improved coding version from app.js with same function
 */
'use strict';
var koa = new(require('koa'))();
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser')();
var files = require('fs').readdirSync(__dirname + '/controllers');
//=> in JS means anonymous function. The following (file) => {...} means function(file) {...}
var controller_files = files.filter((file) => {
	return file.endsWith('.js');
});
for (var file of controller_files) {
	console.log('Processing: ' + file);
	var controller = require(__dirname + '/controllers/' + file);
	for (var fn in controller) {
		var path;
		if (fn.startsWith('GET ')) {
			path = fn.substring(fn.indexOf('GET ') + 'GET '.length);
			router.get(path, controller[fn]);
		} else if (fn.startsWith('POST ')) {
			path = fn.substring(fn.indexOf('POST ') + 'POST '.length);
			router.post(path, controller[fn]);
		} else {
			path = '/error';
			var errorController = require('./controllers/error.js');
			router.get(path, errorController.get_error);
		}
		console.log('Register ' + path + ' completed');
	}
}
koa.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
	await next();
});
koa.use(bodyParser);
koa.use(router.routes());
koa.listen(3000);
console.log('app started at port 3000...');