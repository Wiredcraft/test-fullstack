'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { body } = ctx.request;

    await ctx.validate('login')(body);

    const user = await app.broker.call('hacknews.login', body);

    ctx.session.user = {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    };
  }

  async register() {
    const { ctx, app } = this;
    const { body } = ctx.request;

    await ctx.validate('register')(body);

    const user = await app.broker.call('hacknews.register', body);

    ctx.session.user = {
      id: user.id,
      name: user.name,
      avatar: avatar.name
    };
  }

  async addTalk() {
    const { ctx, app } = this;
    const { body } = ctx.request;

    await ctx.validate('talk')(body);

    ctx.body = await app.broker.call('hacknews.addTalk', {
      ...body,
      creator: ctx.session.user.id
    });
  }

  async voteTalk() {
    const { ctx, app } = this;
    const { body } = ctx.request;

    ctx.body = await app.broker.call('hacknews.voteTalk', {
      ...body,
      creator: ctx.session.user.id
    });
  }

  async unvoteTalk() {
    const { ctx, app } = this;
    const { body } = ctx.request;

    ctx.body = await app.broker.call('hacknews.unvoteTalk', {
      ...body,
      creator: ctx.session.user.id
    });
  }
}

module.exports = ApiController;