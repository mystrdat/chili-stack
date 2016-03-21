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
var autoprefixer = require('autoprefixer');
var cleanCSS     = require('gulp-clean-css');
var sourcemaps   = require('gulp-sourcemaps');

// Paths
var srcPath    = './'
var buildPath  = './build/'
var buildName  = 'style'

// Compile with inline map for dev
gulp.task('build-dev', function () {
  return rubySASS(srcPath + 'main.sass', { sourcemap: true })
    .pipe(rename(buildName + '.css'))
    .on('error', rubySASS.logError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildPath));
});

// Compile minified and optimized for prod
gulp.task('build-prod', function () {
  return rubySASS(srcPath + 'main.sass')
    .on('error', rubySASS.logError)
    .pipe(postCSS([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(cleanCSS({ keepSpecialComments: 0, mergeMediaQueries: true }))
    .pipe(rename(buildName + '.min.css'))
    .pipe(gulp.dest(buildPath));
});

// Watchers
gulp.task('watch-dev', function() {
  gulp.watch([srcPath + '**/*.sass', srcPath + '**/*.scss'], ['build-dev']);
});
gulp.task('watch-prod', function() {
  gulp.watch([srcPath + '**/*.sass', srcPath + '**/*.scss'], ['build-prod']);
});

// Tasks
gulp.task('default', ['build-dev', 'watch-dev']);
gulp.task('dev', ['build-dev', 'watch-dev']);
gulp.task('prod', ['build-prod', 'watch-prod']);
