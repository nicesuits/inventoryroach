const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');

const app = new Koa();
const router = new Router();

const basicRoutes = require('./routes/basic');

basicRoutes({ router });

app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.listen(3000);
