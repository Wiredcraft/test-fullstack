const path = require('path')
const webpack = require('webpack')
const cssnext = require('postcss-cssnext')

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'whatwg-fetch',
    path.join(__dirname, 'src', 'index')
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/lightning_talk',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            [
              'env',
              {
                targets: { browsers: ['> 1%', 'iOS >= 8', 'Android >= 4'] },
                modules: false
              }
            ],
            'react'
          ],
          plugins: ['react-hot-loader/babel']
        }
      },
      { test: /\.(png|jpg)$/, loader: 'file-loader', query: { name: 'img/[hash].[ext]' } },
      {
        test: /\.css$/,
        loader: [
          { loader: 'style-loader', query: { singleton: true } },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 1,
              context: path.resolve(__dirname, 'src'),
              localIdentName: '[sha1:hash:5]',
              autoprefixer: false
            }
          },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },

  resolve: {
    modules: ['.', 'src', 'public', 'node_modules'],
    extensions: ['.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [cssnext({ browsers: ['> 1%', 'iOS >= 8', 'Android >= 4'] })]
      }
    })
  ],

  devtool: 'source-map',

  devServer: {
    publicPath: '/lightning_talk',
    port: 8001,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/lightning_talk/api': 'http://python:8080'
    }
  }
}
