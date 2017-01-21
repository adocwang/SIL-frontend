var config      = require('../config');
if(!config.tasks.fonts) return;

var changed     = require('gulp-changed');
var gulp        = require('gulp');
var path        = require('path');
var rename      = require('gulp-rename');

var paths = {
  src: path.join(config.root.src, config.tasks.fonts.src),
  dest: path.join(config.root.dest, config.tasks.fonts.dest)
};

var fontsTask = function() {

  return gulp.src(paths.src + '/fonts/**')
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest));
};

gulp.task('fonts', fontsTask);
module.exports = fontsTask;
