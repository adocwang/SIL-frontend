'use strict';

import config        from '../config';
import gulp          from 'gulp';
import gulpif        from 'gulp-if';
import sourcemaps    from 'gulp-sourcemaps';
import less          from 'gulp-less';
import handleErrors  from '../util/handleErrors';
import browserSync   from 'browser-sync';
import autoprefixer  from 'gulp-autoprefixer';
import changed       from 'gulp-changed';
import imagemin      from 'gulp-imagemin';
import rev           from 'gulp-rev';
import merge         from 'merge-stream';
import templateCache from 'gulp-angular-templatecache';
import revReplace    from 'gulp-rev-replace';
import nodeEnv      from '../util/nodeEnv';
import runSequence  from 'run-sequence';

const isProduction = nodeEnv.isProduction;

gulp.task('assets', function(cb) {

  runSequence(['images', 'views', 'fonts'], 'styles', cb);
  // Any assets logic should go here

});

gulp.task('styles:dev', function () {

  const createSourcemap = !global.isProd || config.styles.prodSourcemap;

  return gulp.src(config.styles.less.srcToBeCompile)
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(less(config.styles.less.settings))
    .on('error', handleErrors)
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 1%', 'ie 8']
    }))
    .pipe(gulpif(
      createSourcemap,
      sourcemaps.write( global.isProd ? './' : null ))
    )
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.stream());

});

gulp.task('styles:prod', function () {


  return gulp.src(config.styles.less.srcToBeCompile)
    .pipe(less(config.styles.less.settings))
    .on('error', handleErrors)
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 1%', 'ie 8']
    }))
    .pipe(revReplace({manifest: gulp.src( config.rev.fileName )}))
    .pipe(rev())
    .pipe(gulp.dest(config.styles.dest))
    .pipe(rev.manifest(config.rev.fileName, {
        // cwd: config.dest,
        base: config.rev.dest,
        merge: true
    }))
    .pipe(gulp.dest(config.rev.dest));

});

gulp.task('styles', function(cb) {

  if(isProduction) {
    runSequence('styles:prod', cb);
  }else {
    runSequence('styles:dev', cb);
  }

});

gulp.task('images', function(cb) {

  if(isProduction) {
    runSequence('images:prod', cb);
  }else {
    runSequence('images:dev', cb);
  }

});

gulp.task('images:dev', function() {

  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.images.dest))
    .pipe(gulpif(browserSync.active, browserSync.stream()));

});

gulp.task('images:prod', function() {

  return gulp.src(config.images.src)
    .pipe(rev())
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(config.images.dest))
    .pipe(rev.manifest(config.rev.fileName, {
        // cwd: config.dest,
        base: config.rev.dest,
        merge: true
     }))
    .pipe(gulp.dest(config.rev.dest));

});

gulp.task('views', function() {

  // Put our index.html in the dist folder
  // const indexFile = gulp.src(config.views.index)
  //   .pipe(gulpif(isProduction, revReplace({ manifest: gulp.src( config.rev.fileName ) })))
  //   .pipe(gulp.dest(config.dest));

  // Process any other view files from app/views
  const views = gulp.src(config.views.src)
    // .pipe(gulpif(isProduction, revReplace({ manifest: gulp.src( config.rev.fileName ) })))
    .pipe(templateCache({
      module: 'app.templates',
      standalone: true
    }))
    .pipe(gulp.dest(config.views.dest));
    // 避免刷新两次，因为模板打进app.js中时也会触发browserify-watch执行
    //.pipe(browserSync.stream());

  return views;

});

gulp.task('nodeViews', function() {

  // Put node.js views in the dist folder
  return gulp.src(config.views.node.src)
    .pipe(gulpif(isProduction, revReplace({
      manifest: gulp.src(config.rev.fileName)
    })))
    .pipe(gulp.dest(config.views.node.dest))
})

gulp.task('fonts', ['iconFont', 'vendorFont'], function() {

  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(browserSync.stream());

});

gulp.task('iconFont', function () {

  const baseDir = './theme/src/icons';
  return gulp.src(baseDir + '/fonts/**/*')
      .pipe(gulp.dest('./build/css/fonts'));

});


gulp.task('vendorFont', function () {

  // move bootstrap's fonts to dist
  return gulp.src('./app/bower/bootstrap/dist/fonts/*')
    .pipe(gulp.dest(config.fonts.dest));

});
