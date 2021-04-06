var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');
var deps = [ 
  'react/dist/react.min.js',
  'react-router/dist/react-router.min.js',
  'moment/min/moment.min.js'
];

var config = {
	entry: path.resolve(__dirname, './app/public/reactAppSrc/main.js'),
	output: {
		path: path.resolve(__dirname, './app/public/js'),
		filename: 'bundle.js',
	},
	module: {
		noParse: [],
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-react',
						],
						plugins: [
							["@babel/plugin-proposal-class-properties"],
							["@babel/plugin-proposal-decorators", { "legacy": true }],
							["@babel/plugin-proposal-optional-chaining"],
							["@babel/plugin-syntax-jsx"],
						]
					}
				}
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{ 
				test: /\.(png|jpg)$/,
				use: ['url-loader']
			}
		]
	},
	resolve: {
		alias: {}
	}
}

deps.forEach(
	function (dep) {
		var depPath = path.resolve(node_modules_dir, dep);
		config.resolve.alias[dep.split(path.sep)[0]] = depPath;
		config.module.noParse.push(depPath);
	}
);

module.exports = config;