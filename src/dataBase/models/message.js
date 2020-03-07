
const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const User =require('./user')

class Message extends Sequelize.Model { }
Message.init(
	{
		id: {
			type: Sequelize.BIGINT,
			autoIncrement: true,
			primaryKey: true
		},
		content: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
		userId:{
			type: Sequelize.BIGINT,
			allowNull: false
		},

	}, {
	sequelize,
	modelName: 'message',
	timestamps: true,

})
Message.belongsTo(User,{foreignKey:'userId',as:"user"})

// Message.sync({force:true});
module.exports = Message; 