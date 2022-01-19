"use strict";

module.exports = {
    hacknews: {
        connectionUri: 'sqlite::memory:'
    },
    mail: {
        host: 'smtp.mxhichina.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: '',
            pass: ''
        }
    }
}