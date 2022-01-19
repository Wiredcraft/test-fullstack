const { Op, Transaction } = require('sequelize');
const DbService = require('../DbService');

module.exports = Object.assign({}, DbService, {    
    name: 'hacknews',
    config: {
        ...require('../../config').hacknews
    },

    async start() {
        await this.init();
    },

    send: {
        params: ["from", "to", "subject", "text", "html"],
        handler: async function(params) {
            await this.transporter.sendMail(params);
        }
    }
});