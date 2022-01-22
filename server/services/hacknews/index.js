const crypto = require('crypto');
const DbService = require('../DbService');
const ValidationError = require('../../errors/ValidationError');
const { Op } = require("sequelize");

module.exports = Object.assign({}, DbService, {    
    name: 'hacknews',
    baseDir: __dirname,
    config: {
        ...require('../../config').hacknews
    },

    async start() {
        await this.init();
    },

    login: {
        params: [ "name", "password"],
        handler: async function(params) {
            const { name, password } = params;
            const user = await this.get('User', { where: { name } });
            if (!user || user.password !== this._encrypt(password, user.salt)) {
                throw new ValidationError('Invalid name or password', {
                    password: "Invalid name or password"
                })
            }
            return user;
        }
    },

    register: {
        params: [ "name", "password"],
        handler: async function(params) {
            const { name, password } = params;
            const transaction = await this.transaction();
            try {
                const exists = await this.get('User', {
                    where: { name }, 
                    transaction 
                });
                if (exists) {
                    throw new ValidationError('Name already used', {
                        name: "Name already used"
                    })
                }
                const salt = this.id();
                const user = await this.create('User', {
                    id: this.id(),
                    name,
                    salt,
                    password: this._encrypt(password, salt)
                }, {
                    transaction
                });
                
                await transaction.commit();
                return user;
            } catch (error) {
                await transaction.rollback();
                throw error;
            }
        }
    },

    addTalk: {
        params: [ "title", "description", "createdBy"],
        handler: async function(params) {
            const { title, description, createdBy } = params;
            const talk = await this.create('Talk', {
                id: this.id(),
                title,
                description,
                createdBy,
            });

            return talk;
        }
    },

    pageTalk: {
        params: [ "page", "pageSize"],
        handler: async function(params) {
            const { page = 1, pageSize = 30 } = params;

            const results = await this.page('Talk', {
                offset: ( page - 1) * pageSize,
                limit: pageSize,
                order: [
                    ["points", "DESC"]
                ],
            });

            await this.populate(results.rows, {
                model: 'User',
                field: 'createdBy',
                attributes: ["id", "name"]
            });

            return results;
        }
    },

    listVote: {
        params: ["talks", "voteBy"],
        handler: async function(params) {
            const { talks = [], voteBy } = params;
            const votes = await this.list('Vote', {
                where: {
                    [Op.and]: [
                        {
                            voteBy: voteBy,
                            talk: talks
                        }
                    ]
                }
            });
            return votes;
        }
    },

    voteTalk: {
        params: ["talk", "voteBy"],
        handler: async function(params) {
            const { talk, voteBy } = params;
            
            const transaction = await this.transaction();
            try {
                const vote = await this.get('Vote', {
                    where: { talk, voteBy },
                    transaction
                });
                if (!vote) {
                    await this.create('Vote', { id: this.id(), talk, voteBy}, {
                        transaction
                    })
                    const points = await this.count('Vote', {
                        where: { talk },
                        transaction
                    });
        
                    await this.update('Talk', {
                        points: points,
                    }, {
                        where: { id: talk },
                        transaction
                    });
                }
                await transaction.commit();
                return true;
            } catch (error) {
                await transaction.rollback();
                throw error;
            }
        }
    },

    _encrypt(str, key) {
        return crypto.createHmac('sha1', key).update(str).digest().toString('base64');
    },
});