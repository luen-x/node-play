export default class BaseController {
	constructor (option) {
		this.method=option.method || 'get';
		this.path = option.path
	}
	async handler(ctx,next){


	}
}
// module.exports.default = BaseController