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
    connect = require('gulp-connect'),
    htmlreplace = require('gulp-html-replace');

const options = {
  src: 'src',
  dist: 'dist'
};

gulp.task('copy', function() {
  gulp.src(options.src + '/icons/**')
  .pipe(gulp.dest(options.dist + '/icons'))
});

gulp.task("scripts", function() {
    gulp.src([
        options.src + '/js/jquery-3.3.1.js',
        options.src + '/js/circle/autogrow.js',
        options.src + '/js/circle/circle.js'
        ])
    .pipe(maps.init())
    .pipe(concat('global.js'))
    .pipe(gulp.dest(options.dist + '/scripts'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest(options.dist + '/scripts'));
});

gulp.task("styles", function() {
  return gulp.src(options.src + '/sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(gulp.dest(options.dist + '/styles'))
    .pipe(csso())
    .pipe(rename('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest(options.dist + '/styles'));
});

gulp.task("images", function() {
  gulp.src(options.src + '/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(options.dist + '/content'))
});

//Deletes files created by gulp
gulp.task("clean", function() {
  //del([options.src + '/css', options.dist + '/**', '!' + options.dist, options.src + '/js/global*.js**']);
  del([options.dist + '/**', '!' + options.dist]);
});

gulp.task("html", function() {
  gulp.src(options.src + '/index.html')
    .pipe(htmlreplace({
        'css': 'styles/all.min.css',
        'js': 'scripts/all.min.js',
        img: {
          src: 'content/m-spore.png',
          tpl: '<img src="%s" />'
        },
        img2: {
          src: 'content/1.jpg',
          tpl: '<img src="%s" />'
        },
        img3: {
          src: 'content/3.jpg',
          tpl: '<img src="%s" />'
        },
        img4: {
          src: 'content/2.jpg',
          tpl: '<img src="%s" />'
        }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task("build", ['clean'], function() {
  return gulp.start(['scripts', 'styles', 'images']);
});

gulp.task("connect", ['html'], function() {
  return connect.server({
    root: './' + options.dist,
    livereload: true
  })
});

gulp.task("default", ['build'], function() {
  return gulp.start('connect');
});
