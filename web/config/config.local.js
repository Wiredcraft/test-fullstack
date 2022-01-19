module.exports = {
    development: {
        ignoreDirs: [
            'app/.next',
            'app/components',
            'app/pages',
            'app/util',
            'app/public',
            'app/next.config.js'
        ]
    },

    broker: {
        url: "http://127.0.0.1:7000"
    }
};