"use strict";

/************************
 * SETUP
 ************************/

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');

/************************
 * CONFIGURATION
 ************************/

var autoReload = true;

var paths = {
  bowerDir: './bower_components'
};

var includePaths = [
  // add paths to any sass @imports that you will use from bower_components here
  // paths.bowerDir + '/path/to/scss'
];

var stylesSrc = [
  // add bower_components CSS here
  './scss/custom.scss'
];

var scriptsSrc = [
  // add bower_component scripts here
  './js/src/*.js'
];

/************************
 * TASKS
 ************************/

gulp.task('styles', function() {
  gulp.src(stylesSrc)
    .pipe(sass({
      includePaths: includePaths
    }))

    // Catch any SCSS errors and prevent them from crashing gulp
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .pipe(concat('custom.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(livereload());
});

gulp.task('scripts', function() {
  gulp.src(scriptsSrc)
    .pipe(concat('custom.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('watch', function() {
  if (autoReload) {
    livereload.listen();
  }
  gulp.watch('./scss/*.scss', ['styles']);
  // gulp.watch('./js/src/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts']);