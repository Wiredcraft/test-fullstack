const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  entry: ['babel-polyfill', resolve('./src/index.jsx')],
  output: {
    path: resolve('./dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          resolve('./node_modules'),
          resolve('./dist'),
        ],
        use: ['babel-loader'],
      },
      {
        test: /\.css$|\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [
          resolve('./src'),
          resolve('./node_modules/normalize.css'),
        ],
      },
      {
        test: /\.jpe?g$|\.png$|\.svg$|\.woff$|\.ttf$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.es6'],
    alias: {
      '@': resolve('src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./public/index.html'),
      favicon: resolve('./src/assets/images/favicon.ico'),
      inject: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  node: {
    fs: 'empty',
  },
};
