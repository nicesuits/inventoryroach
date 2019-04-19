const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');

const app = new Koa();
const router = new Router();
const issuesRouter = new Router({ prefix: '/api/v1' });

const basicRoutes = require('./routes/basic');
const issuesRoutes = require('./routes/issues');

basicRoutes({ router });
issuesRoutes({ issuesRouter });

app.use(router.routes());
app.use(router.allowedMethods());

app.use(issuesRouter.routes());
app.use(issuesRouter.allowedMethods());

app.use(logger());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

const server = app.listen(3000);
module.exports = server;
