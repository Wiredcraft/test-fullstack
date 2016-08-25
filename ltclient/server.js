var webpack = require('webpack');
var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var app = express();
var port = process.argv[2] ? process.argv[2] - 0 : 4000;
config.entry.app.unshift(
  'webpack-hot-middleware/client'
);

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.get("/*", function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.log('>>> Listening - http://0.0.0.0:' + port);
  }
})
