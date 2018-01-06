#!/usr/bin/env nodejs
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const less = require('less');

const configJs = {
	entry: __dirname+"/front_src/js/index.jsx",
	output: {
		path: __dirname +'/dist',
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'jsx-loader?insertPragma=React.DOM&harmony',
			},
		],
	},
};

const configCss = {
	inputFolder : __dirname+'/front_src/css',
	entry : 'index.less',
	outputFolder : __dirname+'/dist',
	outputFilename : 'style.css',
};

const compiler = webpack(configJs);

/**
 * Compiles JSX files into one single JS file
 */
const compileJs = function(callback) {
	console.log('Compiling '+configJs.output.filename);
	try {
		compiler.run(function(err, stats) {
			try {
				if (err) {
					console.log('Compilation failed : '+configJs.output.filename);
					console.log(err);
				}
				else {
					console.log('Successfully compiled '+configJs.output.filename);
				}
				if (callback && typeof callback === 'function') {
					callback();
				}
			}
			catch (error) {
				console.log(error);
			}
		});
	}
	catch (error) {
		console.log(error);
	}
};


/**
 * Compiles LESS files into CSS
 */
const compileCss =  function(callback) {
	console.log('Compiling '+configCss.outputFilename);

	try {
		fs.readFile(configCss.inputFolder+'/'+configCss.entry, { 
			encoding: 'utf8' 
		}, 
		function(err, data) {
			if (err) {
				console.log(err.stack);
			}
			less.render(data, {
				paths: [configCss.inputFolder+'/'], // Specify search paths for @import directives
				filename: './'+configCss.entry,
				compress: false // Minify CSS output
			},
			function (e, output) {
				if (e) {
					console.log(e.stack);
				}
				fs.writeFile(__dirname+'/dist/'+configCss.outputFilename, output.css, {
					flag:'w+', 
					encoding:'utf8'
				},
				function(err) {
					if (err != null) {
						console.log(err.stack);
					}
					else {
						console.log('Successfully compiled '+configCss.outputFilename);
						if (callback && typeof callback === 'function') {
							callback();
						}
					}
				});
			});
		});
	}
	catch(err) {
		console.log('Compilation failed : '+configCss.outputFilename);
		console.log(err.stack);
	}
};


/**
 * This script is to be called from command line, with one optional argument :
 *  - js : to compile only JS
 *  - css : to compile only CSS
 */
const args = process.argv.slice(2);

const actions = ['js', 'css'];

if (args.length) {
	if (args[0] === 'js') {
		compileJs();
	}
	else if (args[0] === 'css') {
		compileCss();
	}
	else {
		console.log('Invalid argument '+args[0]);
	}
}
else {
	compileJs(compileCss);
}
