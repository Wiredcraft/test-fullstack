const fs = require('fs');
const path = require('path');
const PATHS = require("./paths");
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {};
let configFile = path.join(PATHS.appRoot, 'superman.config.js');

if (fs.existsSync(configFile)) {
    config = require(configFile);
}

exports.startDevServer = () => ({
  devServer: {
    compress: true,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
    host: "0.0.0.0",
    port: config.port || 8090,
    proxy: config.proxy || {}
  }
});

exports.generateSourceMaps = type => ({
  devtool: type
});

exports.setEntries = entries => ({
  entry: { ...entries }
});

exports.setDevMode = () => ({
  mode: "development"
});

exports.setProductionMode = () => ({
  mode: "production"
});

exports.transpileJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1",
                  },
                  "useBuiltIns": "usage",
                  "corejs": { version: 3 }
                }
              ],
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              ["@babel/plugin-proposal-decorators", { "legacy": true }]
            ]
          }
        }
      }
    ]
  }
})

exports.compileStylesheet = (isProduction = false) => ({
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                auto: true,
                localIdentName: "[local]___[hash:base64:5]"
              }
            }
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    isProduction && new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    })
  ].filter(Boolean)
})

exports.handleStaticAssets = () => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2|jpg|jpeg|png|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000,
              name: 'static/media/[name].[hash:8].[ext]',
              fallback: 'file-loader'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: '',
          globOptions: {
            ignore: ["**/public/index.html"]
          },
          noErrorOnMissing: true,
        }
      ]
    })
  ]
})

exports.setOutput = (pathToDirectory, isProduction = false) => {
  const filename = isProduction
    ? "static/js/[name].[contenthash:8].bundle.js"
    : "static/js/[name].bundle.js";

  const chunkFilename = isProduction
    ? "static/[name].[contenthash:8].chunk.js"
    : "static/[name].chunk.js"
  return {
    output: {
      filename,
      chunkFilename,
      path: config.outputPath || pathToDirectory,
      publicPath: 'publicPath' in config ? config.publicPath : "/"
    }
  };
};

exports.createVendorChunk = moduleList => ({
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: new RegExp(
            `[\\/]node_modules[\\/](${moduleList.join("|")})[\\/]`
          ),
          chunks: "initial",
          name: "vendors",
          enforce: true
        }
      }
    }
  }
});

exports.cleanDirectory = (directory, projectRoot) => ({
  plugins: [
    new CleanWebpackPlugin()
  ]
});

exports.useHTMLTemplate = templatePath => ({
  plugins: [
    new HTMLWebpackPlugin({
      template: templatePath,
      filename: "index.html",
      inject: "body"
    })
  ]
});

exports.setHotModuleReplacement = () => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

exports.setResolve = (resolve) => ({
  resolve: {
    ...resolve,
    ...config.resolve
  }
});