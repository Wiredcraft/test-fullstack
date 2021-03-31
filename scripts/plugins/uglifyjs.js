// 并行压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = new UglifyJsPlugin({
    uglifyOptions: {
        warnings: false,
        parse: {},
        compress: {},
        mangle: true,
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_fnames: false,
    },
    cache: true,
    parallel: true,
    sourceMap: true
})