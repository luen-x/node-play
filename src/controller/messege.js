const fs = require('fs');

const Message = require('../dataBase/models/message')
const User = require('../dataBase/models/user')
const basePath = '/message';
module.exports = [
	{
		path: basePath + "/add",
		method: 'post',
		rules: {
			msg: [{ required: true, message: '请填写消息' }],

		},
		async handler(ctx, next) {
			const { msg } = ctx.request.body;
			const result = await Message.create({
				userId: ctx.$user.id,
				content: msg,
			}).then(res => res.get()).catch(e => { console.error(res); throw new Error('发送失败') })
			ctx.body = { status: 1, msg: '发送成功', data: { message: {...result,user:ctx.$user} } }
		}
	},
	{
		path: basePath + "/list",
		method: 'get',
		// rules: {


		// },
		async handler(ctx, next) {
			const result = await Message.findAll({
				include: [
					{ model: User, required: true, as: 'user', attributes: ['id', 'userName', 'account'] },
				],
				limit:50,
				order:[['createdAt',"DESC"]]
			}).then(res => res.map(i => i.get())).catch(e => { console.error(e); throw new Error('获取失败') })
			ctx.body = { status: 1, msg: '获取成功', data: result }
		}
	},


]