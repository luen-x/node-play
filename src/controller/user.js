const fs = require('fs');
const jwt = require('jsonwebtoken');
const userService = require('../service/user/user')
const lock = require('../util/lock')
const basePath = '/user';
module.exports = [
	{
		path: basePath + "/login",
		method: 'post',
		rules: {
			account: [{ required: true, message: '请填写账号' }],
			// userName:[{required:true,message:'请填写名称'}],
			password: [{ required: true, message: '请填写密码' }],
		},
		async handler(ctx, next) {
			const { account, password } = ctx.request.body;
			const exist = await userService.getUserByAccount(account);
			if (!exist) {
				ctx.body = { status: 0, msg: "账号错误" };
			} else if (exist.password !== password) {
				ctx.body = { status: 0, msg: "密码错误" };
			} else {
				const token = jwt.sign(
					{
						id: exist.id,
						account: exist.account,
						userName: exist.userName,
						exptime: Date.now() + 1 * 60 * 60 * 1000
					},
					"lawrence",
					{}
				);
				ctx.set("token", token)
				delete exist.password
				ctx.body = { status: 1, msg: "登录成功，你好" + exist.userName + "!", data: { user: exist } };
			}
		}
	},
	{
		path: basePath + '/register',
		method: 'post',
		rules: {
			account: [{ required: true, message: '请填写账号' }],
			userName: [{ required: true, message: '请填写名称' }],
			password: [{ required: true, message: '请填写密码' }],
		},
		async handler(ctx, next) {

			const { account, userName, password } = ctx.request.body;
			//  加锁，防止高并发时注册多个相同的账号；对账号加锁，允许不同的账号同时注册，只有相同的账号在同时注册时会被锁住，提高性能
			return lock.acquire('user.register-' + account, async () => {
				const exist = await userService.getUserByAccount(account);
				await new Promise(resolve => {
					setTimeout(() => {
						resolve()

					}, 500)
				});
				if (exist) {
					ctx.body = { status: 0, msg: "账号已被使用" };
				} else {
					const result = await userService.addUser({ account, userName, password })
					if (result) {
						ctx.body = { status: 1, msg: "注册成功！", data: { user: result } };
					} else {
						ctx.body = { status: 0, msg: "注册失败！" };
					}
				}

			}).catch(err => {
				console.error(err)
				ctx.body = { status: 0, msg: "注册失败！" };

			})

		}
	},
	{
		path: basePath + '/list',
		method: 'get',
		async handler(ctx, next) {
			const userList = await userService.getAllUser();
			ctx.body = { status: 1, msg: "获取成功", data: userList };

		}

	}
]