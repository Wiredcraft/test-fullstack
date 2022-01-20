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


    login: {

    },

    register: {

    },

    vote: {
        params: ["", ""],
        handler: async function(params) {

        }
    },

    unvote: {
        params: ["", ""],
        handler: async function(params) {
            
        }
    },

});