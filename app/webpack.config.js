var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            "./index"
        ]
    },

    resolve: {
        modulesDirectories: ["web_modules", "node_modules"],
        extensions: ['', '.js'],
        alias: {
            'common': path.resolve(__dirname, 'common'),
            'css': path.join(__dirname, '../css'),
            'less': path.join(__dirname, '../less'),
        }
    },

    devtool: 'cheap-module-eval-source-map',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].bundle.js",
        publicPath: 'http://localhost:3000/dev/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel-loader'],
                include: path.join(__dirname, './'),
                exclude: path.resolve(__dirname, "node_modules")
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: "file-loader?name=[path][name].[ext]"
            },
            {
                test: /\.less$/, loader: "style-loader!css-loader?modules!less"
            },
            {
                test: /\.css$/, loader: "style-loader!css-loader?modules",
                exclude: path.resolve(__dirname, "node_modules")
            },
            {
                test: /\.css$/, loader: "style-loader!css-loader?",
                include: path.resolve(__dirname, "node_modules")
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};