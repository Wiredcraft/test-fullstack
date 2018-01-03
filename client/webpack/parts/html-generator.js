const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ filename = 'index.html', template } = {}) => ({
    plugins: [
        new HtmlWebpackPlugin({
            filename,
            template,
        }),
    ],
})
