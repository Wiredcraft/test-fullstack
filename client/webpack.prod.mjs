// Import External Dependencies
import { merge } from 'webpack-merge';
import OptimizeCSSAssetsPlugin from 'css-minimizer-webpack-plugin';
import path from 'path';

// Load Common Configuration
import common from './webpack.common.mjs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

export default (env) =>
  merge(common(env), {
    mode: 'production',
    cache: {
      buildDependencies: {
        config: [__filename],
      },
    },
    entry: {
      index: {
        import: './index.jsx',
        filename: 'index.[contenthash].js',
      },
    },
    output: {
      filename: '[name].[contenthash].js',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules/,
            chunks: 'initial',
            enforce: true,
            filename: 'vendor.[contenthash].js',
          },
        },
      },
      minimizer: ['...', new OptimizeCSSAssetsPlugin({})],
    },
  });
