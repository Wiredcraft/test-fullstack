const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = ({include, exclude, use} = {}) => {
    const plugin = new ExtractTextPlugin({filename: '[name].[contenthash].css'})
    return {
        module: {
            rules: [
                {
                    test: /\.sass$/,
                    include,
                    exclude,
                    use: plugin.extract({use, fallback: 'style-loader'}),
                },
            ],
        },
        plugins: [plugin],
    }
}
