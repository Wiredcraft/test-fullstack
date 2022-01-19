const fs = require('mz/fs');
const path = require('path');
const _ = require('lodash');
const Controller = require('egg').Controller;

class ApiController extends Controller {
    async login() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        await ctx.validate('login')(body);

        if (ctx.session.captcha !== body.captcha) {
            throw Object.assign(new Error(), {
                name: "ValidationError",
                data: {
                    captcha: "验证码不正确"
                }
            })
        }

        const user = await app.broker.call('Utopia.login', body);
        ctx.session.user = { 
            id: user.id, 
            name: user.name,
            avatar: user.avatar 
        };
        ctx.session.captcha = null;
    }

    async register() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        await ctx.validate('register')(body);

        const user = await app.broker.call('Utopia.register', body);

        const avatar = ctx.helper.avatar();
        await fs.writeFile(path.join(app.config.avatarDir, avatar.name), avatar.data);
        await ctx.oss.put('avatars/' + avatar.name, path.join(app.config.avatarDir, avatar.name));

        await app.broker.call('Utopia.updateUserInfo', { 
            id: user.id, 
            avatar: avatar.name 
        });

        ctx.session.user = { 
            id: user.id, 
            name: user.name, 
            avatar: avatar.name 
        };

        return true;
    }

    async reset() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        await ctx.validate('reset')(body);
        ctx.body = await app.broker.call('Utopia.reset', body);
    }

    async verify() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        await ctx.validate('verify')(body);
        await app.broker.call('Utopia.verify', { target: body.email });
    }

    async layout() {
        const { ctx, app } = this;

        let user = null;
        let topics = [];
        if (ctx.session.user) {
            user = await app.broker.call('Utopia.getUser', { id: ctx.session.user.id });
            topics = await app.broker.call('Utopia.followedTopic', { 
                source: ctx.session.user.id 
            });
        }

        if(!topics.length || topics.length < 12 ) {
            const hottest = await app.broker.call('Utopia.hottestTopic');
            topics = topics.concat(hottest);
            topics = _.uniqBy(topics, 'id');
            topics = _.take(topics, 15);
        }

        ctx.body = {
            user: user,
            topics: topics
        }
    }

    async getTopic() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        let topic;
        if (query.id == 0) {
            topic = {
                id: 0,
                name: '全部'
            }
        } else {
            topic = await app.broker.call('Utopia.getTopic', {
                id: query.id
            })

            if (ctx.session.user) {
                topic.followed = await app.broker.call('Utopia.getRelation', {
                    source: ctx.session.user.id,
                    type: 'FOLLOW_TOPIC',
                    target: topic.id
                })
            }
        }

        ctx.body = topic;
    }

    async pageTopic() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        ctx.body = await app.broker.call('Utopia.pageTopic', {
            page: query.page,
            pageSize: 100
        })
    }

    async getPost() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        const post = await app.broker.call('Utopia.getPost', { id: query.id });

        if (ctx.session.user) {
            await Promise.all([
                this._populateRelation([post], {
                    target: 'id',
                    field: 'blocked',
                    type: 'BLOCK_POST'                    
                }),
                this._populateRelation([post], {
                    target: 'id',
                    field: 'liked',
                    type: 'LIKE_POST'                    
                })
            ])
        }

        ctx.body = post;
    }

    async viewPost() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        if (ctx.session.user) {
            ctx.body = await app.broker.call('Utopia.viewPost', {
                source: ctx.session.user.id,
                type: 'VIEW_POST',
                target: query.id
            });
        }
    }

    async addPost() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        await ctx.validate('post')(body);

        ctx.body = await app.broker.call('Utopia.addPost', {
            ...body,
            creator: ctx.session.user.id
        });
    }

    async appendPost() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        await ctx.validate('append')(body);

        ctx.body = await app.broker.call('Utopia.appendPost', {
            id: body.id,
            content: body.content,
            creator: ctx.session.user.id
        });
    }

    async pagePost() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        if (query.topic) {
            const params = {
                page: query.page || 1,
                pageSize: 30         
            };
            if (query.topic !== '0') {
                params.topic = query.topic;
            }

            ctx.body = await app.broker.call('Utopia.pagePost', params)
        }

        if (query.creator) {
            ctx.body = await app.broker.call('Utopia.pagePost', {
                creator: query.creator,
                page: query.page || 1,
                pageSize: 10
            })
        }
    }

    async addReply() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        await ctx.validate('reply')(body);

        ctx.body = await app.broker.call('Utopia.addReply', {
            ...body,
            creator: ctx.session.user.id
        });
    }

    async pageReply() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        if (query.post) {
            const replies = await app.broker.call('Utopia.pageReply', {
                post: query.post,
                page: query.page || 1,
                pageSize: 50
            })

            if (ctx.session.user) {
                await Promise.all([
                    this._populateRelation(replies.rows, {
                        target: 'id',
                        field: 'blocked',
                        type: 'BLOCK_REPLY'
                    }),
                    this._populateRelation(replies.rows, {
                        target: 'id',
                        field: 'liked',
                        type: 'LIKE_REPLY'
                    })
                ])
            }

            ctx.body = replies;
        }

        if (query.creator) {
            ctx.body = await app.broker.call('Utopia.pageReply', {
                creator: query.creator,
                page: query.page || 1,
                pageSize: 10
            })
        }
    }

    async getUser() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        if (query.id) {
            const user = await app.broker.call('Utopia.getUser', { id: query.id });
            if (ctx.session.user) {
                await Promise.all([
                    this._populateRelation([user], {
                        target: 'id',
                        field: 'blocked',
                        type: 'BLOCK_USER'                    
                    }),
                    this._populateRelation([user], {
                        target: 'id',
                        field: 'liked',
                        type: 'LIKE_USER'                    
                    })
                ])
            }
            ctx.body = user;
        } else {
            ctx.body = await app.broker.call('Utopia.getUser', { id: ctx.session.user.id });
        }
    }

    async updateUserInfo() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        ctx.body = await app.broker.call('Utopia.updateUserInfo', { 
            ...body,
            id: ctx.session.user.id
         });
    }

    async updateUserAvatar() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        const input = path.join(app.config.tempDir, body.input);
        const output = path.join(app.config.avatarDir, body.input);

        await ctx.helper.extractImage(input, output, body.select);

        await ctx.oss.put('avatars/' + body.input, output);

        ctx.body = await app.broker.call('Utopia.updateUserInfo', {
            avatar: body.input,
            id: ctx.session.user.id
        })
    }

    async updateUserPassword() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        await ctx.validate('password')(body);

        ctx.body = await app.broker.call('Utopia.updateUserPassword', {
            ...body,
            id: ctx.session.user.id
        })
    }

    async pageMessage() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        ctx.body = await app.broker.call('Utopia.pageMessage', {
            target: ctx.session.user.id,
            page: query.page || 1,
            pageSize: 10
        })
    }

    async readMessage() {
        const { ctx, app } = this;

        await app.broker.call('Utopia.readMessage', {
            target: ctx.session.user.id
        })

        ctx.body = true;
    }

    async relation() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        await ctx.validate('relation')(body);

        ctx.body = await app.broker.call('Utopia.relation', {    
            source: ctx.session.user.id,
            type: body.type,
            target: body.target
        });
    }

    async unrelation() {
        const { ctx, app } = this;
        const { body } = ctx.request;

        await ctx.validate('unrelation')(body);

        ctx.body = await app.broker.call('Utopia.unrelation', {
            source: ctx.session.user.id,
            type: body.type,
            target: body.target
        })
    }

    async blocked() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        ctx.body = await app.broker.call('Utopia.blocked', {
            type: (query.type || 'post').toUpperCase()
        });
    }

    async suggest() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        ctx.body = await app.broker.call('Utopia.suggest', {
            type: query.type,
            keyword: query.keyword
        });
    }

    async topicWidget() {
        const { ctx, app } = this;

        if (ctx.query.type == 'latest') {
            ctx.body = await app.broker.call('Utopia.latestTopic');
        }

        if (ctx.query.type == 'hottest') {
            ctx.body = await app.broker.call('Utopia.hottestTopic');
        }
    }

    async postWidget() {
        const { ctx, app } = this;

        if (ctx.query.type == 'hottest') {
            ctx.body = await app.broker.call('Utopia.hottestPost', {
                topic: ctx.query.topic
            });
        }

        if (ctx.query.type == 'related') {
            ctx.body = await app.broker.call('Utopia.relatedPost', {
                creator: ctx.query.creator
            });
        }
    }

    async userWidget() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        const creator = await app.broker.call('Utopia.getUser', {
            id: query.id
        })

        if (ctx.session.user) {
            await Promise.all([
                this._populateRelation([creator], {
                    target: 'id',
                    field: 'blocked',
                    type: 'BLOCK_USER'
                }),
                this._populateRelation([creator], {
                    target: 'id',
                    field: 'liked',
                    type: 'LIKE_USER'
                })
            ])
        }

        ctx.body = creator;
    }

    async statWidget() {
        const { ctx, app } = this;
        const { query } = ctx.request;

        ctx.body = await app.broker.call('Utopia.stat', {
            type: query.type,
            creator: query.creator
        });
    }

    async upload() {
        const { ctx, app } = this;
        const [ file ] = ctx.request.files;

        let newFile;
        try {
            newFile = await ctx.helper.rename(file.filepath, app.config.uploadDir);
        } finally {
            await ctx.oss.put('uploads/' + newFile, path.join(app.config.uploadDir, newFile));
        }
        
        ctx.body = {
            name: path.basename(file.filename),
            url: app.config.cdnDomain + '/uploads/' + newFile
        }
    }

    async uploadAvatar() {
        const { ctx, app } = this;
        const [ file ] = ctx.request.files;

        let newFile;
        try {
            newFile = await ctx.helper.rename(file.filepath, app.config.tempDir);
        } finally {
            // 需要删除临时文件
            // fs.unlinkSync(file.filepath);
        }
        
        if (ctx.helper.isImage(newFile)) {
            ctx.body = {
                name: path.basename(newFile)
            }
        } else {
            throw Object.assign(new Error(), {
                name: 'ApplicationError',
                messsage: '不是合法的图片文件'
            })
        }
    }

    async _populateRelation(rows, options) {
        const { ctx, app } = this;
        
        const relations = await app.broker.call('Utopia.listRelation', {
            source: ctx.session.user.id,
            type: options.type,
            target: rows.map(item => item[options.target])
        });

        rows.forEach((item) => {
            item[options.field] = !!_.find(relations, { source: ctx.session.user.id, type: options.type, target: item.id });
        })
    }
}

module.exports = ApiController;