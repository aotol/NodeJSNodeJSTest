var Sequelize = require('sequelize');
var config = require('../config');

var connection = new Sequelize(config.database,
	config.username,
	config.password, {
		host: config.host,
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			idle: 30000
		}
	});

async function createUser(username, password, level) {
	var users = require('./users.js');
	var user = users.create({
		username: username,
		password: password,
		level: level
	});
	console.log('created: ' + JSON.stringify(user));
};
module.exports = {
	connection: connection,
	createUser: createUser
};