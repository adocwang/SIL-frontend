'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';
import url         from 'url';
import browserSync from 'browser-sync';
import connect      from 'gulp-connect';
import config      from '../config';

gulp.task('dev', ['clean'], function(cb) {

  global.isProd = false;

  runSequence('assets', 'browserify', 'nodeViews', 'connectDev', 'watch', cb);

});

gulp.task('watch', ['browserSync'], function() {

  global.isWatching = true;

  // Scripts are automatically watched and rebundled by Watchify inside Browserify task
  gulp.watch(config.scripts.src, [/*'eslint',*/ 'browserify:watch']);
  gulp.watch([config.styles.theme.src, config.styles.src],  ['styles']);
  gulp.watch(config.images.src,  ['images']);
  gulp.watch(config.fonts.src,   ['fonts']);
  gulp.watch(config.views.watch, ['views']);

});

gulp.task('connectDev', function () {
  connect.server({
    name: 'Dev App',
    root: 'build',
    port: 8000
  });
});

gulp.task('browserSync', function() {

  if(process.env.npm_lifecycle_event != 'dev:sync') return;

  const DEFAULT_FILE = 'index.html';
  const ASSET_EXTENSION_REGEX = new RegExp(`\\b(?!\\?)\\.(${config.assetExtensions.join('|')})\\b(?!\\.)`, 'i');

  browserSync.init({
    proxy: {
      target: 'localhost:3201',
      ws: true
    },
    /*server: {
      baseDir: config.dest,
      middleware: function(req, res, next) {
        let fileHref = url.parse(req.url).href;

        if ( !ASSET_EXTENSION_REGEX.test(fileHref) ) {
          req.url = '/' + DEFAULT_FILE;
        }
        return next();
      }
    },*/
    port: config.browserPort,
    ui: {
      port: config.UIPort
    },
    ghostMode: {
      links: false
    }
  });

});
