const gulp = require('gulp')
const { exec } = require('child_process')
const command = 'node src/api/src/bin/server.js'

gulp.task('start-api-server', async function () {
  // new WebpackDevServer(compiler, serverOptions)
  exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  })
})
