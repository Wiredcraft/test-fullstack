const gulp = require('gulp')
const { exec } = require('child_process')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../webpack.config')
const compiler = webpack(webpackConfig)
const serverOptions = {
  hot: true,
  progress: true,
  inline: false,
  open: true
}
// const command = 'webpack-dev-server --mode development --hot --progress --color --port 8000 --open'

gulp.task('run-webpack-server', done => {
  // new WebpackDevServer(compiler, serverOptions)
  new WebpackDevServer(compiler, {
      // server and middleware options
    }).listen(8000, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      // gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
      // keep the server alive or continue?
      // callback();
    })
})
