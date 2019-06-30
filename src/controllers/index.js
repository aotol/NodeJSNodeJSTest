'use strict';
var fn_index = async(ctx, next) => {
	ctx.response.body = '<h1>Index</h1>';
	ctx.response.body += '<form action="/signin" method="post">';
	ctx.response.body += '<p>Name: <input name="name" value=""></p>';
	ctx.response.body += '<p>Password: <input name="password" type="password"></p>';
	ctx.response.body += '<p><input type="submit" value="Submit"></p>';
	ctx.response.body += '</form>';
};

module.exports = {
	 'GET /index': fn_index
}