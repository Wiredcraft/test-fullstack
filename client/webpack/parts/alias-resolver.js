const path = require('path')

module.exports = () => ({
    resolve: {
        extensions: ['.js', '.json', 'sass'],
        alias: {
            '@components': path.resolve(__dirname, '../../src/components'),
            '@styles': path.resolve(__dirname, '../../src/styles'),
        },
    },
})
