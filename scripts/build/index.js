// const port = 8080;
// const RestProxy = require('sp-rest-proxy');
// const setting = {
//     port,
// }

function builderConfig(builder) {
    return {
        entry: builder.entry,
        optimization: {
            minimizer: builder.minimizer,
            splitChunks: {
                cacheGroups: builder.cacheGroups
            }
        },
        output: {
            path: builder.initalObj.path,
            // filename: `js/${builder.initalObj.library}.[name].js`,
            // chunkFilename: `js/${builder.initalObj.library}.[name].js`,
            filename: `js/[name].${builder.initalObj.library}.js`,
            chunkFilename: `js/[name].${builder.initalObj.library}.js`,
            library: builder.initalObj.library,
            libraryTarget: "var",
            hotUpdateChunkFilename: 'hot/hot-update.js',
            hotUpdateMainFilename: 'hot/hot-update.json',
            publicPath: builder.initalObj.publicPath    // 设置公共路径，按需加载、图片请求、字体请求会根据此路径
        },
        // Enable sourcemaps for debugging webpack's output.
        devtool: "cheap-source-map",
        devServer: {
            contentBase: builder.initalObj.path,
            hot: true, //热替换
            open: true, // 默认打开浏览器  === 脚本运行时使用--open,
            inline: true, //自动刷新
            // watchContentBase: true, // 会导致多次刷新
            writeToDisk: true,
            ...builder.proxy
        },
        plugins: builder.plugins,
        bail: true,
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".css", ".js", ".json"],
            alias: builder.alias
        },

        module: {
            rules: builder.loaders
        },

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            // "react": "React",
            // "react-dom": "ReactDOM"
        }
    };
}

module.exports = builderConfig;