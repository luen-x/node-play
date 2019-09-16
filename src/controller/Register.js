const BaseController  = require('./BaseController')
const fs = require('fs')
module.exports =  class Login extends BaseController {
	constructor(){
		super({path:'/register',method:'post'})
	}
	async handler(ctx,next){
		const {account,userName,password} = ctx.request.body;
		if(!account){
			ctx.body = {status:0,msg:"账号不能为空"};
			await next()

		}else if(!password) {
			ctx.body = {status:0,msg:"密码不能为空"};
			await next()

		}else if(!userName) {
			ctx.body = {status:0,msg:"昵称不能为空"};
			await next()

		}else {
			const users = JSON.parse(fs.readFileSync(global.__projectPath+'/src/dataBase/user.json'));
			const exist = users.find(user=>user.account===account);
			if(exist){
				ctx.body = {status:0,msg:"账号已被使用"};
				await next()
			}else {
				users.push({account,userName,password});
				const result = fs.writeFileSync(global.__projectPath+'/src/dataBase/user.json',JSON.stringify(users));
				console.log(result);
				ctx.body = {status:1,msg:"注册成功！"};
				await next()
			}
		}
		
		
	}

}