var config = require('../config');
var gulp   = require('gulp');
var path   = require('path');
var watch  = require('gulp-watch');
var gutil  = require('gulp-util');
var os     = require('os');

var watchTask = function() {
  var watchableTasks = ['css'];

  watchableTasks.forEach(function(taskName) {
    var task = config.tasks[taskName];
    if(task) {
      var glob = path.join(config.root.src, task.src + '/**/*.{' + task.extensions.join(',') + '}');
      watch(glob, function() {
        require('./' + taskName)();
      }).on('change', function(path) {
        gutil.log('Changed path:' + path);
      });
    }
  });
};

gulp.task('watch', watchTask);
module.exports = watchTask;
