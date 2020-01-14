
const Constroller = require('./BaseController');

module.exports = [
	new Constroller({
		path: '/hi',
		method: 'get',
		rules:{account:[{required:true,message:'请填写账号'}]},
		handler: async (ctx, next) => {
			ctx.body = { msg: 'hello~', status: 1 }

		},
	}),
	new Constroller({
		path: '/hello',
		method: 'get',
		handler: async (ctx, next) => {
			ctx.body = { msg: 'hello~ ' + ctx.$user.userName, status: 1 }

		},
	})
]