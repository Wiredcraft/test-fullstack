import path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import getGitInfo from 'git-repo-info';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// eslint-disable-next-line import/no-named-as-default
import webpack from 'webpack';
import 'webpack-dev-server';

const git = getGitInfo();

const context = __dirname;
const dir = {
  src: path.resolve(context, 'src'),
  dist: path.resolve(context, 'dist'),
  public: path.resolve(context, 'public'),
};

module.exports = (env: Record<string, unknown> = {}, argv: Record<string, unknown> = {}) => {
  const devprod = (dev: unknown, prod: unknown) => (env.production ? prod : dev);
  const { PUBLIC_PATH = '/static/' } = argv;

  return {
    mode: devprod('development', 'production'),

    context,

    devtool: devprod('cheap-module-source-map', false),

    entry: {
      main: ['./src/index.tsx'],
    },

    output: {
      path: dir.dist,
      filename: `[name].[contenthash].js`,
      chunkFilename: `[name].[contenthash].js`,
      publicPath: devprod('/', PUBLIC_PATH),
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
        maxSize: 1024 * 1024 * 2,
      },
    },

    devServer: {
      historyApiFallback: true,
      host: '0.0.0.0',
      hot: true,
      port: '9999',
      proxy: [
        {
          context: '/api',
          target: 'http://localhost:8000/',
        },
      ],
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(bmp|gif|jpe?g|png|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[contenthash:8].[ext]',
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[path][name]__[local]__[hash:4]',
                  localIdentContext: dir.src,
                },
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
        __GIT_REVISION__: JSON.stringify(git.sha),
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(context, 'public/index.html'),
      }),
    ],

    resolve: {
      alias: {
        '@': dir.src,
      },
      extensions: ['.ts', '.tsx', '.json', '.js', '.jsx'],
    },
  };
};
