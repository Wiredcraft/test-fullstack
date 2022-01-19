const nodemailer = require("nodemailer");

module.exports = {    
    name: 'mail',
    config: {
        ...require('../../config').mail
    },

    async start() {
        this.transporter = nodemailer.createTransport(this.config);
    },

    send: {
        params: ["from", "to", "subject", "text", "html"],
        handler: async function(params) {
            await this.transporter.sendMail(params);
        }
    }
}