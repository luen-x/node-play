module.exports = {
	basePath: "/hi",
	controller: [
		{
			path: '/lun',
			method: 'get',
			rules: {
				// filed: [{ required: true, message: '请填写filed' }]
			},
			async handler(ctx, next) { 
				ctx.body = {
					status: 1, 
					data: {}, 
					msg: '你好～'
				};
			}
		}
	]
};