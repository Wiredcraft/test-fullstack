const webpack = require('webpack')

module.exports = ({ vendor = [] } = {}) => ({
    entry: {
        vendor: [
            'react',
            'react-dom',
            'redux',
            'redux-thunk',
            'axios',
            'es6-promise/auto',
            ...vendor
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
        }),
    ],
})
