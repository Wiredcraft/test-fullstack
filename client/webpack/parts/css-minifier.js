const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')

module.exports = () => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: {
                autoprefixer: false,
                discardComments: { removeAll: true },
                safe: true,
                map: {
                    inline: false,
                },
            },
            canPrint: false,
        }),
    ],
})
