global.__projectPath = process.cwd()
const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const crossOrigin = require('./middleware/crossOrigin');
const wsService = require('./service/socket');
const controllers = require('./controller/root');
console.log(controllers)


const app = new Koa();
app.use(crossOrigin);
app.use(bodyParser());
controllers.forEach(con=>{
    router[con.method](con.path,con.handler)
})
// router.get('/', async ctx => {
//     ctx.body = 'Hello Router';
// })
// router.get('/hello', async ctx => {
//     console.log( ctx.request.query)
//     ctx.body = 'Hello Lawrence';
   
// })
// router.post('/hi', async ctx => {
//     console.log( ctx.request.body)
//     ctx.body = 'Hello Lawrence';
   
// })

// 启动路由
app.use(router.routes()).use(router.allowedMethods())
// 以上为官方推荐方式，allowedMethods用在routes之后，作用是根据ctx.status设置response header.

app.use(require('koa-static')('./static'))

app.listen(3000, err => {
 
    if (err) throw err;
    console.log('http://localhost:3000/index.html');
});
wsService.start()
