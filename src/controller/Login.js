const BaseController  = require('./BaseController')
const fs = require('fs');
module.exports =  class Login extends BaseController {
	constructor(){
		super({path:'/login',method:'post'})
	}
	async handler(ctx,next){
		const {account,password} = ctx.request.body;
		if(!account){
			ctx.body = {status:0,msg:"账号不能为空"};
			await next()
		}else if(!password) {
			ctx.body = {status:0,msg:"密码不能为空"};
			await next()
		}else {
			const users = JSON.parse(fs.readFileSync(global.__projectPath+'/src/dataBase/user.json'));
			const exist = users.find(user=>user.account===account);
			if(!exist){
				ctx.body = {status:0,msg:"账号错误"};
				await next()
			}else if(!exist.password === password) {
				ctx.body = {status:0,msg:"密码错误"};
				await next()
			}else {
				ctx.body = {status:0,msg:"登陆成功!",data:{user:exist}};
			}
		}	
	}

}