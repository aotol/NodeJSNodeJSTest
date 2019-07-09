'use strict';
let index = 0;
let fn_createUser = async(ctx, next) => {
	let name = ctx.params.name;
	let id = index;   
	index = index + 1; 
	let user = {
		id: id,
		name: name
	}
	let value = Buffer.from(JSON.stringify(user)).toString('base64');
	console.log('Generated user login cookie: ' + value);
	ctx.cookies.set('name', value);
};

module.exports = {
	 'POST /create': fn_createUser
}