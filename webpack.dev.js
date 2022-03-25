const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = env => {
  return merge(common(env), {
    mode: 'development',
    devServer: {
      port: 8080,
      host: 'localhost',
      static: {
        directory: path.resolve(__dirname + "/assets")
      },   
      proxy:{
        '/api':{
          target:"http://localhost:3000"
        }
      }
    },
    plugins: [
      new ReactRefreshPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './build/index.html',
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  });
}
