'use strict';

import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'vinyl-buffer';
import streamify    from 'gulp-streamify';
import watchify     from 'watchify';
import browserify   from 'browserify';
import babelify     from 'babelify';
import uglify       from 'gulp-uglify';
import browserSync  from 'browser-sync';
import debowerify   from 'debowerify';
import ngAnnotate   from 'browserify-ngannotate';
import bulkify      from 'bulkify';
import envify       from 'envify';
import runSequence  from 'run-sequence';
import handleErrors from '../util/handleErrors';
import bundleLogger from '../util/bundleLogger';
import config       from '../config';
import nodeEnv      from '../util/nodeEnv';
import rev          from 'gulp-rev';
import revCollector from 'gulp-rev-collector';
import revReplace   from 'gulp-rev-replace';
import through      from 'through2';
import path         from 'path';
import gutil        from 'gulp-util';
import replace      from 'gulp-replace';
// import size         from 'filesize';


const isProduction = nodeEnv.isProduction;

console.log(nodeEnv);

const vendorRequires = ['jquery', 'angular', 'angular-ui-bootstrap', 'angular-ui-router',
    'dropzone', 'angular-dropzone', 'angular-ui-switch', 'pace2', 'angular-toastr', 'angular-xeditable',
    'jquery-slimscroll', 'angular-slimscroll'];

const browserifyOption = {
    vendor: {
        entries: [],
        requires: vendorRequires
    },
    app: {
        entries: [],
        externals: vendorRequires
    }
};

const defaultOptions = {
    entries: [],
    requires: [],
    externals: [],
    debug: !isProduction,
    cache: {},
    packageCache: {},
    fullPaths: true
};

const transforms = [
    { name: babelify, options: { compact: false } },
    { name: debowerify, options: {} },
    { name: ngAnnotate, options: {} },
    { name: 'brfs', options: {} },
    { name: bulkify, options: {} },
    { name: envify, options: {} }
  ];

function gulpBrowserify(options){

    let transform = function(file, enc, cb) {
        let self = this;
        let basename = path.basename(file.path, path.extname(file.path));
        let opts = options[basename] || {};
        let bundler = browserify(defaultOptions, {});

        if(Array.isArray( opts.entries ) && opts.entries.indexOf(file.path) == -1){
            opts.entries.push(file.path);
        }

        opts.requires && opts.requires.forEach(function (require, key) {
            bundler.require(require);
        });

        opts.externals && opts.externals.forEach(function (external, key) {
            bundler.external(external);
        });

        opts.entries && opts.entries.forEach(function (entry, key) {
            bundler.add(entry);
        });

        transforms.forEach(function(transform) {
          bundler.transform(transform.name, transform.options);
        });

        bundler.bundle(function(err, src){
          if(err) {
              gutil.log( err.message );
          } else {
              gutil.log('Builded:', gutil.colors.cyan( file.path ));

              file.contents = new Buffer(src);
              self.push(file);
          }

          cb();
        });
    }
    return through.obj(transform);
}

 function fileSize(){
    return through.obj(function(file, enc, cb){
        gutil.log('Size:', gutil.colors.cyan(file.path),
          gutil.colors.magenta( size(Buffer.byteLength(file.contents.toString())) ));
        cb();
    });
}

gulp.task('browserify:watch', function(){

  return gulp.src(config.src + '/+(app).js')
    .pipe(gulpBrowserify(browserifyOption))
    .pipe(gulp.dest(config.dest + '/js'))
    .pipe(browserSync.stream());

});

gulp.task('browserify:dev', function(){

  return gulp.src(config.src + '/+(app|vendor).js')
    .pipe(gulpBrowserify(browserifyOption))
    // Expose jQuery and $ identifiers
    .pipe(replace('factory( global, true )', 'factory( global, false )'))
    .pipe(gulp.dest(config.dest + '/js'));

});

gulp.task('browserify:deploy', function(){

    return gulp.src(config.src + '/+(app|vendor).js')
        .pipe(gulpBrowserify(browserifyOption))
        // Expose jQuery and $ identifiers
        .pipe(replace('factory( global, true )', 'factory( global, false )'))
        .pipe(uglify({
            compress: {drop_console: true}
        }))
        .pipe(revReplace({manifest: gulp.src( config.rev.fileName )}))
        // .pipe(fileSize())
        .pipe(rev())
        .pipe(gulp.dest(config.dest + '/js'))
        .pipe(rev.manifest(config.rev.fileName, {
            // cwd: config.dest,
            base: config.rev.dest,
            merge: true
        }))
        .pipe(gulp.dest(config.rev.dest));
});

gulp.task('browserify', function(cb){
    if(isProduction){
        runSequence('browserify:deploy', cb);
    } else {
        runSequence('browserify:dev', cb);
    }
});
