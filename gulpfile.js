'use strict';

const gulp = require('gulp');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass');
const css = require('gulp-clean-css');

gulp.task('webserver', () =>{
  gulp.src('./app')
    .pipe(webserver({
      livereload: true,
      open: true,
      host: 'localhost',
      port: 8000,
    }));
});

gulp.task('sass', () =>{
  return gulp.src('./src/css/*.scss')
  .pipe(sass ().on('error', sass.logError))
  .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/css/*.scss', ['sass']);
});

gulp.task('css', () => {
  return gulp.src('./build/css/*.css')
    .pipe(css({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('css:watch', () => {
  gulp.watch('./build/css/*.css', ['css']);
});

gulp.task('default', ['webserver', 'sass:watch', 'css:watch']);
