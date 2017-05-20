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
    publicPath: '/static/',
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
    publicPath: '/',
    port: 8001,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/path': {
        target: 'http://host:port',
        bypass (req) {
          if (req.headers.accept.indexOf('html') !== -1) {
            return '/index.html'
          }

          if (/^\/webpack-dev-server/.test(req.url)) {
            return true
          }

          return false
        }
      }
    }
  }
}
