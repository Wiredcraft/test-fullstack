var gulp = require('gulp')
var requireDir = require('require-dir')

requireDir('./gulp', { recurse: false })

gulp.task('default', gulp.series('run-webpack-server'))
