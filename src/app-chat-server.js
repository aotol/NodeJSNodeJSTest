'use strict';

let koa = new (require('koa'))();
let router = require('koa-router')();
let bodyParser = require('koa-bodyparser')();
let chatRoomController = require('./web/controller/chat_room_controller');
let fs = require('fs');
let files = fs.readdirSync(__dirname + '/web/html');
let path = require("path");
let htmls = files.filter((file) => {
	return file.endsWith('.html');
});
files = fs.readdirSync(__dirname + '/web/lib');
let javascripts = files.filter((file) => {
	return file.endsWith('.js');
});

for (let file of htmls) {
	console.log('Processing: ' + __dirname + '/web/html/' + file);
	let registeredPath = '/' + path.basename(file);
	let htmlContent = fs.readFileSync(__dirname + '/web/html/' + file);
	router.get(registeredPath, async (ctx, next) => {
		console.log('Client is requesting ' + registeredPath);
		ctx.set('Content-Type', 'text/html');
		ctx.response.body = htmlContent.toString();
	});
	console.log('Register ' + registeredPath + ' completed');
}

for (let file of javascripts) {
	console.log('Processing: ' + __dirname + '/web/lib/' + file);
	let registeredPath = '/' + path.basename(file);
	let javascriptContent = fs.readFileSync(__dirname + '/web/lib/' + file);
	router.get(registeredPath, async (ctx, next) => {
		console.log('Client is requesting ' + registeredPath);
		ctx.set('Content-Type', 'text/javascript');
		ctx.response.body = javascriptContent.toString();
	});
	console.log('Register ' + registeredPath + ' completed');
}

router.get('/', async (ctx, next) => {
	console.log('Client is requesting / path');
	ctx.response.redirect('/join.html');
});

router.post('/signin', async (ctx, next) => {
	console.log('Client is requesting /signin path');
	chatRoomController.createUser(ctx, next);
	ctx.response.redirect('/chat_room.html');
});

router.get('/users', async (ctx, next) => {
	console.log('Client is requesting /users path');
	let users = chatRoomController.getUsers(ctx, next);
	let body = JSON.stringify(users);
	ctx.set('CONTENT-Type', 'application/json');
	ctx.response.body = body;
});

koa.use(bodyParser);
koa.use(router.routes());
koa.listen(3000);
console.log('koa server is up at port 3000');

let wss = new (require('ws')).Server({
	server: koa
});

function parseUser(obj) {
	if (!obj) {
		return;
	}
	console.log('Parsing: ' + obj);
	let userName;
	if (typeof obj === 'string') {
		userName = obj;
	} else if (obj.headers) {
		let cookies = new Cookie(obj, null);
		userName = cookies.get('name');
	}
	if (userName) {
		try {
			let user = JSON.parse(Buffer.from(userName, 'base64').toString());
			console.log('User name: ' + user.name + ' ID: ' + user.id);
			return user;
		} catch (e) {
			console.log(e);
		}
	}
}

koa.use(async function (ctx, next) {
	let name = ctx.cookies.get('name');
	if (!name) {
		name = '';
	}
	ctx.state.user = parseUser(name);
	await next();
});

wss.on('connection', function (ws, request) {
	let user = parseUser(request);
	if (!user) {
		ws.close(4001, 'Invalid user');
	} else {
		ws.user = user;
		ws.wss = wss;
	}
});

wss.broadcast = function (data) {
	wss.clients.forEach(function (client) {
		client.send(data);
	});
}

let messageIndex = 0;

function createMessage(type, user, data) {
	messageIndex++;
	let message = JSON.stringify({
		id: messageIndex,
		type: type,
		user: user,
		data: data
	});
}

wss.on('message', function (message) {
	console.log('message: ' + message);
	if (message && message.trim()) {
		let msg = createMessage('chat', this.user, message.trim());
		this.wss.broadcast(msg);
	}
});