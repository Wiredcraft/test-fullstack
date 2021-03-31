// 多线程处理，看打包文件数使用
const HappyPack = require('happypack');

function tsLoader(entry, plugins, loaders, path) {
    // TypeScript编译器，是否启用多线程打包
    let loader = {
        test: /(\.tsx?$)|(\.js$)/,
        include: path,
        use: ['cache-loader', "ts-loader"]
        // loader: "ts-loader",
    };
    // let entryKeys = Object.keys(entry);
    // if (entryKeys.length > 1) {
    plugins.push(
        new HappyPack({
            id: 'ts',
            threads: 3, // 默认3个
            loaders: [{
                path: 'ts-loader',
                query: {
                    happyPackMode: true // 附带transpileOnly: true
                }
            }]
        }));
    /// loader.loader = 'happypack/loader?id=ts';
    loader.use[1] = 'happypack/loader?id=ts';
    // }
    loaders.push(loader);
}
module.exports = tsLoader;