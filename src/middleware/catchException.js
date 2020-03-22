module.exports = async function(ctx, next) {
	const result = await next().catch(e=>{
		console.error(e);
		return {status: 0, msg: e.message, exception: 1};
	});
	if (result && result.exception) ctx.body = result;     
};