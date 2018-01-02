const BabiliWebpackPlugin = require('babili-webpack-plugin')

module.exports = () => ({
    plugins: [
        new BabiliWebpackPlugin(),
    ],
})
