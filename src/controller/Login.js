const BaseController  = require('./BaseController')
const fs = require('fs');
module.exports =  class Login extends BaseController {
	constructor(){
		super({path:'/login',method:'post'})
	}
	async handler(ctx,next){
		ctx.body = {status:1,msg:"正在登陆"}
		const str = fs.readFileSync(global.__projectPath+'/src/dataBase/user.json');
		const userList = JSON.parse(str);


		await next()
	}

}