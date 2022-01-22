'use strict';
const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;

class ApiController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { body } = ctx.request;

    await ctx.validate('login')(body);

    const user = await app.broker.call('hacknews.login', body);

    ctx.body = {
      id: user.id,
      name: user.name,
      token: jwt.sign({ id: user.id, name: user.name, }, app.config.keys, { expiresIn: '24h' } )
    }

    ctx.logger.info(`${user.id} logined`);
  }

  async register() {
    const { ctx, app } = this;
    const { body } = ctx.request;

    await ctx.validate('register')(body);

    const user = await app.broker.call('hacknews.register', body);

    ctx.body = {
      id: user.id,
      name: user.name,
      token: jwt.sign({ id: user.id, name: user.name, }, app.config.keys, { expiresIn: '24h' } )
    }

    ctx.logger.info(`${user.id} registerd`);
  }

  async pageTalk() {
    const { ctx, app } = this;
    const { query } = ctx.request;

    const talks = await app.broker.call('hacknews.pageTalk', {
        page: query.page || 1,
        pageSize: 10
    });

    if (ctx.user) {
      const votes = await app.broker.call('hacknews.listVote', {
        talks: talks.rows.map(item => item.id),
        voteBy: ctx.user.id
      });
      
      const voteMap = {};
      votes.forEach(v => {
        voteMap[v.talk] = true;
      })

      talks.rows.forEach(row => {
        row.voted = !!voteMap[row.id]
      });
    }

    ctx.body = talks;
  }

  async addTalk() {
    const { ctx, app } = this;
    const { body } = ctx.request;

    await ctx.validate('talk')(body);

    ctx.body = await app.broker.call('hacknews.addTalk', {
      ...body,
      createdBy: ctx.user.id
    });

    ctx.logger.info(`${ctx.user.id} add talk ${ctx.body.id}`);
  }

  async voteTalk() {
    const { ctx, app } = this;
    const { body } = ctx.request;

    ctx.body = await app.broker.call('hacknews.voteTalk', {
      ...body,
      voteBy: ctx.user.id
    });

    ctx.logger.info(`${ctx.user.id} vote talk ${body.talk}`)
  }
}

module.exports = ApiController;