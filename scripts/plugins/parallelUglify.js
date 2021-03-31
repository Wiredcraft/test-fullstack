
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
module.export = {
    plugins: [
        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            uglifyJs: {
                compress: {
                    warnings: false
                },
                sourceMap: true
            }
        })
    ]
}