var Sequelize = require('sequelize');
var config = require('../config');
//var users = require('./users.js');

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

var users = connection.define('users', {
	id: {
		type: Sequelize.BIGINT,
		primaryKey: true
	},
	username: Sequelize.STRING(32),
	password: Sequelize.STRING(32),
	level: Sequelize.INTEGER
}, {
	timestamps: false
});

async function createUser(username, password, level) {
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