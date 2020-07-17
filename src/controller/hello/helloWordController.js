module.exports = {
	controller: [
		{
			path: '/hello',
			method: 'get',
			rules: {
				// filed: [{ required: true, message: '请填写filed' }]
			},
			async handler(ctx, next) {
				ctx.body = {
					status: 1, 
					data: {}, 
					msg: 'hello word～'
				};
			}
		}
	]
};