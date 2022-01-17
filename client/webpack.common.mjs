import path from 'path';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);
const { default: MiniCssExtractPlugin } = require('mini-css-extract-plugin');

export default ({ ssg = false }) => ({
  context: path.resolve(__dirname, './src'),
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, '.cache/webpack'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.join('./src/styles/partials')],
              },
            },
          },
        ],
      },
      {
        test: /\.woff2?$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash][ext][query]',
          emit: ssg !== true,
        },
      },
      {
        test: /\.(jpg|jpeg|png|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name].[hash][ext][query]',
          emit: ssg !== true,
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        exclude: [path.resolve(__dirname, 'src/styles/icons')],
        generator: {
          filename: '[name].[hash][ext][query]',
          emit: ssg !== true,
        },
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
        include: [path.resolve(__dirname, 'src/styles/icons')],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      experimentalUseImportModule: true,
    }),
    new webpack.DefinePlugin({
      // https://github.com/algolia/algoliasearch-client-javascript/issues/764
      'process.env.RESET_APP_DATA_TIMER': JSON.stringify(''), // fix for algoliasearch
    }),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
});
