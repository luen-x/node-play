
const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const User =require('./user')

class Case extends Sequelize.Model { }
Case.init(
	{
		id: {
			type: Sequelize.BIGINT,
			autoIncrement: true,
			primaryKey: true
		},
		industryId: {
			type:Sequelize.BIGINT,
		},
		productTypeId: {
			type:Sequelize.BIGINT,
		},
		customerTypeId:{
			type:Sequelize.BIGINT,
		},
		province:{
			type:Sequelize.BIGINT,

		},
		content: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
	
	}, {
	sequelize,
	modelName: 'case',
	timestamps: false,

})
// Message.belongsTo(User,{foreignKey:'userId',as:"user"})

Case.sync({
	// force:true
});
module.exports = Case; 