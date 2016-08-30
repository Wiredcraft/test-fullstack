var gulp = require('gulp');
var connect = require('gulp-connect');
var modRewrite = require('connect-modrewrite');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var copy = require('gulp-copy');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var map = require('map-stream');
var less = require('gulp-less');
var replace = require('gulp-replace');
var mergeStream = require('merge-stream');
var ngAnnotate = require('gulp-ng-annotate');


gulp.task('watch', ['build', 'webserver'], function () {
    gulp.watch([
        'src/index.html',
        'src/script/**/*.js',
        'src/style/**/*.css',
        'src/style/**/*.less'
    ], [
        'build_app_index_and_js', 'lint'
    ]);

    gulp.watch(['src/layout/**', 'src/image/**'], ['static_files']);
});

gulp.task('build', ['build_app_index_and_js', 'static_files', 'lint']);

gulp.task('build_app_index_and_js', function () {
    var basePath = '/build/';

    return gulp.src('src/index.html')
        .pipe(replace('${BASE_PATH}', basePath))
        .pipe(usemin({
            html: [minifyHtml({empty: true})],
            css: [less(), minifyCss(), rev()],
            jsLib: [rev()],
            // jsApp: [ngAnnotate(), rev(), uglify()]
            jsApp: [ngAnnotate(), rev()]
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('static_files', function () {
    var tasks = [];

    var static_mapping = [
        {
            src: 'src/layout/**',
            dest: 'build/'
        },
        {
            src: 'src/image/**',
            dest: 'build/'
        }
    ];

    static_mapping.forEach(function(item) {
        if (item.hasOwnProperty('src') && item.hasOwnProperty('dest')) {
            tasks.push(
                gulp.src(item.src)
                    .pipe(copy(item.dest, {prefix: 1}))
            )
        }
    });

    return mergeStream(tasks);
});


gulp.task('lint', function () {
    return gulp.src([
        'src/script/**/*.js',
        '/!' + '/src/config.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('webserver', function () {
    connect.server({
        port: 8000,
        livereload: true,
        debug: true,
        middleware: function () {
            var staticFileSuffixes = ["html", "js", "svg", "css", "png", "gif", "jpg", "jpeg"];
            var suffixesRegex = staticFileSuffixes.map(function (obj) {
                return "\\." + obj;
            }).join("|");
            var indexFilePath = '/build/index.html';
            var rewiteRule = "!" + suffixesRegex + " " + indexFilePath + " [L]";
            console.info("Rewrite rule: " + rewiteRule);
            return [
                modRewrite([
                    rewiteRule
                ])
            ];
        }
    });
});

gulp.task('clean', function () {
    return gulp.src('build/', {read: false})
        .pipe(clean());
});
