const Controller = require('egg').Controller;

class SiteController extends Controller {
  async default() {
    const { ctx, app } = this;
    await app.next.render(ctx.req, ctx.res, ctx.path, {...ctx.query, ...ctx.params});
    ctx.respond = false;
  }

  async login() {
    const { ctx, app } = this;

    if (ctx.session.user) {
      ctx.redirect('/')
    } else {
      await app.next.render(ctx.req, ctx.res, '/login', {...ctx.query, ...ctx.params});
      ctx.respond = false;
    }
  }

  async logout() {
    this.ctx.session.user = null;
    this.ctx.redirect('/');
  }

  async register() {
    const { ctx, app } = this;

    if (ctx.session.user) {
      ctx.redirect('/')
    } else {
      await app.next.render(ctx.req, ctx.res, '/register', {...ctx.query, ...ctx.params});
      ctx.respond = false;
    }
  }

  async reset() {
    const { ctx, app } = this;

    if (ctx.session.user) {
      ctx.redirect('/')
    } else {
      await app.next.render(ctx.req, ctx.res, '/reset', {...ctx.query, ...ctx.params});
      ctx.respond = false;
    }
  }

  async append() {
    const { ctx, app } = this;
    await app.next.render(ctx.req, ctx.res, '/append', {...ctx.query, ...ctx.params});
    ctx.respond = false;
  }

  async topic() {
    const { ctx, app } = this;
    await app.next.render(ctx.req, ctx.res, '/topic', {...ctx.query, ...ctx.params});
    ctx.respond = false;
  }

  async post() {
    const { ctx, app } = this;
    await app.next.render(ctx.req, ctx.res, '/post', {...ctx.query, ...ctx.params});
    ctx.respond = false;
  }

  async user() {
    const { ctx, app } = this;
    await app.next.render(ctx.req, ctx.res, '/user', {...ctx.query, ...ctx.params});
    ctx.respond = false;
  }

  async admin() {
    const { ctx, app } = this;
    await app.next.render(ctx.req, ctx.res, '/admin', {...ctx.query, ...ctx.params});
    ctx.respond = false;
  }

  async blocked() {
    const { ctx, app } = this;
    await app.next.render(ctx.req, ctx.res, '/blocked', {...ctx.query, ...ctx.params});
    ctx.respond = false;
  }

}

module.exports = SiteController;