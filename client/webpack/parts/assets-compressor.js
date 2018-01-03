const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = () => ({
    plugins: [new CompressionWebpackPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$/,
        minRatio: 1,
    })],
})
