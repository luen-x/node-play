const jwt = require("jsonwebtoken");
const tokenConfig = {
	exptime: 3600000,
	unchekPaths: ["/api/user/login", "/api/user/register"],
	unchekRegex: undefined,
};
module.exports = async function(ctx, next) {
	if (ctx.method =="OPTIONS") return ctx.body='';

	if (tokenConfig.unchekPaths.includes(ctx.path) || (tokenConfig.unchekRegex && tokenConfig.unchekRegex.test(ctx.path))) {
		await next();
	} else if (ctx.header.token) {
		const now = Date.now();
		const result = await new Promise((resolve, reject)=>{
			jwt.verify(ctx.header.token, "lawrence", {}, function(err, payload) {
				if (err) {
					resolve({ msg: "请先登录", status: 0 });
		
				} else {
					if (now - payload.exptime > tokenConfig.exptime) {
						resolve({ msg: "登录超时，请重新登录", status: -1 });
					} else if (now - payload.exptime > tokenConfig.exptime / 2) {
						// 大于一半的过期时间，刷新token
						const token = jwt.sign(
							{
								id: payload.id,
								account: payload.account,
								userName: payload.userName,
								exptime: now + tokenConfig.exptime,

							},
							"lawrence",
							{}
						);
						ctx.set("token", token);
						// ctx.response.header("token", token);
						ctx.$user = payload;
						resolve({ msg: "success", status: 1 });

					} else {
						ctx.$user = payload;
						resolve({ msg: "success", status: 1 });
					}
				}
			});
		}).catch(e=>{ console.error(e);return {msg: 'token验证异常', status: -1} ; });
		if (result && result.status==1) {
			await next();
		} else {
			ctx.body = result;
		}
	} else {
		ctx.body ={ msg: "请先登录", status: -1 };
		// res.json({ msg: "请先登录" });
	}
};
