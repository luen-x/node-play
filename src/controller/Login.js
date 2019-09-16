const BaseController  = require('./BaseController')
module.exports =  class Login extends BaseController {
	constructor(){
		super({path:'/login',method:'post'})
	}
	async handler(ctx,next){
		ctx.body = '正在登陆'
		await next()
	}

}