const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.user, config.password, {
	host: config.host,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	},
	define: {
		// The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
		// This was true by default, but now is false by default
		timestamps: false,
	}
});
module.exports = sequelize
