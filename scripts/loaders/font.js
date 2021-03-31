module.exports = {
    test: /\.(eot|woff2?|ttf|svg)$/,
    use: [{
        loader: 'url-loader',
        options: {
            name: '[name].[ext]',
            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
            outputPath: 'assets/fonts/'
        }
    }]
}