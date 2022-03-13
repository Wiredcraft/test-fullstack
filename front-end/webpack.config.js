const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	mode: "development",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader",
				options: { presets: ["@babel/env"] }
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader', 
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true, // webpack@1.x
							disable: true, // webpack@2.x and newer
						},
					},
				],
			}
		]
	},
	resolve: { extensions: ["*", ".js", ".jsx"] },
	output: {
		path: path.resolve(__dirname, "dist/"),
		filename: "bundle.js"
	},
	devServer: {
		static: path.resolve(__dirname, './dist'),
		port: 3000
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};