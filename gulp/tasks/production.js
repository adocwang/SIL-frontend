'use strict';

import gulp        from 'gulp';
import gzip        from 'gulp-gzip';
import runSequence from 'run-sequence';

gulp.task('prod', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = true;

  runSequence('assets', 'browserify', 'nodeViews', 'gzip', cb);

});

gulp.task('gzip', function() {

  // return gulp.src(config.gzip.src)
  //   .pipe(gzip(config.gzip.options))
  //   .pipe(gulp.dest(config.gzip.dest));

});
