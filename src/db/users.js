var Sequelize = require('sequelize');
var dbConnection = require('./db.js');
var users = dbConnection.connection.define('users', {
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
module.exports = users;