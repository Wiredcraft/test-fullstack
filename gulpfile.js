"use strict";

let gulp = require("gulp");
let rename = require("gulp-rename");
let webpack = require("webpack-stream");
let minifyHtml = require("gulp-minify-html");
let rev = require("gulp-rev");
let minifyCSS = require("gulp-minify-css");
let autoprefixer = require("autoprefixer");
let postcss = require("gulp-postcss");
let revReplace = require("gulp-rev-replace");
let liveServer = require("live-server");
var jshint = require('gulp-jshint');

let minifyHtmlConfig = {
  conditionals: true,
  spare: true,
};

gulp.task("lint", function () {
  return gulp.src(["server/*.js", "client/scripts/index.js"])
    .pipe(jshint({
      globals: {
        $: false,
        Vue: false,
        document: false,
        alert: false,
      }
    }))
    .pipe(jshint.reporter("default"));
});

gulp.task("css", () => {
  return gulp.src("client/styles/index.css")
    .pipe(postcss([autoprefixer({ browsers: ["last 2 versions"] })]))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("client/styles"));
});

gulp.task("js", () => {
  return gulp.src("client/scripts/index.js")
    .pipe(webpack({
      plugins: [
        new webpack.webpack.optimize.UglifyJsPlugin({ minimize: true })
      ],
      devtool: "source-map",
      output: {
        filename: "index.min.js"
      },
    }))
    .pipe(gulp.dest("client/scripts"));
});

gulp.task("rev", ["css", "js"], () => {
  return gulp.src(["client/styles/index.min.css", "client/scripts/index.min.js"], { base: "client" })
    .pipe(rev())
    .pipe(gulp.dest("client"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("client"));
});

gulp.task("html", ["rev"], () => {
  let manifest = gulp.src("client/rev-manifest.json");
  return gulp.src("client/templates/index.html")
    .pipe(minifyHtml(minifyHtmlConfig))
    .pipe(rename("index.html"))
    .pipe(revReplace({
      manifest: manifest
    }))
    .pipe(gulp.dest("client"));
});

gulp.task("host", () => {
  liveServer.start({
    port: 3001,
    host: "0.0.0.0",
    root: "client",
    open: false,
    ignore: "",
    wait: 500,
  });
});
