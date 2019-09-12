import BaseController from './BaseController'
export default class Hello extends BaseController {
	handler(ctx,next){
		ctx.body = 'hello luen'
	}

}
