const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom', 'react-router-dom','axios'],
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: true,
    }),
    new MinCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MinCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: resolve(__dirname, '../public'),
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    extensions: ['.jsx', '.js'],
  },
}
