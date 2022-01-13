import {merge} from 'webpack-merge';
import {DefinePlugin} from 'webpack';
import {WebpackConfiguration} from 'webpack-dev-server';
import common from './webpack.common';
import path from 'path';

const config: WebpackConfiguration = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new DefinePlugin({
      'process.env.PRODUCTION': JSON.stringify(false),
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
  },
});

export default config;
