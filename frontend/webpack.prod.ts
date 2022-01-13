import {merge} from 'webpack-merge';
import {Configuration} from 'webpack';
import {DefinePlugin} from 'webpack';
import common from './webpack.common';
import TerserPlugin from 'terser-webpack-plugin';

const config: Configuration = merge(common, {
  mode: 'production',
  plugins: [
    new DefinePlugin({
      'process.env.PRODUCTION': JSON.stringify(true),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    })],
  },
});

export default config;
