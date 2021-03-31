const option = require("../config");
const path = require('path');
const webpack = require('webpack');
const devPath = require("./path");
const RestProxy = require('sp-rest-proxy');
const port = 9999;
const proxy = {
    port, //默认端口
    before: app => {
        new RestProxy({
            port
        }, app).serveProxy();
    }
}
// 缓存,待使用
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// css提取处理，待使用
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 打包分析，分析各个module所占用的大小
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 类型检查
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// 文件复制
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 进度条
const WebpackBar = require('webpackbar');

// 计时
const smp = new (require("speed-measure-webpack-plugin"))();


const builderConfig = require("./build");
const Builder = require("./builder");
let builder = new Builder(
    devPath.build,
    option.library,
    option.publicPath,
    option.SPA ? {
        App: devPath.src
    } : devPath.pages);

builder.useLoader(require("./loaders/style"));
builder.useLoader(require("./loaders/img"));
builder.useLoader(require("./loaders/font"));
builder.usePlugin([
    new WebpackBar(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
        from: 'src/assets/sp',
        to: 'assets/sp'
    }, {
        from: 'src/assets/css',
        to: 'assets/css'
    }, {
        from: 'src/assets/img',
        to: 'assets/img'
    }]),
]);

builder.useTSLoader(devPath.src);
builder.setAlias({
    "@src": devPath.src,
    "@components": "@src/components",
    "@services": "@src/services",
    "@config": "@src/config"
});

builder.splitChunks("Commons", {
    name: "common", // 
    chunks: 'all', // 模式
    priority: 0,
    minChunks: 2 //最少引用次数，提取
    // test 范围，路径，正则表达式
    // priority 优先级
    // minSize 最小尺寸
});

builder.splitChunks("vendor", {
    chunks: "all",
    test: devPath.nodeModules,
    name: "vendor",
    enforce: true,
    priority: 10
});


builder.beforeBuilder((config, env, options) => {
    if (option.mock) {
        builder.globalImport("@services/mock");
    }
    if (options.mode === Builder.Mode.development) {
        builder.usePlugin([new webpack.DllReferencePlugin({
            // 描述 lodash 动态链接库的文件内容
            manifest: require('../build/dll/dll-manifest.json')
        })]);
    } else {
        builder.userMinimizer(require("./plugins/uglifyjs"));
    }
});

option.template.enable && builder.useHtmlPlugin(devPath.template,
    option.SP.enable ? [...option.SP.scrpts, ...option.template.scripts] : option.template.scripts,
    option.template.css);
option.typeCheck && builder.usePlugin(new ForkTsCheckerWebpackPlugin({
    checkSyntacticErrors: true
}));
option.polyfill && builder.globalImport("@babel/polyfill");
option.analyzer && builder.usePlugin(new BundleAnalyzerPlugin());

builder.setProxy(option.SP.enable ? proxy : {
    port
});

module.exports = smp.wrap(builder.Config(builderConfig));