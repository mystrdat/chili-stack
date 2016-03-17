/*
  chili
  github.com/mystrdat/chili-stack
  2016 | MIT
  ============================== */

// Dependencies
var gulp         = require('gulp');
var rename       = require('gulp-rename');
var rubySASS     = require('gulp-ruby-sass');
var postCSS      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var cleanCSS     = require('gulp-clean-css');
var combineMQ    = require('gulp-combine-mq');

// Paths
var srcPath    = './'
var buildPath  = './build/'
var buildName  = 'style.min.css'

// Compile SASS (using Ruby SASS)
gulp.task('build-sass', function () {
  return rubySASS(srcPath + 'main.sass')
    .on('error', rubySASS.logError)
    .pipe(combineMQ({ beautify: false }))
    .pipe(postCSS([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(cleanCSS({ keepSpecialComments: 0 }))
    .pipe(rename(buildName))
    .pipe(gulp.dest(buildPath));
});

// Watchers
gulp.task('watch-sass', function() {
  gulp.watch([srcPath + '**/*.sass', srcPath + '**/*.scss'], ['build-sass']);
});

// Tasks
gulp.task('default', ['build-sass', 'watch-sass']);
