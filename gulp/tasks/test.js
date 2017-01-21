'use strict';

import gulp        from 'gulp';
import path        from 'path';
import runSequence from 'run-sequence';
import {Server}    from 'karma';
import testServer  from '../util/testServer';
import {
  protractor,
  webdriver_update, // eslint-disable-line camelcase
  webdriver
} from 'gulp-protractor';


gulp.task('test', function() {

  return runSequence('unit', 'protractor');

});

gulp.task('unit', ['views'], function(cb) {

  new Server({
    configFile: path.resolve(__dirname, '../..', config.test.karma),
    singleRun: true
  }, cb).start();

});

gulp.task('protractor', ['prod', 'webdriverUpdate', 'webdriver'], function(cb) {

  const testFiles = gulp.src('test/e2e/**/*.js');

  testServer({
    port: config.testPort,
    dir: config.dest
  }).then((server) => {
    testFiles.pipe(protractor({
        configFile: config.test.protractor
    })).on('error', (err) => {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    }).on('end', () => server.close(cb));
  });

});

gulp.task('webdriverUpdate', webdriver_update);
gulp.task('webdriver', webdriver);
