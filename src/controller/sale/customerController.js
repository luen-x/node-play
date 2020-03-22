module.exports = {
	basePath: "/customer/",
	controller: [
		{
			path: 'intention/detail',
			method: 'post',
			rules: {
				customerId: [{ required: true, message: '缺少customerId' }]
			},
			async handler(ctx, next) {
				ctx.body = {
					status: 1, 
					data: {}, 
					msg: 'success'
				};
				
			},
		},

	]
};