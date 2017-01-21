'use strict';

const src  = './app/';
const dest = './build/';
const rev  = dest + '/rev';

export default {

  browserPort: 3000,
  UIPort: 3001,
  testPort: 3002,

  src: src,
  dest: dest,

  styles: {
    src: 'app/styles/**/*.less',
    dest: 'build/css',
    prodSourcemap: false,
    less: {
        srcAll: src + "/styles/**/*.less",
        bsSrc: src + '/../theme/src/less/**/*.less',
        srcToBeCompile: src + "/styles/*.less",
        dest: dest + '/css',
        fontDest: dest + '/css/fonts',
        revStyles: rev + '/styles',
        revSrcAll: rev + '/styles/**/*.css',
        settings: {}
    },
    theme: {
      src: './theme/src/less/**/*.less'
    }
  },

  scripts: {
    src: 'app/**/*.js',
    dest: 'build/js',
    test: 'test/**/*.js',
    gulp: 'gulp/**/*.js',
    rev: { // unuse
      revScripts: rev + '/js/',
      revSrc: rev + '/js/**/*'
    }
  },

  images: {
    src: 'assets/img/**/*',
    dest: 'build/images'
  },

  fonts: {
    src: ['assets/fonts/**/*'],
    dest: 'build/fonts'
  },

  assetExtensions: [
    'js', 'css',
    'png', 'jpe?g', 'gif', 'svg',
    'eot', 'otf', 'ttc', 'ttf', 'woff2?'
  ],

  views: {
    index: 'app/index.html',
    src: 'app/!(views)/**/*.html',
    dest: 'app',
    node: {
      src: 'app/views/*.html',
      dest: dest
    }
  },

  gzip: {
    src: 'build/**/*.{html,xml,json,css,js,js.map,css.map}',
    dest: 'build/',
    options: {}
  },

  browserify: {
    bundleName: 'app.js', // unuse
    prodSourcemap: false
  },

  test: {
    karma: 'test/karma.conf.js',
    protractor: 'test/protractor.conf.js'
  },

  rev: {
    fileName: dest + '/assets/manifest.json',
    dest: dest + '/assets'
  },

  init: function() {
    this.views.watch = [
      this.views.index,
      this.views.src,
      this.views.node.src
    ];

    return this;
  }

}.init();
