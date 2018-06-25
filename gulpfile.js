'use strict';

//Node modules
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

//Source and distribution file paths
const options = {
  src: 'src',
  dist: 'dist'
};

//Copies the contents of the src/icons folder and places them into dist/icons.
gulp.task('copy', function() {
  gulp.src(options.src + '/icons/**')
  .pipe(gulp.dest(options.dist + '/icons'))
});

//Concatenates the js files, minifies the resulting file, and creates a source map,
//placing all output files in the dist/scripts directory.
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

//Compiles the scss files into css, minifies the resulting file, and creates a source map,
//placing all output files in the dist/styles directory. Refreshes the page when changes
//are made to the scss/sass source files.
gulp.task("styles", function() {
  gulp.src(options.src + '/sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(gulp.dest(options.dist + '/styles'))
    .pipe(csso())
    .pipe(rename('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest(options.dist + '/styles'))
    .pipe(connect.reload());
});

//Compresses the images in the src/images directory, placing the compressed version in the
//dist/content directory.
gulp.task("images", function() {
  gulp.src(options.src + '/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(options.dist + '/content'))
});

//Deletes files created by gulp tasks, all of which are in the dist directory.
gulp.task("clean", function() {
  del([options.dist + '/**', '!' + options.dist]);
});

//Changes the src path for the css link, script tag and img tags in the html doc,
//placing the modified document in the dist directory.
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

//First calls the clean task. When clean is finished, calls the tasks discussed above.
gulp.task("build", ['clean'], function() {
  return gulp.start(['scripts', 'styles', 'images', 'copy']);
});

//First calls the html task above. When html is finished, starts a local server to serve the
//project from the dist folder.
gulp.task("connect", ['html'], function() {
  return connect.server({
    root: './' + options.dist,
    livereload: true
  })
});

//Watches for any changes to the scss/sass source documents. Upon any change followed by a save,
//this task runs the styles task, automatically updating the page with the changes and refreshing
//the page.
gulp.task("watch", function() {
  gulp.watch([
    options.src + '/sass/*.scss',
    options.src + '/sass/circle/*.sass',
    options.src + '/sass/circle/components/*.sass',
    options.src + '/sass/circle/core/*.sass'
  ], ['styles']);
});

//Runs the build task, then connects to the server and watches for any changes to the scss/sass files.
gulp.task("default", ['build'], function() {
  return gulp.start(['connect', 'watch']);
});
