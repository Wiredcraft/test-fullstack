const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: path.resolve(__dirname, './src/index.tsx'),
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
				test: /\.(ts|tsx)$/,
				exclude: /node-modules/,
				loader: 'ts-loader'
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				// use: [
				// 	'file-loader', 
				// 	{
				// 		loader: 'image-webpack-loader',
				// 		options: {
				// 			bypassOnDebug: true, // webpack@1.x
				// 			disable: true, // webpack@2.x and newer
				// 		},
				// 	},
				// ],
				type: 'asset'
			}
		]
	},
	resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
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