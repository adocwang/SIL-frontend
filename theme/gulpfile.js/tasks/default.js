var gulp            = require('gulp');
var gulpSequence    = require('gulp-sequence');

var defaultTask = function(cb) {

  // Grouped by what can run in parallel
  var assetTasks = ['fonts'];
  var codeTasks = ['css'];

  gulpSequence('clean', assetTasks, codeTasks, 'watch', cb);
};

gulp.task('default', defaultTask);
module.exports = defaultTask;
