const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const ApplicationError = require('../errors/ApplicationError');
const { Sequelize, Op, Transaction } = require('sequelize');

module.exports = {
    async init() {
        const defaultConfig = {
            host: 'localhost',
            port: 3306,
            username: 'root',
            benchmark: true,
            define: {
                freezeTableName: false,
                underscored: true,
            },
            logging: (...args) => {
                this.logger.debug('[DbService]%s %s',  args[1] === 'number' ? `(${args[1]}ms)` : '', args[0]);
            }
        }

        const config = {
            ...defaultConfig,
            ...this.config || {}
        }

        this.db = config.connectionUri ?
            new Sequelize(config.connectionUri, config) :
            new Sequelize(config.database, config.username, config.password, config);

        try {
            await this.db.authenticate();
        } catch (error) {
            const message = `Connect to the database failed: ${error.message}`;
            this.logger.error('[DbService]%s',  message);
            throw new ApplicationError(message);
        }
    
        const modelDir = path.join(this.baseDir, 'models');
        fs.readdirSync(modelDir).forEach(file => {
            require(path.join(modelDir, file))(this.db);
        });

        this.db.sync({});
    },

    id() {
        return `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    },

    model(name) {
        return this.db.models[name];
    },

    async transaction() {
        return this.db.transaction({ type: Transaction.TYPES.EXCLUSIVE });
    },

    async get(name, ...args) {
        return this.model(name).findOne.apply(this.model(name), args)
            .then(result => {
                return result ? result.toJSON() : result;
            });
    },

    async list(name, ...args) {
        return this.model(name).findAll.apply(this.model(name), args)
            .then(results => {
                results = results.map(item => item.toJSON());
                return results;                
            });
    },

    async page(name, ...args) {
        return this.model(name).findAndCountAll.apply(this.model(name), args)
            .then(results => {
                results.rows = results.rows.map(item => item.toJSON());
                return results;                
            });
    },

    async count(name, ...args) {
        return this.model(name).count.apply(this.model(name), args);
    },

    async create(name, ...args) {
        return this.model(name).create.apply(this.model(name), args)
            .then(result => {
                return result ? result.toJSON() : result;
            })
    },

    async update(name, ...args) {
        return this.model(name).update.apply(this.model(name), args);
    },

    async delete(name, ...args) {
        return this.model(name).destroy.apply(this.model(name), args);
    },

    async populate(rows, { model, field, attributes = [] }) {
        return this.list(model, {
            attributes: attributes,
            where: {
                id: {
                    [Op.in]: _(rows).map(field).filter(item => item).uniq().value()
                }
            }
        }).then(results => {
            const mappings = {};
            results.forEach(item => {
                mappings[item.id] = item;
            })
            rows.forEach(item => {
                if(_.get(item, field)) {
                    item[field] = {...mappings[item[field]]};
                }
            });
            return rows;
        });
    }
}