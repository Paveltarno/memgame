"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

gulp.task('sass', function () {
  gulp.src('./assets/stylesheets/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public'));
});

gulp.task('javascript', function(){
  gulp.src('./assets/javascript/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015', 'react']
    }).on('error', gutil.log))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public'));
});

gulp.task('watch',function() {
  gulp.watch('assets/stylesheets/**/*.scss',['sass']);
  gulp.watch('assets/javascript/**/*.js', ['javascript']);
});

gulp.task('default', ['sass', 'javascript', 'watch']);
