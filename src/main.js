global.__projectPath = process.cwd();
const Koa = require('koa');
const router = require('koa-router')();

const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const bodyParser = require('koa-bodyparser');
const crossOrigin = require('./middleware/crossOrigin');
const catchException = require('./middleware/catchException');
const wsService = require('./socket/socket');
const controllers = require('./controller/root');
const checkToken = require('./middleware/checkToken');
// console.log(controllers)
const app = new Koa();

app.use(crossOrigin);
app.use(catchException);
// app.use(checkToken);
app.use(bodyParser());
controllers.forEach(con=>{
	router[con.method](con.path, con.validate.bind(con), con.handler.bind(con));
}); 
app.use(router.routes()).use(router.allowedMethods());
// 以上为官方推荐方式，allowedMethods用在routes之后，作用是根据ctx.status设置response header.
app.use(historyApiFallback({ whiteList: ['/api'] }));
app.use(require('koa-static')('./frontend/dist'));

app.listen(80, err => {
	if (err) { throw err; }
    
	console.log('http://localhost:80/index.html');
});
// wsService.start(); 

