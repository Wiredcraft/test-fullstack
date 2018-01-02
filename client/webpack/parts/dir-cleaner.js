const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = ({ path, root } = {}) => ({
    plugins: [
        new CleanWebpackPlugin([path], { root }),
    ],
})
