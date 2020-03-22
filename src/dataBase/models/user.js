
const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

class User extends Sequelize.Model { }
User.init({
	id: {
		type: Sequelize.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	account: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
	userName: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
	password: {
		type: Sequelize.STRING(20),
		allowNull: false

	}

}, 
{
	sequelize, 
	modelName: 'user',
	timestamps: true,

});

User.sync();
module.exports = User;
//  Message.belongsTo(User, {foreignKey: 'userId', as: "user"});
