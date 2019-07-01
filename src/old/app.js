'use strict';
var Koa = require('koa');
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser')();
var app = new Koa();
app.use(async (ctx, next)=>{
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	await next();
});
// add url-route:
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

app.use(bodyParser);
// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');