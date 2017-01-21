var config       = require('../config');
if(!config.tasks.css) return;

var gulp         = require('gulp');
var less         = require('gulp-less');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var path         = require('path');
var csscomb      = require('gulp-csscomb');

var paths = {
  src: path.join(config.root.src, config.tasks.css.src),
  dest: path.join(config.root.dest, config.tasks.css.dest)
};

var cssTask = function () {
  return gulp.src(paths.src + '/mc-bootstrap.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(csscomb())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest));
};

gulp.task('css', cssTask);
module.exports = cssTask;
