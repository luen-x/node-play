const sequelize = require('../dataBase/sequelize')
const Sequelize = require('sequelize')
module.exports = [
	{
		path: '/hi',
		method: 'get',
		// rules:{account:[{required:true,message:'请填写账号'}]},
		handler: async (ctx, next) => {
			ctx.body = { msg: 'hello~', status: 1 }

		},
	},
	{
		path: '/hello',
		method: 'get',
		handler: async (ctx, next) => {
			ctx.body = { msg: 'hello~ ' + ctx.$user.userName, status: 1 }

		},
	},
	{
		path: '/query',
		method: 'post',
		handler: async (ctx, next) => {
			Sequelize.q
			
			ctx.body = { msg: 'hello~ ' + ctx.$user.userName, status: 1 }

		},
	},


]