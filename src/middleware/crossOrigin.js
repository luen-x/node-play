module.exports = async function(ctx, next) {
    ctx.set("Access-Control-Allow-Origin", ctx.header.origin);
    ctx.set(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, DELETE, OPTIONS"
    );
	ctx.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, token, -token"
    );
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set("Access-Control-Expose-Headers", "token, -token");
   // res.header("Content-Type", "application/json");    
    // if(ctx.method == "OPTIONS") return;

    await next();  
};