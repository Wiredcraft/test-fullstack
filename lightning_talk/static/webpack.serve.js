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
        options: {
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
          plugins: [
            'babel-plugin-transform-object-rest-spread',
            'babel-plugin-transform-function-bind',
            'react-hot-loader/babel'
          ]
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        options: { name: 'img/[hash].[ext]' }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { singleton: true } },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              context: path.resolve(__dirname, 'src'),
              localIdentName: '[sha1:hash:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                cssnext({ browsers: ['> 1%', 'iOS >= 8', 'Android >= 4'] })
              ]
            }
          }
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
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    })
  ],

  devtool: 'source-map',

  devServer: {
    publicPath: '/lightning_talk',
    port: 8001,
    host: 'localhost',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/lightning_talk/api': 'http://localhost:8000'
    }
  }
}
