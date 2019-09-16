const BaseController  = require('./BaseController')
module.exports =  class Hello extends BaseController {
	constructor(){
		super({path:'/hello',method:'get'})
	}
	handler(ctx,next){
		ctx.body = 'hello luen'
	}

}
