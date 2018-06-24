'use strict';

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    maps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    del = require('del'),
    rename = require('gulp-rename'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect');

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/jquery-3.3.1.js',
        'js/circle/autogrow.js',
        'js/circle/circle.js'
        ])
    .pipe(maps.init())
    .pipe(concat('global.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("scripts", ["concatScripts"], function() {
  return gulp.src("js/global.js")
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('compileSass', function() {
  return gulp.src("sass/global.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
});

gulp.task("styles", ["compileSass"], function() {
  return gulp.src("css/global.css")
    .pipe(csso())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('images', function() {
  gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'))
});

//Deletes files created by gulp
gulp.task('clean', function() {
  // del(['dist', 'css/application.css**', 'js/app*.js*']);
  del(['css', 'dist/**', '!dist', 'js/global*.js**']);
  //del(['css', 'dist', 'js/global*.js**']);
});

gulp.task("build", ['clean'], function() {
  return gulp.start(['scripts', 'styles', 'images']);
  // return gulp.src(['css/application.css', 'js/app.min.js', 'index.html', 'img/**', 'fonts/**'], { base: './'})
  //   .pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task("default", ["build"], function() {
  return gulp.start('connect');
});
