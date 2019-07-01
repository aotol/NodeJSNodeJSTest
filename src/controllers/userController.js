'use strict';
var db = require('../db/db.js');

var fn_showCreateUser = async (ctx, next) => {
	ctx.response.body = '<h1>Create User</h1>';
	ctx.response.body += '<form action="/users" method="post">';
	ctx.response.body += '<p>Name: <input name="name" value=""></p>';
	ctx.response.body += '<p>Password: <input name="password" type="password"></p>';
	ctx.response.body += '<p>Level: <input name="level" value=""></p>';
	ctx.response.body += '<p><input type="submit" value="Submit"></p>';
	ctx.response.body += '</form>';
};

var fn_doCreateUser = async (ctx, next) => {
	var name = ctx.request.body.name;
	var password = ctx.request.body.password;
	var level = ctx.request.body.level;
	db.createUser(name, password, level);
	ctx.response.body = 'DONE';

};

module.exports = {
	'GET /users': fn_showCreateUser,
	'POST /users': fn_doCreateUser
}