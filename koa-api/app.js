const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
app.use(bodyParser());

app.keys = ['abcdefg'];


const staticFiles = require('koa-static');

const path = require('path');
app.use(staticFiles(path.join(__dirname, 'public')));
const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
};

app.use(session(CONFIG, app));

// 引入 路由
const talk = require('./routes/talk').prefix('/api');
// 使用路由
app.use(talk.routes()).use(talk.allowedMethods())


// 使用路由，监听3000 端口
app.listen(3000)
console.log('ok http://localhost:3000')