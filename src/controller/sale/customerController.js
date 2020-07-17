const fs = require('fs');
const path = require('path');
module.exports = {
	basePath: "/customer",
	controller: [
		{
			path: '/intention/detail',
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
		{
			path: '/intention/download',
			method: 'post',
			rules: {
				// customerId: [{ required: true, message: '缺少customerId' }]
			},
			async handler(ctx, next) {
				console.log('in');
				const filePath = path.join(global.__projectPath, 'static/img/no-message-01.png');
				console.log(filePath);
				// eslint-disable-next-line no-sync
				var stats = fs.statSync(filePath);
				ctx.set({
					'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
					'Content-Disposition': 'attachment; filename=111', //告诉浏览器这是一个需要下载的文件
					'Content-Length': stats.size //文件大小
				});
				
				fs.createReadStream(filePath).pipe(ctx.res);
				
			},
		},

	]
};