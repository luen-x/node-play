const BaseController  = require('./BaseController')
const fs = require('fs')
module.exports =  class Login extends BaseController {
	constructor(){
		super({path:'/register',method:'post'})
	}
	async handler(ctx,next){
		const query = ctx.request.body;
		console.log(query);
		fs.readFileSync(global.__projectPath+'/src/dataBase/')
		ctx.body = {status:1,msg:"正在注册"};

		await next()
	}

}