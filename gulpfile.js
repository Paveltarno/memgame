"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

gulp.task('sass', function () {
  gulp.src('./assets/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});

gulp.task('javascript', function(){
  gulp.src('./assets/javascript/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('default',function() {
    gulp.watch('assets/stylesheets/**/*.scss',['sass']);
    gulp.watch('assets/javascript/**/*.js', ['javascript']);
});
