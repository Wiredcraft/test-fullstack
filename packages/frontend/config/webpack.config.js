const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootPath = path.resolve(__dirname, '../');
const isDevelopment = process.env.NODE_ENV === 'development';
// const isProduction = process.env.NODE_ENV === 'production';

const aliasPath = require('../tsconfig').compilerOptions.paths;

// eslint-disable-next-line no-shadow
const alias = Object.keys(aliasPath).reduce((alias, key) => {
  const newKey = key.replace('/*', '');
  const newPath = aliasPath[key][0].replace('/*', '');
  // eslint-disable-next-line no-param-reassign
  alias[newKey] = path.join(rootPath, newPath);
  return alias;
}, {});

const htmlWebpackPluginMinify = {
  removeAttributeQuotes: true,
  collapseWhitespace: true,
  removeComments: true,
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  useShortDoctype: true,
};

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[hash:8].css',
  }),
  new HtmlWebpackPlugin({
    template: path.join(rootPath, 'public/index.html'),
    filename: 'index.html',
    cache: false,
    minify: isDevelopment ? false : htmlWebpackPluginMinify,
  }),
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: path.join(rootPath, 'tsconfig.json'),
    },
  }),
];

const rules = [
  {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'assets/images',
        },
      },
    ],
  },
  {
    test: /\.(ttf|woff|woff2|eot|otf)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'assets/fonts',
        },
      },
    ],
  },
  {
    test: /\.(tsx?|ts?|js)$/,
    include: path.join(rootPath, 'src'),
    use: [
      {
        loader: 'thread-loader',
        options: {
          workers: 2,
        },
      },
      'babel-loader',
    ],
  },
  {
    test: /\.css$/,
    include: path.join(rootPath, 'src'),
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: false,
          sourceMap: isDevelopment,
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: isDevelopment,
        },
      },
    ],
  },
];

module.exports = {
  entry: {
    app: path.join(rootPath, 'src/index.tsx'),
  },
  output: {
    path: path.join(rootPath, 'dist'),
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias,
  },
  plugins,
  module: { rules },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
