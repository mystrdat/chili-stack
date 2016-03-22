/*
  chili
  github.com/mystrdat/chili-stack
  2016 | MIT
  ============================== */

'use strict';

// Dependencies
const gulp         = require('gulp');
const rename       = require('gulp-rename');
const rubySASS     = require('gulp-ruby-sass');
const postCSS      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const sourcemaps   = require('gulp-sourcemaps');

// Paths
const srcPath   = './';
const buildPath = './build/';
const buildName = 'style';

// Compile with inline map for dev
gulp.task('build-dev', function() {
  return rubySASS(srcPath + 'main.sass', { sourcemap: true })
    .pipe(rename(buildName + '.css'))
    .on('error', rubySASS.logError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildPath));
});

// Compile minified and optimized for prod
gulp.task('build-prod', function() {
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
