'use strict';
var fn_signin = async(ctx, next) => {
	var name = ctx.request.body.name;
	var password = ctx.request.body.password;
	if (password === '123456') {
		ctx.response.body = 'Hello: ' + name;
	} else {
		ctx.response.body = 'Authentication error';
	}
};

module.exports = {
	 'POST /sigin': fn_signin
}