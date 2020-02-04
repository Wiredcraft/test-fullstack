const webpack = require('webpack');
const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpack = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FallbackPort = require('fallback-port');
const port = new FallbackPort(8000);

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
	module: {
		rules: [
			{
				include: [path.resolve(__dirname, 'src')],
				exclude: /(node_modules)/,
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				},

				test: /\.js$/
			},
			{
				test: /\.tsx?$/,
                loaders: ['babel-loader', 'ts-loader']
            },
			{
				test: /\.(scss|css)$/,

				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},

	entry: {
		index: './src/index.tsx'
	},

	output: {
		chunkFilename: '[name].js',
		filename: '[name].js',
		path: path.join(__dirname, './build/')
	},

	resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new UglifyJSPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      chunks: ["index"],
      alwaysWriteToDisk: true
    }),
	new HtmlWebpackHarddiskPlugin(),
	new CopyWebpack([
		{
		  from: 'src/cssPaint/',
		  to: 'cssPaint',
		  toType: 'dir'
		}
	  ], {})
  ]
};
