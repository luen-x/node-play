const Validator = require('async-validator').default;
// console.log(Validator)
class Controller {
	constructor({ path, method = 'get', handler, rules,option={} }) {
		this.path = path;
		this.method = method;
		this.handler = handler;
		// this.rules = rules;
		if (rules) {
			this.validator = new Validator(rules);
		}
		this.option = option;

	}
	async validate(ctx, next) {
		if (this.validator) {
			const result = await this.validator.validate(ctx.request.body).catch(({ errors, fields }) => errors);
			console.log(result)
			if (!result) {
				await next()
			} else {
				ctx.body = { status: 0, msg: result[0].message }
			}

		} else {
			await next()
		}
	}
}
module.exports = Controller