const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const parts = require('./parts')

require('dotenv').config(path.resolve(__dirname, '../../.env'))
const {
    SERVER_PORT,
    WEBPACK_PORT,
} = process.env

const paths = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
}

const commonConfig = webpackMerge([
    {
        entry: {
            app: paths.src,
        },
    },
    parts.htmlGenerator({
        template: path.resolve(__dirname, 'template.html'),
    }),
    parts.aliasResolver(),
    parts.babelLoader({ include: paths.src }),
])

const devConfig = webpackMerge([
    parts.devServer({
        port: WEBPACK_PORT,
        proxy: {
            '/api': `http://localhost:${SERVER_PORT}`,
        },
    }),
    parts.sassLoader({ include: paths.src }),
    parts.sourcemapsGenerator({ type: 'cheap-module-eval-source-map' }),
])

const prodConfig = webpackMerge([
    {
        output: {
            path: paths.dist,
            filename: '[name].[hash].js',
        },
    },
    {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
        ],
    },
    parts.faviconGenerator(path.resolve(__dirname, 'favicon.png')),
    parts.dirCleaner({
        path: paths.dist,
        root: path.resolve(__dirname, '..'),
    }),
    parts.sassExtractor({
        include: paths.src,
        use: [
            'css-loader',
            parts.autoprefixer(),
            'sass-loader',
        ],
    }),
    parts.htmlMinifier(),
    parts.cssMinifier(),
    parts.jsMinifier(),
    parts.assetsCompressor(),
    parts.bundleExtractor(),
    parts.sourcemapsGenerator({ type: 'source-map' }),
])

module.exports = env =>
    webpackMerge([
        commonConfig,
        env === 'dev' ? devConfig : prodConfig,
    ])
