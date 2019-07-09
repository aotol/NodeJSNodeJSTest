'use strict';

let koa = new(require('koa'))();
let router = require('koa-router')();
let bodyParser = require('koa-bodyparser')();

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
	ctx.response.body = `<h1>Hello, ${name}!</h1>`;
	console.log(`Route complete`);
});

router.get('/', async (ctx, next) => {
	ctx.response.body = '<h1>Index</h1>';
	ctx.response.body += '<form action="/signin" method="post">';
	ctx.response.body += '<p>Name: <input name="name" value=""></p>';
	ctx.response.body += '<p>Password: <input name="password" type="password"></p>';
	ctx.response.body += '<p><input type="submit" value="Submit"></p>';
	ctx.response.body += '</form>';
	console.log('Route complete');
});

router.post('/signin', async (ctx, next) => {
	var name = ctx.request.body.name;
	var password = ctx.request.body.password;
	if (password === '123456') {
		ctx.response.body = 'Hello: ' + name;
	} else {
		ctx.response.body = 'Authentication error';
	}
});

koa.use(bodyParser);
koa.use(router.routes());
koa.listen(3000);

let wss = new(require('ws')).Server({
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

app.use(async function (ctx, next) {
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