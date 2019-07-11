'use strict';
let index = 0;
let users = [];
let fn_createUser = async function (ctx, next) {
	let name = ctx.request.body.name;
	let id = index;
	index = index + 1;
	let user = {
		id: id,
		name: name
	}
	let value = Buffer.from(JSON.stringify(user)).toString('base64');
	console.log('Generated user login cookie: ' + value);
	ctx.cookies.set('name', value);
	user.id = index;
	user.name = name;
	users.push(user);
};

let fn_removeUser = async function (ctx, next) {
	let id = ctx.response.body.id;
	for (let user in users) {
		if (user.id === id) {
			let index = users.indexOf(user);
			users.splice(index, 1);
		}
	}
}

let fn_getUsers = function (ctx, next) {
	return users;
}

module.exports = {
	createUser: fn_createUser,
	removeUser: fn_removeUser,
	getUsers: fn_getUsers
}