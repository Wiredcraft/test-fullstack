const talkModel = require('../models/talkModel');
const uuid = require('../utils/uuid')

//TODO: use a helper to form the response structure
const talkController = {
    talkAll: async(ctx, next) => {
        try {
            if (!ctx.session.userId) {
                ctx.session.userId = uuid()
            }
            let talkAll = await talkModel.getAll();
            ctx.body = talkAll
        } catch (err) {
            ctx.body = 'get failed';
            ctx.status = err.status || 500;
        }
    },
    talkSingle: async(ctx, next) => {
        let id = ctx.params.id;
        try {
            let talkSingle = await talkModel.single(id);
            ctx.body = talkSingle
            ctx.status = 200
        } catch (error) {
            ctx.body = 'get failed';
            ctx.status = err.status || 500;
        }
    },
    talkAdd: async(ctx, next) => {
        let title = ctx.request.body.title;
        let content = ctx.request.body.content;
        //判断输入值
        if (!title || !content) {
            return ctx.body = 'params required'
        }

        try {
            await talkModel.insert({ title, content })
            ctx.status = 200
            ctx.body = 'insert succeed!'
        } catch (err) {
            ctx.body = 'insert failed!';
            ctx.status = err.status || 500;
        }
    },
    talkEdit: async(ctx, next) => {
        let pathId = ctx.params.id;
        try {
            let msg = await talkModel.update(pathId, ctx.session.userId)
            ctx.status = 200
            ctx.body = msg

        } catch (err) {
            ctx.body = err.message;
            ctx.status = err.status || 500;
        }
    },
}

module.exports = talkController;